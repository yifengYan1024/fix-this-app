import React, { useState } from "react";
import Papa from "papaparse";

function LoadFile() {
  const [csvData, setCsvData] = useState<any[]>([]);

  function handleFile(event:any) {
    console.log("load file", event.target.files);
    const file = event.target.files[0];
    parseFile(file);
  }

  const parseFile = (file:any) => {
    Papa.parse(file, {
        header: true,
        complete: results => {
          console.log(results);
          setCsvData(results.data)
        },
      });
    };
  return (
    <div className="file-container">
      <div className="file-input">
        <input type="file" onChange={handleFile}></input>
      </div>
      <table>
      <thead>
        <tr>
          <th>Active</th>
          <th>CSO Name</th>
          <th>Outage</th>
          <th>Price</th>
          <th>Product Category</th>
          <th>Product Class</th>
          <th>Product Code</th>
        </tr>
      </thead>
      <tbody>
        {csvData &&
          csvData.map((parsedData, index) => (
            <tr key={index}>
              <td>{parsedData['Active']}</td>
              <td>{parsedData['CSO Name']}</td>
              <td>{parsedData['Outage']}</td>
              <td>{parsedData['Price']}</td>
              <td>{parsedData['Product Category']}</td>
              <td>{parsedData['Product Class']}</td>
              <td>{parsedData['Product Code']}</td>
            </tr>
          ))}
      </tbody>
    </table>
    </div>
  );

}

export default LoadFile;