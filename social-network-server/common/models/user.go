package models

import "gorm.io/gorm"

type User struct {
	gorm.Model   `json:"-"`
	Username     string     `json:"username" gorm:"unique;type:varchar(20)"`
	Password     string     `json:"password" gorm:"-"`
	Bio          string     `json:"bio"`
	ImageUId     string     `json:"imageUId"`
	PasswordHash uint64     `json:"-"`
	RefreshToken string     `json:"-"`
	Posts        []Post     `json:"posts"`
	Followers    []Follower `json:"followers"`
}
