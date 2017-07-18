import { Pipe, PipeTransform } from '@angular/core';
import { Service } from './service.model';
/*
 * Create the endpoint from the service values.
 * Takes the service.
 * Usage:
 *   service | serviceEndpoint
*/
@Pipe({name: 'serviceEndpoint'})
export class ServiceEndpointPipe implements PipeTransform {
  transform(service: Service): string {
      let hostname = service.Hostname;
      if (service.NAMEPort)
        hostname = `${hostname}:${service.NAMEPort}`;
      return `http://${hostname}${service.NAMEEndpoint}`;
  }
}
