import { useState, useEffect } from "react";
import { Container, Grid } from "@mantine/core";
import { useSpring, animated } from "react-spring";
import weekday from "../utils/day";
import aDayBDay from "../utils/aDayBDay";

interface BlockDayProps {}

const BlockDay: React.FC<BlockDayProps> = () => {
  const [toggle, setToggle] = useState<boolean>(false);

  const animatedStyle = useSpring({
    opacity: toggle ? 1 : 0,
    transform: toggle ? "scale(1,1)" : "scale(1,0)",
    config: { duration: 500 },
  });

  useEffect(() => {
    setToggle(true);
  }, []);

  const brightDay: JSX.Element = (
    <span id="aBAB">
      {typeof aDayBDay === "string" ? aDayBDay.slice(1) : ""}
    </span>
  );

  return (
    <animated.div style={animatedStyle}>
      <Container className="BlockDay">
        <Grid className="BlockDay-text">
          <Grid.Col span={12}>
            <span>Today is {weekday}.</span>
          </Grid.Col>
          {aDayBDay && (
            <Grid.Col span={12}>
              It's a{aDayBDay[0]} {brightDay} day.
            </Grid.Col>
          )}
        </Grid>
      </Container>
    </animated.div>
  );
};

export default BlockDay;