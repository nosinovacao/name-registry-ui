import { Component, Inject, OnInit } from '@angular/core';
import { Service } from '../service.model';
import { ServiceService } from '../service.service';
import { ActivatedRoute, Params, Router } from "@angular/router";
import { Observable } from "rxjs/Observable";

@Component({
    selector: 'serviceDetails',
    templateUrl: './service-details.component.html'
})
export class ServiceDetailsComponent implements OnInit {
    public serviceId: string;
    service: Service;

    constructor(
        private serviceService: ServiceService,
        private route: ActivatedRoute,
        private router: Router,
    ) { }

    ngOnInit(): void {
        this.route.params
            .switchMap((params: Params) => {
                this.serviceId = params['id'];
                return this.serviceService.getService(this.serviceId)
            })
            .subscribe((service: Service) => {
                console.log("im here");
                if (service === undefined)
                    this.router.navigateByUrl('/404');
                this.service = service;
            });
    }
}