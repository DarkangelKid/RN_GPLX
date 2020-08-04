/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useState, useRef} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {
  StyleSheet,
  View,
  Text,
  StatusBar,
  Platform,
  Image,
  Dimensions,
  ScrollView,
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
import {CheckBox, Divider, Button} from 'react-native-elements';
import {useFocusEffect} from '@react-navigation/native';

import realm from '../utils/realm';
import {displayTime} from '../utils/utils';
import license from '../data/license.json';
import {templateSettings} from 'lodash';

const win = Dimensions.get('window');

const _renderCheckbox = (props) => {
  const {
    guidapan,
    showDapAn,
    title,
    right_answer,
    checkQuestion,
    index,
  } = props;

  return (
    <CheckBox
      iconLeft
      title={title}
      checkedIcon={
        showDapAn && checkQuestion !== right_answer && right_answer !== index
          ? 'times-circle'
          : 'check-circle'
      }
      uncheckedIcon="circle-o"
      checked={(showDapAn && right_answer === index) || checkQuestion === index}
      containerStyle={{
        backgroundColor: checkQuestion === index ? '#F5F9FE' : 'transparent',
        borderWidth: 0,
        margin: 1,
      }}
      checkedColor={
        showDapAn && right_answer === index
          ? 'green'
          : checkQuestion === index
          ? 'black'
          : 'black'
      }
      textStyle={{
        flex: 1,
        fontWeight: showDapAn && right_answer === index ? 'bold' : 'normal',
      }}
      onPress={() => {
        if (!showDapAn) {
          guidapan(index);
        }
      }}
    />
  );
};

const _renderItem = (props) => {
  const {item, checkDapAn} = props;

  const [checkQuestion, setCheckQuestion] = useState(0);
  const right_answer = item.right_answer;

  const [showDapAn, setShowDapAn] = useState(false);

  const guidapan = (luachon) => {
    console.log(item.id);

    if (checkQuestion === luachon) {
      luachon = 0;
    }
    setCheckQuestion(luachon);
    checkDapAn({
      id: item.id,
      right_answer: item.right_answer,
      right_required: item.right_required,
      selected_answer: luachon,
    });
  };

  const onPressShowDapAn = () => {
    setShowDapAn(true);
  };

  let answer_arr = [item.answer1, item.answer2];
  if (item.answer3.length > 3) {
    answer_arr.push(item.answer3);
  }
  if (item.answer4.length > 4) {
    answer_arr.push(item.answer4);
  }

  let image =
    Platform.OS === 'android'
      ? {uri: 'asset:/images/' + item.image_file}
      : {uri: item.image_file};

  return (
    <View
      style={{
        padding: 5,
        borderBottomColor: '#c8e6c9',
        borderBottomWidth: 0.3,
        flex: 1,
      }}>
      <View style={{flexDirection: 'row', margin: 5, alignItems: 'center'}}>
        {item.right_required > 0 && (
          <Icon
            name="star"
            size={20}
            color="#2e7d32"
            style={{marginHorizontal: 5}}
          />
        )}
        <Text style={{fontWeight: 'bold', color: '#2e7d32', flex: 1}}>
          {item.content}
        </Text>
      </View>
      {item.image_file.length > 2 && (
        <Image
          source={image}
          style={{width: win.width - 10, height: 200}}
          resizeMode={'contain'}
        />
      )}
      <Divider
        style={{
          backgroundColor: '#3D6DCC',
          marginTop: 5,
          paddingHorizontal: 10,
        }}
      />
      <View style={{justifyContent: 'flex-start', marginBottom: 20}}>
        {answer_arr.map((item_, index) => (
          <_renderCheckbox
            key={`${index}-chekcbox`}
            title={item_}
            index={index + 1}
            right_answer={right_answer}
            guidapan={guidapan}
            checkQuestion={checkQuestion}
            showDapAn={showDapAn}
          />
        ))}
      </View>
      {showDapAn && item.hint.length > 2 && (
        <View style={{paddingVertical: 10, backgroundColor: '#FFFAC6'}}>
          <View
            style={{
              flexDirection: 'row',
              marginStart: 10,
              alignItems: 'center',
            }}>
            <Icon name="lightbulb-on" size={20} color="#FF343C" />
            <Text style={{color: '#FF343C', marginStart: 10}}>
              Giải thích đáp án
            </Text>
          </View>
          <Text style={{margin: 10}}>
            {item.hint.replace(/<br ?\/?>/g, '\n')}
          </Text>
        </View>
      )}
      <View style={{flex: 1}} />
      {checkQuestion > 0 && (
        <View style={{flexDirection: 'row'}}>
          <View style={{flex: 1}} />
          <Button
            icon={
              <Icon
                name="check"
                size={15}
                color="white"
                style={{marginEnd: 10}}
              />
            }
            iconLeft
            title="ĐÁP ÁN"
            containerStyle={{margin: 10}}
            buttonStyle={{borderRadius: 50, paddingHorizontal: 20}}
            onPress={onPressShowDapAn}
          />
        </View>
      )}
    </View>
  );
};

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
      } else {
        wrongs_count++;
        if (i.right_required === 1) {
          right_required = false;
        }
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
        if (rights_count < right_required) {
          examp_tmp.status = 2;
        } else {
          examp_tmp.status = 3;
        }
      }
    });

    navigation.navigate('KetQua_DeThi_Screen', {
      exam_id: exam_id,
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
              <_renderItem
                style={styles.tabView}
                tabLabel={'Câu ' + (index + 1)}
                key={`${index}`}
                item={i}
                checkDapAn={checkDapAn}
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
              <ScrollView>
                <View
                  style={{
                    flex: 1,
                    flexDirection: 'row',
                    justifyContent: 'flex-start',
                    flexWrap: 'wrap',
                    backgroundColor: '#eceff1',
                  }}>
                  {data.map((i, index) => (
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
                  ))}
                </View>
              </ScrollView>
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
