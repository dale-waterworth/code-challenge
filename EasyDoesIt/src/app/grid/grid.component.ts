import {Component, Input, OnInit} from '@angular/core';
import {Gameboard} from '../app.component';



@Component({
  selector: 'app-grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.css']
})
export class GridComponent implements OnInit {
  @Input() gameBoard: Gameboard;

  constructor() {
  }

  ngOnInit(): void {
    console.log(`gridboard:`, this.gameBoard);
  }

}
