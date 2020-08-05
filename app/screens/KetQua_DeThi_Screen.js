/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useState} from 'react';
import {useSelector} from 'react-redux';

import {
  FlatList,
  View,
  Text,
  StatusBar,
  Platform,
  BackHandler,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import {Header, CheckBox, Divider, Button} from 'react-native-elements';
import {useNavigation, useRoute} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome5Pro';

import license from '../data/license.json';
import realm from '../utils/realm';
const win = Dimensions.get('window');

import {displayTime} from '../utils/utils';

const _renderItem = (props) => {
  const {item, index, goToChiTiet} = props;
  let icon_name = 'times-circle';
  let color_name = '#c62828';
  if (item.selected_answer === 0) {
    icon_name = 'exclamation-circle';
    color_name = '#c62828';
  } else if (item.selected_answer === item.right_answer) {
    icon_name = 'check-circle';
    color_name = '#607d8b';
  }

  return (
    <TouchableOpacity
      onPress={() => {
        goToChiTiet(index);
      }}
      style={{
        backgroundColor: 'white',
        width: (win.width - 10) / 4 - 4,
        height: 40,
        borderWidth: 0.3,
        borderColor: '#cfd8dc',
        justifyContent: 'center',
        alignItems: 'center',
        margin: 2,
        flexDirection: 'row',
      }}
      key={`${index}-menuitem`}>
      <Icon name={icon_name} size={20} color={color_name} />
      <Text
        style={{fontWeight: 'bold', color: '#37474f', marginStart: 5}}>{`Câu ${
        index + 1
      }`}</Text>
    </TouchableOpacity>
  );
};

const Home_Screen = () => {
  let Question = realm.objects('Question');
  let Exam = realm.objects('Exam');
  let ExamDetail = realm.objects('ExamDetail');

  const navigation = useNavigation();
  const route = useRoute();
  const {datadapan, time_tmp} = route.params;
  const [exam, setExam] = useState(null);
  const check_license = useSelector((state) => state.global.check_license);
  let question_require = license[check_license].question_require;

  useEffect(() => {
    let rights_count = 0;
    let wrongs_count = 0;
    let no_answers_count = 0;
    let status = 0;
    let right_required = true;

    datadapan.map((i, index) => {
      if (i.selected_answer === 0) {
        no_answers_count++;
        if (i.right_required === 1) {
          right_required = false;
        }
      } else if (i.selected_answer === i.right_answer) {
        rights_count++;
      } else {
        wrongs_count++;
        if (i.right_required === 1) {
          right_required = false;
        }
      }
    });

    if (!right_required) {
      status = 1;
    } else {
      if (rights_count < question_require) {
        status = 2;
      } else {
        status = 3;
      }
    }

    setExam({rights_count, wrongs_count, no_answers_count, status});
    return () => {};
  }, []);

  //Status
  //1 khong dat, sai cau diem liet
  //2 Khong dat, sai nhieu cau
  //3 Dat

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
    StatusBar.setBarStyle('light-content');

    if (Platform.OS === 'android') {
      StatusBar.setBackgroundColor('transparent');
      StatusBar.setTranslucent(true);
    }
    return () => {};
  }, []);

  const goToChiTiet = (i) => {
    navigation.navigate('ChiTiet_KetQua_Screen', {
      initData: datadapan,
      initTime: time_tmp,
      initIndex: i,
    });
  };

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
              <Icon name={'stopwatch'} size={20} color="#607d8b" />
              <Text style={{marginStart: 5, fontWeight: 'bold', fontSize: 18}}>
                {displayTime(time_tmp / 1000)}
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
              <Icon name={'sigma'} size={20} color="#607d8b" />
              <Text style={{marginStart: 5, fontWeight: 'bold', fontSize: 18}}>
                {exam.rights_count + exam.no_answers_count + exam.wrongs_count}
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
              <Text style={{marginStart: 5, fontWeight: 'bold', fontSize: 18}}>
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
              <Text style={{marginStart: 5, fontWeight: 'bold', fontSize: 18}}>
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
              <Text style={{marginStart: 5, fontWeight: 'bold', fontSize: 18}}>
                {exam.no_answers_count}
              </Text>
            </View>
          </View>
        </View>
      )}

      <View
        style={{
          justifyContent: 'center',

          alignItems: 'center',
        }}>
        <Button
          icon={
            <Icon
              name="history"
              size={15}
              color="white"
              style={{marginEnd: 10}}
            />
          }
          iconLeft
          title="LỊCH SỬ THI"
          containerStyle={{margin: 10}}
          buttonStyle={{borderRadius: 50, width: 200, justifyContent: 'center'}}
          onPress={() => {
            goToChiTiet(0);
          }}
        />
      </View>
      <FlatList
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{
          flexGrow: 1,
        }}
        horizontal={false}
        numColumns={4}
        data={datadapan}
        renderItem={({item, index}) => (
          <_renderItem item={item} index={index} goToChiTiet={goToChiTiet} />
        )}
        keyExtractor={(item, index) => index.toString()}
      />
    </View>
  );
};

export default Home_Screen;
