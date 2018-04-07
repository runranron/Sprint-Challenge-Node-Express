import React, { Component } from 'react';
import axios from 'axios';
import {
    Container,
    Row,
    Col,
    Form,
    FormGroup,
    Input,
    Button
} from 'reactstrap';

import Action from '../Action/Action';



class Project extends Component {
    state = {
        project: {
            actions: [],
        }
    }

    render() {
        return (
            <Container>
                <Row>
                    <Col>
                        <h1>{this.state.project.name}</h1>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <h5>{this.state.project.description}</h5>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Button className="Button">Edit Project</Button>
                        <Button className="Button" onClick={() => this.deleteProject()}>Delete Project</Button>
                        <Button onClick={() => this.props.history.push(`/projects/${this.state.project.id}/actions/create`)}className="Button">Add New Action</Button>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        {this.state.project.actions.map(action => {
                            return <Action key={action.id} action={action}/>
                        })}
                    </Col>
                </Row>
            </Container>
        );
    }

    componentDidMount() {
        axios
            .get(`http://localhost:5000/api/projects/${this.props.match.params.projectId}`)
            .then(response => {
                this.setState({
                    project: response.data,
                });
                console.log(response.data);
            }).catch(error => console.log(error));
    }

    deleteProject() {
        axios
            .delete(`http://localhost:5000/api/projects/${this.props.match.params.id}`)
            .then(response => console.log(response))
            .catch(error => console.log(error));
    }
}

export default Project;