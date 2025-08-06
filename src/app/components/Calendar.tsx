import { Box, BoxProps } from '@mantine/core';

interface CalendarProps extends BoxProps {
  iframeSource?: string;
  height?: number | string;
  width?: number | string;
}

const DEFAULT_IFRAME_SOURCE = `<iframe 
  src="https://calendar.google.com/calendar/embed?src=c_b0b902c1582fe02376559a63c9d8dcbf8d77f252f1a9810f00f893fd349a9f32%40group.calendar.google.com&ctz=America%2FDenver" 
  style="border:solid 1px #777" 
  width="100%" 
  height="300" 
  frameborder="0" 
  scrolling="no">
</iframe>`;

export default function Calendar({ 
  iframeSource = DEFAULT_IFRAME_SOURCE,
  height = 300,
  width = '100%',
  ...boxProps 
}: CalendarProps) {
  return (
    <Box
      className="Calendar"
      w={width}
      h={height}
      dangerouslySetInnerHTML={{ __html: iframeSource }}
      {...boxProps}
    />
  );
}