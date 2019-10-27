/*
 * VarSnap.js v1.0.0
 */
(function(exports) {
    (function(f) {
        if (typeof exports === "object" && typeof module !== "undefined") {
            module.exports = f();
        } else if (typeof define === "function" && define.amd) {
            define([], f);
        } else {
            var g;
            if (typeof window !== "undefined") {
                g = window;
            } else if (typeof global !== "undefined") {
                g = global;
            } else if (typeof self !== "undefined") {
                g = self;
            } else {
                g = this;
            }
            g.varsnap = f();
        }
    })(function() {
        var define, module, exports;
        return function() {
            function r(e, n, t) {
                function o(i, f) {
                    if (!n[i]) {
                        if (!e[i]) {
                            var c = "function" == typeof require && require;
                            if (!f && c) return c(i, !0);
                            if (u) return u(i, !0);
                            var a = new Error("Cannot find module '" + i + "'");
                            throw a.code = "MODULE_NOT_FOUND", a;
                        }
                        var p = n[i] = {
                            exports: {}
                        };
                        e[i][0].call(p.exports, function(r) {
                            var n = e[i][1][r];
                            return o(n || r);
                        }, p, p.exports, r, e, n, t);
                    }
                    return n[i].exports;
                }
                for (var u = "function" == typeof require && require, i = 0; i < t.length; i++) o(t[i]);
                return o;
            }
            return r;
        }()({
            1: [ function(require, module, exports) {
                "use strict";
                var core = require("./varsnap/core");
                core.varsnap.version = core.version;
                core.varsnap.TestCase = function TestCase() {
                    var test = require("./varsnap/test");
                    return test;
                };
                module.exports = core.varsnap;
            }, {
                "./varsnap/core": 33,
                "./varsnap/test": undefined
            } ],
            2: [ function(require, module, exports) {
                "use strict";
                var keys = require("object-keys");
                var hasSymbols = typeof Symbol === "function" && typeof Symbol("foo") === "symbol";
                var toStr = Object.prototype.toString;
                var concat = Array.prototype.concat;
                var origDefineProperty = Object.defineProperty;
                var isFunction = function(fn) {
                    return typeof fn === "function" && toStr.call(fn) === "[object Function]";
                };
                var arePropertyDescriptorsSupported = function() {
                    var obj = {};
                    try {
                        origDefineProperty(obj, "x", {
                            enumerable: false,
                            value: obj
                        });
                        for (var _ in obj) {
                            return false;
                        }
                        return obj.x === obj;
                    } catch (e) {
                        return false;
                    }
                };
                var supportsDescriptors = origDefineProperty && arePropertyDescriptorsSupported();
                var defineProperty = function(object, name, value, predicate) {
                    if (name in object && (!isFunction(predicate) || !predicate())) {
                        return;
                    }
                    if (supportsDescriptors) {
                        origDefineProperty(object, name, {
                            configurable: true,
                            enumerable: false,
                            value: value,
                            writable: true
                        });
                    } else {
                        object[name] = value;
                    }
                };
                var defineProperties = function(object, map) {
                    var predicates = arguments.length > 2 ? arguments[2] : {};
                    var props = keys(map);
                    if (hasSymbols) {
                        props = concat.call(props, Object.getOwnPropertySymbols(map));
                    }
                    for (var i = 0; i < props.length; i += 1) {
                        defineProperty(object, props[i], map[props[i]], predicates[props[i]]);
                    }
                };
                defineProperties.supportsDescriptors = !!supportsDescriptors;
                module.exports = defineProperties;
            }, {
                "object-keys": 21
            } ],
            3: [ function(require, module, exports) {
                "use strict";
                var undefined;
                var ThrowTypeError = Object.getOwnPropertyDescriptor ? function() {
                    return Object.getOwnPropertyDescriptor(arguments, "callee").get;
                }() : function() {
                    throw new TypeError();
                };
                var hasSymbols = typeof Symbol === "function" && typeof Symbol.iterator === "symbol";
                var getProto = Object.getPrototypeOf || function(x) {
                    return x.__proto__;
                };
                var generator;
                var generatorFunction = generator ? getProto(generator) : undefined;
                var asyncFn;
                var asyncFunction = asyncFn ? asyncFn.constructor : undefined;
                var asyncGen;
                var asyncGenFunction = asyncGen ? getProto(asyncGen) : undefined;
                var asyncGenIterator = asyncGen ? asyncGen() : undefined;
                var TypedArray = typeof Uint8Array === "undefined" ? undefined : getProto(Uint8Array);
                var INTRINSICS = {
                    "$ %Array%": Array,
                    "$ %ArrayBuffer%": typeof ArrayBuffer === "undefined" ? undefined : ArrayBuffer,
                    "$ %ArrayBufferPrototype%": typeof ArrayBuffer === "undefined" ? undefined : ArrayBuffer.prototype,
                    "$ %ArrayIteratorPrototype%": hasSymbols ? getProto([][Symbol.iterator]()) : undefined,
                    "$ %ArrayPrototype%": Array.prototype,
                    "$ %ArrayProto_entries%": Array.prototype.entries,
                    "$ %ArrayProto_forEach%": Array.prototype.forEach,
                    "$ %ArrayProto_keys%": Array.prototype.keys,
                    "$ %ArrayProto_values%": Array.prototype.values,
                    "$ %AsyncFromSyncIteratorPrototype%": undefined,
                    "$ %AsyncFunction%": asyncFunction,
                    "$ %AsyncFunctionPrototype%": asyncFunction ? asyncFunction.prototype : undefined,
                    "$ %AsyncGenerator%": asyncGen ? getProto(asyncGenIterator) : undefined,
                    "$ %AsyncGeneratorFunction%": asyncGenFunction,
                    "$ %AsyncGeneratorPrototype%": asyncGenFunction ? asyncGenFunction.prototype : undefined,
                    "$ %AsyncIteratorPrototype%": asyncGenIterator && hasSymbols && Symbol.asyncIterator ? asyncGenIterator[Symbol.asyncIterator]() : undefined,
                    "$ %Atomics%": typeof Atomics === "undefined" ? undefined : Atomics,
                    "$ %Boolean%": Boolean,
                    "$ %BooleanPrototype%": Boolean.prototype,
                    "$ %DataView%": typeof DataView === "undefined" ? undefined : DataView,
                    "$ %DataViewPrototype%": typeof DataView === "undefined" ? undefined : DataView.prototype,
                    "$ %Date%": Date,
                    "$ %DatePrototype%": Date.prototype,
                    "$ %decodeURI%": decodeURI,
                    "$ %decodeURIComponent%": decodeURIComponent,
                    "$ %encodeURI%": encodeURI,
                    "$ %encodeURIComponent%": encodeURIComponent,
                    "$ %Error%": Error,
                    "$ %ErrorPrototype%": Error.prototype,
                    "$ %eval%": eval,
                    "$ %EvalError%": EvalError,
                    "$ %EvalErrorPrototype%": EvalError.prototype,
                    "$ %Float32Array%": typeof Float32Array === "undefined" ? undefined : Float32Array,
                    "$ %Float32ArrayPrototype%": typeof Float32Array === "undefined" ? undefined : Float32Array.prototype,
                    "$ %Float64Array%": typeof Float64Array === "undefined" ? undefined : Float64Array,
                    "$ %Float64ArrayPrototype%": typeof Float64Array === "undefined" ? undefined : Float64Array.prototype,
                    "$ %Function%": Function,
                    "$ %FunctionPrototype%": Function.prototype,
                    "$ %Generator%": generator ? getProto(generator()) : undefined,
                    "$ %GeneratorFunction%": generatorFunction,
                    "$ %GeneratorPrototype%": generatorFunction ? generatorFunction.prototype : undefined,
                    "$ %Int8Array%": typeof Int8Array === "undefined" ? undefined : Int8Array,
                    "$ %Int8ArrayPrototype%": typeof Int8Array === "undefined" ? undefined : Int8Array.prototype,
                    "$ %Int16Array%": typeof Int16Array === "undefined" ? undefined : Int16Array,
                    "$ %Int16ArrayPrototype%": typeof Int16Array === "undefined" ? undefined : Int8Array.prototype,
                    "$ %Int32Array%": typeof Int32Array === "undefined" ? undefined : Int32Array,
                    "$ %Int32ArrayPrototype%": typeof Int32Array === "undefined" ? undefined : Int32Array.prototype,
                    "$ %isFinite%": isFinite,
                    "$ %isNaN%": isNaN,
                    "$ %IteratorPrototype%": hasSymbols ? getProto(getProto([][Symbol.iterator]())) : undefined,
                    "$ %JSON%": JSON,
                    "$ %JSONParse%": JSON.parse,
                    "$ %Map%": typeof Map === "undefined" ? undefined : Map,
                    "$ %MapIteratorPrototype%": typeof Map === "undefined" || !hasSymbols ? undefined : getProto(new Map()[Symbol.iterator]()),
                    "$ %MapPrototype%": typeof Map === "undefined" ? undefined : Map.prototype,
                    "$ %Math%": Math,
                    "$ %Number%": Number,
                    "$ %NumberPrototype%": Number.prototype,
                    "$ %Object%": Object,
                    "$ %ObjectPrototype%": Object.prototype,
                    "$ %ObjProto_toString%": Object.prototype.toString,
                    "$ %ObjProto_valueOf%": Object.prototype.valueOf,
                    "$ %parseFloat%": parseFloat,
                    "$ %parseInt%": parseInt,
                    "$ %Promise%": typeof Promise === "undefined" ? undefined : Promise,
                    "$ %PromisePrototype%": typeof Promise === "undefined" ? undefined : Promise.prototype,
                    "$ %PromiseProto_then%": typeof Promise === "undefined" ? undefined : Promise.prototype.then,
                    "$ %Promise_all%": typeof Promise === "undefined" ? undefined : Promise.all,
                    "$ %Promise_reject%": typeof Promise === "undefined" ? undefined : Promise.reject,
                    "$ %Promise_resolve%": typeof Promise === "undefined" ? undefined : Promise.resolve,
                    "$ %Proxy%": typeof Proxy === "undefined" ? undefined : Proxy,
                    "$ %RangeError%": RangeError,
                    "$ %RangeErrorPrototype%": RangeError.prototype,
                    "$ %ReferenceError%": ReferenceError,
                    "$ %ReferenceErrorPrototype%": ReferenceError.prototype,
                    "$ %Reflect%": typeof Reflect === "undefined" ? undefined : Reflect,
                    "$ %RegExp%": RegExp,
                    "$ %RegExpPrototype%": RegExp.prototype,
                    "$ %Set%": typeof Set === "undefined" ? undefined : Set,
                    "$ %SetIteratorPrototype%": typeof Set === "undefined" || !hasSymbols ? undefined : getProto(new Set()[Symbol.iterator]()),
                    "$ %SetPrototype%": typeof Set === "undefined" ? undefined : Set.prototype,
                    "$ %SharedArrayBuffer%": typeof SharedArrayBuffer === "undefined" ? undefined : SharedArrayBuffer,
                    "$ %SharedArrayBufferPrototype%": typeof SharedArrayBuffer === "undefined" ? undefined : SharedArrayBuffer.prototype,
                    "$ %String%": String,
                    "$ %StringIteratorPrototype%": hasSymbols ? getProto(""[Symbol.iterator]()) : undefined,
                    "$ %StringPrototype%": String.prototype,
                    "$ %Symbol%": hasSymbols ? Symbol : undefined,
                    "$ %SymbolPrototype%": hasSymbols ? Symbol.prototype : undefined,
                    "$ %SyntaxError%": SyntaxError,
                    "$ %SyntaxErrorPrototype%": SyntaxError.prototype,
                    "$ %ThrowTypeError%": ThrowTypeError,
                    "$ %TypedArray%": TypedArray,
                    "$ %TypedArrayPrototype%": TypedArray ? TypedArray.prototype : undefined,
                    "$ %TypeError%": TypeError,
                    "$ %TypeErrorPrototype%": TypeError.prototype,
                    "$ %Uint8Array%": typeof Uint8Array === "undefined" ? undefined : Uint8Array,
                    "$ %Uint8ArrayPrototype%": typeof Uint8Array === "undefined" ? undefined : Uint8Array.prototype,
                    "$ %Uint8ClampedArray%": typeof Uint8ClampedArray === "undefined" ? undefined : Uint8ClampedArray,
                    "$ %Uint8ClampedArrayPrototype%": typeof Uint8ClampedArray === "undefined" ? undefined : Uint8ClampedArray.prototype,
                    "$ %Uint16Array%": typeof Uint16Array === "undefined" ? undefined : Uint16Array,
                    "$ %Uint16ArrayPrototype%": typeof Uint16Array === "undefined" ? undefined : Uint16Array.prototype,
                    "$ %Uint32Array%": typeof Uint32Array === "undefined" ? undefined : Uint32Array,
                    "$ %Uint32ArrayPrototype%": typeof Uint32Array === "undefined" ? undefined : Uint32Array.prototype,
                    "$ %URIError%": URIError,
                    "$ %URIErrorPrototype%": URIError.prototype,
                    "$ %WeakMap%": typeof WeakMap === "undefined" ? undefined : WeakMap,
                    "$ %WeakMapPrototype%": typeof WeakMap === "undefined" ? undefined : WeakMap.prototype,
                    "$ %WeakSet%": typeof WeakSet === "undefined" ? undefined : WeakSet,
                    "$ %WeakSetPrototype%": typeof WeakSet === "undefined" ? undefined : WeakSet.prototype
                };
                module.exports = function GetIntrinsic(name, allowMissing) {
                    if (arguments.length > 1 && typeof allowMissing !== "boolean") {
                        throw new TypeError('"allowMissing" argument must be a boolean');
                    }
                    var key = "$ " + name;
                    if (!(key in INTRINSICS)) {
                        throw new SyntaxError("intrinsic " + name + " does not exist!");
                    }
                    if (typeof INTRINSICS[key] === "undefined" && !allowMissing) {
                        throw new TypeError("intrinsic " + name + " exists, but is not available. Please file an issue!");
                    }
                    return INTRINSICS[key];
                };
            }, {} ],
            4: [ function(require, module, exports) {
                "use strict";
                var GetIntrinsic = require("./GetIntrinsic");
                var $Object = GetIntrinsic("%Object%");
                var $TypeError = GetIntrinsic("%TypeError%");
                var $String = GetIntrinsic("%String%");
                var assertRecord = require("./helpers/assertRecord");
                var $isNaN = require("./helpers/isNaN");
                var $isFinite = require("./helpers/isFinite");
                var sign = require("./helpers/sign");
                var mod = require("./helpers/mod");
                var IsCallable = require("is-callable");
                var toPrimitive = require("es-to-primitive/es5");
                var has = require("has");
                var ES5 = {
                    ToPrimitive: toPrimitive,
                    ToBoolean: function ToBoolean(value) {
                        return !!value;
                    },
                    ToNumber: function ToNumber(value) {
                        return +value;
                    },
                    ToInteger: function ToInteger(value) {
                        var number = this.ToNumber(value);
                        if ($isNaN(number)) {
                            return 0;
                        }
                        if (number === 0 || !$isFinite(number)) {
                            return number;
                        }
                        return sign(number) * Math.floor(Math.abs(number));
                    },
                    ToInt32: function ToInt32(x) {
                        return this.ToNumber(x) >> 0;
                    },
                    ToUint32: function ToUint32(x) {
                        return this.ToNumber(x) >>> 0;
                    },
                    ToUint16: function ToUint16(value) {
                        var number = this.ToNumber(value);
                        if ($isNaN(number) || number === 0 || !$isFinite(number)) {
                            return 0;
                        }
                        var posInt = sign(number) * Math.floor(Math.abs(number));
                        return mod(posInt, 65536);
                    },
                    ToString: function ToString(value) {
                        return $String(value);
                    },
                    ToObject: function ToObject(value) {
                        this.CheckObjectCoercible(value);
                        return $Object(value);
                    },
                    CheckObjectCoercible: function CheckObjectCoercible(value, optMessage) {
                        if (value == null) {
                            throw new $TypeError(optMessage || "Cannot call method on " + value);
                        }
                        return value;
                    },
                    IsCallable: IsCallable,
                    SameValue: function SameValue(x, y) {
                        if (x === y) {
                            if (x === 0) {
                                return 1 / x === 1 / y;
                            }
                            return true;
                        }
                        return $isNaN(x) && $isNaN(y);
                    },
                    Type: function Type(x) {
                        if (x === null) {
                            return "Null";
                        }
                        if (typeof x === "undefined") {
                            return "Undefined";
                        }
                        if (typeof x === "function" || typeof x === "object") {
                            return "Object";
                        }
                        if (typeof x === "number") {
                            return "Number";
                        }
                        if (typeof x === "boolean") {
                            return "Boolean";
                        }
                        if (typeof x === "string") {
                            return "String";
                        }
                    },
                    IsPropertyDescriptor: function IsPropertyDescriptor(Desc) {
                        if (this.Type(Desc) !== "Object") {
                            return false;
                        }
                        var allowed = {
                            "[[Configurable]]": true,
                            "[[Enumerable]]": true,
                            "[[Get]]": true,
                            "[[Set]]": true,
                            "[[Value]]": true,
                            "[[Writable]]": true
                        };
                        for (var key in Desc) {
                            if (has(Desc, key) && !allowed[key]) {
                                return false;
                            }
                        }
                        var isData = has(Desc, "[[Value]]");
                        var IsAccessor = has(Desc, "[[Get]]") || has(Desc, "[[Set]]");
                        if (isData && IsAccessor) {
                            throw new $TypeError("Property Descriptors may not be both accessor and data descriptors");
                        }
                        return true;
                    },
                    IsAccessorDescriptor: function IsAccessorDescriptor(Desc) {
                        if (typeof Desc === "undefined") {
                            return false;
                        }
                        assertRecord(this, "Property Descriptor", "Desc", Desc);
                        if (!has(Desc, "[[Get]]") && !has(Desc, "[[Set]]")) {
                            return false;
                        }
                        return true;
                    },
                    IsDataDescriptor: function IsDataDescriptor(Desc) {
                        if (typeof Desc === "undefined") {
                            return false;
                        }
                        assertRecord(this, "Property Descriptor", "Desc", Desc);
                        if (!has(Desc, "[[Value]]") && !has(Desc, "[[Writable]]")) {
                            return false;
                        }
                        return true;
                    },
                    IsGenericDescriptor: function IsGenericDescriptor(Desc) {
                        if (typeof Desc === "undefined") {
                            return false;
                        }
                        assertRecord(this, "Property Descriptor", "Desc", Desc);
                        if (!this.IsAccessorDescriptor(Desc) && !this.IsDataDescriptor(Desc)) {
                            return true;
                        }
                        return false;
                    },
                    FromPropertyDescriptor: function FromPropertyDescriptor(Desc) {
                        if (typeof Desc === "undefined") {
                            return Desc;
                        }
                        assertRecord(this, "Property Descriptor", "Desc", Desc);
                        if (this.IsDataDescriptor(Desc)) {
                            return {
                                value: Desc["[[Value]]"],
                                writable: !!Desc["[[Writable]]"],
                                enumerable: !!Desc["[[Enumerable]]"],
                                configurable: !!Desc["[[Configurable]]"]
                            };
                        } else if (this.IsAccessorDescriptor(Desc)) {
                            return {
                                get: Desc["[[Get]]"],
                                set: Desc["[[Set]]"],
                                enumerable: !!Desc["[[Enumerable]]"],
                                configurable: !!Desc["[[Configurable]]"]
                            };
                        } else {
                            throw new $TypeError("FromPropertyDescriptor must be called with a fully populated Property Descriptor");
                        }
                    },
                    ToPropertyDescriptor: function ToPropertyDescriptor(Obj) {
                        if (this.Type(Obj) !== "Object") {
                            throw new $TypeError("ToPropertyDescriptor requires an object");
                        }
                        var desc = {};
                        if (has(Obj, "enumerable")) {
                            desc["[[Enumerable]]"] = this.ToBoolean(Obj.enumerable);
                        }
                        if (has(Obj, "configurable")) {
                            desc["[[Configurable]]"] = this.ToBoolean(Obj.configurable);
                        }
                        if (has(Obj, "value")) {
                            desc["[[Value]]"] = Obj.value;
                        }
                        if (has(Obj, "writable")) {
                            desc["[[Writable]]"] = this.ToBoolean(Obj.writable);
                        }
                        if (has(Obj, "get")) {
                            var getter = Obj.get;
                            if (typeof getter !== "undefined" && !this.IsCallable(getter)) {
                                throw new TypeError("getter must be a function");
                            }
                            desc["[[Get]]"] = getter;
                        }
                        if (has(Obj, "set")) {
                            var setter = Obj.set;
                            if (typeof setter !== "undefined" && !this.IsCallable(setter)) {
                                throw new $TypeError("setter must be a function");
                            }
                            desc["[[Set]]"] = setter;
                        }
                        if ((has(desc, "[[Get]]") || has(desc, "[[Set]]")) && (has(desc, "[[Value]]") || has(desc, "[[Writable]]"))) {
                            throw new $TypeError("Invalid property descriptor. Cannot both specify accessors and a value or writable attribute");
                        }
                        return desc;
                    }
                };
                module.exports = ES5;
            }, {
                "./GetIntrinsic": 3,
                "./helpers/assertRecord": 5,
                "./helpers/isFinite": 6,
                "./helpers/isNaN": 7,
                "./helpers/mod": 8,
                "./helpers/sign": 9,
                "es-to-primitive/es5": 10,
                has: 17,
                "is-callable": 18
            } ],
            5: [ function(require, module, exports) {
                "use strict";
                var GetIntrinsic = require("../GetIntrinsic");
                var $TypeError = GetIntrinsic("%TypeError%");
                var $SyntaxError = GetIntrinsic("%SyntaxError%");
                var has = require("has");
                var predicates = {
                    "Property Descriptor": function isPropertyDescriptor(ES, Desc) {
                        if (ES.Type(Desc) !== "Object") {
                            return false;
                        }
                        var allowed = {
                            "[[Configurable]]": true,
                            "[[Enumerable]]": true,
                            "[[Get]]": true,
                            "[[Set]]": true,
                            "[[Value]]": true,
                            "[[Writable]]": true
                        };
                        for (var key in Desc) {
                            if (has(Desc, key) && !allowed[key]) {
                                return false;
                            }
                        }
                        var isData = has(Desc, "[[Value]]");
                        var IsAccessor = has(Desc, "[[Get]]") || has(Desc, "[[Set]]");
                        if (isData && IsAccessor) {
                            throw new $TypeError("Property Descriptors may not be both accessor and data descriptors");
                        }
                        return true;
                    }
                };
                module.exports = function assertRecord(ES, recordType, argumentName, value) {
                    var predicate = predicates[recordType];
                    if (typeof predicate !== "function") {
                        throw new $SyntaxError("unknown record type: " + recordType);
                    }
                    if (!predicate(ES, value)) {
                        throw new $TypeError(argumentName + " must be a " + recordType);
                    }
                    console.log(predicate(ES, value), value);
                };
            }, {
                "../GetIntrinsic": 3,
                has: 17
            } ],
            6: [ function(require, module, exports) {
                var $isNaN = Number.isNaN || function(a) {
                    return a !== a;
                };
                module.exports = Number.isFinite || function(x) {
                    return typeof x === "number" && !$isNaN(x) && x !== Infinity && x !== -Infinity;
                };
            }, {} ],
            7: [ function(require, module, exports) {
                module.exports = Number.isNaN || function isNaN(a) {
                    return a !== a;
                };
            }, {} ],
            8: [ function(require, module, exports) {
                module.exports = function mod(number, modulo) {
                    var remain = number % modulo;
                    return Math.floor(remain >= 0 ? remain : remain + modulo);
                };
            }, {} ],
            9: [ function(require, module, exports) {
                module.exports = function sign(number) {
                    return number >= 0 ? 1 : -1;
                };
            }, {} ],
            10: [ function(require, module, exports) {
                "use strict";
                var toStr = Object.prototype.toString;
                var isPrimitive = require("./helpers/isPrimitive");
                var isCallable = require("is-callable");
                var ES5internalSlots = {
                    "[[DefaultValue]]": function(O) {
                        var actualHint;
                        if (arguments.length > 1) {
                            actualHint = arguments[1];
                        } else {
                            actualHint = toStr.call(O) === "[object Date]" ? String : Number;
                        }
                        if (actualHint === String || actualHint === Number) {
                            var methods = actualHint === String ? [ "toString", "valueOf" ] : [ "valueOf", "toString" ];
                            var value, i;
                            for (i = 0; i < methods.length; ++i) {
                                if (isCallable(O[methods[i]])) {
                                    value = O[methods[i]]();
                                    if (isPrimitive(value)) {
                                        return value;
                                    }
                                }
                            }
                            throw new TypeError("No default value");
                        }
                        throw new TypeError("invalid [[DefaultValue]] hint supplied");
                    }
                };
                module.exports = function ToPrimitive(input) {
                    if (isPrimitive(input)) {
                        return input;
                    }
                    if (arguments.length > 1) {
                        return ES5internalSlots["[[DefaultValue]]"](input, arguments[1]);
                    }
                    return ES5internalSlots["[[DefaultValue]]"](input);
                };
            }, {
                "./helpers/isPrimitive": 11,
                "is-callable": 18
            } ],
            11: [ function(require, module, exports) {
                module.exports = function isPrimitive(value) {
                    return value === null || typeof value !== "function" && typeof value !== "object";
                };
            }, {} ],
            12: [ function(require, module, exports) {
                "use strict";
                var isArray = Array.isArray;
                var keyList = Object.keys;
                var hasProp = Object.prototype.hasOwnProperty;
                module.exports = function equal(a, b) {
                    if (a === b) return true;
                    if (a && b && typeof a == "object" && typeof b == "object") {
                        var arrA = isArray(a), arrB = isArray(b), i, length, key;
                        if (arrA && arrB) {
                            length = a.length;
                            if (length != b.length) return false;
                            for (i = length; i-- !== 0; ) if (!equal(a[i], b[i])) return false;
                            return true;
                        }
                        if (arrA != arrB) return false;
                        var dateA = a instanceof Date, dateB = b instanceof Date;
                        if (dateA != dateB) return false;
                        if (dateA && dateB) return a.getTime() == b.getTime();
                        var regexpA = a instanceof RegExp, regexpB = b instanceof RegExp;
                        if (regexpA != regexpB) return false;
                        if (regexpA && regexpB) return a.toString() == b.toString();
                        var keys = keyList(a);
                        length = keys.length;
                        if (length !== keyList(b).length) return false;
                        for (i = length; i-- !== 0; ) if (!hasProp.call(b, keys[i])) return false;
                        for (i = length; i-- !== 0; ) {
                            key = keys[i];
                            if (!equal(a[key], b[key])) return false;
                        }
                        return true;
                    }
                    return a !== a && b !== b;
                };
            }, {} ],
            13: [ function(require, module, exports) {
                "use strict";
                var isCallable = require("is-callable");
                var toStr = Object.prototype.toString;
                var hasOwnProperty = Object.prototype.hasOwnProperty;
                var forEachArray = function forEachArray(array, iterator, receiver) {
                    for (var i = 0, len = array.length; i < len; i++) {
                        if (hasOwnProperty.call(array, i)) {
                            if (receiver == null) {
                                iterator(array[i], i, array);
                            } else {
                                iterator.call(receiver, array[i], i, array);
                            }
                        }
                    }
                };
                var forEachString = function forEachString(string, iterator, receiver) {
                    for (var i = 0, len = string.length; i < len; i++) {
                        if (receiver == null) {
                            iterator(string.charAt(i), i, string);
                        } else {
                            iterator.call(receiver, string.charAt(i), i, string);
                        }
                    }
                };
                var forEachObject = function forEachObject(object, iterator, receiver) {
                    for (var k in object) {
                        if (hasOwnProperty.call(object, k)) {
                            if (receiver == null) {
                                iterator(object[k], k, object);
                            } else {
                                iterator.call(receiver, object[k], k, object);
                            }
                        }
                    }
                };
                var forEach = function forEach(list, iterator, thisArg) {
                    if (!isCallable(iterator)) {
                        throw new TypeError("iterator must be a function");
                    }
                    var receiver;
                    if (arguments.length >= 3) {
                        receiver = thisArg;
                    }
                    if (toStr.call(list) === "[object Array]") {
                        forEachArray(list, iterator, receiver);
                    } else if (typeof list === "string") {
                        forEachString(list, iterator, receiver);
                    } else {
                        forEachObject(list, iterator, receiver);
                    }
                };
                module.exports = forEach;
            }, {
                "is-callable": 18
            } ],
            14: [ function(require, module, exports) {
                "use strict";
                var ERROR_MESSAGE = "Function.prototype.bind called on incompatible ";
                var slice = Array.prototype.slice;
                var toStr = Object.prototype.toString;
                var funcType = "[object Function]";
                module.exports = function bind(that) {
                    var target = this;
                    if (typeof target !== "function" || toStr.call(target) !== funcType) {
                        throw new TypeError(ERROR_MESSAGE + target);
                    }
                    var args = slice.call(arguments, 1);
                    var bound;
                    var binder = function() {
                        if (this instanceof bound) {
                            var result = target.apply(this, args.concat(slice.call(arguments)));
                            if (Object(result) === result) {
                                return result;
                            }
                            return this;
                        } else {
                            return target.apply(that, args.concat(slice.call(arguments)));
                        }
                    };
                    var boundLength = Math.max(0, target.length - args.length);
                    var boundArgs = [];
                    for (var i = 0; i < boundLength; i++) {
                        boundArgs.push("$" + i);
                    }
                    bound = Function("binder", "return function (" + boundArgs.join(",") + "){ return binder.apply(this,arguments); }")(binder);
                    if (target.prototype) {
                        var Empty = function Empty() {};
                        Empty.prototype = target.prototype;
                        bound.prototype = new Empty();
                        Empty.prototype = null;
                    }
                    return bound;
                };
            }, {} ],
            15: [ function(require, module, exports) {
                "use strict";
                var implementation = require("./implementation");
                module.exports = Function.prototype.bind || implementation;
            }, {
                "./implementation": 14
            } ],
            16: [ function(require, module, exports) {
                (function(global) {
                    var win;
                    if (typeof window !== "undefined") {
                        win = window;
                    } else if (typeof global !== "undefined") {
                        win = global;
                    } else if (typeof self !== "undefined") {
                        win = self;
                    } else {
                        win = {};
                    }
                    module.exports = win;
                }).call(this, typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {});
            }, {} ],
            17: [ function(require, module, exports) {
                "use strict";
                var bind = require("function-bind");
                module.exports = bind.call(Function.call, Object.prototype.hasOwnProperty);
            }, {
                "function-bind": 15
            } ],
            18: [ function(require, module, exports) {
                "use strict";
                var fnToStr = Function.prototype.toString;
                var constructorRegex = /^\s*class\b/;
                var isES6ClassFn = function isES6ClassFunction(value) {
                    try {
                        var fnStr = fnToStr.call(value);
                        return constructorRegex.test(fnStr);
                    } catch (e) {
                        return false;
                    }
                };
                var tryFunctionObject = function tryFunctionToStr(value) {
                    try {
                        if (isES6ClassFn(value)) {
                            return false;
                        }
                        fnToStr.call(value);
                        return true;
                    } catch (e) {
                        return false;
                    }
                };
                var toStr = Object.prototype.toString;
                var fnClass = "[object Function]";
                var genClass = "[object GeneratorFunction]";
                var hasToStringTag = typeof Symbol === "function" && typeof Symbol.toStringTag === "symbol";
                module.exports = function isCallable(value) {
                    if (!value) {
                        return false;
                    }
                    if (typeof value !== "function" && typeof value !== "object") {
                        return false;
                    }
                    if (typeof value === "function" && !value.prototype) {
                        return true;
                    }
                    if (hasToStringTag) {
                        return tryFunctionObject(value);
                    }
                    if (isES6ClassFn(value)) {
                        return false;
                    }
                    var strClass = toStr.call(value);
                    return strClass === fnClass || strClass === genClass;
                };
            }, {} ],
            19: [ function(require, module, exports) {
                module.exports = isFunction;
                var toString = Object.prototype.toString;
                function isFunction(fn) {
                    var string = toString.call(fn);
                    return string === "[object Function]" || typeof fn === "function" && string !== "[object RegExp]" || typeof window !== "undefined" && (fn === window.setTimeout || fn === window.alert || fn === window.confirm || fn === window.prompt);
                }
            }, {} ],
            20: [ function(require, module, exports) {
                "use strict";
                var keysShim;
                if (!Object.keys) {
                    var has = Object.prototype.hasOwnProperty;
                    var toStr = Object.prototype.toString;
                    var isArgs = require("./isArguments");
                    var isEnumerable = Object.prototype.propertyIsEnumerable;
                    var hasDontEnumBug = !isEnumerable.call({
                        toString: null
                    }, "toString");
                    var hasProtoEnumBug = isEnumerable.call(function() {}, "prototype");
                    var dontEnums = [ "toString", "toLocaleString", "valueOf", "hasOwnProperty", "isPrototypeOf", "propertyIsEnumerable", "constructor" ];
                    var equalsConstructorPrototype = function(o) {
                        var ctor = o.constructor;
                        return ctor && ctor.prototype === o;
                    };
                    var excludedKeys = {
                        $applicationCache: true,
                        $console: true,
                        $external: true,
                        $frame: true,
                        $frameElement: true,
                        $frames: true,
                        $innerHeight: true,
                        $innerWidth: true,
                        $onmozfullscreenchange: true,
                        $onmozfullscreenerror: true,
                        $outerHeight: true,
                        $outerWidth: true,
                        $pageXOffset: true,
                        $pageYOffset: true,
                        $parent: true,
                        $scrollLeft: true,
                        $scrollTop: true,
                        $scrollX: true,
                        $scrollY: true,
                        $self: true,
                        $webkitIndexedDB: true,
                        $webkitStorageInfo: true,
                        $window: true
                    };
                    var hasAutomationEqualityBug = function() {
                        if (typeof window === "undefined") {
                            return false;
                        }
                        for (var k in window) {
                            try {
                                if (!excludedKeys["$" + k] && has.call(window, k) && window[k] !== null && typeof window[k] === "object") {
                                    try {
                                        equalsConstructorPrototype(window[k]);
                                    } catch (e) {
                                        return true;
                                    }
                                }
                            } catch (e) {
                                return true;
                            }
                        }
                        return false;
                    }();
                    var equalsConstructorPrototypeIfNotBuggy = function(o) {
                        if (typeof window === "undefined" || !hasAutomationEqualityBug) {
                            return equalsConstructorPrototype(o);
                        }
                        try {
                            return equalsConstructorPrototype(o);
                        } catch (e) {
                            return false;
                        }
                    };
                    keysShim = function keys(object) {
                        var isObject = object !== null && typeof object === "object";
                        var isFunction = toStr.call(object) === "[object Function]";
                        var isArguments = isArgs(object);
                        var isString = isObject && toStr.call(object) === "[object String]";
                        var theKeys = [];
                        if (!isObject && !isFunction && !isArguments) {
                            throw new TypeError("Object.keys called on a non-object");
                        }
                        var skipProto = hasProtoEnumBug && isFunction;
                        if (isString && object.length > 0 && !has.call(object, 0)) {
                            for (var i = 0; i < object.length; ++i) {
                                theKeys.push(String(i));
                            }
                        }
                        if (isArguments && object.length > 0) {
                            for (var j = 0; j < object.length; ++j) {
                                theKeys.push(String(j));
                            }
                        } else {
                            for (var name in object) {
                                if (!(skipProto && name === "prototype") && has.call(object, name)) {
                                    theKeys.push(String(name));
                                }
                            }
                        }
                        if (hasDontEnumBug) {
                            var skipConstructor = equalsConstructorPrototypeIfNotBuggy(object);
                            for (var k = 0; k < dontEnums.length; ++k) {
                                if (!(skipConstructor && dontEnums[k] === "constructor") && has.call(object, dontEnums[k])) {
                                    theKeys.push(dontEnums[k]);
                                }
                            }
                        }
                        return theKeys;
                    };
                }
                module.exports = keysShim;
            }, {
                "./isArguments": 22
            } ],
            21: [ function(require, module, exports) {
                "use strict";
                var slice = Array.prototype.slice;
                var isArgs = require("./isArguments");
                var origKeys = Object.keys;
                var keysShim = origKeys ? function keys(o) {
                    return origKeys(o);
                } : require("./implementation");
                var originalKeys = Object.keys;
                keysShim.shim = function shimObjectKeys() {
                    if (Object.keys) {
                        var keysWorksWithArguments = function() {
                            var args = Object.keys(arguments);
                            return args && args.length === arguments.length;
                        }(1, 2);
                        if (!keysWorksWithArguments) {
                            Object.keys = function keys(object) {
                                if (isArgs(object)) {
                                    return originalKeys(slice.call(object));
                                }
                                return originalKeys(object);
                            };
                        }
                    } else {
                        Object.keys = keysShim;
                    }
                    return Object.keys || keysShim;
                };
                module.exports = keysShim;
            }, {
                "./implementation": 20,
                "./isArguments": 22
            } ],
            22: [ function(require, module, exports) {
                "use strict";
                var toStr = Object.prototype.toString;
                module.exports = function isArguments(value) {
                    var str = toStr.call(value);
                    var isArgs = str === "[object Arguments]";
                    if (!isArgs) {
                        isArgs = str !== "[object Array]" && value !== null && typeof value === "object" && typeof value.length === "number" && value.length >= 0 && toStr.call(value.callee) === "[object Function]";
                    }
                    return isArgs;
                };
            }, {} ],
            23: [ function(require, module, exports) {
                var trim = require("string.prototype.trim"), forEach = require("for-each"), isArray = function(arg) {
                    return Object.prototype.toString.call(arg) === "[object Array]";
                };
                module.exports = function(headers) {
                    if (!headers) return {};
                    var result = {};
                    forEach(trim(headers).split("\n"), function(row) {
                        var index = row.indexOf(":"), key = trim(row.slice(0, index)).toLowerCase(), value = trim(row.slice(index + 1));
                        if (typeof result[key] === "undefined") {
                            result[key] = value;
                        } else if (isArray(result[key])) {
                            result[key].push(value);
                        } else {
                            result[key] = [ result[key], value ];
                        }
                    });
                    return result;
                };
            }, {
                "for-each": 13,
                "string.prototype.trim": 28
            } ],
            24: [ function(require, module, exports) {
                "use strict";
                function hasOwnProperty(obj, prop) {
                    return Object.prototype.hasOwnProperty.call(obj, prop);
                }
                module.exports = function(qs, sep, eq, options) {
                    sep = sep || "&";
                    eq = eq || "=";
                    var obj = {};
                    if (typeof qs !== "string" || qs.length === 0) {
                        return obj;
                    }
                    var regexp = /\+/g;
                    qs = qs.split(sep);
                    var maxKeys = 1e3;
                    if (options && typeof options.maxKeys === "number") {
                        maxKeys = options.maxKeys;
                    }
                    var len = qs.length;
                    if (maxKeys > 0 && len > maxKeys) {
                        len = maxKeys;
                    }
                    for (var i = 0; i < len; ++i) {
                        var x = qs[i].replace(regexp, "%20"), idx = x.indexOf(eq), kstr, vstr, k, v;
                        if (idx >= 0) {
                            kstr = x.substr(0, idx);
                            vstr = x.substr(idx + 1);
                        } else {
                            kstr = x;
                            vstr = "";
                        }
                        k = decodeURIComponent(kstr);
                        v = decodeURIComponent(vstr);
                        if (!hasOwnProperty(obj, k)) {
                            obj[k] = v;
                        } else if (isArray(obj[k])) {
                            obj[k].push(v);
                        } else {
                            obj[k] = [ obj[k], v ];
                        }
                    }
                    return obj;
                };
                var isArray = Array.isArray || function(xs) {
                    return Object.prototype.toString.call(xs) === "[object Array]";
                };
            }, {} ],
            25: [ function(require, module, exports) {
                "use strict";
                var stringifyPrimitive = function(v) {
                    switch (typeof v) {
                      case "string":
                        return v;

                      case "boolean":
                        return v ? "true" : "false";

                      case "number":
                        return isFinite(v) ? v : "";

                      default:
                        return "";
                    }
                };
                module.exports = function(obj, sep, eq, name) {
                    sep = sep || "&";
                    eq = eq || "=";
                    if (obj === null) {
                        obj = undefined;
                    }
                    if (typeof obj === "object") {
                        return map(objectKeys(obj), function(k) {
                            var ks = encodeURIComponent(stringifyPrimitive(k)) + eq;
                            if (isArray(obj[k])) {
                                return map(obj[k], function(v) {
                                    return ks + encodeURIComponent(stringifyPrimitive(v));
                                }).join(sep);
                            } else {
                                return ks + encodeURIComponent(stringifyPrimitive(obj[k]));
                            }
                        }).join(sep);
                    }
                    if (!name) return "";
                    return encodeURIComponent(stringifyPrimitive(name)) + eq + encodeURIComponent(stringifyPrimitive(obj));
                };
                var isArray = Array.isArray || function(xs) {
                    return Object.prototype.toString.call(xs) === "[object Array]";
                };
                function map(xs, f) {
                    if (xs.map) return xs.map(f);
                    var res = [];
                    for (var i = 0; i < xs.length; i++) {
                        res.push(f(xs[i], i));
                    }
                    return res;
                }
                var objectKeys = Object.keys || function(obj) {
                    var res = [];
                    for (var key in obj) {
                        if (Object.prototype.hasOwnProperty.call(obj, key)) res.push(key);
                    }
                    return res;
                };
            }, {} ],
            26: [ function(require, module, exports) {
                "use strict";
                exports.decode = exports.parse = require("./decode");
                exports.encode = exports.stringify = require("./encode");
            }, {
                "./decode": 24,
                "./encode": 25
            } ],
            27: [ function(require, module, exports) {
                "use strict";
                var bind = require("function-bind");
                var ES = require("es-abstract/es5");
                var replace = bind.call(Function.call, String.prototype.replace);
                var leftWhitespace = /^[\x09\x0A\x0B\x0C\x0D\x20\xA0\u1680\u180E\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200A\u202F\u205F\u3000\u2028\u2029\uFEFF]+/;
                var rightWhitespace = /[\x09\x0A\x0B\x0C\x0D\x20\xA0\u1680\u180E\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200A\u202F\u205F\u3000\u2028\u2029\uFEFF]+$/;
                module.exports = function trim() {
                    var S = ES.ToString(ES.CheckObjectCoercible(this));
                    return replace(replace(S, leftWhitespace, ""), rightWhitespace, "");
                };
            }, {
                "es-abstract/es5": 4,
                "function-bind": 15
            } ],
            28: [ function(require, module, exports) {
                "use strict";
                var bind = require("function-bind");
                var define = require("define-properties");
                var implementation = require("./implementation");
                var getPolyfill = require("./polyfill");
                var shim = require("./shim");
                var boundTrim = bind.call(Function.call, getPolyfill());
                define(boundTrim, {
                    getPolyfill: getPolyfill,
                    implementation: implementation,
                    shim: shim
                });
                module.exports = boundTrim;
            }, {
                "./implementation": 27,
                "./polyfill": 29,
                "./shim": 30,
                "define-properties": 2,
                "function-bind": 15
            } ],
            29: [ function(require, module, exports) {
                "use strict";
                var implementation = require("./implementation");
                var zeroWidthSpace = "​";
                module.exports = function getPolyfill() {
                    if (String.prototype.trim && zeroWidthSpace.trim() === zeroWidthSpace) {
                        return String.prototype.trim;
                    }
                    return implementation;
                };
            }, {
                "./implementation": 27
            } ],
            30: [ function(require, module, exports) {
                "use strict";
                var define = require("define-properties");
                var getPolyfill = require("./polyfill");
                module.exports = function shimStringTrim() {
                    var polyfill = getPolyfill();
                    define(String.prototype, {
                        trim: polyfill
                    }, {
                        trim: function() {
                            return String.prototype.trim !== polyfill;
                        }
                    });
                    return polyfill;
                };
            }, {
                "./polyfill": 29,
                "define-properties": 2
            } ],
            31: [ function(require, module, exports) {
                "use strict";
                var window = require("global/window");
                var isFunction = require("is-function");
                var parseHeaders = require("parse-headers");
                var xtend = require("xtend");
                module.exports = createXHR;
                module.exports.default = createXHR;
                createXHR.XMLHttpRequest = window.XMLHttpRequest || noop;
                createXHR.XDomainRequest = "withCredentials" in new createXHR.XMLHttpRequest() ? createXHR.XMLHttpRequest : window.XDomainRequest;
                forEachArray([ "get", "put", "post", "patch", "head", "delete" ], function(method) {
                    createXHR[method === "delete" ? "del" : method] = function(uri, options, callback) {
                        options = initParams(uri, options, callback);
                        options.method = method.toUpperCase();
                        return _createXHR(options);
                    };
                });
                function forEachArray(array, iterator) {
                    for (var i = 0; i < array.length; i++) {
                        iterator(array[i]);
                    }
                }
                function isEmpty(obj) {
                    for (var i in obj) {
                        if (obj.hasOwnProperty(i)) return false;
                    }
                    return true;
                }
                function initParams(uri, options, callback) {
                    var params = uri;
                    if (isFunction(options)) {
                        callback = options;
                        if (typeof uri === "string") {
                            params = {
                                uri: uri
                            };
                        }
                    } else {
                        params = xtend(options, {
                            uri: uri
                        });
                    }
                    params.callback = callback;
                    return params;
                }
                function createXHR(uri, options, callback) {
                    options = initParams(uri, options, callback);
                    return _createXHR(options);
                }
                function _createXHR(options) {
                    if (typeof options.callback === "undefined") {
                        throw new Error("callback argument missing");
                    }
                    var called = false;
                    var callback = function cbOnce(err, response, body) {
                        if (!called) {
                            called = true;
                            options.callback(err, response, body);
                        }
                    };
                    function readystatechange() {
                        if (xhr.readyState === 4) {
                            setTimeout(loadFunc, 0);
                        }
                    }
                    function getBody() {
                        var body = undefined;
                        if (xhr.response) {
                            body = xhr.response;
                        } else {
                            body = xhr.responseText || getXml(xhr);
                        }
                        if (isJson) {
                            try {
                                body = JSON.parse(body);
                            } catch (e) {}
                        }
                        return body;
                    }
                    function errorFunc(evt) {
                        clearTimeout(timeoutTimer);
                        if (!(evt instanceof Error)) {
                            evt = new Error("" + (evt || "Unknown XMLHttpRequest Error"));
                        }
                        evt.statusCode = 0;
                        return callback(evt, failureResponse);
                    }
                    function loadFunc() {
                        if (aborted) return;
                        var status;
                        clearTimeout(timeoutTimer);
                        if (options.useXDR && xhr.status === undefined) {
                            status = 200;
                        } else {
                            status = xhr.status === 1223 ? 204 : xhr.status;
                        }
                        var response = failureResponse;
                        var err = null;
                        if (status !== 0) {
                            response = {
                                body: getBody(),
                                statusCode: status,
                                method: method,
                                headers: {},
                                url: uri,
                                rawRequest: xhr
                            };
                            if (xhr.getAllResponseHeaders) {
                                response.headers = parseHeaders(xhr.getAllResponseHeaders());
                            }
                        } else {
                            err = new Error("Internal XMLHttpRequest Error");
                        }
                        return callback(err, response, response.body);
                    }
                    var xhr = options.xhr || null;
                    if (!xhr) {
                        if (options.cors || options.useXDR) {
                            xhr = new createXHR.XDomainRequest();
                        } else {
                            xhr = new createXHR.XMLHttpRequest();
                        }
                    }
                    var key;
                    var aborted;
                    var uri = xhr.url = options.uri || options.url;
                    var method = xhr.method = options.method || "GET";
                    var body = options.body || options.data;
                    var headers = xhr.headers = options.headers || {};
                    var sync = !!options.sync;
                    var isJson = false;
                    var timeoutTimer;
                    var failureResponse = {
                        body: undefined,
                        headers: {},
                        statusCode: 0,
                        method: method,
                        url: uri,
                        rawRequest: xhr
                    };
                    if ("json" in options && options.json !== false) {
                        isJson = true;
                        headers["accept"] || headers["Accept"] || (headers["Accept"] = "application/json");
                        if (method !== "GET" && method !== "HEAD") {
                            headers["content-type"] || headers["Content-Type"] || (headers["Content-Type"] = "application/json");
                            body = JSON.stringify(options.json === true ? body : options.json);
                        }
                    }
                    xhr.onreadystatechange = readystatechange;
                    xhr.onload = loadFunc;
                    xhr.onerror = errorFunc;
                    xhr.onprogress = function() {};
                    xhr.onabort = function() {
                        aborted = true;
                    };
                    xhr.ontimeout = errorFunc;
                    xhr.open(method, uri, !sync, options.username, options.password);
                    if (!sync) {
                        xhr.withCredentials = !!options.withCredentials;
                    }
                    if (!sync && options.timeout > 0) {
                        timeoutTimer = setTimeout(function() {
                            if (aborted) return;
                            aborted = true;
                            xhr.abort("timeout");
                            var e = new Error("XMLHttpRequest timeout");
                            e.code = "ETIMEDOUT";
                            errorFunc(e);
                        }, options.timeout);
                    }
                    if (xhr.setRequestHeader) {
                        for (key in headers) {
                            if (headers.hasOwnProperty(key)) {
                                xhr.setRequestHeader(key, headers[key]);
                            }
                        }
                    } else if (options.headers && !isEmpty(options.headers)) {
                        throw new Error("Headers cannot be set on an XDomainRequest object");
                    }
                    if ("responseType" in options) {
                        xhr.responseType = options.responseType;
                    }
                    if ("beforeSend" in options && typeof options.beforeSend === "function") {
                        options.beforeSend(xhr);
                    }
                    xhr.send(body || null);
                    return xhr;
                }
                function getXml(xhr) {
                    try {
                        if (xhr.responseType === "document") {
                            return xhr.responseXML;
                        }
                        var firefoxBugTakenEffect = xhr.responseXML && xhr.responseXML.documentElement.nodeName === "parsererror";
                        if (xhr.responseType === "" && !firefoxBugTakenEffect) {
                            return xhr.responseXML;
                        }
                    } catch (e) {}
                    return null;
                }
                function noop() {}
            }, {
                "global/window": 16,
                "is-function": 19,
                "parse-headers": 23,
                xtend: 32
            } ],
            32: [ function(require, module, exports) {
                module.exports = extend;
                var hasOwnProperty = Object.prototype.hasOwnProperty;
                function extend() {
                    var target = {};
                    for (var i = 0; i < arguments.length; i++) {
                        var source = arguments[i];
                        for (var key in source) {
                            if (hasOwnProperty.call(source, key)) {
                                target[key] = source[key];
                            }
                        }
                    }
                    return target;
                }
            }, {} ],
            33: [ function(require, module, exports) {
                "use strict";
                function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {
                    try {
                        var info = gen[key](arg);
                        var value = info.value;
                    } catch (error) {
                        reject(error);
                        return;
                    }
                    if (info.done) {
                        resolve(value);
                    } else {
                        Promise.resolve(value).then(_next, _throw);
                    }
                }
                function _asyncToGenerator(fn) {
                    return function() {
                        var self = this, args = arguments;
                        return new Promise(function(resolve, reject) {
                            var gen = fn.apply(self, args);
                            function _next(value) {
                                asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);
                            }
                            function _throw(err) {
                                asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);
                            }
                            _next(undefined);
                        });
                    };
                }
                function _toConsumableArray(arr) {
                    return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread();
                }
                function _nonIterableSpread() {
                    throw new TypeError("Invalid attempt to spread non-iterable instance");
                }
                function _iterableToArray(iter) {
                    if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter);
                }
                function _arrayWithoutHoles(arr) {
                    if (Array.isArray(arr)) {
                        for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) {
                            arr2[i] = arr[i];
                        }
                        return arr2;
                    }
                }
                function _classCallCheck(instance, Constructor) {
                    if (!(instance instanceof Constructor)) {
                        throw new TypeError("Cannot call a class as a function");
                    }
                }
                function _defineProperties(target, props) {
                    for (var i = 0; i < props.length; i++) {
                        var descriptor = props[i];
                        descriptor.enumerable = descriptor.enumerable || false;
                        descriptor.configurable = true;
                        if ("value" in descriptor) descriptor.writable = true;
                        Object.defineProperty(target, descriptor.key, descriptor);
                    }
                }
                function _createClass(Constructor, protoProps, staticProps) {
                    if (protoProps) _defineProperties(Constructor.prototype, protoProps);
                    if (staticProps) _defineProperties(Constructor, staticProps);
                    return Constructor;
                }
                var deepEqual = require("fast-deep-equal");
                var querystring = require("querystring");
                var xhr = require("request");
                var produceURL = "https://www.varsnap.com/api/snap/produce/";
                var consumeURL = "https://www.varsnap.com/api/snap/consume/";
                var produceTrialURL = "https://www.varsnap.com/api/trial/produce/";
                var version = "v1.0.0";
                var configKeys = {
                    varsnap: "varsnap",
                    env: "env",
                    producerToken: "producerToken",
                    consumerToken: "consumerToken"
                };
                var Producers = [];
                var Consumers = [];
                var Util = function() {
                    function Util() {
                        _classCallCheck(this, Util);
                    }
                    _createClass(Util, null, [ {
                        key: "getConfig",
                        value: function getConfig(config, configKey) {
                            if (!config) {
                                return "";
                            }
                            var val = config[configKey];
                            if (!val) {
                                return "";
                            }
                            val = val.toString().toLowerCase();
                            return val;
                        }
                    }, {
                        key: "getSignature",
                        value: function getSignature(targetFunc) {
                            var signature = targetFunc.toString().split("{")[0];
                            signature = signature.replace(/^\s+|\s+$/g, "");
                            return "javascript." + version + "." + signature;
                        }
                    }, {
                        key: "ajax",
                        value: function ajax(url, requestData) {
                            var options = {
                                method: "POST",
                                uri: url,
                                body: querystring.stringify(requestData).toString("utf8"),
                                headers: {
                                    "Content-Type": "application/x-www-form-urlencoded"
                                }
                            };
                            var ajaxPromise = new Promise(function(resolve, reject) {
                                xhr(options, function(err, resp, body) {
                                    if (err) {
                                        return reject(err);
                                    }
                                    var responseCode = parseInt(resp.statusCode / 100, 10);
                                    if (responseCode != 2) {
                                        return reject(new Error("Status: " + resp.statusCode));
                                    }
                                    body = JSON.parse(body);
                                    return resolve(body);
                                });
                            });
                            return ajaxPromise;
                        }
                    }, {
                        key: "getLogger",
                        value: function getLogger() {
                            if (Util.logger) {
                                return Util.logger;
                            }
                            return console;
                        }
                    }, {
                        key: "log",
                        value: function log(data) {
                            Util.getLogger().log(data);
                        }
                    }, {
                        key: "error",
                        value: function error(data) {
                            Util.getLogger().error(data);
                        }
                    }, {
                        key: "resetProducers",
                        value: function resetProducers() {
                            Producers = [];
                        }
                    }, {
                        key: "resetConsumers",
                        value: function resetConsumers() {
                            Consumers = [];
                        }
                    }, {
                        key: "getProducers",
                        value: function getProducers() {
                            return Producers;
                        }
                    }, {
                        key: "getConsumers",
                        value: function getConsumers() {
                            return Consumers;
                        }
                    } ]);
                    return Util;
                }();
                var Producer = function() {
                    function Producer(targetFunc, config) {
                        _classCallCheck(this, Producer);
                        this.targetFunc = targetFunc;
                        this.config = config;
                    }
                    _createClass(Producer, [ {
                        key: "isEnabled",
                        value: function isEnabled() {
                            if (Util.getConfig(this.config, configKeys.varsnap) !== "true") {
                                return false;
                            }
                            if (Util.getConfig(this.config, configKeys.env) !== "production") {
                                return false;
                            }
                            if (!Util.getConfig(this.config, configKeys.producerToken)) {
                                return false;
                            }
                            return true;
                        }
                    }, {
                        key: "produce",
                        value: function produce(args, output) {
                            if (!this.isEnabled()) {
                                return;
                            }
                            Util.log("Sending call to VarSnap");
                            var data = {
                                producer_token: Util.getConfig(this.config, configKeys.producerToken),
                                signature: Util.getSignature(this.targetFunc),
                                inputs: Producer.serialize(args),
                                prod_outputs: Producer.serialize(output)
                            };
                            Util.ajax(produceURL, data)["catch"](function(err) {
                                if (err.statusCode === 404) {
                                    Util.error("Cannot produce to VarSnap; check your producer token");
                                } else {
                                    Util.error(err.error);
                                }
                            });
                        }
                    } ], [ {
                        key: "serialize",
                        value: function serialize(data) {
                            return JSON.stringify(data);
                        }
                    } ]);
                    return Producer;
                }();
                var Consumer = function() {
                    function Consumer(targetFunc, config) {
                        _classCallCheck(this, Consumer);
                        this.targetFunc = targetFunc;
                        this.config = config;
                    }
                    _createClass(Consumer, [ {
                        key: "isEnabled",
                        value: function isEnabled() {
                            if (Util.getConfig(this.config, configKeys.varsnap) !== "true") {
                                return false;
                            }
                            if (Util.getConfig(this.config, configKeys.env) !== "development") {
                                return false;
                            }
                            if (!Util.getConfig(this.config, configKeys.consumerToken)) {
                                return false;
                            }
                            return true;
                        }
                    }, {
                        key: "consumeOnce",
                        value: function consumeOnce() {
                            var _this = this;
                            if (!this.isEnabled()) {
                                return;
                            }
                            var data = {
                                consumer_token: Util.getConfig(this.config, configKeys.consumerToken),
                                signature: Util.getSignature(this.targetFunc)
                            };
                            return Util.ajax(consumeURL, data).then(function(response) {
                                if (!response || response.status !== "ok") {
                                    return false;
                                }
                                var allMatches = true;
                                var _iteratorNormalCompletion = true;
                                var _didIteratorError = false;
                                var _iteratorError = undefined;
                                try {
                                    for (var _iterator = response.results[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                                        var snap = _step.value;
                                        Util.log("Receiving call from VarSnap uuid: " + snap["id"]);
                                        var inputs = Consumer.deserialize(snap["inputs"]);
                                        var prodOutputs = Consumer.deserialize(snap["prod_outputs"]);
                                        var localOutputs = _this.targetFunc.apply(_this, _toConsumableArray(inputs));
                                        var matches = deepEqual(prodOutputs, localOutputs);
                                        _this.reportLog(inputs, prodOutputs, localOutputs, matches);
                                        _this.reportCentral(snap, localOutputs, matches);
                                        matches = allMatches && matches;
                                    }
                                } catch (err) {
                                    _didIteratorError = true;
                                    _iteratorError = err;
                                } finally {
                                    try {
                                        if (!_iteratorNormalCompletion && _iterator["return"] != null) {
                                            _iterator["return"]();
                                        }
                                    } finally {
                                        if (_didIteratorError) {
                                            throw _iteratorError;
                                        }
                                    }
                                }
                                return allMatches;
                            })["catch"](function(error) {
                                Util.error("Cannot contact VarSnap: " + error);
                                return false;
                            });
                        }
                    }, {
                        key: "reportCentral",
                        value: function reportCentral(snap, localOutputs, matches) {
                            var data = {
                                consumer_token: Util.getConfig(this.config, configKeys.consumerToken),
                                snap_id: snap.id,
                                test_outputs: localOutputs,
                                matches: matches
                            };
                            return Util.ajax(produceTrialURL, data).then(function(response) {
                                if (!response || response.status !== "ok") {
                                    return false;
                                }
                                var trialURL = response["trial_url"];
                                Util.log("Trial URL:                     " + trialURL);
                                return true;
                            })["catch"](function(error) {
                                Util.error("Cannot upload test results to VarSnap: " + error);
                                return false;
                            });
                        }
                    }, {
                        key: "reportLog",
                        value: function reportLog(inputs, prodOutputs, localOutputs, matches) {
                            var functionName = Util.getSignature(this.targetFunc);
                            Util.log("Function:                      " + functionName);
                            Util.log("Function input args:           " + inputs);
                            Util.log("Production function outputs:   " + prodOutputs);
                            Util.log("Your function outputs:         " + localOutputs);
                            Util.log("Matching outputs:              " + matches);
                            Util.log("");
                        }
                    } ], [ {
                        key: "deserialize",
                        value: function deserialize(data) {
                            if (data === "") {
                                return undefined;
                            }
                            return JSON.parse(data);
                        }
                    } ]);
                    return Consumer;
                }();
                function varsnap(func) {
                    if (varsnap.config.logger) {
                        Util.logger = varsnap.config.logger;
                    }
                    var producer = new Producer(func, varsnap.config);
                    var consumer = new Consumer(func, varsnap.config);
                    var wrapped = function wrapped() {
                        var result = "";
                        for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
                            args[_key] = arguments[_key];
                        }
                        try {
                            result = func.apply(void 0, args);
                        } catch (err) {
                            producer.produce(args, err);
                            throw err;
                        }
                        producer.produce(args, result);
                        return result;
                    };
                    wrapped.producer = producer;
                    wrapped.consumer = consumer;
                    Producers.push(producer);
                    Consumers.push(consumer);
                    return wrapped;
                }
                function runTests() {
                    return _runTests.apply(this, arguments);
                }
                function _runTests() {
                    _runTests = _asyncToGenerator(regeneratorRuntime.mark(function _callee() {
                        var consumers, status, _iteratorNormalCompletion2, _didIteratorError2, _iteratorError2, _iterator2, _step2, consumer, testStatus;
                        return regeneratorRuntime.wrap(function _callee$(_context) {
                            while (1) {
                                switch (_context.prev = _context.next) {
                                  case 0:
                                    consumers = Util.getConsumers();
                                    status = true;
                                    _iteratorNormalCompletion2 = true;
                                    _didIteratorError2 = false;
                                    _iteratorError2 = undefined;
                                    _context.prev = 5;
                                    _iterator2 = consumers[Symbol.iterator]();

                                  case 7:
                                    if (_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done) {
                                        _context.next = 16;
                                        break;
                                    }
                                    consumer = _step2.value;
                                    _context.next = 11;
                                    return consumer.consumeOnce();

                                  case 11:
                                    testStatus = _context.sent;
                                    status = status && testStatus;

                                  case 13:
                                    _iteratorNormalCompletion2 = true;
                                    _context.next = 7;
                                    break;

                                  case 16:
                                    _context.next = 22;
                                    break;

                                  case 18:
                                    _context.prev = 18;
                                    _context.t0 = _context["catch"](5);
                                    _didIteratorError2 = true;
                                    _iteratorError2 = _context.t0;

                                  case 22:
                                    _context.prev = 22;
                                    _context.prev = 23;
                                    if (!_iteratorNormalCompletion2 && _iterator2["return"] != null) {
                                        _iterator2["return"]();
                                    }

                                  case 25:
                                    _context.prev = 25;
                                    if (!_didIteratorError2) {
                                        _context.next = 28;
                                        break;
                                    }
                                    throw _iteratorError2;

                                  case 28:
                                    return _context.finish(25);

                                  case 29:
                                    return _context.finish(22);

                                  case 30:
                                    return _context.abrupt("return", status);

                                  case 31:
                                  case "end":
                                    return _context.stop();
                                }
                            }
                        }, _callee, null, [ [ 5, 18, 22, 30 ], [ 23, , 25, 29 ] ]);
                    }));
                    return _runTests.apply(this, arguments);
                }
                module.exports = {
                    configKeys: configKeys,
                    Util: Util,
                    Producer: Producer,
                    Consumer: Consumer,
                    runTests: runTests,
                    varsnap: varsnap,
                    version: version
                };
            }, {
                "fast-deep-equal": 12,
                querystring: 26,
                request: 31
            } ]
        }, {}, [ 1 ])(1);
    });
})(typeof VarSnap == "undefined" ? VarSnap = {} : VarSnap);
