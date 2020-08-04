/* eslint-disable react-native/no-inline-styles */
import React, {useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {StyleSheet, FlatList, View, Text, StatusBar, Pressable, Platform} from 'react-native';
import {Header} from 'react-native-elements';
import {useNavigation} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome5Pro';

import question_type from '../data/question_type.json';

const _renderItem = (props) => {
  const {item, handlePress} = props;
  console.log(item);
  return (
    <Pressable
      android_ripple={{
        color: 'white',
      }}
      style={({pressed}) => [
        {
          backgroundColor: pressed ? '#c8e6c9' : '#FFF',
        },
        {padding: 10, borderBottomColor: '#c8e6c9', borderBottomWidth: 0.3},
      ]}
      onPress={() => handlePress(item)}>
      <Text style={{fontWeight: 'bold', color: '#2e7d32'}}>{item.name}</Text>
      <Text style={{fontSize: 12, margin: 5}}>{item.des}</Text>
    </Pressable>
  );
};

const Setting_Screen = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const check_license = useSelector((state) => state.global.check_license);

  const question_type_name = question_type.question_type_name;

  let question_type_tmp = ['', '', '', '', '', '', '', '', ''];

  switch (check_license) {
    case 0:
      question_type_tmp = question_type.question_type_desc_a1;
      break;
    case 1:
      question_type_tmp = question_type.question_type_desc_a2;
      break;
    case 2:
      question_type_tmp = question_type.question_type_desc_a3a4;
      break;
    case 3:
      question_type_tmp = question_type.question_type_desc_a3a4;
      break;
    case 4:
      question_type_tmp = question_type.question_type_desc_b1;
      break;
    case 5:
      question_type_tmp = question_type.question_type_desc_b2;
      break;
    case 6:
      question_type_tmp = question_type.question_type_desc_b2;
      break;
    case 7:
      question_type_tmp = question_type.question_type_desc_b2;
      break;
    case 8:
      question_type_tmp = question_type.question_type_desc_b2;
      break;
    default:
      break;
  }

  let data = [];
  question_type_name.map((item, index) => {
    if (question_type_tmp[index].length > 1) {
      data.push({name: item, des: question_type_tmp[index], index: index});
    }
  });

  useEffect(() => {
    StatusBar.setBarStyle('light-content');

    if (Platform.OS === 'android') {
      StatusBar.setBackgroundColor('transparent');
      StatusBar.setTranslucent(true);
    }

    return () => {};
  }, []);

  const handlePress = (i) => {
    navigation.navigate('OnTapCauHoi_ChiTiet_Screen', {
      item: i,
    });
  };

  return (
    <View style={{flex: 1}}>
      <Header
        placement="left"
        statusBarProps={{barStyle: 'light-content'}}
        barStyle="light-content"
        centerComponent={{
          text: 'Ôn tập các câu hỏi',
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
        <FlatList
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{flexGrow: 1}}
          data={data}
          renderItem={({item, index}) => (
            <_renderItem item={item} handlePress={handlePress} check_license={check_license} index={index} />
          )}
          keyExtractor={(item, index) => index.toString()}
        />
      </View>
    </View>
  );
};

export default Setting_Screen;
