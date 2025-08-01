import React from "react";
import { Group, Text } from "@mantine/core";
import getCurrentYear from "../utils/getCurrentYear";

const Footer: React.FC = () => {
  return (
    <Group className="footer" justify="center" gap="xs" >
      <Text c="school.7" component="span"   style={{ backgroundColor: 'rgba(0, 0, 0, 0.8)' }}
>
        &nbsp;©{getCurrentYear()}&nbsp;| Eitan Fire&nbsp;
      </Text>
    </Group>
  );
};

export default Footer;