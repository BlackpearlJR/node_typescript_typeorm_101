import "reflect-metadata";
import { createConnection } from "typeorm";
import * as express from "express";
import * as bodyParser from "body-parser";
import { Request, Response } from "express";
import Middleware from "@/application/Middleware";
import Routes from "./routes";

const PORT = 8001;

function getMiddleware(arr: any){
  if (arr && arr.length > 0){
    const middle = arr.map(m => Middleware[m]);
    return middle;
  }
  return [];
}

createConnection().then(async connection => {

  // create express app
  const app = express();
  app.use(bodyParser.json());
  
  Routes.forEach(route => {
    const routeMiddleware = route.middleware && getMiddleware(route.middleware);
    (app as any)[route.method](route.route, routeMiddleware, (req: Request, res: Response, next: Function) => {
      const result = (new (route.controller as any))[route.action](req, res, next);
      
      if (result instanceof Promise) {
        result.then(result => result !== null && result !== undefined ? res.send(result) : undefined);

      } else if (result !== null && result !== undefined) {
        res.json(result);
      }
    });
  });

  // setup express app here
  // ...

  // start express server
  app.listen(PORT);

  // // insert new users for test
  // await connection.manager.save(connection.manager.create(User, {
  //     firstName: "Timber",
  //     lastName: "Saw",
  //     age: 27
  // }));
  // await connection.manager.save(connection.manager.create(User, {
  //     firstName: "Phantom",
  //     lastName: "Assassin",
  //     age: 24
  // }));

  console.log(`Express server has started on port ${PORT}. Open http://localhost:${PORT}/users to see results`);

}).catch(error => console.log(error));
