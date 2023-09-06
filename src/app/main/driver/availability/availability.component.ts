import { Component, ViewChild } from '@angular/core';
import { AppComponentBase } from '@shared/common/app-component-base';
import { RequestTimeOffComponent } from '../modal/request-time-off/request-time-off.component';

@Component({
    selector: 'app-availability',
    templateUrl: './availability.component.html',
    styleUrls: ['./availability.component.css'],
})
export class AvailabilityComponent extends AppComponentBase {
    @ViewChild('requestTimeOffModal', { static: true }) requestTimeOffModal: RequestTimeOffComponent;
    filters: {
        filterText: string;
        // creationDateRangeActive: boolean;
        // subscriptionEndDateRangeActive: boolean;
        // selectedEditionId: number;
    } = <any>{};

    // constructor(){}

    showRequestModal(): void {
        this.requestTimeOffModal.modal.show();
    }
}
