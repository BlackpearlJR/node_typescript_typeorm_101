import { UNAUTHORIZED } from "@/configs/httpStatus";
import AuthController from "@/application/Controllers/AuthController";
import { User } from "../Entities/User";
import { getRepository } from "typeorm";

// const Auth = new AuthController();

async function Authenticate (req, res, next) {
  if (req.headers.authorization){
    const user = await getRepository(User).findOne({ remember_token: req.headers.authorization });
    // console.log('AuthController', await Auth.checkLoggedIn(req.headers.authorization));
    // console.log('AuthController +++++', req.headers.authorization);
    // console.log('AuthController', user);
    
    // const user = await this.userRepository.findOne(request.params.id);
    next();
  } else {
    res.status(UNAUTHORIZED.code).send(UNAUTHORIZED.message);
  }
}

export default Authenticate;
