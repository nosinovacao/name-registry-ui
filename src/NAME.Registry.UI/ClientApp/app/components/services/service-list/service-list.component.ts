import { ActivatedRoute, Router, NavigationExtras } from "@angular/router";
import { Component, Inject, OnInit } from '@angular/core';
import { Service } from '../service.model';
import { ServiceService } from '../service.service';
import { ServiceFilter } from '../service-filter.model';
import { LoadingBarComponent } from '../../shared/loadingbar.component';

import { Subject } from 'rxjs/Subject';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';

// Observable operators
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/share';
import 'rxjs/add/operator/finally';
import 'rxjs/add/observable/of';

@Component({
    selector: 'serviceList',
    templateUrl: './service-list.component.html'
})
export class ServiceListComponent implements OnInit {
    public services: Observable<Service[]>;
    public servicesFilter: ServiceFilter;
    public isLoading: BehaviorSubject<boolean>;

    private searchFilters: Subject<ServiceFilter>;


    constructor(
        private serviceService: ServiceService,
        private route: ActivatedRoute,
        private router: Router
    ) {
        this.servicesFilter = {
            hostname: '',
            appName: '',
            appVersion: '',
            lastPingMinimumMinutesAgo: 0
        };
        this.searchFilters = new BehaviorSubject<ServiceFilter>(this.servicesFilter);
        this.isLoading = new BehaviorSubject<boolean>(false);
    }

    ngOnInit(): void {
        this.services = this.searchFilters
            .debounceTime(300)
            // Does not work
            // .distinctUntilChanged((first: ServiceFilter, second: ServiceFilter) => first.appName === second.appName && first.appVersion === second.appVersion && first.hostname === second.hostname)
            .switchMap(term => {
                if (term) {
                    this.isLoading.next(true);
                    return this.serviceService.getServices(term)
                        .then((services) => {
                            services.sort((a, b) => {
                                if (a.CurrentSession === undefined)
                                    return 1;
                                if (b.CurrentSession === undefined)
                                    return -1;
                                let left = Number(new Date(a.CurrentSession.LastPing));
                                let right = Number(new Date(b.CurrentSession.LastPing));
                                return right - left;
                            });
                            this.isLoading.next(false);
                            return services;
                        });
                } else {
                    return new Promise<Service[]>(undefined);
                }
            });


        this.route.queryParams
            .subscribe(params => {
                this.servicesFilter.appName = params['appName'] || this.servicesFilter.appName;
                this.servicesFilter.appVersion = params['appVersion'] || this.servicesFilter.appVersion;
                this.servicesFilter.hostname = params['hostname'] || this.servicesFilter.hostname;
                this.servicesFilter.lastPingMinimumMinutesAgo = params['lastPingMinimumMinutesAgo'] || this.servicesFilter.lastPingMinimumMinutesAgo;

                this.searchFilters.next(this.servicesFilter);
            });
    }

    filterChanged(): void {
        let queryParams: any = {};
        if (this.servicesFilter.appName)
            queryParams.appName = this.servicesFilter.appName;
        if (this.servicesFilter.appVersion)
            queryParams.appVersion = this.servicesFilter.appVersion;
        if (this.servicesFilter.hostname)
            queryParams.hostname = this.servicesFilter.hostname;
        if (this.servicesFilter.lastPingMinimumMinutesAgo)
            queryParams.lastPingMinimumMinutesAgo = this.servicesFilter.lastPingMinimumMinutesAgo;

        this.router.navigate([], { queryParams: queryParams });
        // this.searchFilters.next(this.servicesFilter);
    }
}