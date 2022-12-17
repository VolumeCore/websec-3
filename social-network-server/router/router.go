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

	authorized := router.Group("/")
	authorized.Use(checkJWT())
	{
		authorized.GET("/whoami", h.whoamiHandler)
		authorized.GET("/auth/verify", h.authVerifyHandler)
	}

	open := router.Group("/")
	{
		open.POST("/register", h.registerHandler)
		open.POST("/login", h.loginHandler)
		open.POST("/refresh", h.refreshHandler)
	}

	router.Run(fmt.Sprintf(":%s", Port))
}
