import type { FC } from 'react';
import { memo, useEffect, useState } from 'react';
import { View } from 'react-native';
import { RobotoBoldText, RobotoMediumText, RobotoRegularText } from './StyledText';
import { useEnergyTokensStore } from '../store/useEnergyTokensStore';
import { useAccountStore } from '../store/useAccountStore';
import { Divider } from 'react-native-paper';

const Balances: FC<any> = () => {
  const { tokens } = useEnergyTokensStore();
  const { account } = useAccountStore();
  const [balance, setBalance] = useState<string | undefined>('');

  useEffect(() => {
    const getBalance = async () => {
      const accountBalance = await account?.getAccountBalance();
      setBalance(accountBalance?.available);
    };

    if (account) {
      getBalance();
    }
  }, [account]);

  return (
    <View className='flex-1 px-4 bg-md3-surface justify-between items-center'>
      <View className='flex-row justify-center items-center pt-32'>
        <RobotoBoldText className='text-md3-on-surface text-[42px]'>
          ${tokens * 1.11} USD
        </RobotoBoldText>
      </View>
      <View className='w-full p-2 rounded-[12px] border-md3-outline-variant border-2'>
        <View className='flex-row w-full justify-between items-center'>
          <View>
            <RobotoRegularText className='text-md3-on-surface text-[22px]'>SCRW</RobotoRegularText>
            <RobotoMediumText className='text-md3-on-surface-variant'>$1.11</RobotoMediumText>
          </View>
          <View>
            <RobotoRegularText className='text-md3-on-surface text-right text-[22px]'>{tokens}</RobotoRegularText>
            <RobotoMediumText className='text-md3-on-surface-variant'>≈ ${tokens * 1.11} USD</RobotoMediumText>
          </View>
        </View>
        <Divider bold className='w-full my-4' />
        <View className='flex-row w-full justify-between items-center'>
          <View>
            <RobotoRegularText className='text-md3-on-surface text-[22px]'>TRDL</RobotoRegularText>
            <RobotoMediumText className='text-md3-on-surface-variant'>$111.11</RobotoMediumText>
          </View>
          <View>
            <RobotoRegularText className='text-md3-on-surface text-right text-[22px]'>0</RobotoRegularText>
            <RobotoMediumText className='text-md3-on-surface-variant'>≈ ${0 * 111.11} USD</RobotoMediumText>
          </View>
        </View>
      </View>
    </View>
  );
};

export default memo(Balances);
