module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      [
        'module-resolver',
        {
          extensions: ['.js', '.jsx', '.ts', '.tsx', '.es', '.es6', '.mjs'],
          root: ['./src'],
          alias: {
            mocksData: './src/mocks/weather.ts',
            weatherTypes: './src/constants/types/weatherTypes.ts',
            weatherDetails: './src/ui/WeatherDetails/WeatherDetailsTab.tsx',
            weatherInfo: './src/screens/WeatherInfo/WeatherInfo.tsx',
          },
        },
      ],
    ],
  };
};
