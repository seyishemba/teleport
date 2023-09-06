import { Component,Input } from '@angular/core';

@Component({
  selector: 'app-tour-schedule',
  templateUrl: './tour-schedule.component.html',
  styleUrls: ['./tour-schedule.component.css']
})
export class TourScheduleComponent {
  @Input() tourSchedule:any
  tabs = {
    clientInfo:true,
    tourDetails:false,
    coachAndDriverDetails:false,
    routes:false,
    noteDetails:false
  }

  onChangeTab(tab:string):void{
    switch(tab){
      case "clientInfo":
        this.tabs = {clientInfo:true,tourDetails:false,coachAndDriverDetails:false,routes:false,noteDetails:false}
        break;
      case "tourDetails":
        this.tabs = {clientInfo:false,tourDetails:true,coachAndDriverDetails:false,routes:false,noteDetails:false}
        break;
      case "coachAndDriverDetails":
        this.tabs = {clientInfo:false,tourDetails:false,coachAndDriverDetails:true,routes:false,noteDetails:false}
        break;
      case "routes":
        this.tabs = {clientInfo:false,tourDetails:false,coachAndDriverDetails:false,routes:true,noteDetails:false}
        break;
      case "noteDetails":
        this.tabs = {clientInfo:false,tourDetails:false,coachAndDriverDetails:false,routes:false,noteDetails:true}
        break;
    }
  }
}
