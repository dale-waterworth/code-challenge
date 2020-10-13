import {Component} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {map} from 'rxjs/operators';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent {
    public speed = 100;
    public grid = [];
    public xMax;
    public yMax;
    public x;
    public y;
    public currentLetter;
    public mysteryWord = '';
    code = 'TmixcmCZhxDmrmoaQhxhzmfCDnohyehhxW';
    letters;
    dir = 'up';
    interval;
    data;
    txtSize = 16;

    constructor(private http: HttpClient) {
        this.readInBoard().subscribe((data: string) => {
            this.data = data;
            this.init();
        });
    }

    private init(): void {
        this.txtSize += 6;
        this.mysteryWord = '';
        this.letters = [...this.code].map(letter => letter);

        this.grid = this.parseTextGrid();

        this.xMax = this.grid.length - 1;
        this.yMax = this.grid[0].length - 1;

        console.log(this.grid);
        this.start();
    }

    private parseTextGrid(): any[] {
        let row = -1;
        const grid = [];
        this.data.split(/[\r\n]+/)
            .forEach((line: string) => {
                ++row;
                grid[row] = [];
                let col = -1;
                [...line].forEach((ch: string) => {
                    col++;
                    const cell = {
                        val: ch
                    };
                    grid[row].push(cell);
                });
            });
        return grid;
    }

    private timer(ms): any {
        return new Promise(res => setTimeout(res, ms));
    }

    private async finish(): Promise<void> {
        clearInterval(this.interval);
        for (let x = 0; x < this.xMax + 1; x++) {
            for (let y = 0; y < this.yMax + 1; y++) {
                await this.timer(10);
                this.grid[x][y].selected = true;
            }
        }
        this.init();
    }

    public findLetter(letter): void {
        if (!letter) {
            this.finish();
        }
        for (let x = 0; x < this.xMax + 1; x++) {
            for (let y = 0; y < this.yMax + 1; y++) {
                if (this.grid[x][y].val === letter) {
                    this.x = x;
                    this.y = y;

                    if (x === 0) {
                        this.dir = 'down';
                    } else if (y === this.yMax) {
                        this.dir = 'left';
                    } else if (x === this.xMax) {
                        this.dir = 'up';
                    }

                    break;
                }
            }
        }
    }

    private start(): void {
        this.findLetter(this.letters.shift());

        let selected = this.grid[this.x][this.y];
        selected.selected = true;
        const moveNext = 1;

        console.log('words', this.x, this.y);

        this.interval = setInterval(() => {
            this.grid[this.x][this.y].selected = true;
            delete selected.selected;
            selected = this.grid[this.x][this.y];

            // YIKES!! - hitting the slashes
            if (this.dir === 'up' && this.grid[this.x][this.y].val === '\\') {
                this.dir = 'left';
            } else if (this.dir === 'left' && this.grid[this.x][this.y].val === '\\') {
                this.dir = 'up';
            } else if (this.dir === 'down' && this.grid[this.x][this.y].val === '\\') {
                this.dir = 'right';
            } else if (this.dir === 'up' && this.grid[this.x][this.y].val === '/') {
                this.dir = 'right';
            } else if (this.dir === 'down' && this.grid[this.x][this.y].val === '/') {
                this.dir = 'left';
            } else if (this.dir === 'right' && this.grid[this.x][this.y].val === '/') {
                this.dir = 'up';
            } else if (this.dir === 'right' && this.grid[this.x][this.y].val === '\\') {
                this.dir = 'down';
            } else if (this.dir === 'left' && this.grid[this.x][this.y].val === '/') {
                this.dir = 'down';
            }

            // DOUBLE YIKES!! - from the edge
            if (this.dir === 'up') {
                if (this.x - moveNext === -1) {
                    this.extractWord();
                } else {
                    this.x = this.x - moveNext;
                }
            } else if (this.dir === 'left') {
                if (this.y - moveNext === -1) {
                    this.extractWord();
                } else {
                    this.y = this.y - moveNext;
                }
            } else if (this.dir === 'down') {
                if (this.x + moveNext === this.xMax + 1) {
                    this.extractWord();
                } else {
                    this.x = this.x + moveNext;
                }
            } else if (this.dir === 'right') {
                if (this.y + moveNext === this.yMax + 1) {
                    this.extractWord();
                } else {
                    this.y = this.y + moveNext;
                }
            }

        }, this.speed);
    }

    private extractWord(): void {
        this.mysteryWord += this.grid[this.x][this.y].val;
        this.findLetter(this.letters.shift());
    }

    private readInBoard(): Observable<any> {
        return this.http.get('assets/board.txt', {responseType: 'text'});
    }
}
