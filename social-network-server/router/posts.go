package router

import (
	"github.com/gin-gonic/gin"
	"net/http"
	"social-network-server/common/models"
	"social-network-server/common/utils"
	"strconv"
)

func (h handler) uploadPost(c *gin.Context) {
	var p models.Post

	if err := c.BindJSON(&p); err != nil {
		c.IndentedJSON(http.StatusBadRequest, "Can't cast body")
		return
	}

	customClaims, err := utils.GetCustomClaims(c)
	if err != nil {
		c.IndentedJSON(http.StatusBadRequest, map[string]string{"message": err.Error()})
		return
	}

	var user models.User
	db := h.DB
	db.Find(&user).Where("username = ?", customClaims.Username)
	p.UserId = user.ID
	db.Create(&p)

	c.IndentedJSON(http.StatusOK, p)
}

func (h handler) getPosts(c *gin.Context) {
	var count_posts_in_responce = 20
	offset_str := c.DefaultQuery("offset", "0")

	offset, err := strconv.Atoi(offset_str)
	if err != nil {
		return
	}

	db := h.DB
	var posts []models.Post

	db.Order("updated_at").Offset(offset).Limit(count_posts_in_responce).Find(&posts)
	print(posts)
	c.IndentedJSON(http.StatusOK, posts)
}
