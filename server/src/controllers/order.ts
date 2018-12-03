import { getAllOrders } from "../models/Order";
import { Response } from "express";

export async function allOrders(req: any, response: Response): Promise<any> {
  const orders = await getAllOrders();

  response.json(orders);
}