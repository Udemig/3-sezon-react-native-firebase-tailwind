import {
  View,
  SafeAreaView,
  Text,
  TouchableOpacity,
  Image,
  TextInput,
} from 'react-native';
import React, {useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import auth from '@react-native-firebase/auth';
import {showMessage} from 'react-native-flash-message';

export default function LoginScreen() {
  const navigation = useNavigation();

  const [form, setForm] = useState({
    username: 'furkan.turkyilmaz@gmail.com',
    password: 'Furkanturkyilmaz!.',
  });

  const onchangeText = (key, value) => {
    setForm(prevState => ({
      ...prevState,
      [key]: value,
    }));
  };

  const login = () => {
    auth()
      .signInWithEmailAndPassword(form.username, form.password)
      .then(value => {
        console.log('Value', value);
        showMessage({
          type: 'success',
          message: `${value?.user.email} Welcome!`,
        });
      })
      .catch(error => {
        console.log('Error', error);
        let message = '';

        if (error.code === 'auth/wrong-password') {
          message =
            'The password is invalid or the user does not have a password.';
        }

        showMessage({
          type: 'danger',
          message,
        });
      });
  };

  return (
    <View className="flex-1 bg-sky-500">
      <SafeAreaView className="flex">
        <View className="flex-row justify-start">
          <TouchableOpacity
            className="bg-yellow-400 p-2 rounded-tr-2xl rounded-bl-2xl ml-4"
            activeOpacity={0.8}>
            <Image
              source={{
                uri: 'https://cdn.iconscout.com/icon/free/png-256/free-back-arrow-1-457733.png',
              }}
              style={{width: 20, height: 20}}
            />
          </TouchableOpacity>
        </View>
        <View className="flex-row justify-center">
          <Image
            source={require('../assets/images/login.png')}
            style={{width: 200, height: 200}}
          />
        </View>
      </SafeAreaView>
      <View className="flex-1 bg-white px-8 pt-8 rounded-tr-3xl rounded-tl-3xl">
        <View style={{gap: 10}}>
          <Text className="text-gray-700 ml-4">Email</Text>

          <TextInput
            className="p-4 bg-gray-100 text-gray-700 rounded-2xl"
            value={form.username}
            onchangeText={text => onchangeText('username', text)}
          />

          <Text className="text-gray-700 ml-4">Password</Text>

          <TextInput
            className="p-4 bg-gray-100 text-gray-700 rounded-2xl"
            value={form.password}
            onchangeText={text => onchangeText('password', text)}
            secureTextEntry
          />

          <TouchableOpacity className="flex items-end">
            <Text className="text-gray-700 mb-5">Forgot Password?</Text>
          </TouchableOpacity>
          <TouchableOpacity
            className="py-3 bg-yellow-400 rounded-xl"
            onPress={login}>
            <Text className="text-center text-xl font-bold text-gray-700">
              Login
            </Text>
          </TouchableOpacity>
        </View>
        <Text className="text-xl text-gray-700 font-bold text-center mt-7">
          OR
        </Text>

        <View className="flex-row justify-center mt-7">
          <Text className="text-gray-500 font-semibold">
            Don't have an account ?
          </Text>
          <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
            <Text className="font-semibold text-yellow-500"> Sign Up</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
