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
const checkAuthor = require('./middleware/check-author');
const checkAuth = require('./middleware/check-auth');

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
          server.get('/r/:title', checkAuthor, (req, res) => {
            const actualPage = '/recipe';
            const queryParams = { id: req.params.title };
            app.render(req, res, actualPage, queryParams);
          });

          server.get('/edit_recipe/:id', (req, res) => {
            const queryParams = { id: req.params.id };
            app.render(req, res, '/edit', queryParams);
          });

          server.get('/new_recipe', checkAuth, (req, res) => {
            if (!res.locals.issuerId) {
              res.redirect(301, '/auth/login');
            }
            app.render(req, res, '/new_recipe');
          });

          server.get('/u/me', checkAuth, (req, res) => {
            if (!res.locals.issuerId) {
              res.redirect(301, '/');
            }
            app.render(req, res, '/user/me');
          });

          server.get('/u/:userId', (req, res) => {
            const actualPage = '/user';
            const queryParams = { userId: req.params.userId };
            app.render(req, res, actualPage, queryParams);
          });

          server.get('/auth/login', checkAuth, (req, res) => {
            if (res.locals.issuerId) {
              res.redirect(301, '/recipes');
            }
            app.render(req, res, '/auth/login');
          });

          server.get('/auth/register', checkAuth, (req, res) => {
            if (res.locals.issuerId) {
              res.redirect(301, '/recipes');
            }
            app.render(req, res, '/auth/register');
          });

          server.get('/', checkAuth, (req, res) => {
            console.log('alla pagina iniziale');
            if (res.locals.issuerId) {
              res.redirect(301, '/recipes');
            }
            app.render(req, res, '/');
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
  })
  .catch(ex => {
    console.error(ex.stack);
    process.exit(1);
  });
