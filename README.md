# Eve
Eve's gift to Earth is a supercharged verison of `createElement()`. 

Rather than simply taking a tag name, this function takes an object that represents a more complete version of the element you are envisioning. 

This allows you to create your element, assign multiple properties and set multiple attributes on it in a single statement. Additionally, Eve supports recursion, so you can add children/grand-children/... of the same complexity.

-----

It turns this:

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
  { tagName: 'div', className: 'container', children: [
    { tagName: 'div', children: [
      { tagName: 'button', textContent: 'Click Me' }
    ]}
  ]
});

```

As you can see, the bottom solution is less pedantic and it is much easier to glean structural information with a quick glance at the code.

------

The above example, does not demonstrate everything you can do with this function. As it stands in fact, the function appears to have one disadvantage, which is that it did not allow us to store references to the `child` and `button` variables. However, `createElement()` can take an optional second argument. If you pass an `Object` as the second argument to this function, you can utilize the `assignTo` property, which creates a reference to the created element and stores it as a property on the object you pass as an argument. So, (continuing with the above example) if I wanted to keep references to the inner div and the button as global variables, I could have done this instead:

```javascript
var parent = createElement(
  { tagName: 'div', className: 'container', children: [
    { tagName: 'div', assignTo: 'child', children: [
      { tagName: 'button', assignTo: 'button', textContent: 'Click Me' }
    ]}
  ]
}, window);

```

-------

In addition to `tagName`, `assignTo` and `children`, there are a few other properties that are treated as special. 
