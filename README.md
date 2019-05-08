# next-draggable
> Draggable simulate by touch event based on next toolkit

## install
```bash
npm install -S afeiship/next-draggable --registry=https://registry.npm.taobao.org
```

## usage
```js
import NxDraggable from 'next-draggable';

// code goes here:
new NxDraggable(element, {
  onChange: function(inEvent){
    const { type, value } = inEvent;
    switch(type){
      case 'dragstart':
      break;
      case 'drag':
      break;
      case 'dragend':
      break;
    }
  }
})
```

## resources
- https://github.com/afeiship
