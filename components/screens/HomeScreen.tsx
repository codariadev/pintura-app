import { animateIn, bounce, createScale } from 'components/utils/animations';
import { useRef } from 'react';
import { Pressable, Text, View, Animated } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import {faPalette} from '@fortawesome/free-solid-svg-icons';
import { useNavigation } from '@react-navigation/native';

export default function HomeScreen() {
  const scale = useRef(createScale()).current;
    const navigation = useNavigation();


    const newBuget = () => {
    bounce(scale);
    navigation.navigate('PaintHome' as never);
  };


  return (
    <View className="flex h-full w-full items-center justify-start pt-[25%]">
      <Text className='h-[10%] flex font-title text-title'>Modulos</Text>
      <Animated.View
        style={{ transform: [{ scale: scale }], width: '100%' }}
        className={'flex items-center justify-center'}>
        <Pressable
          className="flex h-[200px] w-[200px] items-center justify-evenly rounded-lg border-2 border-[#8B5CF6] "
          onPressIn={() => animateIn(scale)}
          onPressOut={newBuget}>
            <FontAwesomeIcon icon={faPalette} size={80} color='#10B981'/>
          <Text className="color-black">Pintura</Text>
        </Pressable>
      </Animated.View>
    </View>
  );
}
