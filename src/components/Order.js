// src/components/Orders.js
import React, { useEffect, useState } from "react";
import { db } from "../firebaseConfig";
import { collection, getDocs, updateDoc, doc } from "firebase/firestore";

const Orders = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      const ordersCollection = collection(db, "orders");
      const ordersSnapshot = await getDocs(ordersCollection);
      const ordersList = ordersSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setOrders(ordersList);
    };

    fetchOrders();
  }, []);

  const updateOrderStatus = async (orderId, status) => {
    const orderRef = doc(db, "orders", orderId);
    await updateDoc(orderRef, { status });
    setOrders((prevOrders) =>
      prevOrders.map((order) =>
        order.id === orderId ? { ...order, status } : order
      )
    );
  };

  return (
    <div>
      <h2>Orders</h2>
      <ul>
        {orders.map((order) => (
          <li key={order.id}>
            <p>Customer: {order.customerName}</p>
            <p>Items: {order.items.join(", ")}</p>
            <p>Total Price: ${order.totalPrice}</p>
            <p>Status: {order.status}</p>
            <button onClick={() => updateOrderStatus(order.id, "delivered")}>
              Mark as Delivered
            </button>
            <button onClick={() => updateOrderStatus(order.id, "failed")}>
              Mark as Failed
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Orders;
