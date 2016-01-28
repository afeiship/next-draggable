#next-net-ajax

##description:
+ Draggable simulate by touch event based on next toolkit.

##usage:
+ get instance:
```javascript
  var dom=nx.$('#drag1');
  var instance=new nx.ui.Draggable({
    dom:dom[0]
  });
```
+ dragstart:
```javascript
  instance.on('dragstart',function(){
    console.log('dragstart!!!');
  });
```
+ drag:
```javascript
  instance.on('drag',function(){
    console.log('move!!!');
  });
```
+ dragend:
```javascript
  instance.on('dragend',function(){
    console.log('dragend!!!');
  });
```

