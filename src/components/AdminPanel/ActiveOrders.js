import { collection, onSnapshot } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { db } from "../../config/firebaseConfig";
import ActiveOrderDetails from "./ActiveOrderDetails";

const ActiveOrders = (props) => {
  const [orders, setOrders] = useState([]);
  const [isOrdersLoading, setIsOrdersLoading] = useState(true);
  const { currentPage } = props;

  const getOrder = async () => {
    onSnapshot(collection(db, "Orders/"), (querySnapshot) => {
      setOrders([]);
      querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        setOrders((prevState) => [
          ...prevState,
          {
            order: doc.data(),
            orderId: doc.id,
            showDetails: doc.data().showDetails,
          },
        ]);
      });
      setIsOrdersLoading(false);
    });
  };

  useEffect(() => {
    getOrder();
    // eslint-disable-next-line
  }, []);

  return (
    <>
      {currentPage === "ActiveOrders" && !isOrdersLoading && (
        <>
          <div className="text-center text-4xl font-bold mt-4 mb-4">
            Active Orders
          </div>
          <div>
            {orders.length === 0 && (
              <div className="w-full text-center">No Order Found.</div>
            )}
            {orders.map((order) => (
              <div
                key={order.oderId + "_" + Math.random()}
                className={`m-4 flex-1 shadow-xl rounded-xl overflow-hidden border-2 ${
                  order.showDetails === undefined
                    ? "border-green-800"
                    : "border-zinc-500"
                }`}
              >
                <ActiveOrderDetails
                  activeOrderModalActive={order.showDetails}
                  order={order}
                  orders={orders}
                  onSetOrders={(order) => {
                    setOrders(order);
                  }}
                />
              </div>
            ))}
          </div>
        </>
      )}
    </>
  );
};

export default ActiveOrders;
