import { Component } from '@angular/core';
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
    }
}
