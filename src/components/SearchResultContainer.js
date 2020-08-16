import React, { Component } from "react";
import SearchForm from "./SearchForm";
import EmployeeCard from "./EmployeeCard";
import API from "../utils/API";
import "../styles/Result.css";


class SearchResultContainer extends Component {
  state = {
    result: [],
    allResults: [],
    filter: "",
    filterBy: "lastName",
    currentSort: "default",
    sortField: "",
    toggleVal: 1

  };

  // When this component mounts, search the Giphy API for pictures of kittens
  // onsafe_componentWillMount()
  componentDidMount() {
    API.search()
      .then(res => {
        console.log(res)
        this.setState({
          result: res.data.results.map((e, i) => ({
            firstName: e.name.first,
            lastName: e.name.last,
            picture: e.picture.large,
            email: e.email,
            phone: e.phone,
            dob: e.dob.age,
            key: i
          })),
          allResults: res.data.results.map((e, i) => ({
            firstName: e.name.first,
            lastName: e.name.last,
            picture: e.picture.large,
            email: e.email,
            phone: e.phone,
            dob: e.dob.age,
            key: i
          }))

        })

      })
      .catch(err => console.log(err));
  }

  filterEmployees = (searchkey) => {
    console.log("filterEmployees");
    console.log(searchkey);
    console.log(this.state.result);
   
    var filterResult = this.state.allResults.filter(person => person.firstName.toLowerCase().includes(searchkey) || person.lastName.includes(searchkey) || person.email.includes(searchkey) || person.phone.includes(searchkey) || person.dob === searchkey)

    if (searchkey === '') {
      this.setState({
        result: this.state.allResults
      })
    }
else {
    this.setState({
      result: filterResult

    })
  }


  }

  toggleValFuc = (sortField) => {
    console.log('toggleValFuc')
    this.setState({ sortField})
    this.setState({ toggleVal: -(this.state.toggleVal) })
    console.log(this.state.toggleVal)
  }
  // When the form is submitted, search the Employee API for `this.state.search`
  handleFormSubmit = event => {
    event.preventDefault();
    const value = event.target.value;
    const name = event.target.name;
    // console.log("handleFormSubmit");
    // console.log(value);
    // console.log(name);
    //filter function here
    // this.filterEmployees(value);
    this.setState({

      [name]: value

    });
    

  };


  handleInputChange = event => {
    event.preventDefault();
    console.log(event);
    const value = event.target.value;
    const name = event.target.name;
    // console.log("handleInputChange");
    // console.log(value);
    // console.log(name);

    this.setState({

      [name]: value

    });

    this.filterEmployees(value);
  };

  render() {


    return (
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <h2>Employee Directory</h2>
          </div>
        </div>
        <div className="row">
          <div className="col-md-6">
            <SearchForm
              value={this.state.search}
              handleInputChange={this.handleInputChange}
              handleFormSubmit={this.handleFormSubmit}
            />
          </div>
        </div>

        <div className="row">

          <table className="table">
            <thead>
            <tr>
              <th scope="col">Photo</th>
              <th onClick={() => this.toggleValFuc('firstName')}>First Name</th>
              <th scope="col" onClick={() => this.toggleValFuc('lastName')}>Last Name </th>
              <th scope="col" onClick={() => this.toggleValFuc('email')}>Email</th>
              <th scope="col" onClick={() => this.toggleValFuc('phone')}>Phone</th>
              <th scope="col" onClick={() => this.toggleValFuc('dob')}>Age</th>
            </tr>
            </thead>

            <tbody>
            {[...this.state.result].sort((a, b) => (a[this.state.sortField] > b[this.state.sortField]) ? this.state.toggleVal : -(this.state.toggleVal)).map((item) =>
              <EmployeeCard
                picture={item.picture}
                firstName={item.firstName}
                lastName={item.lastName}
                email={item.email}
                phone={item.phone}
                dob={item.dob}
                key={item.key}
              />
            )}
            </tbody>

          </table>
        </div>


      </div>
    );
  }
}

export default SearchResultContainer;