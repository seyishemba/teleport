import { Component, Injector, OnInit } from '@angular/core';
import { TableColumn } from 'pilgrim-ng-ui-library';
import { catchError, forkJoin, map, mergeMap, of, switchMap, take } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { PagedResultDtoOfGetQuoteRequestForViewDto, QuoteRequestsServiceProxy } from '@shared/service-proxies/service-proxies';
import { AppComponentBase } from '@shared/common/app-component-base';

@Component({
  selector: 'app-invoices-list',
  templateUrl: './invoices-list.component.html',
  styleUrls: ['./invoices-list.component.css'],
})
export class InvoicesListComponent extends AppComponentBase implements OnInit {
  constructor(
    injector: Injector,
    private route: ActivatedRoute,
    private router: Router,
    private quoteService: QuoteRequestsServiceProxy
  ) {
    super(injector);
  }

  ngOnInit(): void {  }
}
