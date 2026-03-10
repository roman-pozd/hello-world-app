import http from "node:http";

const port = process.env.PORT || 3000;

const server = http.createServer((_req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.writeHead(200, { "Content-Type": "application/json" });
  res.end(JSON.stringify({ message: "Hello from the backend!" }));
});

server.listen(port, () => {
  console.log(`Backend running on port ${port}`);
});
