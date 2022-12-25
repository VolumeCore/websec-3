package router

import (
	"fmt"
	"github.com/gin-gonic/gin"
	"github.com/google/uuid"
	"social-network-server/common/models"
	"social-network-server/common/utils"
)

func (h handler) registerHandler(c *gin.Context) {
	var userFromContext models.User

	if err := c.BindJSON(&userFromContext); err != nil {
		return
	}

	db := h.DB

	var userFromDb models.User
	r := db.Find(&userFromDb, "username = ?", userFromContext.Username)

	if r.RowsAffected != 0 {
		c.IndentedJSON(404, "NOT OK")
		return
	}

	fileUID := uuid.New().String()

	err := utils.GenerateRandomAvatar(fmt.Sprintf("/images/%s", fileUID))
	if err != nil {
		return
	}

	userFromContext.PasswordHash = utils.GetPasswordHash(userFromContext.Password)
	userFromContext.ImageUId = fileUID
	db.Create(&userFromContext)

	c.IndentedJSON(200, "OK")
}
