package models

type Like struct {
	PostId uint `json:"post_id" gorm:"primaryKey"`
	UserId uint `json:"-" gorm:"primaryKey"`
}
