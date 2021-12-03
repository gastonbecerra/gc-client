import React from 'react'
import { Container, Button, ListGroup, Card, Accordion, Badge } from 'react-bootstrap'
import {Link} from 'react-router-dom';

export default function LabHome() {
    return (
        <Container className="lab-container">
            
            <a 
                variant="outline-danger" 
                size="lg"
                className="my-2"
                style={{maxWidth: '300px'}}
                href="#create"
                >
                    Create new Indicator
                </a>{' '}    
            <div>

            <ListGroup.Item className="my-4 indicator-card">               
                <div className="fw-bold">Indicator name</div>
                <Card.Text className="my-2">This a lorem ipsum description for not yet created indicator that will come for our users creativiy!</Card.Text>
                <Accordion>
                <Accordion.Item eventKey="0">
                    <Accordion.Header>Insights</Accordion.Header>
                    <Accordion.Body>
                    <Badge pill bg="light" text="dark">
                    <Badge bg="secondary">50%</Badge> del contexto <Badge bg="secondary">Macristas</Badge> han participado de este indicador
                    </Badge>{' '}
                    <Badge pill bg="light" text="dark">
                        50% del contexto x han participado de este indicador
                    </Badge>{' '}
                    <Badge pill bg="light" text="dark">
                        50% del contexto x han participado de este indicador
                    </Badge>{' '}
                    </Accordion.Body>
                </Accordion.Item>
                </Accordion>
                <Link to={{ pathname: `/` }}>
                    <Button size="sm" className="my-1 pl-1" variant="outline-primary">Acceder</Button>    
                </Link>
            </ListGroup.Item>

            <ListGroup.Item className="my-2 indicator-card">
                
                <div className="fw-bold">Indicator name</div>
                <Card.Text className="my-2">This a lorem ipsum description for not yet created indicator that will come for our users creativiy!</Card.Text>
                
                <Link to={{ pathname: `/` }}>
                    <Button size="sm" className="my-0.5 pl-1" variant="outline-primary">Acceder</Button>    
                </Link>
            </ListGroup.Item>
            </div>
            
            <hr></hr>
            
            <div>
                

            </div>
        </Container>
    )
}
