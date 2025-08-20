import React from "react";
import { Text } from "@mantine/core";
import getCurrentYear from "../utils/getCurrentYear";

const Footer: React.FC = () => {
  return (
    <div 
      className="footer" 
      style={{ 
        textAlign: 'center',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '8px'
      }}
    >
      <Text 
        style={{ 
          backgroundColor: 'rgba(0, 0, 0, 0.8)',
          padding: '4px 8px',
          borderRadius: '4px'
        }}
        size="sm"
        c="school.7"
      >
        ©{getCurrentYear()} | Eitan Fire
      </Text>
      
      <Text 
        style={{ 
          backgroundColor: 'rgba(0, 0, 0, 0.8)',
          padding: '4px 8px',
          borderRadius: '4px',
          fontSize: '0.75rem'
        }}
        size="xs"
        c="school.7"
      >
        Credit for images to ID 133420539 © Marina Vorontsova | Dreamstime.com & ID 170510354 © Kolgotki23 | Dreamstime.com
      </Text>
    </div>
  );
};

export default Footer;