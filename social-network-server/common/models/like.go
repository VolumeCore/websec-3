package models

type Like struct {
	PostId uint `json:"postId" gorm:"primaryKey"`
	UserId uint `json:"userId" gorm:"primaryKey"`
}
