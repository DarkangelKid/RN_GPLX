/* eslint-disable react-native/no-inline-styles */
import React, {useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {
  View,
  TouchableOpacity,
  FlatList,
  StatusBar,
  Platform,
  Text,
} from 'react-native';
import {Header} from 'react-native-elements';
import {useNavigation} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome5Pro';

import {actions} from '../redux/GLOBALRedux';
import license from '../data/license.json';

const _renderItem = (props) => {
  const {check_license, item, index, handlePress} = props;

  return (
    <TouchableOpacity
      style={{
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        borderBottomColor: '#8CEC99',
        borderBottomWidth: 0.3,
        padding: 10,
        backgroundColor: check_license === index ? '#8CEC99' : 'white',
      }}
      onPress={() => {
        handlePress(index);
      }}>
      <View style={{marginEnd: 15}}>
        <Icon
          name={index < 4 ? 'motorcycle' : 'car'}
          size={20}
          color="#7cb342"
        />
      </View>
      <View>
        <Text style={{color: '#565656', fontWeight: 'bold'}}>
          Bằng {item.text}
        </Text>
        <Text
          style={{
            fontSize: 13,
            marginLeft: 0,
            color: '#565656',
            marginVertical: 5,
          }}>
          {item.content}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const Setting_Screen = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const check_license = useSelector((state) => state.global.check_license);

  useEffect(() => {
    StatusBar.setBarStyle('light-content');

    if (Platform.OS === 'android') {
      StatusBar.setBackgroundColor('transparent');
      StatusBar.setTranslucent(true);
    }
    return () => {};
  }, []);

  const handlePress = (i) => {
    dispatch(actions.setLicense(i));
    navigation.navigate('Home_Screen');
  };

  return (
    <View>
      <Header
        placement="left"
        statusBarProps={{barStyle: 'light-content'}}
        barStyle="light-content"
        centerComponent={{
          text: 'Chọn bằng lái xe ôn thi',
          style: {color: '#fff', fontSize: 20, fontWeight: 'bold'},
        }}
        containerStyle={{
          backgroundColor: '#3f51b5',
          justifyContent: 'space-around',
        }}
        centerContainerStyle={{}}
      />
      <FlatList
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{flexGrow: 1}}
        data={license}
        renderItem={({item, index}) => (
          <_renderItem
            item={item}
            handlePress={handlePress}
            check_license={check_license}
            index={index}
          />
        )}
        keyExtractor={(item, index) => index.toString()}
      />
    </View>
  );
};

export default Setting_Screen;
