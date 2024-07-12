// src/pages/results.js
import React, { useEffect, useState } from 'react';
import Link from 'next/link'
import { Container, Row, Col } from 'react-bootstrap';
import axios from 'axios';

const Results = () => {
  const [previousResults, setPreviousResults] = useState([]);

  const fetchPreviousResults = async () => {
    try {
      const response = await axios.get('http://localhost:3001/results');
      setPreviousResults(response.data);
    } catch (err) {
      console.error('Error fetching results:', err);
    }
  };

  useEffect(() => {
    fetchPreviousResults();
  }, []);

  return (
    <>
      <Container className="text-center mt-5">
        <h1>Previous Results</h1>
        <Link href="/" className="d-block mt-2 text-decoration-none mb-5">Return to the Homepage</Link>
        {previousResults.map((result, index) => (
          <Row key={index} className="justify-content-center">
            <Col className="result">
              <Row className="mx-auto">
                <Col className="col-auto ms-auto text-right">
                  <strong>{result.name}:</strong> 
                </Col>
                <Col className="col-auto me-auto text-right">
                  {result.numbers.join(', ')}
                </Col>
              </Row>
            </Col>
          </Row>
        ))}
      </Container>
    </>
  );
};

export default Results;