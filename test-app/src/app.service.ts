import { Injectable } from '@nestjs/common';
import { Customer } from './dto/customer.dto';

@Injectable()
export class AppService {
  private readonly customers: Customer[] = [];
  getHello(): Customer[] {
    return this.customers;
  }
  addCustomer(customer: Customer) {
    console.log(`${customer.name} added`);
    console.log(`his phone: ${customer.phoneNumber}`);
    this.customers.push(customer);
  }
}
