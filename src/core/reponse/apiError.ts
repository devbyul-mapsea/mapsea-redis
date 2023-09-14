import { logger } from '../config/logger';
import { Response } from 'express';
import { ValidationErrorCustomMsg } from '../interface';
import { StatusCodes } from 'http-status-codes';

export default class ApiError {
  res: Response;
  message: string;
  code: number | string;
  statusCode: number;
  validation?: ValidationErrorCustomMsg;
  sql?: string;

  constructor(
    res: Response,
    error: {
      message: string;
      code: string | number;
      statusCode: number;
      validation?: ValidationErrorCustomMsg;
      sql?: string;
    }
  ) {
    this.res = res;
    this.message = error?.message;
    this.code = error?.code;
    this.statusCode = error?.statusCode;
    this.validation = error?.validation;
    this.sql = error?.sql;
  }

  sendError = () => {
    try {
      let errorMessage = `[${this.code}] ${this.statusCode} ${this.message}`;
      this.sql ? (errorMessage += `\nSQL : ${this.sql}`) : null;
      this.validation
        ? (errorMessage += `\nValidation Error : ${JSON.stringify(
            this.validation
          )}`)
        : null;

      logger.error(errorMessage);

      return this.res.status(this.statusCode).json({
        code: this.code,
        statusCode: this.statusCode,
        message: this.message,
        validation: this.validation,
        sql: this.sql,
      });
    } catch (error) {
      return this.res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        code: 'INTERNAL_SERVER_ERROR',
        statusCode: StatusCodes.INTERNAL_SERVER_ERROR,
        message: 'Internal Server Error',
      });
    }
  };
}
