import firebaseDb from "../util/firebaseDb";

const COLLECTION_NAME = "order";

export type Item = {
  id: string;
  amount: number;
  colorId: string;
};

export type Order = {
  id: string;
  items: Item[];
  customer: any;
};

export type OrderModel = {
  getAllOrders: getAllOrdersFunction;
  getOrderById: getOrderByIdFunction;
  createOrder: createOrderFunction;
};

type getAllOrdersFunction = () => Promise<Order[]>;
type getOrderByIdFunction = (orderId: string) => Order;
type createOrderFunction = (items: Item[], customer: any) => String;

const orderCollectionRef = firebaseDb.collection(COLLECTION_NAME);

export async function createOrder(items: Item[], customer: any) {
  const orderRef = await orderCollectionRef.add({
    items,
    customer,
  });

  return orderRef.id;
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
