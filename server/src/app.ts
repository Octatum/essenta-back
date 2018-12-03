import express from 'express';
import compression from 'compression'; // compresses requests
import functions from 'firebase-functions';
import session from 'express-session';
import bodyParser from 'body-parser';
import logger from './util/logger';
import lusca from 'lusca';
import dotenv from 'dotenv';
import flash from 'express-flash';
import path from 'path';
import passport from 'passport';
import expressValidator from 'express-validator';
import bluebird from 'bluebird';

// Load environment variables from .env file, where API keys and passwords are configured
dotenv.config({ path: '.env.example' });

// Controllers (route handlers)
import * as homeController from './controllers/home';
import * as userController from './controllers/user';
import * as apiController from './controllers/api';
import * as contactController from './controllers/contact';

// API keys and Passport configuration
import * as passportConfig from './config/passport';

// Create Express server
const app = express();

// Express configuration
app.set('port', process.env.PORT || 3000);
app.use(compression());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(expressValidator());
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());
app.use(lusca.xframe('SAMEORIGIN'));
app.use(lusca.xssProtection(true));
app.use((req, res, next) => {
  res.locals.user = req.user;
  next();
});
/**
 * Primary app routes.
 */
app.get('/', () => {});
app.get('/login', () => {});
app.post('/login', () => {});

/**
 * API examples routes.
 */
app.get('/api', apiController.getApi);

/**
 * OAuth authentication routes. (Sign in)
 */

export default app;
export const widgets = functions.https.onRequest(app);
