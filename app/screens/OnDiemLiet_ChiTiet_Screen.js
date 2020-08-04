/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useState, useRef} from 'react';
import {useSelector} from 'react-redux';
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
} from 'react-native';
import {Header} from 'react-native-elements';
import {useNavigation, useRoute} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome5Pro';
import ScrollableTabView, {ScrollableTabBar} from '../modules/react-native-scrollable-tab-view';

import {CheckBox, Divider} from 'react-native-elements';

import realm from '../utils/realm';

const win = Dimensions.get('window');

const _renderItem = (props) => {
  const {item} = props;
  const [checkQuestion, setCheckQuestion] = useState(0);
  const right_answer = item.right_answer;

  let image = Platform.OS === 'android' ? {uri: 'asset:/images/' + item.image_file} : {uri: item.image_file};

  return (
    <View style={{padding: 5, borderBottomColor: '#c8e6c9', borderBottomWidth: 0.3, flex: 1}}>
      <View style={{flexDirection: 'row', margin: 5, alignItems: 'center'}}>
        {item.right_required > 0 && <Icon name="star" size={20} color="#2e7d32" style={{marginHorizontal: 5}} />}
        <Text style={{fontWeight: 'bold', color: '#2e7d32', flex: 1}}>{item.content}</Text>
      </View>

      {item.image_file.length > 2 && <Image source={image} style={{width: win.width - 10, height: 200}} resizeMode={'stretch'} />}

      <Divider style={{backgroundColor: '#3D6DCC', marginTop: 5, paddingHorizontal: 10}} />
      <View style={{justifyContent: 'flex-start', marginBottom: 20}}>
        <CheckBox
          iconLeft
          title={item.answer1}
          checkedIcon="check-circle"
          uncheckedIcon="circle-o"
          checked={right_answer === 1}
          containerStyle={{
            backgroundColor: checkQuestion === 1 ? '#F5F9FE' : 'transparent',
            borderWidth: 0,
            margin: 1,
          }}
          textStyle={{flex: 1, fontWeight: right_answer === 1 ? 'bold' : 'normal'}}
          onPress={() => {
            setCheckQuestion(1);
          }}
        />

        <CheckBox
          iconLeft
          title={item.answer2}
          checkedIcon="check-circle"
          uncheckedIcon="circle-o"
          checked={right_answer === 2}
          containerStyle={{
            backgroundColor: checkQuestion === 2 ? '#F5F9FE' : 'transparent',
            borderWidth: 0,
            margin: 1,
          }}
          textStyle={{flex: 1, fontWeight: right_answer === 2 ? 'bold' : 'normal'}}
          onPress={() => {
            setCheckQuestion(2);
          }}
        />
        {item.answer3.length > 3 && (
          <CheckBox
            iconLeft
            title={item.answer3}
            checkedIcon="check-circle"
            uncheckedIcon="circle-o"
            checked={right_answer === 3}
            containerStyle={{
              backgroundColor: checkQuestion === 3 ? '#F5F9FE' : 'transparent',
              borderWidth: 0,
              margin: 1,
            }}
            textStyle={{flex: 1, fontWeight: right_answer === 3 ? 'bold' : 'normal'}}
            onPress={() => {
              setCheckQuestion(3);
            }}
          />
        )}
        {item.answer4.length > 3 && (
          <CheckBox
            iconLeft
            title={item.answer4}
            checkedIcon="check-circle"
            uncheckedIcon="circle-o"
            checked={right_answer === 4}
            containerStyle={{
              backgroundColor: checkQuestion === 4 ? '#F5F9FE' : 'transparent',
              borderWidth: 0,
              margin: 1,
            }}
            textStyle={{flex: 1, fontWeight: right_answer === 4 ? 'bold' : 'normal'}}
            onPress={() => {
              setCheckQuestion(4);
            }}
          />
        )}
      </View>
      {item.hint.length > 2 && (
        <View style={{paddingVertical: 10, backgroundColor: '#FFFAC6'}}>
          <View style={{flexDirection: 'row', marginStart: 10, alignItems: 'center'}}>
            <Icon name="lightbulb-on" size={20} color="#FF343C" />
            <Text style={{color: '#FF343C', marginStart: 10}}>Giải thích đáp án</Text>
          </View>
          <Text style={{margin: 10}}>{item.hint.replace(/<br ?\/?>/g, '\n')}</Text>
        </View>
      )}
    </View>
  );
};

const Setting_Screen = () => {
  const navigation = useNavigation();
  const tabView = useRef();

  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);

  const [checkshow, setCheckshow] = useState(false);

  const check_license = useSelector((state) => state.global.check_license);

  let query = '';
  switch (check_license) {
    case 0:
      query += 'a1_no > 0 ';
      break;
    case 1:
      query += 'a2_no > 0 ';
      break;
    case 2:
      query += 'a3_no > 0 ';
      break;
    case 3:
      query += 'a4_no > 0 ';
      break;
    case 4:
      query += 'b1_no > 0 ';
      break;
    case 5:
      query += 'b2_no > 0 ';
      break;
    case 6:
      query += 'c_no > 0 ';
      break;
    default:
      query += 'def_no > 0 ';
      break;
  }

  query += 'AND right_required=1';

  useEffect(() => {
    let Question = realm.objects('Question');
    const result = Question.filtered(query);
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

  return (
    <View style={{flex: 1, backgroundColor: '#FFF'}}>
      <Header
        placement="left"
        statusBarProps={{barStyle: 'light-content'}}
        barStyle="light-content"
        centerComponent={{
          text: 'Các câu hỏi điểm liệt',
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
              <_renderItem style={styles.tabView} tabLabel={'Câu ' + (index + 1)} key={`${index}`} item={i} />
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
              <Icon name={checkshow ? 'chevron-down' : 'chevron-up'} color="white" size={20} />
              <Text style={{color: 'white', marginStart: 10, fontWeight: 'bold'}}>{`${data.length} CÂU HỎI`}</Text>
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
                      <Text style={{fontWeight: 'bold', color: '#37474f'}}>{`Câu ${index + 1}`}</Text>
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
