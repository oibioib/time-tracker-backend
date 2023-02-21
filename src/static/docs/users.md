# /users

<details>
  <summary>Get all users</summary>

  ```
  method: get
  ```

  ```
  request body: none
  ```

  ```
  headers:none
  ```

  ```
  url example: {url}/users
  ```
</details>

<details>
  <summary>Get single user by USER id</summary>

  ```
  method: get
  ```

  ```
  request body: none
  ```

  ```
  headers:none
  ```

  ```
  url example: {url}/users/703e434d-e2de-4c99-b792-0a9d7feb2d64

  ```
</details>

<details>
  <summary>Create new user</summary>

  ```
  method: POST
  ```

  ```
  request body:

  {
    "githubId": 1564654654,
    "githubName": "User name"
  }
  ```

  ```
  headers: Content-Type: application/json
  ```

  ```
  url example: {url}/users
  ```
</details>

<details>
  <summary>Update single user by USER id </summary>

  ```
  method: PATCH
  ```

  ```
  request body:

  {
    "name": ?,
  }

  * ? - optional param
  ```

  ```
  headers: Content-Type: application/json
  ```

  ```
  url example: {url}/users/703e434d-e2de-4c99-b792-0a9d7feb2d64
  ```
</details>