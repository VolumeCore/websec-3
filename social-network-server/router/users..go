package router

import (
	"github.com/gin-gonic/gin"
	"net/http"
	"social-network-server/common/models"
	"strconv"
)

func (h handler) getUser(c *gin.Context) {

	db := h.DB
	var user models.User
	id, err := strconv.Atoi(c.Query("id"))
	if err != nil {
		return
	}
	user.ID = uint(id)
	db.First(&user).Where("id = ?", user.ID)
	c.IndentedJSON(http.StatusOK, user)
}
