import * as assert from "assert";
import app from "../app"
import * as request from 'supertest'

describe('demo', () => {
  const server = createServer(app.callback())

  server.listen(3000)
  server.on('error', onError)
  server.on('listening', onListening)

  assert.equal(1 + 1, 2);

  // 模拟http请求
  await request(server)
    .get('/')
    .expect(200)
});