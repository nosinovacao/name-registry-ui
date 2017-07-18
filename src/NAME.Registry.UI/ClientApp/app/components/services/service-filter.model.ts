export interface ServiceFilter {
    hostname: string;
    appName: string;
    appVersion: string;
    lastPingMinimumMinutesAgo: number;
}