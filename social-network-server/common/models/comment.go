package models

import (
	"encoding/json"
	"gorm.io/gorm"
)

type Comment struct {
	gorm.Model `json:"-"`
	PostId     uint   `json:"post_id"`
	UserId     uint   `json:"-"`
	Message    string `json:"message"`
}

func (p Comment) MarshalJSON() ([]byte, error) {
	type Alias Comment
	return json.Marshal(&struct {
		ID uint `json:"id"`
		*Alias
	}{
		Alias: (*Alias)(&p),
		ID:    p.Model.ID,
	})
}

func (b *Comment) UnmarshalJSON(data []byte) error {
	type Alias Comment
	aux := &struct {
		ID uint `json:"id"`
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
