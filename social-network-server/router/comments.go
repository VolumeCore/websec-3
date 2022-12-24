package router

import (
	"github.com/gin-gonic/gin"
	"net/http"
	"social-network-server/common/models"
	"social-network-server/common/utils"
)

func (h handler) setComment(c *gin.Context) {
	var comment models.Comment
	err := c.BindJSON(&comment)
	if err != nil {
		return
	}

	claims, err := utils.GetCustomClaims(c)
	if err != nil {
		return
	}

	var user = models.User{Username: claims.Username}
	db := h.DB
	db.Where("username = ?", user.Username).Find(&user)

	comment.UserId = user.ID
	db.Create(&comment)

	c.IndentedJSON(http.StatusOK, comment)
}

func (h handler) unsetComment(c *gin.Context) {
	var comment models.Comment

	err := c.BindJSON(&comment)
	if err != nil {
		return
	}

	db := h.DB
	db.Unscoped().Delete(&comment)

	c.IndentedJSON(http.StatusOK, "OK")
}
