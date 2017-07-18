import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
// require('arrive')
import 'arrive';
import 'bootstrap-material-design/dist/js/material.js';
import 'bootstrap-material-design/dist/js/ripples.js';
import { JQuery } from 'jquery';
import { Bootstrap } from 'bootstrap';
import { Ng2Bs3ModalModule } from 'ng2-bs3-modal/ng2-bs3-modal';
import { MomentModule } from 'angular2-moment';
import { PrettyJsonModule, SafeJsonPipe, PrettyJsonPipe } from 'angular2-prettyjson';
import { ClipboardModule } from "ngx-clipboard";

import { AppComponent } from './components/app/app.component'
import { NavMenuComponent } from './components/navmenu/navmenu.component';
// import { ServiceListComponent } from './components/services/service-list/service-list.component';
// import { ServiceDetailsComponent } from './components/services/service-details/service-details.component';
import { ServiceEndpointPipe } from './components/services/service-endpoint.pipe';
import { ServiceService } from './components/services/service.service';
import { ServiceDetailsComponent } from './components/services/service-details/service-details.component';
import { ServiceListComponent } from './components/services/service-list/service-list.component';
import { LoadingBarComponent } from './components/shared/loadingbar.component';
import { SessionService } from './components/sessions/session.service';
import { SessionListComponent } from './components/sessions/session-list/session-list.component';
import { ModalSingleSnapshotDetailsComponent } from "./components/manifest-snapshots/modal-single-snapshot-details/modal-single-snapshot-details.component";
import { ModalAllSessionSnapshotsComponent } from "./components/manifest-snapshots/modal-all-session-snapshots/modal-all-session-snapshots.component";
import { ManifestSnapshotService } from "./components/manifest-snapshots/manifest-snapshot.service";

@NgModule({
    bootstrap: [AppComponent],
    declarations: [
        AppComponent,
        NavMenuComponent,
        ServiceListComponent,
        ServiceEndpointPipe,
        ServiceDetailsComponent,
        LoadingBarComponent,
        SessionListComponent,
        ModalSingleSnapshotDetailsComponent,
        ModalAllSessionSnapshotsComponent,
    ],
    imports: [
        RouterModule.forRoot([
            { path: '', redirectTo: 'services', pathMatch: 'full' },
            { path: 'services', component: ServiceListComponent, },
            { path: 'service/:id', component: ServiceDetailsComponent },
            { path: '**', redirectTo: 'services' },

        ]),
        BrowserModule,
        FormsModule,
        HttpModule,
        Ng2Bs3ModalModule,
        MomentModule,
        PrettyJsonModule,
        ClipboardModule,
    ],
    providers: [
        // Allow data to be injected from Asp.Net core while server rendering
        { provide: 'REGISTRY_API_URL', useValue: (window as any).REGISTRY_API_URL || "http://registry1.name.local.internal" },
        { provide: 'ORIGIN_URL', useValue: location.origin },
        ServiceService,
        SessionService,
        ManifestSnapshotService,
        SafeJsonPipe,
        PrettyJsonPipe,
    ]
})
export class AppModule {
}
