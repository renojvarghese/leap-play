let hue = 30;
let radius = 10;
let currEl = null;
let onPress = false;
let willClick = true;
let active = false;

export default [
    {
        hue: 30,
        defaultHue: 30,
        pressHue: 80,
        selector: "#hand1",
        cursorId: "hand1",
        cursor: null,
        cursorClass: "cursor",
        optionalClasses: [],
        radius: radius,
        currEl: null,
        onPress: false,
        willCLick: false,
        active: false
    },
    {
        hue: 120,
        defaultHue: 120,
        pressHue: 170,
        selector: "#hand2",
        cursorId: "hand2",
        cursor: null,
        cursorClass: "cursor",
        optionalClasses: [],
        radius: radius,
        currEl: null,
        onPress: false,
        willCLick: false,
        active: false
    }
];
