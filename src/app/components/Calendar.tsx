import { Box, BoxProps } from '@mantine/core';

interface CalendarProps extends BoxProps {
  iframeSource?: string;
  height?: number | string;
  width?: number | string;
}

const DEFAULT_IFRAME_SOURCE = `<iframe 
  src="https://calendar.google.com/calendar/embed?src=en.usa%23holiday%40group.v.calendar.google.com&ctz=America%2FDenver" 
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