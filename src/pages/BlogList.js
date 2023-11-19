import React, { useEffect } from "react";
import { Table, Modal } from "antd";
import { BiEdit } from "react-icons/bi";
import { AiOutlineDelete } from "react-icons/ai";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { deleteBlog, getBlogs } from "../features/blog/BlogSlice";

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
    title: "Description",
    dataIndex: "description",
  },
  {
    title: "Author",
    dataIndex: "author",
  },
  {
    title: "Action",
    dataIndex: "action",
  },
];

const BlogList = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getBlogs());
  }, []);
  const showDeleteConfirm = (record) => {
    confirm({
      title: "Do you want to delete this blog?",
      content: `Title: ${record.title}`,
      onOk() {
        dispatch(deleteBlog(record._id));
      },
    });
  };
  const blogState = useSelector((state) => state.blog.blogs);
  const data = [];
  for (let i = 0; i < blogState.length; i++) {
    data.push({
      key: i + 1,
      title: blogState[i].title,
      description: blogState[i].description,
      author: blogState[i].author,
      action: (
        <>
          <Link to={`/admin/blog/${blogState[i]._id}`} className="fs-3">
            <BiEdit />
          </Link>
          <button className="text-danger ps-3 fs-3 bg-transparent border-0">
            <span
              className="text-danger ps-3 fs-3"
              onClick={() => showDeleteConfirm(blogState[i])}
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
      <h3 className="my-3">Blog List </h3>
      <div className="">
        <Table columns={columns} dataSource={[...data]} />
      </div>
    </div>
  );
};

export default BlogList;
