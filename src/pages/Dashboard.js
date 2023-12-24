import React from "react";
import { BsArrowUpRight, BsArrowDownRight } from "react-icons/bs";
import { Table } from "antd";
import { Column } from "@ant-design/plots";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getMonthWiseOrderCount,
  getMonthWiseOrderIncome,
  getOrders,
  getYearWiseOrderIncome,
  updateOrderStatus,
} from "../features/auth/AuthSlice";

const Dashboard = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getOrders());
    dispatch(getMonthWiseOrderCount());
    dispatch(getMonthWiseOrderIncome());
    dispatch(getYearWiseOrderIncome());
  }, []);
  const month = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const data = [
    {
      type: "September",
      sales: 11,
    },
    {
      type: "October",
      sales: 7,
    },
    {
      type: "November",
      sales: 10,
    },
  ];

  const monthOrderCountState = useSelector(
    (state) => state.auth?.monthOrderCount
  );

  for (let i = 0; i < monthOrderCountState?.length; i++) {
    data.push({
      type: month[monthOrderCountState[i]._id.month - 1],
      sales: monthOrderCountState[i].count,
    });
  }

  const monthOrderIncomeState = useSelector(
    (state) => state.auth?.monthOrderIncome
  );

  const yearOrderIncomeState = useSelector(
    (state) => state.auth?.yearOrderIncome
  );

  const config = {
    data,
    xField: "type",
    yField: "sales",
    color: ({ type }) => {
      return "#FA9181";
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
        autoHide: false,
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
        <div className="income-wrapper d-flex justify-content-between align-items-center flex-grow-1 bg-white p-3 rounded-3 shadow fw-bold">
          <div>
            <p>Total Income</p>
            <h4 className="text-success">
              $
              {Math.round(
                yearOrderIncomeState && yearOrderIncomeState[0]?.amount
              ) || 0}
            </h4>
          </div>
          {/* <div className="d-flex flex-column justify-content-end">
            <h6 className="green">
              <BsArrowUpRight /> 32%
            </h6>
            <p className="mb-0">Compared to April 2023</p>
          </div> */}
        </div>
        <div className="income-wrapper d-flex justify-content-between align-items-center flex-grow-1 bg-white p-3 rounded-3 shadow fw-bold">
          <div>
            <p>Current Month's Income</p>
            <h4 className="text-success">
              $
              {Math.round(
                monthOrderIncomeState && monthOrderIncomeState[0]?.amount
              ) || 0}
            </h4>
          </div>
          <div className="d-flex flex-column justify-content-end">
            <h6 className="red">
              <BsArrowDownRight /> 32%
            </h6>
            <p className="mb-0">Compared to last Month</p>
          </div>
        </div>
        {/* <div className="d-flex justify-content-between align-items-center flex-grow-1 bg-white p-3 rounded-3 shadow fw-bold">
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
        </div> */}
      </div>
      <div className="my-4 shadow p-2">
        <h3 className="mb-4">Products Insight</h3>
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
