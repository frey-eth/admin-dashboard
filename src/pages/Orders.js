import React, { useEffect } from "react";
import { Table } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { getOrders, updateOrderStatus } from "../features/auth/AuthSlice";
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
  for (let i = 0; i < orderState?.length; i++) {
    data.push({
      key: i + 1,
      orderBy: orderState[i]?.shippingInfo.name,
      products: orderState[i]?.orderItems?.map((product) => (
        <div key={product._id}>
          <p className="badge bg-dark mx-1 align-items-center p-2 text-uppercase">
            {product.productId.title} - {product.color.title} - Quantity:
            {product.quantity}
          </p>
        </div>
      )),
      amount: `$${orderState[i].totalPriceAfterDiscount}`,
      date: new Date(orderState[i].createdAt).toLocaleString(),
      status: (
        <>
          <select
            className="form-control form-select"
            defaultValue={
              orderState[i].orderStatus ? orderState[i].orderStatus : "Ordered"
            }
            onChange={(e) => {
              const orderData = {
                _id: orderState[i]._id,
                orderStatus: e.target.value,
              };
              dispatch(updateOrderStatus(orderData));
            }}
          >
            <option value="Ordered">Ordered</option>
            <option value="In Progress">In Progress</option>
            <option value="Delivered">Delivered</option>
          </select>
        </>
      ),
    });
  }
  return (
    <div>
      <h3 className="mt-4">Orders</h3>
      <Table columns={columns} dataSource={[...data]} />
    </div>
  );
};

export default Orders;
