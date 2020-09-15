import {Component} from '@angular/core';
import {KeyboardService} from './keyboard-events/keyboard.service';
import {min} from 'rxjs/operators';

export interface BoardCell {
  selected?: boolean;
  type?: string;
  label?: string;
}

export interface Position {
  x: number;
  y: number;
}

export interface Feature {
  [index: string]: { type: string };
}

export interface Gameboard {
  matrix?: BoardCell[][];
  position: Position;
  score: number;
  features: Feature;
  lives: number;
}

enum Direction {
  ArrowLeft = 'ArrowLeft',
  ArrowRight = 'ArrowRight',
  ArrowUp = 'ArrowUp',
  ArrowDown = 'ArrowDown'
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  config = {
    rows: 11,
    cols: 32,
    walls: 10,
    mines: 10,
    lives: 3
  };

  gameBoard: Gameboard;
  wall: Gameboard;

  constructor(keyboard: KeyboardService) {

    this.init();

    keyboard.arrowEvent.subscribe(this.arrowKeyHandler.bind(this));
  }

  private arrowKeyHandler(event: KeyboardEvent): void {
    const getIncrement = (arrowKey) => ({
      ArrowRight: {x: 0, y: 1},
      ArrowLeft: {x: 0, y: -1},
      ArrowUp: {x: -1, y: 0},
      ArrowDown: {x: 1, y: 0},
    })
      [arrowKey];

    const increment = getIncrement(event.code);

    const newPosition = {
      x: this.gameBoard.position.x + increment.x,
      y: this.gameBoard.position.y + increment.y
    };

    if (this.canMove(newPosition)) {
      this.updatePosition(newPosition);

      this.checkForFeatures();

      this.gameBoard.score++;

    }
  }

  private init(): void {
    this.gameBoard = {
      matrix: [],
      position: {
        x: this.config.rows - 2,
        y: 1
      },
      score: 0,
      features: {},
      lives: this.config.lives
    };

    this.setupGrid();

    this.setGridFeatures();
  }

  private checkForFeatures(): void {
    const id = this.getFeatureId(this.gameBoard.position.x, this.gameBoard.position.y);

    // if empty
    if (!this.gameBoard.features.hasOwnProperty(id)) {
      return;
    }

    const type = this.gameBoard.features[id].type;
    if (type === 'mine') {

      this.gameBoard.matrix[this.gameBoard.position.x][this.gameBoard.position.y].type = 'hitMine';

      alert('mine!');

      this.gameBoard.lives--;
      if (this.gameBoard.lives === 0) {
        alert('Game over! Score: ' + this.gameBoard.score);
        this.init();
      }
    } else if (type === 'end') {
      alert('Well done! Score: ' + this.gameBoard.score);
      this.init();
    }
  }

  private canMove(newPosition: Position): boolean {
    return this.isNotWall(newPosition);
  }

  private isNotWall(newPosition: Position): boolean {
    const id = this.getFeatureId(newPosition.x, newPosition.y);
    if (this.gameBoard.features.hasOwnProperty(id)
      && this.gameBoard.features[id].type === 'wall') {
      return false;
    } else {
      return true;
    }
  }

  private updatePosition(position: Position): void {
    this.gameBoard.matrix[this.gameBoard.position.x][this.gameBoard.position.y].selected = false;
    this.gameBoard.position.x = position.x;
    this.gameBoard.position.y = position.y;
    this.gameBoard.matrix[this.gameBoard.position.x][this.gameBoard.position.y].selected = true;
  }

  private setupGrid(): void {
    for (let i = 0; i < this.config.rows; i++) {
      this.gameBoard.matrix.push([]);
      for (let j = 0; j < this.config.cols; j++) {
        this.gameBoard.matrix[i][j] = {
          selected: false
        };
      }
    }
  }

  private setGridFeatures(): void {
    this.addPerimeter();

    // set start
    this.gameBoard.matrix[this.config.rows - 2][1] = {
      type: 'start',
      selected: true,
      label: 'Start',
    };
    this.gameBoard.features[this.getFeatureId(this.gameBoard.position.x, this.gameBoard.position.y)] = {type: 'start'};

    // set end
    this.gameBoard.matrix[1][this.config.cols - 1] = {
      type: 'end',
      label: 'Finish',
    };
    this.gameBoard.features[this.getFeatureId(1, this.config.cols - 1)] = {type: 'end'};

    this.addRandomFeatures(this.config.mines, 'mine');

    this.addRandomFeatures(this.config.walls, 'wall');

    console.log(this.gameBoard);
  }

  private addPerimeter(): void {
    for (let i = 0; i < this.config.cols; i++) {
      // top
      const id = this.getFeatureId(0, i);
      this.gameBoard.matrix[0][i].type = 'wall';
      this.gameBoard.features[id] = {type: 'wall'};

      // bottom
      const id2 = this.getFeatureId(this.config.rows - 1, i);
      this.gameBoard.matrix[this.config.rows - 1][i].type = 'wall';
      this.gameBoard.features[id2] = {type: 'wall'};
    }

    for (let i = 0; i < this.config.rows; i++) {
      // left
      const id = this.getFeatureId(i, 0);
      this.gameBoard.matrix[i][0].type = 'wall';
      this.gameBoard.features[id] = {type: 'wall'};

      // left
      const id2 = this.getFeatureId(i, this.config.cols - 1);
      this.gameBoard.matrix[i][this.config.cols - 1].type = 'wall';
      this.gameBoard.features[id2] = {type: 'wall'};
    }
  }

  private addRandomFeatures(count, type): void {
    for (let i = 0; i < count; i++) {
      const randomX = Math.floor(Math.random() * this.config.rows - 1) + 1;
      const randomY = Math.floor(Math.random() * this.config.cols - 1) + 1;

      const id = this.getFeatureId(randomX, randomY);
      if (!this.gameBoard.features.hasOwnProperty(id)) {
        this.gameBoard.matrix[randomX][randomY].type = type;
        this.gameBoard.features[id] = {type};
      } else {
        count++;
      }
    }
  }

  private getFeatureId(x, y): string {
    return (x + '-' + y) as string;
  }

  difficulty(mode: string): void {
    const getDifficulty = (difficulty) => ({
      easy: 10,
      medium: 20,
      god: 30
    })
      [difficulty];

    const mines = getDifficulty(mode);
    this.config.walls = mines;
    this.config.mines = mines;

    this.init();
  }

}
