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

class EditAction extends Component {
    state = {
        action: {}
    }
    render() {
        return (
            <Form>
                <FormGroup>
                    <Input />
                    <Input />
                </FormGroup>
            </Form>
        );
    }

    componentDidMount() {
        
    }
}

export default EditAction;