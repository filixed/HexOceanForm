import React from 'react'
import Form from './components/form/form'
import {Container, Row, Col} from 'react-bootstrap'

const App = () => {
  return (
    <Container>
    <Row className="justify-content-md-center">
      <h1>HexOcean Form</h1>
    </Row>
    <Row className="justify-content-md-center">
      <Col>
          <Form />
      </Col>
    </Row>
    </Container>
  );
}

export default App;
