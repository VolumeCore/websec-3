package models

import (
	"encoding/json"
	"gorm.io/gorm"
)

type User struct {
	gorm.Model   `json:"-"`
	Username     string     `json:"username" gorm:"unique;type:varchar(20)"`
	Password     string     `json:"password" gorm:"-"`
	Bio          string     `json:"bio" gorm:"default:Описание прекрасного человека"`
	ImageUId     string     `json:"imageUId"`
	PasswordHash uint64     `json:"-"`
	RefreshToken string     `json:"-"`
	Posts        []Post     `json:"posts"`
	Followers    []Follower `json:"followers"`
	Follows      []Follow   `json:"follows"`
}

func (p User) MarshalJSON() ([]byte, error) {
	type Alias User
	return json.Marshal(&struct {
		ID uint `json:"userId"`
		*Alias
	}{
		Alias: (*Alias)(&p),
		ID:    p.Model.ID,
	})
}

func (b *User) UnmarshalJSON(data []byte) error {
	type Alias User
	aux := &struct {
		ID uint `json:"userId"`
		*Alias
	}{
		Alias: (*Alias)(b),
	}
	if err := json.Unmarshal(data, &aux); err != nil {
		return err
	}
	b.ID = aux.ID
	return nil
}
