package router

import (
	"fmt"
	"github.com/gin-gonic/gin"
	"github.com/golang-jwt/jwt/v4"
	"net/http"
	"social-network-server/common/utils"
)

func (h handler) whoamiHandler(c *gin.Context) {
	tokenString := c.GetHeader("Authorization")

	token, err := utils.CheckToken(tokenString)
	if err != nil {
		c.IndentedJSON(http.StatusForbidden, err.Error())
		return
	}

	claims := token.Claims.(jwt.MapClaims)

	username := claims["username"]

	c.IndentedJSON(http.StatusOK, fmt.Sprint("Hi, ", username))
}
