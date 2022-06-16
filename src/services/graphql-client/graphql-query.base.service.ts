import * as http from 'http';

import AppConfig from './../../config/app-config';

export class GraphQLQueryBaseService {
  async execute(query, variables): Promise<any> {
    return new Promise((resolve, reject) => {
      let rawData = '';
      const req = http.request(
        AppConfig.graphQueryConnectionConfig,
        (res) => {
          res.on('data', (chunk) => {
            return rawData += chunk;
          });
          res.on('end', () => {
            const parsedData = JSON.parse(rawData);
            resolve(parsedData);
          });
        });
      req.on('error', (e) => {
        reject(e);
      });
      const postData = JSON.stringify({
        query: query,
        variables
      });
      // Write data to request body
      req.write(postData);
      req.end();
    });
  }
}