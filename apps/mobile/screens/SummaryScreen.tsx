import type { RootStackScreenProps } from '../types/navigation-types';
import { View } from 'react-native';
import { useEffect, useState } from 'react';
import { RobotoBoldText, RobotoMediumText, RobotoRegularText } from '../components/StyledText';
import { TouchableRipple, ActivityIndicator, MD3DarkTheme } from 'react-native-paper';
import {
  TRDLBContract,
  TRDLBTokenMetadataExtra,
  TRDLBJsonTokenMetadata,
  TRDLBNftTokenMetadataEditOptions,
} from 'treadle-mockup-server';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import ConfettiCannon from 'react-native-confetti-cannon';
import { useAccountStore } from '../store/useAccountStore';
import { useCounterStore } from '../store/counterStore';

export default function SummaryScreen({ navigation, route }: RootStackScreenProps<'Summary'>) {
  const { time, earned, distance, durability, bike } = route.params;

  const [isReady, setIsReady] = useState(false);

  const { masterAccount } = useAccountStore();
  const { increment } = useCounterStore();

  const editMeta = async () => {
    if (masterAccount) {
      const contract = new TRDLBContract(masterAccount, 'dev-1668823343153-42376084286451');

      const fetchedExtra = JSON.parse(bike.metadata.extra as string);

      const extra: TRDLBTokenMetadataExtra = {
        durability,
        ware: fetchedExtra.ware,
        efficiency: fetchedExtra.efficiency,
        comfort: fetchedExtra.comfort,
      };

      const metadata: TRDLBJsonTokenMetadata = {
        title: bike.metadata.title,
        description: bike.metadata.description,
        media: bike.metadata.media,
        extra: JSON.stringify(extra),
      };

      const nftTokenMetadataEditOptions: TRDLBNftTokenMetadataEditOptions = {
        token_id: bike.token_id,
        metadata,
      };

      await contract.nft_token_metadata_edit(nftTokenMetadataEditOptions);
      increment();
      setIsReady(true);
    }
  };

  useEffect(() => {
    editMeta();
  }, []);

  return (
    <View className='flex-1 bg-md3-surface h-full items-center justify-center'>
      {isReady ? (
        <>
          <ConfettiCannon count={200} origin={{ x: -10, y: 0 }} fadeOut />
          <View className='flex-1 justify-end items-center'>
            <RobotoBoldText className='text-md3-on-bg text-[40px] tracking-[0.5px]'>
              Congratulations!
            </RobotoBoldText>
          </View>
          <View className='flex-1 justify-center items-center'>
            <View className='w-full flex-row justify-evenly'>
              <View className='flex-col items-center justify-between h-14'>
                <MaterialCommunityIcons name='timer-outline' size={32} color='white' />
                <RobotoRegularText className='text-md3-on-bg text-[22px] tracking-[0.5px]'>
                  {`${Math.floor(time / 60) % 60}`.padStart(2, '0') +
                    ':' +
                    `${time % 60}`.padStart(2, '0')}
                </RobotoRegularText>
                <RobotoRegularText className='text-md3-on-bg text-[16px] tracking-[0.5px]'>
                  min
                </RobotoRegularText>
              </View>
              <View className='flex-col items-center justify-between h-14'>
                <MaterialCommunityIcons name='hand-coin' size={32} color='white' />
                <RobotoRegularText className='text-md3-on-bg text-[22px] tracking-[0.5px]'>
                  {earned}
                </RobotoRegularText>
                <RobotoRegularText className='text-md3-on-bg text-[16px] tracking-[0.5px]'>
                  earned
                </RobotoRegularText>
              </View>
              <View className='flex-col items-center justify-between h-14'>
                <MaterialCommunityIcons name='bike' size={32} color='white' />
                <RobotoRegularText className='text-md3-on-bg text-[22px] tracking-[0.5px]'>
                  {`${Math.floor(distance / 1000)}`.padStart(2, '0') +
                    '.' +
                    `${Math.floor(distance / 10) % 100}`.padStart(2, '0')}
                </RobotoRegularText>
                <RobotoRegularText className='text-md3-on-bg text-[16px] tracking-[0.5px]'>
                  km
                </RobotoRegularText>
              </View>
            </View>
          </View>
          <View className='flex-1 justify-center items-center'>
            <View
              className='w-24 h-24 mx-auto mb-16 rounded-full overflow-hidden items-center justify-center bg-md3-primary'>
              <TouchableRipple
                borderless
                className='w-full h-full items-center justify-center'
                onPress={() => navigation.navigate('Home')}>
                <RobotoMediumText className='text-md3-on-primary text-[17px]'>End</RobotoMediumText>
              </TouchableRipple>
            </View>
          </View>
        </>
      ) : (
        <ActivityIndicator animating color={MD3DarkTheme.colors.onSurface} size='large' />
      )}
    </View>
  );
}
