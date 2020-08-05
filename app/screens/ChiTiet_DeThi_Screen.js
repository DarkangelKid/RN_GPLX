/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useState, useRef} from 'react';
import {useSelector} from 'react-redux';
import {
  StyleSheet,
  View,
  Text,
  StatusBar,
  Platform,
  Dimensions,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
  BackHandler,
} from 'react-native';
import {Header} from 'react-native-elements';
import {useNavigation, useRoute} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome5Pro';
import ScrollableTabView, {
  ScrollableTabBar,
} from '../modules/react-native-scrollable-tab-view';
import _ from 'lodash';

import realm from '../utils/realm';
import {displayTime} from '../utils/utils';
import license from '../data/license.json';

import Item_ChiTiet from '../components/Item_ChiTiet';

const win = Dimensions.get('window');

const _renderTimer = (props) => {
  const {question_time, gotoKetQuaPage, checkKetThuc} = props;

  const [time, setTime] = useState(question_time);
  const [isRunning, setRunning] = useState(false);
  const [timer, setTimer] = useState(null);

  useEffect(() => {
    if (checkKetThuc) {
      clearInterval(timer);
      gotoKetQuaPage(time);
    }
    return () => {};
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [checkKetThuc]);

  useEffect(() => {
    if (isRunning || time <= 0) {
      clearInterval(timer);
    }
    return () => {};
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isRunning, time]);

  //question_time
  useEffect(() => {
    const interval = setInterval(() => {
      if (time > 0) {
        setTime((previousTime) => previousTime - 1);
      }
    }, 1000);
    setTimer(interval);

    return () => {
      clearInterval(timer);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (time <= 0) {
      Alert.alert(
        'Kết thúc',
        'Thời gian thi kết thúc, ấn tiếp tục để xem kết quả',
        [
          {
            text: 'Tiếp tục',
            style: 'destructive',

            onPress: () => gotoKetQuaPage(time),
          },
        ],
      );
    }
    return () => {};
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [time]);

  return (
    <Text style={{color: '#FFF', fontWeight: 'bold', marginHorizontal: 10}}>
      {displayTime(time)}
    </Text>
  );
};

const Setting_Screen = () => {
  let Question = realm.objects('Question');
  let Exam = realm.objects('Exam');
  let ExamDetail = realm.objects('ExamDetail');

  const navigation = useNavigation();
  const tabView = useRef();
  const route = useRoute();
  const {item} = route.params;
  const exam_id = item.id;

  let question_time = license[item.license_id - 1].question_time / 1000;

  let question_require = license[item.license_id - 1].question_require;

  //question_time = 10;

  const [datadapan, setDatadapan] = useState([]);
  const [data, setData] = useState([]);
  const [checkKetThuc, setCheckKetThuc] = useState(false);

  const [checkshow, setCheckshow] = useState(false);
  const check_license = useSelector((state) => state.global.check_license);

  const gotoKetQuaPage = (time) => {
    let time_tmp = (question_time - time) * 1000;

    let rights_count = 0;
    let wrongs_count = 0;
    let no_answers_count = 0;
    let right_required = true;
    datadapan.map((i, index) => {
      if (i.selected_answer === 0) {
        no_answers_count++;
        if (i.right_required === 1) {
          right_required = false;
        }
      } else if (i.selected_answer === i.right_answer) {
        rights_count++;
        realm.write(() => {
          let question_item = Question.filtered('id = ' + i.id)[0];
          question_item.rights_count = question_item.rights_count + 1;
        });
      } else {
        wrongs_count++;
        if (i.right_required === 1) {
          right_required = false;
        }
        realm.write(() => {
          let question_item = Question.filtered('id = ' + i.id)[0];
          question_item.wrongs_count = question_item.wrongs_count + 1;
        });
      }

      realm.write(() => {
        let example_detail_tmp = ExamDetail.filtered(
          'question.id = ' + i.id,
        )[0];
        example_detail_tmp.selected_answer = i.selected_answer;
      });
    });

    //Status
    //1 khong dat, sai cau diem liet
    //2 Khong dat, sai nhieu cau
    //3 Dat

    realm.write(() => {
      let examp_tmp = Exam.filtered('id = ' + exam_id)[0];
      examp_tmp.rights_count = rights_count;
      examp_tmp.wrongs_count = wrongs_count;
      examp_tmp.no_answers_count = no_answers_count;
      examp_tmp.totalTime = time_tmp;
      if (!right_required) {
        examp_tmp.status = 1;
      } else {
        if (rights_count < question_require) {
          examp_tmp.status = 2;
        } else {
          examp_tmp.status = 3;
        }
      }
    });

    /* navigation.navigate('KetQua_DeThi_Screen', {
      exam_id: exam_id,
    }); */

    navigation.navigate('KetQua_DeThi_Screen', {
      datadapan: datadapan,
      time_tmp: time_tmp,
    });
  };

  const kethucBaiThi = () => {
    Alert.alert('Kết thúc bài thi?', 'Bài thi sẽ được kết thúc và chấm điểm', [
      {
        text: 'Tiếp tục',
        style: 'cancel',
        onPress: () => {},
      },
      {
        text: 'Kết thúc',
        style: 'destructive',

        onPress: () => setCheckKetThuc(true),
      },
    ]);
  };

  useEffect(() => {
    const backAction = () => {
      Alert.alert(
        'Kết thúc bài thi?',
        'Bài thi sẽ được kết thúc và chấm điểm',
        [
          {
            text: 'Tiếp tục',
            onPress: () => null,
            style: 'cancel',
          },
          {
            text: 'Kết thúc',
            onPress: () => {
              setCheckKetThuc(true);
              backHandler.remove();
            },
          },
        ],
      );
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );

    return () => backHandler.remove();
  }, []);

  useEffect(() => {
    let tmp = [];
    let tmp_dapan = [];
    item.exam_details.map((j, index) => {
      j.question.selected_answer = 0;
      let dapan = {
        right_answer: j.question.right_answer,
        right_required: j.question.right_required,
        id: j.question.id,
        selected_answer: 0,
      };
      tmp_dapan.push(dapan);
      tmp.push(j.question);
    });
    setDatadapan(tmp_dapan);
    setData(tmp);
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

  const checkDapAn = (i) => {
    let id = i.id;
    let tmp = _.cloneDeep(datadapan);

    tmp[_.findIndex(datadapan, {id: id})] = i;
    setDatadapan(tmp);

    /*   */
  };

  return (
    <View style={{flex: 1, backgroundColor: '#FFF'}}>
      <Header
        placement="left"
        statusBarProps={{barStyle: 'light-content'}}
        barStyle="light-content"
        centerComponent={{
          text: item.exam_no ? `Đề thi số ${item.exam_no}` : 'Đề thi',
          style: {color: '#fff', fontSize: 20, fontWeight: 'bold'},
        }}
        containerStyle={{
          backgroundColor: '#3f51b5',
          justifyContent: 'space-around',
        }}
        centerContainerStyle={{}}
        leftComponent={
          <Icon
            //onPress={() => navigation.goBack()}
            onPress={() => {
              kethucBaiThi();
            }}
            name="long-arrow-left"
            color="white"
            underlayColor="#00000000"
            size={22}
            style={{padding: 10}}
          />
        }
        rightComponent={
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <_renderTimer
              question_time={question_time}
              gotoKetQuaPage={gotoKetQuaPage}
              checkKetThuc={checkKetThuc}
            />

            <TouchableOpacity
              onPress={() => {
                kethucBaiThi();
              }}>
              <Icon
                name="check"
                color="white"
                underlayColor="#00000000"
                size={22}
                style={{padding: 10}}
              />
            </TouchableOpacity>
          </View>
        }
      />
      {data.length > 0 ? (
        <>
          <ScrollableTabView
            ref={tabView}
            prerenderingSiblingsNumber={1}
            style={{flex: 1}}
            renderTabBar={() => <ScrollableTabBar />}
            tabBarPosition="top"
            tabBarActiveTextColor="#3D6DCC"
            tabBarInactiveTextColor={'#757575'}
            tabBarUnderlineStyle={{backgroundColor: '#3D6DCC', height: 1}}>
            {data.map((i, index) => (
              <Item_ChiTiet
                style={styles.tabView}
                tabLabel={'Câu ' + (index + 1)}
                key={`${index}`}
                item={i}
                checkDapAn={checkDapAn}
                //isShowDapAn={true}
              />
            ))}
          </ScrollableTabView>
          <TouchableOpacity
            style={{
              backgroundColor: '#1670AC',
              height: 40,
              justifyContent: 'center',
              flexDirection: 'row',
              alignItems: 'center',
            }}
            activeOpacity={0.9}
            onPress={() => {
              setCheckshow(!checkshow);
            }}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginHorizontal: 10,
              }}>
              <Icon
                name={checkshow ? 'chevron-down' : 'chevron-up'}
                color="white"
                size={20}
              />
              <Text
                style={{
                  color: 'white',
                  marginStart: 10,
                  fontWeight: 'bold',
                }}>{`${data.length} CÂU HỎI`}</Text>
            </View>
          </TouchableOpacity>
          {checkshow && (
            <View style={{height: 300, padding: 5}}>
              <FlatList
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{
                  flexGrow: 1,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
                horizontal={false}
                numColumns={4}
                data={data}
                renderItem={({item, index}) => (
                  <TouchableOpacity
                    onPress={() => {
                      tabView.current.goToPage(index);
                      setCheckshow(false);
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
                    }}
                    key={`${index}-menuitem`}>
                    <Text
                      style={{fontWeight: 'bold', color: '#37474f'}}>{`Câu ${
                      index + 1
                    }`}</Text>
                  </TouchableOpacity>
                )}
                keyExtractor={(item, index) => index.toString()}
              />
            </View>
          )}
        </>
      ) : (
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignContent: 'center',
          }}>
          <ActivityIndicator size="large" color="#fb8c00" />
        </View>
      )}
    </View>
  );
};

export default Setting_Screen;
const styles = StyleSheet.create({
  tabView: {
    flex: 1,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
  },
});
