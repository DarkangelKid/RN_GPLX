/* eslint-disable react-native/no-inline-styles */
import React, {useEffect} from 'react';
import {View, StatusBar, Platform} from 'react-native';
import {Header} from 'react-native-elements';
import {useNavigation} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome5Pro';
import {WebView} from 'react-native-webview';

import sahinh from '../data/sahinh_lythuyet';
import Banner from '../components/Banner';

const Setting_Screen = () => {
  const navigation = useNavigation();

  useEffect(() => {
    StatusBar.setBarStyle('light-content');

    if (Platform.OS === 'android') {
      StatusBar.setBackgroundColor('transparent');
      StatusBar.setTranslucent(true);
    }

    return () => {};
  }, []);

  return (
    <View style={{flex: 1}}>
      <Header
        placement="left"
        statusBarProps={{barStyle: 'light-content'}}
        barStyle="light-content"
        centerComponent={{
          text: 'Bài thi sa hình',
          style: {color: '#fff', fontSize: 20, fontWeight: 'bold'},
        }}
        containerStyle={{
          backgroundColor: '#3f51b5',
          justifyContent: 'space-around',
        }}
        centerContainerStyle={{}}
        leftComponent={
          <Icon
            onPress={() => navigation.goBack()}
            name="long-arrow-left"
            color="white"
            underlayColor="#00000000"
            size={22}
            style={{padding: 10}}
          />
        }
      />
      <View style={{flex: 1}}>
        <WebView originWhitelist={['*']} source={{html: sahinh}} />
      </View>
      <Banner />
    </View>
  );
};

export default Setting_Screen;
