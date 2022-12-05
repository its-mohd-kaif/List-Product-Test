import React, { useEffect, useState } from "react";
import "./Landingpage.css";

const data = require("../amazon_products.json");

function LandingPage() {
  // UseState For Storing ALL Primary Categories
  const [data1, setData1] = useState([]);
  // UseState For Storing ALL Category 1
  const [data2, setData2] = useState([]);
  // UseState For Storing ALL Category 2
  const [data3, setData3] = useState([]);

  // UseState For Storing value choose value of Primary Category
  const [primary, setPrimary] = useState("");
  // UseState For Storing value choose value of  Category 1
  const [category1, setCategory1] = useState("");
  // UseState For Storing value choose value of  Category 2
  const [category2, setCategory2] = useState("");
  // UseState For Storing value choose value of  Category 3
  const [category3, setCategory3] = useState("");
  // UseState For Storing result
  const [result, setResult] = useState([]);

  // UseEffect For Remove dublicate and set into Data1 state
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

  // Function For Select Primary Category
  const selectPrimary = (e) => {
    var val1 = e.target.value;
    setPrimary(e.target.value);
    // make temp array
    let temp = [];

    data.forEach((element) => {
      // Check when user select value equal to primary category and push category1 into temp array
      if (val1 === element.primary_category) {
        temp.push(element.category_1);
      }
    });
    // Remove Dublicates
    temp = [...new Set(temp)];
    setData2(temp);
  };
  const selectCategory1 = (e) => {
    var val1 = e.target.value;
    setCategory1(e.target.value);
    // make temp array
    let temp = [];
    data.forEach((element) => {
      if (val1 === element.category_1) {
        if (element.category_2 === "") {
          temp.push("no data");
        } else {
          // Check when user select value equal to category1 and push category2 into temp array
          temp.push(element.category_2);
        }
      }
    });
    // Remove Dublicates
    temp = [...new Set(temp)];
    setData3(temp);
  };
  const selectCategory2 = (e) => {
    var val1 = e.target.value;
    setCategory2(e.target.value);
    // make temp array
    let temp = [];
    data.forEach((element) => {
      if (val1 === element.category_2) {
        // Check when user select value equal to category2 and push category3 into temp array
        temp.push(element.category_3);
      }
    });
    // Remove Dublicates
    temp = [...new Set(temp)];
    // push only first value of array into category 3
    if (temp[0] === "" || e.target.value === "no data") {
      setCategory3("no data");
    } else {
      setCategory3(temp[0]);
    }
  };

  const saveHandler = (e) => {
    e.preventDefault();
    // Check Validation
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
  // Set Result Array into Local Storage
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
          {/* Category 1*/}
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
          {/* Category 2*/}
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
        {/* Category 3*/}
        <div value={category3} style={{ marginLeft: "30%", marginTop: "1%" }}>
          {category3}
        </div>
        <br></br>
        <button className="saveBtn" onClick={saveHandler}>
          Save
        </button>
        <br></br>
        {/* Display Local Storage */}
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
              {/* Map Local Storage */}
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
