/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useState} from 'react';
import {useSelector} from 'react-redux';
import {
  ScrollView,
  View,
  Text,
  StatusBar,
  Pressable,
  Platform,
  Dimensions,
} from 'react-native';
import {Header} from 'react-native-elements';
import {useNavigation} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome5Pro';
const win = Dimensions.get('window');

import license from '../data/license.json';
import realm from '../utils/realm';

const Screen = () => {
  const navigation = useNavigation();
  const check_license = useSelector((state) => state.global.check_license);

  const [data, setData] = useState([]);

  let textBangLai = '';
  if (check_license > -1) {
    textBangLai = license[check_license].text;
  }

  let question_type = license[check_license].question_type;

  let query = 'license_id = ' + question_type;

  useEffect(() => {
    let exams = realm.objects('Exam');
    const result = exams.filtered(query);
    setData(result);

    return () => {};
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    StatusBar.setBarStyle('light-content');

    if (Platform.OS === 'android') {
      StatusBar.setBackgroundColor('transparent');
      StatusBar.setTranslucent(true);
    }

    return () => {};
  }, []);

  const handlePress = (i) => {
    navigation.navigate('ChiTiet_DeThi_Screen', {
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
          text: 'Bộ đề thi bằng ' + textBangLai,
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

      <ScrollView>
        <View
          style={{
            flex: 1,
            flexDirection: 'row',
            justifyContent: 'flex-start',
            flexWrap: 'wrap',
            backgroundColor: '#eceff1',
            padding: 5,
          }}>
          {data.map((i, index) => (
            <Pressable
              android_ripple={{
                color: 'white',
              }}
              style={({pressed}) => [
                {
                  backgroundColor: pressed
                    ? '#c8e6c9'
                    : i.status > 0
                    ? '#c8e6c9'
                    : '#FFF',
                },
                {
                  width: (win.width - 10) / 3 - 4,
                  height: (win.width - 10) / 3 - 4,
                  padding: 10,
                  borderWidth: 0.3,
                  borderColor: '#cfd8dc',
                  justifyContent: 'center',
                  alignItems: 'center',
                  margin: 2,
                },
              ]}
              onPress={() => {
                handlePress(i);
              }}
              key={`${index}-menuitem`}>
              <Text style={{color: '#37474f'}}>{'Đề thi số'}</Text>
              <Text
                style={{
                  fontWeight: 'bold',
                  color: '#37474f',
                  fontSize: 20,
                  margin: 10,
                }}>{` ${i.exam_no}`}</Text>

              <View style={{flex: 1}}>
                {i.status > 0 && (
                  <>
                    <View style={{flexDirection: 'row', alignItems: 'center'}}>
                      <View
                        style={{
                          flexDirection: 'row',
                          alignItems: 'center',
                          margin: 6,
                        }}>
                        <Icon name={'check-circle'} color="#607d8b" size={18} />
                        <Text style={{marginStart: 2}}>{i.rights_count}</Text>
                      </View>
                      <View
                        style={{
                          flexDirection: 'row',
                          alignItems: 'center',
                          margin: 6,
                        }}>
                        <Icon name={'stop-circle'} color="#c62828" size={18} />
                        <Text style={{marginStart: 2}}>
                          {i.no_answers_count}
                        </Text>
                      </View>
                      <View
                        style={{
                          flexDirection: 'row',
                          alignItems: 'center',
                          margin: 6,
                        }}>
                        <Icon name={'times-circle'} color="#c62828" size={18} />
                        <Text style={{marginStart: 2}}>{i.wrongs_count}</Text>
                      </View>
                    </View>
                  </>
                )}
              </View>
            </Pressable>
          ))}
        </View>
      </ScrollView>
    </View>
  );
};

export default Screen;
