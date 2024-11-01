// src/components/ProductCard.js

import React from 'react';
import { Card, Button } from 'react-bootstrap';

const ProductCard = ({ product }) => {
  return (
    <Card className="mb-4 shadow-sm">
      <Card.Img variant="top" src={product.image} />
      <Card.Body>
        <Card.Title>{product.name}</Card.Title>
        <Card.Text>{product.description}</Card.Text>
        <Card.Text><strong>${product.price}</strong></Card.Text>
        <Button variant="success" href={`/products/${product.id}`}>View Details</Button>
      </Card.Body>
    </Card>
  );
};

export default ProductCard;
