import React, { useEffect } from "react";
import { Table } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { getProducts } from "../features/product/ProductSlice";
import { BiEdit } from "react-icons/bi";
import { AiOutlineDelete } from "react-icons/ai";
import { Link } from "react-router-dom";

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
  const productState = useSelector((state) => state.product.products);
  const data = [];
  for (let i = 0; i < productState.length; i++) {
    data.push({
      key: i + 1,
      title: productState[i].title,
      category: productState[i].category,
      price: `$${productState[i].price}`,
      // color: <>{console.log(productState[i].color)}</>,
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
    <>
      <div>
        <h3 className="mt-4">Product List</h3>
        <Table columns={columns} dataSource={data} />
      </div>
    </>
  );
};

export default ProductList;
