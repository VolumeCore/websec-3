package router

import (
	"github.com/gin-gonic/gin"
	"net/http"
	"social-network-server/common/models"
	"social-network-server/common/utils"
)

func (h handler) loginHandler(c *gin.Context) {
	var userFromContext models.User
	db := h.DB

	if err := c.BindJSON(&userFromContext); err != nil {
		c.IndentedJSON(http.StatusBadRequest, "Login and password must be provided in request body")
		return
	}

	var userFromDb models.User
	r := db.Find(&userFromDb, "username = ?", userFromContext.Username)

	if r.RowsAffected == 0 {
		c.IndentedJSON(http.StatusBadRequest, "There is not user with this username")
		return
	}

	if userFromDb.PasswordHash != utils.GetPasswordHash(userFromContext.Password) {
		c.IndentedJSON(http.StatusForbidden, "Invalid password")
		return
	}

	token, refreshToken, err := utils.GenerateTokenPairs(userFromContext.Username)
	if err != nil {
		c.IndentedJSON(http.StatusInternalServerError, err.Error())
		return
	}
	// TODO: Add ability login from several devices
	userFromDb.RefreshToken = refreshToken
	db.Save(&userFromDb)

	c.IndentedJSON(http.StatusOK, map[string]string{
		"token":        token,
		"refreshToken": refreshToken,
	})
}
