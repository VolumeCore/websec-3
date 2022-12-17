package router

import (
	"github.com/gin-gonic/gin"
	"net/http"
)

func (h handler) authVerifyHandler(c *gin.Context) {
	c.IndentedJSON(http.StatusOK, "OK")
}
