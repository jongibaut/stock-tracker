
import React from 'react';
import { Stock } from '../../models/Stock';
import { Card, Row, Col } from 'react-bootstrap';

const TopCards: React.FC<{ stocks: Stock[] }> = ({ stocks }) => (
  <Row className="g-4 justify-content-center" style={{ padding: '20px' }}>
  {stocks.map(({ stock, value, change, alertPrice }, index) => (
    <Col key={index} xs={12} sm={6} md={4} lg={3}>
      <Card
        className="h-100 shadow"
        style={{
          backgroundColor: value >= alertPrice ? '#28a745' : '#dc3545',
          color: 'white',
          borderRadius: '10px',
        }}
      >
        <Card.Body className="text-center">
          <Card.Title className="mb-3" style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>
            {stock}
          </Card.Title>
          <Card.Text>
            <strong>Value:</strong> ${value.toFixed(2)}
          </Card.Text>
          <Card.Text>
            <strong>Change:</strong> {change.toFixed(2)}%
          </Card.Text>
        </Card.Body>
      </Card>
    </Col>
  ))}
</Row>

);

export default TopCards;
