import { ConnectionManager, getConnectionManager, Connection, createConnection } from "typeorm";

import DBConfig from "./dbconfig/dbconfig";

export default class Database {
  connectionManager: ConnectionManager;
  connection: Connection;
  constructor() {
    this.connectionManager = getConnectionManager();
    this.initConnection();
  }

  private async initConnection() {
    try {
      const hasConnection = this.connectionManager.has(DBConfig.DB_CONNECTION_NAME);
      if (hasConnection) {
        this.connection = this.connectionManager.get(DBConfig.DB_CONNECTION_NAME);
        if (!this.connection.isConnected) {
          this.connection = await this.connection.connect();
          return;
        }
        return;
      }
      this.createDbConnection();
    } catch (error) {
      throw error;
    }

  }

  private async createDbConnection() {
    this.connection = await createConnection(DBConfig.connectionOptions);
  }
}