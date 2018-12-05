import { Request, Response } from "express";
import { validationResult } from "express-validator/check";
import ip from "ip";
import FormData from "form-data";
import fetch, { Headers } from "node-fetch";

import * as OrderModel from "../models/Order";
import { Buffer } from "buffer";

export async function allOrders(req: Request, res: Response): Promise<any> {
  const orders = await OrderModel.getAllOrders();

  res.json(orders);
}

export async function createOrder(req: Request, res: Response): Promise<any> {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }

  const { items, customer } = req.body;

  try {
    const orderId: String = await OrderModel.createOrder(items, customer);
    const totalCost: Number = 1;
    const redirectionUrl: String = await getRedirectionUrl(orderId, totalCost);
    res.json({ orderId, redirectionUrl });
  } catch (error) {
    res.sendStatus(400);
  }
}

async function getRedirectionUrl(orderId: String, totalCost: Number) {
  const formData = new FormData();
  const headers = new Headers();
  const username = process.env.TP_CLIENT_ID;
  const password = process.env.TP_CLIENT_PASSWORD;
  const hostUrl = "https://www.toditocash.com/tpayQA/redirect.php";

  // Preparar datos y hacer encode como Form (necesario para TP)
  formData.append("CONTROL_NUMBER", orderId.toString());
  formData.append("AMOUNT", totalCost.toString());
  formData.append("ADDRESS", ip.address());

  const base64AuthData: string = Buffer.from(`${username}:${password}`).toString("base64");

  headers.append("AUTHORIZATION", `Basic ${base64AuthData}`);

  const response = await fetch(hostUrl, {
    method: "POST",
    body: formData,
    headers,
  });

  const jsonResponse = await response.json();

  let redirectionUrl: String = jsonResponse.msgError;

  redirectionUrl = redirectionUrl.slice(17, -2);

  return redirectionUrl;
}

export async function updateOrder(req: Request, res: Response) {
  console.info("Updating order:", req);
  res.sendStatus(200);
}