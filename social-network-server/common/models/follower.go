package models

import "gorm.io/gorm"

type Follower struct {
	gorm.Model
	UserID uint `json:"-"`
	SubID  uint `json:"sub_id"`
}
