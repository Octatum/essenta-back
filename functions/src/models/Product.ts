import { APIItem } from "./Order";
import * as contentfulApi from "../util/contentfulApi";

export type OrderProduct = {
  containerName: string;
  fraganceName: string;
  colorName: string;
  price: number;
  amount: number;
};

export async function getProduct(product: APIItem) {
  const container = await contentfulApi.getDataById(product.id);
  const color = await contentfulApi.getDataById(product.colorId);
  const fragance = await contentfulApi.getDataById(product.fraganceId);

  const orderProduct: OrderProduct = {
    containerName: container.sizeName,
    fraganceName: fragance.name,
    colorName: color.colorName,
    price: container.sizePrice,
    amount: product.amount,
  };
  console.log(orderProduct);

  return orderProduct;
}
