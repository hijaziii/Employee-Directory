import React from "react";

function ResultList(props) {
  return (
    <>

      {/* <ul className="list-group"> */}
      {props.results.map(result => (
        <table style="width:100%" className="table">
          <thead>
            <tr>
              <th>Firstname</th>
              <th>Lastname</th>
              <th>Age</th>
            </tr>
            <tr>
              <td>Jill</td >
              <td>Smith</td>
              <td>50</td>
            </tr>
          </thead>
        </table>
        // <li className="list-group-item" key={result.id}>

        //   {/* <img alt={result.title} className="img-fluid" src={result.images.original.url} /> */}

        // </li>
      ))}
      {/* </ul> */}
    </>
  );
}

export default ResultList;