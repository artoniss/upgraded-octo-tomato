import { Connection, QueryResult } from 'postgresql-client';
import { Customer } from 'src/dto/customer.dto';

export class Db {
  private connection: Connection;
  constructor() {
    this.connection = new Connection(
      'postgres://postgres:postgrespw@localhost:49153',
    );
  }
  async init() {
    // todo: вынести коннекшн
    console.log(1);
    await this.connection.connect();
  }

  async createTableCustomers() {
    const result: QueryResult = await this.connection
      .query(
        `CREATE TABLE customers (
            name varchar(80),
            phone_number varchar(80) PRIMARY KEY
        );`,
      )
      .catch((err) => {
        console.log(err);
        return result;
      });
    return result;
  }

  async insertCustomer(customer: Customer) {
    const result: QueryResult = await this.connection.query(
      `INSERT INTO customers (name, phone_number) VALUES (
              '${customer.name}',
              '${customer.phoneNumber}'
          );`,
    );
    return result;
  }

  async selectAllCustomers() {
    const result: QueryResult = await this.connection.query(
      `SELECT * FROM customers;`,
    );
    return result;
  }

  async selectCustomer(phoneNumber: string) {
    const result: QueryResult = await this.connection.query(
      `SELECT name FROM customers WHERE phone_number = '${phoneNumber}';`,
    );
    return result;
  }

  async close() {
    await this.connection.close();
  }
}
