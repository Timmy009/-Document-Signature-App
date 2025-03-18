import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from '@/components/ui/carousel';
import Autoplay from 'embla-carousel-autoplay';
import { useRef } from 'react';
import { Text } from '@/components/typography/Text/text';
import { authSliderData } from '@/lib/constants/constants';
// import Dots from './dots';

export const AuthCarousel = () => {
  const plugin = useRef(Autoplay({ delay: 2000, stopOnInteraction: true }));
  // const carouselRef = useRef<HTT>()
  // const [carouselRef] = useEmblaCarousel(
  //   {
  //     // axis: orientation === "horizontal" ? "x" : "y",
  //   },
  //   plugin.current
  // );
  // console.log(plugin.current., '==> plugin');

  return (
    <Carousel
      plugins={[plugin.current]}
      // className="w-full max-w-xs"
      className="flex h-full place-items-center"
      onMouseEnter={plugin.current.stop}
      onMouseLeave={plugin.current.reset}
      // ref={carouselRef}
    >
      <CarouselContent>
        {authSliderData.map((item, index) => (
          <CarouselItem key={index}>
            <div className="p-1 flex flex-col items-center space-y-5 justify-center ">
              <img src={item.imageUrl} className="w-[473px] h-[351px]" />
              <div className="space-y-1 grid place-items-center">
                <Text
                  textColor="text-neutral-light"
                  fontSize="text-3xl"
                  fontWeight="font-medium"
                  className="text-center"
                >
                  {item.title}
                </Text>
                {/* <Dots
                  length={authSliderData.length}
                  activeIndex={1}
                  setActiveIndex={(index: number) => index}
                /> */}
                <div className="w-3/4 self-center">
                  <Text
                    fontSize="text-lg"
                    textColor="text-neutral-light"
                    fontWeight="font-medium"
                    className=" text-center"
                  >
                    {item.desc}
                  </Text>
                </div>
              </div>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      {/* <CarouselPrevious /> */}
      {/* <Dots length={5} activeIndex={plugin.current.name} /> */}
      {/* <CarouselNext /> */}
    </Carousel>
  );
};
