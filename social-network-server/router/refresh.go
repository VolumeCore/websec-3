package router

import (
	"github.com/gin-gonic/gin"
	"net/http"
	"social-network-server/common/models"
	"social-network-server/common/utils"
)

func (h handler) refreshHandler(c *gin.Context) {
	var refreshToken string
	db := h.DB

	if err := c.BindJSON(&refreshToken); err != nil {
		c.IndentedJSON(http.StatusBadRequest, "Refresh token is absent in body")
		return
	}

	var userFromDb models.User
	r := db.Find(&userFromDb, "refresh_token = ?", refreshToken)

	if r.RowsAffected == 0 {
		c.IndentedJSON(http.StatusForbidden, "There are not users with this refresh token")
		return
	}

	var token, newRefreshToken, err = utils.GenerateTokenPairs(userFromDb.Username)
	if err != nil {
		c.IndentedJSON(http.StatusBadRequest, err.Error())
		return
	}

	userFromDb.RefreshToken = newRefreshToken
	db.Save(&userFromDb)

	c.IndentedJSON(http.StatusOK, map[string]string{
		"token":        token,
		"refreshToken": newRefreshToken,
	})
}
