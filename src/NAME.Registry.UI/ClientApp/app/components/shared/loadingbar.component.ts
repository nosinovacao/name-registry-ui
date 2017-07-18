import {Component, Input} from '@angular/core';

@Component({
    selector: 'loadingbar',
    template: `
    <div class="progress progress-striped active">
        <div *ngIf="loading" class="progress-bar" role="progressbar" style="width: 100%;">
        </div>
    </div>
  `
})
export class LoadingBarComponent {
    @Input() public loading:boolean;
}
