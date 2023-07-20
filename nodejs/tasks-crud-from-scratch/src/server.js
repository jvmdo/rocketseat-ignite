import http from "node:http";
import { bodyParser } from "./middlewares/body-parser.js";
import { routes } from "./routes.js";
import { extractQueryParams } from "./utils/extract-query-params.js";

const server = http.createServer(async (req, res) => {
  await bodyParser(req, res);

  const { method, url } = req;
  const route = routes.find(
    (route) => route.method === method && route.path.test(url)
  );

  if (route) {
    // Matched slugs
    const { groups } = route.path.exec(url);
    const { query, ...params } = groups;

    req.params = params;
    req.query = query ? extractQueryParams(query) : {};

    return route.handler(req, res);
  }

  return res.writeHead(404).end("No matching route for your request");
});

server.listen(3333);
