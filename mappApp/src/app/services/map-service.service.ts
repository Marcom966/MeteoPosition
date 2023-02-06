import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class MapServiceService {
    url = "";
    firstLink = "";
    newLink = "";
    toConcatTemp = "temperature_2m,"
    toConcatWind = "windspeed_10m,"
    toConcatSoil = "soil_temperature_0cm,"
    toConcatWeatherCode = 'weathercode,'
    resp: any = undefined;

    constructor(private _http: HttpClient) { }
    public getValues(latitude: number, longitude: number, soilTemperature: boolean, Temperature: boolean, weatherCode: boolean, Wind: boolean): Observable<any>{
      this.firstLink = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&hourly=`
        if(soilTemperature){
          this.newLink = this.firstLink + this.toConcatSoil;
        }
        if(Temperature){
          this.newLink = this.firstLink + this.toConcatTemp;
        }
        if(weatherCode){
          this.newLink = this.firstLink + this.toConcatWeatherCode;
        }
        if(Wind){
          this.newLink = this.firstLink + this.toConcatWind;
        }
        if(weatherCode&&soilTemperature){
          this.newLink = this.firstLink + this.toConcatWeatherCode + this.toConcatSoil;
        }
        if(weatherCode&&Temperature){
          this.newLink = this.firstLink + this.toConcatWeatherCode + this.toConcatTemp;
        }
        if(weatherCode&&Wind){
          this.newLink = this.firstLink + this.toConcatWeatherCode + this.toConcatWind;
        }
        if(soilTemperature&&Temperature){
          this.newLink = this.firstLink + this.toConcatTemp + this.toConcatWeatherCode;
        }
        if(soilTemperature&&Wind){
          this.newLink = this.firstLink + this.toConcatSoil + this.toConcatWind;
        }
        if(weatherCode&&Temperature&&Wind){
          this.newLink = this.firstLink + this.toConcatTemp + this.toConcatWeatherCode  + this.toConcatWind;
        }
        if(Wind&&Temperature&&soilTemperature){
          this.newLink = this.firstLink + this.toConcatWind + this.toConcatSoil + this.toConcatTemp;
        }
        if(Temperature&&weatherCode&&soilTemperature){
          this.newLink = this.firstLink + this.toConcatTemp + this.toConcatWeatherCode + this.toConcatSoil;
        }
        if(Wind&&weatherCode&&soilTemperature){
          this.newLink = this.firstLink + this.toConcatWind + this.toConcatWeatherCode + this.toConcatSoil;
        }
        if(Temperature&&Wind&&soilTemperature&&weatherCode){
          this.newLink = this.firstLink + this.toConcatTemp + this.toConcatWind + this.toConcatSoil + this.toConcatWeatherCode;
        }
        
      this.url = this.newLink.slice(0, -1);
    return this._http.get<any>(this.url);
        
  }
}
