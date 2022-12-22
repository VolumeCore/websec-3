# syntax=docker/dockerfile:1

FROM golang:1.19-alpine as compiler
WORKDIR /app

COPY go.mod ./
COPY go.sum ./
RUN go mod download
ADD common ./common
ADD router ./router
COPY *.go ./
RUN CGO_ENABLED=0 go build -o /main -ldflags '-s'
FROM scratch
COPY --from=compiler /main /
EXPOSE 8080
CMD [ "/main" ]