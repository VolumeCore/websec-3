package router

import (
	"github.com/gin-gonic/gin"
	"net/http"
	"social-network-server/common/models"
)

func (h handler) automigationHandler(c *gin.Context) {
	db := h.DB

	db.AutoMigrate(models.User{})
	db.AutoMigrate(models.Post{})
	db.AutoMigrate(models.Follower{})
	db.AutoMigrate(models.Like{})
	db.AutoMigrate(models.Comment{})

	c.String(http.StatusOK, "OK")
}
