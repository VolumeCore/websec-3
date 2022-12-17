package utils

import (
	"context"
	"errors"
	"github.com/golang-jwt/jwt/v4"
	"github.com/google/uuid"
	"hash/fnv"
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
