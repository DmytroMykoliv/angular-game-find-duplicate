import { Component, OnInit } from '@angular/core';
import { PICTURES } from '../mock-img-for-game';
import { Card } from '../Card';

@Component({
    selector: 'app-game-field',
    templateUrl: './game-field.component.html',
    styleUrls: ['./game-field.component.scss']
})
export class GameFieldComponent implements OnInit {
    cards = [...PICTURES, ...PICTURES];
    selectedCards: Card[] = [];
    findDuplicate: Card[] = [];


    constructor() { }

    ngOnInit(): void {
    }

    addCard(card: string, index: number) {
        this.selectedCards.push({ id: index + 1, name: card });

        // this.findDuplicate.push(...this.selectedCards);

        console.log('select', this.selectedCards);
        console.log('find', this.findDuplicate);
        console.log(card, index+1);

        if (this.selectedCards.length === 2) {
            const isDuplicate = this.selectedCards[0].name === this.selectedCards[1].name;
            this.findDuplicate = isDuplicate
                ? [...this.findDuplicate, ...this.selectedCards]
                : this.findDuplicate;

            this.selectedCards = [];
        }
    }

    checkCards(card: string, index: number) {
        if (this.selectedCards.length > 0) {
            return this.selectedCards.some(item => item.name === card && item.id === index + 1)
            || this.findDuplicate.some(item => item.name === card && item.id === index + 1);
        }

        if (this.findDuplicate.length === 16) {
            setTimeout(() => {
                this.findDuplicate = [];

                // alert("Victory!!!");
            }, 1000);
        }

        return this.findDuplicate
            .some(item => item.name === card && item.id === index +1);
    }

    getHidden(card: string) {
        return this.findDuplicate.some(item => item.name === card);
    }
}
