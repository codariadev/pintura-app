import { Pressable, Text, View, Animated } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import {
  faChartSimple,
  faPalette,
  faFolderOpen,
  faArrowLeft,
} from '@fortawesome/free-solid-svg-icons';
import { useNavigation } from '@react-navigation/native';
import { animateIn, animateOut, bounce, createScale } from 'components/utils/animations';
import { useRef } from 'react';

export default function PaintHome() {
  const scaleBuget = useRef(createScale()).current;
  const scaleOpenbuget = useRef(createScale()).current;
  const scaleStats = useRef(createScale()).current;
  const scaleBack = useRef(createScale()).current;

  const navigation = useNavigation();

  const back = () => {
    bounce(scaleBack);
    navigation.navigate('Home' as never);
  };

  const newBudget = () => {
    bounce(scaleBack);
    navigation.navigate('CreateBudget' as never);
  };
  const budget = () => {
    bounce(scaleBack);
    navigation.navigate('Budget' as never);
  };


  

  return (
    <View className="flex h-full w-full items-center justify-start bg-white pt-[25%]">
      <View className="absolute left-0 top-0 pl-5 pt-12">
        <Animated.View
          style={{ transform: [{ scale: scaleBack }], width: '100%' }}
          className={'flex items-center justify-center rounded-xl border-[0.5px] p-5'}>
          <Pressable
            className="flex flex-row items-center justify-start gap-5 bg-white"
            onPressIn={() => animateIn(scaleBack)}
            onPressOut={back}>
            <FontAwesomeIcon icon={faArrowLeft} size={20} color="#2C2C2C" />
          </Pressable>
        </Animated.View>
      </View>

      <View className="flex h-[260px] w-full gap-2 px-16">
        <FontAwesomeIcon icon={faPalette} size={100} color="#10B981" />
        <Text className="pt-5 font-title text-title">Pintura</Text>
        <Text className="pt-5 font-title text-text-primary">Orçamentos</Text>
        <Text>Ultimo orçamento: 02/02/2025</Text>
      </View>

      <View className="flex h-[75px] w-full items-center justify-center">
        <Animated.View
          style={{ transform: [{ scale: scaleBuget }], width: '100%' }}
          className={'flex items-center justify-center'}>
          <Pressable
            className="flex h-[50px] w-[320px] items-center justify-center rounded-[8px] border-[1px] border-[#2C2C2C] bg-[#8B5CF6]"
            onPressIn={() => animateOut(scaleBuget)}
            onPressOut={newBudget}>
            <Text className="text-center font-body text-body text-white">+ Novo Orçamento</Text>
          </Pressable>
        </Animated.View>
      </View>

      <View className="flex h-[75px] w-full items-center justify-center">
        <Animated.View
          style={{ transform: [{ scale: scaleOpenbuget }], width: '100%' }}
          className={'flex items-center justify-center'}>
          <Pressable
            className="flex h-[50px] w-[320px] flex-row items-center justify-start gap-5 bg-white"
            onPressIn={() => animateIn(scaleOpenbuget)}
            onPressOut={budget}>
            <FontAwesomeIcon icon={faFolderOpen} size={20} color="#2C2C2C" />
            <Text className="text-center font-body text-body text-black">
              Ver Todos os orçamentos
            </Text>
          </Pressable>
        </Animated.View>
      </View>

      <View className="flex h-[75px] w-full items-center justify-center">
        <Animated.View
          style={{ transform: [{ scale: scaleStats }], width: '100%' }}
          className={'flex items-center justify-center'}>
          <Pressable
            className="flex h-[50px] w-[320px] flex-row items-center justify-start gap-5 bg-white"
            onPressIn={() => animateIn(scaleStats)}
            onPressOut={() => animateOut(scaleStats)}>
            <FontAwesomeIcon icon={faChartSimple} size={20} color="#2C2C2C" />
            <Text className="text-center font-body text-body text-black">Estatísticas</Text>
          </Pressable>
        </Animated.View>
      </View>
    </View>
  );
}
