import React, { useState, useEffect } from "react";
import { Container, Navbar, Form, Button, Row, Col, Card } from "react-bootstrap";
import SSOButtons from "../components/SSOButtons";

import { useLogto } from "@logto/react";



function Nav() {
    const [isDarkMode, setIsDarkMode] = useState(false);
    const { isAuthenticated } = useLogto();
    const [userId, setUserId] = useState("");

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

    return (
        <Navbar fixed="top">
        <Container>
            <Navbar.Brand href="#home"></Navbar.Brand>
            <Navbar.Toggle />
            <Navbar.Collapse className="justify-content-end">
            <Navbar.Text className="me-4">
                {isDarkMode ?
                    <a href="#"><i onClick={toggleTheme} className="fa-solid fa-sun fa-lg"></i></a>
                :
                    <a href="#"><i onClick={toggleTheme} className="fa-solid fa-moon fa-lg"></i></a>
                }
            </Navbar.Text>
            <Navbar.Text>
                {isAuthenticated ? <SSOButtons /> : <></>}
            </Navbar.Text>

            
            </Navbar.Collapse>
        </Container>
        </Navbar>
    );
}

export default Nav;
