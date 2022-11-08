import {
  Body,
  Controller,
  Get,
  Header,
  Post,
  HttpStatus,
  Res,
} from '@nestjs/common';
import { Response } from 'express';
import { AppService } from './app.service';
import { Customer } from './dto/customer.dto';

@Controller('customers')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('getAll')
  async getAllCustomers(@Res() res: Response) {
    res.status(HttpStatus.OK).json(await this.appService.getAllCustomers());
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
