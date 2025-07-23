import React, { useRef, useState, useEffect } from "react";
import { Carousel } from "@mantine/carousel";
import type { EmblaCarouselType } from "embla-carousel";
import { Box, Title, ActionIcon } from "@mantine/core";
import { IconPlayerPause, IconPlayerPlay } from "@tabler/icons-react";
import Autoplay from 'embla-carousel-autoplay';

// Mock data for demonstration
const shoutOuts = [
  { to: "John", from: "Sarah", because: "Great teamwork on the project!" },
  { to: "Alice", from: "Bob", because: "Always willing to help others" },
  { to: "Mike", from: "Lisa", because: "Excellent problem-solving skills" },
  { to: "Emma", from: "David", because: "Outstanding presentation yesterday" },
  { to: "Chris", from: "Amy", because: "Mentoring new team members" },
  { to: "Sophie", from: "Tom", because: "Creative solutions and innovation" },
  { to: "Ryan", from: "Kate", because: "Reliable and dedicated work" }
];

interface ShoutOut {
  to?: string;
  from?: string;
  because?: string;
}

// Mock ShoutOutCard component
const ShoutOutCard: React.FC<{ to?: string; from?: string; because?: string; id: number }> = ({ to, from, because }) => (
  <Box
    style={{
      background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
      padding: "20px",
      borderRadius: "12px",
      color: "white",
      height: "160px",
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-between",
      boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)"
    }}
  >
    <div>
      <Title order={4} style={{ marginBottom: "8px" }}>To: {to}</Title>
      <p style={{ fontSize: "14px", margin: "0 0 12px 0" }}>{because}</p>
    </div>
    <p style={{ fontSize: "12px", fontStyle: "italic", margin: "0" }}>— {from}</p>
  </Box>
);

const ShoutOutCarousel: React.FC = () => {
  // Create autoplay instance with useRef
  const autoplay = useRef(Autoplay({ 
    delay: 5000,
    stopOnInteraction: false // Continue autoplay after user interaction
  }));

  // State to track if autoplay is playing
  const [isPlaying, setIsPlaying] = useState(true);
  const [emblaApi, setEmblaApi] = useState<EmblaCarouselType | null>(null);
  const [selectedIndex, setSelectedIndex] = useState(2);

  const toggleAutoplay = () => {
    if (isPlaying) {
      autoplay.current.stop();
      setIsPlaying(false);
    } else {
      autoplay.current.play();
      setIsPlaying(true);
    }
  };

  // Function to calculate opacity based on distance from center
  const getSlideOpacity = (slideIndex: number, centerIndex: number, totalSlides: number) => {
    const distance = Math.abs(slideIndex - centerIndex);
    const maxDistance = Math.floor(totalSlides / 2);
    
    // Calculate opacity: center = 1, gradually decrease to sides
    if (distance === 0) return 1; // Center slide
    if (distance === 1) return 0.7; // Adjacent slides
    if (distance === 2) return 0.4; // Further slides
    return 0.2; // Furthest slides
  };

  const slides = shoutOuts.map((item: ShoutOut, index: number) => {
    const opacity = getSlideOpacity(index, selectedIndex, shoutOuts.length);
    
    return (
      <Carousel.Slide 
        key={index}
        style={{
          opacity: opacity,
          transition: 'opacity 0.3s ease-in-out'
        }}
      >
        <ShoutOutCard 
          to={item.to}
          from={item.from}
          because={item.because}
          id={index}
        />
      </Carousel.Slide>
    );
  });

  function setEmbla(embla: EmblaCarouselType): void {
    setEmblaApi(embla);
  }

  useEffect(() => {
    if (emblaApi) {
      console.log("Embla API is ready", emblaApi);
      
      // Set up event listener for slide selection
      const onSelect = () => {
        setSelectedIndex(emblaApi.selectedScrollSnap());
      };
      
      emblaApi.on('select', onSelect);
      onSelect(); // Set initial selected index
      
      // Cleanup
      return () => {
        emblaApi.off('select', onSelect);
      };
    }
  }, [emblaApi]);

  return (
    <Box style={{ position: "relative"}}>
      {/* Logo */}
      <Title 
        order={3} 
        className="shoutOut-logo" 
        style={{ marginBottom: "16px" }}
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