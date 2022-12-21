package router

import (
	"fmt"
	"github.com/gin-gonic/gin"
	"github.com/google/uuid"
	"net/http"
)

func (h handler) uploadFile(c *gin.Context) {
	file, err := c.FormFile("file")
	if err != nil {
		c.AbortWithStatusJSON(http.StatusBadRequest, gin.H{
			"message": "No file is received",
		})
		return
	}

	fileUID := uuid.New().String()

	err = c.SaveUploadedFile(file, fmt.Sprintf("/images/image_%s.jpg", fileUID))
	if err != nil {
		return
	}

	c.IndentedJSON(http.StatusOK, map[string]string{"image_uid": fileUID})
}
