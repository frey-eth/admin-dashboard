import React, { useEffect } from "react";
import { Table } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { getUsers } from "../features/customers/CustomerSlice";

const columns = [
  {
    title: "No.",
    dataIndex: "key",
  },
  {
    title: "Name",
    dataIndex: "name",
    defaultSortOrder: "descend",
    sorter: (a, b) => a.name.length - b.name.length,
  },
  {
    title: "Email",
    dataIndex: "email",
  },
  {
    title: "Phone Number",
    dataIndex: "mobile",
  },
];

const Customers = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getUsers());
  }, []);
  const customerState = useSelector((state) => state.customer.customers);
  const data = [];
  for (let i = 0; i < customerState.length; i++) {
    if (customerState[i].role !== "admin") {
      data.push({
        key: i + 1,
        name: customerState[i].name,
        email: customerState[i].email,
        mobile: customerState[i].mobile,
      });
    }
  }
  return (
    <div>
      <h3 className="mt-4">Customers</h3>
      <Table columns={columns} dataSource={data} />
    </div>
  );
};

export default Customers;
