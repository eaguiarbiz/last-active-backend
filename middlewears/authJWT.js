import jwt from 'jsonwebtoken';
import config from '../config.json';
import logger from '../helpers/logger';

export default function authJWT (req, res, next) {
  if (req.headers && req.headers.authorization) {
    const token = req.headers.authorization.replace(/^Bearer\s/, '');
    jwt.verify(token, config.secret, (err, decode) => {
      if (err) req.user = undefined;
      req.user = decode;
      next();
    })
  }
  else{
    req.user = undefined; 
    next();
  }
}