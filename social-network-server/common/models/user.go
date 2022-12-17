package models

import "gorm.io/gorm"

type User struct {
	gorm.Model   `json:"-"`
	Username     string `json:"username" gorm:"unique;type:varchar(20)"`
	Password     string `json:"password" gorm:"-"`
	PasswordHash uint64 `json:"-"`
	RefreshToken string `json:"-"`
}
