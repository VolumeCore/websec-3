package models

import (
	"encoding/json"
	"gorm.io/gorm"
)

type Comment struct {
	gorm.Model  `json:"-"`
	PostId      uint   `json:"postId"`
	UserId      uint   `json:"userId"`
	CommentText string `json:"commentText"`
}

func (p Comment) MarshalJSON() ([]byte, error) {
	type Alias Comment
	return json.Marshal(&struct {
		ID   uint   `json:"commentId"`
		Date string `json:"date"`
		*Alias
	}{
		Alias: (*Alias)(&p),
		ID:    p.Model.ID,
		Date:  p.Model.CreatedAt.String(),
	})
}

func (b *Comment) UnmarshalJSON(data []byte) error {
	type Alias Comment
	aux := &struct {
		ID uint `json:"commentId"`
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
