import React, { useEffect } from "react";
import { Table, Modal } from "antd";
import { BiEdit } from "react-icons/bi";
import { AiOutlineDelete } from "react-icons/ai";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteCategory,
  getCategories,
} from "../features/productCategory/CategorySlice";
const { confirm } = Modal;

const columns = [
  {
    title: "No.",
    dataIndex: "key",
  },
  {
    title: "Title",
    dataIndex: "title",
  },
  {
    title: "Action",
    dataIndex: "action",
  },
];

const CategoryList = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getCategories());
  }, []);

  const showDeleteConfirm = (record) => {
    confirm({
      title: "Do you want to delete this item?",
      content: `Category: ${record.title}`,
      onOk() {
        dispatch(deleteCategory(record._id));
      },
    });
  };
  const categoryState = useSelector((state) => state.category.categories);
  const data = [];
  for (let i = 0; i < categoryState.length; i++) {
    data.push({
      key: i + 1,
      title: categoryState[i].title,
      action: (
        <>
          <Link to={`/admin/category/${categoryState[i]._id}`} className="fs-3">
            <BiEdit />
          </Link>
          <button className="text-danger ps-3 fs-3 bg-transparent border-0">
            <span
              className="text-danger ps-3 fs-3"
              onClick={() => showDeleteConfirm(categoryState[i])}
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
      <h3 className="mt-4">Product Category</h3>
      <Table columns={columns} dataSource={[...data]} />
    </div>
  );
};

export default CategoryList;
