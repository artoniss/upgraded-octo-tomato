import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { configuration } from '../config/configuration';
import { validationSchema } from '../config/validation';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: `${process.cwd()}/config/env/${process.env.NODE_ENV}.env`,
      // isGlobal: true,
      load: [configuration],
      validationSchema,
    }),
  ], // PrismaModule, ProductsModule, AuthModule,
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
