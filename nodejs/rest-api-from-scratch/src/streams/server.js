import http from "node:http";
import { Transform } from "node:stream";

class MyTransformStream extends Transform {
  _transform(chunk, encoding, callback) {
    const transformed = Number(chunk.toString()) * -1;
    console.info(transformed);
    callback(null, Buffer.from(String(transformed)));
  }
}

const server = http.createServer(async (req, res) => {
  const buffers = [];

  for await (const chunk of req) {
    buffers.push(chunk);
  }

  const theWholeThing = Buffer.concat(buffers).toString();

  return res.end(theWholeThing);
});

server.listen(3334);
