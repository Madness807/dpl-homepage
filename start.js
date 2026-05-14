const http = require("http");
const { spawn } = require("child_process");

const appPort = Number(process.env.PORT || 3000);
const proxyPort = Number(process.env.HOMEPAGE_PROXY_PORT || 3001);

const app = spawn("node", ["server.js"], {
  cwd: "/app",
  env: { ...process.env, PORT: String(appPort) },
  stdio: "inherit",
});

app.on("exit", (code, signal) => {
  if (signal) process.kill(process.pid, signal);
  process.exit(code ?? 1);
});

const proxy = http.createServer((req, res) => {
  const upstream = http.request(
    {
      hostname: "127.0.0.1",
      port: appPort,
      method: req.method,
      path: req.url,
      headers: req.headers,
    },
    (upstreamRes) => {
      res.writeHead(upstreamRes.statusCode || 502, upstreamRes.headers);
      upstreamRes.pipe(res);
    },
  );

  upstream.on("error", (error) => {
    res.writeHead(502, { "content-type": "text/plain; charset=utf-8" });
    res.end(`Homepage upstream unavailable: ${error.message}`);
  });

  req.pipe(upstream);
});

proxy.on("upgrade", (req, socket, head) => {
  const upstream = http.request({
    hostname: "127.0.0.1",
    port: appPort,
    method: req.method,
    path: req.url,
    headers: req.headers,
  });

  upstream.on("upgrade", (upstreamRes, upstreamSocket) => {
    socket.write(
      `HTTP/${upstreamRes.httpVersion} ${upstreamRes.statusCode} ${upstreamRes.statusMessage}\r\n` +
        Object.entries(upstreamRes.headers)
          .map(([key, value]) => `${key}: ${value}`)
          .join("\r\n") +
        "\r\n\r\n",
    );
    upstreamSocket.pipe(socket).pipe(upstreamSocket);
  });

  upstream.on("error", () => socket.destroy());
  upstream.end(head);
});

proxy.listen(proxyPort, "0.0.0.0", () => {
  console.log(`Homepage proxy listening on ${proxyPort}, upstream ${appPort}`);
});
