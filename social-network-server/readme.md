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

### [POST] /upload
#### Required headers
```
Authorization: Bearer <token>
```
#### Input 
Input file via form data.  
Next js code do this request: 
```javascript
let photo = document.getElementById("image-file").files[0];
let formData = new FormData();
     
formData.append("file", photo);
fetch('/upload', {method: "POST", body: formData});
```
or check the same request via postman https://youtu.be/S7bwkys6D0E?t=29

#### Output body JSON
Use this uid for send request to `/upload/post` endpoint.
```json
{
    "image_uid": "d4b4ce92-b61c-4da9-9a00-1707f66e08d5"
}
```

### [POST] /upload/post
#### Required headers
```
Authorization: Bearer <token>
```
#### Input json
Use _image_uid_ that you recived from `/upload` response.
```json
{
    "name": "Some post",
    "image_uid": "<image_uid>" 
}
```
#### Output body JSON
```json
{
  "id": 1,
  "name": "Some post",
  "image_uid": "d748e958-7869-4752-b3cc-be8681244f6f"
}
```

### [GET] /posts
#### Required headers
```
Authorization: Bearer <token>
```
#### Input
Optional query params: _offset_
#### Output body JSON
```json
[
    {
        "id": 1,
        "name": "Some post",
        "image_uid": "d748e958-7869-4752-b3cc-be8681244f6f"
    },
    {
        "id": 2,
        "name": "Some post",
        "image_uid": "d748e958-7869-4752-b3cc-be8681244f6f"
    }
]
```
#### Examples 
```
localhost:5555/posts // First 20 posts
localhost:5555/posts?offset=10 // 20 posts beginning with 10 post
```