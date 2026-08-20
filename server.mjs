import http from "node:http";
import { readFile, stat } from "node:fs/promises";
import { extname, join, normalize } from "node:path";
import { fileURLToPath } from "node:url";
import { handleChat } from "./lib/chat-service.js";

const ROOT = fileURLToPath(new URL(".", import.meta.url));
const PORT = Number(process.env.PORT || 3000);
const SECURITY_HEADERS = {
  "content-security-policy": "default-src 'self'; base-uri 'self'; connect-src 'self' https://*.analytics.google.com https://*.google-analytics.com https://*.googletagmanager.com https://ad.doubleclick.net https://google.com https://google.co.jp https://googleads.g.doubleclick.net https://pagead2.googlesyndication.com https://www.google.com https://www.google.co.jp https://www.googleadservices.com; font-src 'self' https://fonts.gstatic.com; form-action 'self'; frame-ancestors 'none'; frame-src https://www.googletagmanager.com; img-src 'self' data: https://*.g.doubleclick.net https://*.google-analytics.com https://*.googletagmanager.com https://google.com https://google.co.jp https://googleads.g.doubleclick.net https://pagead2.googlesyndication.com https://www.google.com https://www.google.co.jp https://www.googleadservices.com; manifest-src 'self'; media-src 'self'; object-src 'none'; script-src 'self' 'unsafe-inline' https://googleads.g.doubleclick.net https://pagead2.googlesyndication.com https://www.google.com https://www.googleadservices.com https://www.googletagmanager.com; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; upgrade-insecure-requests",
  "referrer-policy": "strict-origin-when-cross-origin",
  "x-content-type-options": "nosniff",
  "x-frame-options": "DENY",
  "permissions-policy": "camera=(), geolocation=(), microphone=()",
};

async function loadLocalEnv() {
  try {
    const text = await readFile(join(ROOT, ".env.local"), "utf8");
    for (const line of text.split(/\r?\n/)) {
      const match = line.match(/^([A-Z0-9_]+)=(.*)$/);
      if (!match || process.env[match[1]]) continue;
      let value = match[2].trim();
      if ((value.startsWith('"') && value.endsWith('"')) || (value.startsWith("'") && value.endsWith("'"))) value = value.slice(1, -1);
      process.env[match[1]] = value;
    }
  } catch (error) {
    if (error?.code !== "ENOENT") throw error;
  }
}

await loadLocalEnv();

const MIME = {
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".svg": "image/svg+xml",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".webp": "image/webp",
  ".ico": "image/x-icon",
  ".xml": "application/xml; charset=utf-8",
  ".txt": "text/plain; charset=utf-8",
  ".webmanifest": "application/manifest+json",
};

function sendJson(res, status, body, headers = {}) {
  res.writeHead(status, { "content-type": "application/json; charset=utf-8", "cache-control": "no-store", ...headers });
  res.end(JSON.stringify(body));
}

async function readJson(req) {
  const chunks = [];
  let size = 0;
  for await (const chunk of req) {
    size += chunk.length;
    if (size > 24_000) throw new Error("too_large");
    chunks.push(chunk);
  }
  return JSON.parse(Buffer.concat(chunks).toString("utf8") || "{}");
}

function resolveStaticPath(pathname) {
  let requestPath = decodeURIComponent(pathname);
  if (requestPath === "/") requestPath = "/index.html";
  else if (!extname(requestPath)) requestPath += ".html";
  const safePath = normalize(requestPath).replace(/^([.][.][/\\])+/, "");
  const fullPath = join(ROOT, safePath);
  return fullPath.startsWith(ROOT) ? fullPath : null;
}

const server = http.createServer(async (req, res) => {
  for (const [name, value] of Object.entries(SECURITY_HEADERS)) res.setHeader(name, value);

  try {
    const url = new URL(req.url || "/", `http://${req.headers.host || "localhost"}`);
    if (url.pathname === "/api/chat") {
      const body = await readJson(req);
      const result = await handleChat({ method: req.method, body, ip: req.socket.remoteAddress || "local" });
      sendJson(res, result.status, result.body, result.headers);
      return;
    }

    const filePath = resolveStaticPath(url.pathname);
    if (!filePath) {
      res.writeHead(403).end("Forbidden");
      return;
    }
    const info = await stat(filePath);
    if (!info.isFile()) throw Object.assign(new Error("not_file"), { code: "ENOENT" });
    const content = await readFile(filePath);
    res.writeHead(200, { "content-type": MIME[extname(filePath).toLowerCase()] || "application/octet-stream", "cache-control": "no-cache" });
    res.end(content);
  } catch (error) {
    if (error?.message === "too_large") {
      sendJson(res, 413, { error: "送信内容が大きすぎます。" });
      return;
    }
    if (error instanceof SyntaxError) {
      sendJson(res, 400, { error: "送信内容を読み取れませんでした。" });
      return;
    }
    if (error?.code === "ENOENT") {
      res.writeHead(404, { "content-type": "text/plain; charset=utf-8" }).end("Not Found");
      return;
    }
    console.error("Local server error", { name: error?.name || "Error" });
    res.writeHead(500, { "content-type": "text/plain; charset=utf-8" }).end("Server Error");
  }
});

server.listen(PORT, "127.0.0.1", () => {
  console.log(`Rain AI local server: http://127.0.0.1:${PORT}`);
});
