import "./scss/main.scss";
import Leap from "leapjs";
import activeHands from "./hands";

Leap.loop({ frameEventName: "animationFrame" }, function(frame) {
    if (frame.hands.length > 0) {
        for (let i = 0; i < frame.hands.length; i++) {
            let activeHand = activeHands[i];
            let cursor = document.getElementById(activeHand.cursor);
            var position = frame.hands[i].palmPosition;
            var normalized = frame.interactionBox.normalizePoint(position);
            var x2 = window.innerWidth * normalized[0];
            var y2 = window.innerHeight * normalized[2];
            cursor.style.left = x2 + "px";
            cursor.style.top = y2 + "px";
            activeHand.onPress = normalized[1] * 100 < 0;
            // console.log(x2 + ", " + y2);

            if (x2 && y2) {
                var el = document.elementFromPoint(x2, y2);
                if (
                    el &&
                    el.id !== "canvas" &&
                    el.tagName !== "BODY" &&
                    el.tagName !== "HTML"
                ) {
                    if (activeHand.currEl) {
                        activeHand.currEl.blur();
                        activeHand.currEl.setAttribute("press", null);
                        activeHand.currEl = el;
                        activeHand.currEl.focus();
                    } else {
                        activeHand.currEl = el;
                        activeHand.currEl.focus();
                    }
                } else {
                    if (activeHand.currEl) {
                        activeHand.currEl.blur();
                        activeHand.currEl.setAttribute("press", null);
                        activeHand.currEl = null;
                    }
                }
            }
            if (activeHand.onPress) {
                activeHand.willClick = true;
                activeHand.hue = activeHand.pressHue;
                if (activeHand.currEl) {
                    activeHand.currEl.setAttribute("press", true);
                }
            } else {
                if (activeHand.willClick && activeHand.currEl) {
                    activeHand.currEl.click();
                }
                activeHand.willClick = false;
                activeHand.hue = activeHand.defaultHue;
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
