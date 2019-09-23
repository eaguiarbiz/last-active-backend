import HttpStatus from 'http-status-codes';
import logger from '../helpers/logger';

export default function authGuard(req, res, next) {
  if (req.user) { next() }
  else {
    logger.info('user not authorized');
    return res.sendStatus(HttpStatus.UNAUTHORIZED);
  }
}