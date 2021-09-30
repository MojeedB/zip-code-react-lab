import React, { Component } from 'react';
import './App.css';


function City(props) {
 
  return (
    <div className="city-container">
      <div className="header">{props.locationText}</div>
      <div className="content">
        <ul>
          <li>State: {props.stateName}</li>
          <li>Location: {props.location}</li>
          <li>Population (estimated): {props.population}</li>
          <li>Total Wages: {props.wages}</li>
        </ul>
      </div>
    </div>
  );
}

function ZipSearchField(props) {
  return (
    <div className="zip-search-field">
      <b> Zip Code:</b>
      <input type="text" placeholder="Try 10016" onChange=
        { props.changeHandler }/> 
    </div>
  );
}


class App extends Component {

  state = {
    zipCode: '',
    cities: [],
  }

  zipChanged = (event) => {
    //console.log(event.target.value);
    this.setState( {zipCode: event.target.value} )

    if(event.target.value.length > 4){
      fetch("http://ctp-zip-api.herokuapp.com/zip/" + event.target.value)
      .then((response) => response.json())
      .then(this.saveCities)
      //.then((data) => console.log(data))
      // .then((cities) => this.setState(cities))
    }
  }

  saveCities = (cities) => {
    this.setState({cities})
  }

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <h2>Zip Code Search</h2>
        </div>
        <ZipSearchField zipCode = { this.state.zipCode } 
          changeHandler = { this.zipChanged }/>
        <div>
          { this.state.cities.map((city) => <City stateName = {city.State} 
            locationText = {city.LocationText} 
            location = {"("+ city.Lat + "," + city.Long + ")"}
            population = {city.EstimatedPopulation} wages = {city.TotalWages}
            />) }
        </div>
      </div>
    );
  }
}

export default App;