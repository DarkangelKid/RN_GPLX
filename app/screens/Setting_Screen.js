/* eslint-disable react-native/no-inline-styles */
import React, {useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {StyleSheet, ScrollView, View, TouchableOpacity, Text, StatusBar, Platform} from 'react-native';
import {Header} from 'react-native-elements';
import {useNavigation} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome5Pro';
import license from '../data/license.json';

const Setting_Screen = () => {
  const navigation = useNavigation();
  const check_license = useSelector((state) => state.global.check_license);

  let textBangLai = 'Bằng ';
  if (check_license > -1) {
    textBangLai += license[check_license].text;
  }

  useEffect(() => {
    StatusBar.setBarStyle('light-content');

    if (Platform.OS === 'android') {
      StatusBar.setBackgroundColor('transparent');
      StatusBar.setTranslucent(true);
    }

    return () => {};
  }, []);

  return (
    <View>
      <Header
        placement="left"
        statusBarProps={{barStyle: 'light-content'}}
        barStyle="light-content"
        centerComponent={{
          text: 'Cài đặt',
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
      <ScrollView showsVerticalScrollIndicator={false}>
        <TouchableOpacity style={styles.item} activeOpacity={0.6} onPress={() => navigation.navigate('LuaChonBangLai_Screen')}>
          <View style={{flex: 1, flexDirection: 'row', alignItems: 'center'}}>
            <View style={{marginHorizontal: 15}}>
              <Icon name="cogs" size={24} color="#FFAB00" />
            </View>
            <View>
              <Text style={styles.text_title}>Lựa chọn bằng lái</Text>
              <Text
                style={{
                  fontWeight: 'bold',
                  fontSize: 13,
                  marginLeft: 0,
                  color: '#52575D',
                  marginVertical: 5,
                }}>
                {textBangLai}
              </Text>
            </View>
          </View>
          <Icon name="chevron-right" size={16} color="#52575D" style={{marginEnd: 10}} />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.item}
          activeOpacity={0.6}
          onPress={() => navigation.navigate('SETTING_TrungTamTroGiup_Screen')}>
          <View style={{flex: 1, flexDirection: 'row', alignItems: 'center'}}>
            <View style={{marginHorizontal: 15}}>
              <Icon name="sync-alt" size={24} color="#512da8" />
            </View>
            <Text style={styles.text_title}>Làm mới điểm thi</Text>
          </View>
          <Icon name="chevron-right" size={16} color="#52575D" style={{marginEnd: 10}} />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.item}
          activeOpacity={0.6}
          onPress={() => navigation.navigate('SETTING_ThongTinUngDung_Screen')}>
          <View style={{flex: 1, flexDirection: 'row', alignItems: 'center'}}>
            <View style={{marginHorizontal: 15}}>
              <Icon name="envelope" size={24} color="#707864" />
            </View>
            <Text style={styles.text_title}>Gửi mail đến nhà phát triển</Text>
          </View>
          <Icon name="chevron-right" size={16} color="#52575D" style={{marginEnd: 10}} />
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

export default Setting_Screen;

const styles = StyleSheet.create({
  text: {
    color: '#52575D',
  },
  item: {
    height: 60,
    marginVertical: 2,
    backgroundColor: 'white',
    borderRadius: 5,
    alignItems: 'center',
    flexDirection: 'row',
  },
  text_title: {
    fontWeight: '600',
    fontSize: 15,
    color: '#363747',
  },
});
