import firebaseDb from "../util/firebaseDb";

const COLLECTION_NAME = "order";

export type Item = {
  id: string;
  amount: number;
  color: string;
  name: string;
};

export type Order = {
  id: string;
  items: Item[];
};

export type OrderModel = {
  getAllOrders: getAllOrdersFunction;
  getOrderById: getOrderByIdFunction;
};

type getAllOrdersFunction = () => Promise<Order[]>;
type getOrderByIdFunction = (orderId: string) => Order;

const orderCollectionRef = firebaseDb.collection(COLLECTION_NAME);

export async function getAllOrders() {
  const snapshot = await orderCollectionRef.get();

  const allOrders: Order[] = [];

  snapshot.forEach((order: FirebaseFirestore.QueryDocumentSnapshot) => {
    allOrders.push({
      id: order.id,
      items: order.data().items,
    });
  });

  return allOrders;
}