/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {Text, View, Platform, Image, Dimensions} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5Pro';
import {CheckBox, Divider} from 'react-native-elements';
const win = Dimensions.get('window');

const Item_ChiTiet_KetQua = (props) => {
  const {item} = props;
  const [checkQuestion, setCheckQuestion] = useState(0);
  const right_answer = item.right_answer;

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
          resizeMode={'stretch'}
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
          textStyle={{
            flex: 1,
            fontWeight: right_answer === 1 ? 'bold' : 'normal',
          }}
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
          textStyle={{
            flex: 1,
            fontWeight: right_answer === 2 ? 'bold' : 'normal',
          }}
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
            textStyle={{
              flex: 1,
              fontWeight: right_answer === 3 ? 'bold' : 'normal',
            }}
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
            textStyle={{
              flex: 1,
              fontWeight: right_answer === 4 ? 'bold' : 'normal',
            }}
            onPress={() => {
              setCheckQuestion(4);
            }}
          />
        )}
      </View>
      {item.hint.length > 2 && (
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
    </View>
  );
};

export default Item_ChiTiet_KetQua;
