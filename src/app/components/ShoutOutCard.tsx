import React from "react";
import { Container, Grid, Title, Text, Card } from "@mantine/core";

interface ShoutOutCardProps {
  to?: string;
  from?: string;
  because?: string;
  id?: string | number;
}

const ShoutOutCard: React.FC<ShoutOutCardProps> = (props) => {
  return (
    <Card shadow="sm" padding="lg" radius="md" withBorder>
      <Title order={1} style={{ marginBottom: "1rem" }}>
        📢 Give Someone a Shout Out 🎉
      </Title>
      <Container size="xs">
        <Grid className="shoutOutsRow">
          {props.to && (
            <Grid.Col span={12} key={`${props.id}-to`}>
              <Text size="md">
                <strong>To:</strong> {props.to}
              </Text>
            </Grid.Col>
          )}
          {props.from && (
            <Grid.Col span={12}>
              <Text size="md">
                <strong>From:</strong> {props.from}
              </Text>
            </Grid.Col>
          )}
          {props.because && (
            <Grid.Col span={12}>
              <Text size="md">
                <strong>For:</strong> {props.because}
              </Text>
            </Grid.Col>
          )}
        </Grid>
      </Container>
    </Card>
  );
};

export default ShoutOutCard;
