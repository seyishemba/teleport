import { TableColumn } from 'pilgrim-ng-ui-library';
import { CdkDragDrop, CdkDropList, CdkDrag, moveItemInArray } from '@angular/cdk/drag-drop';
import { Component, Input, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder, FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { AddStopComponent } from '../add-stop/add-stop';


@Component({
  selector: 'app-route-management',
  templateUrl: './route.component.html',
  styleUrls: ['./route.component.css']
})


export class RouteManagementComponent {
  // @ViewChild('createModal', { static: true }) modal: ModalDirective;
  @ViewChild('addStopModal', { static: true }) stopModal: AddStopComponent;

  @Input() invoice: any;
  displayLabel: any;
  dropDown = false;
  active = false;
  saving = false;


  tourRoutes = [
    {
      seq: 1,
      location: { name: 'NashVielle Garage', type: 1, location_id: 2 },
      departure_date: '2023-08-13T15:00Z',
      leg_miles: 21,
      leg_duration: 32,
    },
    {
      seq: 3,
      location: { name: 'Tennesse ', type: 1, location_id: 2 },
      departure_date: '2023-08-04T24:00Z',
      leg_miles: 21,
      leg_duration: 32,
    },
    {
      seq: 5,
      location: { name: 'New York', type: 1, location_id: 2 },
      departure_date: '2023-08-03T19:00Z',
      leg_miles: 21,
      leg_duration: 32,
    },
    {
      seq: 2,
      location: { name: 'NashVielle Garage', type: 1, location_id: 2 },
      departure_date: '2023-08-05T14:00Z',
      leg_miles: 21,
      leg_duration: 32,
    }
  ];

  places = [
    {
      name: 'California',
      id: '1'
    },
    {
      name: 'Texas',
      id: '2'
    },
    {
      name: 'New York',
      id: '3'
    },
    {
      name: 'Missisipi',
      id: '4'
    },
    {
      name: 'New Mexico',
      id: '5'
    },
    {
      name: 'Fargo',
      id: '6'
    },


  ];


  garages = [
    { name: 'Nashville Garage', location: 'Nashville', state: 'Tennessee' },
    { name: 'Los Angeles Garage', location: 'Los Angeles', state: 'California' },
    { name: 'Houston Garage', location: 'Houston', state: 'Texas' },
    { name: 'Miami Garage', location: 'Miami', state: 'Florida' },
    { name: 'Chicago Garage', location: 'Chicago', state: 'Illinois' },
    { name: 'Denver Garage', location: 'Denver', state: 'Colorado' },
    { name: 'Atlanta Garage', location: 'Atlanta', state: 'Georgia' },
    { name: 'Seattle Garage', location: 'Seattle', state: 'Washington' },
    { name: 'Dallas Garage', location: 'Dallas', state: 'Texas' },
    { name: 'Boston Garage', location: 'Boston', state: 'Massachusetts' },
    // ... Add more locations as needed
  ];


  productServices: any = [];
  allInvoices: any = [];
  showAddRoute = false;

  title = 'quickbooks';
  quickTable: FormGroup;
  routeForm: FormGroup;
  totalAmount = 0;
  constructor(private fb: FormBuilder) {
    this.quickTable = this.fb.group({
      recordsArray: this.fb.array([])
    });

    this.routeForm = this.fb.group({
      location: '',
      time: '',
      departure_date: [''],
      leg_miles: [''],
      leg_drive_time: [''],
    });


  }

  get records() {
    return this.quickTable.get('recordsArray') as FormArray;
  }






  formatDate(dateString: string) {
    const parsedDate = new Date(dateString);

    const year = parsedDate.getUTCFullYear();
    const month = (parsedDate.getUTCMonth() + 1).toString().padStart(2, '0'); // Month is 0-indexed
    const day = parsedDate.getUTCDate().toString().padStart(2, '0');

    const hours = parsedDate.getUTCHours();
    const minutes = parsedDate.getUTCMinutes();
    return `${year}-${month}-${day}`;
  }

  formatTime(dateString: string) {
    const parsedDate = new Date(dateString);

    const hours = parsedDate.getUTCHours();
    const minutes = parsedDate.getUTCMinutes();

    // Format hours and minutes as strings with leading zeros
    const formattedHours = hours.toString().padStart(2, '0');
    const formattedMinutes = minutes.toString().padStart(2, '0');
    return `${formattedHours}:${formattedMinutes}`;
  }



  newRecord() {
    return this.fb.group({
      location: '',
      time: '',
      departure_date: ['', Validators.required],
      leg_miles: [0],
      leg_drive_time: [0],
    });
  }

  ngOnInit() {


    this.loadInvoices();

  }

  getPlaces($event: any) {
    console.log('r', $event);
  }

  loadInvoices() {
    let length = this.tourRoutes.length;
    this.tourRoutes.sort((a, b) => new Date(a.departure_date).getTime() - new Date(b.departure_date).getTime());

    if (this.tourRoutes[0].location.type === 1) {
      this.records.push(this.newRecord());

    }

    for (let i = 0; i < this.tourRoutes.length; i++) {

      let newData = this.fb.group({
        location: this.tourRoutes[i]['location']['location_id'],
        time: this.formatTime(this.tourRoutes[i]['departure_date']),
        departure_date: [this.formatDate(this.tourRoutes[i]['departure_date']), Validators.required],
        leg_miles: this.tourRoutes[i]['leg_miles'],
        leg_drive_time: this.tourRoutes[i]['leg_duration'],
      });
      this.records.push(newData);

    }

    if (this.tourRoutes[length - 1].location.type === 1) {
      this.records.push(this.newRecord());
    }

  }

  addRecord() {
    this.records.push(this.newRecord());
  }

  deleteRecord(index: number) {
    this.records.removeAt(index);
  }


  checkLastRow(index: number) {
    if (this.records.length == index + 1) {
      // this.addRecord()
    }
  }
  drop(event: any) {

    moveItemInArray(event?.container.data?.controls, event.previousIndex, event.currentIndex)
  }



  selectAllText(event: any) {
    let input = event.target;
    input.select();
  }

  selectItem(item: any) {
    console.log(item);
    this.displayLabel = item?.name;
  }

  onFocus() {
    this.dropDown = true;
  }

  onBlur() {
    this.dropDown = false;
  }



  getSelection(event: any, index: number) {

    console.log(event);
    this.records.at(index).get('location')?.setValue(event?.id);

  }

  submit() {
    console.log(this.quickTable.invalid);
    console.log(this.quickTable.value);
    console.log(this.quickTable.invalid);
    // for (let i of this.quickTable.value) {

    // }
  }

  addStop() {
    this.showAddRoute = true;
  }

  hideRouteModal() {

    console.log(this.routeForm.value);
    this.prepareData(this.routeForm.value);
    this.showAddRoute = false;
  }

  prepareData(data: any) {

    let obj = {
      seq: 2,
      location: { name: data?.location, type: 1, location_id: 2 },
      departure_date: data.departure_date,
      leg_miles: data?.leg_miles,
      leg_duration: data?.leg_drive_time
    };

    let newData = this.fb.group({
      location: obj['location']['name'],
      time: this.formatTime(obj['departure_date']),
      departure_date: [this.formatDate(obj['departure_date']), Validators.required],
      leg_miles: obj['leg_miles'],
      leg_drive_time: obj['leg_duration'],
    });
    // this.changeSequence(obj)
    console.log(this.quickTable);
    this.records.push(newData);

    let position = this.changeSequence(obj);
    let recordArr = this.quickTable?.controls['recordsArray'] as FormArray;
    moveItemInArray(recordArr.controls, recordArr.length - 1, position);

    // moveItemInArray(event?.container.data?.controls, event.previousIndex, event.currentIndex)
    this.changeSequence(obj);
  }

  changeSequence(obj: any) {
    //Binary Search to sort

    let objDate = this.formatDate(obj?.depature_date);
    const insertDate = new Date(obj.departure_date);

    let tourValues = this.records.value;
    console.log('val', tourValues);
    console.log('len', this.records.length);

    let low = 0;
    let high = tourValues.length - 1;
    let mid;
    console.log('high', high);

    while (low <= high) {
      mid = Math.floor((low + high) / 2);

      console.log('mid', mid);
      console.log('tour', tourValues[mid]);
      console.log('insert', insertDate);

      const currentDate = new Date(tourValues[mid].departure_date);

      if (insertDate < currentDate) {
        high = mid - 1;
        console.log('high', high);
      } else {
        low = mid + 1;
        console.log('low', low);
      }
    }

    // return low;
    console.log('l', low);
    //this.tourRoutes.splice(low, 0, obj);

    return low;
  }

  onShown(): void {
    document.getElementById('TenancyName').focus();
  }

  createModal() {
    this.stopModal.show();
  }


}
