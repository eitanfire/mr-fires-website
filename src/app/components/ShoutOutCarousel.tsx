import React, { useRef, useState } from "react";
import { Carousel } from "@mantine/carousel";
import type { EmblaCarouselType } from "embla-carousel";
import { Box, Title, ActionIcon } from "@mantine/core";
import { IconPlayerPause, IconPlayerPlay } from "@tabler/icons-react";
import { shoutOuts } from "../utils/shoutOuts";
import ShoutOutCard from "./ShoutOutCard";
import Autoplay from 'embla-carousel-autoplay';

interface ShoutOut {
  to?: string;
  from?: string;
  because?: string;
}

const ShoutOutCarousel: React.FC = () => {
  // Create autoplay instance with useRef
  const autoplay = useRef(Autoplay({ 
    delay: 3000, // 3 seconds delay between slides
    stopOnInteraction: false // Continue autoplay after user interaction
  }));

  // State to track if autoplay is playing
  const [isPlaying, setIsPlaying] = useState(true);

  const toggleAutoplay = () => {
    if (isPlaying) {
      autoplay.current.stop();
      setIsPlaying(false);
    } else {
      autoplay.current.play();
      setIsPlaying(true);
    }
  };

  const slides = shoutOuts.map((item: ShoutOut, index: number) => (
    <Carousel.Slide key={index}>
      <ShoutOutCard 
        to={item.to}
        from={item.from}
        because={item.because}
        id={index}
      />
    </Carousel.Slide>
  ));

  const [emblaApi, setEmblaApi] = React.useState<EmblaCarouselType | null>(null);

  function setEmbla(embla: EmblaCarouselType): void {
    setEmblaApi(embla);
  }

  React.useEffect(() => {
    if (emblaApi) {
      console.log("Embla API is ready", emblaApi);
    }
  }, [emblaApi]);

  return (
    <Box style={{ position: "relative"}}>
      {/* Logo */}
      <Title 
        order={3} 
        className="shoutOut-logo" 
        hiddenFrom="xxl"
      >
        Shout Out
      </Title>
      
      {/* Pause/Play Button */}
      <ActionIcon
        variant="filled"
        size="lg"
        onClick={toggleAutoplay}
        style={{
          position: "absolute",
          top: "10px",
          right: "10px",
          zIndex: 10,
          backgroundColor: "rgba(0, 0, 0, 0.6)",
          color: "white"
        }}
        aria-label={isPlaying ? "Pause autoplay" : "Play autoplay"}
      >
        {isPlaying ? <IconPlayerPause size={16} /> : <IconPlayerPlay size={16} />}
      </ActionIcon>
      
      {/* Carousel */}
      <Carousel
        withIndicators
        withControls
        controlSize={90}
        emblaOptions={{ dragFree: true }}
        slideSize="50%"
        slideGap="md"
        height={200}
        getEmblaApi={setEmbla}
        initialSlide={2}
        plugins={[autoplay.current]}
        onMouseEnter={() => {
          if (isPlaying) {
            autoplay.current.stop();
          }
        }}
        onMouseLeave={() => {
          if (isPlaying) {
            autoplay.current.play();
          }
        }}
      >
        {slides}
      </Carousel>
    </Box>
  );
};

export default ShoutOutCarousel;