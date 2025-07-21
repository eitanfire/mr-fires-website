import React from "react";
import { Group, Text } from "@mantine/core";
import getCurrentYear from "../utils/getCurrentYear";

const Footer: React.FC = () => {
  return (
    <Group className="footer" justify="center" gap="xs">
      <Text id="aBAB" component="span">
        ©{getCurrentYear()}&nbsp;Mr. Eitan Fire
      </Text>
      <Text id="shine" component="span">
        &nbsp;A <Text id="globe" component="span">🌍</Text> Class Experience!
      </Text>
    </Group>
  );
};

export default Footer;