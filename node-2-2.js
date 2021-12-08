const EventEmitter = require('events');
const dateFns = require("date-fns");
const emitter = new EventEmitter();
const date = process.argv[2];
dataArr = (date.split('-'));

const StatusType = [
    {
        status: 'run',
    },
    {
        status: 'end',
    },
];

class Timer {
    constructor(flag, result, status) {
        this.flag = flag;
        this.result = result;
        this.status = status;
    }
}

const run = async () => {
    const {flag, result, status} = generateNewTimer();

    emitter.emit(status, result);

    await new Promise(resolve => setTimeout(resolve, 1000,));
    if (flag) {
        await run()
    }

}
const generateNewTimer = () => {
    let x = new Date();
    let y = new Date(dataArr[2], dataArr[1] - 1, dataArr[0], dataArr[3], dataArr[4]);
    let temp;
    temp = dateFns.differenceInYears(y, x);
    var result = temp + " years ";
    x = dateFns.addYears(x, temp);
    temp = dateFns.differenceInMonths(y, x);
    result = result + temp + " months ";
    x = dateFns.addMonths(x, temp);
    temp = dateFns.differenceInDays(y, x);
    result = result + temp + " days ";
    x = dateFns.addDays(x, temp);
    temp = dateFns.differenceInHours(y, x);
    result = result + temp + " hours ";
    x = dateFns.addHours(x, temp);
    let tempS = dateFns.differenceInMinutes(y, x);
    result = result + tempS + " minutes ";
    x = dateFns.addMinutes(x, tempS);
    temp = dateFns.differenceInSeconds(y, x);
    result = result + temp + " seconds";
    if (tempS+temp > 0) {
        return new Timer(true, result, "run")
    } else {
        return new Timer(false, result, "end")

    }
}

class Handler {
    static run(result) {
        console.log('До дедлайна осталось', result);
    }

    static end(end) {

        console.log('Время вышло');
        clearTimeout(0);
    }

}

emitter.on('run', Handler.run);
emitter.on('end', Handler.end);
run();