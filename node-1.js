const colors = require("colors");
const startNum = process.argv[2];
const endNum = process.argv[3];
let count = 0;

if (isNaN(startNum || endNum)) {
    console.log(colors.red("Требуется ввести число!"));
    return;
}
if (startNum <= 1) {
    console.log(colors.red("Требуется ввести натуральное число!"));
    return;
}


nextPrime:
    for (let i = parseFloat(startNum); i <= endNum; i++) {

        for (let j = 2; j < i; j++) {
            if (i % j == 0) continue nextPrime;

        }

        if (count == 0) {
            console.log(`${i}`.green);

        }
        if (count == 1) {
            console.log(`${i}`.blue);

        }
        if (count == 2) {
            console.log(`${i}`.red);

            count = -1;
        }
        count++;


    }