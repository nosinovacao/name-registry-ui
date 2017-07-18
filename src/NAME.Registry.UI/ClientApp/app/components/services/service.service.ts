import { Injectable, Inject } from '@angular/core';
import { Http, URLSearchParams, Headers } from '@angular/http';
import { Service } from './service.model';
import { ServiceFilter } from './service-filter.model';

import 'rxjs/add/operator/toPromise';

const servicesEndpoint: string = '/api/v1/services';

@Injectable()
export class ServiceService {
    private http: Http;
    private registryApiUrl: string;
    private headers: Headers;

    constructor(http: Http, @Inject('REGISTRY_API_URL') registryApiUrl: string) {
        this.headers = new Headers({
            'Content-Type': 'application/json',
            'Accept': 'q=0.8;application/json;q=0.9'
        });
        this.http = http;
        this.registryApiUrl = registryApiUrl;
    }

    getServices(filter: ServiceFilter): Promise<Service[]> {
        let params: URLSearchParams = new URLSearchParams();

        params.set("hostname", filter.hostname);
        params.set("appName", filter.appName);
        params.set("appVersion", filter.appVersion);

        if (filter.lastPingMinimumMinutesAgo) {
            
            let lastPingLowerThresholdDate = new Date();
            lastPingLowerThresholdDate.setMinutes(
                lastPingLowerThresholdDate.getMinutes() - filter.lastPingMinimumMinutesAgo
            );
            params.set("lastPingLowerThreshold", lastPingLowerThresholdDate.toISOString());
        }

        return this.http.get(this.registryApiUrl + servicesEndpoint, { headers: this.headers, search: params })
            .toPromise()
            .then(response => {
                return response.json() as Service[];
            })
            .catch(this.handleError);
    }

    getService(id: string): Promise<Service> {
        return this.http.get(this.registryApiUrl + servicesEndpoint + `/${id}`)
            .toPromise()
            .then(response => {
                return response.json() as Service;
            })
            .catch((error) => {
                if (error.status === 404)
                    return undefined;
                else
                    return this.handleError(error);
            });
    }

    private handleError(error: any): Promise<any> {
        console.error('An error occurred', error); // for demo purposes only
        return Promise.reject(error.message || error);
    }
}