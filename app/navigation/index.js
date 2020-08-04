/* eslint-disable react-native/no-inline-styles */
import React, {useState, useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {View, StyleSheet, ActivityIndicator} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {actions} from '../redux/GLOBALRedux';

const Stack = createStackNavigator();

export const AuthContext = React.createContext();

import Home_Screen from '../screens/Home_Screen';
import Setting_Screen from '../screens/Setting_Screen';
import LuaChonBangLai_Screen from '../screens/LuaChonBangLai_Screen';
import BienBao_Screen from '../screens/BienBao_Screen';
import SaHinh_Screen from '../screens/SaHinh_Screen';
import MeoThi_Screen from '../screens/MeoThi_Screen';
import OnTapCauHoi_Screen from '../screens/OnTapCauHoi_Screen';
import OnTapCauHoi_ChiTiet_Screen from '../screens/OnTapCauHoi_ChiTiet_Screen';
import OnDiemLiet_ChiTiet_Screen from '../screens/OnDiemLiet_ChiTiet_Screen';
import BoDeThi_Screen from '../screens/BoDeThi_Screen';
import DanhSachDeThi_Screen from '../screens/DanhSachDeThi_Screen';
import ChiTiet_DeThi_Screen from '../screens/ChiTiet_DeThi_Screen';
import KetQua_DeThi_Screen from '../screens/KetQua_DeThi_Screen';
import TopCauSai_Screen from '../screens/TopCauSai_Screen';
import KetQua_DeThi_Random_Screen from '../screens/KetQua_DeThi_Random_Screen';
import ChiTiet_DeThi_Random_Screen from '../screens/ChiTiet_DeThi_Random_Screen';

import questions from '../data/questions.json';
import exams from '../data/exams.json';

import realm from '../utils/realm';

const SplashScreen = () => {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignContent: 'center',
      }}>
      <ActivityIndicator size="large" color="#fb8c00" />
    </View>
  );
};

const RootContainerScreen = () => {
  const dispatch = useDispatch();

  const loaddata = useSelector((state) => state.global.loaddata);
  const check_license = useSelector((state) => state.global.check_license);

  let Question = realm.objects('Question');
  let Exam = realm.objects('Exam');
  let ExamDetail = realm.objects('ExamDetail');

  if (!loaddata) {
    if (Question.length < 600) {
      questions.map((item) => {
        let right_answer = item.right_answer;
        if (item.answer4.length > 2) {
          if (right_answer > 4) {
            right_answer = 4;
          }
        } else {
          if (right_answer > 3) {
            right_answer = 3;
          }
        }

        let tmp = {
          id: item.no,
          type: item.type,
          content: item.content,
          answer1: item.answer1,
          answer2: item.answer2,
          answer3: item.answer3,
          answer4: item.answer4,
          image_file: item.image_file,
          right_answer: right_answer,
          right_required: item.right_required,
          a1_no: item.a1_no,
          a2_no: item.a2_no,
          a3_no: item.a3_no,
          a4_no: item.a3_no,
          b1_no: item.b1_no,
          b2_no: item.b2_no,
          c_no: item.c_no,
          def_no: item.def_no,
          rights_count: 0,
          wrongs_count: 0,
          hint: item.hint,
        };

        realm.write(() => {
          if (realm.objects('Question')) {
            realm.create('Question', tmp);
          }
        });
      });

      exams.map((item, index) => {
        let license_id = item.license_id;
        let exam_no = item.exam_no;
        let listquestions = item.questions;

        let examId = license_id * 1000 + exam_no * 10;

        let tmpExam = {
          id: examId,

          license_id: license_id,
          exam_no: exam_no,
          exam_details: [],
          rights_count: 0,
          wrongs_count: 0,
          no_answers_count: 0,
          totalTime: 0,
          testResult: 0,
          status: 0,
        };

        let exam = Exam.filtered(`id = ${examId}`)[0];

        realm.write(() => {
          if (typeof exam === 'undefined') {
            exam = realm.create('Exam', tmpExam);
          }

          let exam_details = exam.exam_details;

          listquestions.map((j) => {
            let questiondetail = Question.filtered(`id = ${j}`)[0];
            let examdetailId = examId * 1000 + j;

            let tmpexamdetail = {
              id: examdetailId,
              exam_id: examId,
              question: questiondetail,
              selected_answer: 0,
            };
            let examdetail = ExamDetail.filtered(`id = ${examdetailId}`)[0];
            if (typeof examdetail === 'undefined') {
              examdetail = realm.create('ExamDetail', tmpexamdetail);
            }

            exam_details.push(examdetail);
          });
        });
      });

      dispatch(actions.isLoadData(true));
    }
  }

  useEffect(() => {
    return () => {};
  }, []);

  if (!loaddata) {
    return <SplashScreen />;
  }

  return (
    <NavigationContainer>
      <Stack.Navigator
        headerMode={'none'}
        initialRouteName={
          check_license > -1 ? 'Home_Screen' : 'LuaChonBangLai_Screen'
        }>
        <Stack.Screen
          name="Home_Screen"
          component={Home_Screen}
          options={{
            animationEnabled: true,
          }}
        />
        <Stack.Screen
          name="Setting_Screen"
          component={Setting_Screen}
          options={{
            animationEnabled: true,
          }}
        />
        <Stack.Screen
          name="LuaChonBangLai_Screen"
          component={LuaChonBangLai_Screen}
          options={{
            animationEnabled: true,
          }}
        />
        <Stack.Screen
          name="BienBao_Screen"
          component={BienBao_Screen}
          options={{
            animationEnabled: true,
          }}
        />
        <Stack.Screen
          name="SaHinh_Screen"
          component={SaHinh_Screen}
          options={{
            animationEnabled: true,
          }}
        />
        <Stack.Screen
          name="MeoThi_Screen"
          component={MeoThi_Screen}
          options={{
            animationEnabled: true,
          }}
        />
        <Stack.Screen
          name="OnTapCauHoi_Screen"
          component={OnTapCauHoi_Screen}
          options={{
            animationEnabled: true,
          }}
        />
        <Stack.Screen
          name="OnTapCauHoi_ChiTiet_Screen"
          component={OnTapCauHoi_ChiTiet_Screen}
          options={{
            animationEnabled: true,
          }}
        />
        <Stack.Screen
          name="OnDiemLiet_ChiTiet_Screen"
          component={OnDiemLiet_ChiTiet_Screen}
          options={{
            animationEnabled: true,
          }}
        />
        <Stack.Screen
          name="BoDeThi_Screen"
          component={BoDeThi_Screen}
          options={{
            animationEnabled: true,
          }}
        />
        <Stack.Screen
          name="DanhSachDeThi_Screen"
          component={DanhSachDeThi_Screen}
          options={{
            animationEnabled: true,
          }}
        />
        <Stack.Screen
          name="ChiTiet_DeThi_Screen"
          component={ChiTiet_DeThi_Screen}
          options={{
            animationEnabled: true,
          }}
        />
        <Stack.Screen
          name="KetQua_DeThi_Screen"
          component={KetQua_DeThi_Screen}
          options={{
            animationEnabled: true,
          }}
        />
        <Stack.Screen
          name="TopCauSai_Screen"
          component={TopCauSai_Screen}
          options={{
            animationEnabled: true,
          }}
        />
        <Stack.Screen
          name="ChiTiet_DeThi_Random_Screen"
          component={ChiTiet_DeThi_Random_Screen}
          options={{
            animationEnabled: true,
          }}
        />
        <Stack.Screen
          name="KetQua_DeThi_Random_Screen"
          component={KetQua_DeThi_Random_Screen}
          options={{
            animationEnabled: true,
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default RootContainerScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
