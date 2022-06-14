import React, { useEffect, useState } from 'react';
import {
  ImageBackground, StatusBar, StyleSheet, Text, useWindowDimensions, View,
} from 'react-native';
import * as Location from 'expo-location';
import WeatherInfo from 'weatherInfo';
import WeatherDetailsTab from 'weatherDetails';
import { API_KEY, BASE_URL } from './src/request/openWeatherAPI/Client';

export default function WeatherScreen() {
  const { width: windowWidth, height: windowHeight } = useWindowDimensions();
  const [errorMessage, setErrorMessage] = useState(null);
  const [currentWeather, setCurrentWeather] = useState(null);

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
        const weatherUrl = `${BASE_URL}lat=${latitude}&lon=${longitude}&units=metric&appid=${API_KEY}&units=imperial`;

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
        <View style={{ width: windowWidth, height: windowHeight }}>
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

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
  },
  main: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
