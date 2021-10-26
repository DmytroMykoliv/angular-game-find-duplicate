import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { PlayerService } from './player.service';

@Component({
    selector: 'app-player',
    templateUrl: './player.component.html',
    styleUrls: ['./player.component.scss']
})
export class PlayerComponent implements OnInit {
    playerName = '';
    errorMessage = true;

    constructor(public playerService: PlayerService) { }

    ngOnInit(): void {
    }

    onSubmit() {
        const nameControl = new FormControl(this.playerName, Validators.pattern('^[a-zA-Z][a-zA-Z0-9]*'));
        this.playerService.isPlayerReady = nameControl.valid;
        this.errorMessage = nameControl.valid;
    }
}
