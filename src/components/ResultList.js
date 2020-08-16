import React from "react";

function ResultList(props) {
  return (
    <>

    
      {props.results.map(result => (
        <table style="width:100%" className="table">
          <thead>
            <tr>
              <th>Firstname</th>
              <th>Lastname</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Age</th>
            </tr>
          </thead>
        </table>
      ))}

    </>
  );
}

export default ResultList;