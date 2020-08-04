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
  FlatList,
} from 'react-native';
import {Header} from 'react-native-elements';
import {useNavigation, useRoute} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome5Pro';
import ScrollableTabView, {
  ScrollableTabBar,
} from '../modules/react-native-scrollable-tab-view';

import realm from '../utils/realm';

import Item_ChiTiet_KetQua from '../components/Item_ChiTiet_KetQua';
import Item_ChiTiet from '../components/Item_ChiTiet';

const win = Dimensions.get('window');

const Setting_Screen = () => {
  const navigation = useNavigation();
  const tabView = useRef();

  const route = useRoute();
  const {item} = route.params;

  const [data, setData] = useState([]);

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

  if (item.index === 8) {
    query += 'AND right_required=1';
  } else if (item.index > 0) {
    query += 'AND type = ' + item.index;
  }

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
          text: item?.name ?? 'Ôn tập các câu hỏi',
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
              <Item_ChiTiet
                style={styles.tabView}
                tabLabel={'Câu ' + (index + 1)}
                key={`${index}`}
                item={i}
                checkDapAn={() => {}}
                showButton={true}
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
