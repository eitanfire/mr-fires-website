import React from "react";
import { useState, useEffect } from "react";
import { Container, Grid, Image } from "@mantine/core";
import { useSpring, animated } from "react-spring";
import { Link } from "react-router-dom";
import Banner from "../img/class-website-banner.png";
import Logo from "../img/logo.jpg";
import "../../App.css";

const Header: React.FC = () => {
  const [toggle, setToggle] = useState<boolean>(false);

  const animatedStyle = useSpring({
    opacity: toggle ? 1 : 0,
    config: {
      duration: 500,
    },
    marginLeft: toggle ? 0 : -500,
  });

  useEffect(() => {
    setToggle(true);
  }, []);

  return (
    <animated.div style={animatedStyle}>
      <div className="App" id="Header">
        <Link to="/">
          <Container size="xl">
            <Grid id="banner" align="center">
              <Grid.Col 
                span={{ base: 0, sm: 0, md: 'auto' }}
                visibleFrom="md"
              >
                <Image 
                  id="class-with-eitan-lg" 
                  src={Banner} 
                  alt="Banner"
                  fit="contain"
                />
              </Grid.Col>
              <Grid.Col 
                span="auto"
                hiddenFrom="md"
              >
                <Image 
                  id="class-with-eitan-sm" 
                  src={Banner} 
                  alt="Banner"
                  fit="contain"
                />
              </Grid.Col>
              <Grid.Col 
                span={{ base: 0, lg: 'auto' }}
                visibleFrom="lg"
              >
                <Image 
                  id="logo" 
                  src={Logo} 
                  alt="September School logo"
                  fit="contain"
                />
              </Grid.Col>
            </Grid>
          </Container>
        </Link>
      </div>
    </animated.div>
  );
};

export default Header;