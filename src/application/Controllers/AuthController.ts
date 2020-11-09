import { getRepository, getManager } from "typeorm";
import { NextFunction, Request, Response } from "express";
import { User } from "../Entities/User";
import { NOT_MODIFIED, NO_CONTENT, OK } from "@/configs/httpStatus";
import { validate } from "class-validator";

export default class AuthController {
  private userRepository = getRepository(User);

  async login(request: Request, response: Response, next: NextFunction) {
    const {
      username,
      password
    } = request.body;

    console.log('login ', { username, password });
  }

  async checkLoggedIn(token: string){
    const user = await this.userRepository.findOne({ remember_token: token });

    console.log('user');
    return user;
  }
}