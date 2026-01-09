const http = require("http")

const PORT = 7000

const manifest = {
  id: "org.publicdomain.magnets",
  version: "1.0.0",
  name: "Public Domain Magnets",
  description: "Streams legales de dominio público usando torrents",
  resources: ["stream"],
  types: ["movie"],
  catalogs: [] 
}

const streamsDB = {
 tt2990140: [
    {
      title: "Dominio Público · 720p",
      infoHash: "1161d251dd02ffc1fb9e46b5eaa385727f7796c5",
      fileIdx: 0
    }
  ]
}

const server = http.createServer((req, res) => {
  // ===== CORS =====
  res.setHeader("Access-Control-Allow-Origin", "*")
  res.setHeader("Access-Control-Allow-Headers", "*")
  res.setHeader("Access-Control-Allow-Methods", "GET, OPTIONS")
  res.setHeader("Content-Type", "application/json")

  if (req.method === "OPTIONS") {
    res.writeHead(204)
    return res.end()
  }

  if (req.url === "/manifest.json") {
    return res.end(JSON.stringify(manifest))
  }

  const match = req.url.match(/^\/stream\/movie\/(.+)\.json$/)
  if (match) {
    const imdbId = match[1]
    return res.end(JSON.stringify({
      streams: streamsDB[imdbId] || []
    }))
  }

  res.statusCode = 404
  res.end(JSON.stringify({ error: "Not found" }))
})

server.listen(PORT, "0.0.0.0", () => {
      console.log(`Addon corriendo en http://127.0.0.1:${PORT}`)
})
