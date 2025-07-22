import React from "react";
import { Container, Grid, Title, Stack } from "@mantine/core";
import ShoutOutCard from "../components/ShoutOutCard";

interface ShoutOut {
  id: string | number;
  to?: string;
  from?: string;
  because?: string;
}

export const shoutOuts: ShoutOut[] = [
  {
    id: 1,
    to: "Example Person",
    from: "Another Person", 
    because: "Being awesome!"
  },
];

const ShoutOuts: React.FC = () => {
  return (
    <Container className="shoutOuts">
      <Grid>
        <Grid.Col span={12}>
          <Title order={2} className="shoutOutTitle">
            📢 Shout Outs
          </Title>
        </Grid.Col>
        <Grid.Col span={12}>
          <Stack gap="md">
            {shoutOuts.map(({ to, from, because, id }: ShoutOut) => (
              <ShoutOutCard key={id} to={to} from={from} because={because} />
            ))}
          </Stack>
        </Grid.Col>
      </Grid>
    </Container>
  );
};

export default ShoutOuts;
