import http from "node:http";
import { Pool } from "pg";

const port = process.env.PORT || 3000;

const caCert = process.env.PROJECT_CA_CERT;
const sslConfig = caCert
  ? { ca: caCert, rejectUnauthorized: true }
  : { rejectUnauthorized: false };

// Strip sslmode from connection string when no CA cert is provided,
// so the explicit ssl option takes effect without conflicts
const dbUrl = process.env.DATABASE_URL || "";
const connectionString = caCert ? dbUrl : dbUrl.replace(/[?&]sslmode=[^&]*/g, "");

const pool = new Pool({ connectionString, ssl: sslConfig });

const server = http.createServer(async (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    res.writeHead(204);
    res.end();
    return;
  }

  if (req.url === "/logs") {
    try {
      const result = await pool.query(
        "SELECT id, timestamp, level, message FROM logs ORDER BY timestamp DESC"
      );
      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(JSON.stringify(result.rows));
    } catch (err) {
      const message = err instanceof Error ? err.message : String(err);
      res.writeHead(500, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ error: "Failed to fetch logs", details: message }));
    }
    return;
  }

  res.writeHead(200, { "Content-Type": "application/json" });
  res.end(JSON.stringify({ message: "Hello from the backend!" }));
});

server.listen(port, () => {
  console.log(`Backend running on port ${port}`);
});
