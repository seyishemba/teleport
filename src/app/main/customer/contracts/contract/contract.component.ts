import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { take } from 'rxjs';

@Component({
    selector: 'app-contract',
    templateUrl: './contract.component.html',
    styleUrls: ['./contract.component.css'],
})
export class ContractComponent implements OnInit {
    contractId?: number;
    contract?: any;

    constructor(private route: ActivatedRoute) // private contractService: ContractService,
    // private templateService: ContractTemplateService,
    // private sectionService: SectionService,
    // private customerService: CustomersService,
    // private leasingAgentService: LeasingAgentService,
    // private tourBookingService: TourBookingService,
    // private tourRequestService: TourBookingRequestService
    {}

    ngOnInit(): void {
        this.route.paramMap.subscribe((params) => {
            this.contractId = Number(params.get('id'));

            this.getContract();
        });
    }

    getContract(): void {
        // try {
        //     if (this.contractId) {
        //         this.contractService
        //             .getOne(this.contractId)
        //             .pipe(take(1))
        //             .subscribe((response) => {
        //                 if (response && response.success) {
        //                     this.contract = response.data;
        //                     // get template
        //                     const templateId = this.contract.templateId;
        //                     if (templateId) {
        //                         this.templateService
        //                             .getOne(templateId)
        //                             .pipe(take(1))
        //                             .subscribe((response) => {
        //                                 if (response && response.success) {
        //                                     this.contract!.template = response.data;
        //                                 }
        //                             });
        //                     }
        //                     // get sections
        //                     this.sectionService
        //                         .getAllByParams('contractId', this.contractId)
        //                         .pipe(take(1))
        //                         .subscribe((response) => {
        //                             if (response && response.success) {
        //                                 this.contract!.sections = response.data;
        //                             }
        //                         });
        //                     // get customer
        //                     const customerId = this.contract.customerId;
        //                     if (customerId) {
        //                         this.customerService
        //                             .getOne(customerId)
        //                             .pipe(take(1))
        //                             .subscribe((response) => {
        //                                 if (response && response.success) {
        //                                     this.contract!.customer = response.data;
        //                                 }
        //                             });
        //                     }
        //                     // get leasing agent
        //                     const leasingAgentId = this.contract.leasingAgentId;
        //                     if (leasingAgentId) {
        //                         this.leasingAgentService
        //                             .getOne(leasingAgentId)
        //                             .pipe(take(1))
        //                             .subscribe((response) => {
        //                                 if (response && response.success) {
        //                                     this.contract!.leasingAgent = response.data;
        //                                 }
        //                             });
        //                     }
        //                     // get tour
        //                     const tourId = this.contract.tourRequestId;
        //                     if (tourId) {
        //                         this.tourRequestService
        //                             .getOne(tourId)
        //                             .pipe(take(1))
        //                             .subscribe((response) => {
        //                                 if (response && response.success) {
        //                                     this.contract!.tourRequest = response.data;
        //                                 }
        //                             });
        //                     }
        //                     console.log(this.contract);
        //                 }
        //             });
        //     }
        // } catch (error) {
        //     console.log(error);
        // }
    }
}
