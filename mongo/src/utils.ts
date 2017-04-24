import * as http from 'http';

export function createError(error: string | Error, statusCode?: number) {
  let message: any;
  let code: number;

  if (error instanceof Error) {
       if (error.name === 'MongoError') {
        statusCode = 400;
        code = (error as any).code;
        message = (error as any).errmsg;
      } else {
        statusCode = 400;
        message = (error as any).message;
      }
  } else {
    message = error;
  }

  if (message.inner) {
    delete message.inner;
  }

  let err = {
    statusCode,
    error: http.STATUS_CODES[statusCode],
    message
  };

  if (code) {
    err['code'] = code;
  }

  return err;
}