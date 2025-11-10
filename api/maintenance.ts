// api/maintenance.ts
export const config = { runtime: "edge" };

export default async function handler(req: Request) {
  const on = (process.env.NEXUM_MAINTENANCE ?? "").toLowerCase() === "true";

  if (on) {
    const html = `<!doctype html>
<html lang="en"><head>
<meta charset="utf-8"/>
<meta name="viewport" content="width=device-width,initial-scale=1"/>
<title>Nexum – Maintenance</title>
<style>
  body{margin:0;font-family:system-ui,-apple-system,Segoe UI,Roboto,Ubuntu,Helvetica,Arial,sans-serif;background:#0b1020;color:#e6e9f5;display:flex;min-height:100vh;align-items:center;justify-content:center}
  .card{max-width:640px;padding:32px;border-radius:16px;background:#121832;border:1px solid #1f2743;text-align:center}
  h1{margin:0 0 8px;font-size:28px}
  p{margin:0;color:#a9b3d1}
</style>
</head><body>
  <div class="card">
    <h1>🚧 Nexum is under maintenance</h1>
    <p>We’ll be back shortly.</p>
  </div>
</body></html>`;
    return new Response(html, {
      status: 503,
      headers: { "content-type": "text/html; charset=utf-8", "cache-control": "no-store" }
    });
  }

  // Pass-through to your app when not in maintenance
  return fetch(req);
}
