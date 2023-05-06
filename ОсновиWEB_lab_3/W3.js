const http = require("http");
const fs=require('fs');
const url = require("url");
const qs = require("querystring");
const server = http.createServer((req, res) => {
  const method = req.method;
  const path = url.parse(req.url).pathname;

  if (method === "GET" && path === "/") {
	  fs.readFile('Web3.html',(err,data)=>{	
		res.writeHead(200, { "Content-Type": "text/html" });
		res.end(data);
  });
    
  } else if (method === "POST" && path === "/process") {
    let body = "";
    req.on("data", (chunk) => {
      body += chunk.toString();
    });
	
	req.on("end", () => {
      const data = qs.parse(body);
      const text = data.text;
	  const text1=text.replace(/[\s.,!0-9-_%<>]/g,'')
	  for(var i=0, upper=0, lower=0, char, all_letters = text1.length; i < all_letters; i++) {
       char = text1.charAt(i);

		if (char == char.toUpperCase()) {
			upper++;
		}
		else if (char == char.toLowerCase()) {
			lower++;
		}
		upperLetter=upper;
		lowerLetter=lower;
		}
      
      res.writeHead(200, { "Content-Type": "text/html" });
      res.write(`
        <!DOCTYPE html>
        <html lang="ru">
          <head>
		    <meta charset="UTF-8">
            <head>
              <title>Result</title>
          </head>
          <body>
            <h1>Result of work </h1>
            <p>Input row: ${text}</p>
            <p>Upper: ${upperLetter}</p>
            <p>Lower: ${lowerLetter}</p>
          </body>
        </html>
      `);
      res.end();
    });
  } else {
    res.writeHead(404, { "Content-Type": "text/plain" });
    res.write("404 Not Found\n");
    res.end();
  }
});

server.listen(3000, () => {
  console.log("Сервер запущено");
});
