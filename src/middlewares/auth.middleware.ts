import * as jwt from 'jsonwebtoken';

import AppConfig from './../../config/app-config';

export const verifyToken = async (req, res, next) => {
  const token = req.headers.authorization.split(' ')[1];
  if (!token) {
    return res.status(403).send("A token is required for authentication");
  }
  try {
    req.user = await validateJWT(req);
  } catch (err) {
    return res.status(401).send("Invalid Token");
  }
  return next();
};

export const validateJWT = async (req) => {
  const token = req.headers.authorization?.split(' ')[1] || '';
  const decodedJWT: any = jwt.verify(token, AppConfig.SECRET_KEY);
  if (decodedJWT.exp * 1000 < Date.now()) {
    throw Error('Token expired');
  }
  return decodedJWT;
}

