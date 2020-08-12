import React, {useEffect, useState, useRef} from 'react';
import {StyleSheet, Text, View, Platform} from 'react-native';

import {
  InterstitialAd,
  TestIds,
  AdEventType,
} from '@react-native-firebase/admob';
const adUnitId =
  Platform.OS === 'ios'
    ? 'ca-app-pub-2597680723814143/9334937183'
    : 'ca-app-pub-2597680723814143/4565949946';

const interstitial = InterstitialAd.createForAdRequest(adUnitId);

const Interstitial = () => {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const showInterstitialAd = () => {
      interstitial.onAdEvent((type, error) => {
        if (type === AdEventType.LOADED) {
          interstitial.show();
          setLoaded(true);
        }
      });

      interstitial.load();
    };
    showInterstitialAd();
    return () => {};
  }, []);
  return <></>;
};

export default Interstitial;

const styles = StyleSheet.create({});
