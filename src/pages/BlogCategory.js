import React, { useEffect } from "react";
import { Table } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { BiEdit } from "react-icons/bi";
import { AiOutlineDelete } from "react-icons/ai";
import { Link } from "react-router-dom";
import {getBlogCategories} from "../features/blogCategory/blogCategorySlice"

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
  const blogCategoryState = useSelector((state) => state.blogCategory.categories );
  const data = [];
  for (let i = 0; i < blogCategoryState.length; i++) {
    data.push({
      key: i + 1,
      title: blogCategoryState[i].title,
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
      <h3 className="mt-4">Blog Category List</h3>
      <Table columns={columns} dataSource={data} />
    </div>
  );
};

export default BlogCategory;
