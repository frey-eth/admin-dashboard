import React, { useEffect } from "react";
import { Table } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { getBrands } from "../features/brand/BrandSlice";
import { BiEdit } from "react-icons/bi";
import { AiOutlineDelete } from "react-icons/ai";
import { Link } from "react-router-dom";

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
    title : "Action",
    dataIndex:"action"
  }
];

const BrandList = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getBrands());
  }, []);
  const brandState = useSelector((state) => state.brand.brands);
  const data = [];
  for (let i = 0; i < brandState.length; i++) {
    data.push({
      key: i + 1,
      title: brandState[i].title,
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
      <h3 className="mt-4">Product Brands</h3>
      <Table columns={columns} dataSource={data} />
    </div>
  );
};

export default BrandList;
