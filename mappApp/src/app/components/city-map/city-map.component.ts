import { Component, Input, OnInit} from '@angular/core';
import * as L from 'leaflet';
import { Subscription } from 'rxjs';
import { DataInterface } from 'src/app/interfaces/data-interface';
import { WeatherInterface } from 'src/app/interfaces/weather-interface';
import { MapServiceService } from 'src/app/services/map-service.service';

@Component({
  selector: '[app-city-map]',
  templateUrl: './city-map.component.html',
  styleUrls: ['./city-map.component.css']
})
export class CityMapComponent implements OnInit {
  @Input() dataToPass!: DataInterface;
  map!: any;
  cityName!: string;
  cityLatitude!: number;
  cityLongitude!: number;
  temparature!: boolean;
  soilTemperature!: boolean;
  weatherCode!: boolean;
  wind!: boolean;
  requestSub = new Subscription;
  respBody!: string;
  respBodyNew!: string;
  date = new Date();
  resp2!: string;
  dateToString!: string;
  Day!: string;
  Month!: string;
  fullMonth!: string;
  Year!: number;
  DayMonthYear!: string;
  dateToNumber!: number;
  approximatedDate!: number;
  approximatedDateAgain!: string;
  approximatedDataAgainAgain!: string;
  approximatedDataAgainAgainAgain!: string;
  dateToStringAgain!: string;
  fullHour!: string;
  toSearch!: string;
  timezone!: string;
  console!: number;
  currentWeather!: number;
  weatherName!: string;
  currentSoil!: number;
  currentWind!: number;
  currentTemperature!: number;




  public openMap():void{
    let temperatura: any[] = [];
    let time: string[] = [];
    let weathercode: number[] = [];
    let windSpeed: number[] = [];
    let soil_temperature: number[] = [];
    let hourly;
    let keyPosition: number = 0;
    const values: number[] = [];
    const keys: string[] = [];
    this.cityName! = this.dataToPass.cityName.valueOf();
    this.cityLatitude = this.dataToPass.cityLatitude;
    this.cityLongitude = this.dataToPass.cityLongitude;
    this.temparature = this.dataToPass.cityTemperature;
    this.soilTemperature = this.dataToPass.citySoilTemperature;
    this.weatherCode = this.dataToPass.cityWeatherCode;
    this.wind = this.dataToPass.cityWind;
    this.requestSub = this.mapService.getValues(this.cityLatitude, this.cityLongitude, this.soilTemperature,this.temparature, this.weatherCode, this.wind).subscribe((resp)=>{
      hourly = resp['hourly'];
      time = hourly['time'];
      soil_temperature = hourly['soil_temperature_0cm'];
      weathercode = hourly['weathercode'];
      windSpeed = hourly['windspeed_10m'];
      temperatura = hourly['temperature_2m'];
      this.resp2 = JSON.stringify(this.date);
      this.dateToString = this.date.toLocaleTimeString();
      this.Day = this.date.getDate().toLocaleString('it-IT', {minimumIntegerDigits: 2, useGrouping: false});
      this.Month = (this.date.getUTCMonth() + 1).toString();
      this.fullMonth = this.Month.padStart(2, "0");
      this.Year = this.date.getFullYear();
      this.DayMonthYear = this.Year + "-" + this.fullMonth + "-" + this.Day;
      this.dateToNumber = parseInt(this.dateToString);
      this.approximatedDate = Math.round(this.dateToNumber);
      this.approximatedDateAgain = this.approximatedDate.toString();
      if (this.approximatedDateAgain.length===1){
        this.approximatedDataAgainAgain = this.approximatedDateAgain.padStart(2, "0");
        this.dateToStringAgain = this.approximatedDataAgainAgain;
      }else{
        this.dateToStringAgain = JSON.stringify(this.approximatedDate);
      }
      this.fullHour = this.dateToStringAgain+":00";
      this.toSearch = this.DayMonthYear+"T"+this.fullHour;
      this.console = time.indexOf(this.toSearch);
      if(this.weatherCode){
        this.currentWeather = weathercode[this.console].valueOf();
        let weatherEnum = Object.values(WeatherInterface);
          weatherEnum.forEach(value=>{
            if(typeof(value)==='string'){
              keys.push(value);
            }
            if(typeof(value)==='number'){
              values.push(value);
            }
          });
          for(let i=0; i<values.length; i++){
            let value = values[i].valueOf()
            if(this.currentWeather===value){
              keyPosition = i;
            }
          }
        let weather = keys[keyPosition].valueOf();
        this.weatherName = weather;
        }
        if(this.soilTemperature){
          this.currentSoil = soil_temperature[this.console].valueOf();
        }
        if(this.wind){
          this.currentWind = windSpeed[this.console].valueOf();
        }
        if(this.temparature){
          this.currentTemperature = temperatura[this.console].valueOf();
        }
        if(this.cityLatitude===0&&this.cityLongitude===0){
          window.alert("scegli una città dal dropdown");
        }
        this.map = this.map.setView([this.cityLatitude, this.cityLongitude], 13);
        L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(this.map);
        let stringWeather = "Non trovato, spuntare casella tempo";
        let stringTemperature = "Non trovato, spuntare casella temperatura";
        let stringSoil = "Non trovato, spuntare casella temperatura al suolo";
        let stringWind = "Non trovato, spuntare casella vento";

        let popup = L.popup().setContent(this.cityName+", Tempo: "+(this.weatherCode ? this.weatherName : stringWeather) +
        ", Temperatura: "+(this.temparature ? this.currentTemperature : stringTemperature) + "°C" +
        ", Temperatura al suolo: "+(soil_temperature ? this.currentSoil : stringSoil) + "°C" +
        ", Vento: "+(this.wind ? this.currentWind : stringWind) +"Km/H");
  
        L.marker([this.cityLatitude, this.cityLongitude]).addTo(this.map)
        .bindPopup(popup)
        .openPopup();
      });
    }

  public openMapNew(): void {
    this.map = L.map('map', {
      center:[41.902320136026475, 12.498225402554683],
      zoom: 3
    });
    const tiles = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 18,
      minZoom: 3,
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    });
    tiles.addTo(this.map);
  }
  
  constructor(private mapService: MapServiceService) { }
  ngAfterViewInit(): void{
    this.openMapNew();
  }

  ngOnChanges(): void{
    this.openMap();
  }

  ngOnInit(): void {
  }
  

}


