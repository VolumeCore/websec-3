package router

import (
	"fmt"
	"github.com/gin-gonic/gin"
	"net/http"
	"social-network-server/common/models"
	"social-network-server/common/utils"
)

func (h handler) subscribe(c *gin.Context) {
	claims, err := utils.GetCustomClaims(c)
	if err != nil {
		return
	}
	db := h.DB
	user := models.User{Username: c.Query("username")}
	fmt.Println(user.ID)
	db.Where("username = ?", user.Username).Find(&user)
	// TODO: Check if user exists that follower wanted

	var follower = models.User{Username: claims.Username}
	db.Where("username = ?", follower.Username).First(&follower)
	db.Create(&models.Follower{SubID: follower.ID, UserID: user.ID})
	db.Create(&models.Follow{UserId: follower.ID, FollowId: user.ID})
	c.IndentedJSON(http.StatusOK, "OK")
}

func (h handler) unsubscribe(c *gin.Context) {
	claims, err := utils.GetCustomClaims(c)
	if err != nil {
		return
	}
	db := h.DB
	user := models.User{Username: c.Query("username")}
	db.Where("username = ?", user.Username).First(&user)
	// TODO: Check if user exists that follower wanted

	var follower = models.User{Username: claims.Username}
	db.Where("username = ?", follower.Username).First(&follower)
	db.Where("sub_id = ? and user_id = ?", follower.ID, user.ID).Delete(&models.Follower{})
	db.Where("follow_id = ? and user_id = ?", user.ID, follower.ID).Delete(&models.Follow{})
	c.IndentedJSON(http.StatusOK, "OK")
}
