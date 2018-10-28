import "./scss/main.scss";
import Leap from "leapjs";
import "leapjs-plugins";
import THREE from "three";

var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");

// ctx.fillStyle = "#a50b5e";
let hue = 30;
let radius = 20;
var currEl = null;
var onPress = false;
var willClick = true;
var on = true;
Leap.loop({ frameEventName: "animationFrame" }, function(frame) {
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    ctx.fillStyle = "hsl(" + hue + ", 100%, 50%)";
    if (frame.hands.length > 0) {
        var position = frame.hands[0].palmPosition;
        var normalized = frame.interactionBox.normalizePoint(position);

        var x = ctx.canvas.width * normalized[0];
        var y = ctx.canvas.height * normalized[2];

        ctx.beginPath();
        ctx.arc(x, y, radius, 0, 2 * Math.PI);
        ctx.fill();

        var x2 = window.innerWidth * normalized[0];
        var y2 = window.innerHeight * normalized[2];
        onPress = normalized[1] * 100 < 0;
        // console.log(x2 + ", " + y2);
        if (on) {
            if (x2 && y2) {
                canvas.style.display = "none";
                var el = document.elementFromPoint(x2, y2);
                if (
                    el &&
                    el.id !== "canvas" &&
                    el.tagName !== "BODY" &&
                    el.tagName !== "HTML"
                ) {
                    if (currEl) {
                        currEl.blur();
                        currEl.setAttribute("press", null);
                        currEl = el;
                        currEl.focus();
                    } else {
                        currEl = el;
                        currEl.focus();
                    }
                } else {
                    if (currEl) {
                        currEl.blur();
                        currEl.setAttribute("press", null);
                        currEl = null;
                    }
                }
                canvas.style.display = "block";
            }
            if (onPress) {
                willClick = true;
                hue = 200;
                if (currEl) {
                    currEl.setAttribute("press", true);
                }
            } else {
                if (willClick && currEl) {
                    currEl.click();
                }
                willClick = false;
                hue = 30;
            }
        }
    }

    // frame.pointables.forEach(function(pointable, i) {
    //     var position = pointable.stabilizedTipPosition;
    //     var normalized = frame.interactionBox.normalizePoint(position);
    //
    //     var x = ctx.canvas.width * normalized[0];
    //     var y = ctx.canvas.height * normalized[2];
    //
    //     ctx.beginPath();
    //     ctx.arc(x, y, radius, 0, 2 * Math.PI);
    //     ctx.fill();
    //     let x2 = x;
    //     let y2 = y;
    //     let z2 = 0;
    //     if (i == 1) {
    //     }
    // });
    //
    frame.gestures.forEach(function(gesture) {
        if (gesture.type == "swipe") {
            console.log(gesture);
        }
        // if (gesture.type == "keyTap") {
        //     radius = (radius + 5) % 20;
        //
        //     var position = gesture.position;
        //     var normalized = frame.interactionBox.normalizePoint(position);
        //
        //     var x = ctx.canvas.width * normalized[0];
        //     var y = ctx.canvas.height * (1 - normalized[1]);
        //     console.log(x + " , " + y);
        //     let el = document.elementFromPoint(x, y);
        //     if (el) {
        //         el.click();
        //     }
        // }
    });
});
