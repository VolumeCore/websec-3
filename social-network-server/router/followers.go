package router

import (
	"github.com/gin-gonic/gin"
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
	db.First(&user).Where("username = ?", user.Username)
	// TODO: Check if user exists that follower wanted

	var follower = models.User{Username: claims.Username}
	db.First(&follower).Where("username = ?", follower.Username)

	db.Create(models.Follower{SubID: follower.ID, UserID: user.ID})
}

func (h handler) unsubscribe(c *gin.Context) {
	claims, err := utils.GetCustomClaims(c)
	if err != nil {
		return
	}
	db := h.DB
	user := models.User{Username: c.Query("username")}
	db.First(&user).Where("username = ?", user.Username)
	// TODO: Check if user exists that follower wanted

	var follower = models.User{Username: claims.Username}
	db.First(&follower).Where("username = ?", follower.Username)

	db.Delete(models.Follower{SubID: follower.ID, UserID: user.ID})
}
