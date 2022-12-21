package models

import (
	"encoding/json"
	"gorm.io/gorm"
)

type Post struct {
	gorm.Model `json:"-"`
	Name       string `json:"name"`
	UserId     uint   `json:"-"`
	ImageUID   string `json:"image_uid"`
}

func (p Post) MarshalJSON() ([]byte, error) {
	type Alias Post
	return json.Marshal(&struct {
		ID uint `json:"id"`
		*Alias
	}{
		Alias: (*Alias)(&p),
		ID:    p.Model.ID,
	})
}

func (b *Post) UnmarshalJSON(data []byte) error {
	type Alias Post
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
