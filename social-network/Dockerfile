FROM node:14.15-alpine as build

WORKDIR /usr/src/app
COPY package.json package-lock.json ./
RUN npm install
COPY . .
RUN npm run build
FROM nginx:1.17.1-alpine
COPY --from=build /usr/src/app/dist/social-network /usr/share/nginx/html
