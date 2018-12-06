import firebaseDb from "../util/firebaseDb";

const COLLECTION_NAME = "order";

export type APIItem = {
  id: string;
  amount: number;
  colorId: string;
  fraganceId: string;
};

export type Order = {
  id: string;
  items: APIItem[];
  customer: any;
};

export type OrderModel = {
  getAllOrders: getAllOrdersFunction;
  getOrderById: getOrderByIdFunction;
  createOrder: createOrderFunction;
};

type getAllOrdersFunction = () => Promise<Order[]>;
type getOrderByIdFunction = (orderId: string) => Order;
type createOrderFunction = (items: APIItem[], customer: any) => String;

const orderCollectionRef = firebaseDb.collection(COLLECTION_NAME);

export async function createOrder(items: APIItem[], customer: any) {
  // TODO: usar customer
  const orderRef = await orderCollectionRef.add({
    items,
    status: OrderStatus.waiting,
  });

  return orderRef.id;
}

export enum OrderStatus {
  canceled = -1,
  waiting = 0,
  approved = 1,
}

export async function getAllOrders() {
  const snapshot = await orderCollectionRef.get();

  const allOrders: Order[] = [];

  snapshot.forEach((order: FirebaseFirestore.QueryDocumentSnapshot) => {
    allOrders.push({
      id: order.id,
      items: order.data().items,
      customer: order.data().customer,
    });
  });

  return allOrders;
}
