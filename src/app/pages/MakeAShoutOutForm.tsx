import React, { useEffect, useState } from 'react';
import { Container, Paper, Title, Text, Loader, Alert, Box } from '@mantine/core';
import { IconAlertCircle, IconExclamationMark } from '@tabler/icons-react';

interface MakeAShoutOutFormProps {
  iframeSource?: string;
  title?: string;
  description?: string;
  width?: string | number;
  height?: string | number;
}

const MakeAShoutOutForm: React.FC<MakeAShoutOutFormProps> = ({
  iframeSource = 'https://docs.google.com/forms/d/e/1FAIpQLSe9nxRVUGfEBl6eMQo0CZUdfYh7ksqLdmsI18JG9nbWJtWwOw/viewform?usp=dialog',
  title = 'Make a Shout Out',
  description = 'Share your appreciation and recognition with others. Your shout out will be shown on this site',
  width = '100%',
  height = 700,
}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    document.title = title;
  }, [title]);

  const handleIframeLoad = () => {
    setIsLoading(false);
  };

  const handleIframeError = () => {
    setIsLoading(false);
    setHasError(true);
  };

  // Validate iframe source URL
  const isValidUrl = (url: string): boolean => {
    try {
      new URL(url);
      return url.startsWith('https://');
    } catch {
      return false;
    }
  };

  if (!isValidUrl(iframeSource)) {
    return (
      <Container size="md" py="xl">
        <Alert
          icon={<IconAlertCircle size="1rem" />}
          title="Invalid Form URL"
          color="red"
          variant="light"
        >
          The provided form URL is invalid or not secure. Please check the URL and try again.
        </Alert>
      </Container>
    );
  }

  return (
    <Container size="lg" py="xl">
      <Paper shadow="sm" radius="md" p="xl" withBorder>
        <Title order={1} ta="center" mb="sm">
          {title}
        </Title>
        
        {description && (
          <Text c="dimmed" ta="center" mb="xl">
            {description}
          </Text>
        )}

        <Box pos="relative">
          {isLoading && (
            <Box
              style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                zIndex: 1,
              }}
            >
              <Loader size="lg" />
            </Box>
          )}

          {hasError ? (
            <Alert
              icon={<IconExclamationMark size="1rem" />}
              title="Form Loading Error"
              color="yellow"
              variant="light"
            >
              Unable to load the form. Please try refreshing the page or contact support if the problem persists.
            </Alert>
          ) : (
            <iframe
              src={iframeSource}
              width={width}
              height={height}
              style={{
                border: 'none',
                borderRadius: '8px',
                width: '100%',
                minHeight: typeof height === 'number' ? `${height}px` : height,
                opacity: isLoading ? 0.3 : 1,
                transition: 'opacity 0.3s ease',
              }}
              title={title}
              loading="lazy"
              onLoad={handleIframeLoad}
              onError={handleIframeError}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              sandbox="allow-same-origin allow-scripts allow-forms allow-popups"
            />
          )}
        </Box>
      </Paper>
    </Container>
  );
};

export default MakeAShoutOutForm;
