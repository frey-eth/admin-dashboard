import React, { useEffect } from "react";
import { Table } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { getColors } from "../features/color/ColorSlice";
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
    title: "Action",
    dataIndex: "action",
  },
];

const ColorList = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getColors());
  }, []);
  const colorState = useSelector((state) => state.color.colors);
  const data = [];
  for (let i = 0; i < colorState.length; i++) {
    data.push({
      key: i + 1,
      title: colorState[i].title,
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
      <h3 className="mt-4">Colors List</h3>
      <Table columns={columns} dataSource={data} />
    </div>
  );
};

export default ColorList;
