/* eslint-disable react-native/no-inline-styles */
import React, {useEffect} from 'react';
import {useSelector} from 'react-redux';

import {
  StyleSheet,
  ScrollView,
  View,
  TouchableOpacity,
  Text,
  StatusBar,
  Platform,
  Pressable,
  Alert,
  BackHandler,
} from 'react-native';
import {Header} from 'react-native-elements';
import {useNavigation} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome5Pro';

import license from '../data/license.json';
import Banner from '../components/Banner';

const Home_Screen = () => {
  const navigation = useNavigation();

  const check_license = useSelector((state) => state.global.check_license);

  let textBangLai = '';
  if (check_license > -1) {
    textBangLai = license[check_license].text;
  }

  useEffect(() => {
    StatusBar.setBarStyle('light-content');

    if (Platform.OS === 'android') {
      StatusBar.setBackgroundColor('transparent');
      StatusBar.setTranslucent(true);
    }
    return () => {};
  }, []);

  useEffect(() => {
    const backAction = () => {
      Alert.alert('Thoát ứng dụng!', 'Bạn có muốn thoát ứng dụng?', [
        {
          text: 'Không',
          onPress: () => null,
          style: 'cancel',
        },
        {text: 'Có', onPress: () => BackHandler.exitApp()},
      ]);
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );

    return () => backHandler.remove();
  }, []);

  return (
    <View style={{flex: 1}}>
      <Header
        placement="left"
        statusBarProps={{barStyle: 'light-content'}}
        barStyle="light-content"
        centerComponent={{
          text: 'Ôn thi hạng ' + textBangLai,
          style: {color: '#fff', fontSize: 20, fontWeight: 'bold'},
        }}
        containerStyle={{
          backgroundColor: '#3f51b5',
          justifyContent: 'space-around',
        }}
        centerContainerStyle={{}}
        rightComponent={
          <TouchableOpacity
            onPress={() => navigation.navigate('Setting_Screen')}>
            <Icon
              size={20}
              name="cog"
              color="white"
              underlayColor="#00000000"
              containerStyle={{}}
            />
          </TouchableOpacity>
        }
      />
      <ScrollView>
        <View style={{flexDirection: 'row'}}>
          <Pressable
            android_ripple={{
              color: 'white',
            }}
            style={({pressed}) => [
              {
                backgroundColor: pressed ? '#81c784' : '#FF9331',
              },
              styles.containerMenu,
            ]}
            onPress={() => navigation.navigate('ChiTiet_DeThi_Random_Screen')}>
            <Icon
              size={42}
              name="random"
              color="white"
              underlayColor="#00000000"
              style={styles.icon}
            />
            <Text style={styles.text}>Đề ngẫu nhiên</Text>
          </Pressable>
          <Pressable
            android_ripple={{
              color: 'white',
            }}
            style={({pressed}) => [
              {
                backgroundColor: pressed ? '#81c784' : '#FF0038',
              },
              styles.containerMenu,
            ]}
            onPress={() => navigation.navigate('DanhSachDeThi_Screen')}>
            <Icon
              size={42}
              name="tasks"
              color="white"
              underlayColor="#00000000"
              style={styles.icon}
            />
            <Text style={styles.text}>Thi theo bộ đề</Text>
          </Pressable>
        </View>
        <View style={{flexDirection: 'row'}}>
          <Pressable
            android_ripple={{
              color: 'white',
            }}
            style={({pressed}) => [
              {
                backgroundColor: pressed ? '#81c784' : '#7FBE4F',
              },
              styles.containerMenu,
            ]}
            onPress={() => navigation.navigate('TopCauSai_Screen')}>
            <Icon
              size={42}
              name="times-octagon"
              color="white"
              underlayColor="#00000000"
              style={styles.icon}
            />
            <Text style={styles.text}>Xem câu bị sai</Text>
          </Pressable>
          <Pressable
            android_ripple={{
              color: 'white',
            }}
            style={({pressed}) => [
              {
                backgroundColor: pressed ? '#81c784' : '#29B6B6',
              },
              styles.containerMenu,
            ]}
            onPress={() => navigation.navigate('OnTapCauHoi_Screen')}>
            <Icon
              size={42}
              name="books"
              color="white"
              underlayColor="#00000000"
              style={styles.icon}
            />
            <Text style={styles.text}>Ôn tập câu hỏi</Text>
          </Pressable>
        </View>
        <View style={{flexDirection: 'row'}}>
          <Pressable
            android_ripple={{
              color: 'white',
            }}
            style={({pressed}) => [
              {
                backgroundColor: pressed ? '#81c784' : '#2B80CA',
              },
              styles.containerMenu,
            ]}
            onPress={() => navigation.navigate('BienBao_Screen')}>
            <Icon
              size={42}
              name="traffic-light-stop"
              color="white"
              underlayColor="#00000000"
              style={styles.icon}
            />
            <Text style={styles.text}>Các biển báo</Text>
          </Pressable>
          <Pressable
            android_ripple={{
              color: 'white',
            }}
            style={({pressed}) => [
              {
                backgroundColor: pressed ? '#81c784' : '#C75FD7',
              },
              styles.containerMenu,
            ]}
            onPress={() => navigation.navigate('OnDiemLiet_ChiTiet_Screen')}>
            <Icon
              size={42}
              name="exclamation-triangle"
              color="white"
              underlayColor="#00000000"
              style={styles.icon}
            />
            <Text style={styles.text}>Câu điểm liệt</Text>
          </Pressable>
        </View>
        <View style={{flexDirection: 'row'}}>
          <Pressable
            android_ripple={{
              color: 'white',
            }}
            style={({pressed}) => [
              {
                backgroundColor: pressed ? '#81c784' : '#6E4A40',
              },
              styles.containerMenu,
            ]}
            onPress={() => navigation.navigate('SaHinh_Screen')}>
            <Icon
              size={42}
              name="steering-wheel"
              color="white"
              underlayColor="#00000000"
              style={styles.icon}
            />
            <Text style={styles.text}>Bài thi sa hình</Text>
          </Pressable>
          <Pressable
            android_ripple={{
              color: 'white',
            }}
            style={({pressed}) => [
              {
                backgroundColor: pressed ? '#81c784' : '#55737F',
              },
              styles.containerMenu,
            ]}
            onPress={() => navigation.navigate('MeoThi_Screen')}>
            <Icon
              size={42}
              name="check-double"
              color="white"
              underlayColor="#00000000"
              style={styles.icon}
            />
            <Text style={styles.text}>Mẹo thi</Text>
          </Pressable>
        </View>
      </ScrollView>

      <Banner />
    </View>
  );
};

export default Home_Screen;

const styles = StyleSheet.create({
  text: {
    color: 'white',
    fontSize: 18,
    marginVertical: 10,
  },
  containerMenu: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    margin: 5,
  },
  icon: {margin: 30},
});
