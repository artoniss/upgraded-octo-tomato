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
  getHello(@Res() res: Response) {
    res.status(HttpStatus.OK).json(this.appService.getHello());
  }

  @Post('addCustomer')
  @Header('Content-Type', 'application/json')
  addCustomer(@Body() body: Customer, @Res() res: Response): void {
    this.appService.addCustomer(body);
    res.status(HttpStatus.OK).json(body);
  }
}
