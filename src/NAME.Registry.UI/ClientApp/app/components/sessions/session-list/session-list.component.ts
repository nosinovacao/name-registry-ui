import { Component, Inject, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Session } from '../session.model';
import { SessionService } from '../session.service';
import { LoadingBarComponent } from '../../shared/loadingbar.component';

@Component({
    selector: 'sessionlist',
    templateUrl: './session-list.component.html'
})
export class SessionListComponent implements OnInit {
    @Input() private serviceId: string;
    public sessions: Promise<Session[]>;

    constructor(
        private sessionService: SessionService,
        private router: Router
    ) { }

    ngOnInit(): void {
        this.sessions = this.sessionService
            .getSessions(this.serviceId)
            .then(sessions => {
                if (!sessions === undefined)
                    this.router.navigateByUrl('/404');

                sessions.sort((a: Session, b: Session) => {
                    if(!a.Invalidated)
                        return -1;
                    if(!b.Invalidated)
                        return 1;
                    let left = Number(new Date(a.Invalidated));
                    let right = Number(new Date(b.Invalidated));
                    return  right - left;
                });

                return sessions;
            });
    }
}