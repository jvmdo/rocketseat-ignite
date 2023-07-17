import { Readable, Transform, Writable } from "node:stream";

class MyReadableStream extends Readable {
  index = 0;

  _read() {
    const i = this.index++;

    setTimeout(() => {
      if (i < 100) {
        const buffer = Buffer.from(String(i));
        this.push(buffer);
      } else {
        this.push(null);
      }
    }, 500);
  }
}

class MyTransformStream extends Transform {
  _transform(chunk, encoding, callback) {
    const transformed = Number(chunk.toString()) * -1;
    callback(null, Buffer.from(String(transformed)));
  }
}

class MyWritableStream extends Writable {
  _write(chunk, encoding, callback) {
    console.log(Number(chunk.toString()) * 10);
    callback();
  }
}

new MyReadableStream()
  .pipe(new MyTransformStream())
  .pipe(new MyWritableStream());
