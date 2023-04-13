import React, { useState } from "react";
import "./style.css";

const BillingForm = () => {
  const [customerName, setCustomerName] = useState("");

  const [products, setProducts] = useState([]);

  const [newProduct, setNewProduct] = useState({
    name: "",
    quantity: 0,
  });

  const [showBill, setShowBill] = useState(false);

  const handleCustomerNameChange = (event) => {
    setCustomerName(event.target.value);
  };

  const handleProductNameChange = (event) => {
    setNewProduct({ ...newProduct, name: event.target.value });
  };

  const handleProductQuantityChange = (event) => {
    setNewProduct({ ...newProduct, quantity: parseInt(event.target.value) });
  };

  const handleAddProduct = () => {
    if (newProduct.name !== "" && newProduct.quantity !== 0) {
      setProducts([...products, newProduct]);
      setNewProduct({
        name: "",
        quantity: 0,
      });
    }
  };

  const handleCreateBill = () => {
    setShowBill(true);
  };

  const getProductPrice = (productName) => {
    switch (productName) {
      case "Ball Pen":
        return 10;
      case "Camlin Water Color":
        return 20;
      case "Gel Pen":
        return 10;
      case "Staedler Color Pencil":
        return 20;
      case "Classmate NoteBook":
        return 18;
      default:
        return 0;
    }
  };

  return (
    <div>
      <section>
        <h2>Section 1: Customer Name</h2>
        <label htmlFor="customerName">Customer Name:</label>
        <input
          type="text"
          id="customerName"
          value={customerName}
          onChange={handleCustomerNameChange}
        />
      </section>
      <section>
        <h2>Section 2: Product Selection</h2>
        {products.map((product, index) => (
          <div key={index}>
            <p>
              {product.name}: {product.quantity} x ₹
              {getProductPrice(product.name)} = ₹
              {(product.quantity * getProductPrice(product.name)).toFixed(2)}
            </p>
          </div>
        ))}

        <div>
          <label htmlFor="productName">Product:</label>
          <select
            id="productName"
            value={newProduct.name}
            onChange={handleProductNameChange}
          >
            <option value="">Select a product</option>
            <option value="ballpen">Ball Pen</option>
            <option value="camlinwatercolor">Camlin Water Color</option>
            <option value="gelpen">Gel Pen</option>
            <option value="Staedlercolorpencil">Staedler Color Pencil</option>
            <option value="classmatenotebook">Classmate Notebook</option>
          </select>
          <label htmlFor="productQuantity">Quantity:</label>
          <input
            type="number"
            id="productQuantity"
            value={newProduct.quantity}
            onChange={handleProductQuantityChange}  
          />
          <button onClick={handleAddProduct}>Add Product</button>
        </div>
      </section>
      <section>
  <h2>Section 3: Bill Creation</h2>
  <button onClick={handleCreateBill}>Create Bill</button>
  {showBill && (
    <div>
      <h3>Bill for {customerName}:</h3>
      <table className={styles["bill-table"]}>
        <thead>
          <tr>
            <th>Item</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>Total</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product, index) => (
            <tr key={index}>
              <td>{product.name}</td>
              <td>₹{getProductPrice(product.name)}</td>
              <td>{product.quantity}</td>
              <td>₹{(product.quantity * getProductPrice(product.name)).toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <h3>
        Total: ₹
        {products
          .reduce(
            (acc, curr) =>
              acc + curr.quantity * getProductPrice(curr.name),
            0
          )
          .toFixed(2)}
      </h3>
    </div>
  )}
</section>
    </div>
  );
};

export default BillingForm;
