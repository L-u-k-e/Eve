# Eve
Eve's gift to Earth is a supercharged verison of `createElement()`. 

Rather than simply taking a tag name, this function takes an object that represents a more complete version of the element you are envisioning. 

This allows you to create your element, assign multiple properties and set multiple attributes on it in a single statement. Additionally, Eve supports recursion, so you can add children/grand-children/... of the same complexity.

It allows you to craft elements more akin to the way they are crafted in standard HTML. 


It turns this ugly mess:

```javascript
  var parent = document.createElement('div');
  parent.className = 'container';
  
  var child = document.createElement('div');
  parent.appendChild(child);
  
  var button = document.createElement('button');
  button.textContent = 'Click Me';
  child.appendChild(button);
```

Into this:

```javascript
var parent = createElement(
  tagName: 'div', className: 'container', children: [
    { tagName: 'div', children: [
      { tagName: 'button', textContent: 'Click Me'}
    ]}
  ]
}, window);

```
