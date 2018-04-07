import React, { Component } from 'react';
import { Container, Row, Col } from 'reactstrap';

class Home extends Component {
    render() {
        return (
            <Container>
                <Row>
                    <Col>
                        <h1>Welcome to Status 200</h1>
                    </Col>
                </Row>
            </Container>
        );
    }
}

export default Home;