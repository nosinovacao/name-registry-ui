import { Session } from '../sessions/session.model';

export interface Service {
    Id: string;
    Hostname: string;
    NAMEEndpoint: string;
    NAMEPort?: number;
    AppName: string;
    AppVersion: string;
    CurrentSession: Session;
}