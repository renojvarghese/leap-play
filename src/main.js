import "./scss/main.scss";
import Leap from "leapjs";
import activeHands from "./hands";

const setCursor = (hand, x, y, z) => {
    if (!hand.active) {
        hand.cursor.style.display = "none";
        if (hand.currEl) {
        }
        return;
    }
    hand.cursor.style.display = "block";
    hand.cursor.style.left = x + "px";
    hand.cursor.style.top = y + "px";
    hand.onPress = z < 20;
    let el = document.elementFromPoint(x, y);
    if (
        el &&
        el.tagName !== "CANVAS" &&
        el.tagName !== "BODY" &&
        el.tagName !== "HTML"
    ) {
        if (hand.currEl && hand.currEl != el) {
            hand.currEl.blur();
            hand.currEl.setAttribute("press", false);
            hand.currEl = el;
            hand.currEl.focus();
        } else {
            hand.currEl = el;
            hand.currEl.focus();
        }
    } else {
        if (hand.currEl) {
            hand.currEl.blur();
            hand.currEl.setAttribute("press", false);
            hand.currEl = null;
        }
    }

    if (hand.onPress) {
        hand.cursor.setAttribute("pressing", true);
        hand.willClick = true;
        if (hand.currEl) {
            hand.currEl.blur();
            hand.currEl.setAttribute("press", true);
        }
    } else {
        hand.cursor.setAttribute("pressing", false);
        if (hand.willClick && hand.currEl) {
            hand.currEl.focus();
            if (typeof hand.currEl.onclick === "function") {
                const e = new Event("click");
                e.hand = hand;
                hand.currEl.onclick(e);
            }
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
});
