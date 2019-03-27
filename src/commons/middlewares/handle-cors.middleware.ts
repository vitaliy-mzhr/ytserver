import { HttpStatus, Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response } from 'express';

export function handleCors(req: Request, res: Response, next: Function) {
  res.header('Access-Control-Allow-Origin', req.headers.origin as string);
  res.header('Access-Control-Allow-Methods', 'PATCH, GET, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.header('Access-Control-Allow-Credentials', 'true');
  if (req.method === 'OPTIONS') {
    return res.sendStatus(HttpStatus.OK);
  }
  next();
}
