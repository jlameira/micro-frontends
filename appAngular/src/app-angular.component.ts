import { Component, forwardRef, Inject, OnDestroy } from '@angular/core';
import { NgRedux } from '@angular-redux/store';
import { IAppState, CounterActions } from "./store";
import {Globals} from "./globals.service";
import * as angularImg from "../assets/angular-logo.png";

@Component({
	selector: 'appAngular',
	template: `
		<div style="margin-top: 100px;">
            <img [src]="angularImg" style="width: 100px;"/> <br />
			This was rendered by AppAngular which is written in Angular 6
		</div>
        <br />

        <div>
            <b> Count: {{ count }}</b><br/><br/>
            <button (click)="increment()">local increment</button>&nbsp;Send a <b>local</b> increment event. <br/>

            <button (click)="decrement()">local decrement</button>&nbsp;Send a <b>local</b> decrement event. <br/>


            <button (click)="globalIncrement()">global increment</button>&nbsp;Send a <b>global</b> increment event.
            <br/>

            <button (click)="globalDecrement()">global decrement</button>&nbsp;Send a <b>global</b> decrement event.
            <br/>
        </div>

        <br />
		<a [routerLink]="['/subroute1']" routerLinkActive="active">Angular route 1</a>&nbsp;
		<a [routerLink]="['/subroute2']" routerLinkActive="active">Angular route 2</a>

		<router-outlet></router-outlet>
	`,
})
export class AppAngular {
    count: number;
    angularImg: any;
    subscription;

    constructor(
        @Inject(forwardRef(() => NgRedux)) private ngRedux: NgRedux<IAppState>,
        @Inject(forwardRef(() => CounterActions)) private actions: CounterActions,
        @Inject(forwardRef(() => Globals)) private globals:Globals) {
        this.subscription = ngRedux.select<number>('count')
            .subscribe(newCount => this.count = newCount);
        this.angularImg = angularImg;
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }

    increment() {
        this.ngRedux.dispatch(this.actions.increment());
    }

    decrement() {
        this.ngRedux.dispatch(this.actions.decrement());
    }

    globalIncrement() {
        this.globals.globalEventDistributor.dispatch(this.actions.increment());
    }

    globalDecrement() {
        this.globals.globalEventDistributor.dispatch(this.actions.decrement());
    }
}
