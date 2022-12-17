package router

import (
	"context"
	jwtmiddleware "github.com/auth0/go-jwt-middleware/v2"
	"github.com/auth0/go-jwt-middleware/v2/validator"
	"github.com/gin-gonic/gin"
	"log"
	"net/http"
	"social-network-server/common/utils"
)

func checkJWT() gin.HandlerFunc {
	// Set up the validator.
	jwtValidator, err := validator.New(
		func(ctx context.Context) (interface{}, error) {
			return utils.GetSecretKey(), nil
		},
		validator.HS256,
		utils.GetIssuer(),
		utils.GetAudience(),
		validator.WithCustomClaims(func() validator.CustomClaims {
			return &utils.Claims{}
		}),
	)

	if err != nil {
		log.Fatalf("failed to set up the validator: %v", err)
	}

	errorHandler := func(w http.ResponseWriter, r *http.Request, err error) {
		log.Printf("Encountered error while validating JWT: %v", err)
	}

	middleware := jwtmiddleware.New(
		jwtValidator.ValidateToken,
		jwtmiddleware.WithErrorHandler(errorHandler),
	)

	return func(ctx *gin.Context) {
		encounteredError := true
		var handler http.HandlerFunc = func(w http.ResponseWriter, r *http.Request) {
			encounteredError = false
			ctx.Request = r
			ctx.Next()
		}

		middleware.CheckJWT(handler).ServeHTTP(ctx.Writer, ctx.Request)

		if encounteredError {
			ctx.AbortWithStatusJSON(
				http.StatusUnauthorized,
				map[string]string{"message": "JWT is invalid."},
			)
		}
	}
}
