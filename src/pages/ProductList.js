import React, { useEffect } from "react";
import { Table, Modal } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { deleteProduct, getProducts } from "../features/product/ProductSlice";
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
    title: "Category",
    dataIndex: "category",
  },
  {
    title: "Color",
    dataIndex: "color",
  },
  {
    title: "Price",
    dataIndex: "price",
  },
  {
    title: "Action",
    dataIndex: "action",
  },
];
const ProductList = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getProducts());
  }, []);
  const showDeleteConfirm = (record) => {
    confirm({
      title: "Do you want to delete this product?",
      content: `Title: ${record.title}`,
      onOk() {
        dispatch(deleteProduct(record._id));
      },
    });
  };
  const productState = useSelector((state) => state.product.products);
  const data = [];
  for (let i = 0; i < productState.length; i++) {
    data.push({
      key: i + 1,
      title: productState[i].title,
      category: productState[i].category,
      price: `$${productState[i].price}`,
      color: productState[i].color?.map((color) => (
        <span className="badge bg-dark mx-1">{color.title}</span>
      )),
      action: (
        <>
          <Link to={`/admin/product/${productState[i]._id}`} className="fs-3">
            <BiEdit />
          </Link>
          <button className="text-danger ps-3 fs-3 bg-transparent border-0">
            <span
              className="text-danger ps-3 fs-3"
              onClick={() => showDeleteConfirm(productState[i])}
            >
              <AiOutlineDelete />
            </span>
          </button>
        </>
      ),
    });
  }
  return (
    <>
      <div>
        <h3 className="mt-4">Product List</h3>
        <Table columns={columns} dataSource={[...data]} />
      </div>
    </>
  );
};

export default ProductList;
