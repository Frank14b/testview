import { Injectable } from '@angular/core';
import * as io from 'socket.io-client';
import { Observable, Subscriber } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class SocketService {

    socket :any;

    constructor() {
        this.socket = io.io('http://localhost:4000')
    }

    listen(Eventname : string){
        return new Observable((subscriber)=>{
            this.socket.on(Eventname,(data: any)=>{
                subscriber.next(data);
            })
        })
    }
}