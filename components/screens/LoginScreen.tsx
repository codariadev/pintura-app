// import { useNavigation } from '@react-navigation/native';
// import { useRef, useState } from 'react';
// import { Text, View, TextInput, Pressable, Animated, Image } from 'react-native';
// import { createScale, animateIn, bounce } from '../utils/animations';
// // import { loginWithEmail } from '../../services/authService';
// import { useGoogleLogin } from '../../services/authService'; // Import do hook

// export default function LoginScreen() {
//   const scaleLogin = useRef(createScale()).current;
//   const scaleGoogle = useRef(createScale()).current;
//   const scale = useRef(createScale()).current;
//   const navigation = useNavigation();

//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');

//   const { promptAsync, request } = useGoogleLogin(); // Hook do Google

//   const handleLogin = async () => {
//     bounce(scale);
//     // try {
//     //   const result = await loginWithEmail(email, password);
//     //   console.log('Usuário logado:', result.user.email);
//     //   navigation.navigate('Home' as never);
//     // } catch (error: any) {
//     //   alert(error.message);
//     // }
//   };

//   const handleGoogleLogin = async () => {
//     if (request) {
//       const result = await promptAsync();
//       console.log('Tentando login com Google...');
//     } else {
//       alert('A solicitação do Google ainda não está pronta.');
//     }
//   };

//   return (
//     <View className="h-full w-full flex-1 items-center justify-center">
//       <View className="flex h-full w-[312px] items-center justify-center">
//         <View className="flex items-center justify-center rounded-[100%] border-[0.5px]">
//           <Image
//             source={{ uri: 'https://codariadev.vercel.app/assets/logo.png' }}
//             style={{ width: 120, height: 120, resizeMode: 'contain' }}
//           />
//         </View>
//         <Text className="pt-[45px] font-title text-title">Entre com a sua conta</Text>

//         <View className="flex h-[280px] w-[312px] justify-end gap-[9px]">
//           <Text className="w-full text-center font-body text-body">Email</Text>
//           <TextInput
//             className="h-[40px] w-full rounded-[10px] border-[0.5px] px-3 font-body text-body"
//             keyboardType="email-address"
//             value={email}
//             onChangeText={setEmail}
//           />
//           <Text className="w-full text-center font-body text-body">Senha</Text>
//           <TextInput
//             className="h-[40px] w-full rounded-[10px] border-[0.5px] px-3 font-body text-body"
//             secureTextEntry
//             value={password}
//             onChangeText={setPassword}
//           />
//         </View>

//         <View className="flex h-[280px] w-[312px] items-center justify-center gap-[9px]">
//           <Animated.View style={{ transform: [{ scale: scaleLogin }], width: '100%' }}>
//             <Pressable
//               className="flex h-[40px] w-full items-center justify-center rounded-[8px] bg-[#8B5CF6]"
//               onPressIn={() => animateIn(scaleLogin)}
//               onPressOut={handleLogin}>
//               <Text className="text-center font-body text-body text-white">Acessar</Text>
//             </Pressable>
//           </Animated.View>

//           <Text className="text-center font-body text-body">Ou</Text>

//           <Animated.View style={{ transform: [{ scale: scaleGoogle }], width: '100%' }}>
//             <Pressable
//               className="flex h-[40px] w-full items-center justify-center rounded-[8px] border-[0.5px]"
//               onPressIn={() => animateIn(scaleGoogle)}
//               onPressOut={handleGoogleLogin}
//             >
//               <Text className="text-center font-body text-body text-black">
//                 Entrar com conta Google
//               </Text>
//             </Pressable>
//           </Animated.View>
//         </View>
//       </View>
//     </View>
//   );
// }
