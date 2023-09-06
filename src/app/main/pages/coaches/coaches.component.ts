import { Component, OnChanges, Input, OnInit } from '@angular/core';
import { Calendar } from '@fullcalendar/core';
import { CalendarOptions } from '@fullcalendar/core';
// import { FullCalendarComponent } from '@fullcalendar/angular';
import resourceTimelinePlugin from '@fullcalendar/resource-timeline';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms'; // Import other necessary modules

import {ReactiveFormsModule, FormsModule } from '@angular/forms';







// import { Vehicle } from 'src/app/shared/models/vehicle.model';
// import { VehicleService } from 'src/app/leasing-agent/vehicles/vehicles.service';
import { take } from 'rxjs';
import {filter} from 'smart-array-filter'
import { ViewChild, ElementRef } from "@angular/core";    
import {Spinner} from 'spin.js';
import { Table } from 'primeng/table';
import { SortEvent } from 'primeng/api';





@Component({
  selector: 'app-coaches',
  templateUrl: './coaches.component.html',
  styleUrls: ['./coaches.component.css']
})
export class CoachesComponent  {
 
  
  @ViewChild("statusCheckBox") statusCheckBox: ElementRef;  
  @ViewChild("typeCheckBox") typeCheckBox: ElementRef;  
  @ViewChild("dateCheckBox") dateCheckBox: ElementRef;  
  // @ViewChild('calendar') calendarComponent: FullCalendarComponent;

 

  


  hi: FormGroup | undefined;
  date: Date | undefined;
  loading = false
  showDetails = false
  hideList = true
  searchValue: string;
  calendar:any
  filteredCalendar:any
  startDate:any
  defaultView = true;
  endDate:any
  coachesListRaw:any
  resourceGroupField: 'groupId'
  currentTimeline = 'coaches'
  coachesList:any= [
    {
        "id": 0,
        "Title": "Taylor Swift",
        "Type": "Motorcoaches",
        "Trailer": "Sleeper Trailers",
        "Driver": "Mary A.",
        "Tours": "Taylor Swift",
        "Availability": "False"
    },
    {
        "id": 1,
        "Title": "World Tour",
        "Type": "Charter coaches",
        "Trailer": "Production Trailers",
        "Driver": "John Smith",
        "Tours": "World Tour",
        "Availability": "True"
    },
    {
        "id": 2,
        "Title": "Summer Vibes Tour",
        "Type": "Touring coaches",
        "Trailer": "Wardrobe Trailers",
        "Driver": "Emily Johnson",
        "Tours": "Summer Vibes Tour",
        "Availability": "False"
    },
    {
        "id": 3,
        "Title": "Electric Nights Tour",
        "Type": "Shuttle coaches",
        "Trailer": "Catering Trailers",
        "Driver": "Michael Williams",
        "Tours": "Electric Nights Tour",
        "Availability": "True"
    },
    {
        "id": 4,
        "Title": "City Lights Tour",
        "Type": "Sleeper coaches",
        "Trailer": "VIP Trailers",
        "Driver": "Emma Jones",
        "Tours": "City Lights Tour",
        "Availability": "False"
    },
    {
        "id": 5,
        "Title": "Dreamscape Tour",
        "Type": "Double-decker coaches",
        "Trailer": "Office Trailers",
        "Driver": "David Brown",
        "Tours": "Dreamscape Tour",
        "Availability": "True"
    },
    {
        "id": 6,
        "Title": "Wildfire Tour",
        "Type": "School buses",
        "Trailer": "Equipment Trailers",
        "Driver": "Olivia Davis",
        "Tours": "Wildfire Tour",
        "Availability": "False"
    },
    {
        "id": 7,
        "Title": "Starstruck Tour",
        "Type": "Motorcoaches",
        "Trailer": "Mobile Stage",
        "Driver": "Daniel Miller",
        "Tours": "Starstruck Tour",
        "Availability": "True"
    },
    {
        "id": 8,
        "Title": "Neon Dreams Tour",
        "Type": "Charter coaches",
        "Trailer": "Production Trailers",
        "Driver": "Ava Wilson",
        "Tours": "Neon Dreams Tour",
        "Availability": "False"
    },
    {
        "id": 9,
        "Title": "Moonlit Serenade Tour",
        "Type": "Touring coaches",
        "Trailer": "Sleeper Trailers",
        "Driver": "Matthew Taylor",
        "Tours": "Moonlit Serenade Tour",
        "Availability": "True"
    }
]
  filteredList:any
  searchParams=''
  searchBatch:any = {
    "title": null,
    "tags": [],
    "type": null,
    "availability": null,
    "events":{
      "from": null,
      "to": null,
    },
    "freeform": []
  }

  events =[
      { id: '1', resourceId: '1', start: '2023-08-07',  type: "Coach", end: '2023-09-07', title: 'Neon Dreams Tour' },
      { id: '3', resourceId: '2', start: '2023-08-05', type: "Driver", end: '2023-09-07', title: 'Starstruck Tour' },
      { id: '2', resourceId: '3', start: '2023-08-07', type: "Coach", end: '2023-09-17', title: 'Mercedes-Benz Tourismo' },
      { id: '5', resourceId: '4', start: '2023-08-12', type: "Coach", end: '2023-08-13', title: 'Dreamscape Tour	' },
      { id: '4', resourceId: '5', start: '2023-08-10', type: "Driver", end: '2023-08-15', title: 'Wildfire Tour' },
      { id: '8', resourceId: '6', start: '2023-08-20', type: "Driver", end: '2023-09-02', title: 'Moonlit Serenade Tour' },
      { id: '7', resourceId: '7', start: '2023-09-01', type: "Coach", end: '2023-09-07', title: 'Scania Touring' },

      { id: '6', resourceId: '0', start: '2023-08-04', type: "Driver", end: '2023-09-07', title: 'Summer Vibes Tour' },
  ]

  filteredEvents = null


  constructor(private fb: FormBuilder){
    this.hi = this.fb.group({
      date: new FormControl<Date | null>(null)
      // Define your form controls here
    });
     this.coachesListRaw = this.coachesList
     this.filteredEvents = this.events
    //  this.detectUrl()
  }
  freeFormSearch(event){
    // console.log(this.searchBatch.title)
    // if(this.searchBatch.title !== '' && this.searchBatch.title !== null && this.searchBatch.title !== undefined){
    //   this.hideList =false

    //   let freeForm = this.coachesList
    //   freeForm = filter(freeForm, {
    //     keywords: [this.searchBatch.title], // search for any field that contains the "gorilla" string
    //     // predicate: 'OR',
    //   });
    //   this.freeForm = freeForm
    //   console.log(freeForm)
    // }
    // this.hideList =true

  }
  seedData(){
    let randomDataSet = {
      "Title": [
        "Mercedes-Benz Tourismo",
        "Volvo 9700",
        "Scania Touring",
        "Setra S 531 DT",
        "Irizar i8",
        "Van Hool TX",
        "MAN Lion's Coach",
        "Neoplan Tourliner",
        "Temsa Safari HD",
        "Bova Futura",
        ],
      "Type": [
        "Motorcoaches",
        "Charter coaches",
        "Touring coaches",
        "Shuttle coaches",
        "Sleeper coaches",
        "Double-decker coaches",
        "School buses",
        "Motorcoaches",
        "Charter coaches",
        "Touring coaches",
      ],
      "Trailer": [
        "Sleeper Trailers",
        "Production Trailers",
        "Wardrobe Trailers",
        "Catering Trailers",
        "VIP Trailers",
        "Office Trailers",
        "Equipment Trailers",
        "Mobile Stage",
        "Production Trailers",
        "Sleeper Trailers",
      ],
      "Driver": [
        "Mary A.", 
        "John Smith",
        "Emily Johnson",
        "Michael Williams",
        "Emma Jones",
        "David Brown",
        "Olivia Davis",
        "Daniel Miller",
        "Ava Wilson",
        "Matthew Taylor",
        "Sophia Anderson",
        "Andrew Thomas",
        "Mia Martinez",
        "James Clark",
        "Isabella Rodriguez",
        "Joseph Lee",
        "Charlotte Hernandez",
        "William Lewis",
        "Amelia Walker",
        "Benjamin Hall",
        "Harper Young"],
      "Tours": [
        "Taylor Swift",  
        "World Tour",
        "Summer Vibes Tour",
        "Electric Nights Tour",
        "City Lights Tour",
        "Dreamscape Tour",
        "Wildfire Tour",
        "Starstruck Tour",
        "Neon Dreams Tour",
        "Moonlit Serenade Tour",
        "Enchanted Journey Tour",
        "Euphoria Tour",
        "Rhythm Revolution Tour",
        "Soulful Sounds Tour",
        "Melodic Odyssey Tour",
        "Harmony Haven Tour",
        "Vibrant Beats Tour",
        "Luminous Nights Tour",
        "Mystic Melodies Tour",
        "Groove Express Tour",
        "Sunset Serenade Tour"],
      "Availability": ["True", "False"],
    }
  let data = [
    
  ]
  let single = 0
    for(let x= 0; x< 10; x++){
      if(single == 0){
        single=1
      }else{
        single = 0
      }
      let item = {
        "id": x,
        "Title": randomDataSet.Title[x],
        "Type": randomDataSet.Type[x],
        "Trailer": randomDataSet.Trailer[x],
        "Driver": randomDataSet.Driver[x],
        "Tours": randomDataSet.Tours[x],
        "Availability": randomDataSet.Availability[single],
      }
      data.push(item)
    }
    console.log(data)
  }
  detectUrl(){
    let tag = []
    const urlParams = new URLSearchParams(window.location.search).get('tags');
    const tags = urlParams;
    if(urlParams !== null && urlParams !== undefined){
      tag = tags.split(',')
    }
    this.searchBatch.tags = tag
  }

  addTag(){
    return  prompt('Tagname?')
  }
  removeTag(value){
    this.searchBatch.tags = this.searchBatch.tags.filter(item => item !== value)
  }


  clear(table: Table) {
    table.clear();
  }


  ngAfterContentInit(){
    this.searchBatch.freeForm = this.coachesList
    // this.driverTimeline()
    this.filteredTimeline()
    // this.coachTimeline()
  }

  coachTimeline(){
    let event:any = this.events
    console.log(event)
    let calendarEl: HTMLElement = document.getElementById('timeline')!;
  
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
        left: '',
        center: 'title',
          right: 'today,prev,next'
      },
      initialView: 'threemonths',
      views: {
        threemonths: {
          type: 'resourceTimelineMonth',
          duration: { months: 3 },
          buttonText: ''
        }
      },
      resourceAreaHeaderContent: 'Coach',
      resources: this.coachesList,
      resourceAreaWidth: '1px',
      // resources: [],
      
      // events: [
      //   { id: '1', resourceId: '1', start: '2023-08-07', end: '2023-09-07', title: 'Volvo 9700' },
      //   { id: '2', resourceId: '1', start: '2023-08-07', end: '2023-09-07', title: 'Mercedes-Benz Tourismo' },
      //   { id: '3', resourceId: '1', start: '2023-08-03', end: '2023-09-07', title: 'Temsa Safari HD	' },
      //   { id: '4', resourceId: '2', start: '2023-08-12', end: '2023-09-07', title: 'Scania Touring' },
      // ]

      eventSources: [
        // your event source
        // function(fetchInfo, successCallback, failureCallback) {
        //   // ...
        //   console.log(fetchInfo)
        // }
        this.events,
        {
          events:[],
          color: 'yellow',   // an option!
          textColor: 'black' // an option!
        }
        // any other sources...
      ]
    });
  
    this.calendar.render();
  }
  driverTimeline(){

    let calendarEl: HTMLElement = document.getElementById('timeline')!;
    let driverResources:any = [ {"id": 1,"Title": "Daniel Miller", eventColor: '#fff0b6'}, {"id":2,"Title": "Emma Jones", eventColor: '#fff0b6'}, {"id": 3,"Title": "Olivia Davis", eventColor: '#fff0b6'}, {"id": 4,"Title": "Michael Williams	", eventColor: '#fff0b6'}, ]
    let events = []
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
        left: '',
        center: 'title',
          right: 'today,prev,next'
      },
      initialView: 'threemonths',
      views: {
        threemonths: {
          type: 'resourceTimelineMonth',
          duration: { months: 3 },
          buttonText: ''
        }
      },
      resourceAreaHeaderContent: 'Coach',
      resources: driverResources,
      // resourceAreaWidth: '1px',
      // resources: [],
      events: [
        { id: '1', resourceId: '1', start: '2023-08-05', end: '2023-09-07', title: 'Emma Jones' },
        { id: '2', resourceId: '1', start: '2023-08-04', end: '2023-09-07', title: 'Williams M.' },
        { id: '3', resourceId: '1', start: '2023-08-10', end: '2023-09-07', title: 'Olivia Davis' },
        { id: '4', resourceId: '2', start: '2023-08-05', end: '2023-09-07', title: 'Emily Johnson' },
      ]
    });
  
    this.calendar.render();
  }

  onChange() {    
    this.statusCheckBox.nativeElement.checked != this.statusCheckBox.nativeElement.checked ;  
    console.log(this.statusCheckBox.nativeElement.checked )
    // this.customFilters()
  }  



multiFilter(params){

  let filteredList = this.coachesListRaw
  let searchBatch = this.searchBatch
  console.log(searchBatch)
        // Function to filter objects based on selected tags
        function multiFilter(type, params, data) {
          let result = {"data": []}
          
            let filteredData:any 

          if(searchBatch.title !== null){
             filteredData = filter(data, {
              keywords: [searchBatch.title], // search for any field that contains the "gorilla" string
              // predicate: 'OR',
            });
          }
            console.log(filteredData, 'Title filter')
  
  
            if(searchBatch.type !== null){
              filteredData = filter(data, {
                keywords: [searchBatch.type], // search for any field that contains the "gorilla" string
                // predicate: 'OR',
              });
            }
            console.log(filteredData, 'Type filter')

            if(searchBatch.availability !== null){
              filteredData = filter(data, {
                keywords: [searchBatch.availability], // search for any field that contains the "gorilla" string
                // predicate: 'OR',
              });
            }
            console.log(filteredData, 'Available filter')
            result.data.push(filteredData)
            console.log(filteredData)
            console.log(result)
            
              return result.data[0];

          }

        this.coachesList = multiFilter('type', params, filteredList);
        
        console.log(this.coachesList, 'final');
}

onInputChange(event: Event): void {
  // You can access the input value using event.target.value
  this.searchBatch["title"] = (event.target as HTMLInputElement).value;
  if (this.searchBatch.title.length > 0) {
    this.multiFilter(this.searchBatch.title)
  }

  // You can perform any desired actions with the input value here
}

showLoading(){
  this.loading = true
  setTimeout(() => {
  this.loading = false
    
  }, 1500);
}


clearFilter() {    
  // this.statusCheckBox.nativeElement.checked = false ;  
  // this.typeCheckBox.nativeElement.checked = false ; 
  let confirmAction = confirm('Are you sure you want to clear filters?')
  if(confirmAction){
    this.searchBatch = {
      "title": null,
      "tags": [],
      "type": null,
      "availability": null,
      "events":{
        "from": null,
        "to": null,
      }
    }
    window.location.reload()

  }
}  


customFilters(){
  let filters = {"type": null, "available": null}
  filters.type =  ( this.typeCheckBox.nativeElement.checked ? true : false )
  filters.available =  ( this.statusCheckBox.nativeElement.checked ? true : false )
  console.log(filters)
  this.processFilters(filters)
  return filters
}
processFilters(filter){
// if(filter.available){
  let filteredData =  this.coachesList.filter(item => {
      return item.Availability == filter.available
  })
  this.coachesList = filteredData
// }
}
startPop(){
  var divElement = document.getElementById('popup');

  // Add a mousemove event listener to the document
  document.addEventListener('mousemove', function(event) {
    // Get the mouse coordinates
    var mouseX = event.clientX;
    var mouseY = event.clientY;

    // Set the position of the div based on the mouse offset
    divElement.style.left = mouseX + 'px';
    divElement.style.top = mouseY + 'px';

    // Show the div
    divElement.style.display = 'block';
    divElement.style.position = 'absolute';
  });
}
eventFilter(){
  let events = this.events
  
  function filterEventsByDateRange(events, startDate, endDate) {
    return events.filter(event =>{
      if(new Date(startDate) < new Date(event.start)){
        return new Date(endDate) < new Date(event.start) && new Date(endDate) < new Date(event.start)
      }
      if(new Date(startDate) > new Date(event.start)){
        return new Date(startDate) > new Date(event.end) && new Date(endDate) > new Date(event.end)
      }
    }
    );
  }
  
  // Example usage
  this.filteredEvents = filterEventsByDateRange(events, this.searchBatch.events.from, this.searchBatch.events.to);
  this.filteredTimeline()
}

filteredTimeline(){
  let event:any = this.filteredEvents
  let eventColor = '#d1e7ff'
  if(this.searchBatch.events.from !== null || this.searchBatch.events.to !== null){
    for(let x = 0; x < event.length; x++){
      event[x].start = this.searchBatch.events.from
      event[x].end = this.searchBatch.events.to
      event[x].title = 'Available'
      eventColor = '#d3ffd1'
    }
  }

  let popUp = "<div style='position: absolut; top: 430px; left: 300px'>sd</div>"
  console.log(event)
  let calendarEl: HTMLElement = document.getElementById('filteredTimeline')!;

  this.filteredCalendar = new Calendar(calendarEl, {
    // plugins: [ adaptivePlugin, interactionPlugin, dayGridPlugin, listPlugin, timeGridPlugin, resourceTimelinePlugin ],

    plugins: [ resourceTimelinePlugin ],
    eventMouseLeave: function(info) {
      var divElement = document.getElementById('popup');
    divElement.style.display = 'none';
    },
    eventMouseEnter: function(info) {
      // alert('Event: ' + info.event.title);
      // alert('Coordinates: ' + info.jsEvent.pageX + ',' + info.jsEvent.pageY);
      // alert('View: ' + info.view.type);
      console.log(info.event)
      console.log(info.jsEvent)
      
      // Get the reference to the div element
       
      // change the border color just for fun
      var divElement = document.getElementById('popup');
      let content = 'Showing info for event: ' + info.event.title + ' from: ' + info.event.startStr  + ' to: ' + info.event.endStr 
        // Set the position of the div based on the mouse offset
        divElement.textContent = content
    divElement.style.left = info.jsEvent.screenX  - 90 + 'px';
    divElement.style.top = info.jsEvent.screenY - 200 + 'px';

    // Show the div
    divElement.style.display = 'block';
    divElement.style.position = 'absolute';

  // Add a mousemove event listener to the document
  // document.addEventListener('mousemove', function(event) {
  //   // Get the mouse coordinates
  //   var mouseX = event.clientX;
  //   var mouseY = event.clientY;

  //   // Set the position of the div based on the mouse offset
  //   divElement.style.left = mouseX + 'px';
  //   divElement.style.top = mouseY + 'px';

  //   // Show the div
  //   divElement.style.display = 'block';
  //   divElement.style.position = 'absolute';
  // });

    },
    // initialView: 'resourceTimeline',
    schedulerLicenseKey: '0649893590-fcs-1682010678',
    now: '2023-08-24',
    customButtons: {
      resultsButton: {
        text: this.filteredEvents.length  + ' total results',
        click: function() {
          alert('clicked the custom button!');
        }
      }
    },
    
    editable: true, // enable draggable events
    aspectRatio: 1.8,
    scrollTime: '00:00', // undo default 6am scrollTime
    headerToolbar: {
      left: '',
      center: 'title',
        right: 'today,prev,next'
    },
    initialView: 'threemonths',
    views: {
      threemonths: {
        type: 'resourceTimelineMonth',
        duration: { months: 3 },
        buttonText: ''
      }
    },
    resourceGroupField: 'groupId',
    resourceAreaHeaderContent: 'Coach',
    resources: this.coachesList,
    resourceAreaWidth: '1px',
    // resources: [],
    
    // events: [
    //   { id: '1', resourceId: '1', start: '2023-08-07', end: '2023-09-07', title: 'Volvo 9700' },
    //   { id: '2', resourceId: '1', start: '2023-08-07', end: '2023-09-07', title: 'Mercedes-Benz Tourismo' },
    //   { id: '3', resourceId: '1', start: '2023-08-03', end: '2023-09-07', title: 'Temsa Safari HD	' },
    //   { id: '4', resourceId: '2', start: '2023-08-12', end: '2023-09-07', title: 'Scania Touring' },
    // ]

    eventSources: [
      // your event source
      // function(fetchInfo, successCallback, failureCallback) {
      //   // ...
      //   console.log(fetchInfo)
      // }
      // this.filteredEvents,
      {
        events:event,
        color: eventColor,   // an option!
        textColor: 'black' // an option!
      }
      // any other sources...
    ]
  });

  this.filteredCalendar.render();
}


}