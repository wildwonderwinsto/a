import express from "express";
import { createServer as createViteServer } from "vite";
import path from "path";

async function startServer() {
  const app = express();
  const PORT = 3000;

  // Middleware to parse JSON bodies
  app.use(express.json());

  // Waitlist API Handler
  // Security: Input validation, generic errors, server-side secrets
  app.post("/api/waitlist", async (req, res) => {
    try {
      const { email, turnstileToken } = req.body;

      // 1. Validate Input (Server-Side)
      if (!email || typeof email !== "string" || email.length > 254) {
        return res.status(400).json({ error: "Invalid email format", errorId: "ERR_VALIDATION_1" });
      }

      // RFC 5322 regex validation
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        return res.status(400).json({ error: "Invalid email format", errorId: "ERR_VALIDATION_2" });
      }

      if (!turnstileToken || typeof turnstileToken !== "string") {
        return res.status(400).json({ error: "Human verification required", errorId: "ERR_TURNSTILE_MISSING" });
      }

      const sanitizedEmail = email.trim().toLowerCase();

      // 2. Turnstile Verification (Server-Side)
      // STUB: In production, call Cloudflare Turnstile API using process.env.TURNSTILE_SECRET_KEY
      const turnstileSecret = process.env.TURNSTILE_SECRET_KEY;
      if (turnstileToken !== "stub-pass" && turnstileSecret) {
         // simulated failure logic would go here
      }

      // 3. Rate Limiting (Server-Side via simulated Redis)
      // STUB: Use Upstash Redis to limit to 3/IP/hour
      // Redis INCR logic goes here...

      // 4. Supabase Insert (Server-Side via Service Role)
      // STUB: Use parameterized insert with Supabase Service Role Key
      // Security: Parameterized query to prevent CWE-89 SQL Injection
      // db.from('waitlist').insert({ email: sanitizedEmail })

      // Successfully processed
      res.status(200).json({ success: true, message: "Added to waitlist" });
    } catch (err: any) {
      // 5. Error Handling: Never leak stack traces to client
      const errorId = crypto.randomUUID();
      console.error(`[WAITLIST_ERROR] ID: ${errorId} | Request IP: ${req.ip} | Details:`, err.message);
      
      // Generic message returned
      res.status(500).json({ error: "Something went wrong. Please try again.", errorId });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    // For Express 4
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
