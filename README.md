# Eve
Eve's gift to Earth is a supercharged version of `createElement()`. 

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

Here's the complete list of properties that this function considers special, you must specify either `tagName` or `direct`. The rest are optional.

 - *`tagName [String]`*
  - This value is passed as an argument to the vanilla `document.createElement` function.

- *`direct [Element]`*
 - As an alternative to using the `tagName` property, you can pass in an existing element using this property. If both `direct` and `tagName` are present, then `tagName` will be ignored.

- *`assignTo [String]`*
 - As described in the previous section, if this key is utilized and an object is passed in as the second argument to the function, then a refernece to the element that gets created will be assigned as a property of the provided object. (The property name will be the value of this key.) 

- *`attrs [2D array]`*
 - If you need to assign an attribute to the element itself, rather than simply create/modify a property on the object wrapper, than pass the attribute information as an element of the `attrs` array. Use the name of the attribute as the first element of the nested array and use the intended value as the second. See [this stackoverflow question](http://stackoverflow.com/a/6004028/3581485) for a good explanation of the difference between attributs and properties. 

- *`children [array]`*
 - As previously exemplified, this function supports recursion, so you can add representaions of any children you want your element to come with as elements in this array. (You can nest indefinitely) 
 
------

If this documentation has left you confused, then it is probably best you just view the source, it is much more concise than my pedantic english. ʕ•ᴥ•ʔ
