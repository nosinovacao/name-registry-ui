import { Component, Input, ViewChild } from '@angular/core';
import { ManifestSnapshot } from "../manifest-snapshot.model";
import { ModalComponent } from "ng2-bs3-modal/ng2-bs3-modal";
import { SafeJsonPipe } from "angular2-prettyjson";
import { PrettyJsonPipe } from "angular2-prettyjson";

@Component({
    selector: 'modal-single-snapshot-details',
    templateUrl: './modal-single-snapshot-details.component.html'
})
export class ModalSingleSnapshotDetailsComponent {
    dateAndTime: Date;
    prettyManifestHtml: string;
    @ViewChild('modal') modal: ModalComponent;

    constructor(
        private prettyJsonPipe: PrettyJsonPipe)
    { }

    public open(manifestSnapshot: ManifestSnapshot) {
        this.dateAndTime = manifestSnapshot.DateAndTime;

        let objectifiedManifest = JSON.parse(manifestSnapshot.Manifest);
        this.prettyManifestHtml = this.prettyJsonPipe.transform(objectifiedManifest, 2);

        this.modal.open('lg');
    }

}