import { Component, OnInit } from '@angular/core';
import { DataServiceService } from 'src/app/services/data-service.service';
import { GlobalDataSummary } from 'src/app/models/gloabl-data';
import { DateWiseData } from 'src/app/models/date-wise-data';
import { merge } from 'rxjs';
import { map } from 'rxjs/operators';


@Component({
  selector: 'app-countries',
  templateUrl: './countries.component.html',
  styleUrls: ['./countries.component.css']
})

export class CountriesComponent implements OnInit {

//   data : GlobalDataSummary[];
//   countries : string[] = [];
//   totalConfirmed = 0;
//   totalActive = 0;
//   totalDeaths = 0;
//   totalRecovered = 0;
//   selectedCountryData : DateWiseData[]; 
//   dateWiseData ;
//   loading = true;
//   datatable = [];
//   lineChart : GoogleChartInterface = {
//     chartType: 'LineChart'
//   }
//   // pie = 'PieChart'
//   // linechart:'LineChart'
//   constructor(private service : DataServiceService) { }

//   ngOnInit(): void {

//     merge(
//       this.service.getDateWiseData().pipe(
//         map(result=>{
//           this.dateWiseData = result;
//         })
//       ), 
//       this.service.getGlobalData().pipe(map(result=>{
//         this.data = result;
//         this.data.forEach(cs=>{
//           this.countries.push(cs.country)
//         })
//       }))
//     ).subscribe(
//       {
//         complete : ()=>{
//          this.updateValues('US')
//          this.loading = false;
//         }
//       }
//     )
//   }

//   updateChart(){
//     let dataTable = [];
//     dataTable.push(["Date" , 'Cases'])
//     this.selectedCountryData.forEach(cs=>{
//       dataTable.push([cs.date , cs.cases])
//     })

//     this.lineChart = {
//       chartType: 'LineChart',
//       dataTable: dataTable,
//       //firstRowIsData: true,
//       options: {
//         height : 500, 
//         animation:{
//           duration: 1000,
//           easing: 'out',
//         },
//       },
//     };
//   }

//   // updateChart()
//   // {
//   //   let dt=[];
//   //   this.selectedCountryData.forEach(cs=>{
//   //         dt.push([cs.cases,cs.date])
//   //        })
//   //        console.log(dt);
//   //   this.datatable = dt;
//   // }

//   updateValues(country : string){
//     console.log(country);
//     this.data.forEach(cs=>{
//       if(cs.country == country){
//         this.totalActive = cs.active
//         this.totalDeaths = cs.deaths
//         this.totalRecovered = cs.recovered
//         this.totalConfirmed = cs.confirmed
//       }
//     })

//     this.selectedCountryData  = this.dateWiseData[country]
//     // console.log(this.selectedCountryData);
//     this.updateChart();
    
//   }

// }

















data : GlobalDataSummary[];
countries : string[] = [];
totalConfirmed = 0;
totalActive = 0;
totalDeaths = 0;
totalRecovered = 0;
selectedCountryData : DateWiseData[]; 
dateWiseData ;
loading = true;
options: {
  height : 500, 
  animation:{
    duration: 1000,
    easing: 'out',
  },
}
chart = {
  PieChart : "PieChart" ,
  ColumnChart : 'ColumnChart' ,
  LineChart : "LineChart", 
  height: 500, 
  options: {
    animation:{
      duration: 1000,
      easing: 'out',
    },
    is3D: true
  }  
}

constructor(private service : DataServiceService) { }

ngOnInit(): void {

  merge(
    this.service.getDateWiseData().pipe(
      map(result=>{
        this.dateWiseData = result;
      })
    ), 
    this.service.getGlobalData().pipe(map(result=>{
      this.data = result;
      this.data.forEach(cs=>{
        this.countries.push(cs.country)
      })
    }))
  ).subscribe(
    {
      complete : ()=>{
       this.updateValues('India')
       this.loading = false;
      }
    }
  )
}
updateChart(){
  let dataTable = [];
  dataTable.push(["Date" , 'Cases'])
  this.selectedCountryData.forEach(cs=>{
    dataTable.push([cs.date , cs.cases])
  })
}
updateValues(country : string){
  console.log(country);
  this.data.forEach(cs=>{
    if(cs.country == country){
      this.totalActive = cs.active
      this.totalDeaths = cs.deaths
      this.totalRecovered = cs.recovered
      this.totalConfirmed = cs.confirmed
    }
  })

  this.selectedCountryData  = this.dateWiseData[country]
  // console.log(this.selectedCountryData);
  this.updateChart();
  
}

}