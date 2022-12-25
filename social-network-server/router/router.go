package router

import (
	"fmt"
	"github.com/gin-contrib/cors"
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

	router.Use(cors.New(cors.Config{
		AllowMethods:     []string{"GET", "POST", "OPTIONS", "PUT"},
		AllowHeaders:     []string{"Origin", "Content-Length", "Content-Type", "User-Agent", "Referrer", "Host", "Token"},
		ExposeHeaders:    []string{"Content-Length"},
		AllowCredentials: true,
		AllowAllOrigins:  false,
		AllowOriginFunc:  func(origin string) bool { return true },
		MaxAge:           86400,
	}))
	authorized := router.Group("/")

	authorized.Use(checkJWT())
	{
		authorized.GET("/whoami", h.whoamiHandler)
		authorized.GET("/auth/verify", h.authVerifyHandler)
		authorized.POST("/upload/post", h.uploadPost)
		authorized.POST("/upload", h.uploadFile)
		authorized.POST("/set/like", h.setLike)
		authorized.POST("/set/comment", h.setComment)
		authorized.POST("/unset/like", h.unsetLike)
		authorized.POST("/unset/comment", h.unsetComment)
		authorized.GET("/subscribe", h.subscribe)
		authorized.GET("/unsubscribe", h.unsubscribe)
		authorized.GET("/get/user", h.getUser)
		authorized.GET("/get/follows", h.getFollows)
		authorized.POST("/set/bio", h.setBio)
		authorized.POST("/set/userphoto", h.setUserPhoto)
	}

	open := router.Group("/")
	open.Use(cors.Default())
	{
		open.POST("/register", h.registerHandler)
		open.POST("/login", h.loginHandler)
		open.POST("/refresh", h.refreshHandler)
		open.GET("/get/users", h.getUsers)
		open.GET("/posts", h.getPosts)

		// Only for develop
		open.GET("/migration_run", h.automigationHandler)
	}

	router.Run(fmt.Sprintf(":%s", Port))
}
