# goScroll
A fast and lightweight native javascript module to smoothly scrollTo. It scrolls by speed instead of duration, to a position or an element, within the window or any scrollable parent element. It's stoppable. Aside from a modern browser, it's dependency free.

### Features

- Scroll the window or any scrollable element
- Scroll by speed: the duration is relative to the distance
- Stop when the user manually scrolls (i.e. 'mouse wheels' or 'touch starts')
- Sets an 'auto-scrolling' class on the body element.
- Scroll to top or a specific position
- Scroll to an element
- Offset the target position
- Touch, AMD and commonJS compatible

### Support
- IE9 needs a requestAnimationFrame polyfill

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

### Scroll slowly to element
```
goScroll({
    to: document.getElementById('element'),
    speed: .3
    });
```

## Install through npm
```
npm install go-scroll-to
```

## All Options

**to**: HTMLElement or Number. Default: 0  
**offset**: Number, offset the target position. Default: 0  
**context**: HTMLElement. Default: window  
**speed**: Float greater than 0, higher is faster. Default: 2  
**callback**: Function, triggered when target is reached or when the user interrupts the animation. The callback receives one argument, which will be `1` if the target position is reached. Default: undefined

## License
Apache 2.0
