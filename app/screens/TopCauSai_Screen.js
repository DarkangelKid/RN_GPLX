/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useState, useRef} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {
  StyleSheet,
  View,
  Text,
  StatusBar,
  Platform,
  Dimensions,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import {Header} from 'react-native-elements';
import {useNavigation, useRoute} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome5Pro';
import ScrollableTabView, {
  ScrollableTabBar,
} from '../modules/react-native-scrollable-tab-view';

import realm from '../utils/realm';

import Item_ChiTiet_KetQua from '../components/Item_ChiTiet_KetQua';

const win = Dimensions.get('window');

const Setting_Screen = () => {
  const navigation = useNavigation();
  const tabView = useRef();

  const route = useRoute();

  const [data, setData] = useState([]);
  const [loadding, setLoadding] = useState(true);

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

  query += 'AND wrongs_count>0';

  useEffect(() => {
    let Question = realm.objects('Question');
    const result = Question.filtered(query).sorted('wrongs_count', true);
    setData(result);
    setLoadding(false);

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
          text: 'Câu bị sai',
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
      {loadding ? (
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignContent: 'center',
          }}>
          <ActivityIndicator size="large" color="#fb8c00" />
        </View>
      ) : data.length > 0 ? (
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
              <Item_ChiTiet_KetQua
                style={styles.tabView}
                tabLabel={'Câu ' + (index + 1)}
                key={`${index}`}
                item={i}
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
          {/* <ActivityIndicator size="large" color="#fb8c00" /> */}
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
