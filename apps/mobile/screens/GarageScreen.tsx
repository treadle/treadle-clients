import * as React from 'react';
import { useRef } from 'react';
import { Dimensions, Text, View, Image } from 'react-native';
import { gestureHandlerRootHOC, GestureHandlerRootView } from 'react-native-gesture-handler';
import { Button } from 'react-native-paper';
import Carousel, { ICarouselInstance } from 'react-native-reanimated-carousel';
import { RobotoRegularText } from '../components/StyledText';

export const bikes = [
  {
    id: 1,
    name: 'City Bike',
    durability: 100,
    efficiency: 2,
    comfort: 1,
    wear: 0,
    image:
      'https://thumbs.dreamstime.com/b/bicycle-basket-semi-flat-color-vector-object-full-sized-item-white-choosing-right-bike-vintage-look-cycle-isolated-modern-227406679.jpg',
  },
  {
    id: 2,
    name: 'Mountain Bike',
    durability: 100,
    efficiency: 5,
    comfort: 10,
    wear: 1,
    image:
      'https://c8.alamy.com/comp/2C46XA3/cruiser-bike-semi-flat-rgb-color-vector-illustration-2C46XA3.jpg',
  },
  {
    id: 3,
    name: 'Road Bike',
    durability: 100,
    efficiency: 6,
    comfort: 2,
    wear: 2,
    image:
      'https://www.creativefabrica.com/wp-content/uploads/2021/11/03/Mountain-Bike-Vector-Illustration-Graphics-19612988-1-580x387.jpg',
  },
];

const GarageScreen = () => {
  const PAGE_WIDTH = Dimensions.get('window').width;
  const r = useRef<ICarouselInstance | null>(null);

  return (
    <View className='bg-md3-surface flex-1'>
      <View className='w-full h-[300px]'>
        <Carousel
          defaultIndex={0}
          ref={r}
          width={PAGE_WIDTH}
          data={bikes}
          mode='parallax'
          windowSize={3}
          renderItem={({ item }) => (
            <View key={item.id} className='flex-1 justify-center items-center p-4 bg-md3-on-surface'>
              <RobotoRegularText className='text-[22px] leading-[28px]'>{item.name}</RobotoRegularText>
              <View className='flex flex-row items-center'>
                <RobotoRegularText className='text-[16px] px-[2px] leading-[20px]'>Durability</RobotoRegularText>
                <RobotoRegularText className='text-[16px] px-[2px] leading-[20px]'>{item.durability}</RobotoRegularText>
                <RobotoRegularText className='text-[16px] px-[2px] leading-[20px]'>Efficiency</RobotoRegularText>
                <RobotoRegularText className='text-[16px] px-[2px] leading-[20px]'>{item.efficiency}</RobotoRegularText>
                <RobotoRegularText className='text-[16px] px-[2px] leading-[20px]'>Comfort</RobotoRegularText>
                <RobotoRegularText className='text-[16px] px-[2px] leading-[20px]'>{item.comfort}</RobotoRegularText>
                <RobotoRegularText className='text-[16px] px-[2px] leading-[20px]'>Wear</RobotoRegularText>
                <RobotoRegularText className='text-[16px] px-[2px] leading-[20px]'>{item.wear}</RobotoRegularText>
              </View>
              <View className='items-center'>
                <View className='w-[200px] h-[200px]'>
                  <Image source={{ uri: item.image }} className='w-full h-full' />
                </View>
              </View>
            </View>
          )}
        />
      </View>
      <View
        style={{
          marginTop: 24,
          flexDirection: 'row',
          justifyContent: 'space-evenly',
        }}>
        <Button mode='contained' onPress={() => r.current?.prev()}>
          <Text>Prev</Text>
        </Button>
        <Button mode='contained' onPress={() => r.current?.next()}>
          <Text>Next</Text>
        </Button>
      </View>
    </View>
  );
};

export default gestureHandlerRootHOC(GarageScreen);
