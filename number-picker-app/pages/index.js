// src/pages/index.js
import React, { useState, useEffect } from "react";
import { Container, Form, Button, Row, Col, Card } from "react-bootstrap";

import SSOButtons from '../components/SSOButtons';
import Nav from '../components/Navbar';

import { useLogto } from '@logto/react';
import { useRouter } from "next/router";

import axios from "axios";

const Home = () => {
  const [username, setUsername] = useState("");
  const [numbers, setNumbers] = useState([]);
  const [bonusNumber, setBonusNumber] = useState(null);
  const [includeBonus, setIncludeBonus] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const router = useRouter();

  useEffect(() => {
    // Fetch the saved theme from local storage, default to 'light' if not found
    const storedTheme = localStorage.getItem("theme") || "light";
    // Apply the theme to the document's body element
    document.body.setAttribute("data-theme", storedTheme);
    // Update the state to match the stored theme
    setIsDarkMode(storedTheme === "dark");
  }, []);

  const toggleTheme = () => {
    // Determine the opposite theme based on the current state
    const updatedTheme = isDarkMode ? "light" : "dark";
    // Update the document's body with the new theme
    document.body.setAttribute("data-theme", updatedTheme);
    // Save the new theme in local storage
    localStorage.setItem("theme", updatedTheme);
    // Change the state to reflect the new theme
    setIsDarkMode(!isDarkMode);
  };

  const numberRange = {
    grey: { min: 1, max: 9 },
    blue: { min: 10, max: 19 },
    pink: { min: 20, max: 29 },
    green: { min: 30, max: 39 },
    yellow: { min: 40, max: 49 },
  };

  const getColorClass = (number, isBonus = false) => {
    // Return a special class for the bonus ball
    if (isBonus) return 'bonus';
    // Return the appropriate class based on the number range
    if (number >= numberRange.grey.min && number <= numberRange.grey.max) return 'grey';
    if (number >= numberRange.blue.min && number <= numberRange.blue.max) return 'blue';
    if (number >= numberRange.pink.min && number <= numberRange.pink.max) return 'pink';
    if (number >= numberRange.green.min && number <= numberRange.green.max) return 'green';
    if (number >= numberRange.yellow.min && number <= numberRange.yellow.max) return 'yellow';
  };
  

  const generateUniqueNumbers = (total) => {
    // Create an array with numbers from 1 to 49
    const numbers = Array.from({ length: 49 }, (_, i) => i + 1);
  
    // Shuffle the array using Fisher-Yates algorithm
    for (let i = numbers.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [numbers[i], numbers[j]] = [numbers[j], numbers[i]];
    }
  
    // Return the first 'total' numbers sorted in ascending order
    return numbers.slice(0, total);
  };

  const handleGenerateNumbers = () => {
    // Generate 6 unique numbers
    const generatedNumbers = generateUniqueNumbers(6);
    let bonusNumber = null;
  
    // Generate a bonus number if includeBonus is true
    if (includeBonus) {
      const bonusNumbers = generateUniqueNumbers(1);
      bonusNumber = bonusNumbers[0];
    }
  
    // Set the generated numbers in the state
    setNumbers(generatedNumbers);
    // Set the bonus number in the state
    setBonusNumber(bonusNumber);
  
    // Save the result if username is provided
    if (username) {
      saveResult(username, generatedNumbers, bonusNumber);
    }
  };
  

  const saveResult = async (name, numbers, bonusNumber) => {
    try {
      // Post the name, numbers, and bonus number to the server
      await axios.post('http://localhost:3001/results', { name, numbers, bonusNumber });
    } catch (err) {
      // Log an error message if the post request fails
      console.error('Error saving result:', err);
    }
  };
  

  const handleViewResults = () => {
    // Navigate to the results page
    router.push("/results");
  };

  const { isAuthenticated, getIdTokenClaims, UserScope, userInfo } = useLogto();
  const [userId, setUserId] = useState('');

  useEffect(() => {
    (async () => {
      if (isAuthenticated) {
        const claims = await getIdTokenClaims();
        setUserId(claims.sub);
      }
    })();
  }, [isAuthenticated]);

  return (
    <>
      <Nav />
      {isAuthenticated ? (
        <Container className="d-flex justify-content-center align-items-center vh-100">
          {/* <h1>Number Picker App</h1> */}
            
          <Row>
            <Col className="col-lg-12 mt-5 p-5 mx-auto theBox">

              <Row>
                <Col className="col-lg-6 me-auto my-auto">
                  <h1>Hey user {userId} !</h1>
                  <p>
                    Welcome to the React Lottery - This is where you can draw your
                    random numbers and dance with joy that you will win... absolutely
                    nothing! The numbers you generate should be unique (never two of
                    the same), they will have colours depending on their range and if
                    you enter your name - they will be stored in json format. So why
                    wait? Generate today!
                  </p>
                
                </Col>
                <Col className="col-lg-4 d-none d-lg-inline-block ms-auto">
                  <img src="/win.svg" className="w-100" />
                </Col>
              </Row>

              <Row>
                <Col className="col-lg-12 mt-5 mx-auto">
                  <Form.Group controlId="username" className="mb-4">
                    <Form.Label className="fw-bold">Enter your name...</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="e.g. Joe Bloggs"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      className=""
                    />
                    <span className="form-text">
                      Leaving your name blank will prevent saving the results...
                    </span>
                  </Form.Group>

                  <Row>
                    <Col className="col-12 col-lg-auto">
                      <Button onClick={handleGenerateNumbers}>
                        Generate Numbers <i className="ms-2 fas fa-arrow-right"></i>
                      </Button>
                      <a
                        href="#"
                        onClick={handleViewResults}
                        className="d-block mt-2 text-decoration-none"
                      >
                        or view previous results
                      </a>
                    </Col>
                    <Col className="col-12 col-lg-auto ms-auto mt-4 mt-lg-2">
                      <Form.Switch
                        type="checkbox"
                        label="Include Bonus Ball"
                        checked={includeBonus}
                        onChange={(e) => setIncludeBonus(e.target.checked)}
                        className="custom-input"
                      />
                    </Col>
                  </Row>
                </Col>
              </Row>



              <Row className="mt-5">
                <Col className="col-12 text-center mx-auto">
                  {/* Render each generated number with its appropriate color class */}
                  {numbers.map((number, index) => (
                    <Card
                    key={index}
                    className={`number-box ${getColorClass(number)}`}
                    >
                    <Card.Body>
                        <Card.Text>{number}</Card.Text>
                      </Card.Body>
                    </Card>
                  ))}
                  {/* Render the bonus number with a special class if it exists */}
                  {bonusNumber !== null && (
                  <Card className={`number-box ${getColorClass(bonusNumber, true)}`}>
                    <Card.Body>
                      <Card.Text>{bonusNumber}</Card.Text>
                    </Card.Body>
                  </Card>
                  )}
                </Col>
              </Row>

            </Col>
          </Row>


        </Container>
      ) : (

        <Container className="d-flex justify-content-center align-items-center vh-100">
            <div className="col-lg-6 me-auto my-auto theBox mx-auto text-center p-5">
              <h1 className="mb-5">Welcome!</h1>
                <SSOButtons />

                <p className="text-muted mt-5 fst-italic">Having issues accessing this site? We are here to help, <a href="#">contact us.</a></p>
            </div>

                

        </Container>

      )}
    </>
  );
};


export default Home;
