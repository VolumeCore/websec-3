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
		db.Preload("Posts").Preload("Followers").First(&user).Where("username = ?", user.Username)
	} else {
		id, err := strconv.Atoi(id_str)
		if err != nil {
			return
		}
		user.ID = uint(id)

		db.Preload("Posts").Preload("Followers").First(&user).Where("id = ?", user.ID)
	}

	c.IndentedJSON(http.StatusOK, user)
}
