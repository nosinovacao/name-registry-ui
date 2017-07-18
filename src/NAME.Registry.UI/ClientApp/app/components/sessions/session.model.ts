import { ManifestSnapshot } from "../manifest-snapshots/manifest-snapshot.model";

export interface Session {
    Id: string;
    RegisteredServiceId: string;
    LastManifestSnapshot: ManifestSnapshot;
    LastPing: Date;
    Bootstrapped: Date;
    Invalidated?: Date;
    ManifestSnapshotCount: Number;
}
