import {
  View,
  Text,
  Image,
  SafeAreaView,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import React, {useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import auth from '@react-native-firebase/auth';
import {showMessage} from 'react-native-flash-message';

export default function RegisterScreen() {
  const navigation = useNavigation();

  const [form, setForm] = useState({
    username: '',
    password: '',
  });

  const onchangeText = (key, value) => {
    setForm(prevState => ({
      ...prevState,
      [key]: value,
    }));
  };

  const signUp = () => {
    auth()
      .createUserWithEmailAndPassword(form.username, form.password)
      .then(() => {
        showMessage({
          type: 'success',
          message: 'Success created User!',
        });
      })
      .catch(error => {
        let message = '';

        if (error.code === 'auth/email-already-in-use') {
          message = 'The email address is already in use by another account';
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
        <View className="flex-row">
          <TouchableOpacity
            onPress={() => navigation.goBack()}
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
            source={require('../assets/images/signup.png')}
            style={{width: 165, height: 110}}
          />
        </View>
      </SafeAreaView>
      <View className="flex-1 bg-white px-8 pt-8 rounded-tr-3xl rounded-tl-3xl">
        <View className="form space-y-2">
          {/* <Text>Full Name</Text>
          <TextInput
            className="p-4 bg-gray-100 text-gray-700 rounded-2xl mb-3"
            placeholder="Enter Name"
          /> */}

          <Text>Email</Text>
          <TextInput
            className="p-4 bg-gray-100 text-gray-700 rounded-2xl mb-3"
            placeholder="Enter Email"
            onchangeText={text => onchangeText('email', text)}
            value={form.username}
          />

          <Text>Password</Text>
          <TextInput
            className="p-4 bg-gray-100 text-gray-700 rounded-2xl mb-3"
            secureTextEntry
            placeholder="Enter Password"
            onchangeText={text => onchangeText('password', text)}
            value={form.password}
          />
          <TouchableOpacity
            className="py-3 bg-yellow-400 rounded-xl"
            onPress={signUp}>
            <Text className="text-center text-xl font-bold text-gray-700">
              Sign Up
            </Text>
          </TouchableOpacity>
        </View>
        <Text className="text-xl text-gray-700 font-bold text-center mt-7">
          OR
        </Text>

        <View className="flex-row justify-center mt-7">
          <Text className="text-gray-500 font-semibold">
            Already have an account?
          </Text>
          <TouchableOpacity onPress={() => navigation.navigate('Login')}>
            <Text className="font-semibold text-yellow-500"> Login</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
