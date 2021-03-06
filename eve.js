EVE = (function() {
  function create(spec){
    var element,
        properties,
        special_keys = [
          'context',   // reference to a higher context
          'parent',    // parent.appendChild(element) 
          'direct',    // use pre-created element
          'tagName',   // createElement(tagName)
          'children',  // recursively create and append provided children
          'assignTo',  // alias element as variable in hooked context
          'appendTo',  // append element to an array in hooked context 
          'attrs'      // add attrs via setAttribute
        ];

    //create the element
    if(spec.direct) element = spec.direct;
    else element = document.createElement(spec.tagName);

    //add custom properties
    properties = Object.keys(spec).filter( function(key){
      return special_keys.indexOf(key) === -1;
    }); 
    properties.forEach( function(prop){ element[prop] = spec[prop]; } );

    //set custom attributes
    if(spec.attrs) for(var key in spec.attrs) element.setAttribute(key, spec.attrs[key]);

    //give it a name in the higher context
    if(spec.context) {
      if(spec.assignTo) spec.context[spec.assignTo] = element;
      if(spec.appendTo) spec.context[spec.appendTo].push(element);
    }

    //generate and append children
    if(spec.children){
      spec.children.forEach( function(child_spec){
        child_spec.context = child_spec.context || spec.context;
        element.appendChild(create(child_spec));
      });
    }

    //append element to parent 
    if(spec.parent) spec.parent.appendChild(element);

    return element;
  }

  return Object.freeze({
    create: create
  });

}());
