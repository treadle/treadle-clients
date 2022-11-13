import { Image, View } from 'react-native';
import { Button } from 'react-native-paper';
import { RobotoMediumText, RobotoRegularText } from './StyledText';
// import { useMockupServerStore } from '../store/mockupServerStore';
// import { useAccountStore } from '../store/accountStore';
// import { useCounterStore } from '../store/counterStore';

const imgUrl = 'https://ipfs.io/ipfs/QmQqzMTavQgT4f4T5v6PWBp7XNKtoPmC9jvn12WPT3gkSE';

const MarketPlaceCard = () => {
  // const { mockupServer } = useMockupServerStore();
  // const { account } = useAccountStore();
  // const { increment } = useCounterStore();

  // const mintBike = async () => {
  //   if (mockupServer && account) {
  //     await mockupServer.mintBike(account.accountId);
  //     increment();
  //   }
  // };

  return (
    <View className='bg-md3-surface rounded-[12px] overflow-hidden border border-md3-outline-variant'>
      <Image source={{ uri: imgUrl }} className='w-full h-[188px]' />
      <View className='p-4'>
        <View className='flex-row mb-[32px]'>
          <RobotoRegularText className='text-md3-on-bg text-[16px] tracking-[0.5px]'>
            Title
          </RobotoRegularText>
        </View>
        <View className='flex-row mb-[32px]'>
          <RobotoRegularText className='text-md3-on-surface-variant text-[14px] tracking-[0.25px]'>
            Description
          </RobotoRegularText>
        </View>
        <View className='flex-row mb-[32px]'>
          <RobotoRegularText className='text-md3-on-surface-variant text-[14px] tracking-[0.25px]'>
            Characteristics
          </RobotoRegularText>
        </View>
        <View className='flex-row'>
          <Button onPress={() => null} mode='contained' className='w-full'>
            <RobotoMediumText className='text-md3-on-primary text-[14px] tracking-[0.1px]'>
              Buy
            </RobotoMediumText>
          </Button>
        </View>
      </View>
    </View>
  );
};

export default MarketPlaceCard;
