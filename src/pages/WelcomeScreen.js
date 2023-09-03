import React from 'react';
import {View, Text, SafeAreaView, Image, TouchableOpacity} from 'react-native';
import {useNavigation} from '@react-navigation/native';

export default function WelcomeScreen() {
  const navigation = useNavigation(true);

  return (
    <SafeAreaView className="flex-1 bg-sky-500 justify-center">
      <View className=" mt-4">
        <Text className="text-yellow-400 font-bold text-4xl text-center">
          Welcome!
        </Text>
      </View>
      <View className="flex-row justify-center">
        <Image
          source={require('../assets/images/welcome.png')}
          style={{width: 350, height: 350}}
        />
      </View>
      <View className="flex space-y-4">
        <TouchableOpacity
          onPress={() => navigation.navigate('SignUp')}
          className="py-3 bg-yellow-400 mx-7 rounded-xl">
          <Text className="text-xl font-bold text-center text-gray-700">
            Sign Up
          </Text>
        </TouchableOpacity>
        <View className="flex-row justify-center">
          <Text className="text-white font-semibold">
            Already have an account?
          </Text>
          <TouchableOpacity onPress={() => navigation.navigate('Login')}>
            <Text className="font-semibold text-yellow-400"> Login</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}
