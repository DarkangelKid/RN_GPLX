/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {
  Text,
  View,
  Platform,
  Image,
  Dimensions,
  ScrollView,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5Pro';
import {CheckBox, Divider, Button} from 'react-native-elements';
const win = Dimensions.get('window');

import {BannerAd, BannerAdSize} from '@react-native-firebase/admob';

const adUnitId =
  Platform.OS === 'ios'
    ? 'ca-app-pub-2597680723814143/1648018851'
    : 'ca-app-pub-2597680723814143/7091917221';

const Banner = (props) => {
  const [loaded, setLoaded] = useState(true);

  if (!loaded) {
    return <></>;
  }
  return (
    <BannerAd
      unitId={adUnitId}
      size={BannerAdSize.SMART_BANNER}
      requestOptions={{
        requestNonPersonalizedAdsOnly: true,
      }}
      onAdLoaded={() => {
        setLoaded(true);
      }}
      onAdFailedToLoad={(error) => {
        setLoaded(false);
      }}
    />
  );
};

export default Banner;
