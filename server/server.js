const express = require('express');
const { parse } = require('url');
const nextJS = require('next');
const bodyParser = require('body-parser');

const custoErrorHandler = require('./middleware/errorHandler');
const userRoutes = require('./api/users');
const recipeRoutes = require('./api/recipes');
const db = require('./db/db');

const dev = process.env.NODE_ENV !== 'production';
const port = process.env.PORT || 3000;
const app = nextJS({ dev });
const handle = app.getRequestHandler();

app
  .prepare()
  .then(() => {
    const server = express();
    //MIDDLEWARES
    server.use(bodyParser.json());

    //API ROUTES
    server.use('/api', userRoutes);
    server.use('/api', recipeRoutes);

    //DYNAMIC ROUTES

    //DEFAULT ROUTE
    server.get('*', (req, res) => {
      return handle(req, res);
    });

    //CUSTOM ERROR HANDLER
    server.use(custoErrorHandler);

    server.listen(port, err => {
      if (err) throw err;
      console.log(`>>Ready on port ${port}`);
    });
  })
  .catch(ex => {
    console.error(ex.stack);
    process.exit(1);
  });
