import "./scss/main.scss";
import Leap from "leapjs";
import activeHands from "./hands";

const setCursor = (hand, x, y, z) => {
    if (!hand.active) {
        hand.cursor.style.display = "none";
        if (hand.currEl) {
            hand.currEl.blur();
            hand.currEl = null;
        }
        hand.willClick = false;
        hand.press = false;
        return;
    }
    hand.onPress = z < 10;
    hand.cursor.style.display = "block";
    hand.cursor.style.left = x + "px";
    hand.cursor.style.top = y + "px";
    let el = document.elementFromPoint(x, y);
    if (
        el &&
        el.tagName !== "CANVAS" &&
        el.tagName !== "BODY" &&
        el.tagName !== "HTML"
    ) {
        if (hand.currEl) {
            hand.currEl.blur();
            hand.currEl.setAttribute("press", null);
            hand.currEl = el;
            hand.currEl.focus();
        } else {
            hand.currEl = el;
            hand.currEl.focus();
        }
    } else {
        if (hand.currEl) {
            hand.currEl.blur();
            hand.currEl.setAttribute("press", null);
            hand.currEl = null;
        }
    }

    if (hand.onPress) {
        hand.willClick = true;
        if (hand.currEl) {
            hand.currEl.setAttribute("press", true);
        }
    } else {
        if (hand.willClick && hand.currEl) {
            hand.currEl.click();
        }
        hand.willClick = false;
    }
};
Leap.loop({ frameEventName: "animationFrame" }, function(frame) {
    let i = 0;
    for (; i < frame.hands.length; i++) {
        let activeHand = activeHands[i];
        activeHand.active = true;
        let cursor = document.getElementById(activeHand.cursorId);
        activeHand.cursor = cursor;
        cursor.setAttribute("active-cursor", activeHand.active);
        let position = frame.hands[i].palmPosition;
        let normalized = frame.interactionBox.normalizePoint(position);
        let x = window.innerWidth * normalized[0];
        let y = window.innerHeight * normalized[2];
        let z = 100 * normalized[1];
        setCursor(activeHand, x, y, z);
    }

    for (; i < activeHands.length; i++) {
        let activeHand = activeHands[i];
        activeHands[i].active = false;
        let cursor = document.getElementById(activeHand.cursorId);
        activeHand.cursor = cursor;
        cursor.setAttribute("active-cursor", activeHand.active);
        setCursor(activeHand, 0, 0);
    }

    // frame.pointables.forEach(function(pointable, i) {
    //     let position = pointable.stabilizedTipPosition;
    //     let normalized = frame.interactionBox.normalizePoint(position);
    //
    //     let x = ctx.canvas.width * normalized[0];
    //     let y = ctx.canvas.height * normalized[2];
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
        //     let position = gesture.position;
        //     let normalized = frame.interactionBox.normalizePoint(position);
        //
        //     let x = ctx.canvas.width * normalized[0];
        //     let y = ctx.canvas.height * (1 - normalized[1]);
        //     console.log(x + " , " + y);
        //     let el = document.elementFromPoint(x, y);
        //     if (el) {
        //         el.click();
        //     }
        // }
    });
});
