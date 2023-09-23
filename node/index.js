const http = require('http');
const fs = require('fs');

//criando o servidor http
const server = http.createServer((req, res) => {

    //obter o diretorio no argumento passado pelo terminal
    const caminho = process.argv[2];
    
    fs.readdir(caminho, (err, files) => {
        
    if (err) {
      res.writeHead(500, { 'Content-Type': 'text/plain' });
      res.end('erro :(');
    } else {

      const arquivosRetornados = files.map(file => `<li>${file}</li>`).join('');

      const htmlResponse = `
        <html>
          <body>
            <h1>Conteudo do Diretorio:</h1>
            <p>
              ${arquivosRetornados}
            </p>
          </body>
        </html>
      `;

      //para enviar o html com os arquivos encontrados
      res.writeHead(200, { 'Content-Type': 'text/html' });
      res.end(htmlResponse);
    }
  });
});

const PORT = 3000;
server.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}/`);
});




