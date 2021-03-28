// import {useState} from "react/cjs/react.production.min";
import React, { useEffect, useState } from "react";
import "../css/Results.css";
import uniqid from "uniqid";

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

      setResultList(
          props.results.map((result, index) => (
              <tr key={uniqid()}>
                {Object.keys(result).map((item, index) => {
                  return <th key={index}>{result[item]}</th>;
                })}
              </tr>
          )),
      );
    }
  }, [props.results]);

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
