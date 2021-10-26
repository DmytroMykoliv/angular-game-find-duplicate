import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PlayerService {
    isPlayerReady: boolean = false;

    constructor() { }

    reset() {
        this.isPlayerReady = false;
    }
}
