import React, { useEffect, useState } from 'react';
import {
  ImageBackground, StatusBar, StyleSheet, Text, useWindowDimensions, View,
} from 'react-native';
import * as Location from 'expo-location';
import WeatherInfo from 'weatherInfo';
import WeatherDetailsTab from 'weatherDetails';
import config from './src/config';

export default function WeatherScreen() {
  const { styles } = useStyle();
  const [errorMessage, setErrorMessage] = useState<string | boolean>(false);
  const [currentWeather, setCurrentWeather] = useState<string | null>(null); // Принимаем данные из апи

  useEffect(() => {
    async function load() {
      try {
        const { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
          setErrorMessage(' We can`t get you geo-location :( ');
          return;
        }
        const location = await Location.getCurrentPositionAsync();
        const { latitude, longitude } = location.coords;
        const weatherUrl = `${config.BASE_URL}lat=${latitude}&lon=${longitude}&units=metric&appid=${config.API_KEY}&units=imperial`;

        const response = await fetch(weatherUrl);
        const result = await response.json();
        if (response.ok) {
          setCurrentWeather(result);
        } else {
          setErrorMessage(result.message);
        }
      } catch (error) {
        setErrorMessage(error.message);
      }
    }
    return load();
  }, []);

  if (currentWeather) {
    return (
      <View style={styles.container}>
        <View style={styles.wrap}>
          <ImageBackground style={{ flex: 1 }} source={require('./assets/images/rain.webp')}>
            <View style={styles.main}>
              <WeatherInfo currentWeather={currentWeather} />
            </View>
            <WeatherDetailsTab currentWeather={currentWeather} />
          </ImageBackground>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text>{errorMessage}</Text>
      <StatusBar barStyle="default" />
    </View>
  );
}

const useStyle = () => {
  const dimensions = useWindowDimensions();

  const styles = StyleSheet.create({
    container: {
      justifyContent: 'center',
    },
    wrap: {
      height: dimensions.height,
      width: dimensions.width,
    },
    main: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },
  });

  return { styles };
};
