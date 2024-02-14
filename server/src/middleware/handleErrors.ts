// handleErrors.ts
import { NextFunction, Request, Response } from 'express';

interface ErrorHandler {
  (err: any, res: Response): void;
}

const ERROR_HANDLERS: Record<string, ErrorHandler> = {
  MongoServerError: (err, res) => {
    const name = err.name || err.code || 'Error';
    const message = err.message || 'Internal Server Error';
    res.status(400).json({ name, message }).end();
  },
  ValidationError2: (err, res) => {
    const name = err.name || err.code || 'Error';
    const message = err.message || 'Internal Server Error';
    res.status(400).json({ name, message }).end();
  },
  defaultError: (err, res) => {
    const name = err.name || err.code || 'Error';
    const status = err.status || 500;
    const message = err.message || 'Internal Server Error';
    if (process.env.LOCATION === 'localhost') console.error(name, err.stack);
    res.status(status).json({ name, message }).end();
  },
};

export default (err: any, _req: Request, res: Response, _next: NextFunction) => {
  const handler = ERROR_HANDLERS[err.name] || ERROR_HANDLERS.defaultError;
  handler(err, res);
};
