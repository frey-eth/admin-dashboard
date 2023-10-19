import React from "react";
import CustomInput from "../components/CustomInput";

const AddBrand = () => {
  return (
    <div>
      <h3>Add Brand</h3>
      <form action="">
        <CustomInput type="text" label="Enter blog category" />
        <button
          className="btn btn-success border-0 rounded-3 my-3"
          type="submit"
        >
          Add Brand
        </button>
      </form>
    </div>
  );
};

export default AddBrand;
