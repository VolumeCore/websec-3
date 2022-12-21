package router

import (
	"fmt"
	"github.com/gin-gonic/gin"
	"net/http"
	"social-network-server/common/utils"
)

func (h handler) whoamiHandler(c *gin.Context) {
	customClaims, err := utils.GetCustomClaims(c)
	if err != nil {
		c.IndentedJSON(http.StatusInternalServerError, map[string]string{"message": err.Error()})
		return
	}

	username := customClaims.Username
	c.IndentedJSON(http.StatusOK, fmt.Sprint("Hi, ", username))
}
