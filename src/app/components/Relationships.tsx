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
        styles={{
          root: {
            borderColor: "#000000", // School black border
            backgroundColor: "#f8f7f2", // Light school yellow background
          }
        }}
      >
        <Card.Section>
          <Container className="eitan-info-box" size="xs">
            <Stack gap="md">
              <Button
                component={Link}
                to="/shout-out"
                className="EitanInfoButtons"
                variant="filled"
                color="school" // Use school yellow theme color
                radius="xl"
                fullWidth
                styles={{
                  root: {
                    border: '2px solid #000000', // School black border
                    backgroundColor: '#D7CD89', // School yellow background
                    color: '#000000', // School black text
                    '&:hover': {
                      backgroundColor: '#c4b876', // Darker yellow on hover
                      color: '#000000', // Keep black text on hover
                    }
                  }
                }}
              >
                <Title 
                  order={3} 
                  id="rainbowText"
                  style={{ color: '#000000' }} // School black text
                >
                  Shout Out
                </Title>
              </Button>

              <Button
                component={Link}
                to="/contact"
                className="EitanInfoButtons"
                variant="filled"
                color="schoolDark" // Use school black theme color
                radius="xl"
                fullWidth
                styles={{
                  root: {
                    border: '2px solid #D7CD89', // School yellow border
                    backgroundColor: '#000000', // School black background
                    color: '#D7CD89', // School yellow text
                    '&:hover': {
                      backgroundColor: '#404040', // Lighter black on hover
                      color: '#D7CD89', // Keep yellow text on hover
                    }
                  }
                }}
              >
                <Title 
                  order={3} 
                  id="rainbowText"
                  style={{ color: '#D7CD89' }} // School yellow text
                >
                  Contact
                </Title>
              </Button>

              <Button
                component={Link}
                to="/read-more"
                className="EitanInfoButtons"
                variant="outline" // Use outline variant for variety
                color="schoolDark"
                radius="xl"
                fullWidth
                styles={{
                  root: {
                    border: '2px solid #000000', // School black border
                    backgroundColor: 'transparent',
                    color: '#000000', // School black text
                    '&:hover': {
                      backgroundColor: '#f1eedf', // Light yellow background on hover
                      color: '#000000', // Keep black text on hover
                      borderColor: '#000000', // Keep black border
                    }
                  }
                }}
              >
                <Title 
                  order={3} 
                  id="rainbowText"
                  style={{ color: '#000000' }} // School black text
                >
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
