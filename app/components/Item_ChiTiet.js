/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {Text, View, Platform, Image, Dimensions} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5Pro';
import {CheckBox, Divider, Button} from 'react-native-elements';
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

const Item_ChiTiet = (props) => {
  const {item, checkDapAn} = props;

  const [checkQuestion, setCheckQuestion] = useState(0);
  const right_answer = item.right_answer;

  const [showDapAn, setShowDapAn] = useState(false);

  const guidapan = (luachon) => {
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

export default Item_ChiTiet;
