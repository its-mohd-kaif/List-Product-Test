import React, { useState } from "react";
import "./Landingpage.css";

const data = require("../amazon_products.json");

function LandingPage() {
  // States For Options
  const [primary, setPrimary] = useState("");
  const [category1, setCategory1] = useState("");
  const [category2, setCategory2] = useState("");
  //   State For Display Result
  const [result, setResult] = useState([]);

  const selectPrimary = (e) => {
    setPrimary(e.target.value);
  };
  const selectCategory1 = (e) => {
    setCategory1(e.target.value);
  };
  const selectCategory2 = (e) => {
    setCategory2(e.target.value);
  };
  // Save Handler Function
  const saveHandler = (e) => {
    e.preventDefault();
    // Make Object
    let obj = {
      primary: primary,
      category1: category1,
      category2: category2,
    };
    // Push into result array
    setResult([...result, obj]);
  };

  return (
    <div>
      <section>
        <center>
          <div>
            <h1>Products</h1>
          </div>
        </center>
        <div className="containerSelect">
          {/* Primary Category */}
          <select className="selectData" onChange={selectPrimary}>
            {data.map((val) => (
              <option value={val.primary_category}>
                {val.primary_category}
              </option>
            ))}
          </select>
          <br></br>
          {/* Category 1 */}
          <select className="selectData" onChange={selectCategory1}>
            {data.map((val) => (
              <option value={val.category_1}>{val.category_1}</option>
            ))}
          </select>
          <br></br>
          {/* Category 2 */}
          <select className="selectData" onChange={selectCategory2}>
            {data.map((val) => (
              <option value={val.category_2}>{val.category_2}</option>
            ))}
          </select>
        </div>
        <br></br>
        <button className="saveBtn" onClick={saveHandler}>
          Save
        </button>
        <br></br>
        <div className="displayContainer">
          <table>
            <thead>
              <tr>
                <th>Product Category</th>
                <th>Category 1</th>
                <th>Category 2</th>
              </tr>
            </thead>
            <tbody>
              {result.map((val) => (
                <tr>
                  <td>{val.primary}</td>
                  <td>{val.category1}</td>
                  <td>{val.category2}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}

export default LandingPage;
