package utils

import (
	"bufio"
	"bytes"
	"context"
	"errors"
	"github.com/aofei/cameron"
	jwtmiddleware "github.com/auth0/go-jwt-middleware/v2"
	"github.com/auth0/go-jwt-middleware/v2/validator"
	"github.com/gin-gonic/gin"
	"github.com/golang-jwt/jwt/v4"
	"github.com/google/uuid"
	"hash/fnv"
	"image/png"
	"log"
	"os"
	"strings"
	"time"
)

func GetIssuer() string {
	return "go-jwt-middleware-example"
}

func GetAudience() []string {
	return []string{"audience-example"}
}

func GetSecretKey() []byte {
	return []byte("syper-pyper-key")
}

type Claims struct {
	jwt.RegisteredClaims
	Username string `json:"username"`
}

func GetCustomClaims(c *gin.Context) (*Claims, error) {
	claims, ok := c.Request.Context().Value(jwtmiddleware.ContextKey{}).(*validator.ValidatedClaims)
	if !ok {
		return nil, errors.New("Failed to get validated JWT claims") //
	}
	customClaims, ok := claims.CustomClaims.(*Claims)
	if !ok {
		return nil, errors.New("Failed to cast custom JWT claims to specific type")
	}

	return customClaims, nil
}

func (c *Claims) Validate(ctx context.Context) error {
	return nil
}

func GenerateTokenPairs(username string) (string, string, error) {
	token := jwt.NewWithClaims(jwt.SigningMethodHS256, &Claims{
		RegisteredClaims: jwt.RegisteredClaims{
			Issuer:    GetIssuer(),
			Audience:  GetAudience(),
			IssuedAt:  &jwt.NumericDate{time.Now()},
			ExpiresAt: &jwt.NumericDate{time.Now().Add(time.Minute * 30)},
		},
		Username: username,
	})

	signedString, err := token.SignedString(GetSecretKey())
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

func CheckToken(token string) (*jwt.Token, error) {
	if token == "" {
		return nil, &TokenError{"Token is empty"}
	}

	parse, err := jwt.Parse(token, func(token *jwt.Token) (interface{}, error) {
		return GetSecretKey(), nil
	})

	if errors.Is(err, jwt.ErrTokenMalformed) {
		return nil, &TokenError{"That's not even a token"}
	} else if errors.Is(err, jwt.ErrTokenExpired) || errors.Is(err, jwt.ErrTokenNotValidYet) {
		return parse, &TokenError{"Token is expired"}
	}

	return parse, nil
}

func GetPasswordHash(password string) uint64 {
	hasher := fnv.New64a()
	if _, err := hasher.Write([]byte(password)); err != nil {
		panic("Can't get hash of password")
	}
	return hasher.Sum64()
}

func GenerateRandomAvatar(fileName string) error {
	buf := bytes.Buffer{}
	err := png.Encode(&buf, cameron.Identicon([]byte(fileName), 540, 60))
	if err != nil {
		return err
	}
	//Create a empty file
	file, err := os.Create(fileName)
	if err != nil {
		return err
	}
	defer file.Close()
	_, err = buf.WriteTo(file)
	if err != nil {
		return err
	}
	//
	////Write the bytes to the fiel
	//_, err = io.Copy(file, buf)
	if err != nil {
		return err
	}

	return nil
}

type AppConfigProperties map[string]string

func ReadPropertiesFile(filename string) (AppConfigProperties, error) {
	config := AppConfigProperties{}

	if len(filename) == 0 {
		return config, nil
	}
	file, err := os.Open(filename)
	if err != nil {
		log.Fatal(err)
		return nil, err
	}
	defer file.Close()

	scanner := bufio.NewScanner(file)
	for scanner.Scan() {
		line := scanner.Text()
		if equal := strings.Index(line, "="); equal >= 0 {
			if key := strings.TrimSpace(line[:equal]); len(key) > 0 {
				value := ""
				if len(line) > equal {
					value = strings.TrimSpace(line[equal+1:])
				}
				config[key] = value
			}
		}
	}

	if err := scanner.Err(); err != nil {
		log.Fatal(err)
		return nil, err
	}

	return config, nil
}
