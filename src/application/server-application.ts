import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { RootModule } from './di/root.module';
import helmet from 'helmet';
import * as session from 'express-session';

export class ServerApplication {
  public async run(): Promise<void> {
    const app: NestExpressApplication =
      await NestFactory.create<NestExpressApplication>(RootModule);
    app.use(helmet.hidePoweredBy());
    app.use(helmet.noSniff());


    app.use(session({
      secret: 'g11soat4',
      resave: false,
      saveUninitialized: false,
      cookie: {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        maxAge: 3600000,
      },
    }));

    app.useGlobalPipes(new ValidationPipe());
    await app.listen(3334);
  }

  public static new(): ServerApplication {
    return new ServerApplication();
  }
}
