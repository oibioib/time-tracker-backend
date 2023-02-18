# /timers

<details>
  <summary>Get single timer by TIMER id</summary>

  ```
  method: GET
  ```

  ```
  request body: none
  ```

  ```
  headers:none
  ```

  ```
  url example: {url}/timers/f7e4ba02-8fbb-46d3-a170-d8aeaf66b271

  ```
</details>

<details>
  <summary>Create new timer</summary>

  ```
  method: POST
  ```

  ```
  request body:

  {
    "userId": "703e434d-e2de-4c99-b792-0a9d7feb2d64",
    "title": "Timer test add 1 with project 67",
    "startTime": "1231321313",
    "projectId": "be469dcb-ceda-4d20-9cb5-73cf8d9d619d"
  }
  ```

  ```
  headers: Content-Type: application/json
  ```

  ```
  url example: {url}/timers
  ```
</details>

<details>
  <summary>Update single timer by TIMER id </summary>

  ```
  method: PATCH
  ```

  ```
  request body:

  {
    "title": ?,
    "totalTime": ?,
    "isActive": ?
    "projectId": ?
  }

  * ? - optional param
  ```

  ```
  headers: Content-Type: application/json
  ```

  ```
  url example: {url}/timers/f7e4ba02-8fbb-46d3-a170-d8aeaf66b271
  ```
</details>

<details>
  <summary>Delete single timer by TIMER id</summary>

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
  url example: {url}/timers/f7e4ba02-8fbb-46d3-a170-d8aeaf66b271
  ```
</details>

