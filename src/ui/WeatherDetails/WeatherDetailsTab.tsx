import React, { useEffect, useState } from 'react';
import {
  Dimensions, FlatList, Image, StyleSheet, Text, TouchableOpacity, View,
} from 'react-native';
import moment from 'moment';
import { data, listTab } from '../../mocks/weather';
import IWeather from '../../constants/types/weatherTypes';

export default function WeatherDetailsTab({ currentWeather }: IWeather) {
  // Получаем время
  const [currentTime, setCurrentTime] = useState('');
  useEffect(() => {
    const time = moment().format('h a');
    setCurrentTime(time);
  }, []);

  // Tabs
  const [status, setStatus] = useState('Today');
  const [dataList, setDataList] = useState(data.filter((e) => e.status === 'Today'));
  const setStatusFilter = (status) => {
    setDataList([...data.filter((e) => e.status === status)]);
    setStatus(status);
  };

  const {
    main: { temp },
    weather: [details],
  } = currentWeather;
  const { icon }: any = details; // What kind of type?
  const iconUrl = `https://openweathermap.org/img/wn/${icon}@4x.png`;

  // Tabs render
  const renderItem = ({ index }: IWeather) => (
    <View key={index}>
      <View>
        <Image style={styles.weatherIcon} source={{ uri: iconUrl }} />
        <Text style={styles.weatherDetailsText}>
          {' '}
          {Math.round(temp)}
          &#176;
          {' '}
        </Text>
        <Text style={styles.weatherDetailsText}>
          {' '}
          {currentTime}
          {' '}
        </Text>
      </View>
    </View>
  );

  return (
    <View style={styles.weatherDetails}>
      <View style={styles.weatherDetailsRow}>
        <View style={styles.listTab}>
          {listTab.map((e) => (
            <TouchableOpacity
              style={[styles.btnTab, status === e.status && styles.btnTabActive]}
              onPress={() => setStatusFilter(e.status)}
            >
              <Text
                style={[styles.textTab, status === e.status && styles.textTabActive]}
              >
                {e.status}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <FlatList
        contentContainerStyle={styles.flatList}
        data={dataList}
        keyExtractor={(e, i) => i.toString()}
        renderItem={renderItem}
      />

    </View>
  );
}

const styles = StyleSheet.create({
  weatherDetails: {
    width: '100%',
    marginBottom: 80,
    justifyContent: 'center',
  },
  weatherDetailsRow: {},
  weatherDetailsBox: {
    alignItems: 'center',
  },
  weatherIcon: {
    width: 60,
    height: 60,
  },
  weatherDetailsText: {
    color: 'white',
    textAlign: 'center',
    alignItems: 'center',
  },
  listTab: {
    flexDirection: 'row',
    alignSelf: 'center',
    marginBottom: 20,
  },
  btnTab: {
    width: Dimensions.get('window').width / 3.1,
    flexDirection: 'row',
    padding: 10,
    justifyContent: 'center',
    backgroundColor: '#62708b',
  },
  btnTabActive: {
    backgroundColor: '#191a1e',
    borderBottomWidth: 4,
    borderBottomColor: 'red',
  },
  textTab: {
    color: '#aeb274',
    fontSize: 15,
    fontWeight: "bold"
  },
  textTabActive: {
    color: '#fff',
    fontWeight: "bold"
  },
  flatList: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
});
