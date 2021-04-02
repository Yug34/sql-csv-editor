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
            Object.keys(props.results[0]).map((key) => <th className="headerItem" key={key}>{key}</th>),
        );
      }

      setResultList(
          props.results.map((result) => (
              <tr className="tableRow" key={uniqid()}>
                {Object.keys(result).map((item, index) => {
                  return <td className="tableItem" key={index}>{result[item]}</td>;
                })}
              </tr>
          )),
      );
    }
  }, [props.results]);

  return (
      <div className="results">
        <table className="resultsTable">
          <thead className="tableHead">
            <tr className="headerRow">{header}</tr>
          </thead>
          <tbody className="tableBody">
            {resultList}
          </tbody>
        </table>
      </div>
  );
}

export default Results;
