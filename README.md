# LastActive 1.0

## Getting Started
1. donwload and install mongo db
https://docs.mongodb.com/manual/administration/install-community/

2. Start mongo `mongod`

3. Install node js.  Minimum requirement version 8.

4. Go in project directory run `npm install`

5. run `npm run start`

6. If all went well the api will be running on `localhost:8080/api`


## Endpoints

A series of endpoints have been created to allow the consumer of this api to create edit and update a user.  
Any endpoint that will expose user information requires a auth token (Bearer token) to be sent with the request in the Authorization header.

### Register User
**POST** `localhost:8080/api/users/register`

**sample request body:**
``` 
  {
	  "email": "newuser@hotmail.com",
	  "password": "password"
  }
```

If your request is successful the api will resond with the users profile. 

**sample response:**
```
{
    "id": "5c63637fe1e318f87af3bdb6",
    "email": "newuser@hotmail.com",
    "lastActive": "2019-02-13T00:23:27.263Z",
    "friends": []
}
```

### Sign-In
**POST** `localhost:8080/api/sign-in`

**sample request body:**
```
{
	"email": "newuser@hotmail.com",
	"password": "password"
}
```

**sample response:**
```
{
    "token": "eyJhbGciOiJIUzI1NiJ9.eyJpZCI6IjVjNjM2MzdmZTFlMzE4Zjg3YWYzYmRiNiIsImVtYWlsIjoibmV3dXNlckBob3RtYWlsLmNvbSIsImxhc3RBY3RpdmUiOiIyMDE5LTAyLTEzVDAwOjIzOjI3LjI2M1oiLCJmcmllbmRzIjpbXX0.ESK97KQvR68P2w-fsk8jWUvrXRL0o-Uf_d9KiZte8ko",
    "user": {
        "id": "5c63637fe1e318f87af3bdb6",
        "email": "newuser@hotmail.com",
        "lastActive": "2019-02-13T00:23:27.263Z",
        "friends": []
    }
}
```

Server will response will the users profile and the token.  This token must be used in the authorization header for all subsequent requests.
```Authorization: "Bearer eyJhbGciOiJIUzI1NiJ9.eyJpZCI6IjVjNjM2MzdmZTFlMzE4Zjg3YWYzYmRiNiIsImVtYWlsIjoibmV3dXNlckBob3RtYWlsLmNvbSIsImxhc3RBY3RpdmUiOiIyMDE5LTAyLTEzVDAwOjIzOjI3LjI2M1oiLCJmcmllbmRzIjpbXX0.ESK97KQvR68P2w-fsk8jWUvrXRL0o-Uf_d9KiZte8ko"```

### Follow/Unfollow Users(Authtoken Required)
Must pass in a **VALID** userID from another user or the server will respond with a 500 error.
If successful server will respond with the updated users profile with the new friend.

**Post** `localhost:8080/api/users/follow`

**Sample Request**
```
{
 "id": "5c5ce65b9bd958e00da0dc7a"
}
```

**Sample Response**
```
{
    "id": "5c63637fe1e318f87af3bdb6",
    "email": "newuser@hotmail.com",
    "lastActive": "2019-02-13T00:23:27.263Z",
    "friends": [
        {
            "id": "5c5ce65b9bd958e00da0dc7a",
            "email": "apple@gmail.com",
            "firstName": "apple",
            "lastName": "apple",
            "lastActive": "2019-02-13T00:36:08.095Z"
        }
    ]
}
```
**Post** `localhost:8080/api/users/unfollow`

Same results as above

### Set Users LastActive(Authtoken Required)
**POST** `localhost:8080/api/users/last-active`

No request body.  The api will know which user this is based on the token.

**Sample Response**
```
{
    "id": "5c63637fe1e318f87af3bdb6",
    "email": "newuser@hotmail.com",
    "lastActive": "2019-02-13T00:41:50.500Z",
    "friends": []
}
```

### Get User Profile(Authtoken Required)
**GET** `localhost:8080/api/users/me`

No Request body

**Sample Response**

```
{
    "id": "5c63637fe1e318f87af3bdb6",
    "email": "newuser@hotmail.com",
    "lastActive": "2019-02-13T00:41:50.500Z",
    "friends": []
}
```

**GET** `localhost:8080/api/users/{USERID}`

**sample url:** `localhost:8080/api/users/5c5ce65b9bd958e00da0dc7a`

**sample response**
```
{
    "id": "5c5ce65b9bd958e00da0dc7a",
    "email": "apple@gmail.com",
    "firstName": "apple",
    "lastName": "apple",
    "lastActive": "2019-02-13T00:54:50.059Z",
    "friends": []
}
```


