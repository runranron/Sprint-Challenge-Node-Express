import React, { Component } from 'react';
import axios from 'axios';
import {
    Container,
    Row,
    Col,
    Form,
    FormGroup,
    Input,
    Button,
} from 'reactstrap';

class CreateProject extends Component {
    state = {
        name: '',
        description: '',
    }

    render() {
        return (
            <Container>
                <Row>
                    <Col>
                        <h1>Create Project</h1>
                    </Col>
                </Row>
                <Row className="Form">
                    <Col>
                        <Form>
                            <FormGroup>
                                <Input name='name' onChange={this.handleChange.bind(this)}/>
                                <Input name='description' onChange={this.handleChange.bind(this)} />
                                <Button onClick={() => this.handleSubmit()}>Create Project</Button>
                            </FormGroup>
                        </Form>
                    </Col>
                </Row>
        </Container>
        );
    }

    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value,
        })
    }

    handleSubmit() {
        axios.post('http://localhost:5000/api/projects', {
            name: this.state.name,
            description: this.state.name,
        })
        .then(response => console.log(response.data))
        .catch(error => console.log(error.message));
    }
}

export default CreateProject;