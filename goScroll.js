const W = window,
    D = W.document,
    CLASS_NAME = 'auto-scrolling',   // className for body element while scrolling
    SPEED = 2,                       // default speed
    STOP_EVENT = 'ontouchstart' in W || W.navigator.MaxTouchPoints > 0 || W.navigator.msMaxTouchPoints > 0
        ? 'touchstart'
        : 'wheel';

let scrolling = 0;                   // flag to stop the scrolling

/**
 * Easing function - can be replaced if needed
 * @param {number} t - time
 * @param {number} b - start value
 * @param {number} c - end value
 * @param {number} d - duration
 * @returns {number}
 */
function easeOutQuad(t, b, c, d) {
    return Math.round(-c * (t /= d) * (t - 2) + b);
}

/**
 * Find the position of an element inside
 * the document or a parent element
 * @param {Element} el
 * @param {Element|Window} context
 * @param {number} scrollTop - scroll position of the parent element
 * @returns {number}
 */
function position(el, context, scrollTop) {
    if (context.nodeType) {
        return el.getBoundingClientRect().top - context.getBoundingClientRect().top + scrollTop;
    }
    // assuming `context` is the window
    return el.getBoundingClientRect().top + D.documentElement.scrollTop;
}


/**
 * Scroll stop event handler
 * @returns void
 */
function listen() {
    scrolling = 0;
}

/**
 * Main scroll function, sets the init values from the options object
 * and fire the requestAnimationFrame handler function
 * @param {object} options
 * @param {Element|Window} options.context - Leave blank to scroll the document, pass in an element to scroll its content
 * @param {Element|number|void} options.to - Leave blank to scroll to top, or pass in an element or a number
 * @param {number} options.offset - Nudge the target position
 * @param {number} options.speed - Override the default speed
 * @param {function} options.callback - Do something after the scrolling has/was stopped
 * @returns void
 */
export default function goScroll(options = {}) {
    let context = options.context || W, // default context is the window, else a given element
        startPos = context[options.context ? 'scrollTop' : 'pageYOffset'],
        targetPos = options.to && options.to.nodeType === 1 ? position(options.to, context, startPos) : (options.to || 0),
        distance = (targetPos - (options.offset || 0)) - startPos,
        startTime = Date.now(),
        duration = Math.abs(distance / (options.speed || SPEED)),
        targetTime = startTime + duration,
        callback = options.callback,
        handleScroll = options.context
            ? function (y) {
                context.scrollTop = y;
            }
            : function (y) {
                context.scrollTo(0, y);
            };

    scrolling = 1;                                  // wave the flag
    D.body.classList.add(CLASS_NAME);
    context.addEventListener(STOP_EVENT, listen);   // let the user stop the animation
    W.requestAnimationFrame(scroll);                // go!

    function scroll() {
        let now = Date.now();

        // scroll for some time
        if (scrolling && now <= targetTime) {
            handleScroll(easeOutQuad(now - startTime, startPos, distance, duration));
            W.requestAnimationFrame(scroll);
            return;
        }

        // time's up
        // if the animation is still allowed,
        // be certain we reached our target position.
        if (scrolling) {
            W.requestAnimationFrame(() => {
                handleScroll(targetPos - (options.offset || 0));
            });
        }

        if (typeof callback === "function") {
            callback.call(context, scrolling);
        }

        context.removeEventListener(STOP_EVENT, listen);
        D.body.classList.remove(CLASS_NAME);
    }
}