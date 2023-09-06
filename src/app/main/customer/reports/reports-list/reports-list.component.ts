import { Component, Injector, OnInit } from '@angular/core';
import { TableColumn } from 'pilgrim-ng-ui-library';
import { catchError, forkJoin, map, mergeMap, of, switchMap, take } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { PagedResultDtoOfGetQuoteRequestForViewDto, QuoteRequestsServiceProxy } from '@shared/service-proxies/service-proxies';
import { AppComponentBase } from '@shared/common/app-component-base';

@Component({
  selector: 'app-reports-list',
  templateUrl: './reports-list.component.html',
  styleUrls: ['./reports-list.component.css'],
})
export class ReportsListComponent extends AppComponentBase implements OnInit {
    isModalOpen = false;
    filterPillsList: string[] = [];
    dropDownSortingList: string[] = ['Report Date'];
    tableColumns: TableColumn[] = [
        {
            key: 'pin',
            title: 'Pinned'
        },
        {
            key: 'title',
            title: 'Title'
        },
        {
            key: 'date',
            title: 'Date'
        },
        {
            key: 'type',
            title: 'Type'
        },
        {
            key: 'status',
            title: 'Status'
        },
        {
            key: 'action',
            title: 'Actions'
        }
    ];

    reportList: any[] = [];

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private injector: Injector
    ){
        super(injector);
    }

    ngOnInit(): void{
        this.getAllReports();
    }

    getAllReports(): void {
       /* this.reportsService.getAll()
            .pipe(take(1))
            .subscribe((response) => {
                if (response && response.success){
                    this.reportList = response.data;
                }
            });*/
    }

    onOpenAddReportModal() {
        this.isModalOpen = true;
    }

    onCloseModal() {
        this.isModalOpen = false;
    }

    onAddFilterPill(filterText: string): void {
        this.filterPillsList.push(filterText);
    }

    onRemoveFilterPill(pillIndex: number): void {
        this.filterPillsList.splice(pillIndex, 1);
    }
}
