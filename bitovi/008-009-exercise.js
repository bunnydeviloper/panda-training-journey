// ----- Exercise: creating the $ function
// fn will take a selector as arg, select elements from DOM, and return an array-like object
// hint: make an 'array-like' object, set length to curr || 0, add items w/ [].push.apply(this, items)
const $ = function(selector) {
  if ( !(this instanceof $) ) return new $(selector); // remove the need to call 'new'
  const elements = document.querySelectorAll(selector);
  Array.prototype.push.apply(this, elements);
};

// test for $ function
const listOfHeros = new $('ul li'); // const $li = new $("ul li");
console.log(listOfHeros); // $ {0: li, 1: li, 2: li, Length: 3} // can expand to see li elements
console.log(listOfHeros instanceof $); // true
console.log(listOfHeros.length); // 3
console.log(listOfHeros[0]); // <li><a href='#ironman">Ironman</a></li>

// ----- Extras: write array push fn -----
Array.prototype.push = function(a, b, c) { // can have unlimited arguments
  const startLength = this.length || 0;
  for (let i=0; i < arguments.length; i++) {
    this[startLength + i] = arguments[i];
  }
  this.length = startLength + arguments.length;
};

console.log('---------- This is exercises for lesson 8 ----------');

// ----- Exercise: implement $.extend
$.extend = function(target, object) { //1st arg is 'default', 2nd arg is 'additional' props
  // copy all properties from object into target
  for (const prop in object) {
    if (object.hasOwnProperty(prop)) {
      target[prop] = object[prop];
    }
  }
  return target;
};

const target = { first: 'Molly' }, object = { last: 'Bloom' };
const result = $.extend(target, object);

// test for $.extend
console.log('target', target); // { first: 'Molly', last: 'Bloom' }
console.log('result', result); // { first: 'Molly', last: 'Bloom' }
console.log('result === target: ', result === target); //true

$.extend($, {
  // ----- Exercise: implement $.isArray (determine whether the argument is an array)
  isArray: function(obj) {
    return Object.prototype.toString.call(obj) === "[object Array]";
  },

  // ----- Exercise: implement $.each(obj, cb(index, value)) // Iterate over arrays or objects
  each: function(collection, cb) {
    if (isArrayLike(collection)) { // applies when collecttion is an array ['a', 'b']
      for (let i=0; i < collection.length; i++) {
        cb(i, collection[i]);
      }
    } else { // applies when collection is an object {foo: 'bar', zed: 'ted'}
      for (let prop in collection) {
        cb(prop, collection[prop]);
      }
    }
    return collection; // always return the original collection
  },

  // ----- Exercise: implement $.makeArray(arr) 
  makeArray: function(arr) {
    const realArray = [];
    $.each(arr, function(i, item) {
      realArray.push(item);
    });
    return realArray;
  },

  // ----- Exercise: implement $.proxy(fn, context)
  // Take a fn and returns a new one that calls the original with a particular context
  proxy: function(fn, context) {
    return function() {
      return fn.apply(context, arguments); //arguments come from fn
    };
  },

  fn: $.prototype,
});

// test for $.isArray
console.log('isArray? []: ', $.isArray([])); // == true
// console.log('isArray? arguments: ', $.isArray(arguments)); // == false

// test with browser:
const iframe = document.createElement('iframe');
document.body.appendChild(iframe);
const _Array = iframe.contentWindow.Array; // $.isArray(new _Array()) == true;

// ----- Exercise: implement $.isArrayLike(obj) // Determine whether the argument is LIKE an array
const isArrayLike = function(object) {
  if (typeof object.length === 'number') {
    if (object.length === 0) return true;
    if (object.length > 0) {
      const lastIndex = object.length - 1;
      return lastIndex in object; //will return true or false
    }
    return false
  }
  return false;
};

/* rewrite with ternary operators
 * const isArrayLike = function(object) {
 *   return typeof(object.length === 'number') ?
 *     (object.length >= 0 ?
 *       object.length === 0 || ((object.length -1) in object)
 *       : false;
 *     : false;
 * };
 */

// test for isArrayLike
console.log(`isArrayLike? ['a', 'b', 'c'] : ${isArrayLike(['a', 'b', 'c'])}`); // == true
console.log(`isArrayLike? {length: 0} : ${isArrayLike({length: 0})}`); // == true, also true with 'length'
console.log(`isArrayLike? {'hello': 5, 5: 'hi'} : ${isArrayLike({'hello': 5, 5: 'hi'})}`); // == false
console.log(`isArrayLike? {0: 'foo', 5: 'bar', length: 6} \
: ${isArrayLike({0: 'foo', 5: 'bar', length: 6})}`); // == true
// console.log(`isArrayLike? arguments : ${isArrayLike(arguments)}`); // == true

// test with browser
const divs = document.getElementsByTagName('div');
isArrayLike(divs) == true;
const lis = document.getElementsByTagName('li');
isArrayLike(lis) == true;

// test for $.each
const resultEachArr = $.each(['a', 'b', 'c'], function(index, item) {
  console.log(`${item} is at index ${index}`);
});
console.log(resultEachArr);
const resultEachObj = $.each({foo: 'bar', zed: 'ted'}, function(prop,value) {
  console.log(`prop: ${prop}, value: ${value}`);
});
console.log(resultEachObj);

// test for $.makeArray(arr)
const originalInput = {0: 'foo', 5: 'bar', length: 6};
console.log(`$isArrray? ${JSON.stringify(originalInput)}: ${$.isArray(originalInput)}`);
console.log(`$isArrrayLike? ${JSON.stringify(originalInput)}: ${isArrayLike(originalInput)}`);
const appliedMakeArray = $.makeArray(originalInput);
console.log(`--> applied $.makeArray: ${appliedMakeArray}`);
console.log(`--> $isArray?: ${$.isArray(appliedMakeArray)}`);
if (appliedMakeArray.length === originalInput.length) console.log('--> both old and new have same length');
for (let i=0; i<appliedMakeArray.length; i++) {
  console.log('--> ', appliedMakeArray[i], ' same as ', originalInput[i]);
  // if item doesn't exist at an index, it will be 'undefined'
}

// test with browser
const childNodes = document.body.childNodes;
// ok(! $.isArray(childNOdes) );
const childArray = $.makeArray(childNodes);
// ok( $.isArray(childArray) );
if (childArray.length === childNodes.length) console.log('childArray has same length with childNodes');
for (let i=0; i<childArray.length; i++) {
  console.log(childArray[i], childNodes[i]);
}

// test for $.proxy(fn, context)
const dog = {
  name: 'Xixi',
  speak: function(words) {
    return this.name + ' says ' + words;
  }
};
const speakProxy = $.proxy(dog.speak, dog);
console.log(speakProxy('woofofo!'));
console.log('equal test: ', speakProxy('woof') == 'Xixi says woof');

// ----- --------------- -----
// ----- Lesson Number 9 -----

console.log('---------- This is exercises for lesson 9 ----------');

const getText = function(element) {
  let text = '';
  $.each(element.childNodes, function(i, child) {
    (child.nodeType === 3) ? text += child.nodeValue : text += getText(child);
    // note: nodeType === 3 when it is a text node
  });
  return text;
};

$.extend($.prototype, {
    // ----- Exercise: add html method to get/set the innerHTML of an element(s)
    // jQuery html(): GET the HTML contents of the 1st ele or SET the HTML contents of every matched element.
    // hint: html() should be 'chainable', returning the original $ instance when setting
    // eg: new $('li').html("") -> to replace all content to empty
    html: function(newHTMLString) {
      if ( arguments.length ) { // shouldn't use 'if(newHTMLString)' (think "", or 0...)
        // SETTER
        return $.each(this, function(i, element) {
          element.innerHTML = newHTMLString;
        });
      } else { // GETTER
        return this[0].innerHTML;
      }
    },

    // ----- Exercise: add an val method to get/set the value of an element
    val: function(newValue) { // same as html fn
      if (arguments.length) {
        return $.each(this, function(i, element) {
            element.value = newValue;
        });
      } else {
        return this[0].value;
      }
    },

    // ----- Exercise: add a text method to get/set the text of an element
    text: function(newText) {
      // to SET, clear html and append document.createTextNode( text ).
      if ( arguments.length ) {
        this.html('');
        return $.each(this, function(i, element) {
          const textNode = document.createTextNode(newText);
          element.appendChild(textNode);
        });
      } else {
      // to GET, recurse through each child if child.nodeType === 3, read and accumulate child.nodeValue
        return getText(this[0]); // getText() is a helper function from above
      }
    },
  
    // ----- Exercise: add a find method that returns items within the current elements
    find: function(selector) {
      // note: have $ also accept an array of nodes in $ fn
      let nodes = [];
      $.each(this, function(i, element) {
        const elements = element.querySelectorAll(selector);
        nodes.push.apply(nodes, elements);
        // if you do nodes.push(elements), it'll be an array of array
        // hence, do .apply() to spread it out to an array of all elements
      });
      return $(nodes);
    },

    next: function() {},
    prev: function() {},
    parent: function() {},
    children: function() {},
    attr: function(attr, val) {},
    css: function(style, val) {},
    width: function() {},
    hide: function() {},
    show: function() {},
});


// test for html()
const randomList = new $('#random');
randomList.html('<h2>Awesome Superheros</h2>').html(); //changed the innerHTML of #random to: '<h2>Awesome Superheros</h2>' 

// test for val()
console.log($('input').val()); //'some text'
$('input').val('new text'); //changed the value inside: '<input type="text" value="new text">'
console.log($('input').val()); //'new text'

// test for text()
console.log($('ul#superheros').text()); // note: there are NodeList[7] in the childNodes
/* result

      Ironman
      Superwoman
      Deadpool
    
*/
$('ul#superheros li:first-child').text('I AM IRON MAN!').text() //-> 'I AM IRON MAN!'

// test for find()
const heroImages = $('div').find('img');
