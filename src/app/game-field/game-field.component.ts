import { Component, Input, OnInit } from '@angular/core';
import { PlayerService } from '../player/player.service';
import { Observable, timer } from 'rxjs';

import { Card } from '../Card';
import { PICTURES } from '../mock-img-for-game';

@Component({
    selector: 'app-game-field',
    templateUrl: './game-field.component.html',
    styleUrls: ['./game-field.component.scss']
})
export class GameFieldComponent implements OnInit {
    @Input() playerName: string = '';

    cards = [...PICTURES, ...PICTURES];
    selectedCards: Card[] = [];
    foundedDuplicate: Card[] = [];
    isWinner = false;
    countClick = 0;
    timer = 0;
    interval: Observable<number> | undefined;


    constructor(public playerService: PlayerService) {}

    ngOnInit(): void {
        this.interval = timer(1000, 1000);
        this.interval.subscribe((item: number) => {
            this.timer = item;
        });

        this.shuffle(this.cards);
    }

    shuffle(array: string[]) {
        for (let i = array.length - 1; i > 0; i--) {
          let j = Math.floor(Math.random() * (i + 1));
          [array[i], array[j]] = [array[j], array[i]];
        }
      }

    addSelectedCard(card: string, index: number) {
        this.countClick++;

        const isCartSelectedAlready = this.selectedCards.some(item => item.id === index + 1)
            || this.foundedDuplicate.some(item => item.id === index + 1);


        if (isCartSelectedAlready) {
            return;
        }

        this.selectedCards.push({ id: index + 1, name: card });

        if (this.selectedCards.length === 2) {
            const isDuplicate: boolean = this.selectedCards[0].name === this.selectedCards[1].name;

            this.foundedDuplicate = isDuplicate
                ? [...this.foundedDuplicate, ...this.selectedCards]
                : this.foundedDuplicate;

            setTimeout(() => {
                this.selectedCards = [];
            }, 1000);
        }
    }

    checkCards(cardName: string, index: number) {
        if (this.selectedCards.length > 0) {
            return this.selectedCards.some(card => card.name === cardName && card.id === index + 1)
                || this.foundedDuplicate.some(card => card.name === cardName && card.id === index + 1);
        }

        if (this.foundedDuplicate.length === 16) {
            setTimeout(() => {
                this.foundedDuplicate = [];

                this.isWinner = true;
            }, 1000);
        }

        return this.foundedDuplicate
            .some(card => card.name === cardName && card.id === index +1);
    }
}
