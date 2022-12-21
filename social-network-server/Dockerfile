# syntax=docker/dockerfile:1

FROM golang:1.19-alpine
WORKDIR /app

COPY go.mod ./
COPY go.sum ./
RUN go mod download
ADD common ./common
ADD router ./router
COPY *.go ./
RUN ls -ll
RUN go build -o /main
EXPOSE 8080
CMD [ "/main" ]