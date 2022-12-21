package models

import "gorm.io/gorm"

type Follower struct {
	gorm.Model
	UserID uint
	SubID  uint
}
