import { Injectable } from '@nestjs/common';
import { Db } from './db/db';
import { Customer } from './dto/customer.dto';

@Injectable()
export class AppService {
  private readonly customers: Customer[] = [];
  async getHello(): Promise<Customer[]> {
    const db = new Db();
    await db.init();
    db.createTableCustomers();
    return this.customers;
  }
  addCustomer(customer: Customer) {
    console.log(`${customer.name} added`);
    console.log(`his phone: ${customer.phoneNumber}`);
    this.customers.push(customer);
  }
}
