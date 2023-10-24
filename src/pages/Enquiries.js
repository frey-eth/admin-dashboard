import React, { useEffect } from "react";
import { Table } from "antd";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getEnquiries } from "../features/enquiry/EnquirySlice";
import { AiOutlineDelete } from "react-icons/ai";

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
    title: "Email",
    dataIndex: "email",
  },
  {
    title: "Phone Number",
    dataIndex: "phone",
  },
  {
    title: "Comment",
    dataIndex: "comment",
  },
  {
    title: "Status",
    dataIndex: "status",
  },
  {
    title: "Action",
    dataIndex: "action",
  },
];

const Enquiries = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getEnquiries());
  }, []);
  const enquiryState = useSelector((state) => state.enquiry.enquiries);
  const data = [];
  for (let i = 0; i < enquiryState.length; i++) {
    data.push({
      key: i + 1,
      name: enquiryState[i].name,
      email: enquiryState[i].email,
      phone: enquiryState[i].mobile,
      comment: enquiryState[i].comment,
      status: (
        <>
          <select name="" id="" className="form-control form-select">
            <option value="">Set status</option>
          </select>
        </>
      ),
      action: (
        <>
          <Link to="" className="text-danger fs-3">
            <AiOutlineDelete />
          </Link>
        </>
      ),
    });
  }
  return (
    <div>
      <h3 className="mt-4">Enquiry</h3>
      <Table columns={columns} dataSource={data} />
    </div>
  );
};

export default Enquiries;
