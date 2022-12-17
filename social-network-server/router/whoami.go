package router

import (
	"fmt"
	jwtmiddleware "github.com/auth0/go-jwt-middleware/v2"
	"github.com/auth0/go-jwt-middleware/v2/validator"
	"github.com/gin-gonic/gin"
	"net/http"
	"social-network-server/common/utils"
)

func (h handler) whoamiHandler(c *gin.Context) {
	claims, ok := c.Request.Context().Value(jwtmiddleware.ContextKey{}).(*validator.ValidatedClaims)
	if !ok {
		c.AbortWithStatusJSON(
			http.StatusInternalServerError,
			map[string]string{"message": "Failed to get validated JWT claims."},
		)
		return
	}
	customClaims, ok := claims.CustomClaims.(*utils.Claims)
	if !ok {
		c.AbortWithStatusJSON(
			http.StatusInternalServerError,
			map[string]string{"message": "Failed to cast custom JWT claims to specific type."},
		)
		return
	}
	username := customClaims.Username

	c.IndentedJSON(http.StatusOK, fmt.Sprint("Hi, ", username))
}
