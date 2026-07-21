import { handleChat } from "../lib/chat-service.js";

function getClientIp(req) {
  const forwarded = req.headers["x-forwarded-for"];
  if (typeof forwarded === "string") return forwarded.split(",")[0].trim();
  return req.socket?.remoteAddress || "unknown";
}

function sameOrigin(req) {
  const origin = req.headers.origin;
  if (!origin) return true;
  const forwardedHost = req.headers["x-forwarded-host"] || req.headers.host;
  if (!forwardedHost) return false;
  try {
    return new URL(origin).host === forwardedHost;
  } catch {
    return false;
  }
}

export default async function handler(req, res) {
  if (!sameOrigin(req)) {
    res.status(403).json({ error: "このサイトからのみ利用できます。" });
    return;
  }

  const result = await handleChat({
    method: req.method,
    body: req.body,
    ip: getClientIp(req),
  });

  for (const [name, value] of Object.entries(result.headers)) res.setHeader(name, value);
  res.status(result.status).json(result.body);
}
