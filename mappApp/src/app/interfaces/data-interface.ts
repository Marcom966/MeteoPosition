export class DataInterface {
    constructor(
        public cityName: string,
        public cityLatitude: number,
        public cityLongitude: number,
        public cityTemperature: boolean,
        public citySoilTemperature: boolean,
        public cityWeatherCode: boolean,
        public cityWind: boolean
    ) {}
}
