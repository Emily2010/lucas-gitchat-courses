const offset = ele => {
    let result = {
        top: 0,
        left: 0
    }

    // 当前 DOM 节点的 display === 'none' 时, 直接返回 {top: 0, left: 0}
    if (window.getComputedStyle(ele)['display'] === 'none') {
        return result
    }
 
    let position
 
    getOffset(ele, true)
 
    return result
 
    const getOffset = (node, init) => {
        if (node.nodeType !== 1) {
            return
        }

        position = window.getComputedStyle(node)['position']
 
        if (typeof(init) === 'undefined' && position === 'static') {
            getOffset(node.parentNode)
            return
        }

        result.top = node.offsetTop + result.top - node.scrollTop
        result.left = node.offsetLeft + result.left - node.scrollLeft
 
        if (position === 'fixed') {
            return
        }
 
        getOffset(node.parentNode)
    }
}

const offset = ele => {
    let result = {
        top: 0,
        left: 0
    }
    // 当前为 IE11 以下，直接返回 {top: 0, left: 0}
    if (!ele.getClientRects().length) {
        return result
    }

    // 当前 DOM 节点的 display === 'none' 时，直接返回 {top: 0, left: 0}
    if (window.getComputedStyle(ele)['display'] === 'none') {
        return result
    }

    result = ele.getBoundingClientRect()
    var docElement = ele.ownerDocument.documentElement

    return {
        top: result.top + window.pageYOffset - docElement.clientTop,
        left: result.left + window.pageXOffset - docElement.clientLeft
    }
}

const runPromiseInSequence = (array, value) => array.reduce(
    (promiseChain, currentFunction) => promiseChain.then(currentFunction),
    Promise.resolve(value)
)

const pipe = (...functions) => input => functions.reduce(
    (acc, fn) => fn(acc),
    input
)

if (!Array.prototype.reduce) {
  Object.defineProperty(Array.prototype, 'reduce', {
    value: function(callback /*, initialValue*/) {
      if (this === null) {
        throw new TypeError( 'Array.prototype.reduce ' + 
          'called on null or undefined' )
      }
      if (typeof callback !== 'function') {
        throw new TypeError( callback +
          ' is not a function')
      }
    
      var o = Object(this)
    
      var len = o.length >>> 0
    
      var k = 0
      var value
    
      if (arguments.length >= 2) {
        value = arguments[1]
      } else {
        while (k < len && !(k in o)) {
          k++
        }
    
        if (k >= len) {
          throw new TypeError( 'Reduce of empty array ' +
            'with no initial value' )
        }
        value = o[k++]
      }
    
      while (k < len) {
        if (k in o) {
          value = callback(value, o[k], k, o)
        }
    
        k++
      }
    
      return value
    }
  })
}

Array.prototype.reduce = Array.prototype.reduce || function(func, initialValue) {
    var arr = this
    var base = typeof initialValue === 'undefined' ? arr[0] : initialValue
    var startPoint = typeof initialValue === 'undefined' ? 1 : 0
    arr.slice(startPoint)
        .forEach(function(val, index) {
            base = func(base, val, index + startPoint, arr)
        })
    return base
}

const only = function(obj, keys){
    obj = obj || {}
    if ('string' == typeof keys) keys = keys.split(/ +/)
        return keys.reduce(function(ret, key){
    if (null == obj[key]) return ret
        ret[key] = obj[key]
        return ret
    }, {})
}

const compose = function(...args) {
    let length = args.length
    let count = length - 1
    let result
    return function f1 (...arg1) {
        result = args[count].apply(this, arg1)
        if (count <= 0) {
            count = length - 1
            return result
        }
        count--
        return f1.call(null, result)
    }
}

const reduceFunc = (f, g) => (...arg) => g.call(this, f.apply(this, arg))
const compose = (...args) => args.reverse().reduce(reduceFunc, args.shift())

const compose = (...args) => {
    let init = args.pop()
    return (...arg) => 
        args.reverse().reduce((sequence, func) => 
            sequence.then(result => func.call(null, result))
            , Promise.resolve(init.apply(null, arg)))
}

var compose = function(funcs) {
    var length = funcs.length
    var index = length
    while (index--) {
        if (typeof funcs[index] !== 'function') {
            throw new TypeError('Expected a function');
        }
    }
    return function(...args) {
        var index = 0
        var result = length ? funcs.reverse()[index].apply(this, args) : args[0]
        while (++index < length) {
            result = funcs[index].call(this, result)
        }
        return result
    }
}

function compose(...funcs) {
    if (funcs.length === 0) {
        return arg => arg
    }
    
    if (funcs.length === 1) {
        return funcs[0]
    }
    
    return funcs.reduce((a, b) => (...args) => a(b(...args)))
}

function bind(that) {
    var target = this;
    if (!isCallable(target)) {
        throw new TypeError('Function.prototype.bind called on incompatible ' + target);
    }
    var args = array_slice.call(arguments, 1);
    var bound;
    var binder = function () {
        if (this instanceof bound) {
            var result = target.apply(
                this,
                array_concat.call(args, array_slice.call(arguments))
            );
            if ($Object(result) === result) {
                return result;
            }
            return this;
        } else {
            return target.apply(
                that,
                array_concat.call(args, array_slice.call(arguments))
            );
        }
    };
    var boundLength = max(0, target.length - args.length);
    var boundArgs = [];
    for (var i = 0; i < boundLength; i++) {
        array_push.call(boundArgs, '$' + i);
    }
    bound = Function('binder', 'return function (' + boundArgs.join(',') + '){ return binder.apply(this, arguments); }')(binder);
    
    if (target.prototype) {
        Empty.prototype = target.prototype;
        bound.prototype = new Empty();
        Empty.prototype = null;
    }
    return bound;
}

Function.prototype.applyFn = function (targetObject, argsArray) {
    if(typeof argsArray === 'undefined' || argsArray === null) {
        argsArray = []
    }
    
    if(typeof targetObject === 'undefined' || targetObject === null){
        targetObject = this
    }
    
    targetObject = new Object(targetObject)
    
    const targetFnKey = 'targetFnKey'
    targetObject[targetFnKey] = this
    
    const result = targetObject[targetFnKey](...argsArray)
    delete targetObject[targetFnKey]
    return result
}