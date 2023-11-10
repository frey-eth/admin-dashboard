import React, { useState, useEffect } from "react";
import { Table, Modal } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { deleteBrand, getBrands } from "../features/brand/BrandSlice";
import { BiEdit } from "react-icons/bi";
import { AiOutlineDelete } from "react-icons/ai";
import { Link } from "react-router-dom";
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
    title: "Action",
    dataIndex: "action",
  },
];

const BrandList = () => {
  const dispatch = useDispatch();
  const [data, setData] = useState([]);
  useEffect(() => {
    dispatch(getBrands());
  }, []);

  const showDeleteConfirm = (record) => {
    confirm({
      title: "Do you want to delete this item?",
      content: `Brand: ${record.title}`,
      onOk() {
        dispatch(deleteBrand(record._id));
      },
    });
  };
  const brandState = useSelector((state) => state.brand.brands);
  useEffect(() => {
    const newData = brandState.map((brand, index) => ({
      key: index + 1,
      title: brand.title,
      action: (
        <>
          <Link to={`/admin/brand/${brand._id}`} className="fs-3">
            <BiEdit />
          </Link>
          <button className="text-danger ps-3 fs-3 bg-transparent border-0">
            <span
              className="text-danger ps-3 fs-3"
              onClick={() => showDeleteConfirm(brand)}
            >
              <AiOutlineDelete />
            </span>
          </button>
        </>
      ),
    }));
    setData(newData);
  }, [brandState]);
  return (
    <div>
      <h3 className="mt-4">Product Brands</h3>
      <Table columns={columns} dataSource={[...data]} />
    </div>
  );
};

export default BrandList;
