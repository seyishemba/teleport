import { Component, OnChanges, Input } from '@angular/core';
import { Calendar } from '@fullcalendar/core';
import resourceTimelinePlugin from '@fullcalendar/resource-timeline';
// import { Vehicle } from 'src/app/shared/models/vehicle.model';
// import { VehicleService } from 'src/app/leasing-agent/vehicles/vehicles.service';
import { take } from 'rxjs';
import {filter} from 'smart-array-filter'
import { ViewChild, ElementRef } from "@angular/core";    
import {Spinner} from 'spin.js';
import { Table } from 'primeng/table';

@Component({
  selector: 'app-coaches',
  templateUrl: './coaches.component.html',
  styleUrls: ['./coaches.component.css']
})
export class CoachesComponent  {
  // vehiclesList:Vehicle[] = []
  // @Input() searchParams: String
  // searchParams:any

  @ViewChild("statusCheckBox") statusCheckBox: ElementRef;  
  @ViewChild("typeCheckBox") typeCheckBox: ElementRef;  
  @ViewChild("dateCheckBox") dateCheckBox: ElementRef;  
  loading = false
  showDetails = false
  hideList = true
  calendar:any
  startDate:any
  endDate:any
  coachesListRaw:any
  resourceGroupField: 'groupId'
  products =[{
    id: '1000',
    code: 'f230fh0g3',
    name: 'Bamboo Watch',
    description: 'Product Description',
    image: 'bamboo-watch.jpg',
    price: 65,
    category: 'Accessories',
    quantity: 24,
    inventoryStatus: 'INSTOCK',
    rating: 5
},
]
  coachesList:any = [
    { 
      id: 1, title: 'Coach',  'eventColor': 'green', 
      metadata: { 
          type: "Crew", 
          status : "z", 
          availability: "" , 
          vehicleId: 2, 
          bunkConfiguration: 4, 
          tours: [], 
          start:  "2023-08-07T02:00:00", 
          end: "2023-08-07T07:00:00", 
          tags : ["1"] 
        } 
    },
    { 
      id: 2, title: 'Coach2',  'eventColor': 'black', 
      metadata: { 
          type: "Crew", 
          status : "", 
          availability: "" , 
          vehicleId: "3", 
          bunkConfiguration: 4, 
          tours: [], 
          start:  "2023-08-07T02:00:00", 
          end: "2023-08-07T07:00:00", 
          tags : ["2", "1"] 
        } 
    },
    { 
      id: 3, title: 'Coach3',  'eventColor': 'black', 
      metadata: { 
          type: "Pilot", 
          status : "", 
          availability: "" , 
          vehicleId: "3", 
          bunkConfiguration: 4, 
          tours: [], 
          start:  "2023-08-07T02:00:00", 
          end: "2023-08-07T07:00:00", 
          tags : ["2", "1"] 
        } 
    },
    { 
      id: 4, title: 'Coach4',  'eventColor': 'blue', 
      metadata: { 
          type: "General", 
          status : "", 
          availability: "" , 
          vehicleId: "3", 
          bunkConfiguration: 4, 
          tours: [], 
          start:  "2023-08-07T02:00:00", 
          end: "2023-08-07T07:00:00", 
          tags : ["2", "1"],
          tours_durations : [2323,2323,2323,2323]
        } 
    },
    { 
      id: 5, title: 'Coach5',  'eventColor': 'red', 
      metadata: { 
          type: "General", 
          status : "", 
          availability: "" , 
          vehicleId: "3", 
          bunkConfiguration: 4, 
          tours: [], 
          start:  "2023-08-07T02:00:00", 
          end: "2023-08-07T07:00:00", 
          tags : ["2", "1"] 
        } 
    },
  ]
  filteredList:any
  searchParams=''
  searchBatch:any = {
    "title":"",
    "tags": [],
    "filters": [{"type": false, "val": ""}, { "availability" : false, "val": ""}],
  }
  addTag(){
    return  prompt('Tagname?')
  }
  removeTag(value){
    this.searchBatch.tags = this.searchBatch.tags.filter(item => item !== value)

  }
  constructor(
    // private vehicleService:VehicleService
  ){
     this.filteredList = this.coachesList
     this.detectUrl()
  }

  detectUrl(){
    let tag = []
    const urlParams = new URLSearchParams(window.location.search).get('tags');
    const tags = urlParams;
    if(urlParams !== null && urlParams !== undefined){
      tag = tags.split(',')
    }
    console.log(tag)
    this.searchBatch.tags = tag
  }

  ngAfterContentInit(){
   
// document.addEventListener('DOMContentLoaded', function() {
  let calendarEl: HTMLElement = document.getElementById('calendar')!;
  // let resources = this.coachesList
  let events = []
  function generateDemoData(){
    for(let i=0; i< 10; i++){
        let Coach = {id: i, title : "Coach "+ i }
        let event = { id: '1', resourceId: 'a', start: '2023-08-07T02:00:00', end: '2023-12-07T07:00:00', title: 'event 1' }

        this.resources.push(Coach)        
        this.events.push(event)        
    }
  }
  this.calendar = new Calendar(calendarEl, {
    // plugins: [ adaptivePlugin, interactionPlugin, dayGridPlugin, listPlugin, timeGridPlugin, resourceTimelinePlugin ],

    plugins: [ resourceTimelinePlugin ],
    // initialView: 'resourceTimeline',
    schedulerLicenseKey: '0649893590-fcs-1682010678',
    now: '2023-08-24',
    customButtons: {
      resultsButton: {
        text: this.coachesList.length  + ' total results',
        click: function() {
          alert('clicked the custom button!');
        }
      }
    },
    editable: true, // enable draggable events
    aspectRatio: 1.8,
    scrollTime: '00:00', // undo default 6am scrollTime
    headerToolbar: {
      left: 'resultsButton',
      center: 'title',
        right: 'resourceTimelineDay,resourceTimelineWeek,resourceTimelineThreeDays,today,prev,next'
    },
    initialView: 'resourceTimelineThreeDays',
    views: {
      resourceTimelineThreeDays: {
        type: 'resourceTimelineMonth',
        duration: { months: 3 },
        buttonText: '3 Months'
      }
    },
    resourceAreaHeaderContent: 'Coach',
    resources: this.coachesList,
    // resources: [],
    events: [
      { id: '1', resourceId: '1', start: '2023-08-07T02:00:00', end: '2023-09-07T07:00:00', title: 'event 1' },
      { id: '1', resourceId: '1', start: '2023-10-15T02:00:00', end: '2023-12-07T07:00:00', title: 'event 1' },
      { id: '2', resourceId: '2', start: '2023-08-07T05:00:00', end: '2023-12-07T22:00:00', title: 'event 2' },
      { id: '3', resourceId: '3', start: '2023-08-06', end: '2023-12-08', title: 'event 3' },
      { id: '4', resourceId: '4', start: '2023-08-07T03:00:00', end: '2023-12-07T08:00:00', title: 'event 3' },
      { id: '4', resourceId: '5', start: '2023-08-07T03:00:00', end: '2023-12-07T08:00:00', title: 'event 4' },
      { id: '4', resourceId: 'e', start: '2023-08-07T03:00:00', end: '2023-12-07T08:00:00', title: 'event 5' },
      // { id: '5', resourceId: 'i', start: '2023-03-18T00:30:00', end: '2023-12-07T02:30:00', title: 'event 5' },
      { id: '5', resourceId: 'f', start: '2023-08-20T00:30:00', end: '2023-12-20T02:30:00', title: 'event 5' },
      { id: '5', resourceId: 'g', start: '2023-08-07T00:30:00', end: '2023-03-18T02:30:00', title: 'event 5' }
    ]
  });

  this.calendar.render();
// });





  }

  updateData(){
    let update = [
      { id: 'd', title: 'Coach 4', eventColor: 'red' },
      { id: 'e', title: 'Coach 5', eventColor: 'blue' },
      { id: 'f', title: 'Coach 6', eventColor: 'green' },
      { id: 'g', title: 'Coach 7', eventColor: 'black' },
      { id: 'h', title: 'Coach 8', eventColor: 'black' },
      { id: 'j', title: 'Coach 9' },
      { id: 'k', title: 'Coach 10' },
      { id: 'l', title: 'Coach 11' },
      { id: 'm', title: 'Coach 12' },
      { id: 'n', title: 'Coach 13' },
      { id: 'o', title: 'Coach 14' },
      { id: 'p', title: 'Coach 15' },
      { id: 'z', title: 'Coach 22' },
      { id: 'r', title: 'Coach 17' },
      { id: 's', title: 'Coach 18' },
      { id: 't', title: 'Coach 19' },
      { id: 'u', title: 'Coach 20' },
      { id: 'v', title: 'Coach 21' }]

      // this.calendar.addResource(update);
      // this.calendar.refetchResources(update);

  }

  showLoading(){
    this.loading = true
    setTimeout(() => {
    this.loading = false
      
    }, 1500);
  }

  Rerender(){
    this.showLoading()
     let calendarEl: HTMLElement = document.getElementById('calendar')!;
    
    this.calendar = new Calendar(calendarEl, {
      // plugins: [ adaptivePlugin, interactionPlugin, dayGridPlugin, listPlugin, timeGridPlugin, resourceTimelinePlugin ],
  
      plugins: [ resourceTimelinePlugin ],
      initialView: 'resourceTimeline',
      schedulerLicenseKey: '0649893590-fcs-1682010678',
      now: '2023-08-07',
      editable: true, // enable draggable events
      aspectRatio: 1.8,
      customButtons: {
        resultsButton: {
          text: this.filteredList.length  + ' total results',
          click: function() {
            alert('clicked the custom button!');
          }
        }
      },
      scrollTime: '00:00', // undo default 6am scrollTime
      headerToolbar: {
        left: 'resultsButton',
        center: 'title',
        right: 'resourceTimelineDay,resourceTimelineWeek,resourceTimelineThreeDays,today prev,next'
      },
      // initialView: 'resourceTimelineThreeDays',
      views: {
        resourceTimelineThreeDays: {
          type: 'resourceTimelineMonth',
          duration: { months: 3 },
          buttonText: '3 Months'
        }
      },
      resourceAreaHeaderContent: 'Coach',
      resources: this.filteredList,
      // resources: [],
      events: [
        { id: '1', resourceId: '1', start: '2023-08-07T02:00:00', end: '2023-12-07T07:00:00', title: 'event 1' },
        { id: '2', resourceId: '2', start: '2023-08-07T05:00:00', end: '2023-12-07T22:00:00', title: 'event 2' },
        { id: '3', resourceId: '3', start: '2023-08-06', end: '2023-12-08', title: 'event 3' },
        { id: '4', resourceId: '4', start: '2023-08-07T03:00:00', end: '2023-12-07T08:00:00', title: 'event 3' },
        { id: '4', resourceId: '5', start: '2023-08-07T03:00:00', end: '2023-12-07T08:00:00', title: 'event 4' },
        { id: '4', resourceId: '6', start: '2023-08-07T03:00:00', end: '2023-12-07T08:00:00', title: 'event 5' },
        // { id: '5', resourceId: 'i', start: '2023-03-18T00:30:00', end: '2023-12-07T02:30:00', title: 'event 5' },
        { id: '5', resourceId: 'f', start: '2023-08-20T00:30:00', end: '2023-12-20T02:30:00', title: 'event 5' },
        { id: '5', resourceId: 'g', start: '2023-08-07T00:30:00', end: '2023-03-18T02:30:00', title: 'event 5' }
      ]
    });
  
    this.calendar.render();
  // });
}
    

render(){
  return
  this.coachesList = [{ 
    id: 1, title: 'Coach',  'eventColor': 'green', 
    metadata: { 
        type: "Crew", 
        status : "", 
        availability: "" , 
        vehicleId: 2, 
        bunkConfiguration: 4, 
        tours: [], 
        start:  "2023-08-07T02:00:00", 
        end: "2023-08-07T07:00:00", 
        tags : ["1"] 
      } 
  }]
  console.log(this.coachesList)
  console.log(this.calendar.getResources())
  this.calendar.refetchResources();
  this.calendar.refetchResources();

}


onChange() {    
    this.statusCheckBox.nativeElement.checked != this.statusCheckBox.nativeElement.checked ;  
    console.log(this.statusCheckBox.nativeElement.checked )
    this.customFilters()
  }  


  clearFilter() {    
    this.statusCheckBox.nativeElement.checked = false ;  
    this.typeCheckBox.nativeElement.checked = false ;  
    this.dateCheckBox.nativeElement.checked = false ;  

    console.log(this.typeCheckBox.nativeElement)
    // this.el.nativeElement.checked != this.el.nativeElement.checked ;  
    // console.log(this.el.nativeElement.checked )
  }  


customFilters(){
  let filters = {"type": null, "available": null, "date": null}
  filters.type =  ( this.typeCheckBox.nativeElement.checked ? true : false )
  filters.available =  ( this.statusCheckBox.nativeElement.checked ? true : false )
  filters.date =  ( this.dateCheckBox.nativeElement.checked ? true : false )
  console.log(filters)
  return filters
}

multiFilter(params){

  let filteredList=this.coachesList
  let searchBatch = this.searchBatch
  console.log(searchBatch)
  let getCustomFilters:any = this.customFilters()
  console.log(getCustomFilters)
  let dateFilters = {start: this.startDate, end: this.endDate} 
  dateFilters.start = 100
  dateFilters.end = 200
        // Function to filter objects based on selected tags
        function multiFilter(type, params, data) {
          let result = {"data": []}
          if( params == '' || params == undefined || params == null){
            
            const filteredData = data.filter(item => true );
            result.data.push(filteredData)
            console.log(filteredData, 'empty!')
          }else{

          let filteredData:any = filter(data, {
            keywords: [params, ...searchBatch.tags], // search for any field that contains the "gorilla" string
            // predicate: 'OR',
          });
          if(getCustomFilters.type !== null){
            
          }
          if(getCustomFilters.availability !== null){
            
          }
          if(getCustomFilters.date !== null){
            // console.log(item.tours_durations)
            let datefilteredData = filteredData
            filteredData =  datefilteredData.filter(item => {
              console.log(item.metadata.tours_durations)
              console.log(dateFilters)
              let rangeValid = false
              let isStartEnd = { "start": 0, "end": 0, "next": 0 }
              let canShow = item.metadata.tours_durations.forEach((item, index) => {

                // let start, end
                if((index & 1) == 0){
                  console.log(item + 'start')
                  isStartEnd.start = item
                }else{
                  console.log(item + 'end')
                  isStartEnd.end = item
                }
                isStartEnd.next = item.metadata.tours_durations[index+1];
                if(rangeValid == false){
                  if(index !== undefined){
                    if(getCustomFilters.date.start > isStartEnd.end && getCustomFilters.date.end < isStartEnd.next){
                       rangeValid =true
                    }
                  }else{
                    rangeValid =true
                  }
                }
                return rangeValid
                // console.log(dateFilters)
              });
              return canShow
            });
          }
          result.data.push(filteredData)
          console.log(filteredData)
         
          // if(searchBatch.tags.length > 0){
          //   console.log(searchBatch.tags.length)
          //   const filteredData = data.filter(object => {
              // result.data.push( data.every(tag => object.metadata.tags.includes(searchBatch.tags[0])))
          //   });
          //   console.log(result.data, 'tags')
          // }

          // if(searchBatch.filters[0].type !== null){
          //   const filteredData = data.filter(item => item.metadata.type == params );
          //   result.data.push(filteredData)
          //   console.log(filteredData, 'type')
          // }

          // if(searchBatch.filters[1].vehicleId !== null){
          //   const filteredData = data.filter(item => item.metadata.vehicleId == searchBatch.filters[1].vehicleId );
          //   result.data.push(filteredData)
          //   console.log(filteredData, 'vehicle')
          // }

          }
          console.log(filteredList, 'final');
          console.log(result.data[0], 'result')
              return result.data[0];
        }

        //  params = "Crew"; 
        // const filteredObjects = multiFilter('tags', params, resources);
        // console.log(filteredObjects, 'filteredObjects final');
        this.filteredList = multiFilter('type', params, filteredList);
        // const filteredObjects2 = multiFilter('type', params, resources);
        
        console.log(this.filteredList, 'final');
        this.Rerender()
}


}