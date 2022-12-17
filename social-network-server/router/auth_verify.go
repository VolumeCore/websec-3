package router

import (
	"github.com/gin-gonic/gin"
	"net/http"
	"social-network-server/common/utils"
)

func (h handler) authVerifyHandler(c *gin.Context) {
	tokenString := c.GetHeader("Authorization")

	if _, err := utils.CheckToken(tokenString); err != nil {
		c.IndentedJSON(http.StatusForbidden, err.Error())
		return
	}

	c.IndentedJSON(http.StatusOK, "OK")
}
