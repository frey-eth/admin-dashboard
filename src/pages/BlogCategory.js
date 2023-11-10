import React, { useEffect } from "react";
import { Table, Modal } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { BiEdit } from "react-icons/bi";
import { AiOutlineDelete } from "react-icons/ai";
import { Link } from "react-router-dom";
import {
  deleteBlogCategory,
  getBlogCategories,
} from "../features/blogCategory/blogCategorySlice";

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

const BlogCategory = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getBlogCategories());
  }, []);

  const showDeleteConfirm = (record) => {
    confirm({
      title: "Do you want to delete this item?",
      content: `Brand: ${record.title}`,
      onOk() {
        dispatch(deleteBlogCategory(record._id));
      },
    });
  };

  const blogCategoryState = useSelector(
    (state) => state.blogCategory.categories
  );
  const data = [];
  for (let i = 0; i < blogCategoryState.length; i++) {
    data.push({
      key: i + 1,
      title: blogCategoryState[i].title,
      action: (
        <>
          <Link
            to={`/admin/blog-category/${blogCategoryState[i]._id}`}
            className="fs-3"
          >
            <BiEdit />
          </Link>
          <button className="text-danger ps-3 fs-3 bg-transparent border-0">
            <span
              className="text-danger ps-3 fs-3"
              onClick={() => showDeleteConfirm(blogCategoryState[i])}
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
      <h3 className="mt-4">Blog Category List</h3>
      <Table columns={columns} dataSource={[...data]} />
    </div>
  );
};

export default BlogCategory;
