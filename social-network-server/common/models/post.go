package models

import (
	"encoding/json"
	"gorm.io/gorm"
)

type Post struct {
	gorm.Model  `json:"-"`
	Description string    `json:"description"`
	UserId      uint      `json:"userID"`
	ImageUId    string    `json:"imageUId"`
	Likes       []Like    `json:"likes"`
	Comments    []Comment `json:"comments"`
}

func (p Post) MarshalJSON() ([]byte, error) {
	type Alias Post
	return json.Marshal(&struct {
		ID uint `json:"postId"`
		*Alias
	}{
		Alias: (*Alias)(&p),
		ID:    p.Model.ID,
	})
}

func (b *Post) UnmarshalJSON(data []byte) error {
	type Alias Post
	aux := &struct {
		ID uint `json:"postId"`
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
