import React, { useEffect } from "react";
import { Table } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { getProducts } from "../features/product/ProductSlice";

const columns = [
  {
    title: "No.",
    dataIndex: "key",
  },
  {
    title: "Name",
    dataIndex: "name",
  },
  {
    title: "Category",
    dataIndex: "category",
  },
  {
    title: "Brand",
    dataIndex: "brand",
  },
];
const ProductList = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getProducts);
  }, []);
  const productState = useSelector((state) => state.product.products);
  const data = [];
  for (let i = 0; i < productState.length; i++) {
    data.push({
      key: i + 1,
      name: productState[i].title,
      category: productState[i].category,
      brand: productState[i].brand,
    });
  }
  return (
    <div>
      <h3 className="mt-4">Product List</h3>
      <Table columns={columns} dataSource={data} />
    </div>
  );
};

export default ProductList;
