import React from "react";
import { BsArrowUpRight, BsArrowDownRight } from "react-icons/bs";
import { Divider, Radio, Table } from "antd";
import { Column } from "@ant-design/plots";

const Dashboard = () => {
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
      dataIndex: "product",
    },
    {
      title: "Status",
      dataIndex: "status",
    },
  ];
  const dataOrder = [
    {
      key: "1",
      name: "John Brown",
      age: 32,
      address: "New York No. 1 Lake Park",
    },
    {
      key: "2",
      name: "Jim Green",
      age: 42,
      address: "London No. 1 Lake Park",
    },
    {
      key: "3",
      name: "Joe Black",
      age: 32,
      address: "Sydney No. 1 Lake Park",
    },
    {
      key: "4",
      name: "Disabled User",
      age: 99,
      address: "Sydney No. 1 Lake Park",
    },
  ];
  return (
    <div>
      <h3 className="mb-4">Dashboard</h3>
      <div className="d-flex justify-content-between gap-5">
        <div className="d-flex justify-content-between align-items-center flex-grow-1 bg-white p-3 rounded-3">
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
        <div className="d-flex justify-content-between align-items-center flex-grow-1 bg-white p-3 rounded-3">
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
        <div className="d-flex justify-content-between align-items-center flex-grow-1 bg-white p-3 rounded-3">
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
