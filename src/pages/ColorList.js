import React, { useEffect } from "react";
import { Table, Modal } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { deleteColor, getColors } from "../features/color/ColorSlice";
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
    title: "Title",
    dataIndex: "title",
  },
  {
    title: "Color Code",
    dataIndex: "colorCode",
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
  const showDeleteConfirm = (record) => {
    confirm({
      title: "Do you want to delete this item?",
      content: `Color: ${record.title}`,
      onOk() {
        dispatch(deleteColor(record._id));
      },
    });
  };
  const colorState = useSelector((state) => state.color.colors);
  const data = [];
  for (let i = 0; i < colorState.length; i++) {
    data.push({
      key: i + 1,
      title: colorState[i].title,
      colorCode: colorState[i].colorCode,
      action: (
        <>
          <Link to={`/admin/color/${colorState[i]._id}`} className="fs-3">
            <BiEdit />
          </Link>
          <button className="text-danger ps-3 fs-3 bg-transparent border-0">
            <span
              className="text-danger ps-3 fs-3"
              onClick={() => showDeleteConfirm(colorState[i])}
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
      <h3 className="mt-4">Colors List</h3>
      <Table columns={columns} dataSource={[...data]} />
    </div>
  );
};

export default ColorList;
