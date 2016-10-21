(function ( w, d, undefined ) {
    'use strict';

    var CLASSNAME = 'auto-scrolling',   // className for body element while scrolling
        SPEED     = 2,                  // default speed

        scrolling = 0,                  // are-we-scrolling flag
        css_regex = new RegExp( '(?:^|\\s)'+CLASSNAME+'(?!\\S)', 'gi' ),    // to remove the body className after scrolling

        // if we are using a touch screen use touch start,
        // else find a wheel event to stop the animation.
        stopEvent = 'ontouchstart' in w || navigator.MaxTouchPoints > 0 || navigator.msMaxTouchPoints > 0
                ? 'touchstart'
                : 'onwheel' in d.createElement( 'div' )
                    ? 'wheel'                           // ie9+, sf7.0+, ff17.0+, ch31
                    : d.onmousewheel !== undefined
                        ? 'mousewheel'                  // ie6+, sf3.0+, ch1.0+
                        : 'DOMMouseScroll';

    // easing function
    function easeOutQuad ( t, b, c, d ) {
        return Math.round( -c *(t/=d)*(t-2) + b );
    }

    // find the position on an element
    function position ( el, context ) {
        var top = 0;
        if ( el.offsetParent ) {
            do {
                top += el.offsetTop;
            } while ( ( el = el.offsetParent ) && ( el.offsetParent != context ) )
        }
        return top;
    }

    // set are-we-scrolling flag stopEvent handler
    function listen() { scrolling = 0; }

    function go ( options ) {
        options = options || {};

        var context = options.context || w,// default context is the window, else a given element
            targetPos = options.to && options.to.nodeType === 1 ? position(options.to, context) : (options.to || 0),
            startPos = context[ options.context ? 'scrollTop' : 'pageYOffset' ],
            distance = (targetPos - (options.offset || 0)) - startPos,
            startTime = Date.now(),
            duration = Math.abs( distance / (options.speed || SPEED) ),
            targetTime = startTime + duration,
            callback = options.callback,
            handleScroll = options.context
                ? function ( y ) { context.scrollTop = y; }
                : function ( y ) { context.scrollTo( 0, y ); };

        function scroll () {
            var now = Date.now();

            // scroll for some time
            if ( scrolling && now <= targetTime ) {
                handleScroll( easeOutQuad( now - startTime, startPos, distance, duration ) );
                w.requestAnimationFrame( scroll );
                return;
            }

            // time's up
            // if the animation is still running,
            // be certain we reached our target position.
            if ( scrolling ) {
                w.requestAnimationFrame(function() { handleScroll(targetPos - (options.offset || 0)); });
            }
            // callback
            if ( typeof callback === "function" ) {
                callback.call( context, scrolling );
            }
            // remove the stop event handler
            context.removeEventListener( stopEvent, listen );
            // remove the body class
            d.body.className = d.body.className.replace( css_regex, '' );
        }

        scrolling = 1;                                  // wave the flag
        d.body.className += ' ' + CLASSNAME;            // we-are-scrolling className
        context.addEventListener( stopEvent, listen );  // let the user stop the animation
        w.requestAnimationFrame( scroll );              // go!
    }

    // UMD
    if (typeof define === 'function' && define.amd) {
        define([], function(){ return go; });
    } else if (typeof module === 'object' && module.exports) {
        module.exports = go;
    } else {
        window.goScroll = go;
    }
} ( window, document ) );