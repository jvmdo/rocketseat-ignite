import { Readable } from "node:stream";

class FirstOfTheYear extends Readable {
  index = 0;

  _read() {
    const i = this.index++;

    setTimeout(() => {
      if (i < 5) {
        const buffer = Buffer.from(String(i));
        this.push(buffer);
      } else {
        this.push(null);
      }
    }, 500);
  }
}

const topLevel = await fetch("http://localhost:3334", {
  method: "POST",
  body: new FirstOfTheYear(),
  duplex: "half",
});

const data = await topLevel.text();

console.log({ data });
