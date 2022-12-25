package router

import (
	"github.com/gin-gonic/gin"
	"net/http"
	"social-network-server/common/models"
	"social-network-server/common/utils"
	"strconv"
)

func (h handler) getUsers(c *gin.Context) {
	db := h.DB
	var users []models.User

	db.Find(&users)
	c.IndentedJSON(http.StatusOK, users)
}

func (h handler) getUser(c *gin.Context) {
	id_str := c.Query("id")
	db := h.DB
	var user models.User
	if len(id_str) == 0 {
		user.Username = c.Query("username")
		db.Preload("Comments").Preload("Posts").Preload("Followers").Preload("Follows").Where("username = ?", user.Username).Find(&user)
	} else {
		id, err := strconv.Atoi(id_str)
		if err != nil {
			return
		}
		user.ID = uint(id)
		db.Preload("Posts.Comments").Preload("Posts").Preload("Followers").Preload("Follows").Where("id = ?", user.ID).Find(&user).Joins("Comment")
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

func (h handler) setBio(c *gin.Context) {
	claims, err := utils.GetCustomClaims(c)
	if err != nil {
		return
	}
	new_bio := c.PostForm("bio")
	user := models.User{Username: claims.Username}
	db := h.DB
	db.Where("username = ?", user.Username).First(&user)

	user.Bio = new_bio
	db.Save(&user)
	c.IndentedJSON(http.StatusOK, "OK")
}

func (h handler) setUserPhoto(c *gin.Context) {
	claims, err := utils.GetCustomClaims(c)
	if err != nil {
		return
	}

	var payload = map[string]string{}
	err = c.BindJSON(&payload)
	if err != nil {
		return
	}
	user := models.User{Username: claims.Username}
	db := h.DB
	db.Where("username = ?", user.Username).First(&user)
	user.ImageUId = payload["imageUId"]
	db.Save(&user)
	c.IndentedJSON(http.StatusOK, payload)
}
