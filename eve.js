function createElement(hash, context){
  var element;

  //create the element
  if(hash.direct){ element = hash.direct; }
  else{ element = document.createElement(hash.tagName); }

  //add custom properties
  var properties = Object.getOwnPropertyNames(hash).filter( function(element){ 
    return ['direct','tagName', 'children', 'assignTo', 'attrs'].indexOf(element) == -1; 
  });
  properties.forEach( function(prop){ element[prop] = hash[prop]; } );

  //set custom attributes
  if(hash.attrs){
    hash.attrs.forEach( function(attr){
      element.setAttribute(attr[0], attr[1]);
    });
  }

  //give it a name in the higher context 
  if(hash.assignTo && context){ context[hash.assignTo] = element }

  //generate and append children
  if(hash.children){
    hash.children.forEach( function(child_hash){ 
      element.appendChild( createElement(context, child_hash) ); 
    });
  }

  return element;
}