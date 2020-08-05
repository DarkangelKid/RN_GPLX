/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useState} from 'react';

import {
  ScrollView,
  View,
  Text,
  StatusBar,
  Platform,
  BackHandler,
} from 'react-native';
import {Header} from 'react-native-elements';
import {useNavigation, useRoute} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome5Pro';

import license from '../data/license.json';
import realm from '../utils/realm';

const Home_Screen = () => {
  let Question = realm.objects('Question');
  let Exam = realm.objects('Exam');
  let ExamDetail = realm.objects('ExamDetail');

  const navigation = useNavigation();
  const route = useRoute();
  const {exam_id} = route.params;

  const [exam, setExam] = useState(null);

  useEffect(() => {
    const backAction = () => {
      navigation.navigate('Home_Screen');
      return true;
    };
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );

    return () => backHandler.remove();
  }, []);

  useEffect(() => {
    let examp_tmp = Exam.filtered('id = ' + exam_id)[0];
    setExam(examp_tmp);
    return () => {};
  }, [exam_id]);

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
          text: 'Kết quả bài thi',
          style: {color: '#fff', fontSize: 20, fontWeight: 'bold'},
        }}
        containerStyle={{
          backgroundColor: '#3f51b5',
          justifyContent: 'space-around',
        }}
        centerContainerStyle={{}}
        leftComponent={
          <Icon
            onPress={() => navigation.navigate('Home_Screen')}
            name="long-arrow-left"
            color="white"
            underlayColor="#00000000"
            size={22}
            style={{padding: 10}}
          />
        }
      />
      {exam && (
        <ScrollView>
          <View style={{padding: 10}}>
            <Text
              style={{
                textAlign: 'center',
                fontWeight: 'bold',
                color: 'red',
                fontSize: 20,
              }}>
              {exam.status === 0
                ? 'Chưa thi'
                : exam.status === 1
                ? 'KHÔNG ĐẠT! SAI CÂU ĐIỂM LIỆT'
                : exam.status === 2
                ? 'KHÔNG ĐẠT! SAI QUÁ SỐ CÂU CHO PHÉP'
                : 'ĐẠT!'}
            </Text>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-around',
                marginTop: 10,
              }}>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  borderWidth: 0.3,
                  borderColor: '#607d8b',
                  borderRadius: 10,
                  paddingHorizontal: 10,
                  paddingVertical: 5,
                }}>
                <Icon name={'sigma'} size={20} color="#607d8b" />
                <Text
                  style={{marginStart: 5, fontWeight: 'bold', fontSize: 18}}>
                  {exam.rights_count +
                    exam.no_answers_count +
                    exam.wrongs_count}
                </Text>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  borderWidth: 0.3,
                  borderColor: '#607d8b',
                  borderRadius: 10,
                  paddingHorizontal: 10,
                  paddingVertical: 5,
                }}>
                <Icon name={'check-circle'} size={20} color="#607d8b" />
                <Text
                  style={{marginStart: 5, fontWeight: 'bold', fontSize: 18}}>
                  {exam.rights_count}
                </Text>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  borderWidth: 0.3,
                  borderColor: '#607d8b',
                  borderRadius: 10,
                  paddingHorizontal: 10,
                  paddingVertical: 5,
                }}>
                <Icon name={'times-circle'} size={20} color="#c62828" />
                <Text
                  style={{marginStart: 5, fontWeight: 'bold', fontSize: 18}}>
                  {exam.wrongs_count}
                </Text>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  borderWidth: 0.3,
                  borderColor: '#607d8b',
                  borderRadius: 10,
                  paddingHorizontal: 10,
                  paddingVertical: 5,
                }}>
                <Icon name={'exclamation-circle'} size={20} color="#c62828" />
                <Text
                  style={{marginStart: 5, fontWeight: 'bold', fontSize: 18}}>
                  {exam.no_answers_count}
                </Text>
              </View>
            </View>
          </View>
        </ScrollView>
      )}
    </View>
  );
};

export default Home_Screen;
