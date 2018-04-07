import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import {
  Container,
  Row,
  Col,
  Nav,
  Navbar,
  NavItem,
  NavbarBrand,
  NavbarToggler,
  NavLink,
  Collapse,
 } from 'reactstrap';

import ProjectList from './components/ProjectList/ProjectList';
import Project from './components/Project/Project';
import EditProject from './components/EditProject/EditProject';
import EditAction from './components/EditAction/EditAction';
import Home from './components/Home/Home';
import CreateProject from './components/CreateProject/CreateProject';
import CreateAction from './components/CreateAction/CreateAction';
import './App.css';

class App extends Component {
  state = {
    collapsed: true,
  }
  render() {
    return (
      <Container className="Container">
        <Row>
          <Col>
          <Navbar color="faded" light>
          <NavbarBrand href="/" className="mr-auto">Status 200</NavbarBrand>
          <NavbarToggler onClick={this.toggleNavbar.bind(this)} className="mr-2" />
          <Collapse isOpen={!this.state.collapsed} navbar>
            <Nav navbar>
              <NavItem>
                <NavLink href="/">Home</NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="/projects/">Project List</NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="/create">Create Project</NavLink>
              </NavItem>
            </Nav>
          </Collapse>
        </Navbar>
          </Col>
        </Row>
        <Row className="App">
          <Route exact path='/' component={Home}/>
          <Route exact path='/projects' component={ProjectList} />
          <Route exact path='/projects/:projectId' component={Project} />
          <Route path='/projects/:projectId/edit' component={EditProject} />
          <Route path='/projects/:projectId/actions/create' component={CreateAction} />
          <Route path='/projects/:projectId/actions/:actionId/edit' component={EditAction} />
          <Route path='/create' component={CreateProject} />
        </Row>
      </Container>
    );
  }

  toggleNavbar() {
    this.setState({
      collapsed: !this.state.collapsed
    })
  }
}

export default App;
