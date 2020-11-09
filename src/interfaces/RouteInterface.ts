interface RouteInterface{
  method: string;
  route: string;
  controller: any;
  action: string;
  middleware?: string[];
}

export default RouteInterface;