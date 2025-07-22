import React from "react";
import { Carousel } from "@mantine/carousel";
import { Card, Text, Stack, Title, Box } from "@mantine/core";
import { shoutOuts } from "../utils/shoutOuts";

interface ShoutOut {
  to?: string;
  from?: string;
  because?: string;
}

const ShoutOutCarousel: React.FC = () => {
  const slides = shoutOuts.map((item: ShoutOut, index: number) => (
    <Carousel.Slide key={index}>
      <Card shadow="sm" padding="lg" radius="md" withBorder>
        <Card.Section>
          <Stack gap="sm" className="shoutOuts" p="md">
            {item.to && (
              <Text size="sm">
                <strong>To:</strong> {item.to}
              </Text>
            )}
            {item.from && (
              <Text size="sm">
                <strong>From:</strong> {item.from}
              </Text>
            )}
            {item.because && (
              <Text size="sm">
                <strong>For:</strong> {item.because}
              </Text>
            )}
          </Stack>
        </Card.Section>
      </Card>
    </Carousel.Slide>
  ));

  return (
    <Box style={{ position: "relative" }}>
      {/* Logo */}
      <Title 
        order={2} 
        className="shoutOut-logo" 
        hiddenFrom="xxl"
      >
        Shout Out
      </Title>      
      {/* Carousel */}
      <Carousel
        withIndicators
        withControls
        slideSize="100%"
        slideGap="md"
        controlSize={40}
      >
        {slides}
      </Carousel>
    </Box>
  );
};

export default ShoutOutCarousel;