import { HttpClient } from '@angular/common/http';
import { Component, Injector, OnInit } from '@angular/core';
import { TableColumn } from 'pilgrim-ng-ui-library';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, forkJoin, map, of, switchMap, take } from 'rxjs';
import { AppComponentBase } from '@shared/common/app-component-base';


@Component({
  selector: 'app-drivers-tour-schedules',
  templateUrl: './tour-schedule-list.component.html',
  styleUrls: ['./tour-schedule-list.component.css'],
})
export class TourSchedulesListComponent extends AppComponentBase implements OnInit {
  viewTourSchedule:boolean = false;
  selectedTourSchedule:any = {};
  filterPillsList: string[] = [];
  dropDownSortingList: string[] = [
    'Status',
    'Date',
    'Tour Date',
    'Amount'
  ];
  subPages:{title:string,selected:boolean}[] = [{title:"Schedules",selected:true},{title:"Pickup Sheet",selected:false}]
  tableColumns: TableColumn[] = [
    {
      key: 'date',
      title: 'Date',
    },
    {
      key: 'name',
      title: 'Tour Name',
    },
    {
      key: 'coach',
      title: 'Coaches'
    },
    {
      key: 'status',
      title: 'Status',
    },
    {
      key: 'view',
      title: '',
    },
  ];
  tourSchedulesList = [{date:"20th August, 2023",name:"Taylor Swift 2023",coach:"Neptune 990",status:"Complete"},{date:"20th August, 2023",name:"Taylor Swift 2023",coach:"Mercedes Benz 250",status:"Pending"},{date:"20th August, 2023",name:"Taylor Swift 2023",coach:"Van Nimo 123",status:"Pending"}];

  constructor(
    private injector:Injector,
    private http: HttpClient,
    private route: ActivatedRoute,
    private router: Router,
  ) {
    super(injector);
  }

  ngOnInit() {
  }

  onAddFilterPill(filterText: string): void {
    this.filterPillsList.push(filterText);
  }

  onRemoveFilterPill(pillIndex: number): void {
    this.filterPillsList.splice(pillIndex, 1);
  }

  onChangePage(selectedPage:string){
    this.subPages = [...this.subPages.map(page=> page.title === selectedPage ? {...page,selected:true}:{...page,selected:false}),]
  }


  onViewTourSchedule():void{
    this.viewTourSchedule = true;
  }

  onCloseTourScheduleView(){
    this.viewTourSchedule = false;
  }

  getTenants(event:any){}
}
