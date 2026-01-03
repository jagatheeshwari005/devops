import { useState } from "react";
import { API } from "../services/api";

function AddProduct() {
  const [product, setProduct] = useState({
    name: "",
    category: "",
    price: "",
    quantity: ""
  });

  const submitHandler = async () => {
    await API.post("/products/add", product);
    alert("Product Added");
  };

  return (
    <div>
      <h3>Add Product</h3>
      <input placeholder="Name" onChange={e => setProduct({...product, name:e.target.value})}/>
      <input placeholder="Category" onChange={e => setProduct({...product, category:e.target.value})}/>
      <input placeholder="Price" onChange={e => setProduct({...product, price:e.target.value})}/>
      <input placeholder="Quantity" onChange={e => setProduct({...product, quantity:e.target.value})}/>
      <button onClick={submitHandler}>Add</button>
    </div>
  );
}

export default AddProduct;
