import type { FC } from 'react';
import type { TRDLBJsonToken } from 'treadle-mockup-server';
import { memo, useRef } from 'react';
import { useWindowDimensions, View } from 'react-native';
import Carousel, { ICarouselInstance } from 'react-native-reanimated-carousel';
import BikeCard from './BikeCard';
import { useBikeStore } from '../store/useBikeStore';

interface IGarageCarouselProps {
  bikes: TRDLBJsonToken[];
  loadMoreBikes: () => void;
  nftSupplyForOwner: number;
  isBikesLoading: boolean;
}

const GarageCarousel: FC<IGarageCarouselProps> = ({
                                                    bikes,
                                                    loadMoreBikes,
                                                    nftSupplyForOwner,
                                                    isBikesLoading,
                                                  }) => {
  const carouselRef = useRef<ICarouselInstance | null>(null);
  const { width } = useWindowDimensions();
  const { setSelectedBike } = useBikeStore();

  const handleBikeChange = (index: number) => {
    setSelectedBike(bikes[index]);
  };

  const handleScrollBegin = () => {
    if (
      carouselRef.current && carouselRef.current.getCurrentIndex() >= bikes.length - 2 &&
      bikes.length !== nftSupplyForOwner &&
      !isBikesLoading
    ) {
      loadMoreBikes();
    }
  };

  return (
    <View className='flex-1'>
      <Carousel
        defaultIndex={0}
        ref={carouselRef}
        width={width}
        data={bikes}
        mode='parallax'
        windowSize={3}
        loop={false}
        renderItem={({ item }) => <BikeCard bikeMetadata={item.metadata} />}
        onSnapToItem={handleBikeChange}
        onScrollBegin={handleScrollBegin}
      />
    </View>
  );
};

export default memo(GarageCarousel);