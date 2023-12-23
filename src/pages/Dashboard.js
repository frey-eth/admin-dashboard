import React from "react";
import { BsArrowUpRight, BsArrowDownRight } from "react-icons/bs";
import { Table } from "antd";
import { Column } from "@ant-design/plots";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getOrders, updateOrderStatus } from "../features/auth/AuthSlice";

const Dashboard = () => {
  const dispatch = useDispatch();
  const data = [
    {
      type: "Jan",
      sales: 38,
    },
    {
      type: "Feb",
      sales: 52,
    },
    {
      type: "Mar",
      sales: 61,
    },
    {
      type: "Apr",
      sales: 145,
    },
    {
      type: "May",
      sales: 48,
    },
    {
      type: "Jun",
      sales: 38,
    },
    {
      type: "Jul",
      sales: 38,
    },
    {
      type: "Aug",
      sales: 38,
    },
    {
      type: "Sep",
      sales: 46,
    },
    {
      type: "Oct",
      sales: 32,
    },
    {
      type: "Nov",
      sales: 76,
    },
    {
      type: "Dec",
      sales: 100,
    },
  ];
  const config = {
    data,
    xField: "type",
    yField: "sales",
    color: ({ type }) => {
      return "#ffd333";
    },
    label: {
      position: "middle",
      style: {
        fill: "#FFFFFF",
        opacity: 0.6,
      },
    },
    xAxis: {
      label: {
        autoHide: true,
        autoRotate: false,
      },
    },
    meta: {
      type: {
        alias: "Month",
      },
      sales: {
        alias: "Income",
      },
    },
  };
  const columns = [
    {
      title: "No.",
      dataIndex: "key",
    },
    {
      title: "Name",
      dataIndex: "name",
    },
    {
      title: "Product",
      dataIndex: "products",
    },
    {
      title: "Status",
      dataIndex: "status",
    },
  ];
  useEffect(() => {
    dispatch(getOrders());
  }, []);
  const orderState = useSelector((state) => state.auth.orders).slice(0, 4);
  const dataOrder = [];
  for (let i = 0; i < orderState?.length; i++) {
    dataOrder.push({
      key: i + 1,
      name: orderState[i]?.shippingInfo.name,
      products: orderState[i]?.orderItems?.map((product) => (
        <div key={product._id}>
          <p className="badge bg-dark mx-1 align-items-center p-2 text-uppercase">
            {product.productId.title} - {product.color.title} - Quantity:
            {product.quantity}
          </p>
        </div>
      )),
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
      <h3 className="mb-4">Dashboard</h3>
      <div className="d-flex justify-content-between gap-5">
        <div className="d-flex justify-content-between align-items-center flex-grow-1 bg-white p-3 rounded-3 shadow fw-bold">
          <div>
            <p>Total</p>
            <h4>$1000</h4>
          </div>
          <div className="d-flex flex-column justify-content-end">
            <h6 className="green">
              <BsArrowUpRight /> 32%
            </h6>
            <p className="mb-0">Compared to April 2023</p>
          </div>
        </div>
        <div className="d-flex justify-content-between align-items-center flex-grow-1 bg-white p-3 rounded-3 shadow fw-bold">
          <div>
            <p>Total</p>
            <h4>$1000</h4>
          </div>
          <div className="d-flex flex-column justify-content-end">
            <h6 className="red">
              <BsArrowDownRight /> 32%
            </h6>
            <p className="mb-0">Compared to April 2023</p>
          </div>
        </div>
        <div className="d-flex justify-content-between align-items-center flex-grow-1 bg-white p-3 rounded-3 shadow fw-bold">
          <div>
            <p>Total</p>
            <h4>$1000</h4>
          </div>
          <div className="d-flex flex-column justify-content-end">
            <h6 className="red">
              <BsArrowDownRight /> 32%
            </h6>
            <p className="mb-0">Compared to April 2023</p>
          </div>
        </div>
      </div>
      <div className="my-4">
        <Column {...config} />
      </div>
      <div className="mt-4">
        <h3 className="mb-4">Recent Orders</h3>
        <div>
          <Table columns={columns} dataSource={dataOrder} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
