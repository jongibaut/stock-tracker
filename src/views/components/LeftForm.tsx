
import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';

interface LeftFormProps {
  onAddStock: (stock: string, alert: number) => void;
}

const LeftForm: React.FC<LeftFormProps> = ({ onAddStock }) => {
  const [stock, setStock] = useState('');
  const [alertPrice, setAlertPrice] = useState(0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (stock && alertPrice) {
      onAddStock(stock, alertPrice);
      setStock('');
      setAlertPrice(0);
    }
  };

  return (
    <div 
    style={{
      display: 'flex', 
      justifyContent: 'center', 
      alignItems: 'center', 
      height: '30vh', 
      backgroundColor: '#f0f2f5'
    }}
    >
    <Form 
      onSubmit={handleSubmit} 
      className="p-4 border rounded shadow-sm bg-white"
      style={{ maxWidth: '400px', margin: '0 auto' }}
    >
    <h4 className="text-center mb-4 text-primary">Add Stock Alert</h4>

    <Form.Group 
      className="mb-4" 
      controlId="stockSelect"
      style={{ backgroundColor: '#f8f9fa', padding: '10px', borderRadius: '8px' }}
    >
      <Form.Label 
        className="fw-bold text-secondary" 
        style={{ fontSize: '14px' }}
      >
        Select Stock
      </Form.Label>
      <Form.Control
        as="select"
        value={stock}
        onChange={(e) => setStock(e.target.value)}
        className="py-2 rounded"
        style={{ border: '1px solid #ced4da' }}
      >
        <option value="" disabled>-- Choose Stock --</option>
        <option value="AAPL">Apple (AAPL)</option>
        <option value="GOOGL">Google (GOOGL)</option>
        <option value="AMZN">Amazon (AMZN)</option>
      </Form.Control>
    </Form.Group>

    <Form.Group 
      className="mb-4" 
      controlId="priceAlert"
      style={{ backgroundColor: '#f8f9fa', padding: '10px', borderRadius: '8px' }}
    >
      <Form.Label 
        className="fw-bold text-secondary" 
        style={{ fontSize: '14px' }}
      >
        Set Price Alert
      </Form.Label>
      <Form.Control
        type="number"
        placeholder="Enter alert price"
        value={alertPrice}
        onChange={(e) => setAlertPrice(Number(e.target.value))}
        className="py-2 rounded"
        style={{ border: '1px solid #ced4da' }}
      />
    </Form.Group>

    <Button variant="primary" type="submit" className="w-100 py-2 fw-bold">
      Add Alert
    </Button>
  </Form>
  </div>

  );
};

export default LeftForm;
