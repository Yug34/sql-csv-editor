// import {useState} from "react/cjs/react.production.min";
import React from "react";
import "../css/UploadCSV.css";

function UploadCSV(props) {
    return (
        <div>
            <button onClick={props.showUpload}>Upload CSV</button>
            <div id="myModal" className="modal" onDragOver={e => props.dragOverHandler(e)} onDrop={e => props.dropHandler(e)}>
                <div className="modal-content">
                    <span className="close" onClick={props.hideUpload}>&times;</span>
                    <p>TEXTAAAAAAAAAA</p>
                </div>
            </div>
        </div>
    );
}

export default UploadCSV;
