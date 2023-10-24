import React, { useEffect } from "react";
import { Table } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { getOrders } from "../features/auth/AuthSlice";
const columns = [
  {
    title: "No.",
    dataIndex: "key",
  },
  {
    title: "Order By",
    dataIndex: "orderBy",
  },
  {
    title: "Product",
    dataIndex: "products",
  },
  {
    title: "Amount",
    dataIndex: "amount",
  },
  {
    title: "Date",
    dataIndex: "date",
  },
  {
    title: "Status",
    dataIndex: "status",
  },
];

const Orders = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getOrders());
  }, []);
  const orderState = useSelector((state) => state.auth.orders);
  const data = [];
  for (let i = 0; i < orderState.length; i++) {
    data.push({
      key: i + 1,
      orderBy: orderState[i].orderBy.name,
      products: orderState[i].products.map((product) => (
        <p className="badge bg-dark mx-1 align-items-center p-2">
          {product.product.title}
        </p>
      )),
      amount: `$${orderState[i].paymentIntent.amount}`,
      date: new Date(orderState[i].createdAt).toLocaleString(),
      status: orderState[i].orderStatus,
    });
  }
  return (
    <div>
      <h3 className="mt-4">Orders</h3>
      <Table columns={columns} dataSource={data} />
    </div>
  );
};

export default Orders;
