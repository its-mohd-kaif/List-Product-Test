import React, { useEffect, useState } from "react";
import "./Landingpage.css";

const data = require("../amazon_products.json");

function LandingPage() {
  const [data1, setData1] = useState([]);
  const [data2, setData2] = useState([]);
  const [data3, setData3] = useState([]);

  const [primary, setPrimary] = useState("");
  const [category1, setCategory1] = useState("");
  const [category2, setCategory2] = useState("");
  const [category3, setCategory3] = useState("");
  const [result, setResult] = useState([]);

  useEffect(
    () => {
      let temp = data.map((val) => val.primary_category);
      temp = [...new Set(temp)];
      setData1(temp);
    },
    [category1],
    [category2],
    [category3]
  );

  const selectPrimary = (e) => {
    var val1 = e.target.value;
    setPrimary(e.target.value);

    let temp = [];
    data.forEach((element) => {
      if (val1 === element.primary_category) {
        temp.push(element.category_1);
      }
    });
    temp = [...new Set(temp)];
    setData2(temp);
  };
  const selectCategory1 = (e) => {
    var val1 = e.target.value;
    setCategory1(e.target.value);

    let temp = [];
    data.forEach((element) => {
      if (val1 === element.category_1) {
        if (element.category_2 === "") {
          temp.push("no data");
        } else {
          temp.push(element.category_2);
        }
      }
    });
    temp = [...new Set(temp)];
    setData3(temp);
  };
  const selectCategory2 = (e) => {
    var val1 = e.target.value;
    setCategory2(e.target.value);

    let temp = [];
    data.forEach((element) => {
      if (val1 === element.category_2) {
        temp.push(element.category_3);
      }
    });
    temp = [...new Set(temp)];

    if (temp[0] === "" || e.target.value === "no data") {
      setCategory3("no data");
    } else {
      setCategory3(temp[0]);
    }
  };

  const saveHandler = (e) => {
    e.preventDefault();
    if (
      primary === "" &&
      category1 === "" &&
      category2 === "" &&
      category3 === ""
    ) {
      alert("Choose All Filters!!!");
    } else {
      let obj = {
        primary: primary,
        category1: category1,
        category2: category2,
        category3: category3,
      };
      setResult([...result, obj]);
    }
    setPrimary("");
    setCategory1("");
    setCategory2("");
    setCategory3("");
  };
  localStorage.setItem("user", JSON.stringify(result));

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

          <select
            value={primary}
            className="selectData"
            onChange={selectPrimary}
          >
            <option>---Select---</option>
            {data1.map((val) => (
              <option value={val}>{val}</option>
            ))}
          </select>
          <br></br>
          <select
            value={category1}
            className="selectData"
            onChange={selectCategory1}
          >
            <option>---Select---</option>
            {data2.map((val) => (
              <option value={val}>{val}</option>
            ))}
          </select>
          <br></br>
          <select
            value={category2}
            className="selectData"
            onChange={selectCategory2}
          >
            <option>---Select---</option>
            {data3.map((val) => (
              <option value={val}>{val}</option>
            ))}
          </select>
        </div>
        <div value={category3} style={{ marginLeft: "30%" }}>
          {category3}
        </div>
        <br></br>
        <button className="saveBtn" onClick={saveHandler}>
          Save
        </button>
        <br></br>
        {/* <button onClick={dataFilter}>Filter</button> */}
        <div className="displayContainer">
          <table>
            <thead>
              <tr>
                <th>Product Category</th>
                <th>Category 1</th>
                <th>Category 2</th>
                <th>Category 3</th>
              </tr>
            </thead>
            <tbody>
              {JSON.parse(localStorage.getItem("user")).map((val) => (
                <tr>
                  <td>{val.primary}</td>
                  <td>{val.category1}</td>
                  <td>{val.category2}</td>
                  <td>{val.category3}</td>
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
