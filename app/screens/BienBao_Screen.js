/* eslint-disable react-native/no-inline-styles */
import React, {useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {StyleSheet, FlatList, View, TouchableOpacity, Text, StatusBar, Platform, Image} from 'react-native';
import {Header} from 'react-native-elements';
import {useNavigation} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome5Pro';
import signs from '../data/signs.json';
import ScrollableTabView, {ScrollableTabBar} from '../modules/react-native-scrollable-tab-view';

const _renderItem = (props) => {
  const {item} = props;

  let image = Platform.OS === 'android' ? {uri: 'asset:/signs/sign' + item.image_file + '.png'} : {uri: 'sign' + item.image_file};
  return (
    <View
      style={{
        flex: 1,
        padding: 5,
        borderBottomColor: '#2e7d32',
        borderBottomWidth: 0.3,
        flexDirection: 'row',
        alignItems: 'center',
      }}>
      {/*  <Image source={image} style={{width: 100, height: 100}} /> */}
      <Image source={image} style={{width: 100, height: 100}} resizeMode={'contain'} />

      <View style={{padding: 10, flex: 1}}>
        <Text style={{color: '#4527a0', fontWeight: 'bold', marginEnd: 5}}>{item.ten}</Text>
        <Text style={{fontWeight: 'bold', marginEnd: 5}}>{item.bienbao}</Text>
        <Text style={{color: '#004d40', marginEnd: 5}}>{item.content}</Text>
      </View>
    </View>
  );
};

const _renderTab = (props) => {
  const {data} = props;

  return (
    <FlatList
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{flexGrow: 1, backgroundColor: 'white'}}
      showsHorizontalScrollIndicator={false}
      data={data}
      renderItem={({item, index}) => <_renderItem item={item} index={index} />}
      keyExtractor={(item, index) => index.toString()}
    />
  );
};

const Setting_Screen = () => {
  const navigation = useNavigation();

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
          text: 'Biển báo giao thông',
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
      <ScrollableTabView
        style={{flex: 1}}
        renderTabBar={() => <ScrollableTabBar />}
        initialPage={0}
        tabBarPosition="top"
        tabBarActiveTextColor="#3D6DCC"
        tabBarInactiveTextColor={'#757575'}
        tabBarUnderlineStyle={{backgroundColor: '#3D6DCC', height: 1}}>
        <_renderTab style={styles.tabView} data={signs.bienbaocam} tabLabel={'BIỂN BÁO CẤM'} />
        <_renderTab style={styles.tabView} data={signs.bienbaonguyhiem} tabLabel={'BIỂN BÁO NGUY HIỂM'} />
        <_renderTab style={styles.tabView} data={signs.bienbaohieulenh} tabLabel={'BIỂN BÁO HIỆU LỆNH'} />
        <_renderTab style={styles.tabView} data={signs.bienbaochidan} tabLabel={'BIỂN BÁO CHỈ DẪN'} />
        <_renderTab style={styles.tabView} data={signs.bienbaophu} tabLabel={'BIỂN BÁO PHỤ'} />
      </ScrollableTabView>
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
