import { Catch, HttpException } from '@nestjs/common';

@Catch(HttpException)
export class HttpExceptionFilter {
  catch(exception, host) {
    console.log(exception.status)
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest();
    const status = exception.getStatus();

    response
      .status(status)
      .json({
        status: exception.status == 200 || exception.status == 201   ? "Success": "Error",
        message: exception.getResponse().message,
      });
  }
}

export class HttpSuccessResponse {
  constructor(message, data) {
    console.log("here")
  }
}