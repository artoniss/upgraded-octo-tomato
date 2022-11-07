import { Connection, QueryResult } from 'postgresql-client';

export class Db {
  private connection: Connection;
  async init() {
    console.log(1);
    this.connection = new Connection(
      'postgres://postgres:postgrespw@localhost:49153',
    );

    await this.connection.connect();
  }

  async createTableCustomers() {
    console.log(2);

    const result: QueryResult = await this.connection
      .query(
        `CREATE TABLE customers (
            name varchar(80),
            phone_number varchar(80)
        );`,
      )
      .catch((err) => {
        console.log(err);
        return result;
      });
    return result;
  }

  async insertCustomer(name: string, phoneNumber: string) {
    const result: QueryResult = await this.connection.query(
      `INSERT INTO customers (name, phone_number) VALUES (
              ${name},
              ${phoneNumber}
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
      `SELECT name FROM customers WHERE phone_number = ${phoneNumber};`,
    );
    return result;
  }

  async close() {
    await this.connection.close();
  }
}
