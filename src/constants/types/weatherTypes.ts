export type TypeDetails = {
    main: string,
    icon: string
};

export type TypeTemp = {
    temp: number
};

export type TypeWeather = {
    time: string,
    currentTime: string,
    status: string,
    main: TypeTemp,
    weather: TypeDetails[],
    name: string,
};

export default interface IWeather {
    index?: number,
    iconUrl?: string,
    currentWeather: TypeWeather,
};
