# Important!!!
If you use this server via nginx than you need append **/api/** before each endpoint.

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
Use _imageUId_ that you recived from `/upload` response.
```json
{
    "description": "Some post",
    "imageUId": "8771c637-0e17-4850-b655-ab64f594f2f3"
}
```
#### Output body JSON
```json
{
    "PostId": 1,
    "description": "Some post",
    "userID": 1,
    "imageUId": "8771c637-0e17-4850-b655-ab64f594f2f3",
    "likes": null,
    "comments": null
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
    "postId": 1,
    "description": "Some post",
    "userID": 1,
    "imageUId": "8771c637-0e17-4850-b655-ab64f594f2f3",
    "likes": null,
    "comments": null
    },
    {
    "postId": 2,
    "description": "Some post",
    "userID": 1,
    "imageUId": "8771c637-0e17-4850-b655-ab64f594f2f3",
    "likes": null,
    "comments": null
    }
]
```
#### Examples 
```
localhost:5555/posts // First 20 posts
localhost:5555/posts?offset=10 // 20 posts beginning with 10 post
```

### [POST] /set/like
#### Required headers
```
Authorization: Bearer <token>
```
#### Input json
```json
{
    "postId": 1
}
```
#### Output body JSON
```json
{
    "postId": 1,
    "userId": 1
}
```

### [POST] /unset/like
#### Required headers
```
Authorization: Bearer <token>
```
#### Input json
```json
{
  "postId": 1
}
```
#### Output body
```text
"OK"
```

### [POST] /set/comment
#### Required headers
```
Authorization: Bearer <token>
```
#### Input json
```json
{
  "commentText": "Haha",
  "postId": 1
}
```
#### Output body json
```json
{
  "commentId": 3,
  "postId": 1,
  "userId": 1,
  "commentText": "Haha"
}
```

### [POST] /unset/comment
#### Required headers
```
Authorization: Bearer <token>
```
#### Input json
```json
{
  "commentId": 3
}
```
#### Output body
```text
"OK"
```


### [GET] /img/<imageUId>
No need append **/api/** before this endpoint, it refers to nginx, not api server. 
Use _imageUId_ that you will get after upload image via _/upload_ api server endpoint.
#### Required headers
_Emtpy_
#### Input
_Emtpy_
#### Output
Image :)