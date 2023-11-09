import React, { useEffect } from "react";
import { Table } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { BiEdit } from "react-icons/bi";
import { AiOutlineDelete } from "react-icons/ai";
import { Link } from "react-router-dom";
import { getCoupons } from "../features/coupon/CouponSlice";

const columns = [
  {
    title: "No.",
    dataIndex: "key",
  },
  {
    title: "Name",
    dataIndex: "title",
  },
  {
    title: "Expiry",
    dataIndex: "expiry",
  },
  {
    title: "Discount",
    dataIndex: "discount",
  },
  {
    title: "Action",
    dataIndex: "action",
  },
];

const Counpon = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getCoupons());
  }, []);
  const couponState = useSelector((state) => state.coupon.coupons);
  const data = [];
  for (let i = 0; i < couponState.length; i++) {
    data.push({
      key: i + 1,
      title: couponState[i].name,
      expiry: Date(Date(couponState[i].expiry).toLocaleDateString),
      discount: couponState[i].discount + "%",
      action: (
        <>
          <Link to="" className="fs-3">
            <BiEdit />
          </Link>
          <Link to="" className="text-danger ps-3 fs-3">
            <AiOutlineDelete />
          </Link>
        </>
      ),
    });
  }
  return (
    <div>
      <h3 className="mt-4">Coupons List</h3>
      <Table columns={columns} dataSource={data} />
    </div>
  );
};

export default Counpon;
