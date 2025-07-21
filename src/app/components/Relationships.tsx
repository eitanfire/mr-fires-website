import React from "react";
import { useState, useEffect } from "react";
import { Container, Stack, Button, Card, Title } from "@mantine/core";
import { Link } from "react-router-dom";
import { useSpring, animated } from "react-spring";

const Relationships: React.FC = () => {
  const [toggle, setToggle] = useState<boolean>(false);

  const animatedStyle = useSpring({
    opacity: toggle ? 1 : 0,
    transform: toggle ? "scale(1,1)" : "scale(1,0)",
    config: { duration: 500 },
  });

  useEffect(() => {
    setToggle(true);
  }, []);

  return (
    <animated.div style={animatedStyle}>
      <Card 
        shadow="sm" 
        padding="lg" 
        radius="md" 
        withBorder
        visibleFrom="lg"
      >
        <Card.Section>
          <Container className="eitan-info-box" size="xs">
            <Stack gap="md">
              <Button
                component={Link}
                to="/shout-out"
                className="EitanInfoButtons"
                variant="filled"
                color="cyan"
                radius="xl"
                fullWidth
                styles={{
                  root: {
                    border: '1px solid #000',
                  }
                }}
              >
                <Title order={3} id="rainbowText">
                  Shout Out
                </Title>
              </Button>

              <Button
                component={Link}
                to="/contact"
                className="EitanInfoButtons"
                variant="filled"
                color="cyan"
                radius="xl"
                fullWidth
                styles={{
                  root: {
                    border: '1px solid #000',
                  }
                }}
              >
                <Title order={3} id="rainbowText">
                  Contact
                </Title>
              </Button>

              <Button
                component={Link}
                to="/read-more"
                className="EitanInfoButtons"
                variant="filled"
                color="cyan"
                radius="xl"
                fullWidth
                styles={{
                  root: {
                    border: '1px solid #000',
                  }
                }}
              >
                <Title order={3} id="rainbowText">
                  Your Teacher
                </Title>
              </Button>
            </Stack>
          </Container>
        </Card.Section>
      </Card>
    </animated.div>
  );
};

export default Relationships;