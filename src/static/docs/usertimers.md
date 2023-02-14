# /usertimers

<details>
  <summary>Get all user timers by USER id</summary>

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
  url example: {url}/usertimers/703e434d-e2de-4c99-b792-0a9d7feb2d64
  ```
</details>

<details>
  <summary>Get all user ACTIVE timers by USER id</summary>

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
  query param: ?status=active
  ```

  ```
  url example: {url}/usertimers/703e434d-e2de-4c99-b792-0a9d7feb2d64?status=active
  ```
</details>

<details>
  <summary>Get all user ACTIVE timers in INTREVAL by USER id</summary>

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
  query param: ?from={timestamp}
  query param: ?to={timestamp}
  * from and to is optional, if not set this params, result will be like get all user timers by user id 
  ```

  ```
  url example: {url}/usertimers/29f74412-ca98-41ca-89ec-d72dcd028c36?from=1676060155796&to=1676060335479
  ```
</details>

