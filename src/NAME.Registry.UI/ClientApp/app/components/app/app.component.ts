import { Component } from '@angular/core';
import * as moment from 'moment';
declare var $: any;

@Component({
    selector: 'app',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent {
    
    ngAfterViewInit() {
        if($.material){
            $.material.init();
        }
        var locale = window.navigator.language;
        moment.locale("en-gb");
    }
}
