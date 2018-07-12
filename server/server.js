const express = require('express');
const { parse } = require('url');
const nextJS = require('next');

const dev = process.env.NODE_ENV !== 'production';
const app = nextJS({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  const server = express();

  //DYNAMIC ROUTES

  //DEFAULT ROUTE
  server.get('*', (req, res) => {
    return handle(req, res);
  });

  const port = process.env.PORT || 3000;

  server.listen(port, err => {
    if (err) throw err;
    console.log(`>>Ready on port ${port}`);
  });
});
