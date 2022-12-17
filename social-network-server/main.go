package main

import (
	_ "github.com/go-sql-driver/mysql"
	"gorm.io/driver/mysql"
	db "social-network-server/common/db"
	httpEngine "social-network-server/router"
)

func main() {
	DB := db.Init(mysql.Open("root:root@tcp(mysql)/social_network_db?parseTime=true"))
	httpEngine.Run("8080", DB)
}
