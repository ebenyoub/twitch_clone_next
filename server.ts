// server.ts
import https from 'https';
import fs from 'fs';
import next from 'next';
import http from 'http'; // Importer http

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
    https.createServer({
        key: fs.readFileSync('./localhost-key.pem'),
        cert: fs.readFileSync('./localhost.pem'),
    }, (req: http.IncomingMessage, res: http.ServerResponse) => { // Utiliser http.IncomingMessage et http.ServerResponse
        handle(req, res);
    }).listen(3000, (err?: Error) => { // Prendre un argument err facultatif
        if (err) throw err;
        console.log('> Ready on https://localhost:3000');
    });
});
