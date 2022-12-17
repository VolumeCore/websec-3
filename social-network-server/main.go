package main

import (
	"errors"
	"fmt"
	"github.com/golang-jwt/jwt/v4"
	"net/http"
	"time"

	"github.com/gin-gonic/gin"
	"github.com/google/uuid"
)

type User struct {
	Username string `json:"username"`
	Password string `json:"password"`
}

var userDict = map[string]string{
	"admin": "admin",
}

var tokenDict = map[string]string{}

var secretKey = []byte("syper-pyper-key")

func loginHandler(c *gin.Context) {
	var user User

	if err := c.BindJSON(&user); err != nil {
		c.IndentedJSON(http.StatusBadRequest, "Login and password must be provided in request body")
		return
	}

	if userDict[user.Username] == "" {
		c.IndentedJSON(http.StatusBadRequest, "There is not user with this username")
		return
	}

	if userDict[user.Username] != user.Password {
		c.IndentedJSON(http.StatusForbidden, "Invalid password")
		return
	}

	token, refreshToken, err := generateTokenPairs(user.Username)
	if err != nil {
		c.IndentedJSON(http.StatusInternalServerError, err.Error())
		return
	}
	// TODO: Add refreshToken to database
	tokenDict[refreshToken] = user.Username

	c.IndentedJSON(http.StatusOK, map[string]string{
		"token":        token,
		"refreshToken": refreshToken,
	})
}

func generateTokenPairs(username string) (string, string, error) {
	token := jwt.New(jwt.SigningMethodHS256)
	claims := token.Claims.(jwt.MapClaims)

	claims["authorized"] = true
	claims["username"] = username
	claims["exp"] = time.Now().Add(time.Minute * 30).Unix()

	signedString, err := token.SignedString(secretKey)
	if err != nil {
		return "", "", err
	}

	refreshToken := uuid.New().String()
	return signedString, refreshToken, nil
}

type TokenError struct {
	message string
}

func (tokenError *TokenError) Error() string {
	return tokenError.message
}

func checkToken(token string) (*jwt.Token, error) {
	if token == "" {
		return nil, &TokenError{"Token is empty"}
	}

	parse, err := jwt.Parse(token, func(token *jwt.Token) (interface{}, error) {
		return secretKey, nil
	})

	if errors.Is(err, jwt.ErrTokenMalformed) {
		return nil, &TokenError{"That's not even a token"}
	} else if errors.Is(err, jwt.ErrTokenExpired) || errors.Is(err, jwt.ErrTokenNotValidYet) {
		return parse, &TokenError{"Token is expired"}
	}

	return parse, nil
}

func authVerifyHandler(c *gin.Context) {
	tokenString := c.GetHeader("Authorization")

	if _, err := checkToken(tokenString); err != nil {
		c.IndentedJSON(http.StatusForbidden, err.Error())
		return
	}

	c.IndentedJSON(http.StatusOK, "OK")
}

func whoamiHandler(c *gin.Context) {
	tokenString := c.GetHeader("Authorization")

	token, err := checkToken(tokenString)
	if err != nil {
		c.IndentedJSON(http.StatusForbidden, err.Error())
		return
	}

	claims := token.Claims.(jwt.MapClaims)

	username := claims["username"]

	c.IndentedJSON(http.StatusOK, fmt.Sprint("Hi, ", username))
}

func getUsernameByRefreshToken(refreshToken string) (string, error) {
	user, ok := tokenDict[refreshToken]
	if ok {
		return user, nil
	} else {
		return "", errors.New("There is not user with this refresh token")
	}
}

func refreshHandler(c *gin.Context) {
	var refreshToken string

	err := c.BindJSON(&refreshToken)
	if err != nil {
		c.IndentedJSON(http.StatusBadRequest, "Refresh token is absent in body")
		return
	}

	username, err := getUsernameByRefreshToken(refreshToken)
	if err != nil {
		c.IndentedJSON(http.StatusForbidden, err.Error())
		return
	}
	delete(tokenDict, refreshToken)

	token, newRefreshToken, err := generateTokenPairs(username)
	// TODO: Add refreshToken to database
	tokenDict[newRefreshToken] = username

	c.IndentedJSON(http.StatusOK, map[string]string{
		"token":        token,
		"refreshToken": newRefreshToken,
	})
}

func main() {
	router := gin.Default()

	router.POST("/login", loginHandler)
	router.POST("/refresh", refreshHandler)
	router.GET("/auth/verify", authVerifyHandler)
	router.GET("/whoami", whoamiHandler)

	router.Run("0.0.0.0:8080")
}
