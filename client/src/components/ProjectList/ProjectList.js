import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import {
    Container,
    Row,
    Col,
} from 'reactstrap';

import axios from 'axios';

class ProjectList extends Component {
    state = {
        projects: [],
    }

    render() {
        return (
            <Container>
                <h1>Projects. In a list.</h1>
                {this.state.projects.map(project => {
                    return (
                        <Row key={project.id}>
                            <Col>
                                <Link to={`/projects/${project.id}`}>
                                    <h3>{project.name}</h3>
                                </Link>
                            </Col>
                        </Row>
                    )
                })}
            </Container>
        );
    }

    componentDidMount() {
        axios
            .get('http://localhost:5000/api/projects')
            .then(response => {
                this.setState({
                    projects: response.data,
                })
            }).catch(error => console.log(error));
    }
}

export default ProjectList;