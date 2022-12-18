## Endpoints 
### [POST]  /register
#### Required headers
_Empty_
#### Input body JSON
```
{
    "username": "admin",
    "password": "admin"
}
```
#### Output body JSON
```
"OK"
```

### [POST]  /login 
#### Required headers
_Empty_
#### Input body JSON
```
{
    "username": "admin",
    "password": "admin"
}
```
#### Output body JSON
```
{
    "refreshToken": "2e4f0259-d91c-45ee-9316-be65384e41ac",
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhdXRob3JpemVkIjp0cnVlLCJleHAiOjE2NzEyODA3ODUsInVzZXJuYW1lIjoiYWRtaW4ifQ.An6Lr52oNtNolCj2krWdKK30AXCNUk41Tj5_fwaf45s"
}
```

### [GET] /auth/verify
#### Required headers
```
Authorization: Bearer <token>
```
#### Input body JSON
_Empty_
#### Output body JSON
```
"OK"
```
### [POST] /refresh
#### Required headers
_Empty_
#### Input body JSON
```
"<refreshToken>"
```
#### Output body JSON
```
{
    "refreshToken": "2e4f0259-d91c-45ee-9316-be65384e41ac",
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhdXRob3JpemVkIjp0cnVlLCJleHAiOjE2NzEyODA3ODUsInVzZXJuYW1lIjoiYWRtaW4ifQ.An6Lr52oNtNolCj2krWdKK30AXCNUk41Tj5_fwaf45s"
}
```