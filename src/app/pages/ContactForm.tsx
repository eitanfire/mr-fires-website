import { Button, Group, Text, Stack, Card, Container } from '@mantine/core';
import { IconBrandGoogleFilled, IconMail } from '@tabler/icons-react';

const ContactForm = () => {
  const handleGoogleChat = () => {
    window.open('https://chat.google.com/dm/efire@jajags.com', '_blank');
  };

  const handleEmail = () => {
    const subject = encodeURIComponent('Contact Request - Prefer Google Chat');
    const body = encodeURIComponent('Hi! I\'d prefer to continue this conversation via Google Chat if possible.');
    window.location.href = `mailto:efire@jajags.com?subject=${subject}&body=${body}`;
  };

  return (
    <Container size="xs" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '50vh' }}>
      <Card shadow="sm" padding="xl" radius="md" withBorder style={{ width: '100%', maxWidth: 350 }}>
        <Stack spacing="lg" align="center">
          <Text size="xl" weight={500} color="gray.8">
            Let's Connect
          </Text>
          
          <Text size="sm" color="gray.6" align="center" style={{ lineHeight: 1.5 }}>
            Choose your preferred way to reach out
          </Text>

          <Stack spacing="sm" style={{ width: '100%' }}>
            <Button
              leftIcon={<IconBrandGoogleFilled size={16} />}
              onClick={handleGoogleChat}
              variant="filled"
              size="md"
              radius="md"
              fullWidth
              styles={(theme) => ({
                root: {
                  backgroundColor: '#4285f4',
                  '&:hover': {
                    backgroundColor: '#3367d6',
                  },
                },
              })}
            >
              Google Chat
            </Button>
            
            <Button
              leftIcon={<IconMail size={16} />}
              onClick={handleEmail}
              variant="light"
              size="md"
              radius="md"
              fullWidth
              color="gray"
            >
              Email
            </Button>
          </Stack>

          <Text size="xs" color="gray.5" align="center">
            Redirects to external services • No data collected
          </Text>
        </Stack>
      </Card>
    </Container>
  );
};

export default ContactForm;