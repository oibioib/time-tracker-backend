# /projecttimers

<details>
  <summary>Get all project timers by PROJECT id</summary>

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
  url example: {url}/projecttimers/4cdad8a5-8d7a-4c42-893f-b009e2792380
  ```
</details>

<details>
  <summary>Get all project timers in INTERVAL by PROJECT id</summary>

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
  * from and to is optional, if not set this params, result will be like get all project timers by project id 
  ```

  ```
  url example: {url}/projecttimers/4cdad8a5-8d7a-4c42-893f-b009e2792380?from=1676060155796&to=1676060335479
  ```
</details>

