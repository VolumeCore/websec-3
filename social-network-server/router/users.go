package router

import (
	"github.com/gin-gonic/gin"
	"net/http"
	"social-network-server/common/models"
	"strconv"
)

func (h handler) getUser(c *gin.Context) {
	id_str := c.Query("id")
	db := h.DB
	var user models.User
	if len(id_str) == 0 {
		user.Username = c.Query("username")
		db.Preload("Posts").Preload("Followers").Where("username = ?", user.Username).Find(&user)
	} else {
		id, err := strconv.Atoi(id_str)
		if err != nil {
			return
		}
		user.ID = uint(id)

		db.Preload("Posts").Preload("Followers").Where("id = ?", user.ID).Find(&user)
	}

	c.IndentedJSON(http.StatusOK, user)
}

func (h handler) getFollows(c *gin.Context) {
	username := c.Query("username")
	user := models.User{Username: username}
	db := h.DB
	db.Where("username = ?", user.Username).First(&user)

	var followsUsers []models.User
	db.Joins("left join followers on followers.user_id = users.id").Where("sub_id = ?", user.ID).Find(&followsUsers)

	c.IndentedJSON(http.StatusOK, followsUsers)
}
