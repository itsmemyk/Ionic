import {Page} from 'ionic-framework/ionic';
import {Http} from 'angular2/http';
import 'rxjs/Rx';
import {Logger} from './../../providers/logger';
import {Inject} from 'angular2/core';

@Page({
  templateUrl: 'build/pages/page1/page1.html',
  providers: [Logger]
})

export class Page1 {
  countryList: Array<string>;  
  selectedCountry: string;
  cityList: Array<string>;
  selectedCity: string;
  forecast: any;
  coord: any;
  weather: any;
  wind: any;
  url: string;
  
  constructor(http : Http, logg : Logger) {
      this.url = "http://api.openweathermap.org/data/2.5/weather";
      this.http = http;
      this.countryList = ["IN","UK"];
      this.selectedCountry = this.countryList[0];
      
      this.cityList = ["Surat","Mumbai","Delhi","Pune","Ahmedbad","Banglore","London","Paris"];
      this.selectedCity = this.cityList[0];
      
      this.getWeatherReport();
      this.forecast = {};
      this.weather = {};
      this.coord = {};
      this.wind = {};
      
      logg.log("Just Demo Log");
  }
  //http://api.openweathermap.org/data/2.5/weather?q=surat,IN&appid=44db6a862fba0b067b1930da0d769e98
  getWeatherReport(){
      
    this.http.get(this.url+"?q="+this.selectedCity+","+this.selectedCountry+"&appid=44db6a862fba0b067b1930da0d769e98")
        .retry(3)
        .map(res => res.json()).subscribe(
            data => {
                this.forecast = data;
                this.coord = data.coord;
                this.weather = data.weather[0];
                this.wind = data.wind;
            });
  }
  
  ngOnInit(){
      let configOptions = { color : { backgroundColor:'blue', foregroundColor:'red' }};
      let rangeOptions = [1000,200,3000];
      
      /*
      //let {backgroundColor: bgColor, foregroundColor} = configOptions;
      let [first,second,third] = rangeOptions;
      let {color : {backgroundColor : fgColor}} = configOptions;
      
      let { a, b, c, d } = this.test(10,20);
       
      console.log(a,b,c,d);
      console.log(fgColor);
      
      let {small:sm,sortedValues,big} =this.sort(10,20,30,40,5,6,1,45,0,-20,-10,45,687,345) 
      console.log("Min Value " + sm );
      console.log("Other Value " + sortedValues );
      console.log("Max Value " + big );
      */
      
  //    console.log(`Min Value : ${this.min(10,20,30,5,2,8)} `);
  
    let session = new Map();
    session.set(1,'Mayank');
    
    console.log(`Have a Mayank Login ${session.entries()}`);
  }
  
  test(a=0,b=0,c=0,d=0){
      
      return { a, b, c, d}; 
  }
  
  
  min(...values){
      let [minValue] = values;
      
      values.forEach(v => {
          if(minValue > v){
              minValue = v;
          }
      })
      
      return minValue;
  }
  
  sort(...values){
      
      let total = values.length;
      
      for(var i=0;i< total;i++){
          
          for(var j=i+1;j < total;j++){
              if(values[i] > values[j]){
                  let temp = values[i];
                  values[i] = values[j];
                  values[j] = temp;                   
              }
          }
      }
      
      return { small:values[0], sortedValues:values, big:values[total-1] };
  }
}
/*

class Pony {
    constructor(color='red'){
        this._color = color;
    }
    
    get color(){
        console.log(`get color`);
        
        return this._color;
    }
    
    set color(value){
        this._color = value;
        
        console.log(`setting color ${this._color} `);
    }
}

let turtle = new Pony();
turtle.color = "white";
console.log(turtle.color);*/
