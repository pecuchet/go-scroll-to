# go-scroll-to 2
A fast and lightweight (±595B gzipped) javascript module to smoothly scrollTo. It scrolls by speed instead of duration, to a position or an element, within the window or any scrollable parent element. And it's stoppable. And aside from a modern browser, it's dependency free.

## !important
go-scroll-to has been rewritten to an ES6 module. If you still need support for older browsers use [version 1.0.3](https://github.com/pecuchet/go-scroll-to/releases/tag/1.0.3) (``npm install go-scroll-to@^1.0.3``)

## Features

- Scroll the window or any scrollable element
- Scroll by speed: the duration is relative to the distance
- Stop when the user manually scrolls (i.e. 'mouse wheels' or 'touch starts')
- Sets an 'auto-scrolling' class name on the body element
- Scroll to top, to a specific position or to an element
- Offset the target position
- Touch compatible

## Examples
### Scroll to top
```
goScroll();
```

### Scroll to position inside a scrollable element
```
goScroll({
    to: 300,
    context: document.getElementById('scrollable')
    });
```

### Scroll slowly to element inside a scrollable element
```
goScroll({
    to: document.getElementById('element'),
    speed: .3,
    context: document.getElementById('scrollable')
    });
```

## Install through npm
```
npm install go-scroll-to
```
for version 1: ``npm install go-scroll-to@^1.0.3``

## All Options

**to**: HTMLElement or Number. Default: 0  
**offset**: Number, offset the target position. Default: 0  
**context**: HTMLElement. Default: window  
**speed**: Float greater than 0, higher is faster. Default: 2  
**callback**: Function, triggered when target is reached or when the user interrupts the animation. The callback receives one argument, which will be `1` if the target position was reached. Default: undefined

## License
Apache 2.0
