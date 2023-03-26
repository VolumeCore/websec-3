package main

import (
	"fmt"
	_ "github.com/go-sql-driver/mysql"
	"gorm.io/driver/mysql"
	"os"
	"social-network-server/common/db"
	"social-network-server/common/utils"
	httpEngine "social-network-server/router"
)

func main() {
	props, err := utils.ReadPropertiesFile("var/app.properties")
	if err != nil {
		fmt.Printf("Critical error, couldn't read properties file")
		os.Exit(1)
	}
	var dbString = fmt.Sprintf(
		"%s:%s@tcp(%s)/%s?parseTime=true",
		props["DB_USER"], props["DB_PASS"], props["DB_URL"], props["DB_NAME"])
	DB := db.Init(mysql.Open(dbString))
	httpEngine.Run("8080", DB)
}
