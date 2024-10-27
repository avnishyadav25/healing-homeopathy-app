// src/components/ProductList.js

import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import ProductCard from './ProductCard';

const ProductList = ({ products }) => {
  return (
    <Container>
      <Row>
        {products.map(product => (
          <Col md={4} key={product.id}>
            <ProductCard product={product} />
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default ProductList;
