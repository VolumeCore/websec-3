package router

import (
	"fmt"
	"github.com/gin-gonic/gin"
	"gorm.io/gorm"
)

type handler struct {
	DB *gorm.DB
}

func Run(Port string, DB *gorm.DB) {
	router := gin.Default()

	h := handler{
		DB: DB,
	}

	router.POST("/register", h.registerHandler)
	router.POST("/login", h.loginHandler)
	router.POST("/refresh", h.refreshHandler)
	router.GET("/auth/verify", h.authVerifyHandler)
	router.GET("/whoami", h.whoamiHandler)

	router.Run(fmt.Sprintf(":%s", Port))
}
