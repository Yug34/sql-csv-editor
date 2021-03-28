// import {useState} from "react/cjs/react.production.min";
import React, { useEffect, useState } from "react";
import "../css/Results.css";
import userEvent from "@testing-library/user-event";

function Results(props) {
  let [resultList, setResultList] = useState(null);
  let [header, setHeader] = useState(null);

  useEffect(() => {
    if (props.results) {
      if (props.results[0]) {
        setHeader(
            Object.keys(props.results[0]).map((key) => <th key={key}>{key}</th>),
        );
      }

      // props.results.map((result) => {
      //   console.log(result);
      //   for (const item in result) {
      //     console.log(result[item]);
      //   }
      // });

      setResultList(
          props.results.map((result, index) => (
              <tr key={result.orderID}>
                {Object.keys(result).map((item, index) => {
                  return <th key={index}>{result[item]}</th>;
                })}
                {/* <th>{result.orderID}</th>
            <th>{result.productID}</th>
            <th>{result.unitPrice}</th>
            <th>{result.quantity}</th>
            <th>{result.discount}</th> */}
              </tr>
          )),
      );
    }
  }, [props.results]);

  useEffect(() => {
    if (header) {
      // for (let i = 0; i < props.results.length; i++) {
      //   for (let j = 0; j < header.length; j++) {
      //     console.log(
      //       header[j].key + ": " + props.results[i][`${header[j].key}`]
      //     );
      //   }
      // }
      // let results = [];
      // for (const res of props.results) {
      //   let arr = [];
      //   for (const ele of header) {
      //     arr.push(res[ele.key]);
      //   }
      //   results.push(arr);
      // }
    }
  }, [header]);
  //TODO: Dependencies

  return (
      <div>
        <table>
          <thead>
          <tr>{header}</tr>
          </thead>
          <tbody>{resultList}</tbody>
        </table>
      </div>
  );
}

export default Results;
