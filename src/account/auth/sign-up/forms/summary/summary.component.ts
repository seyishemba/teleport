import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { CreateOrEditDriverDto, DriversServiceProxy } from '@shared/service-proxies/service-proxies';
import { NotifyService } from 'abp-ng2-module';

@Component({
    selector: 'app-summary',
    templateUrl: './summary.component.html',
    styleUrls: ['./summary.component.css'],
})
export class SummaryComponent implements OnInit {
    @Input() personalInfo: any;
    @Input() otherDetails: any;
    @Input() emergency: any;
    @Output() goBack = new EventEmitter();

    driver: CreateOrEditDriverDto;

    url: any;
    constructor(
        private sanitizer: DomSanitizer,
        private driverService: DriversServiceProxy,
        private notify: NotifyService,
        private router: Router,
        ) {}

    ngOnInit(): void {
        this.url = this.sanitizer.bypassSecurityTrustUrl(URL.createObjectURL(this.personalInfo.file));
    }


    createDriver(){
        const driverDto: CreateOrEditDriverDto = {
            baseUser: {
                firstName: this.personalInfo.fullName.substring(0, this.personalInfo.fullName.indexOf(' ')),
                emailAddress: this.personalInfo.email,
                lastName: this.personalInfo.fullName.substring(this.personalInfo.fullName.indexOf(' ') + 1),
                phoneNumber: this.personalInfo.phoneNumber,
            },
            nickName: this.personalInfo.nickName,
            dateOfBirth: this.personalInfo.dateOfBirth,
            shirtSize: this.personalInfo.shirtSize,
            homeAddress: this.personalInfo.homeAddress,
            cdlClass: this.personalInfo.cdlClass,
            homeAirpot: this.otherDetails.homeAirpot,
            tsaPreCheck: this.otherDetails.precheck,
            isSmoker: this.otherDetails.doYouSmoke,
            passportNumber: this.otherDetails.passportNumber,
            passportIssueDate: this.otherDetails.passportIssueDate,
            passportCountry: this.otherDetails.passportCountry,
            primaryContactName: this.emergency.primary.fullName,
            primaryContactRelationship: this.emergency.primary.relationship,
            primaryContactPhone: this.emergency.primary.phoneNumber,
            secondaryContactName: this.emergency.secondary.fullName,
            secondaryContactRelationship: this.emergency.secondary.relationship,
            secondaryContactPhone: this.emergency.secondary.phoneNumber,
            maritalStatus: this.otherDetails.maritalStatus,
            seatingPreference: this.otherDetails.seatingPreference,
        } as CreateOrEditDriverDto;

    this.driverService.createOrEdit(driverDto).pipe()
        .subscribe((result) => {
            this.notify.success('Driver Created Successfully');
            this.router.navigate(['/']);
        });
    }
}
