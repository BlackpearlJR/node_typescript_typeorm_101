import { getRepository, getManager } from "typeorm";
import { NextFunction, Request, Response } from "express";
import { User } from "../Entities/User";
import { NOT_MODIFIED, NO_CONTENT, OK } from "@/configs/httpStatus";
import { validate } from "class-validator";

export class UserController {
  private userRepository = getRepository(User);
  async all(request: Request, response: Response, next: NextFunction) {
    return this.userRepository.find();
  }

  async one(request: Request, response: Response, next: NextFunction) {
    const user = await this.userRepository.findOne(request.params.id);
    if (user){
      response.send({
        message: OK.message,
        result: user
      });
    } else {
      response
        .status(NO_CONTENT.code)
        .send({
          message: NO_CONTENT.message
        });
    }
  }

  async create(request: Request, response: Response, next: NextFunction) {
    const {
      email,
      username,
      password,
      firstname,
      lastname
    } = request.body;
    const user = this.userRepository.create({
      email,
      username,
      password,
      firstname,
      lastname
    });

    const errors = await validate(user);

    if (errors && errors.length > 0){
      // console.log('=>>>', errors);
      const firstError = errors[0].constraints;
      // last key of column errors
      const error = firstError[Object.keys(firstError).pop()];
      response.send({
        message: error
      })
    } else {
      const result = await this.userRepository.save(user);
      console.log('result', result);
      return {
        message: OK.message,
        result: result
      }
    }

    // getManager().save(user).catch(e => {
    //   console.log(e);
    // });
    // response.send({ test: 'test'});
    
    // return {
    //   message: OK.message,
    //   result: user
    // };
    // if (!user){
    // } else {
    //   response.status(NO_CONTENT.code).send({
    //     message: NO_CONTENT.message
    //   });
    // }
  }

  async remove(request: Request, response: Response, next: NextFunction) {
    const userToRemove = await this.userRepository.findOne(request.params.id);
    await this.userRepository.remove(userToRemove);
  }
}