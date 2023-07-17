import http from "node:http";
import { Transform } from "node:stream";

class WillThisEverEnd extends Transform {
  _transform(chunk, encoding, callback) {
    const transformed = Number(chunk.toString()) * -1;
    console.info(transformed);
    callback(null, Buffer.from(String(transformed)));
  }
}

const app = http.createServer(async (req, res) => {
  const buffers = [];

  for await (const chunk of req) {
    buffers.push(chunk);
  }

  const theWholeThing = Buffer.concat(buffers).toString();

  console.log(theWholeThing);
  return res.end(theWholeThing);
});

app.listen(3334);
