import React from 'react';
import { withRouter } from 'react-router-dom';
import axios from 'axios';
import { Container,
    Row,
    Col,
    Button
} from 'reactstrap';

import './Action.css';

const Action = props => {

    const deleteAction = () => {
        axios
            .delete(`http://localhost:5000/api/actions/${props.action.id}`)
            .then(response => console.log(response))
            .catch(error => console.log(error));

            window.location.reload();
    }

    return (
        <Container className='ActionContainer'>
            <Row>
                <Col>
                    <h3>{props.action.description}</h3>
                </Col>
            </Row>
            <Row>
                <Col>
                    <h5>{props.action.notes}</h5>
                </Col>
            </Row>
            <Row>
                <Col>
                    <Button onClick={() => props.history.push(`/edit/actions/${props.action.id}`)}className='Button'>Edit Action</Button>
                    <Button onClick={() => deleteAction()} className='Button'>Delete Action</Button>
                </Col>

            </Row>
        </Container>
    )

}

export default withRouter(Action);