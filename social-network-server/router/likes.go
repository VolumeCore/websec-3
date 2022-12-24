package router

import (
	"github.com/gin-gonic/gin"
	"net/http"
	"social-network-server/common/models"
	"social-network-server/common/utils"
)

func (h handler) setLike(c *gin.Context) {
	var like models.Like
	err := c.BindJSON(&like)
	if err != nil {
		return
	}

	claims, err := utils.GetCustomClaims(c)
	if err != nil {
		return
	}
	username := claims.Username
	db := h.DB
	var user models.User
	db.Where("username = ?", username).First(&user)
	like.UserId = user.ID
	db.Create(&like)
	c.IndentedJSON(http.StatusOK, like)
}

func (h handler) unsetLike(c *gin.Context) {
	var like models.Like
	err := c.BindJSON(&like)
	if err != nil {
		return
	}

	claims, err := utils.GetCustomClaims(c)
	if err != nil {
		return
	}
	username := claims.Username
	db := h.DB
	var user models.User
	db.Where("username = ?", username).First(&user)
	like.UserId = user.ID
	db.Delete(&like)

	c.IndentedJSON(http.StatusOK, "OK")
}
