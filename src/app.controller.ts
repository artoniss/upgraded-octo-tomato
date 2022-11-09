import {
  Body,
  Controller,
  Get,
  Header,
  Post,
  HttpStatus,
  Res,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Response } from 'express';
import { AppService } from './app.service';
import { Customer } from './dto/customer.dto';

@Controller('customers')
export class AppController {
  constructor(
    private readonly appService: AppService,
    private configService: ConfigService,
  ) {}

  @Get('getAll')
  async getAllCustomers(@Res() res: Response) {
    const result = await this.appService.getAllCustomers().catch((err) => {
      console.error(err);
      res.status(HttpStatus.SERVICE_UNAVAILABLE).json(err);
    });
    res.status(HttpStatus.OK).json({ response: result });
  }

  @Post('addCustomer')
  @Header('Content-Type', 'application/json')
  async addCustomer(
    @Body() body: Customer,
    @Res() res: Response,
  ): Promise<void> {
    const result = await this.appService.addCustomer(body).catch((err) => {
      console.log(err);
      res.status(HttpStatus.SERVICE_UNAVAILABLE).json(err);
    });
    res.status(HttpStatus.OK).json({ response: result });
  }
}
