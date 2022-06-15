export type TypeDetails = {
    icon: string | number,
    main: string
};

export type TypeTemp = {
    temp: number,
};

export type TypeWeather = {
    time: string,
    currentTime: string,
    status: string,
    main: TypeTemp,
    weather: string,
    name: string,
};

export default interface IWeather {
    index?: number,
    iconUrl?: string,
    currentWeather: TypeWeather,
    details?: TypeDetails,
    temp?: number,
};
