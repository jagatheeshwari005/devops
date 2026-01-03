import { useEffect, useState } from "react";
import { API } from "../services/api";

function ProductList() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    API.get("/products").then(res => setProducts(res.data));
  }, []);

  return (
    <div>
      <h3>Product List</h3>
      <ul>
        {products.map(p => (
          <li key={p._id}>
            {p.name} - {p.quantity} pcs - ₹{p.price}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ProductList;
