import { Result } from 'express-validator';

interface IError {
  code: string;
  statusCode: number;
  message: string;
}

export type ValidationErrorCustomMsg = Record<
  string,
  { location: any; value: any; msg: any }
>;

interface IValidationError extends IError {
  validation: ValidationErrorCustomMsg;
}

interface IDatabaseError extends IError {
  sql: string;
}

export interface IErrorStatus {
  [key: string]: IError;
}

export interface IValidationErrorStatus {
  [key: string]: (validation: Result<any>) => IValidationError;
}

export interface IDatabaseErrorStatus {
  [key: string]: (sql: string) => IDatabaseError;
}
