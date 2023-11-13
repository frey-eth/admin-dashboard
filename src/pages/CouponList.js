import React, { useEffect } from "react";
import { Table, Modal } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { BiEdit } from "react-icons/bi";
import { AiOutlineDelete } from "react-icons/ai";
import { Link } from "react-router-dom";
import { deleteCoupon, getCoupons } from "../features/coupon/CouponSlice";

const { confirm } = Modal;

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
  const showDeleteConfirm = (record) => {
    confirm({
      title: "Do you want to delete this item?",
      content: `Coupon: ${record.title}`,
      onOk() {
        dispatch(deleteCoupon(record._id));
      },
    });
  };
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
          <Link to={`/admin/coupon/${couponState[i]._id}`} className="fs-3">
            <BiEdit />
          </Link>
          <button className="text-danger ps-3 fs-3 bg-transparent border-0">
            <span
              className="text-danger ps-3 fs-3"
              onClick={() => showDeleteConfirm(couponState[i])}
            >
              <AiOutlineDelete />
            </span>
          </button>
        </>
      ),
    });
  }
  return (
    <div>
      <h3 className="mt-4">Coupons List</h3>
      <Table columns={columns} dataSource={[...data]} />
    </div>
  );
};

export default Counpon;
