import { Component, Input, ViewChild, OnChanges, SimpleChanges } from '@angular/core';
import { ManifestSnapshot } from "../manifest-snapshot.model";
import { Session } from "../../sessions/session.model";
import { ModalComponent } from "ng2-bs3-modal/ng2-bs3-modal";
import { SafeJsonPipe } from "angular2-prettyjson";
import { PrettyJsonPipe } from "angular2-prettyjson";
import { Observable } from "rxjs/Observable";
import { ManifestSnapshotService } from "../manifest-snapshot.service";
import { Router } from "@angular/router";

@Component({
    selector: 'modal-all-session-snapshots',
    templateUrl: './modal-all-session-snapshots.component.html'
})
export class ModalAllSessionSnapshotsComponent {
    manifestSnapshots: Promise<PrettifiedHtmlManifestSnapshot[]>;

    selectedManifest: PrettifiedHtmlManifestSnapshot;
    session: Session;
    @ViewChild('modal') modal: ModalComponent;

    constructor(
        private manifestSnapshotService: ManifestSnapshotService,
        private router: Router,
        private prettyJsonPipe: PrettyJsonPipe)
    { }

    public open(session: Session) {
        this.session= session;
        this.selectedManifest = undefined;

        this.manifestSnapshots = this.manifestSnapshotService
            .getSnapshots(session.Id)
            .then(snapshots => {
                if (snapshots === undefined)
                    this.router.navigateByUrl('/404');
                
                let prettifiedSnapshots: PrettifiedHtmlManifestSnapshot[] = [];
                for (let i = 0; i < snapshots.length; i++) {
                    let snapshot = snapshots[i];
                    let objectifiedSnapshot = JSON.parse(snapshot.Manifest);
                    prettifiedSnapshots[i] = {
                        DateAndTime: snapshot.DateAndTime,
                        PrettyHtmlManifest: this.prettyJsonPipe.transform(objectifiedSnapshot, 2)
                    };
                }
                prettifiedSnapshots.sort((a: PrettifiedHtmlManifestSnapshot, b: PrettifiedHtmlManifestSnapshot) => {
                    if(!a.DateAndTime)
                        return -1;
                    if(!b.DateAndTime)
                        return 1;
                    let left = Number(new Date(a.DateAndTime));
                    let right = Number(new Date(b.DateAndTime));
                    return  right - left;
                });
                this.selectedManifest = prettifiedSnapshots[0] || undefined;
                return prettifiedSnapshots;
            });

        this.modal.open('lg');
    }
}

interface PrettifiedHtmlManifestSnapshot {
    DateAndTime: Date;
    PrettyHtmlManifest: string;
}