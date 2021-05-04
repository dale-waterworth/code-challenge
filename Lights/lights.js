/**
 * TO RUN
 * cd into this dir
 * `node lights.js`
 */

const minuteHit = {};
let minutesUsed = 0;
[[36, 40], [8, 9], [19, 21], [6, 23], [1, 5], [10, 12], [14, 18], [27, 31], [12, 16], [33, 34], [41, 45]]
    .sort((a, b) => a[0] - b[0])
    .forEach(e => {
        let from = e[0];
        const till = e[1];
        while (from < till) {
            if (!minuteHit.hasOwnProperty(from)) {
                minutesUsed++;
                minuteHit[from] = 1;
            } else {
                minuteHit[from]++;
            }
            from++;
        }
    });
console.log('Total Minutes', minutesUsed);

/*
BONUS
 */
console.log('Busiest minute', Object.keys(minuteHit).reduce((busiest, key) => {
    if (busiest.count < minuteHit[key]) {
        busiest = {
            minute: key,
            count: minuteHit[key]
        }
    }
    return busiest;
}, {
    minute: 0,
    count: 0
}));
// Busiest minute { minute: '14', minutesUsed: 3 }
