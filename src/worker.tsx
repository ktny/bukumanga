import { Hono } from "hono";

interface Env {
  ASSETS: { fetch: typeof fetch };
}

const app = new Hono<{ Bindings: Env }>();

app.get("*", async (c) => c.env.ASSETS.fetch(new URL("/index.html", c.req.url)));

export default app;
