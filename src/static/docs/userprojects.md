# /userprojects

<details>
  <summary>Get all user projects by USER id</summary>

  ```
  method: GET
  ```

  ```
  request body: none
  ```

  ```
  headers: none
  ```

  ```
  url example: {url}/userprojects/703e434d-e2de-4c99-b792-0a9d7feb2d64
  ```
</details>

<details>
  <summary>Create new project</summary>

  ```
  method: POST
  ```

  ```
  request body:

  {
    "userId": "703e434d-e2de-4c99-b792-0a9d7feb2d64",
    "title": "New project title",
    "color": ? "#eeeeee" // default: "#ffffff",
    "salary": ? 10 // default: 0
  }
  ```

  ```
  headers: Content-Type: application/json
  ```

  ```
  url example: {url}/userprojects
  ```
</details>

<details>
  <summary>Update single project by PROJECT id </summary>

  ```
  method: PATCH
  ```

  ```
  request body:

  {
    "title": ?
    "color": ?
    "salary": ?
  }

  * ? - optional param
  ```

  ```
  headers: Content-Type: application/json
  ```

  ```
  url example: {url}/userprojects/fe5566c7-bc89-47f0-826b-3b9e66ead6f6
  ```
</details>

<details>
  <summary>Delete single project by PROJECT id</summary>

  ```
  method: DELETE
  ```

  ```
  request body: none

  ```

  ```
  headers: none
  ```

  ```
  url example: {url}/userprojects/68322c02-a30d-469c-8d35-1da782e3a5d0
  ```
</details>

