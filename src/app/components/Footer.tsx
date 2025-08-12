import React from "react";
import { Center, Group, Text } from "@mantine/core";
import getCurrentYear from "../utils/getCurrentYear";

const Footer: React.FC = () => {
  return (
    <Group className="footer" justify="center" gap="xs" >
      <Center>
        <p>
      <Text c="school.7" component="span"   style={{ backgroundColor: 'rgba(0, 0, 0, 0.8)' }}
>
        &nbsp;©{getCurrentYear()}&nbsp;| Eitan Fire&nbsp;
      </Text>
      <Text>Credit for images to ID 133420539 © Marina Vorontsova | Dreamstime.com & ID 170510354 © Kolgotki23 | Dreamstime.com</Text>
      </p>
      </Center>      
    </Group>
  );
};

export default Footer;