package db

import (
	"gorm.io/gorm"
	"log"
)

func Init(dialector gorm.Dialector) *gorm.DB {
	db, err := gorm.Open(dialector, &gorm.Config{})

	if err != nil {
		log.Fatalln(err)
	}

	//db.AutoMigrate(&models.Book{})

	return db
}
