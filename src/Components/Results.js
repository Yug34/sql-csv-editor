// import {useState} from "react/cjs/react.production.min";
import React, {useEffect, useState} from "react";
import "../css/Results.css";

function Results(props) {
  let [resultList, setResultList] = useState(null);
  let [header, setHeader] = useState(null);

  useEffect(() => {
    if (props.results) {
      setHeader(Object.keys(props.results[0]).map(key => (
          <th key={key}>{key}</th>
      )));
      // setHeader(Object.keys(props.results[0]));

      // for (let key of Object.keys(props.results[0])) {
      //
      // }

      setResultList(
        props.results.map((result) => (
            <tr key={result.orderID}>
              <th>{result.orderID}</th>
              <th>{result.productID}</th>
              <th>{result.unitPrice}</th>
              <th>{result.quantity}</th>
              <th>{result.discount}</th>
            </tr>
        ))
      );
    }

  }, [props.results]);

  // useEffect(() => {
  //
  // }, [header])

  return (
  <div>
    <table>
      <thead>
        <tr>
          {header}
        </tr>
      </thead>
      <tbody>
        {resultList}
      </tbody>
    </table>
  </div>);
}

export default Results;
