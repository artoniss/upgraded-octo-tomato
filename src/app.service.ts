import { Injectable } from '@nestjs/common';
import { QueryResult } from 'postgresql-client';
import { Db } from './db/db';
import { Customer } from './dto/customer.dto';

@Injectable()
export class AppService {
  private db = new Db();

  async getAllCustomers(): Promise<Customer[]> {
    await this.db.init();
    const query = await this.db.selectAllCustomers();
    const result = this.parseQueryCustomer(query);
    await this.db.close();
    return result;
  }

  async addCustomer(customer: Customer) {
    await this.db.init();
    const query = await this.db.selectCustomer(customer.phoneNumber);

    if (query.rows.length != 0) {
      await this.db.close();
      return { response: 'customer already exists' };
    }

    const insertQuery = await this.db.insertCustomer(customer).catch((err) => {
      console.log(err);
    });
    await this.db.close();

    return insertQuery;
  }

  private parseQueryCustomer(query: QueryResult): Customer[] {
    const customers: Customer[] = [];

    for (let i = 0; i < query.rows.length; i++) {
      customers.push(new Customer(query.rows[i][0], query.rows[i][1]));
    }
    return customers;
  }
}
