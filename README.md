# Eve
Eve's gift to Earth is a supercharged version of `createElement()`. 

Rather than simply taking a tag name, `Eve.create()` takes an object that represents a more complete version of the element you are envisioning. 

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
var parent = Eve.create( 
  { tagName: 'div', className: 'container', children: [
    { tagName: 'div', children: [
      { tagName: 'button', textContent: 'Click Me' }
    ]}
  ]
});

```

------

The above example does not demonstrate everything you can do with this function. In fact, as it stands, the function appears to have one disadvantage, which is that it did not allow us to store references to the `child` and `button` variables. However, `create` can take an optional parameter, named `context`, which acts as a reference to a higher context. If you pass an `Object` as the value of this key, you can utilize the `assignTo` property, which creates a reference to the created element and stores it as a property on the object you passed in. So, (continuing with the above example) if I wanted to keep references to the inner div and the button as global variables, I could have done this instead:

```javascript
var parent = Eve.create({ context: window, 
  tagName: 'div', className: 'container', children: [
    { tagName: 'div', assignTo: 'child', children: [
      { tagName: 'button', assignTo: 'button', textContent: 'Click Me' }
    ]}
  ]
});

```

-------

Here's the complete list of properties that this function considers special. *At minimum*, you must specify either `tagName` or `direct`. The rest are optional.


 - **`tagName [String]`**
  - This value is passed as an argument to the vanilla `document.createElement` function.

- **`direct [Element]`**
 - As an alternative to using the `tagName` property, you can pass in an existing element using this property. If 
 both `direct` and `tagName` are present, then `tagName` will be ignored.

- **`parent [Element]`**
 - If you want to automatically append the newly created element as a child of another pre-existing element, you can pass a reference to the element as the value of this key.  

- **`context [Object]`**
 - If you pass in an object as the value of this key, you can utilize the `assignTo` and `appendTo` keys, which have the ability to create and mutate references in this object.   

- **`assignTo [String]`**
 - As described in the previous section, if this key is utilized and the `context` key is utilized, then a referenece to the element that gets created will be assigned as a property of the provided object. (The property name will be the value of this key.) 

- **`appendTo [String]`**
 - This option works the same way as `assignTo` except the string is meant to be an array that the newly created element will be appended to. 

- **`attrs [Object]`**
 - If you need to assign an attribute to the element itself, rather than simply create/modify a property on the object wrapper, then pass the attribute information as a property on the `attrs` object. Use the name of the attribute as the key and use the intended value as the value. See [this stackoverflow question](http://stackoverflow.com/a/6004028/3581485) for a good explanation of the difference between attributes and properties. 

- **`children [array]`**
 - As previously exemplified, this function supports recursion, so you can add representaions of any children you want your element to come with as elements in this array. (You can nest indefinitely) 
 
------

If this documentation has left you confused, then it is probably best you just view the source, it is much more concise than my pedantic english. ʕ•ᴥ•ʔ
