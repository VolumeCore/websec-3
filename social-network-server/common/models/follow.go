package models

import "gorm.io/gorm"

type Follow struct {
	gorm.Model

	UserId   uint `json:"userId"`
	FollowId uint `json:"followId"`
}
