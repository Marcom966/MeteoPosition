import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { CityDetails } from 'src/app/interfaces/city-details';
import { DataInterface } from 'src/app/interfaces/data-interface';

@Component({
  selector: 'app-city-research',
  templateUrl: './city-research.component.html',
  styleUrls: ['./city-research.component.css']
})
export class CityResearchComponent implements OnInit {

  cityName: string[] = [];
  cityNameNew = "";
  cityNameEx = "";
  latitude = 0;
  longitude = 0;
  generalName = "";
  temperatura: boolean = false;
  wind: boolean = false;
  Soil_Temperature: boolean = false;
  Weathercode: boolean = false;
  dataToPass!: DataInterface;


  
  public cityArray: CityDetails[] = [
    new CityDetails('Milano', 45.46390450555948, 9.187906195919487),
    new CityDetails('Verona', 45.438773145471984, 10.993045864076407),
    new CityDetails('Venezia', 45.44686541123068, 12.322781534193565),
    new CityDetails('Roma', 41.902320136026475, 12.498225402554683),
    new CityDetails('Napoli', 40.85410523389443, 14.265321095824389),
    new CityDetails('Firenze', 43.77065656203347, 11.253670411006778),
    new CityDetails('Palermo', 38.11486603265903, 13.354883448810963),
  ]



  constructor() { }

  public getValues(form: NgForm){
    this.generalName = form.value.cityToChoose.cityName;
    this.cityArray.forEach(city=>{
      this.cityNameNew = city.cityName;
      if(this.cityNameNew===this.generalName){
        this.cityNameEx = city.cityName;
        this.latitude = city.latitude;
        this.longitude = city.longitude;
      }
    })
    this.temperatura = form.value.temperatura;
    this.wind = form.value.wind;
    this.Soil_Temperature = form.value.soil_temperature;
    this.Weathercode = form.value.weathercode;
    this.dataToPass = new DataInterface(this.cityNameEx, this.latitude,this.longitude, this.temperatura, this.Soil_Temperature, this.Weathercode, this.wind);

  }
  

  ngOnInit(): void {
    this.cityArray.forEach(city=>{
      let StringToIterate = city.cityName;
      this.cityName.push(StringToIterate);
    })
  }

}
