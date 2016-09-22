import {Component, OnInit, Inject, ElementRef} from '@angular/core';
import {FunctionsService} from '../services/functions.service';
import {GlobalStateService} from '../services/global-state.service';

@Component({
    selector: 'local-develop',
    templateUrl: 'templates/local-development-instructions.component.html',
    styleUrls: ['styles/local-development-instructions.style.css']
})
export class LocalDevelopmentInstructionsComponent implements OnInit {
    private shown: boolean = false;
    private selectedMode: string = 'Azure';
    private isLocalServerRunning: boolean = false;
    constructor(
        private _globalStateService: GlobalStateService,
        private _functionsService: FunctionsService) { }

    ngOnInit() {

     }

    show() {
        this.shown = true;
        this.checkLocalFunctionsServer();
    }

    checkLocalFunctionsServer() {
        this._globalStateService.checkLocalFunctionsServer()
            .subscribe(v => {
                this.isLocalServerRunning = v;
                if (this.show && !this.isLocalServerRunning) {
                    setTimeout(() => this.checkLocalFunctionsServer(), 200);
                }
        });
    }

    hide() {
        this.shown = false;
    }

    switchToAzure() {
        this.selectedMode = 'Azure';
        this._globalStateService.switchToAzure();
    }

    switchToLocal() {
        if (this.isLocalServerRunning) {
            this.selectedMode = 'Local';
            this._globalStateService.switchToLocalServer();
        }
    }

    launchVsCode() {
        this._functionsService.launchVsCode()
            .subscribe(e => console.log(e));
    }
}