import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  Image,
  TouchableOpacity,
  TextInput,
  Alert,
  FlatList,
  ScrollView,
} from 'react-native';
import auth from '@react-native-firebase/auth';
import database from '@react-native-firebase/database';

export default function DashboardScreen() {
  const [currentUser, setCurrentUser] = useState(null);

  const [topFiveSales, setTopFiveSales] = useState(null);

  const [usersList, setUserList] = useState([]);

  const logOut = async () => {
    await auth().signOut();
  };

  const [form, setForm] = useState({
    displayName: '',
    photoURL: '',
  });

  const onchangeText = (key, value) => {
    setForm(prevState => ({
      ...prevState,
      [key]: value,
    }));
  };

  const updateProfile = async () => {
    await auth().currentUser?.updateProfile({
      displayName: form.displayName,
      photoURL: form.photoURL,
    });
  };

  const onAuthStateChanged = userInfo => {
    setCurrentUser(userInfo);
  };

  const dbCheck = () => {
    const referencer = database().ref('users');

    referencer.once('value').then(snapshot => {
      console.log('first', snapshot.val());
      Alert.alert('Snapshot', snapshot.val());
    });

    dbSet();
  };

  const dbSet = () => {
    database()
      .ref('users')
      .set([
        {
          id: 6383,
          uid: 'e921c578-c7dc-4742-a60e-c3e35a94a14c',
          password: 'O1P9SVNXMF',
          first_name: 'Ilona',
          last_name: 'Simonis',
          username: 'ilona.simonis',
          email: 'ilona.simonis@email.com',
          avatar:
            'https://robohash.org/aperiamestexpedita.png?size=300x300&set=set1',
          gender: 'Genderqueer',
          phone_number: '+678 1-940-848-2412 x389',
          social_insurance_number: '770415917',
          date_of_birth: '1965-04-21',
          employment: {
            title: 'Consulting Supervisor',
            key_skill: 'Technical savvy',
          },
          address: {
            city: 'West Yessenia',
            street_name: 'Hansen Points',
            street_address: '507 Nader Rest',
            zip_code: '86028',
            state: 'Hawaii',
            country: 'United States',
            coordinates: {
              lat: -22.627816027642808,
              lng: -36.54390982673718,
            },
          },
          credit_card: {
            cc_number: '4950-9702-6368-1856',
          },
          subscription: {
            plan: 'Basic',
            status: 'Pending',
            payment_method: 'Paypal',
            term: 'Full subscription',
          },
        },
        {
          id: 7670,
          uid: '1ac83f2b-182c-45ce-82d3-1907c2e03f4a',
          password: 'vGo7C9LQal',
          first_name: 'Sandie',
          last_name: 'Koss',
          username: 'sandie.koss',
          email: 'sandie.koss@email.com',
          avatar:
            'https://robohash.org/fugaeareprehenderit.png?size=300x300&set=set1',
          gender: 'Bigender',
          phone_number: '+249 (756) 665-7748 x102',
          social_insurance_number: '759639958',
          date_of_birth: '1964-10-17',
          employment: {
            title: 'Senior Strategist',
            key_skill: 'Leadership',
          },
          address: {
            city: 'New Efrainport',
            street_name: 'Rodrigo Crossroad',
            street_address: '8495 Garth Islands',
            zip_code: '22239',
            state: 'Indiana',
            country: 'United States',
            coordinates: {
              lat: -65.59314513065308,
              lng: -12.781583392382316,
            },
          },
          credit_card: {
            cc_number: '4453-0557-5458-7606',
          },
          subscription: {
            plan: 'Premium',
            status: 'Blocked',
            payment_method: 'Google Pay',
            term: 'Annual',
          },
        },
      ])
      .then(() => console.log('REf created!'));
  };

  useEffect(() => {
    showTopFiveSales();
    database()
      .ref('/users')
      .on('value', snapshot => {
        console.log('User data: ', snapshot.val());

        setUserList(snapshot.val());
      });
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber;
  }, []);

  const showTopFiveSales = async () => {
    const result = await database().ref('users').limitToLast(3).once('value');

    setTopFiveSales(result.val());
    console.log('Result', result);
  };

  const updateUsers = async () => {
    try {
      await database()
        .ref('users/5')
        .update({
          id: 6195,
          uid: '8fa94b0b-5737-41e0-8e84-437a77d03f66',
          password: 'HArZ0QgKOB',
          first_name: 'Furkan',
          last_name: 'Türkyılmaz',
          username: 'albertina.davis',
          email: 'albertina.davis@email.com',
          avatar:
            'https://robohash.org/culpaquioccaecati.png?size=300x300\u0026set=set1',
          gender: 'Male',
          phone_number: '+1-264 134.391.9238 x09485',
          social_insurance_number: '158282228',
          date_of_birth: '1978-05-17',
          employment: {
            title: 'Direct Advertising Orchestrator',
            key_skill: 'Leadership',
          },
          address: {
            city: 'Torphyton',
            street_name: 'Kautzer Lock',
            street_address: '54388 Wiza Shoal',
            zip_code: '59231-7355',
            state: 'California',
            country: 'United States',
            coordinates: {lat: -57.98728273156952, lng: -60.847341676466854},
          },
          credit_card: {cc_number: '5596-2450-4998-9536'},
          subscription: {
            plan: 'Diamond',
            status: 'Blocked',
            payment_method: 'Apple Pay',
            term: 'Payment in advance',
          },
        });
    } catch (error) {
      console.log('Error', error);
    } finally {
      console.log('Success Updated');
    }
  };

  const removeUsers = async () => {
    try {
      await database().ref('users/4').remove();
    } catch (error) {
    } finally {
      console.log('Removed users');
    }
  };

  console.log('State', currentUser?.user);

  return (
    <SafeAreaView className="flex-1 bg-sky-500 justify-center">
      <View className=" mt-4">
        <Text className="text-yellow-400 font-bold text-4xl text-center">
          Welcome {currentUser?.displayName}
        </Text>
      </View>
      <View className=" mt-4">
        <ScrollView>
          {usersList?.map(user => (
            <Text className="text-gray-700 ml-4">{user.username}</Text>
          ))}
        </ScrollView>

        <FlatList
          data={topFiveSales}
          renderItem={({item}) => (
            <View
              style={{
                height: 50,
                flex: 1,
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Text>User ID: {item.id}</Text>
              <Text>User Name: {item.name}</Text>
            </View>
          )}
        />
      </View>
      <View className="flex-row justify-center my-4">
        <Image
          source={{uri: currentUser?.photoURL}}
          style={{width: 300, height: 100}}
          resizeMode="contain"
        />
      </View>

      <View className="flex space-y-4 mx-6 my-4">
        <Text className="text-gray-700 ml-4">Field Name</Text>

        <TextInput
          className="p-4 bg-gray-100 text-gray-700 rounded-2xl"
          onChangeText={text => onchangeText('displayName', text)}
          value={form.displayName}
        />

        <Text className="text-gray-700 ml-4">Photo Url </Text>

        <TextInput
          className="p-4 bg-gray-100 text-gray-700 rounded-2xl"
          onChangeText={text => onchangeText('photoURL', text)}
          value={form.photoURL}
        />

        <TouchableOpacity
          className="py-3 bg-yellow-400 rounded-xl"
          onPress={() => updateProfile()}>
          <Text className="text-center text-xl font-bold text-gray-700">
            Update Profile
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          className="py-3 bg-purple-400 rounded-xl"
          onPress={() => dbCheck()}>
          <Text className="text-center text-xl font-bold text-gray-700">
            Db Check
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          className="py-3 bg-orange-400 rounded-xl"
          onPress={() => updateUsers()}>
          <Text className="text-center text-xl font-bold text-gray-700">
            Updated Users
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          className="py-3 bg-red-800 rounded-xl"
          onPress={() => removeUsers()}>
          <Text className="text-center text-xl font-bold text-white">
            Remove Users
          </Text>
        </TouchableOpacity>
      </View>
      <View className="flex space-y-4">
        <TouchableOpacity
          onPress={() => logOut()}
          className="py-3 bg-red-300 mx-7 rounded-xl">
          <Text className="text-xl font-bold text-center text-gray-700">
            Log Out
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
