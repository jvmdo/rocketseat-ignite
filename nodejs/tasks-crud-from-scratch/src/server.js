import http from "node:http";
import { bodyParser } from "./middlewares/body-parser.js";
import { routes } from "./routes.js";

const server = http.createServer(async (req, res) => {
  await bodyParser(req, res);

  const { method, url } = req;
  const route = routes.find(
    (route) => route.method === method && route.path.test(url)
  );

  if (route) {
    return route.handler(req, res);
  }

  return res.writeHead(404).end("No matching route for your request");
});

server.listen(3333);
