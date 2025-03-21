import basicAuth from 'basic-auth'
import { RequestHandler } from 'express';

const USERNAME_ = process.env.USERNAME_METRICS;
const PASSWORD_ = process.env.PASSWORD_METRICS;

const BasicAuthHandler: RequestHandler = function(req, res, next) {
  const credentials = basicAuth(req);
  
  if (!credentials || credentials.name !== USERNAME_ || credentials.pass !== PASSWORD_) {
    res.set('WWW-Authenticate', 'Basic realm="Prometheus Metrics"');
    res.status(401).send('Authentication required.');
    return;
  }
  
  // If authentication is successful, proceed to the next middleware
  next();
}

export default BasicAuthHandler;