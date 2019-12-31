import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Card, ListGroup, ListGroupItem, Spinner } from 'react-bootstrap';

class MainApp extends Component{
  constructor(){
    super();
    this.state={
      employees :null,
      showLoading : false
    }
  }

  getDataFromServer = ()=>{
    this.setState({showLoading : true},()=>{
      fetch('http://dummy.restapiexample.com/api/v1/employees')
      .then(response => response.json())
      .then((data) => {
      this.setState({employees : data, showLoading : false});
      })
      .then((myJson) => {
      console.log(myJson);
      });
    })
  }

  renderEmployeeSection=(employees)=>{
    if(employees){
      return (
          <Card style={{ width: '18rem'}}>
            <Card.Body>
              <Card.Title>Employee Info</Card.Title>
               <ListGroup className="list-group-flush">
                  {
                    employees.map((obj) =>
                      <ListGroupItem>{obj.employee_name}</ListGroupItem>
                    )
                  }
                </ListGroup>
              </Card.Body>
            </Card>
      )
    }
    return null;
  }

  showMask=(showLoading)=>{
    if(showLoading){
      return (
        <Spinner animation="border" role="status">
           <span className="sr-only">Loading...</span>
        </Spinner>
      )
    }
    return null;
    
  }

  render(){
     let { employees, showLoading } = this.state;
      return (
        <div className="App">
            <img src={logo} className="App-logo" alt="logo" />
            <Button onClick={this.getDataFromServer}>Get Employee Info</Button>
            {this.showMask(showLoading)}
            {this.renderEmployeeSection(employees)}
        </div>
      );
  }
}

export default MainApp;
