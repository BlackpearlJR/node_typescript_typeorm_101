import { UserController } from "@/application/Controllers/UserController";
import RouteInterface from "@/interfaces/RouteInterface";

const UserRoutes: RouteInterface[] = [
  {
    method: "get",
    route: "/users",
    controller: UserController,
    action: "all",
    middleware: ['auth']
  },
  {
    method: "get",
    route: "/user/:id",
    controller: UserController,
    action: "one",
    middleware: ['auth']
  },
  {
    method: "post",
    route: "/user",
    controller: UserController,
    action: "create",
    middleware: ['auth']
  },
  {
    method: "delete",
    route: "/user/:id",
    controller: UserController,
    action: "remove",
    middleware: ['auth']
  }
]

export default UserRoutes;