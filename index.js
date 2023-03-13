const moment = require('moment');
const randomWords = require('random-words');

const MIN_ACTIVITIES_PER_GROUP = 10;
const MAX_ACTIVITIES_PER_GROUP = 2000;
const MIN_GROUPS = 6;
const MAX_GROUPS = 12;
const colors = ['#FF6633', '#FFB399', '#FF33FF', '#FFFF99', '#00B3E6',
    '#E6B333', '#3366E6', '#999966', '#99FF99', '#B34D4D',
    '#80B300', '#809900', '#E6B3B3', '#6680B3', '#66991A',
    '#FF99E6', '#CCFF1A', '#FF1A66', '#E6331A', '#33FFCC',
    '#66994D', '#B366CC', '#4D8000', '#B33300', '#CC80CC',
    '#66664D', '#991AFF', '#E666FF', '#4DB3FF', '#1AB399',
    '#E666B3', '#33991A', '#CC9999', '#B3B31A', '#00E680',
    '#4D8066', '#809980', '#E6FF80', '#1AFF33', '#999933',
    '#FF3380', '#CCCC00', '#66E64D', '#4D80CC', '#9900B3',
    '#E64D66', '#4DB380', '#FF4D4D', '#99E6E6', '#6666FF'];

let lastEndDate;
const plan = {};

for (const group of getGroups()) {
    if (!Array.isArray(plan[group])) {
        plan[group] = [];
    }

    lastEndDate = null;
    for (let i = 0; i < getRandomInt(MIN_ACTIVITIES_PER_GROUP, MAX_ACTIVITIES_PER_GROUP); i++) {
        const start = lastEndDate ?? moment().add(
            getRandomInt(0, 10),
            ['m', 's']
                .at(getRandomInt(0, 1))
        ).valueOf();
        const end = moment(start).add(
            getRandomInt(0, 100),
            ['m', 's']
                .at(getRandomInt(0, 1))
        ).valueOf();

        const name = randomWords(getRandomInt(1, 8)).join(' ');
        const type = group;
        const color = colors.at(getRandomInt(0, colors.length - 1));
        const textColor = getContrastingColor(color);

        plan[group].push({
            name,
            type,
            start,
            end,
            color,
            textColor
        });

        lastEndDate = end;
    }
}

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);

    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getGroups() {
    const groups = [];
    for (let i = 0; i < getRandomInt(MIN_GROUPS, MAX_GROUPS); i++) {
        groups.push(randomWords(Math.floor(Math.random() * 3 + 1)).join(' '));
    }

    return groups;
}

function getContrastingColor(hexColor) {
    function cutHex(h, start, end) {
        const hStr = (h.charAt(0) === '#') ? h.substring(1, 7) : h;

        return parseInt(hStr.substring(start, end), 16);
    }

    // https://codepen.io/davidhalford/pen/ywEva/
    const cThreshold = 130;

    if (hexColor.indexOf('#') === -1) {
        // We weren't given a hex color
        return "#ff0000";
    }

    const hR = cutHex(hexColor, 0, 2);
    const hG = cutHex(hexColor, 2, 4);
    const hB = cutHex(hexColor, 4, 6);

    const cBrightness = ((hR * 299) + (hG * 587) + (hB * 114)) / 1000;

    return cBrightness > cThreshold ? "#000000" : "#ffffff";
}

console.log(JSON.stringify(plan, null, 4));
