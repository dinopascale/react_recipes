const express = require('express');
const { parse } = require('url');
const nextJS = require('next');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');

const custoErrorHandler = require('./middleware/errorHandler');
const userRoutes = require('./api/user');
const recipeRoutes = require('./api/recipe');
const rateRoutes = require('./api/rate');
const commentRoutes = require('./api/comment');
// const db = require('./db/db');

const dev = process.env.NODE_ENV !== 'production';
const port = process.env.PORT || 3000;

const app = nextJS({ dev });
const handle = app.getRequestHandler();

app
  .prepare()
  .then(() => {
    console.log('Connection to mongodb');
    const db = mongoose
      .connect(
        process.env.MONGODB_URI || 'mongodb://localhost:27017/ReactRecipes'
      )
      .then(
        database => {
          console.log(database);
          //   const reactRecipesdb = database.db('ReactRecipes');
          const reactRecipesdb = database;
          const server = express();

          //MIDDLEWARES
          server.use(bodyParser.json());
          server.use(cookieParser({ httpOnly: true }));
          server.use((req, res, next) => {
            req.db = reactRecipesdb;
            next();
          });

          //API ROUTES
          server.use('/api', userRoutes);
          server.use('/api', recipeRoutes);
          server.use('/api', rateRoutes);
          server.use('/api', commentRoutes);

          //DYNAMIC ROUTES
          server.get('/r/:title', (req, res) => {
            const actualPage = '/recipe';
            const queryParams = { id: req.params.title };
            app.render(req, res, actualPage, queryParams);
          });

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
        },
        err => {
          console.log(err);
        }
      );

    // const server = express();

    // //MIDDLEWARES
    // server.use(bodyParser.json());
    // server.use(cookieParser({ httpOnly: true }));
    // server.use((req, res, next) => {
    //   req.db = db;
    //   next();
    // });

    // //API ROUTES
    // server.use('/api', userRoutes);
    // server.use('/api', recipeRoutes);
    // server.use('/api', rateRoutes);
    // server.use('/api', commentRoutes);

    // //DYNAMIC ROUTES
    // server.get('/r/:title', (req, res) => {
    //   const actualPage = '/recipe';
    //   const queryParams = { id: req.params.title };
    //   app.render(req, res, actualPage, queryParams);
    // });

    // //DEFAULT ROUTE
    // server.get('*', (req, res) => {
    //   return handle(req, res);
    // });

    // //CUSTOM ERROR HANDLER
    // server.use(custoErrorHandler);

    // server.listen(port, err => {
    //   if (err) throw err;
    //   console.log(`>>Ready on port ${port}`);
    // });
  })
  .catch(ex => {
    console.error(ex.stack);
    process.exit(1);
  });
