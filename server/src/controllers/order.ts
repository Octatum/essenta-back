import * as OrderModel from "../models/Order";
import { Request, Response } from "express";

export async function allOrders(req: Request, res: Response): Promise<any> {
  const orders = await OrderModel.getAllOrders();

  res.json(orders);
}

export async function createOrder(req: Request, res: Response): Promise<any> {
  const { items, customer } = req.body;

  const orderId = await OrderModel.createOrder(items, customer);

  res.json({ orderId });
}
