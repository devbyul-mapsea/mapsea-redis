import { Response } from 'express';

export default class ApiResponse {
  static redirect = (
    res: Response,
    url: string,
    query: { [key: string]: any }
  ) => {
    const queryParmas = new URLSearchParams();
    Object.keys(query).map((key) => {
      queryParmas.set(key, query[key]);
    });

    const redirectUrl = `${url}?${queryParmas.toString()}`;
    res.redirect(redirectUrl);
  };

  static status = (res: Response, status: number) => {
    res.status(status).end();
  };

  static end = (res: Response, data: any = null) => {
    res.end(data);
  };

  static send = (res: Response, status: number = 200, data: any = null) => {
    res.status(status).send(data);
  };

  static result = (res: Response, status: number = 200, data: any = null) => {
    res.status(status);

    res.json({
      success: true,
      data,
      respone: new Date(),
    });
  };
}
