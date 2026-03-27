#!/usr/bin/env node
"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __esm = (fn, res) => function __init() {
  return fn && (res = (0, fn[__getOwnPropNames(fn)[0]])(fn = 0)), res;
};
var __commonJS = (cb, mod) => function __require() {
  return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// ../../node_modules/lodash.keys/index.js
var require_lodash = __commonJS({
  "../../node_modules/lodash.keys/index.js"(exports2, module2) {
    "use strict";
    var MAX_SAFE_INTEGER = 9007199254740991;
    var argsTag = "[object Arguments]";
    var funcTag = "[object Function]";
    var genTag = "[object GeneratorFunction]";
    var reIsUint = /^(?:0|[1-9]\d*)$/;
    function baseTimes(n, iteratee) {
      var index = -1, result = Array(n);
      while (++index < n) {
        result[index] = iteratee(index);
      }
      return result;
    }
    function overArg(func, transform) {
      return function(arg) {
        return func(transform(arg));
      };
    }
    var objectProto = Object.prototype;
    var hasOwnProperty = objectProto.hasOwnProperty;
    var objectToString = objectProto.toString;
    var propertyIsEnumerable = objectProto.propertyIsEnumerable;
    var nativeKeys = overArg(Object.keys, Object);
    function arrayLikeKeys(value, inherited) {
      var result = isArray(value) || isArguments(value) ? baseTimes(value.length, String) : [];
      var length = result.length, skipIndexes = !!length;
      for (var key in value) {
        if ((inherited || hasOwnProperty.call(value, key)) && !(skipIndexes && (key == "length" || isIndex(key, length)))) {
          result.push(key);
        }
      }
      return result;
    }
    function baseKeys(object2) {
      if (!isPrototype(object2)) {
        return nativeKeys(object2);
      }
      var result = [];
      for (var key in Object(object2)) {
        if (hasOwnProperty.call(object2, key) && key != "constructor") {
          result.push(key);
        }
      }
      return result;
    }
    function isIndex(value, length) {
      length = length == null ? MAX_SAFE_INTEGER : length;
      return !!length && (typeof value == "number" || reIsUint.test(value)) && (value > -1 && value % 1 == 0 && value < length);
    }
    function isPrototype(value) {
      var Ctor = value && value.constructor, proto = typeof Ctor == "function" && Ctor.prototype || objectProto;
      return value === proto;
    }
    function isArguments(value) {
      return isArrayLikeObject(value) && hasOwnProperty.call(value, "callee") && (!propertyIsEnumerable.call(value, "callee") || objectToString.call(value) == argsTag);
    }
    var isArray = Array.isArray;
    function isArrayLike(value) {
      return value != null && isLength(value.length) && !isFunction(value);
    }
    function isArrayLikeObject(value) {
      return isObjectLike(value) && isArrayLike(value);
    }
    function isFunction(value) {
      var tag = isObject2(value) ? objectToString.call(value) : "";
      return tag == funcTag || tag == genTag;
    }
    function isLength(value) {
      return typeof value == "number" && value > -1 && value % 1 == 0 && value <= MAX_SAFE_INTEGER;
    }
    function isObject2(value) {
      var type = typeof value;
      return !!value && (type == "object" || type == "function");
    }
    function isObjectLike(value) {
      return !!value && typeof value == "object";
    }
    function keys(object2) {
      return isArrayLike(object2) ? arrayLikeKeys(object2) : baseKeys(object2);
    }
    module2.exports = keys;
  }
});

// ../../node_modules/lodash.merge/index.js
var require_lodash2 = __commonJS({
  "../../node_modules/lodash.merge/index.js"(exports2, module2) {
    "use strict";
    var LARGE_ARRAY_SIZE = 200;
    var HASH_UNDEFINED = "__lodash_hash_undefined__";
    var HOT_COUNT = 800;
    var HOT_SPAN = 16;
    var MAX_SAFE_INTEGER = 9007199254740991;
    var argsTag = "[object Arguments]";
    var arrayTag = "[object Array]";
    var asyncTag = "[object AsyncFunction]";
    var boolTag = "[object Boolean]";
    var dateTag = "[object Date]";
    var errorTag = "[object Error]";
    var funcTag = "[object Function]";
    var genTag = "[object GeneratorFunction]";
    var mapTag = "[object Map]";
    var numberTag = "[object Number]";
    var nullTag = "[object Null]";
    var objectTag = "[object Object]";
    var proxyTag = "[object Proxy]";
    var regexpTag = "[object RegExp]";
    var setTag = "[object Set]";
    var stringTag = "[object String]";
    var undefinedTag = "[object Undefined]";
    var weakMapTag = "[object WeakMap]";
    var arrayBufferTag = "[object ArrayBuffer]";
    var dataViewTag = "[object DataView]";
    var float32Tag = "[object Float32Array]";
    var float64Tag = "[object Float64Array]";
    var int8Tag = "[object Int8Array]";
    var int16Tag = "[object Int16Array]";
    var int32Tag = "[object Int32Array]";
    var uint8Tag = "[object Uint8Array]";
    var uint8ClampedTag = "[object Uint8ClampedArray]";
    var uint16Tag = "[object Uint16Array]";
    var uint32Tag = "[object Uint32Array]";
    var reRegExpChar = /[\\^$.*+?()[\]{}|]/g;
    var reIsHostCtor = /^\[object .+?Constructor\]$/;
    var reIsUint = /^(?:0|[1-9]\d*)$/;
    var typedArrayTags = {};
    typedArrayTags[float32Tag] = typedArrayTags[float64Tag] = typedArrayTags[int8Tag] = typedArrayTags[int16Tag] = typedArrayTags[int32Tag] = typedArrayTags[uint8Tag] = typedArrayTags[uint8ClampedTag] = typedArrayTags[uint16Tag] = typedArrayTags[uint32Tag] = true;
    typedArrayTags[argsTag] = typedArrayTags[arrayTag] = typedArrayTags[arrayBufferTag] = typedArrayTags[boolTag] = typedArrayTags[dataViewTag] = typedArrayTags[dateTag] = typedArrayTags[errorTag] = typedArrayTags[funcTag] = typedArrayTags[mapTag] = typedArrayTags[numberTag] = typedArrayTags[objectTag] = typedArrayTags[regexpTag] = typedArrayTags[setTag] = typedArrayTags[stringTag] = typedArrayTags[weakMapTag] = false;
    var freeGlobal = typeof global == "object" && global && global.Object === Object && global;
    var freeSelf = typeof self == "object" && self && self.Object === Object && self;
    var root = freeGlobal || freeSelf || Function("return this")();
    var freeExports = typeof exports2 == "object" && exports2 && !exports2.nodeType && exports2;
    var freeModule = freeExports && typeof module2 == "object" && module2 && !module2.nodeType && module2;
    var moduleExports = freeModule && freeModule.exports === freeExports;
    var freeProcess = moduleExports && freeGlobal.process;
    var nodeUtil = (function() {
      try {
        var types = freeModule && freeModule.require && freeModule.require("util").types;
        if (types) {
          return types;
        }
        return freeProcess && freeProcess.binding && freeProcess.binding("util");
      } catch (e) {
      }
    })();
    var nodeIsTypedArray = nodeUtil && nodeUtil.isTypedArray;
    function apply(func, thisArg, args) {
      switch (args.length) {
        case 0:
          return func.call(thisArg);
        case 1:
          return func.call(thisArg, args[0]);
        case 2:
          return func.call(thisArg, args[0], args[1]);
        case 3:
          return func.call(thisArg, args[0], args[1], args[2]);
      }
      return func.apply(thisArg, args);
    }
    function baseTimes(n, iteratee) {
      var index = -1, result = Array(n);
      while (++index < n) {
        result[index] = iteratee(index);
      }
      return result;
    }
    function baseUnary(func) {
      return function(value) {
        return func(value);
      };
    }
    function getValue(object2, key) {
      return object2 == null ? void 0 : object2[key];
    }
    function overArg(func, transform) {
      return function(arg) {
        return func(transform(arg));
      };
    }
    var arrayProto = Array.prototype;
    var funcProto = Function.prototype;
    var objectProto = Object.prototype;
    var coreJsData = root["__core-js_shared__"];
    var funcToString = funcProto.toString;
    var hasOwnProperty = objectProto.hasOwnProperty;
    var maskSrcKey = (function() {
      var uid = /[^.]+$/.exec(coreJsData && coreJsData.keys && coreJsData.keys.IE_PROTO || "");
      return uid ? "Symbol(src)_1." + uid : "";
    })();
    var nativeObjectToString = objectProto.toString;
    var objectCtorString = funcToString.call(Object);
    var reIsNative = RegExp(
      "^" + funcToString.call(hasOwnProperty).replace(reRegExpChar, "\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, "$1.*?") + "$"
    );
    var Buffer2 = moduleExports ? root.Buffer : void 0;
    var Symbol2 = root.Symbol;
    var Uint8Array2 = root.Uint8Array;
    var allocUnsafe = Buffer2 ? Buffer2.allocUnsafe : void 0;
    var getPrototype = overArg(Object.getPrototypeOf, Object);
    var objectCreate = Object.create;
    var propertyIsEnumerable = objectProto.propertyIsEnumerable;
    var splice = arrayProto.splice;
    var symToStringTag = Symbol2 ? Symbol2.toStringTag : void 0;
    var defineProperty = (function() {
      try {
        var func = getNative(Object, "defineProperty");
        func({}, "", {});
        return func;
      } catch (e) {
      }
    })();
    var nativeIsBuffer = Buffer2 ? Buffer2.isBuffer : void 0;
    var nativeMax = Math.max;
    var nativeNow = Date.now;
    var Map2 = getNative(root, "Map");
    var nativeCreate = getNative(Object, "create");
    var baseCreate = /* @__PURE__ */ (function() {
      function object2() {
      }
      return function(proto) {
        if (!isObject2(proto)) {
          return {};
        }
        if (objectCreate) {
          return objectCreate(proto);
        }
        object2.prototype = proto;
        var result = new object2();
        object2.prototype = void 0;
        return result;
      };
    })();
    function Hash(entries) {
      var index = -1, length = entries == null ? 0 : entries.length;
      this.clear();
      while (++index < length) {
        var entry = entries[index];
        this.set(entry[0], entry[1]);
      }
    }
    function hashClear() {
      this.__data__ = nativeCreate ? nativeCreate(null) : {};
      this.size = 0;
    }
    function hashDelete(key) {
      var result = this.has(key) && delete this.__data__[key];
      this.size -= result ? 1 : 0;
      return result;
    }
    function hashGet(key) {
      var data = this.__data__;
      if (nativeCreate) {
        var result = data[key];
        return result === HASH_UNDEFINED ? void 0 : result;
      }
      return hasOwnProperty.call(data, key) ? data[key] : void 0;
    }
    function hashHas(key) {
      var data = this.__data__;
      return nativeCreate ? data[key] !== void 0 : hasOwnProperty.call(data, key);
    }
    function hashSet(key, value) {
      var data = this.__data__;
      this.size += this.has(key) ? 0 : 1;
      data[key] = nativeCreate && value === void 0 ? HASH_UNDEFINED : value;
      return this;
    }
    Hash.prototype.clear = hashClear;
    Hash.prototype["delete"] = hashDelete;
    Hash.prototype.get = hashGet;
    Hash.prototype.has = hashHas;
    Hash.prototype.set = hashSet;
    function ListCache(entries) {
      var index = -1, length = entries == null ? 0 : entries.length;
      this.clear();
      while (++index < length) {
        var entry = entries[index];
        this.set(entry[0], entry[1]);
      }
    }
    function listCacheClear() {
      this.__data__ = [];
      this.size = 0;
    }
    function listCacheDelete(key) {
      var data = this.__data__, index = assocIndexOf(data, key);
      if (index < 0) {
        return false;
      }
      var lastIndex = data.length - 1;
      if (index == lastIndex) {
        data.pop();
      } else {
        splice.call(data, index, 1);
      }
      --this.size;
      return true;
    }
    function listCacheGet(key) {
      var data = this.__data__, index = assocIndexOf(data, key);
      return index < 0 ? void 0 : data[index][1];
    }
    function listCacheHas(key) {
      return assocIndexOf(this.__data__, key) > -1;
    }
    function listCacheSet(key, value) {
      var data = this.__data__, index = assocIndexOf(data, key);
      if (index < 0) {
        ++this.size;
        data.push([key, value]);
      } else {
        data[index][1] = value;
      }
      return this;
    }
    ListCache.prototype.clear = listCacheClear;
    ListCache.prototype["delete"] = listCacheDelete;
    ListCache.prototype.get = listCacheGet;
    ListCache.prototype.has = listCacheHas;
    ListCache.prototype.set = listCacheSet;
    function MapCache(entries) {
      var index = -1, length = entries == null ? 0 : entries.length;
      this.clear();
      while (++index < length) {
        var entry = entries[index];
        this.set(entry[0], entry[1]);
      }
    }
    function mapCacheClear() {
      this.size = 0;
      this.__data__ = {
        "hash": new Hash(),
        "map": new (Map2 || ListCache)(),
        "string": new Hash()
      };
    }
    function mapCacheDelete(key) {
      var result = getMapData(this, key)["delete"](key);
      this.size -= result ? 1 : 0;
      return result;
    }
    function mapCacheGet(key) {
      return getMapData(this, key).get(key);
    }
    function mapCacheHas(key) {
      return getMapData(this, key).has(key);
    }
    function mapCacheSet(key, value) {
      var data = getMapData(this, key), size = data.size;
      data.set(key, value);
      this.size += data.size == size ? 0 : 1;
      return this;
    }
    MapCache.prototype.clear = mapCacheClear;
    MapCache.prototype["delete"] = mapCacheDelete;
    MapCache.prototype.get = mapCacheGet;
    MapCache.prototype.has = mapCacheHas;
    MapCache.prototype.set = mapCacheSet;
    function Stack(entries) {
      var data = this.__data__ = new ListCache(entries);
      this.size = data.size;
    }
    function stackClear() {
      this.__data__ = new ListCache();
      this.size = 0;
    }
    function stackDelete(key) {
      var data = this.__data__, result = data["delete"](key);
      this.size = data.size;
      return result;
    }
    function stackGet(key) {
      return this.__data__.get(key);
    }
    function stackHas(key) {
      return this.__data__.has(key);
    }
    function stackSet(key, value) {
      var data = this.__data__;
      if (data instanceof ListCache) {
        var pairs = data.__data__;
        if (!Map2 || pairs.length < LARGE_ARRAY_SIZE - 1) {
          pairs.push([key, value]);
          this.size = ++data.size;
          return this;
        }
        data = this.__data__ = new MapCache(pairs);
      }
      data.set(key, value);
      this.size = data.size;
      return this;
    }
    Stack.prototype.clear = stackClear;
    Stack.prototype["delete"] = stackDelete;
    Stack.prototype.get = stackGet;
    Stack.prototype.has = stackHas;
    Stack.prototype.set = stackSet;
    function arrayLikeKeys(value, inherited) {
      var isArr = isArray(value), isArg = !isArr && isArguments(value), isBuff = !isArr && !isArg && isBuffer(value), isType = !isArr && !isArg && !isBuff && isTypedArray(value), skipIndexes = isArr || isArg || isBuff || isType, result = skipIndexes ? baseTimes(value.length, String) : [], length = result.length;
      for (var key in value) {
        if ((inherited || hasOwnProperty.call(value, key)) && !(skipIndexes && // Safari 9 has enumerable `arguments.length` in strict mode.
        (key == "length" || // Node.js 0.10 has enumerable non-index properties on buffers.
        isBuff && (key == "offset" || key == "parent") || // PhantomJS 2 has enumerable non-index properties on typed arrays.
        isType && (key == "buffer" || key == "byteLength" || key == "byteOffset") || // Skip index properties.
        isIndex(key, length)))) {
          result.push(key);
        }
      }
      return result;
    }
    function assignMergeValue(object2, key, value) {
      if (value !== void 0 && !eq(object2[key], value) || value === void 0 && !(key in object2)) {
        baseAssignValue(object2, key, value);
      }
    }
    function assignValue(object2, key, value) {
      var objValue = object2[key];
      if (!(hasOwnProperty.call(object2, key) && eq(objValue, value)) || value === void 0 && !(key in object2)) {
        baseAssignValue(object2, key, value);
      }
    }
    function assocIndexOf(array2, key) {
      var length = array2.length;
      while (length--) {
        if (eq(array2[length][0], key)) {
          return length;
        }
      }
      return -1;
    }
    function baseAssignValue(object2, key, value) {
      if (key == "__proto__" && defineProperty) {
        defineProperty(object2, key, {
          "configurable": true,
          "enumerable": true,
          "value": value,
          "writable": true
        });
      } else {
        object2[key] = value;
      }
    }
    var baseFor = createBaseFor();
    function baseGetTag(value) {
      if (value == null) {
        return value === void 0 ? undefinedTag : nullTag;
      }
      return symToStringTag && symToStringTag in Object(value) ? getRawTag(value) : objectToString(value);
    }
    function baseIsArguments(value) {
      return isObjectLike(value) && baseGetTag(value) == argsTag;
    }
    function baseIsNative(value) {
      if (!isObject2(value) || isMasked(value)) {
        return false;
      }
      var pattern = isFunction(value) ? reIsNative : reIsHostCtor;
      return pattern.test(toSource(value));
    }
    function baseIsTypedArray(value) {
      return isObjectLike(value) && isLength(value.length) && !!typedArrayTags[baseGetTag(value)];
    }
    function baseKeysIn(object2) {
      if (!isObject2(object2)) {
        return nativeKeysIn(object2);
      }
      var isProto = isPrototype(object2), result = [];
      for (var key in object2) {
        if (!(key == "constructor" && (isProto || !hasOwnProperty.call(object2, key)))) {
          result.push(key);
        }
      }
      return result;
    }
    function baseMerge(object2, source, srcIndex, customizer, stack) {
      if (object2 === source) {
        return;
      }
      baseFor(source, function(srcValue, key) {
        stack || (stack = new Stack());
        if (isObject2(srcValue)) {
          baseMergeDeep(object2, source, key, srcIndex, baseMerge, customizer, stack);
        } else {
          var newValue = customizer ? customizer(safeGet(object2, key), srcValue, key + "", object2, source, stack) : void 0;
          if (newValue === void 0) {
            newValue = srcValue;
          }
          assignMergeValue(object2, key, newValue);
        }
      }, keysIn);
    }
    function baseMergeDeep(object2, source, key, srcIndex, mergeFunc, customizer, stack) {
      var objValue = safeGet(object2, key), srcValue = safeGet(source, key), stacked = stack.get(srcValue);
      if (stacked) {
        assignMergeValue(object2, key, stacked);
        return;
      }
      var newValue = customizer ? customizer(objValue, srcValue, key + "", object2, source, stack) : void 0;
      var isCommon = newValue === void 0;
      if (isCommon) {
        var isArr = isArray(srcValue), isBuff = !isArr && isBuffer(srcValue), isTyped = !isArr && !isBuff && isTypedArray(srcValue);
        newValue = srcValue;
        if (isArr || isBuff || isTyped) {
          if (isArray(objValue)) {
            newValue = objValue;
          } else if (isArrayLikeObject(objValue)) {
            newValue = copyArray(objValue);
          } else if (isBuff) {
            isCommon = false;
            newValue = cloneBuffer(srcValue, true);
          } else if (isTyped) {
            isCommon = false;
            newValue = cloneTypedArray(srcValue, true);
          } else {
            newValue = [];
          }
        } else if (isPlainObject(srcValue) || isArguments(srcValue)) {
          newValue = objValue;
          if (isArguments(objValue)) {
            newValue = toPlainObject(objValue);
          } else if (!isObject2(objValue) || isFunction(objValue)) {
            newValue = initCloneObject(srcValue);
          }
        } else {
          isCommon = false;
        }
      }
      if (isCommon) {
        stack.set(srcValue, newValue);
        mergeFunc(newValue, srcValue, srcIndex, customizer, stack);
        stack["delete"](srcValue);
      }
      assignMergeValue(object2, key, newValue);
    }
    function baseRest(func, start) {
      return setToString(overRest(func, start, identity), func + "");
    }
    var baseSetToString = !defineProperty ? identity : function(func, string2) {
      return defineProperty(func, "toString", {
        "configurable": true,
        "enumerable": false,
        "value": constant(string2),
        "writable": true
      });
    };
    function cloneBuffer(buffer, isDeep) {
      if (isDeep) {
        return buffer.slice();
      }
      var length = buffer.length, result = allocUnsafe ? allocUnsafe(length) : new buffer.constructor(length);
      buffer.copy(result);
      return result;
    }
    function cloneArrayBuffer(arrayBuffer) {
      var result = new arrayBuffer.constructor(arrayBuffer.byteLength);
      new Uint8Array2(result).set(new Uint8Array2(arrayBuffer));
      return result;
    }
    function cloneTypedArray(typedArray, isDeep) {
      var buffer = isDeep ? cloneArrayBuffer(typedArray.buffer) : typedArray.buffer;
      return new typedArray.constructor(buffer, typedArray.byteOffset, typedArray.length);
    }
    function copyArray(source, array2) {
      var index = -1, length = source.length;
      array2 || (array2 = Array(length));
      while (++index < length) {
        array2[index] = source[index];
      }
      return array2;
    }
    function copyObject(source, props, object2, customizer) {
      var isNew = !object2;
      object2 || (object2 = {});
      var index = -1, length = props.length;
      while (++index < length) {
        var key = props[index];
        var newValue = customizer ? customizer(object2[key], source[key], key, object2, source) : void 0;
        if (newValue === void 0) {
          newValue = source[key];
        }
        if (isNew) {
          baseAssignValue(object2, key, newValue);
        } else {
          assignValue(object2, key, newValue);
        }
      }
      return object2;
    }
    function createAssigner(assigner) {
      return baseRest(function(object2, sources) {
        var index = -1, length = sources.length, customizer = length > 1 ? sources[length - 1] : void 0, guard = length > 2 ? sources[2] : void 0;
        customizer = assigner.length > 3 && typeof customizer == "function" ? (length--, customizer) : void 0;
        if (guard && isIterateeCall(sources[0], sources[1], guard)) {
          customizer = length < 3 ? void 0 : customizer;
          length = 1;
        }
        object2 = Object(object2);
        while (++index < length) {
          var source = sources[index];
          if (source) {
            assigner(object2, source, index, customizer);
          }
        }
        return object2;
      });
    }
    function createBaseFor(fromRight) {
      return function(object2, iteratee, keysFunc) {
        var index = -1, iterable = Object(object2), props = keysFunc(object2), length = props.length;
        while (length--) {
          var key = props[fromRight ? length : ++index];
          if (iteratee(iterable[key], key, iterable) === false) {
            break;
          }
        }
        return object2;
      };
    }
    function getMapData(map, key) {
      var data = map.__data__;
      return isKeyable(key) ? data[typeof key == "string" ? "string" : "hash"] : data.map;
    }
    function getNative(object2, key) {
      var value = getValue(object2, key);
      return baseIsNative(value) ? value : void 0;
    }
    function getRawTag(value) {
      var isOwn = hasOwnProperty.call(value, symToStringTag), tag = value[symToStringTag];
      try {
        value[symToStringTag] = void 0;
        var unmasked = true;
      } catch (e) {
      }
      var result = nativeObjectToString.call(value);
      if (unmasked) {
        if (isOwn) {
          value[symToStringTag] = tag;
        } else {
          delete value[symToStringTag];
        }
      }
      return result;
    }
    function initCloneObject(object2) {
      return typeof object2.constructor == "function" && !isPrototype(object2) ? baseCreate(getPrototype(object2)) : {};
    }
    function isIndex(value, length) {
      var type = typeof value;
      length = length == null ? MAX_SAFE_INTEGER : length;
      return !!length && (type == "number" || type != "symbol" && reIsUint.test(value)) && (value > -1 && value % 1 == 0 && value < length);
    }
    function isIterateeCall(value, index, object2) {
      if (!isObject2(object2)) {
        return false;
      }
      var type = typeof index;
      if (type == "number" ? isArrayLike(object2) && isIndex(index, object2.length) : type == "string" && index in object2) {
        return eq(object2[index], value);
      }
      return false;
    }
    function isKeyable(value) {
      var type = typeof value;
      return type == "string" || type == "number" || type == "symbol" || type == "boolean" ? value !== "__proto__" : value === null;
    }
    function isMasked(func) {
      return !!maskSrcKey && maskSrcKey in func;
    }
    function isPrototype(value) {
      var Ctor = value && value.constructor, proto = typeof Ctor == "function" && Ctor.prototype || objectProto;
      return value === proto;
    }
    function nativeKeysIn(object2) {
      var result = [];
      if (object2 != null) {
        for (var key in Object(object2)) {
          result.push(key);
        }
      }
      return result;
    }
    function objectToString(value) {
      return nativeObjectToString.call(value);
    }
    function overRest(func, start, transform) {
      start = nativeMax(start === void 0 ? func.length - 1 : start, 0);
      return function() {
        var args = arguments, index = -1, length = nativeMax(args.length - start, 0), array2 = Array(length);
        while (++index < length) {
          array2[index] = args[start + index];
        }
        index = -1;
        var otherArgs = Array(start + 1);
        while (++index < start) {
          otherArgs[index] = args[index];
        }
        otherArgs[start] = transform(array2);
        return apply(func, this, otherArgs);
      };
    }
    function safeGet(object2, key) {
      if (key === "constructor" && typeof object2[key] === "function") {
        return;
      }
      if (key == "__proto__") {
        return;
      }
      return object2[key];
    }
    var setToString = shortOut(baseSetToString);
    function shortOut(func) {
      var count = 0, lastCalled = 0;
      return function() {
        var stamp = nativeNow(), remaining = HOT_SPAN - (stamp - lastCalled);
        lastCalled = stamp;
        if (remaining > 0) {
          if (++count >= HOT_COUNT) {
            return arguments[0];
          }
        } else {
          count = 0;
        }
        return func.apply(void 0, arguments);
      };
    }
    function toSource(func) {
      if (func != null) {
        try {
          return funcToString.call(func);
        } catch (e) {
        }
        try {
          return func + "";
        } catch (e) {
        }
      }
      return "";
    }
    function eq(value, other) {
      return value === other || value !== value && other !== other;
    }
    var isArguments = baseIsArguments(/* @__PURE__ */ (function() {
      return arguments;
    })()) ? baseIsArguments : function(value) {
      return isObjectLike(value) && hasOwnProperty.call(value, "callee") && !propertyIsEnumerable.call(value, "callee");
    };
    var isArray = Array.isArray;
    function isArrayLike(value) {
      return value != null && isLength(value.length) && !isFunction(value);
    }
    function isArrayLikeObject(value) {
      return isObjectLike(value) && isArrayLike(value);
    }
    var isBuffer = nativeIsBuffer || stubFalse;
    function isFunction(value) {
      if (!isObject2(value)) {
        return false;
      }
      var tag = baseGetTag(value);
      return tag == funcTag || tag == genTag || tag == asyncTag || tag == proxyTag;
    }
    function isLength(value) {
      return typeof value == "number" && value > -1 && value % 1 == 0 && value <= MAX_SAFE_INTEGER;
    }
    function isObject2(value) {
      var type = typeof value;
      return value != null && (type == "object" || type == "function");
    }
    function isObjectLike(value) {
      return value != null && typeof value == "object";
    }
    function isPlainObject(value) {
      if (!isObjectLike(value) || baseGetTag(value) != objectTag) {
        return false;
      }
      var proto = getPrototype(value);
      if (proto === null) {
        return true;
      }
      var Ctor = hasOwnProperty.call(proto, "constructor") && proto.constructor;
      return typeof Ctor == "function" && Ctor instanceof Ctor && funcToString.call(Ctor) == objectCtorString;
    }
    var isTypedArray = nodeIsTypedArray ? baseUnary(nodeIsTypedArray) : baseIsTypedArray;
    function toPlainObject(value) {
      return copyObject(value, keysIn(value));
    }
    function keysIn(object2) {
      return isArrayLike(object2) ? arrayLikeKeys(object2, true) : baseKeysIn(object2);
    }
    var merge = createAssigner(function(object2, source, srcIndex) {
      baseMerge(object2, source, srcIndex);
    });
    function constant(value) {
      return function() {
        return value;
      };
    }
    function identity(value) {
      return value;
    }
    function stubFalse() {
      return false;
    }
    module2.exports = merge;
  }
});

// ../../node_modules/lodash.xor/index.js
var require_lodash3 = __commonJS({
  "../../node_modules/lodash.xor/index.js"(exports2, module2) {
    "use strict";
    var LARGE_ARRAY_SIZE = 200;
    var HASH_UNDEFINED = "__lodash_hash_undefined__";
    var INFINITY = 1 / 0;
    var MAX_SAFE_INTEGER = 9007199254740991;
    var funcTag = "[object Function]";
    var genTag = "[object GeneratorFunction]";
    var reRegExpChar = /[\\^$.*+?()[\]{}|]/g;
    var reIsHostCtor = /^\[object .+?Constructor\]$/;
    var freeGlobal = typeof global == "object" && global && global.Object === Object && global;
    var freeSelf = typeof self == "object" && self && self.Object === Object && self;
    var root = freeGlobal || freeSelf || Function("return this")();
    function apply(func, thisArg, args) {
      switch (args.length) {
        case 0:
          return func.call(thisArg);
        case 1:
          return func.call(thisArg, args[0]);
        case 2:
          return func.call(thisArg, args[0], args[1]);
        case 3:
          return func.call(thisArg, args[0], args[1], args[2]);
      }
      return func.apply(thisArg, args);
    }
    function arrayFilter(array2, predicate) {
      var index = -1, length = array2 ? array2.length : 0, resIndex = 0, result = [];
      while (++index < length) {
        var value = array2[index];
        if (predicate(value, index, array2)) {
          result[resIndex++] = value;
        }
      }
      return result;
    }
    function arrayIncludes(array2, value) {
      var length = array2 ? array2.length : 0;
      return !!length && baseIndexOf(array2, value, 0) > -1;
    }
    function arrayIncludesWith(array2, value, comparator) {
      var index = -1, length = array2 ? array2.length : 0;
      while (++index < length) {
        if (comparator(value, array2[index])) {
          return true;
        }
      }
      return false;
    }
    function arrayMap(array2, iteratee) {
      var index = -1, length = array2 ? array2.length : 0, result = Array(length);
      while (++index < length) {
        result[index] = iteratee(array2[index], index, array2);
      }
      return result;
    }
    function arrayPush(array2, values) {
      var index = -1, length = values.length, offset = array2.length;
      while (++index < length) {
        array2[offset + index] = values[index];
      }
      return array2;
    }
    function baseFindIndex(array2, predicate, fromIndex, fromRight) {
      var length = array2.length, index = fromIndex + (fromRight ? 1 : -1);
      while (fromRight ? index-- : ++index < length) {
        if (predicate(array2[index], index, array2)) {
          return index;
        }
      }
      return -1;
    }
    function baseIndexOf(array2, value, fromIndex) {
      if (value !== value) {
        return baseFindIndex(array2, baseIsNaN, fromIndex);
      }
      var index = fromIndex - 1, length = array2.length;
      while (++index < length) {
        if (array2[index] === value) {
          return index;
        }
      }
      return -1;
    }
    function baseIsNaN(value) {
      return value !== value;
    }
    function baseUnary(func) {
      return function(value) {
        return func(value);
      };
    }
    function cacheHas(cache, key) {
      return cache.has(key);
    }
    function getValue(object2, key) {
      return object2 == null ? void 0 : object2[key];
    }
    function isHostObject(value) {
      var result = false;
      if (value != null && typeof value.toString != "function") {
        try {
          result = !!(value + "");
        } catch (e) {
        }
      }
      return result;
    }
    function setToArray(set) {
      var index = -1, result = Array(set.size);
      set.forEach(function(value) {
        result[++index] = value;
      });
      return result;
    }
    var arrayProto = Array.prototype;
    var funcProto = Function.prototype;
    var objectProto = Object.prototype;
    var coreJsData = root["__core-js_shared__"];
    var maskSrcKey = (function() {
      var uid = /[^.]+$/.exec(coreJsData && coreJsData.keys && coreJsData.keys.IE_PROTO || "");
      return uid ? "Symbol(src)_1." + uid : "";
    })();
    var funcToString = funcProto.toString;
    var hasOwnProperty = objectProto.hasOwnProperty;
    var objectToString = objectProto.toString;
    var reIsNative = RegExp(
      "^" + funcToString.call(hasOwnProperty).replace(reRegExpChar, "\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, "$1.*?") + "$"
    );
    var splice = arrayProto.splice;
    var nativeMax = Math.max;
    var Map2 = getNative(root, "Map");
    var Set2 = getNative(root, "Set");
    var nativeCreate = getNative(Object, "create");
    function Hash(entries) {
      var index = -1, length = entries ? entries.length : 0;
      this.clear();
      while (++index < length) {
        var entry = entries[index];
        this.set(entry[0], entry[1]);
      }
    }
    function hashClear() {
      this.__data__ = nativeCreate ? nativeCreate(null) : {};
    }
    function hashDelete(key) {
      return this.has(key) && delete this.__data__[key];
    }
    function hashGet(key) {
      var data = this.__data__;
      if (nativeCreate) {
        var result = data[key];
        return result === HASH_UNDEFINED ? void 0 : result;
      }
      return hasOwnProperty.call(data, key) ? data[key] : void 0;
    }
    function hashHas(key) {
      var data = this.__data__;
      return nativeCreate ? data[key] !== void 0 : hasOwnProperty.call(data, key);
    }
    function hashSet(key, value) {
      var data = this.__data__;
      data[key] = nativeCreate && value === void 0 ? HASH_UNDEFINED : value;
      return this;
    }
    Hash.prototype.clear = hashClear;
    Hash.prototype["delete"] = hashDelete;
    Hash.prototype.get = hashGet;
    Hash.prototype.has = hashHas;
    Hash.prototype.set = hashSet;
    function ListCache(entries) {
      var index = -1, length = entries ? entries.length : 0;
      this.clear();
      while (++index < length) {
        var entry = entries[index];
        this.set(entry[0], entry[1]);
      }
    }
    function listCacheClear() {
      this.__data__ = [];
    }
    function listCacheDelete(key) {
      var data = this.__data__, index = assocIndexOf(data, key);
      if (index < 0) {
        return false;
      }
      var lastIndex = data.length - 1;
      if (index == lastIndex) {
        data.pop();
      } else {
        splice.call(data, index, 1);
      }
      return true;
    }
    function listCacheGet(key) {
      var data = this.__data__, index = assocIndexOf(data, key);
      return index < 0 ? void 0 : data[index][1];
    }
    function listCacheHas(key) {
      return assocIndexOf(this.__data__, key) > -1;
    }
    function listCacheSet(key, value) {
      var data = this.__data__, index = assocIndexOf(data, key);
      if (index < 0) {
        data.push([key, value]);
      } else {
        data[index][1] = value;
      }
      return this;
    }
    ListCache.prototype.clear = listCacheClear;
    ListCache.prototype["delete"] = listCacheDelete;
    ListCache.prototype.get = listCacheGet;
    ListCache.prototype.has = listCacheHas;
    ListCache.prototype.set = listCacheSet;
    function MapCache(entries) {
      var index = -1, length = entries ? entries.length : 0;
      this.clear();
      while (++index < length) {
        var entry = entries[index];
        this.set(entry[0], entry[1]);
      }
    }
    function mapCacheClear() {
      this.__data__ = {
        "hash": new Hash(),
        "map": new (Map2 || ListCache)(),
        "string": new Hash()
      };
    }
    function mapCacheDelete(key) {
      return getMapData(this, key)["delete"](key);
    }
    function mapCacheGet(key) {
      return getMapData(this, key).get(key);
    }
    function mapCacheHas(key) {
      return getMapData(this, key).has(key);
    }
    function mapCacheSet(key, value) {
      getMapData(this, key).set(key, value);
      return this;
    }
    MapCache.prototype.clear = mapCacheClear;
    MapCache.prototype["delete"] = mapCacheDelete;
    MapCache.prototype.get = mapCacheGet;
    MapCache.prototype.has = mapCacheHas;
    MapCache.prototype.set = mapCacheSet;
    function SetCache(values) {
      var index = -1, length = values ? values.length : 0;
      this.__data__ = new MapCache();
      while (++index < length) {
        this.add(values[index]);
      }
    }
    function setCacheAdd(value) {
      this.__data__.set(value, HASH_UNDEFINED);
      return this;
    }
    function setCacheHas(value) {
      return this.__data__.has(value);
    }
    SetCache.prototype.add = SetCache.prototype.push = setCacheAdd;
    SetCache.prototype.has = setCacheHas;
    function assocIndexOf(array2, key) {
      var length = array2.length;
      while (length--) {
        if (eq(array2[length][0], key)) {
          return length;
        }
      }
      return -1;
    }
    function baseDifference(array2, values, iteratee, comparator) {
      var index = -1, includes = arrayIncludes, isCommon = true, length = array2.length, result = [], valuesLength = values.length;
      if (!length) {
        return result;
      }
      if (iteratee) {
        values = arrayMap(values, baseUnary(iteratee));
      }
      if (comparator) {
        includes = arrayIncludesWith;
        isCommon = false;
      } else if (values.length >= LARGE_ARRAY_SIZE) {
        includes = cacheHas;
        isCommon = false;
        values = new SetCache(values);
      }
      outer:
        while (++index < length) {
          var value = array2[index], computed = iteratee ? iteratee(value) : value;
          value = comparator || value !== 0 ? value : 0;
          if (isCommon && computed === computed) {
            var valuesIndex = valuesLength;
            while (valuesIndex--) {
              if (values[valuesIndex] === computed) {
                continue outer;
              }
            }
            result.push(value);
          } else if (!includes(values, computed, comparator)) {
            result.push(value);
          }
        }
      return result;
    }
    function baseIsNative(value) {
      if (!isObject2(value) || isMasked(value)) {
        return false;
      }
      var pattern = isFunction(value) || isHostObject(value) ? reIsNative : reIsHostCtor;
      return pattern.test(toSource(value));
    }
    function baseRest(func, start) {
      start = nativeMax(start === void 0 ? func.length - 1 : start, 0);
      return function() {
        var args = arguments, index = -1, length = nativeMax(args.length - start, 0), array2 = Array(length);
        while (++index < length) {
          array2[index] = args[start + index];
        }
        index = -1;
        var otherArgs = Array(start + 1);
        while (++index < start) {
          otherArgs[index] = args[index];
        }
        otherArgs[start] = array2;
        return apply(func, this, otherArgs);
      };
    }
    function baseUniq(array2, iteratee, comparator) {
      var index = -1, includes = arrayIncludes, length = array2.length, isCommon = true, result = [], seen = result;
      if (comparator) {
        isCommon = false;
        includes = arrayIncludesWith;
      } else if (length >= LARGE_ARRAY_SIZE) {
        var set = iteratee ? null : createSet(array2);
        if (set) {
          return setToArray(set);
        }
        isCommon = false;
        includes = cacheHas;
        seen = new SetCache();
      } else {
        seen = iteratee ? [] : result;
      }
      outer:
        while (++index < length) {
          var value = array2[index], computed = iteratee ? iteratee(value) : value;
          value = comparator || value !== 0 ? value : 0;
          if (isCommon && computed === computed) {
            var seenIndex = seen.length;
            while (seenIndex--) {
              if (seen[seenIndex] === computed) {
                continue outer;
              }
            }
            if (iteratee) {
              seen.push(computed);
            }
            result.push(value);
          } else if (!includes(seen, computed, comparator)) {
            if (seen !== result) {
              seen.push(computed);
            }
            result.push(value);
          }
        }
      return result;
    }
    function baseXor(arrays, iteratee, comparator) {
      var index = -1, length = arrays.length;
      while (++index < length) {
        var result = result ? arrayPush(
          baseDifference(result, arrays[index], iteratee, comparator),
          baseDifference(arrays[index], result, iteratee, comparator)
        ) : arrays[index];
      }
      return result && result.length ? baseUniq(result, iteratee, comparator) : [];
    }
    var createSet = !(Set2 && 1 / setToArray(new Set2([, -0]))[1] == INFINITY) ? noop : function(values) {
      return new Set2(values);
    };
    function getMapData(map, key) {
      var data = map.__data__;
      return isKeyable(key) ? data[typeof key == "string" ? "string" : "hash"] : data.map;
    }
    function getNative(object2, key) {
      var value = getValue(object2, key);
      return baseIsNative(value) ? value : void 0;
    }
    function isKeyable(value) {
      var type = typeof value;
      return type == "string" || type == "number" || type == "symbol" || type == "boolean" ? value !== "__proto__" : value === null;
    }
    function isMasked(func) {
      return !!maskSrcKey && maskSrcKey in func;
    }
    function toSource(func) {
      if (func != null) {
        try {
          return funcToString.call(func);
        } catch (e) {
        }
        try {
          return func + "";
        } catch (e) {
        }
      }
      return "";
    }
    var xor = baseRest(function(arrays) {
      return baseXor(arrayFilter(arrays, isArrayLikeObject));
    });
    function eq(value, other) {
      return value === other || value !== value && other !== other;
    }
    function isArrayLike(value) {
      return value != null && isLength(value.length) && !isFunction(value);
    }
    function isArrayLikeObject(value) {
      return isObjectLike(value) && isArrayLike(value);
    }
    function isFunction(value) {
      var tag = isObject2(value) ? objectToString.call(value) : "";
      return tag == funcTag || tag == genTag;
    }
    function isLength(value) {
      return typeof value == "number" && value > -1 && value % 1 == 0 && value <= MAX_SAFE_INTEGER;
    }
    function isObject2(value) {
      var type = typeof value;
      return !!value && (type == "object" || type == "function");
    }
    function isObjectLike(value) {
      return !!value && typeof value == "object";
    }
    function noop() {
    }
    module2.exports = xor;
  }
});

// ../shared/dist/json-schema.js
var require_json_schema = __commonJS({
  "../shared/dist/json-schema.js"(exports2) {
    "use strict";
    var __importDefault = exports2 && exports2.__importDefault || function(mod) {
      return mod && mod.__esModule ? mod : { "default": mod };
    };
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.toJsonSchema = toJsonSchema2;
    exports2.convertRequiredToArray = convertRequiredToArray2;
    exports2.generateDefaultFromSchema = generateDefaultFromSchema;
    exports2.parseJsonSafe = parseJsonSafe;
    exports2.normalizeToolSchemas = normalizeToolSchemas2;
    var lodash_keys_1 = __importDefault(require_lodash());
    var lodash_merge_1 = __importDefault(require_lodash2());
    var lodash_xor_1 = __importDefault(require_lodash3());
    function isEqual(a, b) {
      if (a === b)
        return true;
      if (a === null || b === null || typeof a !== "object" || typeof b !== "object")
        return false;
      if (Array.isArray(a) !== Array.isArray(b))
        return false;
      const keysA = Object.keys(a);
      const keysB = Object.keys(b);
      if (keysA.length !== keysB.length)
        return false;
      const bObj = b;
      return keysA.every((k) => k in bObj && isEqual(a[k], bObj[k]));
    }
    var defaultOptions = {
      required: false,
      requiredDepth: Number.POSITIVE_INFINITY,
      postProcessFnc: null,
      strings: {
        preProcessFnc: null
      },
      arrays: {
        mode: "all"
      },
      objects: {
        preProcessFnc: null,
        postProcessFnc: null,
        additionalProperties: true
      }
    };
    var types = {
      string: function testString(instance) {
        return typeof instance === "string";
      },
      number: function testNumber(instance) {
        return typeof instance === "number" && isFinite(instance);
      },
      integer: function testInteger(instance) {
        return typeof instance === "number" && instance % 1 === 0;
      },
      boolean: function testBoolean(instance) {
        return typeof instance === "boolean";
      },
      array: function testArray(instance) {
        return instance instanceof Array;
      },
      null: function testNull(instance) {
        return instance === null;
      },
      date: function testDate(instance) {
        return instance instanceof Date;
      },
      /* istanbul ignore next: not using this but keeping it here for sake of completeness */
      any: function testAny(instance) {
        return true;
      },
      object: function testObject(instance) {
        return instance && typeof instance === "object" && !(instance instanceof Array) && !(instance instanceof Date);
      }
    };
    var helpers = {
      typeNames: [
        "integer",
        "number",
        // make sure number is after integer (for proper type detection)
        "string",
        "array",
        "object",
        "boolean",
        "null",
        "date"
      ],
      getType(val) {
        return helpers.typeNames.find((typeName) => types[typeName](val));
      },
      mergeSchemaObjs(schema1, schema2) {
        if (!schema1 || !schema2) {
          return null;
        }
        const schema1Keys = (0, lodash_keys_1.default)(schema1);
        const schema2Keys = (0, lodash_keys_1.default)(schema2);
        if (!isEqual(schema1Keys, schema2Keys)) {
          if (schema1.type === "array" && schema2.type === "array") {
            if (isEqual((0, lodash_xor_1.default)(schema1Keys, schema2Keys), ["items"])) {
              const schemaWithoutItems = schema1Keys.length > schema2Keys.length ? schema2 : schema1;
              const schemaWithItems = schema1Keys.length > schema2Keys.length ? schema1 : schema2;
              const isSame = (0, lodash_keys_1.default)(schemaWithoutItems).reduce((acc, current) => isEqual(schemaWithoutItems[current], schemaWithItems[current]) && acc, true);
              if (isSame) {
                return schemaWithoutItems;
              }
            }
          }
          if (schema1.type !== "object" || schema2.type !== "object") {
            return null;
          }
        }
        const retObj = {};
        for (let i = 0, { length } = schema1Keys; i < length; i++) {
          const key = schema1Keys[i];
          if (helpers.getType(schema1[key]) === "object") {
            const x = helpers.mergeSchemaObjs(schema1[key], schema2[key]);
            if (!x) {
              if (schema1.type === "object" || schema2.type === "object") {
                return { type: "object" };
              }
              if (key !== "items" || schema1.type !== "array" || schema2.type !== "array") {
                return null;
              }
            } else {
              retObj[key] = x;
            }
          } else {
            if (key === "type") {
              if (schema1[key] !== schema2[key]) {
                if (schema1[key] === "integer" && schema2[key] === "number" || schema1[key] === "number" && schema2[key] === "integer") {
                  retObj[key] = "number";
                } else {
                  return null;
                }
              } else {
                retObj[key] = schema1[key];
              }
            } else {
              if (!isEqual(schema1[key], schema2[key])) {
                return null;
              }
              retObj[key] = schema1[key];
            }
          }
        }
        return retObj;
      }
    };
    function getCommonTypeFromArrayOfTypes(arrOfTypes) {
      let lastVal;
      for (let i = 0, { length } = arrOfTypes; i < length; i++) {
        let currentType = arrOfTypes[i];
        if (i > 0) {
          if (currentType === "integer" && lastVal === "number") {
            currentType = "number";
          } else if (currentType === "number" && lastVal === "integer") {
            lastVal = "number";
          }
          if (lastVal !== currentType)
            return null;
        }
        lastVal = currentType;
      }
      return lastVal;
    }
    function getCommonArrayItemsType(arr) {
      return getCommonTypeFromArrayOfTypes(arr.map((item) => helpers.getType(item)));
    }
    var ToJsonSchema = class {
      constructor(options) {
        this.options = (0, lodash_merge_1.default)({}, defaultOptions, options);
        this.depth = 0;
        this.getObjectSchemaDefault = this.getObjectSchemaDefault.bind(this);
        this.getStringSchemaDefault = this.getStringSchemaDefault.bind(this);
        this.objectPostProcessDefault = this.objectPostProcessDefault.bind(this);
        this.commmonPostProcessDefault = this.commmonPostProcessDefault.bind(this);
        this.objectPostProcessDefault = this.objectPostProcessDefault.bind(this);
      }
      getCommonArrayItemSchema(arr) {
        const schemas = arr.map((item) => {
          this.depth++;
          const schema = this.getSchema(item);
          this.depth--;
          return schema;
        });
        return schemas.reduce((acc, current) => helpers.mergeSchemaObjs(acc, current), schemas.pop());
      }
      getObjectSchemaDefault(obj) {
        const schema = { type: "object" };
        const objKeys = Object.keys(obj);
        if (objKeys.length > 0) {
          schema.properties = objKeys.reduce((acc, propertyName) => {
            this.depth++;
            acc[propertyName] = this.getSchema(obj[propertyName]);
            this.depth--;
            return acc;
          }, {});
        }
        return schema;
      }
      getObjectSchema(obj) {
        if (this.options.objects.preProcessFnc) {
          return this.options.objects.preProcessFnc(obj, this.getObjectSchemaDefault);
        }
        return this.getObjectSchemaDefault(obj);
      }
      getArraySchemaMerging(arr) {
        const schema = { type: "array" };
        const commonType = getCommonArrayItemsType(arr);
        if (commonType) {
          schema.items = { type: commonType };
          if (commonType !== "integer" && commonType !== "number") {
            const itemSchema = this.getCommonArrayItemSchema(arr);
            if (itemSchema) {
              schema.items = itemSchema;
            }
          } else if (this.options.required) {
            schema.items.required = true;
          }
        }
        return schema;
      }
      getArraySchemaNoMerging(arr) {
        const schema = { type: "array" };
        if (arr.length > 0) {
          this.depth++;
          schema.items = this.getSchema(arr[0]);
          this.depth--;
        }
        return schema;
      }
      getArraySchemaTuple(arr) {
        const schema = { type: "array" };
        if (arr.length > 0) {
          schema.items = arr.map((item) => {
            this.depth++;
            const itemSchema = this.getSchema(item);
            this.depth--;
            return itemSchema;
          });
        }
        return schema;
      }
      getArraySchemaUniform(arr) {
        const schema = this.getArraySchemaNoMerging(arr);
        if (arr.length > 1) {
          for (let i = 1; i < arr.length; i++) {
            this.depth++;
            const itemSchema = this.getSchema(arr[i]);
            this.depth--;
            if (!isEqual(schema.items, itemSchema)) {
              throw new Error("Invalid schema, incompatible array items");
            }
          }
        }
        return schema;
      }
      getArraySchema(arr) {
        if (arr.length === 0) {
          return { type: "array" };
        }
        switch (this.options.arrays.mode) {
          case "all":
            return this.getArraySchemaMerging(arr);
          case "first":
            return this.getArraySchemaNoMerging(arr);
          case "uniform":
            return this.getArraySchemaUniform(arr);
          case "tuple":
            return this.getArraySchemaTuple(arr);
          default:
            throw new Error(`Unknown array mode option '${this.options.arrays.mode}'`);
        }
      }
      getStringSchemaDefault(value) {
        const schema = { type: "string" };
        return schema;
      }
      getStringSchema(value) {
        if (this.options.strings.preProcessFnc) {
          return this.options.strings.preProcessFnc(value, this.getStringSchemaDefault);
        }
        return this.getStringSchemaDefault(value);
      }
      commmonPostProcessDefault(type, schema, value) {
        const shouldBeRequired = this.options.required && this.depth <= this.options.requiredDepth;
        if (shouldBeRequired) {
          return (0, lodash_merge_1.default)({}, schema, { required: true });
        }
        return schema;
      }
      objectPostProcessDefault(schema, obj) {
        if (this.options.objects.additionalProperties === false && Object.getOwnPropertyNames(obj).length > 0) {
          return (0, lodash_merge_1.default)({}, schema, { additionalProperties: false });
        }
        return schema;
      }
      /**
       * Gets JSON schema for provided value
       * @param value
       * @returns {object}
       */
      getSchema(value) {
        let type = helpers.getType(value);
        if (!type) {
          type = "null";
        }
        let schema;
        switch (type) {
          case "object":
            schema = this.getObjectSchema(value);
            break;
          case "array":
            schema = this.getArraySchema(value);
            break;
          case "string":
            schema = this.getStringSchema(value);
            break;
          default:
            schema = { type };
        }
        if (this.options.postProcessFnc) {
          schema = this.options.postProcessFnc(type, schema, value, this.commmonPostProcessDefault);
        } else {
          schema = this.commmonPostProcessDefault(type, schema, value);
        }
        if (type === "object") {
          if (this.options.objects.postProcessFnc) {
            schema = this.options.objects.postProcessFnc(schema, value, this.objectPostProcessDefault);
          } else {
            schema = this.objectPostProcessDefault(schema, value);
          }
        }
        return schema;
      }
    };
    function toJsonSchema2(value, options) {
      const tjs = new ToJsonSchema(options);
      return tjs.getSchema(value);
    }
    function convertRequiredToArray2(schema) {
      if (!schema || typeof schema !== "object") {
        return schema;
      }
      if (Array.isArray(schema)) {
        return schema.map((item) => convertRequiredToArray2(item));
      }
      const result = { ...schema };
      delete result.required;
      if (result.properties && typeof result.properties === "object") {
        const requiredFields = [];
        const newProperties = {};
        for (const [key, value] of Object.entries(result.properties)) {
          const fieldSchema = value;
          if (fieldSchema && typeof fieldSchema === "object" && fieldSchema.required === true) {
            requiredFields.push(key);
            const { required, ...rest } = fieldSchema;
            newProperties[key] = convertRequiredToArray2(rest);
          } else {
            newProperties[key] = convertRequiredToArray2(fieldSchema);
          }
        }
        result.properties = newProperties;
        if (requiredFields.length > 0) {
          result.required = requiredFields;
        }
      }
      if (result.items) {
        result.items = convertRequiredToArray2(result.items);
      }
      return result;
    }
    function generateDefaultFromSchema(schema) {
      if (!schema || typeof schema !== "object") {
        return null;
      }
      if (schema.const !== void 0) {
        return schema.const;
      }
      if (schema.enum && Array.isArray(schema.enum) && schema.enum.length > 0) {
        return schema.enum[0];
      }
      if (schema.default !== void 0) {
        return schema.default;
      }
      if (schema.oneOf && Array.isArray(schema.oneOf) && schema.oneOf.length > 0) {
        return generateDefaultFromSchema(schema.oneOf[0]);
      }
      if (schema.anyOf && Array.isArray(schema.anyOf) && schema.anyOf.length > 0) {
        return generateDefaultFromSchema(schema.anyOf[0]);
      }
      const schemaType = Array.isArray(schema.type) ? schema.type[0] : schema.type;
      switch (schemaType) {
        case "string":
          return "";
        case "number":
        case "integer":
          return 0;
        case "boolean":
          return false;
        case "null":
          return null;
        case "array":
          if (schema.items) {
            return [];
          }
          return [];
        case "object":
          const obj = {};
          if (schema.properties && typeof schema.properties === "object") {
            const requiredFields = schema.required || [];
            for (const [key, propSchema] of Object.entries(schema.properties)) {
              obj[key] = generateDefaultFromSchema(propSchema);
            }
          }
          return obj;
        default:
          if (schema.properties && typeof schema.properties === "object") {
            const obj2 = {};
            for (const [key, propSchema] of Object.entries(schema.properties)) {
              obj2[key] = generateDefaultFromSchema(propSchema);
            }
            return obj2;
          }
          return null;
      }
    }
    function parseJsonSafe(value) {
      if (typeof value !== "string")
        return value;
      try {
        return JSON.parse(value);
      } catch {
        return value;
      }
    }
    function normalizeToolSchemas2(tool) {
      const normalized = { ...tool };
      if (normalized.inputSchema) {
        normalized.inputSchema = parseJsonSafe(normalized.inputSchema);
      }
      if (normalized.outputSchema) {
        normalized.outputSchema = parseJsonSafe(normalized.outputSchema);
      }
      if (normalized.responseSchema) {
        normalized.responseSchema = parseJsonSafe(normalized.responseSchema);
      }
      return normalized;
    }
  }
});

// ../shared/dist/rbac-utils.js
var require_rbac_utils = __commonJS({
  "../shared/dist/rbac-utils.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.RESERVED_ROLE_NAMES = exports2.RESERVED_ROLE_IDS = exports2.PREDEFINED_ROLE_IDS = void 0;
    exports2.isCustomRulePermission = isCustomRulePermission;
    exports2.getSystemRules = getSystemRules;
    exports2.isPredefinedRole = isPredefinedRole;
    exports2.isReservedRoleId = isReservedRoleId;
    exports2.isReservedRoleName = isReservedRoleName;
    exports2.hasRole = hasRole;
    exports2.getRoleIds = getRoleIds;
    exports2.getBaseRole = getBaseRole;
    exports2.getBaseRoleId = getBaseRoleId;
    function isCustomRulePermission(p) {
      return typeof p === "object" && p !== null && "rules" in p;
    }
    function getSystemRules(systems2, systemId) {
      if (systems2 === "ALL" || !systems2[systemId])
        return [];
      const p = systems2[systemId];
      return isCustomRulePermission(p) ? p.rules : [];
    }
    exports2.PREDEFINED_ROLE_IDS = ["admin", "member", "enduser"];
    exports2.RESERVED_ROLE_IDS = ["admin", "member", "enduser", "__admin__"];
    exports2.RESERVED_ROLE_NAMES = ["member", "end user", "enduser", "admin"];
    function isPredefinedRole(roleId) {
      return exports2.PREDEFINED_ROLE_IDS.includes(roleId);
    }
    function isReservedRoleId(roleId) {
      return exports2.RESERVED_ROLE_IDS.includes(roleId);
    }
    function isReservedRoleName(name) {
      return exports2.RESERVED_ROLE_NAMES.includes(name.toLowerCase().trim());
    }
    function hasRole(roles, roleId) {
      return roles.some((r) => r.id === roleId);
    }
    function getRoleIds(roles) {
      return roles.map((r) => r.id);
    }
    function getBaseRole(roles) {
      const baseRoles = roles.filter((r) => r.isBaseRole);
      return baseRoles.length === 1 ? baseRoles[0] : null;
    }
    function getBaseRoleId(roles) {
      const base = getBaseRole(roles);
      return base ? base.id : null;
    }
  }
});

// ../shared/dist/types.js
var require_types = __commonJS({
  "../shared/dist/types.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.SystemAccessLevel = exports2.ConfirmationAction = exports2.FileStatus = exports2.DiscoveryRunStatus = exports2.RemoveScope = exports2.FilterAction = exports2.FilterTarget = exports2.RequestSource = exports2.RunStatus = exports2.CredentialMode = exports2.UpsertMode = exports2.LogLevel = exports2.PaginationType = exports2.DecompressionMethod = exports2.AuthType = exports2.FileType = exports2.CacheMode = exports2.HttpMethod = exports2.SupportedFileType = void 0;
    exports2.isRequestConfig = isRequestConfig;
    exports2.isTransformConfig = isTransformConfig;
    var SupportedFileType;
    (function(SupportedFileType2) {
      SupportedFileType2["JSON"] = "JSON";
      SupportedFileType2["CSV"] = "CSV";
      SupportedFileType2["XML"] = "XML";
      SupportedFileType2["HTML"] = "HTML";
      SupportedFileType2["YAML"] = "YAML";
      SupportedFileType2["EXCEL"] = "EXCEL";
      SupportedFileType2["PDF"] = "PDF";
      SupportedFileType2["DOCX"] = "DOCX";
      SupportedFileType2["ZIP"] = "ZIP";
      SupportedFileType2["GZIP"] = "GZIP";
      SupportedFileType2["RAW"] = "RAW";
      SupportedFileType2["AUTO"] = "AUTO";
    })(SupportedFileType || (exports2.SupportedFileType = SupportedFileType = {}));
    var HttpMethod;
    (function(HttpMethod2) {
      HttpMethod2["GET"] = "GET";
      HttpMethod2["POST"] = "POST";
      HttpMethod2["PUT"] = "PUT";
      HttpMethod2["DELETE"] = "DELETE";
      HttpMethod2["PATCH"] = "PATCH";
      HttpMethod2["HEAD"] = "HEAD";
      HttpMethod2["OPTIONS"] = "OPTIONS";
    })(HttpMethod || (exports2.HttpMethod = HttpMethod = {}));
    var CacheMode;
    (function(CacheMode2) {
      CacheMode2["ENABLED"] = "ENABLED";
      CacheMode2["READONLY"] = "READONLY";
      CacheMode2["WRITEONLY"] = "WRITEONLY";
      CacheMode2["DISABLED"] = "DISABLED";
    })(CacheMode || (exports2.CacheMode = CacheMode = {}));
    var FileType;
    (function(FileType2) {
      FileType2["CSV"] = "CSV";
      FileType2["JSON"] = "JSON";
      FileType2["XML"] = "XML";
      FileType2["YAML"] = "YAML";
      FileType2["EXCEL"] = "EXCEL";
      FileType2["HTML"] = "HTML";
      FileType2["PDF"] = "PDF";
      FileType2["DOCX"] = "DOCX";
      FileType2["ZIP"] = "ZIP";
      FileType2["RAW"] = "RAW";
      FileType2["AUTO"] = "AUTO";
    })(FileType || (exports2.FileType = FileType = {}));
    var AuthType;
    (function(AuthType2) {
      AuthType2["NONE"] = "NONE";
      AuthType2["OAUTH2"] = "OAUTH2";
      AuthType2["HEADER"] = "HEADER";
      AuthType2["QUERY_PARAM"] = "QUERY_PARAM";
    })(AuthType || (exports2.AuthType = AuthType = {}));
    var DecompressionMethod;
    (function(DecompressionMethod2) {
      DecompressionMethod2["GZIP"] = "GZIP";
      DecompressionMethod2["DEFLATE"] = "DEFLATE";
      DecompressionMethod2["NONE"] = "NONE";
      DecompressionMethod2["AUTO"] = "AUTO";
      DecompressionMethod2["ZIP"] = "ZIP";
    })(DecompressionMethod || (exports2.DecompressionMethod = DecompressionMethod = {}));
    var PaginationType;
    (function(PaginationType2) {
      PaginationType2["OFFSET_BASED"] = "OFFSET_BASED";
      PaginationType2["PAGE_BASED"] = "PAGE_BASED";
      PaginationType2["CURSOR_BASED"] = "CURSOR_BASED";
      PaginationType2["DISABLED"] = "DISABLED";
    })(PaginationType || (exports2.PaginationType = PaginationType = {}));
    var LogLevel;
    (function(LogLevel2) {
      LogLevel2["DEBUG"] = "DEBUG";
      LogLevel2["INFO"] = "INFO";
      LogLevel2["WARN"] = "WARN";
      LogLevel2["ERROR"] = "ERROR";
    })(LogLevel || (exports2.LogLevel = LogLevel = {}));
    var UpsertMode;
    (function(UpsertMode2) {
      UpsertMode2["CREATE"] = "CREATE";
      UpsertMode2["UPDATE"] = "UPDATE";
      UpsertMode2["UPSERT"] = "UPSERT";
    })(UpsertMode || (exports2.UpsertMode = UpsertMode = {}));
    var CredentialMode;
    (function(CredentialMode2) {
      CredentialMode2["MERGE"] = "MERGE";
      CredentialMode2["REPLACE"] = "REPLACE";
    })(CredentialMode || (exports2.CredentialMode = CredentialMode = {}));
    var RunStatus;
    (function(RunStatus2) {
      RunStatus2["RUNNING"] = "RUNNING";
      RunStatus2["SUCCESS"] = "SUCCESS";
      RunStatus2["FAILED"] = "FAILED";
      RunStatus2["ABORTED"] = "ABORTED";
    })(RunStatus || (exports2.RunStatus = RunStatus = {}));
    var RequestSource2;
    (function(RequestSource3) {
      RequestSource3["API"] = "api";
      RequestSource3["FRONTEND"] = "frontend";
      RequestSource3["SCHEDULER"] = "scheduler";
      RequestSource3["MCP"] = "mcp";
      RequestSource3["TOOL_CHAIN"] = "tool-chain";
      RequestSource3["WEBHOOK"] = "webhook";
      RequestSource3["CLI"] = "cli";
    })(RequestSource2 || (exports2.RequestSource = RequestSource2 = {}));
    var FilterTarget;
    (function(FilterTarget2) {
      FilterTarget2["KEYS"] = "KEYS";
      FilterTarget2["VALUES"] = "VALUES";
      FilterTarget2["BOTH"] = "BOTH";
    })(FilterTarget || (exports2.FilterTarget = FilterTarget = {}));
    var FilterAction;
    (function(FilterAction2) {
      FilterAction2["REMOVE"] = "REMOVE";
      FilterAction2["MASK"] = "MASK";
      FilterAction2["FAIL"] = "FAIL";
    })(FilterAction || (exports2.FilterAction = FilterAction = {}));
    var RemoveScope;
    (function(RemoveScope2) {
      RemoveScope2["FIELD"] = "FIELD";
      RemoveScope2["ITEM"] = "ITEM";
      RemoveScope2["ENTRY"] = "ENTRY";
    })(RemoveScope || (exports2.RemoveScope = RemoveScope = {}));
    function isRequestConfig(config) {
      return config?.type === "request" || !config?.type;
    }
    function isTransformConfig(config) {
      return config?.type === "transform";
    }
    var DiscoveryRunStatus;
    (function(DiscoveryRunStatus2) {
      DiscoveryRunStatus2["PENDING"] = "PENDING";
      DiscoveryRunStatus2["PROCESSING"] = "PROCESSING";
      DiscoveryRunStatus2["COMPLETED"] = "COMPLETED";
      DiscoveryRunStatus2["FAILED"] = "FAILED";
      DiscoveryRunStatus2["ABORTED"] = "ABORTED";
    })(DiscoveryRunStatus || (exports2.DiscoveryRunStatus = DiscoveryRunStatus = {}));
    var FileStatus;
    (function(FileStatus2) {
      FileStatus2["PENDING"] = "PENDING";
      FileStatus2["UPLOADING"] = "UPLOADING";
      FileStatus2["PROCESSING"] = "PROCESSING";
      FileStatus2["COMPLETED"] = "COMPLETED";
      FileStatus2["FAILED"] = "FAILED";
    })(FileStatus || (exports2.FileStatus = FileStatus = {}));
    var ConfirmationAction;
    (function(ConfirmationAction2) {
      ConfirmationAction2["CONFIRMED"] = "confirmed";
      ConfirmationAction2["DECLINED"] = "declined";
      ConfirmationAction2["PARTIAL"] = "partial";
      ConfirmationAction2["OAUTH_SUCCESS"] = "oauth_success";
      ConfirmationAction2["OAUTH_FAILURE"] = "oauth_failure";
    })(ConfirmationAction || (exports2.ConfirmationAction = ConfirmationAction = {}));
    var SystemAccessLevel;
    (function(SystemAccessLevel2) {
      SystemAccessLevel2["NONE"] = "none";
      SystemAccessLevel2["READ_ONLY"] = "read-only";
      SystemAccessLevel2["READ_WRITE"] = "read-write";
    })(SystemAccessLevel || (exports2.SystemAccessLevel = SystemAccessLevel = {}));
  }
});

// ../shared/dist/seed-config.js
var require_seed_config = __commonJS({
  "../shared/dist/seed-config.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.SEED_CONFIG = void 0;
    var types_js_1 = require_types();
    exports2.SEED_CONFIG = {
      systems: [
        {
          id: "stock-market",
          name: "Stock Market Data",
          url: "https://www.alphavantage.co",
          templateName: "alphavantage",
          icon: "lucide:chart-line",
          credentials: {
            apikey: "J8BV3OUAXYOSZIX1"
          },
          specificInstructions: "Alpha Vantage provides real-time and historical stock market data. Use the 'function' parameter to specify the API endpoint (e.g., TIME_SERIES_DAILY, GLOBAL_QUOTE). Always include the 'apikey' parameter in your requests.",
          documentationUrl: "https://www.alphavantage.co/documentation/",
          documentation: `# Stock Market Data API (Alpha Vantage)

Alpha Vantage provides free APIs for real-time and historical financial market data, plus 50+ technical indicators.

## Base URL
\`https://www.alphavantage.co/query\`

## Authentication
Include \`apikey\` as a query parameter in all requests.

## Core Stock APIs

### GLOBAL_QUOTE - Get Current Price
Returns the latest price and volume for a stock.
\`\`\`
GET /query?function=GLOBAL_QUOTE&symbol=IBM&apikey={apikey}
\`\`\`
Response fields: symbol, open, high, low, price, volume, latest trading day, previous close, change, change percent.

### TIME_SERIES_INTRADAY - Intraday Prices
Returns intraday time series (1min, 5min, 15min, 30min, 60min intervals).
\`\`\`
GET /query?function=TIME_SERIES_INTRADAY&symbol=IBM&interval=5min&apikey={apikey}
\`\`\`

### TIME_SERIES_DAILY - Daily Prices
Returns daily open, high, low, close, and volume for up to 20+ years.
\`\`\`
GET /query?function=TIME_SERIES_DAILY&symbol=IBM&apikey={apikey}
\`\`\`

### TIME_SERIES_WEEKLY / TIME_SERIES_MONTHLY
Weekly and monthly aggregated time series data.

### SYMBOL_SEARCH - Find Ticker Symbols
Search for stocks by name or symbol.
\`\`\`
GET /query?function=SYMBOL_SEARCH&keywords=microsoft&apikey={apikey}
\`\`\`

## Fundamental Data

### OVERVIEW - Company Information
Returns company description, sector, industry, market cap, PE ratio, dividend yield, 52-week high/low, and more.
\`\`\`
GET /query?function=OVERVIEW&symbol=IBM&apikey={apikey}
\`\`\`

### INCOME_STATEMENT / BALANCE_SHEET / CASH_FLOW
Annual and quarterly financial statements.

### EARNINGS
Historical and upcoming earnings data with EPS estimates.

## Forex & Crypto

### CURRENCY_EXCHANGE_RATE
Real-time exchange rate between two currencies.
\`\`\`
GET /query?function=CURRENCY_EXCHANGE_RATE&from_currency=USD&to_currency=EUR&apikey={apikey}
\`\`\`

### FX_DAILY / FX_WEEKLY / FX_MONTHLY
Historical forex data.

### CRYPTO_EXCHANGE_RATE / DIGITAL_CURRENCY_DAILY
Cryptocurrency prices and historical data.

## Technical Indicators
50+ indicators including: SMA, EMA, RSI, MACD, STOCH, ADX, BBANDS, and more.
\`\`\`
GET /query?function=RSI&symbol=IBM&interval=daily&time_period=14&series_type=close&apikey={apikey}
\`\`\`

## Economic Indicators
- REAL_GDP, REAL_GDP_PER_CAPITA
- TREASURY_YIELD
- FEDERAL_FUNDS_RATE
- CPI, INFLATION
- UNEMPLOYMENT, NONFARM_PAYROLL

## Commodities
Real-time and historical prices for: Gold, Silver, Crude Oil (WTI/Brent), Natural Gas, Copper, Wheat, Corn, Coffee, and more.

## Rate Limits
- Free tier: 25 requests/day, 5 requests/minute
- Premium tiers available for higher limits

## Response Format
All responses are JSON. Time series data is keyed by date/time strings.`
        },
        {
          id: "superglue-email",
          name: "superglue Email Service",
          url: "https://api.superglue.cloud/v1/notify/email",
          templateName: "superglueEmail",
          icon: "lucide:mail",
          credentials: {},
          specificInstructions: "Send emails to your own email address. Use POST https://api.superglue.cloud/v1/notify/email with your API key in the Authorization header. Request body: { subject: string, body: string }. The email will be sent to the email address you signed up with.",
          documentationUrl: "https://docs.superglue.cloud/guides/email-service",
          documentation: `# superglue Email Service

A simple email notification service that sends emails to your registered superglue account email address.

## Endpoint
\`POST https://api.superglue.cloud/v1/notify/email\`

## Authentication
Include your superglue API key in the Authorization header:
\`\`\`
Authorization: Bearer {your_api_key}
\`\`\`

## Request Body
\`\`\`json
{
  "subject": "Your email subject",
  "body": "Your email body (supports HTML)"
}
\`\`\`

### Fields
| Field | Type | Required | Description |
|-------|------|----------|-------------|
| subject | string | Yes | Email subject line |
| body | string | Yes | Email body content. Supports plain text or HTML |

## Response
### Success (200)
\`\`\`json
{
  "success": true,
  "message": "Email sent successfully"
}
\`\`\`

### Error (4xx/5xx)
\`\`\`json
{
  "success": false,
  "error": "Error description"
}
\`\`\`

## Example Request
\`\`\`bash
curl -X POST https://api.superglue.cloud/v1/notify/email \\
  -H "Authorization: Bearer your_api_key" \\
  -H "Content-Type: application/json" \\
  -d '{
    "subject": "Hello from superglue!",
    "body": "<h1>Welcome!</h1><p>This is a test email.</p>"
  }'
\`\`\`

## Use Cases
- Send alerts when workflows complete
- Notify yourself of important data changes
- Create automated reports delivered to your inbox
- Build notification systems for your integrations

## Notes
- Emails are sent FROM superglue's notification system
- Emails are sent TO the email address associated with your superglue account
- HTML content is supported for rich formatting
- Rate limits apply based on your superglue plan`
        },
        {
          id: "lego-database",
          name: "Lego Sets Database",
          url: "postgresql://test_user:LegoTest2026!xK9m@files.superglue.ai:5432/lego",
          templateName: "postgres",
          credentials: {
            user: "test_user",
            password: "LegoTest2026!xK9m",
            hostname: "files.superglue.ai",
            port: "5432",
            database_name: "lego"
          },
          specificInstructions: "PostgreSQL database containing all Lego sets (READ-ONLY access). Use parameterized queries with $1, $2, etc. placeholders. Example: { query: 'SELECT * FROM sets WHERE year > $1', params: [2020] }. Explore available tables first with: { query: 'SELECT table_name FROM information_schema.tables WHERE table_schema = $1', params: ['public'] }",
          documentationUrl: "https://www.postgresql.org/docs/",
          documentation: `# Lego Sets Database

A comprehensive PostgreSQL database containing the complete Lego catalog from 1949 to 2026. READ-ONLY access.

## Database Stats
- **26,097** Lego sets
- **60,820** unique parts
- **16,535** minifigures
- **488** themes
- **275** colors
- Data spans from **1949 to 2026**

## Tables

### sets
All Lego sets ever released.
| Column | Type | Description |
|--------|------|-------------|
| set_num | varchar(50) | Primary key, e.g., "75192-1" |
| name | text | Set name, e.g., "Millennium Falcon" |
| year | integer | Release year |
| theme_id | integer | FK to themes table |
| num_parts | integer | Number of parts in set |
| img_url | text | URL to set image |

### themes
Lego product themes (Star Wars, City, Technic, etc.)
| Column | Type | Description |
|--------|------|-------------|
| id | integer | Primary key |
| name | text | Theme name |
| parent_id | integer | Parent theme (for sub-themes) |

Top-level themes include: Star Wars, City, Technic, Creator, Ninjago, Harry Potter, Marvel, Architecture, Ideas, and 400+ more.

### parts
Individual Lego pieces.
| Column | Type | Description |
|--------|------|-------------|
| part_num | varchar(50) | Primary key, e.g., "3001" |
| name | text | Part name, e.g., "Brick 2 x 4" |
| part_cat_id | integer | FK to part_categories |
| part_material | text | Material type |

### colors
All Lego colors.
| Column | Type | Description |
|--------|------|-------------|
| id | integer | Primary key |
| name | text | Color name, e.g., "Red" |
| rgb | varchar(6) | Hex color code |
| is_trans | boolean | Is transparent? |
| num_parts | integer | Parts available in this color |
| num_sets | integer | Sets using this color |

### minifigs
Lego minifigures.
| Column | Type | Description |
|--------|------|-------------|
| fig_num | varchar(50) | Primary key |
| name | text | Minifig name |
| num_parts | integer | Number of parts |
| img_url | text | URL to minifig image |

### inventories
Links sets to their contents.
| Column | Type | Description |
|--------|------|-------------|
| id | integer | Primary key |
| version | integer | Inventory version |
| set_num | varchar(50) | FK to sets |

### inventory_parts
Parts contained in each inventory.
| Column | Type | Description |
|--------|------|-------------|
| inventory_id | integer | FK to inventories |
| part_num | varchar(50) | FK to parts |
| color_id | integer | FK to colors |
| quantity | integer | Number of this part |
| is_spare | boolean | Is a spare part? |
| img_url | text | Part image URL |

### inventory_minifigs
Minifigs contained in each inventory.

### inventory_sets
Sub-sets contained in each inventory.

### part_categories
Categories for parts (Bricks, Plates, Tiles, etc.)

### part_relationships
Relationships between parts (molds, prints, alternates).

## Example Queries

### Find sets by theme
\`\`\`sql
SELECT s.set_num, s.name, s.year, s.num_parts
FROM sets s
JOIN themes t ON s.theme_id = t.id
WHERE t.name = 'Star Wars'
ORDER BY s.year DESC
LIMIT 10;
\`\`\`

### Find largest sets
\`\`\`sql
SELECT set_num, name, year, num_parts
FROM sets
ORDER BY num_parts DESC
LIMIT 10;
\`\`\`

### Search sets by name
\`\`\`sql
SELECT set_num, name, year, num_parts
FROM sets
WHERE name ILIKE '%millennium falcon%';
\`\`\`

### Get parts in a set
\`\`\`sql
SELECT p.part_num, p.name, c.name as color, ip.quantity
FROM inventory_parts ip
JOIN inventories i ON ip.inventory_id = i.id
JOIN parts p ON ip.part_num = p.part_num
JOIN colors c ON ip.color_id = c.id
WHERE i.set_num = '75192-1';
\`\`\`

### Count sets by year
\`\`\`sql
SELECT year, COUNT(*) as num_sets
FROM sets
GROUP BY year
ORDER BY year DESC;
\`\`\`

## Query Format
Use parameterized queries with $1, $2, etc. placeholders:
\`\`\`json
{
  "query": "SELECT * FROM sets WHERE year > $1 AND theme_id = $2",
  "params": [2020, 158]
}
\`\`\`

## Notes
- This is a READ-ONLY database
- All queries should use parameterized placeholders
- Data sourced from Rebrickable.com`
        }
      ],
      tools: [
        {
          id: "stock-email-alert",
          steps: [
            {
              id: "fetchStock",
              config: {
                url: "https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=<<(sourceData) => sourceData.symbol || 'AAPL'>>&apikey=<<stock-market_apikey>>",
                method: types_js_1.HttpMethod.GET,
                systemId: "stock-market"
              },
              instruction: "Fetch the current stock quote for the given symbol"
            },
            {
              id: "sendEmail",
              instruction: "Send an email with the stock information",
              config: {
                url: "https://api.superglue.cloud/v1/notify/email",
                method: types_js_1.HttpMethod.POST,
                headers: {
                  "Content-Type": "application/json",
                  Authorization: "Bearer <<superglue-email_apiKey>>"
                },
                body: `<<(sourceData) => {
              const symbol = sourceData.symbol || 'AAPL';
              const quote = sourceData.fetchStock?.data?.["Global Quote"] || {};
              const price = quote["05. price"] || "N/A";
              const change = quote["09. change"] || "N/A";
              const changePercent = quote["10. change percent"] || "N/A";
              const volume = parseInt(quote["06. volume"] || "0").toLocaleString();
              const tradingDay = quote["07. latest trading day"] || "N/A";
              const isPositive = parseFloat(change) >= 0;
              const changeColor = isPositive ? "#22c55e" : "#ef4444";
              const changeArrow = isPositive ? "\u2191" : "\u2193";
              
              return JSON.stringify({
                subject: "\u{1F4C8} Stock Alert: " + symbol + " - $" + parseFloat(price).toFixed(2),
                body: \`
                  <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
                    <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); border-radius: 12px; padding: 24px; margin-bottom: 24px;">
                      <h1 style="color: white; margin: 0; font-size: 24px;">\u{1F389} Welcome to superglue!</h1>
                      <p style="color: rgba(255,255,255,0.9); margin: 8px 0 0 0; font-size: 14px;">Your first automated workflow is working</p>
                    </div>
                    
                    <div style="background: #f8fafc; border-radius: 12px; padding: 24px; border: 1px solid #e2e8f0;">
                      <div style="display: flex; align-items: center; margin-bottom: 16px;">
                        <span style="font-size: 32px; font-weight: bold; color: #1e293b;">\${symbol}</span>
                        <span style="margin-left: 12px; padding: 4px 12px; background: \${changeColor}; color: white; border-radius: 20px; font-size: 14px; font-weight: 500;">\${changeArrow} \${changePercent}</span>
                      </div>
                      
                      <div style="font-size: 48px; font-weight: bold; color: #0f172a; margin-bottom: 24px;">$\${parseFloat(price).toFixed(2)}</div>
                      
                      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 16px;">
                        <div style="background: white; padding: 16px; border-radius: 8px; border: 1px solid #e2e8f0;">
                          <div style="color: #64748b; font-size: 12px; text-transform: uppercase; margin-bottom: 4px;">Change</div>
                          <div style="color: \${changeColor}; font-size: 18px; font-weight: 600;">\${isPositive ? "+" : ""}\${change}</div>
                        </div>
                        <div style="background: white; padding: 16px; border-radius: 8px; border: 1px solid #e2e8f0;">
                          <div style="color: #64748b; font-size: 12px; text-transform: uppercase; margin-bottom: 4px;">Volume</div>
                          <div style="color: #1e293b; font-size: 18px; font-weight: 600;">\${volume}</div>
                        </div>
                      </div>
                      
                      <div style="margin-top: 16px; padding-top: 16px; border-top: 1px solid #e2e8f0; color: #64748b; font-size: 12px;">
                        Latest trading day: \${tradingDay}
                      </div>
                    </div>
                    
                    <div style="margin-top: 24px; padding: 20px; background: #fefce8; border-radius: 12px; border: 1px solid #fef08a;">
                      <p style="margin: 0; color: #854d0e; font-size: 14px;">
                        <strong>\u{1F4A1} This is a demo tool!</strong> You just ran your first superglue workflow. 
                        Edit this tool or create your own to automate any API integration.
                      </p>
                    </div>
                    
                    <div style="margin-top: 24px; text-align: center; color: #94a3b8; font-size: 12px;">
                      Powered by <a href="https://superglue.cloud" style="color: #667eea; text-decoration: none;">superglue</a> \u2014 The AI-native integration platform
                    </div>
                  </div>
                \`
              });
            }>>`,
                systemId: "superglue-email"
              }
            }
          ],
          inputSchema: {
            type: "object",
            properties: {
              symbol: {
                type: "string",
                description: "Stock ticker symbol (e.g., AAPL, GOOGL, MSFT)",
                default: "AAPL"
              }
            }
          },
          instruction: "Fetches the current stock quote from Alpha Vantage and sends an email with the stock information to your registered email address."
        }
      ]
    };
  }
});

// ../shared/dist/templates.js
var require_templates = __commonJS({
  "../shared/dist/templates.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.systemOptions = exports2.systems = void 0;
    exports2.findTemplateForSystem = findTemplateForSystem4;
    exports2.uniqueKeywords = uniqueKeywords;
    exports2.enrichWithTemplate = enrichWithTemplate;
    exports2.getOAuthConfig = getOAuthConfig;
    exports2.getOAuthTokenExchangeConfig = getOAuthTokenExchangeConfig;
    exports2.getOAuthTokenUrl = getOAuthTokenUrl;
    exports2.systems = {
      // Important: keys and names are the same and do not change without updating the integration and integration_details table with the template entries
      postgres: {
        name: "postgres",
        apiUrl: "postgres://<<username>>:<<password>>@<<host>>:<<port>>/<<database>>",
        regex: "^.*(postgres|postgresql).*$",
        icon: "postgresql",
        docsUrl: "",
        preferredAuthType: "apikey",
        keywords: ["database", "sql", "postgres", "postgresql", "api key", "tables"]
      },
      redis_direct: {
        name: "redis_direct",
        apiUrl: "redis://<<username>>:<<password>>@<<host>>:<<port>>/<<database>>",
        regex: "^.*(rediss?://).*$",
        icon: "redis",
        docsUrl: "https://redis.io/docs/latest/commands/",
        preferredAuthType: "apikey",
        keywords: ["database", "cache", "redis", "key-value", "nosql", "api key"]
      },
      stripe: {
        name: "stripe",
        apiUrl: "https://api.stripe.com",
        regex: "^.*stripe.*$",
        icon: "stripe",
        docsUrl: "https://docs.stripe.com/api",
        openApiUrl: "https://raw.githubusercontent.com/stripe/openapi/master/openapi/spec3.json",
        preferredAuthType: "apikey",
        keywords: [
          "customers",
          "charges",
          "payment_intents",
          "products",
          "prices",
          "subscriptions",
          "invoices",
          "balance_transactions",
          "refunds",
          "checkout_sessions",
          "line_items",
          "payment_methods",
          "issuers",
          "plans",
          "setup_intents",
          "payouts",
          "transfers",
          "balance",
          "users",
          "emails"
        ]
      },
      shopify: {
        name: "shopify",
        apiUrl: "https://admin.shopify.com",
        regex: "^.*(shopify|myshopify).*$",
        icon: "shopify",
        docsUrl: "https://shopify.dev/docs/api",
        preferredAuthType: "apikey",
        oauth: {
          authUrl: "https://{shop}.myshopify.com/admin/oauth/authorize",
          tokenUrl: "https://{shop}.myshopify.com/admin/oauth/access_token",
          scopes: "read_products write_products read_orders write_orders read_customers write_customers read_inventory write_inventory read_fulfillments write_fulfillments read_shipping write_shipping"
        },
        keywords: [
          "products",
          "variants",
          "collections",
          "customers",
          "orders",
          "fulfillments",
          "inventory_items",
          "inventory_levels",
          "metafields",
          "price_rules",
          "discount_codes",
          "shipping_zones",
          "locations",
          "gift_cards",
          "product_images"
        ]
      },
      hubspot: {
        name: "hubspot",
        apiUrl: "https://api.hubapi.com/crm/v3",
        regex: "^.*(hubapi|hubspot).*$",
        icon: "hubspot",
        docsUrl: "https://developers.hubspot.com/docs/api/overview",
        openApiUrl: "https://api.hubspot.com/public/api/spec/v1/specs",
        preferredAuthType: "apikey",
        oauth: {
          authUrl: "https://app.hubspot.com/oauth/authorize",
          tokenUrl: "https://api.hubapi.com/oauth/v1/token",
          scopes: "crm.objects.contacts.read crm.objects.contacts.write crm.objects.companies.read crm.objects.companies.write crm.objects.deals.read crm.objects.deals.write crm.objects.owners.read forms forms-uploaded-files files sales-email-read crm.objects.quotes.read crm.objects.quotes.write"
        },
        keywords: [
          "contacts",
          "companies",
          "deals",
          "tickets",
          "line_items",
          "products",
          "associations",
          "memberships"
        ]
      },
      attio: {
        name: "attio",
        apiUrl: "https://api.attio.com/v2/",
        regex: "^.*attio.*$",
        icon: "attio",
        docsUrl: "https://docs.attio.com/rest-api/overview",
        openApiUrl: "https://api.attio.com/openapi/api",
        preferredAuthType: "apikey",
        keywords: [
          "people",
          "objects",
          "records",
          "lists",
          "entries",
          "workspace_members",
          "notes",
          "tasks",
          "threads",
          "comments",
          "sorts",
          "api_slug",
          "attribute_type",
          "record_id",
          "workspace_id",
          "object_id"
        ]
      },
      twilio: {
        name: "twilio",
        apiUrl: "https://api.twilio.com",
        regex: "^.*twilio.*$",
        icon: "twilio",
        docsUrl: "https://www.twilio.com/docs/api",
        openApiUrl: "https://raw.githubusercontent.com/twilio/twilio-oai/refs/heads/main/spec/json/twilio_api_v2010.json",
        preferredAuthType: "apikey",
        keywords: [
          "Messages",
          "Media",
          "MessageFeedback",
          "Calls",
          "Accounts",
          "APIKeys",
          "Addresses",
          "UsageRecords",
          "CallFeedback",
          "CredentialsList",
          "TaskRouter_Workspaces",
          "TaskRouter_Tasks",
          "TaskRouter_Workers",
          "TaskRouter_Activities",
          "MessagingServices"
        ]
      },
      sendgrid: {
        name: "sendgrid",
        apiUrl: "https://api.sendgrid.com",
        regex: "^.*sendgrid.*$",
        icon: "sendgrid",
        docsUrl: "https://www.twilio.com/docs/sendgrid/api-reference",
        openApiUrl: "https://raw.githubusercontent.com/sendgrid/sendgrid-oai/main/oai.json",
        preferredAuthType: "apikey",
        keywords: [
          "mail_send",
          "templates",
          "campaigns",
          "marketing_contacts",
          "marketing_lists",
          "suppression_groups",
          "global_suppressions",
          "asm_suppressions",
          "subusers",
          "stats",
          "categories",
          "whitelabel",
          "ips",
          "access_settings"
        ]
      },
      github: {
        name: "github",
        apiUrl: "https://api.github.com",
        regex: "^.*github.*$",
        icon: "github",
        docsUrl: "https://docs.github.com/en/rest",
        openApiUrl: "https://raw.githubusercontent.com/github/rest-api-description/main/descriptions/api.github.com/api.github.com.json",
        preferredAuthType: "apikey",
        oauth: {
          authUrl: "https://github.com/login/oauth/authorize",
          tokenUrl: "https://github.com/login/oauth/access_token",
          scopes: "repo user admin:org workflow gist notifications delete_repo write:packages read:packages"
        },
        keywords: [
          "repositories",
          "issues",
          "pull_requests",
          "commits",
          "branches",
          "tags",
          "releases",
          "deployments",
          "check_runs",
          "actions_artifacts",
          "organizations",
          "packages",
          "collaborators",
          "gists",
          "milestones"
        ]
      },
      gitlab: {
        name: "gitlab",
        apiUrl: "https://api.gitlab.com",
        regex: "^.*gitlab.*$",
        icon: "gitlab",
        docsUrl: "https://docs.gitlab.com/api/rest/",
        openApiUrl: "https://gitlab.com/gitlab-org/gitlab/-/raw/master/doc/api/openapi/openapi.yaml",
        preferredAuthType: "apikey",
        oauth: {
          authUrl: "https://gitlab.com/oauth/authorize",
          tokenUrl: "https://gitlab.com/oauth/token",
          scopes: "api"
        },
        keywords: [
          "projects",
          "repositories",
          "issues",
          "pull_requests",
          "commits",
          "branches",
          "tags",
          "releases",
          "deployments",
          "check_runs",
          "actions_artifacts",
          "organizations",
          "packages",
          "collaborators",
          "gists",
          "milestones"
        ]
      },
      bitbucket: {
        name: "bitbucket",
        apiUrl: "https://api.bitbucket.org",
        regex: "^.*bitbucket.*$",
        icon: "bitbucket",
        docsUrl: "https://developer.atlassian.com/cloud/bitbucket/rest",
        openApiUrl: "https://api.bitbucket.org/swagger.json",
        preferredAuthType: "oauth",
        oauth: {
          authUrl: "https://bitbucket.org/site/oauth2/authorize",
          tokenUrl: "https://bitbucket.org/site/oauth2/access_token",
          scopes: "repository:admin account:write team:write webhook"
        },
        keywords: [
          "repositories",
          "projects",
          "commits",
          "branches",
          "pullrequests",
          "downloads",
          "issues",
          "pipelines",
          "branchRestrictions",
          "components",
          "milestones",
          "refs",
          "hooks",
          "forks",
          "user"
        ]
      },
      slack: {
        name: "slack",
        apiUrl: "https://slack.com/api",
        regex: "^.*slack.*$",
        icon: "slack",
        docsUrl: "https://docs.slack.dev/apis/web-api/",
        openApiUrl: "https://raw.githubusercontent.com/slackapi/slack-api-specs/master/web-api/slack_web_openapi_v2.json",
        preferredAuthType: "oauth",
        oauth: {
          grant_type: "authorization_code",
          authUrl: "https://slack.com/oauth/v2/authorize",
          tokenUrl: "https://slack.com/api/oauth.v2.access",
          scopes: "channels:read channels:history chat:write chat:write.public users:read users:read.email files:read files:write groups:read im:read im:write mpim:read",
          client_id: "7626585708593.9087382641312"
        },
        keywords: [
          "channel",
          "conversation",
          "user",
          "file",
          "event",
          "message",
          "workflow_step",
          "workflow_published",
          "workflow_step_execute",
          "usergroup",
          "im",
          "mpim",
          "group",
          "check_run",
          "apps_permissions_resource"
        ]
      },
      airtable: {
        name: "airtable",
        apiUrl: "https://api.airtable.com",
        regex: "^.*airtable.*$",
        icon: "airtable",
        docsUrl: "https://airtable.com/developers/web/api",
        preferredAuthType: "oauth",
        oauth: {
          authUrl: "https://airtable.com/oauth2/v1/authorize",
          tokenUrl: "https://airtable.com/oauth2/v1/token",
          scopes: "data.recordComments:read data.recordComments:write data.records:read data.records:write schema.bases:read schema.bases:write user.email:read enterprise.groups:read workspacesAndBases.shares:manage workspacesAndBases:read workspacesAndBases:write data.records:manage enterprise.account:read enterprise.account:write enterprise.auditLogs:read enterprise.changeEvents:read enterprise.exports:manage enterprise.groups:manage enterprise.scim.usersAndGroups:manage enterprise.user:read enterprise.user:write workspacesAndBases:manage webhook:manage",
          client_id: "02601365-de97-4191-b12d-e03c8540b03d",
          usePKCE: true,
          tokenAuthMethod: "basic_auth",
          tokenContentType: "form"
        },
        keywords: [
          "bases",
          "tables",
          "records",
          "fields",
          "views",
          "formulas",
          "attachments",
          "comments",
          "collaborators",
          "metadata",
          "schemas",
          "api key",
          "key"
        ]
      },
      gmail: {
        name: "gmail",
        apiUrl: "https://gmail.googleapis.com/gmail/v1",
        regex: "^.*(gmail\\.googleapis|developers\\.google\\.com/gmail|mail\\.google).*$",
        icon: "gmail",
        docsUrl: "https://developers.google.com/gmail/api/reference/rest",
        openApiUrl: "https://www.googleapis.com/discovery/v1/apis/gmail/v1/rest",
        preferredAuthType: "oauth",
        oauth: {
          authUrl: "https://accounts.google.com/o/oauth2/v2/auth",
          tokenUrl: "https://oauth2.googleapis.com/token",
          scopes: "https://mail.google.com/"
        },
        keywords: [
          "messages",
          "threads",
          "labels",
          "drafts",
          "send",
          "attachments",
          "history",
          "filters",
          "settings",
          "forwarding",
          "inbox",
          "profile",
          "oauth"
        ]
      },
      googleDrive: {
        name: "googleDrive",
        apiUrl: "https://www.googleapis.com/drive/v3",
        regex: "^.*(googleapis\\.com/drive|developers\\.google\\.com/drive|drive\\.google).*$",
        icon: "googledrive",
        docsUrl: "https://developers.google.com/drive/api/v3/reference",
        openApiUrl: "https://www.googleapis.com/discovery/v1/apis/drive/v3/rest",
        preferredAuthType: "oauth",
        oauth: {
          authUrl: "https://accounts.google.com/o/oauth2/v2/auth",
          tokenUrl: "https://oauth2.googleapis.com/token",
          scopes: "https://www.googleapis.com/auth/drive"
        },
        keywords: [
          "files",
          "folders",
          "permissions",
          "sharing",
          "comments",
          "revisions",
          "changes",
          "uploads",
          "downloads",
          "metadata",
          "teamdrives",
          "export",
          "copy",
          "move",
          "oauth"
        ]
      },
      googleCalendar: {
        name: "googleCalendar",
        apiUrl: "https://www.googleapis.com/calendar/v3",
        regex: "^.*(googleapis\\.com/calendar|developers\\.google\\.com/calendar|calendar\\.google).*$",
        icon: "googlecalendar",
        docsUrl: "https://developers.google.com/calendar/api/v3/reference",
        openApiUrl: "https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest",
        preferredAuthType: "oauth",
        oauth: {
          authUrl: "https://accounts.google.com/o/oauth2/v2/auth",
          tokenUrl: "https://oauth2.googleapis.com/token",
          scopes: "https://www.googleapis.com/auth/calendar"
        },
        keywords: [
          "events",
          "calendars",
          "attendees",
          "reminders",
          "recurring",
          "availability",
          "free busy",
          "settings",
          "acl",
          "colors",
          "notifications",
          "timezone",
          "quick add",
          "oauth"
        ]
      },
      googleSheets: {
        name: "googleSheets",
        apiUrl: "https://sheets.googleapis.com/v4",
        regex: "^.*(sheets\\.googleapis|developers\\.google\\.com/sheets|sheets\\.google).*$",
        icon: "googlesheets",
        docsUrl: "https://developers.google.com/sheets/api/reference/rest",
        openApiUrl: "https://www.googleapis.com/discovery/v1/apis/sheets/v4/rest",
        preferredAuthType: "oauth",
        oauth: {
          authUrl: "https://accounts.google.com/o/oauth2/v2/auth",
          tokenUrl: "https://oauth2.googleapis.com/token",
          scopes: "https://www.googleapis.com/auth/spreadsheets https://www.googleapis.com/auth/drive"
        },
        keywords: [
          "spreadsheets",
          "sheets",
          "cells",
          "ranges",
          "values",
          "formulas",
          "formatting",
          "charts",
          "pivot tables",
          "named ranges",
          "protected ranges",
          "batch update",
          "append",
          "oauth"
        ]
      },
      googleAnalytics: {
        name: "googleAnalytics",
        apiUrl: "https://analytics.google.com",
        regex: "^.*(analytics|analyticsdata).*$",
        icon: "googleAnalytics",
        docsUrl: "https://developers.google.com/analytics/devguides/reporting/data/v1",
        openApiUrl: "https://analyticsdata.googleapis.com/$discovery/rest?version=v1beta",
        preferredAuthType: "oauth",
        oauth: {
          authUrl: "https://accounts.google.com/o/oauth2/v2/auth",
          tokenUrl: "https://oauth2.googleapis.com/token",
          scopes: "https://www.googleapis.com/auth/analytics.edit"
        },
        keywords: [
          "properties",
          "dimensions",
          "metrics",
          "reports",
          "audiences",
          "conversions",
          "events",
          "goals",
          "segments",
          "real time",
          "user activity",
          "attribution",
          "funnels",
          "cohorts",
          "oauth"
        ]
      },
      youtube: {
        name: "youtube",
        apiUrl: "https://youtube.googleapis.com",
        regex: "^.*youtube.*$",
        icon: "youtube",
        docsUrl: "https://developers.google.com/youtube/v3/docs",
        openApiUrl: "https://www.googleapis.com/discovery/v1/apis/youtube/v3/rest",
        preferredAuthType: "oauth",
        oauth: {
          authUrl: "https://accounts.google.com/o/oauth2/v2/auth",
          tokenUrl: "https://oauth2.googleapis.com/token",
          scopes: "https://www.googleapis.com/auth/youtube"
        },
        keywords: [
          "videos",
          "channels",
          "playlists",
          "comments",
          "captions",
          "live streams",
          "analytics",
          "thumbnails",
          "subscriptions",
          "activities",
          "ratings",
          "uploads",
          "members",
          "oauth"
        ]
      },
      AWS: {
        name: "AWS",
        apiUrl: "https://amazonaws.com",
        regex: "^.*(aws|amazonaws).*$",
        icon: "amazonwebservices",
        docsUrl: "https://docs.aws.amazon.com/index.html",
        preferredAuthType: "apikey",
        keywords: [
          "ec2",
          "s3",
          "lambda",
          "rds",
          "dynamodb",
          "sqs",
          "sns",
          "cloudformation",
          "iam",
          "cloudwatch",
          "vpc",
          "instances",
          "buckets",
          "functions",
          "api key"
        ]
      },
      googleCloud: {
        name: "googleCloud",
        apiUrl: "https://cloud.google.com",
        regex: "^.*(cloud\\.google|gcp|googlecloud).*$",
        icon: "googleCloud",
        docsUrl: "https://cloud.google.com/apis/docs/overview",
        preferredAuthType: "oauth",
        oauth: {
          authUrl: "https://accounts.google.com/o/oauth2/v2/auth",
          tokenUrl: "https://oauth2.googleapis.com/token",
          scopes: "https://www.googleapis.com/auth/cloud-platform"
        },
        keywords: [
          "compute",
          "storage",
          "pubsub",
          "cloud run",
          "kubernetes",
          "iam",
          "vpc",
          "cloud sql",
          "bigtable",
          "dataflow",
          "logging",
          "monitoring",
          "oauth"
        ]
      },
      bigquery: {
        name: "bigquery",
        apiUrl: "https://bigquery.googleapis.com/bigquery/v2",
        regex: "^.*(bigquery|bq\\.googleapis).*$",
        icon: "googleCloud",
        docsUrl: "https://cloud.google.com/bigquery/docs/reference/rest",
        openApiUrl: "https://bigquery.googleapis.com/$discovery/rest?version=v2",
        preferredAuthType: "oauth",
        oauth: {
          authUrl: "https://accounts.google.com/o/oauth2/v2/auth",
          tokenUrl: "https://oauth2.googleapis.com/token",
          scopes: "https://www.googleapis.com/auth/bigquery"
        },
        systemSpecificInstructions: `BigQuery REST API - Authentication Options:

OPTION 1: OAuth App (Recommended)
If the user has or creates an OAuth app in their Google Cloud project:
1. Create OAuth credentials in Google Cloud Console \u2192 APIs & Services \u2192 Credentials \u2192 Create Credentials \u2192 OAuth client ID
2. Set application type to "Web application" and add the superglue callback URL as authorized redirect URI
3. Use create_system with credentials: { client_id: "..." } and sensitiveCredentials: { client_secret: true }
4. After system creation, use authenticate_oauth - user completes Google sign-in in popup
5. Superglue auto-refreshes tokens - no manual token management needed

OPTION 2: Service Account JWT (Advanced)
If the user has a service account JSON file, you can generate JWTs dynamically using a transform step:
- Extract private_key and client_email from the service account JSON
- Build the JWT header and claims, then sign with crypto.sign('sha256', data, privateKey, 'base64url')
- Exchange the JWT for an access token via POST to https://oauth2.googleapis.com/token

OPTION 3: Service Account Token via CLI (Manual refresh required)
If the user prefers to generate tokens externally:
- User generates an access token on their machine using gcloud CLI:
  1. Activate the service account: gcloud auth activate-service-account --key-file=/path/to/service-account.json
  2. Print the token: gcloud auth print-access-token
- The token is valid for 1 hour only
- For tools built this way: the token should be a required INPUT in the tool payload, not stored as a system credential (since it expires quickly)

REQUIRED GCP PERMISSIONS:
- BigQuery Data Viewer (roles/bigquery.dataViewer) - read access
- BigQuery Data Editor (roles/bigquery.dataEditor) - write access  
- BigQuery Job User (roles/bigquery.jobUser) - run queries

HEADERS: { "Authorization": "Bearer <<token>>", "Content-Type": "application/json" }`,
        keywords: [
          "datasets",
          "tables",
          "queries",
          "jobs",
          "projects",
          "schemas",
          "rows",
          "streaming",
          "partitions",
          "clustering",
          "views",
          "routines",
          "models",
          "data warehouse",
          "sql",
          "oauth"
        ]
      },
      firebase: {
        name: "firebase",
        apiUrl: "https://firestore.googleapis.com",
        regex: "^.*(firebase|firestore).*$",
        icon: "firebase",
        docsUrl: "https://firebase.google.com/docs/reference/firebase-management/rest",
        openApiUrl: "https://firestore.googleapis.com/$discovery/rest?version=v1",
        preferredAuthType: "oauth",
        oauth: {
          authUrl: "https://accounts.google.com/o/oauth2/v2/auth",
          tokenUrl: "https://oauth2.googleapis.com/token",
          scopes: "https://www.googleapis.com/auth/firebase https://www.googleapis.com/auth/cloud-platform"
        },
        keywords: [
          "firestore",
          "realtime database",
          "authentication",
          "cloud functions",
          "storage",
          "hosting",
          "documents",
          "collections",
          "users",
          "projects",
          "apps",
          "query",
          "oauth"
        ]
      },
      salesforce: {
        name: "salesforce",
        apiUrl: "https://api.salesforce.com",
        regex: "^.*salesforce.*$",
        icon: "salesforce",
        // documentation not crawlable due to weird htm site. PDF available at https://resources.docs.salesforce.com/258/latest/en-us/sfdc/pdf/api_rest.pdf - convert to text and insert in db.
        docsUrl: "https://developer.salesforce.com/docs/atlas.en-us.api_rest.meta/api_rest/intro_rest.htm",
        preferredAuthType: "oauth",
        oauth: {
          authUrl: "https://login.salesforce.com/services/oauth2/authorize",
          tokenUrl: "https://login.salesforce.com/services/oauth2/token",
          scopes: "full",
          grant_type: "authorization_code",
          client_id: "3MVG9rZjd7MXFdLh_gnrsdT0JYyCLRCfTpDu93a61QQbINe1OKu1ROuXUBzNLAX2WT.XbO3L444Hyuu2Xd8wO"
        },
        keywords: [
          "accounts",
          "contacts",
          "leads",
          "opportunities",
          "cases",
          "campaigns",
          "products",
          "price books",
          "quotes",
          "contracts",
          "orders",
          "custom objects",
          "soql",
          "query",
          "search",
          "sobjects",
          "oauth"
        ]
      },
      facebook: {
        name: "facebook",
        apiUrl: "https://graph.facebook.com",
        regex: "^.*facebook.*$",
        icon: "facebook",
        docsUrl: "https://developers.facebook.com/docs/graph-api",
        preferredAuthType: "oauth",
        oauth: {
          authUrl: "https://www.facebook.com/v18.0/dialog/oauth",
          tokenUrl: "https://graph.facebook.com/v18.0/oauth/access_token",
          scopes: "email public_profile pages_show_list pages_read_engagement pages_manage_metadata pages_read_user_content pages_manage_posts pages_manage_engagement business_management ads_management ads_read catalog_management leads_retrieval"
        },
        keywords: [
          "pages",
          "posts",
          "comments",
          "insights",
          "ads",
          "campaigns",
          "audiences",
          "business",
          "catalog",
          "events",
          "groups",
          "photos",
          "videos",
          "live videos",
          "oauth"
        ]
      },
      instagram: {
        name: "instagram",
        apiUrl: "https://graph.facebook.com/v23.0/",
        regex: "^.*instagram.*$",
        icon: "instagram",
        docsUrl: "https://developers.facebook.com/docs/graph-api/overview",
        preferredAuthType: "oauth",
        oauth: {
          authUrl: "https://www.facebook.com/v23.0/dialog/oauth",
          tokenUrl: "https://graph.facebook.com/v23.0/oauth/access_token",
          scopes: "instagram_basic pages_show_list instagram_content_publish pages_read_engagement instagram_manage_comments instagram_manage_insights instagram_manage_messages business_management"
        },
        keywords: [
          "media",
          "posts",
          "stories",
          "comments",
          "insights",
          "hashtags",
          "mentions",
          "business discovery",
          "content publishing",
          "user media",
          "account info",
          "oauth"
        ]
      },
      twitter: {
        name: "twitter",
        apiUrl: "https://api.twitter.com",
        regex: "^.*(twitter|x\\.com).*$",
        icon: "x",
        docsUrl: "https://docs.x.com/x-api/introduction",
        openApiUrl: "https://api.x.com/2/openapi.json",
        preferredAuthType: "oauth",
        oauth: {
          authUrl: "https://twitter.com/i/oauth2/authorize",
          tokenUrl: "https://api.twitter.com/2/oauth2/token",
          scopes: "tweet.read tweet.write users.read follows.read follows.write offline.access like.read like.write list.read list.write block.read block.write bookmark.read bookmark.write mute.read mute.write"
        },
        keywords: [
          "tweets",
          "users",
          "followers",
          "timeline",
          "mentions",
          "retweets",
          "likes",
          "lists",
          "spaces",
          "direct messages",
          "trends",
          "media",
          "polls",
          "oauth"
        ]
      },
      linkedin: {
        name: "linkedin",
        apiUrl: "https://api.linkedin.com",
        regex: "^.*linkedin.*$",
        icon: "linkedin",
        docsUrl: "https://learn.microsoft.com/en-us/linkedin/shared/authentication/getting-access",
        preferredAuthType: "oauth",
        oauth: {
          authUrl: "https://www.linkedin.com/oauth/v2/authorization",
          tokenUrl: "https://www.linkedin.com/oauth/v2/accessToken",
          scopes: "r_liteprofile r_emailaddress w_member_social r_fullprofile r_basicprofile rw_company_admin r_1st_connections r_ads r_ads_reporting r_organization_social rw_organization_admin w_organization_social r_events"
        },
        keywords: [
          "profiles",
          "connections",
          "companies",
          "shares",
          "posts",
          "articles",
          "jobs",
          "skills",
          "endorsements",
          "recommendations",
          "groups",
          "events",
          "messaging",
          "oauth"
        ]
      },
      paypal: {
        name: "paypal",
        apiUrl: "https://api.paypal.com",
        regex: "^.*paypal.*$",
        icon: "paypal",
        docsUrl: "https://developer.paypal.com/api/rest",
        // openapi specs are split across different files - all here: https://github.com/paypal/paypal-rest-api-specifications/tree/main/openapi
        preferredAuthType: "apikey",
        keywords: [
          "payments",
          "orders",
          "captures",
          "refunds",
          "payouts",
          "invoices",
          "subscriptions",
          "plans",
          "products",
          "transactions",
          "balances",
          "webhooks",
          "checkout",
          "billing",
          "query",
          "search"
        ]
      },
      square: {
        name: "square",
        apiUrl: "https://connect.squareup.com",
        regex: "^.*(square|squareup).*$",
        icon: "square",
        docsUrl: "https://developer.squareup.com/reference/square",
        openApiUrl: "https://raw.githubusercontent.com/square/connect-api-specification/refs/heads/master/api.json",
        preferredAuthType: "oauth",
        oauth: {
          authUrl: "https://connect.squareup.com/oauth2/authorize",
          tokenUrl: "https://connect.squareup.com/oauth2/token",
          scopes: "MERCHANT_PROFILE_READ PAYMENTS_READ PAYMENTS_WRITE CUSTOMERS_READ CUSTOMERS_WRITE INVENTORY_READ INVENTORY_WRITE ORDERS_READ ORDERS_WRITE ITEMS_READ ITEMS_WRITE EMPLOYEES_READ EMPLOYEES_WRITE TIMECARDS_READ TIMECARDS_WRITE"
        },
        keywords: [
          "payments",
          "customers",
          "orders",
          "catalog",
          "inventory",
          "locations",
          "transactions",
          "refunds",
          "cards",
          "checkout",
          "invoices",
          "subscriptions",
          "terminals",
          "employees",
          "shifts",
          "query",
          "search",
          "oauth"
        ]
      },
      adyen: {
        name: "adyen",
        apiUrl: "https://checkout-test.adyen.com",
        regex: "^.*adyen.*$",
        icon: "adyen",
        docsUrl: "https://docs.adyen.com/api-explorer",
        openApiUrl: "https://raw.githubusercontent.com/Adyen/adyen-openapi/main/yaml/CheckoutService-v71.yaml",
        preferredAuthType: "apikey",
        keywords: [
          "paymentMethods",
          "sessions",
          "payments",
          "payments.details",
          "cardDetails",
          "recurringContracts",
          "payouts",
          "balanceTransfers",
          "legalEntities",
          "binLookup",
          "storedValueCards",
          "transferRules",
          "terminalManagement",
          "accountHolders",
          "issuers"
        ]
      },
      razorpay: {
        name: "razorpay",
        apiUrl: "https://api.razorpay.com",
        regex: "^.*razorpay.*$",
        icon: "razorpay",
        docsUrl: "https://razorpay.com/docs/api",
        preferredAuthType: "apikey",
        keywords: [
          "payments",
          "orders",
          "customers",
          "refunds",
          "invoices",
          "subscriptions",
          "accounts",
          "fund_accounts",
          "payouts",
          "virtual_accounts",
          "mandates",
          "disputes",
          "settlements",
          "payment_links",
          "bin_lookup"
        ]
      },
      plaid: {
        name: "plaid",
        apiUrl: "https://production.plaid.com",
        regex: "^.*plaid.*$",
        icon: "plaid",
        docsUrl: "https://plaid.com/docs/api",
        openApiUrl: "https://raw.githubusercontent.com/plaid/plaid-openapi/master/2020-09-14.yml",
        preferredAuthType: "apikey",
        keywords: [
          "items",
          "accounts",
          "institutions",
          "link_tokens",
          "access_tokens",
          "transactions",
          "auth",
          "identity",
          "assets",
          "liabilities",
          "income",
          "user",
          "processor_tokens",
          "transfer",
          "investments"
        ]
      },
      zendesk: {
        name: "zendesk",
        apiUrl: "https://api.zendesk.com",
        regex: "^.*zendesk.*$",
        icon: "zendesk",
        docsUrl: "https://developer.zendesk.com/api-reference",
        openApiUrl: "https://developer.zendesk.com/zendesk/oas.yaml",
        preferredAuthType: "apikey",
        oauth: {
          authUrl: "https://{subdomain}.zendesk.com/oauth/authorizations/new",
          tokenUrl: "https://{subdomain}.zendesk.com/oauth/tokens",
          scopes: "read write tickets:read tickets:write users:read users:write organizations:read organizations:write hc:read hc:write chat:read chat:write"
        },
        keywords: [
          "tickets",
          "users",
          "organizations",
          "groups",
          "agents",
          "views",
          "macros",
          "triggers",
          "automations",
          "sla",
          "custom fields",
          "tags",
          "satisfaction",
          "help center",
          "api key"
        ]
      },
      freshdesk: {
        name: "freshdesk",
        apiUrl: "https://{domain}.freshdesk.com/api/v2",
        regex: "^.*freshdesk.*$",
        icon: "freshdesk",
        // doc cannot be crawled from our setup
        docsUrl: "https://developers.freshdesk.com/api",
        preferredAuthType: "apikey",
        keywords: [
          "tickets",
          "contacts",
          "agents",
          "companies",
          "groups",
          "forums",
          "solutions",
          "categories",
          "folders",
          "articles",
          "time entries",
          "surveys",
          "satisfaction",
          "sla",
          "escalations",
          "api key"
        ]
      },
      freshworks: {
        name: "freshworks",
        apiUrl: "https://{domain}.freshservice.com/api/v2",
        regex: "^.*(freshworks|freshservice).*$",
        icon: "freshworks",
        // doc cannot be crawled from our setup
        docsUrl: "https://api.freshservice.com",
        preferredAuthType: "apikey",
        keywords: [
          "tickets",
          "requesters",
          "agents",
          "assets",
          "changes",
          "problems",
          "releases",
          "service catalog",
          "service items",
          "departments",
          "locations",
          "products",
          "vendors",
          "contracts",
          "api key"
        ]
      },
      servicenow: {
        name: "servicenow",
        apiUrl: "https://{instance}.service-now.com/api",
        regex: "^.*(servicenow|service-now).*$",
        icon: "servicenow",
        // service now page does not allow playwright to crawl their page
        docsUrl: "https://developer.servicenow.com/dev.do#!/reference/api/latest/rest",
        preferredAuthType: "apikey",
        keywords: [
          "incidents",
          "problems",
          "changes",
          "requests",
          "users",
          "groups",
          "cmdb",
          "configuration items",
          "service catalog",
          "knowledge",
          "tasks",
          "approvals",
          "sla",
          "workflows",
          "tables",
          "api key"
        ]
      },
      helpscout: {
        name: "helpscout",
        apiUrl: "https://api.helpscout.net",
        regex: "^.*helpscout.*$",
        icon: "helpscout",
        docsUrl: "https://developer.helpscout.com/mailbox-api",
        preferredAuthType: "apikey",
        keywords: [
          "conversations",
          "customers",
          "mailboxes",
          "threads",
          "tags",
          "teams",
          "users",
          "reports",
          "satisfaction",
          "ratings",
          "workflows",
          "saved replies",
          "docs",
          "beacon",
          "api key"
        ]
      },
      dropbox: {
        name: "dropbox",
        apiUrl: "https://api.dropboxapi.com",
        regex: "^.*dropbox.*$",
        icon: "dropbox",
        docsUrl: "https://www.dropbox.com/developers/documentation/http/documentation",
        preferredAuthType: "oauth",
        oauth: {
          authUrl: "https://www.dropbox.com/oauth2/authorize",
          tokenUrl: "https://api.dropboxapi.com/oauth2/token",
          scopes: "files.metadata.read files.metadata.write files.content.read files.content.write sharing.read sharing.write account_info.read account_info.write"
        },
        keywords: [
          "files",
          "folders",
          "upload",
          "download",
          "sharing",
          "links",
          "metadata",
          "search",
          "sync",
          "paper",
          "users",
          "teams",
          "move",
          "copy",
          "delete",
          "oauth"
        ]
      },
      mailchimp: {
        name: "mailchimp",
        apiUrl: "https://api.mailchimp.com",
        regex: "^.*mailchimp.*$",
        icon: "mailchimp",
        docsUrl: "https://mailchimp.com/developer/marketing/api",
        openApiUrl: "https://api.mailchimp.com/schema/3.0/Swagger.json",
        preferredAuthType: "apikey",
        oauth: {
          authUrl: "https://login.mailchimp.com/oauth2/authorize",
          tokenUrl: "https://login.mailchimp.com/oauth2/token",
          scopes: "audiences:read audiences:write automations:read automations:write campaigns:read campaigns:write conversations:read conversations:write ecommerce:read ecommerce:write files:read files:write lists:read lists:write reports:read templates:read templates:write"
        },
        keywords: [
          "lists",
          "campaigns",
          "templates",
          "audiences",
          "members",
          "segments",
          "tags",
          "automations",
          "reports",
          "folders",
          "merge fields",
          "activities",
          "ecommerce",
          "batch",
          "query",
          "api key"
        ]
      },
      jira: {
        name: "jira",
        apiUrl: "https://{your-domain}.atlassian.net/rest/api",
        regex: "^.*(jira|atlassian).*$",
        icon: "jira",
        docsUrl: "https://developer.atlassian.com/cloud/jira/platform/rest/v3",
        openApiUrl: "https://developer.atlassian.com/cloud/jira/platform/swagger-v3.json",
        preferredAuthType: "oauth",
        oauth: {
          authUrl: "https://auth.atlassian.com/authorize",
          tokenUrl: "https://auth.atlassian.com/oauth/token",
          scopes: "read:jira-work write:jira-work read:jira-user write:jira-user read:jira-work-management write:jira-work-management read:servicedesk-request write:servicedesk-request manage:jira-project manage:jira-configuration manage:jira-data-provider offline_access",
          client_id: "Az7iTb4uWYSv5N4p295PulP8oO2B3PjK"
        },
        systemSpecificInstructions: "You need a cloud id in the url to connect to the Jira instance. Fetch it from available-resources and store it in the system. The /rest/api/3/search endpoint has been deprecated - Use GET /rest/api/3/search/jql with query parameter 'jql' for searching issues. MUST specify a project in the JQL query. Example: GET /rest/api/3/search/jql?jql=project=KAN&maxResults=100. The jql parameter accepts JQL queries like 'project=KEY', 'assignee=currentUser()', 'order by created DESC'. Always URL-encode the jql parameter value.",
        keywords: [
          "issues",
          "projects",
          "boards",
          "sprints",
          "epics",
          "users",
          "workflows",
          "fields",
          "components",
          "versions",
          "priorities",
          "statuses",
          "comments",
          "attachments",
          "jql",
          "query",
          "search",
          "oauth"
        ]
      },
      confluence: {
        name: "confluence",
        apiUrl: "https://{your-domain}.atlassian.net/wiki/rest/api",
        regex: "^.*(confluence|atlassian).*$",
        icon: "confluence",
        docsUrl: "https://developer.atlassian.com/cloud/confluence/rest",
        openApiUrl: "https://developer.atlassian.com/cloud/confluence/swagger.json",
        preferredAuthType: "oauth",
        oauth: {
          authUrl: "https://auth.atlassian.com/authorize",
          tokenUrl: "https://auth.atlassian.com/oauth/token",
          scopes: "read:confluence-content.all write:confluence-content read:confluence-space.summary write:confluence-space read:confluence-props write:confluence-props read:confluence-user write:confluence-user read:confluence-groups write:confluence-groups delete:confluence-content delete:confluence-space offline_access",
          client_id: "Az7iTb4uWYSv5N4p295PulP8oO2B3PjK"
        },
        keywords: [
          "spaces",
          "pages",
          "content",
          "attachments",
          "comments",
          "labels",
          "templates",
          "blueprints",
          "macros",
          "restrictions",
          "versions",
          "ancestors",
          "descendants",
          "children",
          "oauth"
        ]
      },
      quickbooks: {
        name: "quickbooks",
        apiUrl: "https://quickbooks.api.intuit.com",
        regex: "^.*(quickbooks|intuit).*$",
        icon: "quickbooks",
        docsUrl: "https://developer.intuit.com/app/developer/qbo/docs/api/accounting/most-commonly-used/account",
        preferredAuthType: "oauth",
        oauth: {
          authUrl: "https://appcenter.intuit.com/connect/oauth2",
          tokenUrl: "https://oauth.platform.intuit.com/oauth2/v1/tokens/bearer",
          scopes: "com.intuit.quickbooks.accounting com.intuit.quickbooks.payment com.intuit.quickbooks.payroll com.intuit.quickbooks.payroll.timetracking com.intuit.quickbooks.payroll.benefits openid profile email phone address"
        },
        keywords: [
          "accounts",
          "invoices",
          "customers",
          "vendors",
          "bills",
          "payments",
          "estimates",
          "purchase orders",
          "sales receipts",
          "credit memos",
          "journal entries",
          "items",
          "tax rates",
          "employees",
          "reports",
          "oauth"
        ]
      },
      xero: {
        name: "xero",
        apiUrl: "https://api.xero.com",
        regex: "^.*xero.*$",
        icon: "xero",
        docsUrl: "https://developer.xero.com/documentation/api/api-overview",
        openApiUrl: "https://raw.githubusercontent.com/XeroAPI/Xero-OpenAPI/master/xero_accounting.yaml",
        preferredAuthType: "oauth",
        oauth: {
          authUrl: "https://login.xero.com/identity/connect/authorize",
          tokenUrl: "https://identity.xero.com/connect/token",
          scopes: "accounting.transactions accounting.transactions.read accounting.reports.read accounting.journals.read accounting.settings accounting.settings.read accounting.contacts accounting.contacts.read accounting.attachments accounting.attachments.read payroll.employees payroll.payruns payroll.payslip payroll.timesheets payroll.settings"
        },
        keywords: [
          "accounts",
          "invoices",
          "contacts",
          "bills",
          "credit notes",
          "bank transactions",
          "payments",
          "receipts",
          "journals",
          "purchase orders",
          "quotes",
          "reports",
          "tax rates",
          "tracking categories",
          "payroll",
          "oauth"
        ]
      },
      docusign: {
        name: "docusign",
        apiUrl: "https://api.docusign.com",
        regex: "^.*docusign.*$",
        icon: "docusign",
        docsUrl: "https://developers.docusign.com/docs/esign-rest-api",
        openApiUrl: "https://raw.githubusercontent.com/docusign/OpenAPI-Specifications/refs/heads/master/esignature.rest.swagger-v2.1.json",
        preferredAuthType: "oauth",
        oauth: {
          authUrl: "https://account.docusign.com/oauth/auth",
          tokenUrl: "https://account.docusign.com/oauth/token",
          scopes: "signature extended impersonation organization_read group_read permission_read user_read user_write account_read domain_read identity_provider_read user_data_redact asset_group_account_read asset_group_account_clone_write asset_group_account_clone_read"
        },
        keywords: [
          "envelopes",
          "documents",
          "recipients",
          "templates",
          "signatures",
          "tabs",
          "brands",
          "accounts",
          "users",
          "groups",
          "powerforms",
          "bulk send",
          "connect",
          "custom fields",
          "oauth"
        ]
      },
      intercom: {
        name: "intercom",
        apiUrl: "https://api.intercom.io",
        regex: "^.*intercom.*$",
        icon: "intercom",
        docsUrl: "https://developers.intercom.com/intercom-api-reference",
        openApiUrl: "https://raw.githubusercontent.com/intercom/Intercom-OpenAPI/refs/heads/main/descriptions/2.9/api.intercom.io.yaml",
        preferredAuthType: "apikey",
        oauth: {
          authUrl: "https://app.intercom.com/oauth",
          tokenUrl: "https://api.intercom.io/auth/eagle/token",
          scopes: "inbox:read inbox:write users:read users:write companies:read companies:write contacts:read contacts:write conversations:read conversations:write help_center:read help_center:write teams:read teams:write tags:read tags:write segments:read events:write counts:read"
        },
        keywords: [
          "contacts",
          "conversations",
          "messages",
          "users",
          "companies",
          "events",
          "tags",
          "segments",
          "articles",
          "help center",
          "teams",
          "admins",
          "inbox",
          "notes",
          "custom attributes",
          "query",
          "api key"
        ]
      },
      asana: {
        name: "asana",
        apiUrl: "https://app.asana.com/api",
        regex: "^.*asana.*$",
        icon: "asana",
        docsUrl: "https://developers.asana.com/docs",
        openApiUrl: "https://raw.githubusercontent.com/Asana/openapi/master/defs/asana_oas.yaml",
        preferredAuthType: "apikey",
        oauth: {
          authUrl: "https://app.asana.com/-/oauth_authorize",
          tokenUrl: "https://app.asana.com/-/oauth_token",
          scopes: "default openid email profile",
          grant_type: "authorization_code",
          client_id: "1211466490919249"
        },
        keywords: [
          "tasks",
          "projects",
          "workspaces",
          "teams",
          "portfolios",
          "goals",
          "sections",
          "tags",
          "custom fields",
          "stories",
          "attachments",
          "followers",
          "assignee",
          "due dates",
          "query",
          "search",
          "api key"
        ]
      },
      trello: {
        name: "trello",
        apiUrl: "https://api.trello.com",
        regex: "^.*trello.*$",
        icon: "trello",
        docsUrl: "https://developer.atlassian.com/cloud/trello/rest",
        openApiUrl: "https://developer.atlassian.com/cloud/trello/swagger.v3.json",
        preferredAuthType: "apikey",
        keywords: [
          "boards",
          "lists",
          "cards",
          "members",
          "labels",
          "checklists",
          "attachments",
          "comments",
          "actions",
          "organizations",
          "teams",
          "power-ups",
          "custom fields",
          "stickers",
          "api key"
        ]
      },
      notion: {
        name: "notion",
        apiUrl: "https://api.notion.com",
        regex: "^.*notion.*$",
        icon: "notion",
        docsUrl: "https://developers.notion.com",
        // this openapi spec was last updated in 2024 - might be outdated
        openApiUrl: "https://raw.githubusercontent.com/cameronking4/notion-openapi-chatgpt-action/refs/heads/main/public/notion-openapi.json",
        preferredAuthType: "oauth",
        oauth: {
          authUrl: "https://api.notion.com/v1/oauth/authorize",
          tokenUrl: "https://api.notion.com/v1/oauth/token",
          scopes: "read_content update_content insert_content read_comments update_comments insert_comments read_user update_user",
          client_id: "2f4d872b-594c-805e-abdd-00375c12bae0",
          tokenAuthMethod: "basic_auth",
          tokenContentType: "json",
          extraHeaders: { "Notion-Version": "2022-06-28" }
        },
        keywords: [
          "pages",
          "databases",
          "blocks",
          "users",
          "workspaces",
          "properties",
          "rich text",
          "search",
          "comments",
          "parent",
          "children",
          "query",
          "filter",
          "sort",
          "api key"
        ]
      },
      digitalocean: {
        name: "digitalocean",
        apiUrl: "https://api.digitalocean.com",
        regex: "^.*digitalocean.*$",
        icon: "digitalocean",
        docsUrl: "https://docs.digitalocean.com/reference/api",
        openApiUrl: "https://raw.githubusercontent.com/digitalocean/openapi/refs/heads/main/specification/DigitalOcean-public.v2.yaml",
        preferredAuthType: "apikey",
        oauth: {
          authUrl: "https://cloud.digitalocean.com/v1/oauth/authorize",
          tokenUrl: "https://cloud.digitalocean.com/v1/oauth/token",
          scopes: "read write admin"
        },
        keywords: [
          "droplets",
          "volumes",
          "images",
          "snapshots",
          "regions",
          "sizes",
          "ssh_keys",
          "domains",
          "domain_records",
          "certificates",
          "firewalls",
          "load_balancers",
          "projects",
          "tags",
          "vpcs",
          "api key"
        ]
      },
      heroku: {
        name: "heroku",
        apiUrl: "https://api.heroku.com",
        regex: "^.*heroku.*$",
        icon: "heroku",
        docsUrl: "https://devcenter.heroku.com/categories/platform-api",
        preferredAuthType: "apikey",
        oauth: {
          authUrl: "https://id.heroku.com/oauth/authorize",
          tokenUrl: "https://id.heroku.com/oauth/token",
          scopes: "global read write read-protected write-protected"
        },
        keywords: [
          "apps",
          "addons",
          "builds",
          "releases",
          "config_vars",
          "formations",
          "dynos",
          "buildpacks",
          "domains",
          "collaborators",
          "keys",
          "account",
          "apps/~/addons",
          "spaces",
          "pipelines",
          "api key"
        ]
      },
      huggingface: {
        name: "huggingface",
        apiUrl: "https://huggingface.co",
        regex: "^.*huggingface.*$",
        icon: "huggingface",
        docsUrl: "https://huggingface.co/docs/hub/en/api",
        preferredAuthType: "apikey",
        keywords: [
          "models",
          "datasets",
          "spaces",
          "parameters",
          "inference",
          "fine-tuning",
          "files",
          "spaces",
          "accounts",
          "groups",
          "api key"
        ]
      },
      circleci: {
        name: "circleci",
        apiUrl: "https://circleci.com/api",
        regex: "^.*circleci.*$",
        icon: "circleci",
        docsUrl: "https://circleci.com/docs/api",
        openApiUrl: "https://circleci.com/api/v2/openapi.json",
        preferredAuthType: "apikey",
        keywords: [
          "pipelines",
          "workflows",
          "jobs",
          "projects",
          "builds",
          "artifacts",
          "environment_variables",
          "contexts",
          "orbs",
          "insights",
          "schedules",
          "checkouts",
          "api key"
        ]
      },
      travisci: {
        name: "travisci",
        apiUrl: "https://api.travis-ci.com",
        regex: "^.*(travis|travis-ci).*$",
        icon: "travisCI",
        docsUrl: "https://docs.travis-ci.com/api",
        preferredAuthType: "apikey",
        keywords: [
          "builds",
          "jobs",
          "repositories",
          "branches",
          "requests",
          "caches",
          "env_vars",
          "settings",
          "logs",
          "stages",
          "beta_features",
          "api key"
        ]
      },
      wordpress: {
        name: "wordpress",
        apiUrl: "https://{your-site.com}/wp-json/wp/v2",
        regex: "^.*wordpress.*$",
        icon: "wordpress",
        docsUrl: "https://developer.wordpress.org/rest-api",
        openApiUrl: "https://developer.wordpress.com/docs/api/",
        preferredAuthType: "apikey",
        keywords: [
          "posts",
          "pages",
          "media",
          "users",
          "categories",
          "tags",
          "comments",
          "taxonomies",
          "types",
          "statuses",
          "settings",
          "themes",
          "plugins",
          "api key"
        ]
      },
      cloudflare: {
        name: "cloudflare",
        apiUrl: "https://api.cloudflare.com",
        regex: "^.*cloudflare.*$",
        icon: "cloudflare",
        docsUrl: "https://developers.cloudflare.com/api",
        openApiUrl: "https://raw.githubusercontent.com/cloudflare/api-schemas/refs/heads/main/openapi.json",
        preferredAuthType: "apikey",
        keywords: [
          "zones",
          "dns_records",
          "firewall_rules",
          "page_rules",
          "workers",
          "certificates",
          "load_balancers",
          "rate_limits",
          "waf",
          "analytics",
          "cache",
          "ssl",
          "api key"
        ]
      },
      bigcommerce: {
        name: "bigcommerce",
        apiUrl: "https://api.bigcommerce.com",
        regex: "^.*bigcommerce.*$",
        icon: "bigcommerce",
        docsUrl: "https://developer.bigcommerce.com/docs/rest-management",
        preferredAuthType: "apikey",
        keywords: [
          "products",
          "categories",
          "brands",
          "orders",
          "customers",
          "carts",
          "checkouts",
          "coupons",
          "price_lists",
          "customer_groups",
          "shipping",
          "store_content",
          "themes",
          "api key"
        ]
      },
      woocommerce: {
        name: "woocommerce",
        apiUrl: "https://{yourstore.com}/wp-json/wc/v3",
        regex: "^.*woocommerce.*$",
        icon: "woocommerce",
        docsUrl: "https://woocommerce.github.io/woocommerce-rest-api-docs",
        preferredAuthType: "apikey",
        keywords: [
          "products",
          "orders",
          "customers",
          "coupons",
          "categories",
          "shipping_classes",
          "tax_classes",
          "payment_gateways",
          "shipping_zones",
          "shipping_methods",
          "product_variations",
          "refunds",
          "reports",
          "api key"
        ]
      },
      prestashop: {
        name: "prestashop",
        apiUrl: "https://{yourstore.com}/api",
        regex: "^.*prestashop.*$",
        icon: "prestashop",
        docsUrl: "https://devdocs.prestashop-project.org/8/webservice",
        preferredAuthType: "apikey",
        keywords: [
          "products",
          "categories",
          "customers",
          "addresses",
          "carts",
          "orders",
          "carriers",
          "countries",
          "currencies",
          "languages",
          "manufacturers",
          "suppliers",
          "stocks",
          "api key"
        ]
      },
      squarespace: {
        name: "squarespace",
        apiUrl: "https://api.squarespace.com",
        regex: "^.*squarespace.*$",
        icon: "squarespace",
        docsUrl: "https://developers.squarespace.com/commerce-apis",
        preferredAuthType: "oauth",
        oauth: {
          authUrl: "https://login.squarespace.com/api/1/login/oauth/provider/authorize",
          tokenUrl: "https://login.squarespace.com/api/1/login/oauth/provider/tokens",
          scopes: "website.products.read website.products.write website.orders.read website.orders.write website.inventory.read website.transactions.read website.store_settings.read email.campaigns.read email.campaigns.send"
        },
        keywords: [
          "products",
          "orders",
          "inventory",
          "transactions",
          "profiles",
          "store_pages",
          "categories",
          "discounts",
          "gift_cards",
          "abandoned_carts",
          "webhooks",
          "oauth"
        ]
      },
      monday: {
        name: "monday",
        apiUrl: "https://api.monday.com/v2",
        regex: "^.*monday.*$",
        icon: "monday",
        docsUrl: "https://developer.monday.com/api-reference/docs",
        preferredAuthType: "apikey",
        oauth: {
          authUrl: "https://auth.monday.com/oauth2/authorize",
          tokenUrl: "https://auth.monday.com/oauth2/token",
          scopes: "me:read users:read boards:read boards:write workspaces:read workspaces:write webhooks:write updates:read updates:write assets:read assets:write tags:read teams:read"
        },
        keywords: [
          "boards",
          "items",
          "groups",
          "columns",
          "updates",
          "users",
          "workspaces",
          "tags",
          "files",
          "activities",
          "teams",
          "subitems",
          "graphql",
          "mutations",
          "query",
          "api key"
        ]
      },
      clickup: {
        name: "clickup",
        apiUrl: "https://api.clickup.com/api/v2",
        regex: "^.*clickup.*$",
        icon: "clickup",
        docsUrl: "https://clickup.com/api",
        openApiUrl: "https://developer.clickup.com/openapi/clickup-api-v2-reference.json",
        preferredAuthType: "apikey",
        oauth: {
          authUrl: "https://app.clickup.com/api",
          tokenUrl: "https://api.clickup.com/api/v2/oauth/token",
          scopes: "user:read user:write task:read task:write list:read list:write folder:read folder:write space:read space:write team:read team:write webhook:read webhook:write goal:read goal:write"
        },
        keywords: [
          "tasks",
          "lists",
          "folders",
          "spaces",
          "teams",
          "goals",
          "views",
          "statuses",
          "priorities",
          "tags",
          "custom fields",
          "time tracking",
          "comments",
          "checklists",
          "dependencies",
          "api key"
        ]
      },
      typeform: {
        name: "typeform",
        apiUrl: "https://api.typeform.com",
        regex: "^.*typeform.*$",
        icon: "typeform",
        docsUrl: "https://developer.typeform.com",
        preferredAuthType: "oauth",
        oauth: {
          authUrl: "https://api.typeform.com/oauth/authorize",
          tokenUrl: "https://api.typeform.com/oauth/token",
          scopes: "forms:read forms:write responses:read responses:write themes:read themes:write images:read images:write workspaces:read workspaces:write webhooks:read webhooks:write accounts:read offline"
        },
        keywords: [
          "forms",
          "responses",
          "questions",
          "fields",
          "themes",
          "images",
          "workspaces",
          "logic jumps",
          "hidden fields",
          "variables",
          "calculations",
          "insights",
          "reports",
          "oauth"
        ]
      },
      figma: {
        name: "figma",
        apiUrl: "https://api.figma.com",
        regex: "^(.*\\.)?figma\\.com(/.*)?$",
        icon: "figma",
        docsUrl: "https://www.figma.com/developers/api",
        openApiUrl: "https://raw.githubusercontent.com/figma/rest-api-spec/refs/heads/main/openapi/openapi.yaml",
        preferredAuthType: "oauth",
        oauth: {
          authUrl: "https://www.figma.com/oauth",
          tokenUrl: "https://www.figma.com/api/oauth/token",
          scopes: "file_read file_write file_dev_resources:read file_dev_resources:write webhooks:write"
        },
        keywords: [
          "files",
          "projects",
          "teams",
          "components",
          "styles",
          "nodes",
          "frames",
          "pages",
          "images",
          "comments",
          "versions",
          "branches",
          "libraries",
          "plugins",
          "oauth"
        ]
      },
      contentful: {
        name: "contentful",
        apiUrl: "https://api.contentful.com",
        regex: "^(.*\\.)?contentful\\.com(/.*)?$",
        icon: "contentful",
        docsUrl: "https://www.contentful.com/developers/docs/references/content-management-api",
        preferredAuthType: "apikey",
        keywords: [
          "spaces",
          "environments",
          "content types",
          "entries",
          "assets",
          "locales",
          "tags",
          "webhooks",
          "roles",
          "api keys",
          "content model",
          "publishing",
          "preview",
          "api key"
        ]
      },
      sanity: {
        name: "sanity",
        apiUrl: "https://api.sanity.io",
        regex: "^(.*\\.)?sanity\\.io(/.*)?$",
        icon: "sanity",
        docsUrl: "https://www.sanity.io/docs/http-api",
        preferredAuthType: "apikey",
        keywords: [
          "documents",
          "datasets",
          "projects",
          "schemas",
          "assets",
          "images",
          "mutations",
          "transactions",
          "groq",
          "listening",
          "history",
          "api key"
        ]
      },
      prismic: {
        name: "prismic",
        apiUrl: "https://api.prismic.io",
        regex: "^(.*\\.)?prismic\\.io(/.*)?$",
        icon: "prismic",
        docsUrl: "https://prismic.io/docs/rest-api",
        preferredAuthType: "apikey",
        keywords: [
          "documents",
          "repositories",
          "custom types",
          "slices",
          "releases",
          "previews",
          "tags",
          "languages",
          "master ref",
          "api key"
        ]
      },
      netlify: {
        name: "netlify",
        apiUrl: "https://api.netlify.com",
        regex: "^(.*\\.)?netlify\\.com(/.*)?$",
        icon: "netlify",
        docsUrl: "https://docs.netlify.com/api/get-started",
        openApiUrl: "https://raw.githubusercontent.com/netlify/open-api/refs/heads/master/swagger.yml",
        preferredAuthType: "apikey",
        oauth: {
          authUrl: "https://app.netlify.com/authorize",
          tokenUrl: "https://api.netlify.com/oauth/token",
          scopes: "user sites deploys dns_zones forms submissions assets functions logs split_tests analytics billing members"
        },
        keywords: [
          "sites",
          "deploys",
          "builds",
          "functions",
          "forms",
          "identity",
          "large media",
          "split tests",
          "analytics",
          "bandwidth",
          "dns zones",
          "ssl certificates",
          "api key"
        ]
      },
      vercel: {
        name: "vercel",
        apiUrl: "https://api.vercel.com",
        regex: "^(.*\\.)?vercel\\.com(/.*)?$",
        icon: "vercel",
        docsUrl: "https://vercel.com/docs/rest-api",
        openApiUrl: "https://openapi.vercel.sh/",
        preferredAuthType: "apikey",
        keywords: [
          "deployments",
          "projects",
          "domains",
          "aliases",
          "secrets",
          "environment variables",
          "teams",
          "logs",
          "certificates",
          "dns",
          "edge config",
          "functions",
          "builds",
          "api key"
        ]
      },
      amplitude: {
        name: "amplitude",
        apiUrl: "https://api.amplitude.com",
        regex: "^(.*\\.)?amplitude\\.com(/.*)?$",
        icon: "amplitude",
        docsUrl: "https://www.docs.developers.amplitude.com",
        preferredAuthType: "apikey",
        keywords: [
          "events",
          "users",
          "cohorts",
          "charts",
          "dashboards",
          "behavioral",
          "properties",
          "segments",
          "funnels",
          "retention",
          "revenue",
          "annotations",
          "export",
          "api key"
        ]
      },
      segment: {
        name: "segment",
        apiUrl: "https://api.segment.com",
        regex: "^(.*\\.)?segment\\.com(/.*)?$",
        icon: "segment",
        docsUrl: "https://segment.com/docs/api",
        preferredAuthType: "apikey",
        keywords: [
          "sources",
          "destinations",
          "tracking",
          "identify",
          "events",
          "traits",
          "warehouses",
          "functions",
          "transformations",
          "audiences",
          "personas",
          "protocols",
          "catalog",
          "api key"
        ]
      },
      mixpanel: {
        name: "mixpanel",
        apiUrl: "https://api.mixpanel.com",
        regex: "^(.*\\.)?mixpanel\\.com(/.*)?$",
        icon: "mixpanel",
        docsUrl: "https://developer.mixpanel.com/reference/overview",
        openApiUrl: "https://developer.mixpanel.com/reference/overview",
        preferredAuthType: "apikey",
        keywords: [
          "events",
          "users",
          "profiles",
          "cohorts",
          "funnels",
          "retention",
          "insights",
          "properties",
          "engage",
          "import",
          "export",
          "jql",
          "query",
          "segmentation",
          "track",
          "api key"
        ]
      },
      algolia: {
        name: "algolia",
        apiUrl: "https://api.algolia.com",
        regex: "^(.*\\.)?algolia\\.com(/.*)?$",
        icon: "algolia",
        docsUrl: "https://www.algolia.com/doc/rest-api/search",
        openApiUrl: "https://www.algolia.com/doc/rest-api/search/",
        preferredAuthType: "apikey",
        keywords: [
          "indices",
          "search",
          "records",
          "objects",
          "facets",
          "filters",
          "ranking",
          "synonyms",
          "rules",
          "api keys",
          "analytics",
          "insights",
          "browse",
          "query",
          "api key"
        ]
      },
      snowflake: {
        name: "snowflake",
        apiUrl: "https://account.snowflakecomputing.com",
        regex: "^(.*\\.)?(snowflake\\.com|snowflakecomputing\\.com)(/.*)?$",
        icon: "snowflake",
        docsUrl: "https://docs.snowflake.com/en/developer-guide/sql-api/index",
        // snowflake stores multiple openapi specs in different files - all here: https://github.com/snowflakedb/snowflake-rest-api-specs
        preferredAuthType: "apikey",
        keywords: [
          "warehouses",
          "databases",
          "schemas",
          "tables",
          "views",
          "stages",
          "pipes",
          "tasks",
          "streams",
          "procedures",
          "functions",
          "roles",
          "users",
          "sql",
          "api key"
        ]
      },
      databricks: {
        name: "databricks",
        apiUrl: "https://{your-workspace}.cloud.databricks.com/api",
        regex: "^(.*\\.)?(databricks\\.com|cloud\\.databricks\\.com)(/.*)?$",
        icon: "databricks",
        // databricks is tricky since the documentation and the oauth changes if you use databricks on aws, gcp or azure
        docsUrl: "https://docs.databricks.com/api/workspace/introduction",
        preferredAuthType: "apikey",
        keywords: [
          "clusters",
          "jobs",
          "notebooks",
          "dbfs",
          "libraries",
          "secrets",
          "tokens",
          "workspace",
          "mlflow",
          "delta",
          "sql endpoints",
          "permissions",
          "groups",
          "api key"
        ]
      },
      looker: {
        name: "looker",
        apiUrl: "https://{your-domain}.looker.com/api",
        regex: "^(.*\\.)?looker\\.com(/.*)?$",
        icon: "looker",
        docsUrl: "https://docs.looker.com/reference/api-and-integration/api-reference",
        openApiUrl: "https://raw.githubusercontent.com/looker-open-source/sdk-codegen/refs/heads/main/spec/Looker.4.0.oas.json",
        preferredAuthType: "apikey",
        keywords: [
          "looks",
          "dashboards",
          "explores",
          "models",
          "views",
          "fields",
          "dimensions",
          "measures",
          "folders",
          "spaces",
          "schedules",
          "users",
          "groups",
          "roles",
          "api key"
        ]
      },
      mongodb: {
        name: "mongodb",
        apiUrl: "https://cloud.mongodb.com/api",
        regex: "^(.*\\.)?mongodb\\.com(/.*)?$",
        icon: "mongodb",
        docsUrl: "https://www.mongodb.com/docs/atlas/api",
        preferredAuthType: "apikey",
        keywords: [
          "clusters",
          "databases",
          "collections",
          "documents",
          "indexes",
          "atlas",
          "realm",
          "charts",
          "data lake",
          "search",
          "triggers",
          "backups",
          "alerts",
          "api key"
        ]
      },
      supabase: {
        name: "supabase",
        apiUrl: "https://api.supabase.co",
        regex: "^(.*\\.)?(supabase\\.co|supabase\\.io)(/.*)?$",
        icon: "supabase",
        docsUrl: "https://supabase.com/docs/reference/api",
        openApiUrl: "https://api.supabase.com/api/v1-json",
        preferredAuthType: "apikey",
        keywords: [
          "tables",
          "rows",
          "auth",
          "storage",
          "functions",
          "realtime",
          "rpc",
          "buckets",
          "policies",
          "users",
          "postgrest",
          "select",
          "insert",
          "update",
          "delete",
          "filter",
          "api key"
        ]
      },
      planetscale: {
        name: "planetscale",
        apiUrl: "https://api.planetscale.com",
        regex: "^(.*\\.)?planetscale\\.com(/.*)?$",
        icon: "planetscale",
        docsUrl: "https://api-docs.planetscale.com",
        openApiUrl: "https://api.planetscale.com/v1/openapi-spec",
        preferredAuthType: "apikey",
        keywords: [
          "databases",
          "branches",
          "deploy requests",
          "schemas",
          "backups",
          "passwords",
          "certificates",
          "regions",
          "organizations",
          "audit logs",
          "insights",
          "api key"
        ]
      },
      openai: {
        name: "openai",
        apiUrl: "https://api.openai.com",
        regex: "^.*openai.*$",
        icon: "openai",
        // openai prevents playwright from crawling their page - we manually copied the text to the template doc
        docsUrl: "https://platform.openai.com/docs/api-reference/introduction",
        openApiUrl: "https://app.stainless.com/api/spec/documented/openai/openapi.documented.yml",
        preferredAuthType: "apikey",
        keywords: [
          "completions",
          "chat",
          "models",
          "embeddings",
          "images",
          "audio",
          "files",
          "fine-tuning",
          "assistants",
          "threads",
          "messages",
          "runs",
          "moderation",
          "usage",
          "api key"
        ],
        systemSpecificInstructions: `As of February 2026, these are the available OpenAI API models:

    FLAGSHIP MODELS:
    - gpt-5.2 - Latest and most capable model (recommended for most use cases)
    - gpt-5 - Previous flagship model
    - o4-mini - Optimized reasoning model

    LEGACY MODELS (still available via API):
    - gpt-4o - Being retired from ChatGPT but still available via API
    - gpt-4.1 / gpt-4.1-mini - Previous generation models
    - gpt-4-turbo - Older turbo variant
    - gpt-3.5-turbo - Legacy model for cost-sensitive applications

    SPECIALIZED MODELS:
    - text-embedding-3-large / text-embedding-3-small - For embeddings
    - dall-e-3 - Image generation
    - whisper-1 - Audio transcription
    - tts-1 / tts-1-hd - Text-to-speech
    `
      },
      anthropic: {
        name: "anthropic",
        apiUrl: "https://api.anthropic.com",
        regex: "^.*anthropic.*$",
        icon: "anthropic",
        docsUrl: "https://docs.anthropic.com/claude/reference",
        preferredAuthType: "apikey",
        keywords: [
          "messages",
          "completions",
          "claude",
          "models",
          "prompts",
          "conversations",
          "tokens",
          "streaming",
          "api key"
        ],
        systemSpecificInstructions: `As of February 2026, these are the available Anthropic Claude API models:

    LATEST MODELS:
    - claude-opus-4-6 - Most intelligent model for agents and coding (200K / 1M beta context, 128K output)
    - claude-sonnet-4-6 - Best speed/intelligence balance (200K / 1M beta context, 64K output)
    - claude-haiku-4-5-20251001 (alias: claude-haiku-4-5) - Fastest model (200K context, 64K output)

    OLDER CLAUDE 4 VERSIONS (still active):
    - claude-sonnet-4-5-20250929 (alias: claude-sonnet-4-5) - Previous Sonnet version
    - claude-opus-4-5-20251101 (alias: claude-opus-4-5) - Previous Opus version
    - claude-opus-4-1-20250805 (alias: claude-opus-4-1) - Earlier Opus version
    - claude-sonnet-4-20250514 (alias: claude-sonnet-4-0) - Original Claude 4 Sonnet
    - claude-opus-4-20250514 (alias: claude-opus-4-0) - Original Claude 4 Opus

    DEPRECATED (retiring Apr 19, 2026):
    - claude-3-haiku-20240307 - Claude 3 Haiku (use claude-haiku-4-5 instead)

    RETIRED (no longer available):
    - claude-3-7-sonnet-20250219 (retired Feb 2026)
    - claude-3-5-haiku-20241022 (retired Feb 2026)
    - claude-3-5-sonnet-* (retired Oct 2025)
    - claude-3-opus-20240229 (retired Jan 2026)
    - claude-2.*, claude-3-sonnet-* (retired Jul 2025)
`
      },
      pinecone: {
        name: "pinecone",
        apiUrl: "https://api.pinecone.io",
        regex: "^(.*\\.)?pinecone\\.io(/.*)?$",
        icon: "pinecone",
        docsUrl: "https://docs.pinecone.io/reference",
        openApiUrl: "https://raw.githubusercontent.com/sigpwned/pinecone-openapi-spec/refs/heads/main/openapi.yml",
        preferredAuthType: "apikey",
        keywords: [
          "indexes",
          "vectors",
          "upsert",
          "collections",
          "namespaces",
          "metadata",
          "embeddings",
          "dimensions",
          "pods",
          "replicas",
          "shards",
          "api key"
        ]
      },
      zoom: {
        name: "zoom",
        apiUrl: "https://api.zoom.us",
        regex: "^(.*\\.)?zoom\\.us(/.*)?$",
        icon: "zoom",
        docsUrl: "https://developers.zoom.us/docs/api",
        preferredAuthType: "oauth",
        oauth: {
          authUrl: "https://zoom.us/oauth/authorize",
          tokenUrl: "https://zoom.us/oauth/token",
          scopes: "user:read user:write meeting:read meeting:write meeting:master recording:read recording:write webinar:read webinar:write chat_message:read chat_message:write chat_channel:read chat_channel:write contact:read report:read report:master dashboard:read"
        },
        keywords: [
          "meetings",
          "webinars",
          "users",
          "recordings",
          "chat",
          "channels",
          "messages",
          "participants",
          "registrants",
          "reports",
          "dashboards",
          "rooms",
          "schedule",
          "join",
          "oauth"
        ]
      },
      microsoft: {
        name: "microsoft",
        apiUrl: "https://graph.microsoft.com",
        regex: "^.*(microsoft|graph\\.microsoft|office|outlook|live\\.com|sharepoint).*$",
        icon: "default",
        docsUrl: "https://learn.microsoft.com/en-us/graph/api/overview",
        preferredAuthType: "oauth",
        oauth: {
          authUrl: "https://login.microsoftonline.com/common/oauth2/v2.0/authorize",
          tokenUrl: "https://login.microsoftonline.com/common/oauth2/v2.0/token",
          scopes: "User.Read User.ReadWrite Mail.Read Mail.ReadWrite Mail.Send Calendars.Read Calendars.ReadWrite Files.Read Files.ReadWrite Sites.Read.All Sites.ReadWrite.All Teams.ReadBasic.All Chat.Read Chat.ReadWrite ChannelMessage.Read.All offline_access"
        },
        keywords: [
          "users",
          "groups",
          "mail",
          "calendar",
          "contacts",
          "onedrive",
          "sharepoint",
          "teams",
          "planner",
          "tasks",
          "drives",
          "sites",
          "lists",
          "permissions",
          "graph",
          "oauth"
        ],
        systemSpecificInstructions: `Azure App Registration Required: Create an app in Azure Portal \u2192 App registrations with redirect URI: https://app.superglue.cloud/api/auth/callback
    Tenant-Specific Endpoints: Multi-tenant apps need tenant ID in OAuth URLs (/04a63d67.../oauth2/v2.0/authorize) instead of /common endpoint
    Credentials Needed: Application (client) ID + Client Secret (generated under Certificates & secrets - copy the Value immediately, not the Secret ID)
    API Permissions: Add Microsoft Graph permissions (e.g., Sites.ReadWrite.All) under API permissions, then grant admin consent if you have admin rights
    Scopes Must Include: Always add offline_access scope to get refresh tokens for long-term access without re-authentication
    `
      },
      dynamics365_sales: {
        name: "dynamics365_sales",
        apiUrl: "https://<<org>>.crm<<region_number>>.dynamics.com/api/data/v9.2",
        regex: "^.*(crm\\d*\\.dynamics\\.com|dynamicscrm).*$",
        icon: "lucide:square-percent",
        docsUrl: "https://learn.microsoft.com/en-us/power-apps/developer/data-platform/webapi/query-data-web-api",
        preferredAuthType: "oauth",
        oauth: {
          authUrl: "https://login.microsoftonline.com/common/oauth2/v2.0/authorize",
          tokenUrl: "https://login.microsoftonline.com/common/oauth2/v2.0/token",
          scopes: "https://<<org>>.crm<<region_number>>.dynamics.com/user_impersonation offline_access",
          grant_type: "authorization_code"
        },
        keywords: [
          "accounts",
          "contacts",
          "leads",
          "opportunities",
          "quotes",
          "salesorders",
          "salesorderdetails",
          "products",
          "incidents",
          "campaigns",
          "invoices",
          "competitors",
          "teams",
          "systemusers",
          "businessunits",
          "odata",
          "dynamics",
          "crm",
          "dynamics 365 sales",
          "dataverse",
          "oauth"
        ],
        systemSpecificInstructions: `Dynamics 365 Sales \u2014 Dataverse Web API v9.2

REQUIRED HEADERS (in addition to Authorization):
- OData-MaxVersion: 4.0
- OData-Version: 4.0
- If-None-Match: null (recommended \u2014 prevents stale cached data, especially on $expand queries)

QUERY BEHAVIOR:
- $skip is NOT supported. Use @odata.nextLink for pagination (default page size 5000, control with Prefer: odata.maxpagesize=<n>).
- PAGINATION IN SUPERGLUE: Use cursorBased pagination with cursorPath "@odata.nextLink":
  pagination: { type: "cursorBased", pageSize: "5000", cursorPath: "@odata.nextLink" }
  The cursor is a full URL \u2014 use <<cursor>> as the step URL (set the initial URL via a "cursor" input variable).
- $apply is supported for aggregations.
- Lookup fields (foreign keys) are named _<field>_value \u2014 e.g. _parentaccountid_value, _customerid_value.
- To get formatted/display values (e.g. option set labels, currency formatting), add header: Prefer: odata.include-annotations="OData.Community.Display.V1.FormattedValue"
- FetchXML: GET /api/data/v9.2/<entity>?fetchXml=<url_encoded_xml> for complex aggregations and outer joins that OData $expand cannot express.
- Max URL length is 32KB. For long queries, wrap in a $batch POST request (raises limit to 64KB).
- Max individual OData URL segment is 260 chars \u2014 use parameter aliases (@p1=value) to shorten segments.

WRITE SPECIFICS:
- PATCH doubles as an upsert when the target record doesn't exist (by ID or alternate key). Use If-Match: * to prevent accidental creates. Use If-None-Match: * to prevent accidental updates.
- Setting lookups on write: use @odata.bind \u2014 e.g. "parentaccountid@odata.bind": "/accounts(<guid>)"
- Disassociating a lookup: set the navigation property to null (without @odata.bind), e.g. "parentcustomerid_account": null

RATE LIMITS (Service Protection):
- 429 Too Many Requests returned when limits exceeded. Always implement Retry-After handling.
- Per-user limits per 5-min window: 6,000 requests, 20 min combined execution time, 52+ concurrent requests.
- These are per web server \u2014 actual capacity varies by environment.

DISCOVERING CUSTOM ENTITIES:
GET /api/data/v9.2/EntityDefinitions?$filter=IsCustomEntity eq true&$select=LogicalName,DisplayName
`
      },
      dynamics365_business_central: {
        name: "dynamics365_business_central",
        apiUrl: "https://api.businesscentral.dynamics.com/v2.0/<<environment>>/api/v2.0",
        regex: "^.*(businesscentral\\.dynamics\\.com|business[\\s\\-]?central).*$",
        icon: "lucide:landmark",
        docsUrl: "https://learn.microsoft.com/en-us/dynamics365/business-central/dev-itpro/api-reference/v2.0/",
        preferredAuthType: "oauth",
        oauth: {
          authUrl: "https://login.microsoftonline.com/common/oauth2/v2.0/authorize",
          tokenUrl: "https://login.microsoftonline.com/common/oauth2/v2.0/token",
          scopes: "https://api.businesscentral.dynamics.com/.default offline_access",
          grant_type: "authorization_code"
        },
        keywords: [
          "customers",
          "vendors",
          "items",
          "salesOrders",
          "salesInvoices",
          "salesQuotes",
          "purchaseOrders",
          "purchaseInvoices",
          "generalLedgerEntries",
          "journals",
          "accounts",
          "employees",
          "dimensions",
          "warehouses",
          "inventory",
          "odata",
          "dynamics",
          "erp",
          "business central",
          "finance",
          "oauth"
        ],
        systemSpecificInstructions: `Dynamics 365 Business Central \u2014 API v2.0

COMPANY SCOPING: All entities are scoped under a company. List companies first: GET /api/v2.0/companies, then access entities at /companies(<id>)/<entity>.

WRITE SPECIFICS:
- Updates REQUIRE an If-Match header with the entity's @odata.etag value \u2014 omitting it will fail.
- Do NOT insert child records belonging to the same parent in parallel \u2014 causes locks. Use $batch to serialize them.
- Transactional $batch: add Isolation: snapshot header for all-or-nothing batch operations. Max 100 operations per $batch.

PAGINATION: Uses @odata.nextLink (a full URL for the next page). In superglue, use offsetBased pagination with $top and $skip since BC supports $skip:
  pagination: { type: "offsetBased", pageSize: "1000" }
  queryParams: { "$top": "<<limit>>", "$skip": "<<offset>>" }

QUERY LIMITS:
- Max page size: 20,000 entities per response (returns 413 if exceeded).
- Max request body size: 350 MB.
- Request timeout: 8 minutes \u2014 long-running requests get 408 or 504.
- Use Data-Access-Intent: ReadOnly header on GET requests that don't need latest data (routes to read replica, reduces load).

RATE LIMITS:
- 429 Too Many Requests when limits exceeded. Always implement Retry-After handling.
- Per-user: 6,000 requests per 5-min sliding window, 5 concurrent requests, 100 max connections.

PERFORMANCE GOTCHAS:
- Avoid temp-table-based API pages with >100 records \u2014 no caching, poor pagination.
- Calculated/complex fields on API pages are expensive. Prefer stored values.
- API pages/queries are up to 10x faster than SOAP endpoints \u2014 always prefer API v2.0.

WEBHOOKS: Supports up to 200 webhook subscriptions for entity change notifications via /subscriptions.

CUSTOM APIs: Publishers expose custom API pages at /api/{publisher}/{group}/{version}/companies(<id>)/<endpoint>, NOT under /api/v2.0/.
`
      },
      redis: {
        name: "redis",
        apiUrl: "https://app.redislabs.com/api/v1",
        regex: "^(.*\\.)?(redis\\.com|redislabs\\.com|redis\\.io)(/.*)?$",
        icon: "redis",
        docsUrl: "https://docs.redis.com/latest/rc/api",
        openApiUrl: "https://api.redislabs.com/v1/cloud-api-docs",
        preferredAuthType: "apikey",
        keywords: [
          "databases",
          "subscriptions",
          "cloud accounts",
          "regions",
          "modules",
          "persistence",
          "replication",
          "clustering",
          "acl",
          "alerts",
          "backup",
          "api key"
        ]
      },
      elasticsearch: {
        name: "elasticsearch",
        apiUrl: "https://api.elastic.co",
        regex: "^(.*\\.)?elastic\\.co(/.*)?$",
        icon: "elasticsearch",
        docsUrl: "https://www.elastic.co/guide/en/elasticsearch/reference/current/rest-apis.html",
        openApiUrl: "https://raw.githubusercontent.com/elastic/elasticsearch-specification/refs/heads/main/output/openapi/elasticsearch-openapi.json",
        preferredAuthType: "apikey",
        keywords: [
          "indices",
          "documents",
          "search",
          "mappings",
          "settings",
          "aliases",
          "templates",
          "clusters",
          "nodes",
          "shards",
          "aggregations",
          "analyzers",
          "pipelines",
          "snapshots",
          "api key"
        ]
      },
      postmark: {
        name: "postmark",
        apiUrl: "https://api.postmarkapp.com",
        regex: "^(.*\\.)?postmarkapp\\.com(/.*)?$",
        icon: "postmark",
        docsUrl: "https://postmarkapp.com/developer",
        preferredAuthType: "apikey",
        keywords: [
          "emails",
          "templates",
          "servers",
          "domains",
          "senders",
          "bounces",
          "message streams",
          "inbound",
          "stats",
          "suppressions",
          "dkim",
          "spf",
          "tracking",
          "api key"
        ]
      },
      sentry: {
        name: "sentry",
        apiUrl: "https://sentry.io/api",
        regex: "^(.*\\.)?sentry\\.io(/.*)?$",
        icon: "sentry",
        docsUrl: "https://docs.sentry.io/api",
        openApiUrl: "https://raw.githubusercontent.com/getsentry/sentry-api-schema/refs/heads/main/openapi-derefed.json",
        preferredAuthType: "apikey",
        keywords: [
          "projects",
          "issues",
          "events",
          "releases",
          "organizations",
          "teams",
          "alerts",
          "discover",
          "performance",
          "dashboards",
          "integrations",
          "debug files",
          "source maps",
          "api key"
        ]
      },
      pagerduty: {
        name: "pagerduty",
        apiUrl: "https://api.pagerduty.com",
        regex: "^(.*\\.)?pagerduty\\.com(/.*)?$",
        icon: "pagerduty",
        docsUrl: "https://developer.pagerduty.com/api-reference",
        preferredAuthType: "apikey",
        keywords: [
          "incidents",
          "services",
          "escalation policies",
          "schedules",
          "users",
          "teams",
          "oncalls",
          "alerts",
          "event rules",
          "response plays",
          "analytics",
          "maintenance windows",
          "priorities",
          "api key"
        ]
      },
      datadog: {
        name: "datadog",
        apiUrl: "https://api.datadoghq.com",
        regex: "^(.*\\.)?datadoghq\\.com(/.*)?$",
        icon: "datadog",
        docsUrl: "https://docs.datadoghq.com/api/latest",
        preferredAuthType: "apikey",
        keywords: [
          "metrics",
          "monitors",
          "dashboards",
          "logs",
          "traces",
          "synthetics",
          "events",
          "hosts",
          "tags",
          "downtimes",
          "slos",
          "incidents",
          "notebooks",
          "api key"
        ]
      },
      newrelic: {
        name: "newrelic",
        apiUrl: "https://api.newrelic.com",
        regex: "^(.*\\.)?newrelic\\.com(/.*)?$",
        icon: "newrelic",
        docsUrl: "https://docs.newrelic.com/docs/apis/rest-api-v2",
        preferredAuthType: "apikey",
        keywords: [
          "applications",
          "apm",
          "browser",
          "synthetics",
          "alerts",
          "dashboards",
          "nrql",
          "insights",
          "infrastructure",
          "logs",
          "errors",
          "transactions",
          "deployments",
          "api key"
        ]
      },
      auth0: {
        name: "auth0",
        apiUrl: "https://{your-domain}.auth0.com/api/v2",
        regex: "^.*auth0.*$",
        icon: "auth0",
        docsUrl: "https://auth0.com/docs/api/management/v2",
        openApiUrl: "https://auth0.com/docs/api/management/openapi.json",
        preferredAuthType: "oauth",
        oauth: {
          authUrl: "https://{your-domain}.auth0.com/authorize",
          tokenUrl: "https://{your-domain}.auth0.com/oauth/token",
          scopes: "read:users update:users delete:users create:users read:users_app_metadata update:users_app_metadata delete:users_app_metadata create:users_app_metadata read:user_idp_tokens read:client_grants create:client_grants delete:client_grants update:client_grants read:connections update:connections delete:connections create:connections read:resource_servers"
        },
        keywords: [
          "users",
          "roles",
          "permissions",
          "connections",
          "applications",
          "rules",
          "hooks",
          "actions",
          "organizations",
          "branding",
          "emails",
          "mfa",
          "logs",
          "tenants",
          "oauth"
        ]
      },
      okta: {
        name: "okta",
        apiUrl: "https://{your-domain}.okta.com/api/v1",
        regex: "^(.*\\.)?okta\\.com(/.*)?$",
        icon: "okta",
        docsUrl: "https://developer.okta.com/docs/reference",
        openApiUrl: "https://raw.githubusercontent.com/okta/okta-management-openapi-spec/refs/heads/master/dist/2025.01.1/management-minimal.yaml",
        preferredAuthType: "apikey",
        keywords: [
          "users",
          "groups",
          "applications",
          "factors",
          "policies",
          "rules",
          "identity providers",
          "sessions",
          "tokens",
          "events",
          "system logs",
          "schemas",
          "brands",
          "domains",
          "api key"
        ]
      },
      discord: {
        name: "discord",
        apiUrl: "https://discord.com/api",
        regex: "^.*discord.*$",
        icon: "discord",
        docsUrl: "https://discord.com/developers/docs/intro",
        // failed to fetch for some reason...
        openApiUrl: "https://raw.githubusercontent.com/discord/discord-api-spec/refs/heads/main/specs/openapi.json",
        preferredAuthType: "apikey",
        oauth: {
          authUrl: "https://discord.com/api/oauth2/authorize",
          tokenUrl: "https://discord.com/api/oauth2/token",
          scopes: "identify email guilds guilds.join connections bot applications.commands applications.commands.update guilds.members.read messages.read webhook.incoming role_connections.write dm_channels.read voice"
        },
        keywords: [
          "guilds",
          "channels",
          "messages",
          "bots",
          "users",
          "members",
          "roles",
          "permissions",
          "emojis",
          "reactions",
          "voice",
          "invites",
          "bans",
          "audit logs",
          "slash commands",
          "interactions",
          "api key"
        ]
      },
      telegram: {
        name: "telegram",
        apiUrl: "https://api.telegram.org",
        regex: "^(.*\\.)?telegram\\.org(/.*)?$",
        icon: "telegram",
        docsUrl: "https://core.telegram.org/bots/api",
        preferredAuthType: "apikey",
        keywords: [
          "messages",
          "chats",
          "updates",
          "inline",
          "keyboards",
          "media",
          "stickers",
          "polls",
          "dice",
          "commands",
          "callbacks",
          "bot api",
          "api key"
        ]
      },
      whatsapp: {
        name: "whatsapp",
        apiUrl: "https://graph.facebook.com",
        regex: "^(.*\\.)?whatsapp\\.com(/.*)?$",
        icon: "whatsapp",
        docsUrl: "https://developers.facebook.com/docs/whatsapp/cloud-api",
        preferredAuthType: "apikey",
        keywords: [
          "messages",
          "media",
          "contacts",
          "groups",
          "business",
          "templates",
          "interactive",
          "webhooks",
          "phone numbers",
          "profiles",
          "settings",
          "api key"
        ]
      },
      linear: {
        name: "linear",
        apiUrl: "https://api.linear.app/graphql",
        regex: "^(.*\\.)?linear\\.app(/.*)?$",
        icon: "linear",
        docsUrl: "https://developers.linear.app/docs/graphql/working-with-the-graphql-api",
        preferredAuthType: "apikey",
        keywords: [
          "issues",
          "projects",
          "cycles",
          "teams",
          "users",
          "comments",
          "labels",
          "milestones",
          "roadmaps",
          "workflows",
          "states",
          "graphql",
          "mutations",
          "queries",
          "api key"
        ]
      },
      resend: {
        name: "resend",
        apiUrl: "https://api.resend.com",
        regex: "^(.*\\.)?resend\\.com(/.*)?$",
        icon: "resend",
        docsUrl: "https://resend.com/docs/api-reference",
        // problem fetching the yml and converting it to json
        openApiUrl: "https://raw.githubusercontent.com/resend/resend-openapi/main/resend.yaml",
        preferredAuthType: "apikey",
        keywords: [
          "emails",
          "domains",
          "api keys",
          "contacts",
          "audiences",
          "broadcasts",
          "batch",
          "send",
          "templates",
          "react email",
          "transactional",
          "api key"
        ]
      },
      alphavantage: {
        name: "alphavantage",
        apiUrl: "https://www.alphavantage.co",
        regex: "^.*alphavantage.*$",
        icon: "chart-line",
        docsUrl: "https://www.alphavantage.co/documentation/",
        preferredAuthType: "apikey",
        keywords: [
          "stocks",
          "quote",
          "time series",
          "intraday",
          "daily",
          "weekly",
          "monthly",
          "crypto",
          "forex",
          "commodities",
          "technical indicators",
          "fundamental data",
          "earnings",
          "company overview",
          "market data",
          "financial markets",
          "api key"
        ]
      },
      superglueEmail: {
        name: "superglueEmail",
        apiUrl: "https://api.superglue.cloud/v1/notify/email",
        regex: "^.*api\\.superglue\\.cloud.*$",
        icon: "lucide:mail",
        docsUrl: "https://docs.superglue.cloud/guides/email-service",
        preferredAuthType: "apikey",
        keywords: ["email", "send", "notification", "transactional", "demo", "superglue", "api key"]
      },
      googleAds: {
        name: "googleAds",
        apiUrl: "https://googleads.googleapis.com/v20",
        regex: "^.*(googleads\\.googleapis|developers\\.google\\.com/google-ads|adwords\\.google).*$",
        icon: "googleads",
        docsUrl: "https://developers.google.com/google-ads/api/docs/concepts/overview",
        preferredAuthType: "oauth",
        oauth: {
          authUrl: "https://accounts.google.com/o/oauth2/v2/auth",
          tokenUrl: "https://oauth2.googleapis.com/token",
          scopes: "https://www.googleapis.com/auth/adwords https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/userinfo.profile openid"
        },
        keywords: [
          "campaigns",
          "ad groups",
          "ads",
          "keywords",
          "GAQL",
          "budgets",
          "bidding",
          "conversions",
          "audiences",
          "extensions",
          "reports",
          "accounts",
          "billing",
          "targeting",
          "oauth"
        ]
      },
      google: {
        name: "google",
        apiUrl: "https://googleapis.com",
        regex: "^.*(googleapis\\.com(?!/(?:gmail|drive|calendar|sheets|googleads))|developers\\.google\\.com(?!/(?:gmail|drive|calendar|sheets|google-ads))).*$",
        icon: "google",
        docsUrl: "https://developers.google.com/apis-explorer",
        preferredAuthType: "oauth",
        oauth: {
          authUrl: "https://accounts.google.com/o/oauth2/v2/auth",
          tokenUrl: "https://oauth2.googleapis.com/token",
          scopes: "https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/userinfo.profile openid"
        },
        keywords: [
          "apis",
          "services",
          "resources",
          "GAQL",
          "methods",
          "scopes",
          "projects",
          "quotas",
          "usage",
          "oauth"
        ]
      },
      posthog: {
        name: "posthog",
        apiUrl: "https://us.posthog.com/api",
        regex: "^.*posthog.*$",
        icon: "posthog",
        docsUrl: "https://posthog.com/docs/api",
        openApiUrl: "https://app.posthog.com/api/schema/",
        preferredAuthType: "apikey",
        keywords: [
          "events",
          "users",
          "products",
          "dashboard",
          "properties",
          "cohorts",
          "funnels",
          "retention",
          "insights",
          "engage",
          "import",
          "export",
          "jql",
          "query",
          "segmentation",
          "track",
          "api key"
        ]
      },
      firecrawl: {
        name: "firecrawl",
        apiUrl: "https://api.firecrawl.dev/v1",
        regex: "^.*firecrawl.*$",
        icon: "firecrawl",
        docsUrl: "https://docs.firecrawl.dev/api-reference/introduction",
        preferredAuthType: "apikey",
        keywords: ["crawl", "scrape", "extract", "search", "pdf", "web", "html", "markdown", "api key"]
      },
      crawlbase: {
        name: "crawlbase",
        apiUrl: "https://api.crawlbase.com",
        regex: "^.*crawlbase.*$",
        icon: "crawlbase",
        docsUrl: "https://crawlbase.com/docs/crawling-api/",
        preferredAuthType: "apikey",
        keywords: ["crawl", "scrape", "extract", "search", "pdf", "web", "html", "markdown", "api key"]
      },
      procore: {
        name: "procore",
        apiUrl: "https://api.procore.com/rest/",
        regex: "^.*procore.*$",
        icon: "procore",
        docsUrl: "https://developers.procore.com/reference/rest/docs/rest-api-overview",
        openApiUrl: "https://raw.githubusercontent.com/procore/open-api-spec/refs/heads/master/pub-api.swagger.json",
        preferredAuthType: "oauth",
        oauth: {
          authUrl: "https://login.procore.com/oauth/authorize",
          tokenUrl: "https://login.procore.com/oauth/token",
          scopes: ""
        },
        systemSpecificInstructions: `Setup: 1) Create app at developers.procore.com \u2192 My Apps \u2192 Create New App. 2) Add a "Data Connector Component" with User-level Authentication, then create a version. 3) Under OAuth Credentials, set the Redirect URI to the superglue callback URL (e.g. https://app.superglue.cloud/api/auth/callback). 4) Copy the Client ID and Client Secret \u2014 these are the only credentials superglue needs. For sandbox testing, use login-sandbox.procore.com for auth and sandbox.procore.com for API calls instead of the production URLs. The app must be installed on the target company before API calls will work (via the Developer Portal for sandbox, or the App Marketplace for production). Procore does not use granular OAuth scopes \u2014 access is controlled by the app's component permissions in the Developer Portal.

IMPORTANT: Sandbox and production use completely separate credentials and base URLs \u2014 never mix them. Sandbox: login-sandbox.procore.com (auth) + sandbox.procore.com (API). Production: login.procore.com (auth) + api.procore.com (API). OAuth scopes must be left empty \u2014 Procore does not accept standard OAuth scope strings and will return an "invalid scope" error. All API requests require a Procore-Company-Id header with the numeric company ID (visible in the browser URL when logged into Procore, e.g. {domain}/{company_id}/...), and the app must be explicitly installed/connected to that company before any API calls will succeed. The REST API base path is /rest/v1.0/ and most resources are nested under /companies/{company_id}/ or /projects/{project_id}/. Procore has both v1.0 (/rest/v1.0/) and v2.0 (/rest/v2.0/) APIs. Most resources exist in both, but new resources (e.g. RFIs) are v2-only. Check the API reference for which version applies to each endpoint. To get started, call /rest/v1.0/me to verify authentication and /rest/v1.0/companies/{company_id}/projects to list available projects.`,
        keywords: [
          "projects",
          "rfis",
          "submittals",
          "drawings",
          "documents",
          "punch items",
          "observations",
          "inspections",
          "incidents",
          "daily logs",
          "budgets",
          "commitments",
          "change orders",
          "prime contracts",
          "purchase orders",
          "schedule",
          "directory",
          "photos",
          "specifications",
          "meetings",
          "tasks",
          "timesheets",
          "oauth"
        ]
      },
      gemini: {
        name: "gemini",
        apiUrl: "https://generativelanguage.googleapis.com/v1beta/models/{model_string}:generateContent?key={your-api-key}",
        regex: "^.*(gemini|generativelanguage)\\.googleapis\\.com.*$",
        icon: "gemini",
        docsUrl: "https://ai.google.dev/api",
        // there is a openapi spec here: https://generativelanguage.googleapis.com/$discovery/OPENAPI3_0?version=v1beta&key=$GOOGLE_API_KEY - but you need your own google api key to access it
        preferredAuthType: "apikey"
      },
      tableau: {
        name: "tableau",
        apiUrl: "https://{your-server}.online.tableau.com",
        regex: "^.*(tableau\\.com|online\\.tableau).*$",
        icon: "lucide:plus",
        docsUrl: "https://help.tableau.com/current/api/rest_api/en-us/REST/rest_api.htm",
        preferredAuthType: "apikey",
        keywords: [
          "workbooks",
          "views",
          "datasources",
          "projects",
          "users",
          "groups",
          "permissions",
          "sheets",
          "published data sources",
          "sites",
          "jobs",
          "favorites",
          "flows",
          "metrics",
          "webhooks",
          "connected apps",
          "jwt",
          "vizql",
          "row-level security"
        ],
        systemSpecificInstructions: `Tableau supports two Connected App authentication methods:
1. **Direct Trust**: Requires client_id, secret_id, and secret_value \u2014 you generate and sign JWTs yourself
2. **OAuth 2.0**: Standard OAuth flow with client_id and client_secret

DIRECT TRUST CREDENTIALS (from Settings > Connected Apps):
- tableau_url: Server URL (e.g., https://prod-uk-a.online.tableau.com)
- tableau_site_id: The content URL from browser (e.g., "mysite" from /site/mysite/)
- tableau_client_id: Connected App ID
- tableau_secret_id: The key ID you generated
- tableau_client_secret: The secret value (only shown once when created)

DIRECT TRUST AUTH FLOW:
1. Generate a JWT signed with HMAC-SHA256 using the secret value. Include:
   - Header: { alg: "HS256", typ: "JWT", kid: secret_id, iss: client_id }
   - Payload: { iss: client_id, sub: "<username>", aud: "tableau", exp: <now+600>, jti: <uuid>, scp: ["tableau:content:read", "tableau:query:run"] }
2. Exchange JWT for access token: POST /api/3.24/auth/signin with body: { credentials: { jwt: "<token>", site: { contentUrl: "<site_id>" } } }
3. Use the returned token in X-Tableau-Auth header for all subsequent requests

AVAILABLE APIs:
- REST API (/api/3.24/...): Management & metadata \u2014 list datasources, workbooks, users, download view/dashboard data
- Metadata API: GraphQL for relationships and lineage
- VizQL Data Service (/api/v1/vizql-data-service/query-datasource): Query datasource rows directly

ROW-LEVEL SECURITY: The JWT's "sub" claim determines which user's permissions apply. Data is automatically filtered based on that user's access.

SUPERGLUE EXAMPLE - JWT generation in a transform step (Direct Trust):
\`\`\`javascript
(data) => {
  const creds = data._credentials || {};
  const now = Math.floor(Date.now() / 1000);
  const header = base64url(JSON.stringify({ alg: 'HS256', typ: 'JWT', kid: creds.tableau_secret_id, iss: creds.tableau_client_id }));
  const payload = base64url(JSON.stringify({ iss: creds.tableau_client_id, sub: data.username, aud: 'tableau', exp: now + 600, jti: crypto.randomUUID(), scp: ['tableau:content:read', 'tableau:query:run'] }));
  const signature = crypto.createHmac('sha256', creds.tableau_client_secret).update(header + '.' + payload).digest('base64url');
  return { jwt: header + '.' + payload + '.' + signature };
};
\`\`\`

EXAMPLE WORKFLOWS:
- Generate JWT \u2192 Sign in \u2192 List datasources \u2192 Query via VizQL Data Service
- Generate JWT \u2192 Sign in \u2192 Get workbook \u2192 Download view/dashboard data as CSV/PDF`
      }
    };
    exports2.systemOptions = [
      { value: "manual", label: "Custom API", icon: "default" },
      ...Object.entries(exports2.systems).map(([key, system]) => ({
        value: key,
        label: key.replace(/([A-Z])/g, " $1").replace(/^./, (str) => str.toUpperCase()).trim(),
        // Remove leading space
        icon: system.icon || "default"
      }))
    ];
    function findTemplateForSystem4(system) {
      if (system.templateName && exports2.systems[system.templateName]) {
        return { key: system.templateName, template: exports2.systems[system.templateName] };
      }
      if (system.id && exports2.systems[system.id]) {
        return { key: system.id, template: exports2.systems[system.id] };
      }
      if (system.id) {
        const baseId = system.id.replace(/-\d+$/, "");
        if (baseId !== system.id && exports2.systems[baseId]) {
          return { key: baseId, template: exports2.systems[baseId] };
        }
      }
      if (system.name && exports2.systems[system.name]) {
        return { key: system.name, template: exports2.systems[system.name] };
      }
      if (system.url) {
        const urlForMatching = system.url.startsWith("http") || system.url.startsWith("postgres") ? system.url : `https://${system.url}`;
        const matches = [];
        for (const [key, template] of Object.entries(exports2.systems)) {
          try {
            if (new RegExp(template.regex).test(urlForMatching)) {
              const specificity = template.regex.length + (template.regex.includes("(?!") ? 100 : 0);
              matches.push({ key, template, specificity });
            }
          } catch (e) {
            console.error(`Invalid regex pattern for system: ${key}`);
          }
        }
        if (matches.length > 0) {
          const bestMatch = matches.sort((a, b) => b.specificity - a.specificity)[0];
          return { key: bestMatch.key, template: bestMatch.template };
        }
      }
      return null;
    }
    function uniqueKeywords(keywords) {
      if (!keywords || keywords.length === 0)
        return [];
      return [...new Set(keywords)];
    }
    function enrichWithTemplate(input) {
      const match = findTemplateForSystem4(input);
      if (!match) {
        return input;
      }
      const { key: templateKey, template: matchingTemplate } = match;
      const mergedUniqueKeywords = uniqueKeywords([
        ...input.documentationKeywords || [],
        ...matchingTemplate.keywords || []
      ]);
      input.openApiUrl = input.openApiUrl || matchingTemplate.openApiUrl;
      input.openApiSchema = input.openApiSchema || matchingTemplate.openApiSchema;
      input.documentationUrl = input.documentationUrl || matchingTemplate.docsUrl;
      input.url = input.url || matchingTemplate.apiUrl;
      input.documentationKeywords = mergedUniqueKeywords;
      if (!input.templateName) {
        input.templateName = templateKey;
      }
      return input;
    }
    function getOAuthConfig(systemKey) {
      return exports2.systems[systemKey]?.oauth || null;
    }
    function getOAuthTokenExchangeConfig(system) {
      const creds = system.credentials || {};
      let extraHeaders;
      if (creds.extraHeaders) {
        try {
          extraHeaders = typeof creds.extraHeaders === "string" ? JSON.parse(creds.extraHeaders) : creds.extraHeaders;
        } catch {
          extraHeaders = void 0;
        }
      }
      const storedConfig = {
        tokenAuthMethod: creds.tokenAuthMethod,
        tokenContentType: creds.tokenContentType,
        extraHeaders
      };
      const match = findTemplateForSystem4(system);
      const templateOAuth = match?.template.oauth;
      return {
        tokenAuthMethod: storedConfig.tokenAuthMethod ?? templateOAuth?.tokenAuthMethod,
        tokenContentType: storedConfig.tokenContentType ?? templateOAuth?.tokenContentType,
        extraHeaders: storedConfig.extraHeaders ?? templateOAuth?.extraHeaders
      };
    }
    function getOAuthTokenUrl(system) {
      if (system.credentials?.token_url) {
        return system.credentials.token_url;
      }
      const match = findTemplateForSystem4(system);
      if (match?.template.oauth?.tokenUrl) {
        return match.template.oauth.tokenUrl;
      }
      if (!system.url) {
        throw new Error(`Cannot determine OAuth token URL for system ${system.id}: no url or token_url provided`);
      }
      try {
        const urlObj = new URL(system.url.startsWith("http") ? system.url : `https://${system.url}`);
        return `${urlObj.origin}/oauth/token`;
      } catch {
        return `${system.url}/oauth/token`;
      }
    }
  }
});

// ../shared/dist/type-utils.js
var require_type_utils = __commonJS({
  "../shared/dist/type-utils.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.PAGINATION_TYPE_MAP = void 0;
    exports2.mapPaginationType = mapPaginationType;
    exports2.mapFailureBehavior = mapFailureBehavior;
    exports2.PAGINATION_TYPE_MAP = {
      OFFSET_BASED: "offsetBased",
      PAGE_BASED: "pageBased",
      CURSOR_BASED: "cursorBased",
      DISABLED: "disabled"
    };
    function mapPaginationType(internalType) {
      if (!internalType)
        return "disabled";
      if (exports2.PAGINATION_TYPE_MAP[internalType]) {
        return exports2.PAGINATION_TYPE_MAP[internalType];
      }
      return internalType;
    }
    function mapFailureBehavior(internal) {
      if (!internal)
        return void 0;
      return internal.toLowerCase();
    }
  }
});

// ../../node_modules/guess-json-indent/build/src/main.js
var guessJsonIndent, main_default, skipWhitespaces, isJsonWhitespace, isJsonObjectOrArray, getIndent, normalizeIndent;
var init_main = __esm({
  "../../node_modules/guess-json-indent/build/src/main.js"() {
    "use strict";
    guessJsonIndent = (jsonString) => {
      const firstIndex = skipWhitespaces(jsonString, 0);
      if (firstIndex === void 0 || !isJsonObjectOrArray(jsonString[firstIndex])) {
        return;
      }
      const secondIndex = skipWhitespaces(jsonString, firstIndex + 1);
      if (secondIndex === void 0) {
        return;
      }
      return getIndent(jsonString, firstIndex, secondIndex);
    };
    main_default = guessJsonIndent;
    skipWhitespaces = (jsonString, startIndex) => {
      for (let index = startIndex; index < jsonString.length; index += 1) {
        const character = jsonString[index];
        if (!isJsonWhitespace(character)) {
          return index;
        }
      }
    };
    isJsonWhitespace = (character) => character === " " || character === "	" || character === "\n" || character === "\r";
    isJsonObjectOrArray = (character) => character === "{" || character === "[";
    getIndent = (jsonString, firstIndex, secondIndex) => {
      let indent;
      for (let index = secondIndex - 1; index > firstIndex; index -= 1) {
        const character = jsonString[index];
        if (character === "\r") {
          return;
        }
        if (character === "\n") {
          return normalizeIndent(indent);
        }
        if (indent === void 0) {
          indent = character;
        } else if (indent[0] === character) {
          indent += character;
        } else {
          return;
        }
      }
    };
    normalizeIndent = (indent) => {
      if (indent === void 0) {
        return 0;
      }
      return indent[0] === " " ? indent.length : indent;
    };
  }
});

// ../../node_modules/truncate-json/build/src/number.js
var truncateNumber, truncateNumberPrecision, POSITIVE_EXPONENT, TRIMMED_NUMBER_REGEXP;
var init_number = __esm({
  "../../node_modules/truncate-json/build/src/number.js"() {
    "use strict";
    truncateNumber = (value, maxSize) => {
      const valueString = truncateNumberPrecision(
        value,
        "toPrecision",
        maxSize,
        maxSize
      );
      return valueString === void 0 ? truncateNumberPrecision(value, "toExponential", maxSize, maxSize) : valueString;
    };
    truncateNumberPrecision = (value, methodName, maxSize, size) => {
      const valueString = value[methodName](size);
      const valueStringA = valueString.replace(POSITIVE_EXPONENT, "$1").replace(TRIMMED_NUMBER_REGEXP, "$1");
      if (valueStringA.length <= maxSize) {
        return valueStringA;
      }
      return size === 1 ? void 0 : truncateNumberPrecision(value, methodName, maxSize, size - 1);
    };
    POSITIVE_EXPONENT = /(e)\+/iu;
    TRIMMED_NUMBER_REGEXP = /\.?0*($|e)/iu;
  }
});

// ../../node_modules/truncate-json/build/src/options.js
var validateOptions, validateMaxSize, checkMaxSizeType, MIN_MAX_SIZE;
var init_options = __esm({
  "../../node_modules/truncate-json/build/src/options.js"() {
    "use strict";
    validateOptions = (jsonString, maxSize) => {
      if (typeof jsonString !== "string") {
        throw new TypeError(`Input must be a JSON string: ${jsonString}`);
      }
      validateMaxSize(maxSize);
    };
    validateMaxSize = (maxSize) => {
      checkMaxSizeType(maxSize);
      if (maxSize < 0) {
        throw new TypeError(`"maxSize" argument must be positive: ${maxSize}`);
      }
      if (maxSize < MIN_MAX_SIZE) {
        throw new TypeError(
          `"maxSize" argument must be at least ${MIN_MAX_SIZE}: ${maxSize}`
        );
      }
    };
    checkMaxSizeType = (maxSize) => {
      if (maxSize === void 0) {
        throw new TypeError('"maxSize" argument must be defined');
      }
      if (!Number.isInteger(maxSize)) {
        throw new TypeError(`"maxSize" argument must be an integer: ${maxSize}`);
      }
    };
    MIN_MAX_SIZE = 7;
  }
});

// ../../node_modules/string-byte-slice/build/src/bytes.js
var getByteStart, findByteStart, getByteEnd, findByteEnd, isInvalid4Sequence, isInvalid3Sequence, isInvalid2Sequence, convertNegativeIndex, FIRST_BYTE_4_START, FIRST_BYTE_4_END, FIRST_BYTE_3_START, FIRST_BYTE_2_START, NEXT_BYTES_START, NEXT_BYTES_END;
var init_bytes = __esm({
  "../../node_modules/string-byte-slice/build/src/bytes.js"() {
    "use strict";
    getByteStart = (buffer, bufferLength, byteStart) => {
      const byteStartA = convertNegativeIndex(bufferLength, byteStart);
      return findByteStart(buffer, bufferLength, byteStartA);
    };
    findByteStart = (buffer, bufferLength, byteStart) => {
      if (byteStart >= bufferLength) {
        return byteStart;
      }
      const byte = buffer[byteStart];
      return byte >= NEXT_BYTES_START && byte <= NEXT_BYTES_END ? findByteStart(buffer, bufferLength, byteStart + 1) : byteStart;
    };
    getByteEnd = (buffer, bufferLength, byteEnd) => {
      if (byteEnd === void 0) {
        return byteEnd;
      }
      const byteEndA = convertNegativeIndex(bufferLength, byteEnd);
      return findByteEnd(buffer, byteEndA);
    };
    findByteEnd = (buffer, byteEndA) => {
      if (isInvalid4Sequence(buffer, byteEndA)) {
        return byteEndA - 3;
      }
      if (isInvalid3Sequence(buffer, byteEndA)) {
        return byteEndA - 2;
      }
      if (isInvalid2Sequence(buffer, byteEndA)) {
        return byteEndA - 1;
      }
      return byteEndA;
    };
    isInvalid4Sequence = (buffer, byteEnd) => byteEnd >= 3 && buffer[byteEnd - 3] >= FIRST_BYTE_4_START && buffer[byteEnd - 3] <= FIRST_BYTE_4_END;
    isInvalid3Sequence = (buffer, byteEnd) => byteEnd >= 2 && buffer[byteEnd - 2] >= FIRST_BYTE_3_START;
    isInvalid2Sequence = (buffer, byteEnd) => byteEnd >= 1 && buffer[byteEnd - 1] >= FIRST_BYTE_2_START;
    convertNegativeIndex = (bufferLength, byteIndex) => byteIndex < 0 || Object.is(byteIndex, -0) ? Math.max(bufferLength + byteIndex, 0) : byteIndex;
    FIRST_BYTE_4_START = 240;
    FIRST_BYTE_4_END = 244;
    FIRST_BYTE_3_START = 224;
    FIRST_BYTE_2_START = 194;
    NEXT_BYTES_START = 128;
    NEXT_BYTES_END = 191;
  }
});

// ../../node_modules/string-byte-slice/build/src/buffer.js
var bufferSlice;
var init_buffer = __esm({
  "../../node_modules/string-byte-slice/build/src/buffer.js"() {
    "use strict";
    init_bytes();
    bufferSlice = (input, byteStart, byteEnd) => {
      const buffer = globalThis.Buffer.from(input);
      const byteStartA = getByteStart(buffer, buffer.length, byteStart);
      const byteEndA = getByteEnd(buffer, buffer.length, byteEnd);
      return byteStartA === 0 && byteEndA >= buffer.length ? buffer.toString() : buffer.toString("utf8", byteStartA, byteEndA);
    };
  }
});

// ../../node_modules/string-byte-slice/build/src/codepoints.js
var LAST_ASCII_CODEPOINT, LAST_TWO_BYTES_CODEPOINT, FIRST_HIGH_SURROGATE, LAST_HIGH_SURROGATE, FIRST_LOW_SURROGATE, LAST_LOW_SURROGATE, SURROGATE_REGEXP, SURROGATE_REPLACE_CHAR;
var init_codepoints = __esm({
  "../../node_modules/string-byte-slice/build/src/codepoints.js"() {
    "use strict";
    LAST_ASCII_CODEPOINT = 127;
    LAST_TWO_BYTES_CODEPOINT = 2047;
    FIRST_HIGH_SURROGATE = 55296;
    LAST_HIGH_SURROGATE = 56319;
    FIRST_LOW_SURROGATE = 56320;
    LAST_LOW_SURROGATE = 57343;
    SURROGATE_REGEXP = /[\uD800-\uDFFF]/gu;
    SURROGATE_REPLACE_CHAR = "\uFFFD";
  }
});

// ../../node_modules/string-byte-slice/build/src/surrogate.js
var replaceInvalidSurrogate, hasSurrogates;
var init_surrogate = __esm({
  "../../node_modules/string-byte-slice/build/src/surrogate.js"() {
    "use strict";
    init_codepoints();
    replaceInvalidSurrogate = (input) => hasSurrogates(input) ? input.replace(SURROGATE_REGEXP, SURROGATE_REPLACE_CHAR) : input;
    hasSurrogates = (input) => {
      for (let index = 0; index < input.length; index += 1) {
        const codepoint = input.codePointAt(index);
        if (codepoint >= FIRST_HIGH_SURROGATE && codepoint <= LAST_LOW_SURROGATE) {
          return true;
        }
      }
      return false;
    };
  }
});

// ../../node_modules/string-byte-slice/build/src/char_code/indices.js
var findCharIndex;
var init_indices = __esm({
  "../../node_modules/string-byte-slice/build/src/char_code/indices.js"() {
    "use strict";
    init_codepoints();
    findCharIndex = ({
      input,
      targetByteCount,
      firstStartSurrogate,
      lastStartSurrogate,
      firstEndSurrogate,
      lastEndSurrogate,
      increment,
      canBacktrack,
      shift,
      charIndexInit
    }) => {
      let charIndex = charIndexInit;
      let previousCharIndex = charIndex;
      let byteCount = 0;
      for (; byteCount < targetByteCount; charIndex += increment) {
        previousCharIndex = charIndex;
        const codepoint = input.charCodeAt(charIndex);
        if (Number.isNaN(codepoint)) {
          break;
        }
        if (codepoint <= LAST_ASCII_CODEPOINT) {
          byteCount += 1;
          continue;
        }
        if (codepoint <= LAST_TWO_BYTES_CODEPOINT) {
          byteCount += 2;
          continue;
        }
        byteCount += 3;
        if (codepoint < firstStartSurrogate || codepoint > lastStartSurrogate) {
          continue;
        }
        const nextCodepoint = input.charCodeAt(charIndex + increment);
        if (Number.isNaN(nextCodepoint) || nextCodepoint < firstEndSurrogate || nextCodepoint > lastEndSurrogate) {
          continue;
        }
        byteCount += 1;
        charIndex += increment;
      }
      const finalCharIndex = canBacktrack && byteCount > targetByteCount ? previousCharIndex : charIndex;
      return finalCharIndex + shift;
    };
  }
});

// ../../node_modules/string-byte-slice/build/src/char_code/direction.js
var byteToChar, byteToCharForward, byteToCharBackward;
var init_direction = __esm({
  "../../node_modules/string-byte-slice/build/src/char_code/direction.js"() {
    "use strict";
    init_codepoints();
    init_indices();
    byteToChar = (input, byteIndex, isStart) => byteIndex < 0 || Object.is(byteIndex, -0) ? byteToCharBackward(input, byteIndex, isStart) : byteToCharForward(input, byteIndex, isStart);
    byteToCharForward = (input, byteIndex, isEnd) => findCharIndex({
      input,
      targetByteCount: byteIndex,
      firstStartSurrogate: FIRST_HIGH_SURROGATE,
      lastStartSurrogate: LAST_HIGH_SURROGATE,
      firstEndSurrogate: FIRST_LOW_SURROGATE,
      lastEndSurrogate: LAST_LOW_SURROGATE,
      increment: 1,
      canBacktrack: isEnd,
      shift: 0,
      charIndexInit: 0
    });
    byteToCharBackward = (input, byteIndex, isEnd) => findCharIndex({
      input,
      targetByteCount: -byteIndex,
      firstStartSurrogate: FIRST_LOW_SURROGATE,
      lastStartSurrogate: LAST_LOW_SURROGATE,
      firstEndSurrogate: FIRST_HIGH_SURROGATE,
      lastEndSurrogate: LAST_HIGH_SURROGATE,
      increment: -1,
      canBacktrack: !isEnd,
      shift: 1,
      charIndexInit: input.length - 1
    });
  }
});

// ../../node_modules/string-byte-slice/build/src/char_code/main.js
var charCodeSlice, getByteEnd2;
var init_main2 = __esm({
  "../../node_modules/string-byte-slice/build/src/char_code/main.js"() {
    "use strict";
    init_surrogate();
    init_direction();
    charCodeSlice = (input, byteStart, byteEnd) => {
      const charStart = byteToChar(input, byteStart, false);
      const charEnd = getByteEnd2(input, byteEnd);
      const inputA = charStart === 0 && charEnd === void 0 ? input : input.slice(charStart, charEnd);
      return replaceInvalidSurrogate(inputA);
    };
    getByteEnd2 = (input, byteEnd) => {
      if (byteEnd === void 0) {
        return byteEnd;
      }
      const charEnd = byteToChar(input, byteEnd, true);
      return charEnd === input.length ? void 0 : charEnd;
    };
  }
});

// ../../node_modules/string-byte-slice/build/src/encoder.js
var textEncoderSlice, getEncoderDecoder, textEncoderCache, textDecoderCache, getBuffer, CACHE_MAX_MEMORY, cachedEncoderBuffer;
var init_encoder = __esm({
  "../../node_modules/string-byte-slice/build/src/encoder.js"() {
    "use strict";
    init_bytes();
    textEncoderSlice = (input, byteStart, byteEnd) => {
      const { textEncoder, textDecoder } = getEncoderDecoder();
      const buffer = getBuffer(input);
      const { written } = textEncoder.encodeInto(input, buffer);
      const byteStartA = getByteStart(buffer, written, byteStart);
      const byteEndA = getByteEnd(buffer, written, byteEnd);
      const byteEndB = byteEndA === void 0 ? written : Math.min(byteEndA, written);
      const bufferA = buffer.subarray(byteStartA, byteEndB);
      return textDecoder.decode(bufferA);
    };
    getEncoderDecoder = () => {
      if (textEncoderCache === void 0) {
        textEncoderCache = new globalThis.TextEncoder();
        textDecoderCache = new globalThis.TextDecoder("utf8", { fatal: false });
      }
      return { textEncoder: textEncoderCache, textDecoder: textDecoderCache };
    };
    getBuffer = (input) => {
      const size = input.length * 3;
      if (size > CACHE_MAX_MEMORY) {
        return new Uint8Array(size);
      }
      if (cachedEncoderBuffer === void 0 || cachedEncoderBuffer.length < size) {
        cachedEncoderBuffer = new Uint8Array(size);
      }
      return cachedEncoderBuffer;
    };
    CACHE_MAX_MEMORY = 1e5;
  }
});

// ../../node_modules/string-byte-slice/build/src/normalize.js
var normalizeByteEnd, normalizeByteIndex, MAX_UTF8_CHAR_LENGTH;
var init_normalize = __esm({
  "../../node_modules/string-byte-slice/build/src/normalize.js"() {
    "use strict";
    normalizeByteEnd = (input, byteEnd) => {
      if (byteEnd === void 0) {
        return byteEnd;
      }
      const byteEndA = normalizeByteIndex(input, byteEnd);
      return byteEndA >= input.length * MAX_UTF8_CHAR_LENGTH ? void 0 : byteEndA;
    };
    normalizeByteIndex = (input, byteIndex) => byteIndex <= input.length * -MAX_UTF8_CHAR_LENGTH ? 0 : byteIndex;
    MAX_UTF8_CHAR_LENGTH = 4;
  }
});

// ../../node_modules/string-byte-slice/build/src/validate.js
var validateInput, validateByteStart, validateByteEnd, validateIndex;
var init_validate = __esm({
  "../../node_modules/string-byte-slice/build/src/validate.js"() {
    "use strict";
    validateInput = (input, byteStart, byteEnd) => {
      if (typeof input !== "string") {
        throw new TypeError(`First argument must be a string: ${input}`);
      }
      validateByteStart(byteStart);
      validateByteEnd(byteEnd);
    };
    validateByteStart = (byteStart) => {
      if (byteStart === void 0) {
        throw new TypeError("Second argument is required.");
      }
      validateIndex("Second", byteStart);
    };
    validateByteEnd = (byteEnd) => {
      if (byteEnd !== void 0) {
        validateIndex("Third", byteEnd);
      }
    };
    validateIndex = (name, byteIndex) => {
      if (!Number.isInteger(byteIndex)) {
        throw new TypeError(`${name} argument must be an integer: ${byteIndex}`);
      }
    };
  }
});

// ../../node_modules/string-byte-slice/build/src/width.js
var estimateCharWidth, getCodepoint, SAMPLE_SIZE;
var init_width = __esm({
  "../../node_modules/string-byte-slice/build/src/width.js"() {
    "use strict";
    init_codepoints();
    estimateCharWidth = (input) => {
      let asciiOnly = true;
      let longCharsCount = 0;
      for (let index = 0; index < SAMPLE_SIZE; index += 1) {
        const codepoint = getCodepoint(input, index);
        if (codepoint <= LAST_ASCII_CODEPOINT) {
          continue;
        }
        if (asciiOnly) {
          asciiOnly = false;
        }
        if (codepoint > LAST_TWO_BYTES_CODEPOINT) {
          longCharsCount += 1;
        }
      }
      return { asciiOnly, longCharsPercentage: longCharsCount / SAMPLE_SIZE };
    };
    getCodepoint = (input, index) => {
      const sampleSize = SAMPLE_SIZE - 1;
      const percentage = 1 - (sampleSize - index) / sampleSize;
      const charIndex = Math.round(percentage * (input.length - 1));
      return input.charCodeAt(charIndex);
    };
    SAMPLE_SIZE = 50;
  }
});

// ../../node_modules/string-byte-slice/build/src/main.js
var stringByteSlice, main_default2, useBestSlice, CHAR_CODE_MIN_LENGTH, CHAR_CODE_MIN_PERC, tryBufferSlice, tryTextEncoderSlice;
var init_main3 = __esm({
  "../../node_modules/string-byte-slice/build/src/main.js"() {
    "use strict";
    init_buffer();
    init_main2();
    init_encoder();
    init_normalize();
    init_surrogate();
    init_validate();
    init_width();
    stringByteSlice = (input, byteStart, byteEnd) => {
      validateInput(input, byteStart, byteEnd);
      if (input === "") {
        return input;
      }
      const byteStartA = normalizeByteIndex(input, byteStart);
      const byteEndA = normalizeByteEnd(input, byteEnd);
      if (byteEndA === void 0 && Object.is(byteStartA, 0)) {
        return replaceInvalidSurrogate(input);
      }
      return useBestSlice(input, byteStartA, byteEndA);
    };
    main_default2 = stringByteSlice;
    useBestSlice = (input, byteStart, byteEnd) => {
      if (input.length <= CHAR_CODE_MIN_LENGTH) {
        return charCodeSlice(input, byteStart, byteEnd);
      }
      const { asciiOnly, longCharsPercentage } = estimateCharWidth(input);
      if (asciiOnly) {
        return tryBufferSlice(input, byteStart, byteEnd);
      }
      return longCharsPercentage >= CHAR_CODE_MIN_PERC ? charCodeSlice(input, byteStart, byteEnd) : tryTextEncoderSlice(input, byteStart, byteEnd);
    };
    CHAR_CODE_MIN_LENGTH = 200;
    CHAR_CODE_MIN_PERC = 0.4;
    tryBufferSlice = (input, byteStart, byteEnd) => "Buffer" in globalThis && "from" in globalThis.Buffer ? bufferSlice(input, byteStart, byteEnd) : (
      /* c8 ignore next */
      tryTextEncoderSlice(input, byteStart, byteEnd)
    );
    tryTextEncoderSlice = (input, byteStart, byteEnd) => "TextEncoder" in globalThis ? textEncoderSlice(input, byteStart, byteEnd) : (
      /* c8 ignore next */
      charCodeSlice(input, byteStart, byteEnd)
    );
  }
});

// ../../node_modules/truncate-json/build/src/string.js
var truncateString, fixUnicodeSequenceEnd, INVALID_JSON_END, removeQuotes, addQuotes, QUOTE, ELLIPSIS;
var init_string = __esm({
  "../../node_modules/truncate-json/build/src/string.js"() {
    "use strict";
    init_main3();
    truncateString = (value, maxSize) => {
      const jsonString = JSON.stringify(value);
      const truncatedString = removeQuotes(jsonString);
      const truncatedStringA = main_default2(
        truncatedString,
        0,
        maxSize - ELLIPSIS.length - QUOTE.length * 2
      );
      const truncatedStringB = fixUnicodeSequenceEnd(truncatedStringA);
      const truncatedStringC = `${truncatedStringB}${ELLIPSIS}`;
      return addQuotes(truncatedStringC);
    };
    fixUnicodeSequenceEnd = (truncatedString) => truncatedString.replace(INVALID_JSON_END, "");
    INVALID_JSON_END = /(\\|\\u[0-9a-fA-F]{0,3})$/u;
    removeQuotes = (jsonString) => jsonString.slice(QUOTE.length, -QUOTE.length);
    addQuotes = (truncatedString) => `${QUOTE}${truncatedString}${QUOTE}`;
    QUOTE = '"';
    ELLIPSIS = "...";
  }
});

// ../../node_modules/string-byte-length/build/src/buffer.js
var getNodeByteLength;
var init_buffer2 = __esm({
  "../../node_modules/string-byte-length/build/src/buffer.js"() {
    "use strict";
    getNodeByteLength = (string2) => globalThis.Buffer.byteLength(string2);
  }
});

// ../../node_modules/string-byte-length/build/src/char_code.js
var getCharCodeByteLength, LAST_ASCII_CODEPOINT2, LAST_TWO_BYTES_CODEPOINT2, FIRST_HIGH_SURROGATE2, LAST_HIGH_SURROGATE2, FIRST_LOW_SURROGATE2, LAST_LOW_SURROGATE2;
var init_char_code = __esm({
  "../../node_modules/string-byte-length/build/src/char_code.js"() {
    "use strict";
    getCharCodeByteLength = (string2) => {
      const charLength = string2.length;
      let byteLength = charLength;
      for (let charIndex = 0; charIndex < charLength; charIndex += 1) {
        const codepoint = string2.charCodeAt(charIndex);
        if (codepoint <= LAST_ASCII_CODEPOINT2) {
          continue;
        }
        if (codepoint <= LAST_TWO_BYTES_CODEPOINT2) {
          byteLength += 1;
          continue;
        }
        byteLength += 2;
        if (codepoint < FIRST_HIGH_SURROGATE2 || codepoint > LAST_HIGH_SURROGATE2) {
          continue;
        }
        const nextCodepoint = string2.charCodeAt(charIndex + 1);
        if (nextCodepoint < FIRST_LOW_SURROGATE2 || nextCodepoint > LAST_LOW_SURROGATE2) {
          continue;
        }
        charIndex += 1;
      }
      return byteLength;
    };
    LAST_ASCII_CODEPOINT2 = 127;
    LAST_TWO_BYTES_CODEPOINT2 = 2047;
    FIRST_HIGH_SURROGATE2 = 55296;
    LAST_HIGH_SURROGATE2 = 56319;
    FIRST_LOW_SURROGATE2 = 56320;
    LAST_LOW_SURROGATE2 = 57343;
  }
});

// ../../node_modules/string-byte-length/build/src/encoder.js
var createTextEncoderFunc, getTextEncoderByteLength, getBuffer2, CACHE_MAX_MEMORY2, cachedEncoderBuffer2, TEXT_ENCODER_MIN_LENGTH;
var init_encoder2 = __esm({
  "../../node_modules/string-byte-length/build/src/encoder.js"() {
    "use strict";
    createTextEncoderFunc = () => getTextEncoderByteLength.bind(void 0, new TextEncoder());
    getTextEncoderByteLength = (textEncoder, string2) => {
      const encoderBuffer = getBuffer2(string2);
      return textEncoder.encodeInto(string2, encoderBuffer).written;
    };
    getBuffer2 = (string2) => {
      const size = string2.length * 3;
      if (size > CACHE_MAX_MEMORY2) {
        return new Uint8Array(size);
      }
      if (cachedEncoderBuffer2 === void 0 || cachedEncoderBuffer2.length < size) {
        cachedEncoderBuffer2 = new Uint8Array(size);
      }
      return cachedEncoderBuffer2;
    };
    CACHE_MAX_MEMORY2 = 1e5;
    TEXT_ENCODER_MIN_LENGTH = 100;
  }
});

// ../../node_modules/string-byte-length/build/src/main.js
var getMainFunction, getByteLength, main_default3;
var init_main4 = __esm({
  "../../node_modules/string-byte-length/build/src/main.js"() {
    "use strict";
    init_buffer2();
    init_char_code();
    init_encoder2();
    getMainFunction = () => {
      if ("Buffer" in globalThis && "byteLength" in globalThis.Buffer) {
        return getNodeByteLength;
      }
      if ("TextEncoder" in globalThis) {
        return getByteLength.bind(void 0, createTextEncoderFunc());
      }
      return getCharCodeByteLength;
    };
    getByteLength = (getTextEncoderByteLength2, string2) => string2.length < TEXT_ENCODER_MIN_LENGTH ? getCharCodeByteLength(string2) : getTextEncoderByteLength2(string2);
    main_default3 = getMainFunction();
  }
});

// ../../node_modules/truncate-json/build/src/length.js
var getJsonLength, NULL_LENGTH, TRUE_LENGTH, FALSE_LENGTH, OBJ_ARR_LENGTH, getJsonStringLength;
var init_length = __esm({
  "../../node_modules/truncate-json/build/src/length.js"() {
    "use strict";
    init_main4();
    getJsonLength = (value) => {
      if (value === null) {
        return NULL_LENGTH;
      }
      if (value === true) {
        return TRUE_LENGTH;
      }
      if (value === false) {
        return FALSE_LENGTH;
      }
      const type = typeof value;
      if (type === "object") {
        return OBJ_ARR_LENGTH;
      }
      if (type === "number") {
        return JSON.stringify(value).length;
      }
      return getJsonStringLength(value);
    };
    NULL_LENGTH = 4;
    TRUE_LENGTH = 4;
    FALSE_LENGTH = 5;
    OBJ_ARR_LENGTH = 2;
    getJsonStringLength = (string2) => main_default3(JSON.stringify(string2));
  }
});

// ../../node_modules/truncate-json/build/src/size.js
var addSize, getValueSize, getArrayItemSize, getObjectPropSize, COLON_SIZE, getIndentSize, NEWLINE_SIZE, getCommaSize, COMMA_SIZE;
var init_size = __esm({
  "../../node_modules/truncate-json/build/src/size.js"() {
    "use strict";
    init_length();
    addSize = ({
      size,
      increment,
      maxSize,
      truncatedProps,
      path: path7,
      value
    }) => {
      const newSize = size + increment;
      const stop = newSize > maxSize;
      return stop ? { size, stop, truncatedProps: [...truncatedProps, { path: path7, value }] } : { size: newSize, stop, truncatedProps };
    };
    getValueSize = (value) => getJsonLength(value);
    getArrayItemSize = (empty, indent, depth) => {
      const indentSize = getIndentSize({ empty, indent, depth, keySpaceSize: 0 });
      const commaSize = getCommaSize(empty);
      return indentSize + commaSize;
    };
    getObjectPropSize = ({ key, empty, indent, depth }) => {
      const indentSize = getIndentSize({ empty, indent, depth, keySpaceSize: 1 });
      const keySize = getJsonStringLength(key);
      const commaSize = getCommaSize(empty);
      return indentSize + keySize + COLON_SIZE + commaSize;
    };
    COLON_SIZE = 1;
    getIndentSize = ({ empty, indent, depth, keySpaceSize }) => {
      if (indent === void 0) {
        return 0;
      }
      const propSpaces = NEWLINE_SIZE + indent * (depth + 1);
      const parentSpaces = empty ? NEWLINE_SIZE + indent * depth : 0;
      return keySpaceSize + propSpaces + parentSpaces;
    };
    NEWLINE_SIZE = 1;
    getCommaSize = (empty) => empty ? 0 : COMMA_SIZE;
    COMMA_SIZE = 1;
  }
});

// ../../node_modules/truncate-json/build/src/prop.js
var truncateProp, truncatePropValue;
var init_prop = __esm({
  "../../node_modules/truncate-json/build/src/prop.js"() {
    "use strict";
    init_size();
    truncateProp = ({
      parent,
      truncatedProps,
      path: path7,
      increment,
      maxSize,
      key,
      empty,
      size,
      truncateValue: truncateValue2,
      indent,
      depth
    }) => {
      const value = parent[key];
      const pathA = [...path7, key];
      const {
        size: newSize,
        stop,
        truncatedProps: truncatedPropsA
      } = addSize({
        size,
        increment,
        maxSize,
        truncatedProps,
        path: pathA,
        value
      });
      return stop ? { empty, size: newSize, truncatedProps: truncatedPropsA } : truncatePropValue({
        value,
        truncatedProps,
        path: pathA,
        maxSize,
        empty,
        size,
        newSize,
        truncateValue: truncateValue2,
        indent,
        depth
      });
    };
    truncatePropValue = ({
      value,
      truncatedProps,
      path: path7,
      maxSize,
      empty,
      size,
      newSize,
      truncateValue: truncateValue2,
      indent,
      depth
    }) => {
      const {
        value: valueA,
        size: newSizeA,
        truncatedProps: truncatedPropsB
      } = truncateValue2({
        value,
        truncatedProps,
        path: path7,
        size: newSize,
        maxSize,
        indent,
        depth: depth + 1
      });
      return valueA === void 0 ? { empty, size, truncatedProps: truncatedPropsB } : {
        empty: false,
        size: newSizeA,
        value: valueA,
        truncatedProps: truncatedPropsB
      };
    };
  }
});

// ../../node_modules/truncate-json/build/src/array.js
var truncateArray;
var init_array = __esm({
  "../../node_modules/truncate-json/build/src/array.js"() {
    "use strict";
    init_prop();
    init_size();
    truncateArray = ({
      array: array2,
      truncatedProps,
      path: path7,
      size,
      maxSize,
      truncateValue: truncateValue2,
      indent,
      depth
    }) => {
      const newArray = [];
      let state = { empty: true, size, truncatedProps };
      for (let index = 0; index < array2.length; index += 1) {
        const increment = getArrayItemSize(state.empty, indent, depth);
        state = truncateProp({
          parent: array2,
          truncatedProps: state.truncatedProps,
          path: path7,
          increment,
          maxSize,
          key: index,
          empty: state.empty,
          size: state.size,
          truncateValue: truncateValue2,
          indent,
          depth
        });
        if (state.value !== void 0) {
          newArray.push(state.value);
        }
      }
      return {
        value: newArray,
        size: state.size,
        truncatedProps: state.truncatedProps
      };
    };
  }
});

// ../../node_modules/truncate-json/build/src/object.js
var truncateObject;
var init_object = __esm({
  "../../node_modules/truncate-json/build/src/object.js"() {
    "use strict";
    init_prop();
    init_size();
    truncateObject = ({
      object: object2,
      truncatedProps,
      path: path7,
      size,
      maxSize,
      truncateValue: truncateValue2,
      indent,
      depth
    }) => {
      const newObject = {};
      let state = { empty: true, size, truncatedProps };
      for (const key in object2) {
        const increment = getObjectPropSize({
          key,
          empty: state.empty,
          indent,
          depth
        });
        state = truncateProp({
          parent: object2,
          truncatedProps: state.truncatedProps,
          path: path7,
          increment,
          maxSize,
          key,
          empty: state.empty,
          size: state.size,
          truncateValue: truncateValue2,
          indent,
          depth
        });
        if (state.value !== void 0) {
          newObject[key] = state.value;
        }
      }
      return {
        value: newObject,
        size: state.size,
        truncatedProps: state.truncatedProps
      };
    };
  }
});

// ../../node_modules/truncate-json/build/src/value.js
var truncateValue, recurseValue;
var init_value = __esm({
  "../../node_modules/truncate-json/build/src/value.js"() {
    "use strict";
    init_array();
    init_object();
    init_size();
    truncateValue = ({
      value,
      truncatedProps,
      path: path7,
      size,
      maxSize,
      indent,
      depth
    }) => {
      const increment = getValueSize(value);
      const {
        size: sizeA,
        stop,
        truncatedProps: truncatedPropsA
      } = addSize({
        size,
        increment,
        maxSize,
        truncatedProps,
        path: path7,
        value
      });
      return stop ? { value: void 0, size: sizeA, truncatedProps: truncatedPropsA } : recurseValue({
        value,
        truncatedProps: truncatedPropsA,
        path: path7,
        size: sizeA,
        maxSize,
        indent,
        depth
      });
    };
    recurseValue = ({
      value,
      truncatedProps,
      path: path7,
      size,
      maxSize,
      indent,
      depth
    }) => {
      if (typeof value !== "object" || value === null) {
        return { value, size, truncatedProps };
      }
      return Array.isArray(value) ? truncateArray({
        array: value,
        truncatedProps,
        path: path7,
        size,
        maxSize,
        truncateValue,
        indent,
        depth
      }) : truncateObject({
        object: value,
        truncatedProps,
        path: path7,
        size,
        maxSize,
        truncateValue,
        indent,
        depth
      });
    };
  }
});

// ../../node_modules/truncate-json/build/src/main.js
var main_exports = {};
__export(main_exports, {
  default: () => main_default4
});
var truncateJson, main_default4, getIndent2, parseJson, serializeJson;
var init_main5 = __esm({
  "../../node_modules/truncate-json/build/src/main.js"() {
    "use strict";
    init_main();
    init_number();
    init_options();
    init_string();
    init_value();
    truncateJson = (jsonString, maxSize) => {
      validateOptions(jsonString, maxSize);
      const indent = getIndent2(jsonString);
      const value = parseJson(jsonString);
      const { value: newValue, truncatedProps } = truncateValue({
        value,
        truncatedProps: [],
        path: [],
        size: 0,
        maxSize,
        indent,
        depth: 0
      });
      const newJsonString = serializeJson({ newValue, value, maxSize, indent });
      return { jsonString: newJsonString, truncatedProps };
    };
    main_default4 = truncateJson;
    getIndent2 = (jsonString) => {
      const indent = main_default(jsonString);
      return typeof indent === "string" ? indent.length : indent;
    };
    parseJson = (jsonString) => {
      try {
        return JSON.parse(jsonString);
      } catch (error2) {
        throw new TypeError(
          `Invalid JSON string: "${jsonString}"
${error2.message}`
        );
      }
    };
    serializeJson = ({ newValue, value, maxSize, indent }) => {
      if (newValue !== void 0) {
        return JSON.stringify(newValue, void 0, indent);
      }
      return typeof value === "number" ? truncateNumber(value, maxSize) : truncateString(value, maxSize);
    };
  }
});

// ../../node_modules/cron-parser/dist/fields/types.js
var require_types2 = __commonJS({
  "../../node_modules/cron-parser/dist/fields/types.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
  }
});

// ../../node_modules/cron-parser/dist/fields/CronField.js
var require_CronField = __commonJS({
  "../../node_modules/cron-parser/dist/fields/CronField.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.CronField = void 0;
    var CronField = class _CronField {
      #hasLastChar = false;
      #hasQuestionMarkChar = false;
      #wildcard = false;
      #values = [];
      options = { rawValue: "" };
      /**
       * Returns the minimum value allowed for this field.
       */
      /* istanbul ignore next */
      static get min() {
        throw new Error("min must be overridden");
      }
      /**
       * Returns the maximum value allowed for this field.
       */
      /* istanbul ignore next */
      static get max() {
        throw new Error("max must be overridden");
      }
      /**
       * Returns the allowed characters for this field.
       */
      /* istanbul ignore next */
      static get chars() {
        return Object.freeze([]);
      }
      /**
       * Returns the regular expression used to validate this field.
       */
      static get validChars() {
        return /^[?,*\dH/-]+$|^.*H\(\d+-\d+\)\/\d+.*$|^.*H\(\d+-\d+\).*$|^.*H\/\d+.*$/;
      }
      /**
       * Returns the constraints for this field.
       */
      static get constraints() {
        return { min: this.min, max: this.max, chars: this.chars, validChars: this.validChars };
      }
      /**
       * CronField constructor. Initializes the field with the provided values.
       * @param {number[] | string[]} values - Values for this field
       * @param {CronFieldOptions} [options] - Options provided by the parser
       * @throws {TypeError} if the constructor is called directly
       * @throws {Error} if validation fails
       */
      constructor(values, options = { rawValue: "" }) {
        if (!Array.isArray(values)) {
          throw new Error(`${this.constructor.name} Validation error, values is not an array`);
        }
        if (!(values.length > 0)) {
          throw new Error(`${this.constructor.name} Validation error, values contains no values`);
        }
        this.options = {
          ...options,
          rawValue: options.rawValue ?? ""
        };
        this.#values = values.sort(_CronField.sorter);
        this.#wildcard = this.options.wildcard !== void 0 ? this.options.wildcard : this.#isWildcardValue();
        this.#hasLastChar = this.options.rawValue.includes("L") || values.includes("L");
        this.#hasQuestionMarkChar = this.options.rawValue.includes("?") || values.includes("?");
      }
      /**
       * Returns the minimum value allowed for this field.
       * @returns {number}
       */
      get min() {
        return this.constructor.min;
      }
      /**
       * Returns the maximum value allowed for this field.
       * @returns {number}
       */
      get max() {
        return this.constructor.max;
      }
      /**
       * Returns an array of allowed special characters for this field.
       * @returns {string[]}
       */
      get chars() {
        return this.constructor.chars;
      }
      /**
       * Indicates whether this field has a "last" character.
       * @returns {boolean}
       */
      get hasLastChar() {
        return this.#hasLastChar;
      }
      /**
       * Indicates whether this field has a "question mark" character.
       * @returns {boolean}
       */
      get hasQuestionMarkChar() {
        return this.#hasQuestionMarkChar;
      }
      /**
       * Indicates whether this field is a wildcard.
       * @returns {boolean}
       */
      get isWildcard() {
        return this.#wildcard;
      }
      /**
       * Returns an array of allowed values for this field.
       * @returns {CronFieldType}
       */
      get values() {
        return this.#values;
      }
      /**
       * Helper function to sort values in ascending order.
       * @param {number | string} a - First value to compare
       * @param {number | string} b - Second value to compare
       * @returns {number} - A negative, zero, or positive value, depending on the sort order
       */
      static sorter(a, b) {
        const aIsNumber = typeof a === "number";
        const bIsNumber = typeof b === "number";
        if (aIsNumber && bIsNumber)
          return a - b;
        if (!aIsNumber && !bIsNumber)
          return a.localeCompare(b);
        return aIsNumber ? (
          /* istanbul ignore next - A will always be a number until L-2 is supported */
          -1
        ) : 1;
      }
      /**
       * Find the next (or previous when `reverse` is true) numeric value in a sorted list.
       * Returns null if there's no value strictly after/before the current one.
       *
       * @param values - Sorted numeric values
       * @param currentValue - Current value to compare against
       * @param reverse - When true, search in reverse for previous smaller value
       */
      static findNearestValueInList(values, currentValue, reverse = false) {
        if (reverse) {
          for (let i = values.length - 1; i >= 0; i--) {
            if (values[i] < currentValue)
              return values[i];
          }
          return null;
        }
        for (let i = 0; i < values.length; i++) {
          if (values[i] > currentValue)
            return values[i];
        }
        return null;
      }
      /**
       * Instance helper that operates on this field's numeric `values`.
       *
       * @param currentValue - Current value to compare against
       * @param reverse - When true, search in reverse for previous smaller value
       */
      findNearestValue(currentValue, reverse = false) {
        return this.constructor.findNearestValueInList(this.values, currentValue, reverse);
      }
      /**
       * Serializes the field to an object.
       * @returns {SerializedCronField}
       */
      serialize() {
        return {
          wildcard: this.#wildcard,
          values: this.#values
        };
      }
      /**
       * Validates the field values against the allowed range and special characters.
       * @throws {Error} if validation fails
       */
      validate() {
        let badValue;
        const charsString = this.chars.length > 0 ? ` or chars ${this.chars.join("")}` : "";
        const charTest = (value) => (char) => new RegExp(`^\\d{0,2}${char}$`).test(value);
        const rangeTest = (value) => {
          badValue = value;
          return typeof value === "number" ? value >= this.min && value <= this.max : this.chars.some(charTest(value));
        };
        const isValidRange = this.#values.every(rangeTest);
        if (!isValidRange) {
          throw new Error(`${this.constructor.name} Validation error, got value ${badValue} expected range ${this.min}-${this.max}${charsString}`);
        }
        const duplicate = this.#values.find((value, index) => this.#values.indexOf(value) !== index);
        if (duplicate) {
          throw new Error(`${this.constructor.name} Validation error, duplicate values found: ${duplicate}`);
        }
      }
      /**
       * Determines if the field is a wildcard based on the values.
       * When options.rawValue is not empty, it checks if the raw value is a wildcard, otherwise it checks if all values in the range are included.
       * @returns {boolean}
       */
      #isWildcardValue() {
        if (this.options.rawValue.length > 0) {
          return ["*", "?"].includes(this.options.rawValue);
        }
        return Array.from({ length: this.max - this.min + 1 }, (_, i) => i + this.min).every((value) => this.#values.includes(value));
      }
    };
    exports2.CronField = CronField;
  }
});

// ../../node_modules/cron-parser/dist/fields/CronDayOfMonth.js
var require_CronDayOfMonth = __commonJS({
  "../../node_modules/cron-parser/dist/fields/CronDayOfMonth.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.CronDayOfMonth = void 0;
    var CronField_1 = require_CronField();
    var MIN_DAY = 1;
    var MAX_DAY = 31;
    var DAY_CHARS = Object.freeze(["L"]);
    var CronDayOfMonth = class extends CronField_1.CronField {
      static get min() {
        return MIN_DAY;
      }
      static get max() {
        return MAX_DAY;
      }
      static get chars() {
        return DAY_CHARS;
      }
      static get validChars() {
        return /^[?,*\dLH/-]+$|^.*H\(\d+-\d+\)\/\d+.*$|^.*H\(\d+-\d+\).*$|^.*H\/\d+.*$/;
      }
      /**
       * CronDayOfMonth constructor. Initializes the "day of the month" field with the provided values.
       * @param {DayOfMonthRange[]} values - Values for the "day of the month" field
       * @param {CronFieldOptions} [options] - Options provided by the parser
       * @throws {Error} if validation fails
       */
      constructor(values, options) {
        super(values, options);
        this.validate();
      }
      /**
       * Returns an array of allowed values for the "day of the month" field.
       * @returns {DayOfMonthRange[]}
       */
      get values() {
        return super.values;
      }
    };
    exports2.CronDayOfMonth = CronDayOfMonth;
  }
});

// ../../node_modules/cron-parser/dist/fields/CronDayOfWeek.js
var require_CronDayOfWeek = __commonJS({
  "../../node_modules/cron-parser/dist/fields/CronDayOfWeek.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.CronDayOfWeek = void 0;
    var CronField_1 = require_CronField();
    var MIN_DAY = 0;
    var MAX_DAY = 7;
    var DAY_CHARS = Object.freeze(["L"]);
    var CronDayOfWeek = class extends CronField_1.CronField {
      static get min() {
        return MIN_DAY;
      }
      static get max() {
        return MAX_DAY;
      }
      static get chars() {
        return DAY_CHARS;
      }
      static get validChars() {
        return /^[?,*\dLH#/-]+$|^.*H\(\d+-\d+\)\/\d+.*$|^.*H\(\d+-\d+\).*$|^.*H\/\d+.*$/;
      }
      /**
       * CronDayOfTheWeek constructor. Initializes the "day of the week" field with the provided values.
       * @param {DayOfWeekRange[]} values - Values for the "day of the week" field
       * @param {CronFieldOptions} [options] - Options provided by the parser
       */
      constructor(values, options) {
        super(values, options);
        this.validate();
      }
      /**
       * Returns an array of allowed values for the "day of the week" field.
       * @returns {DayOfWeekRange[]}
       */
      get values() {
        return super.values;
      }
      /**
       * Returns the nth day of the week if specified in the cron expression.
       * This is used for the '#' character in the cron expression.
       * @returns {number} The nth day of the week (1-5) or 0 if not specified.
       */
      get nthDay() {
        return this.options.nthDayOfWeek ?? 0;
      }
    };
    exports2.CronDayOfWeek = CronDayOfWeek;
  }
});

// ../../node_modules/cron-parser/dist/fields/CronHour.js
var require_CronHour = __commonJS({
  "../../node_modules/cron-parser/dist/fields/CronHour.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.CronHour = void 0;
    var CronField_1 = require_CronField();
    var MIN_HOUR = 0;
    var MAX_HOUR = 23;
    var HOUR_CHARS = Object.freeze([]);
    var CronHour = class extends CronField_1.CronField {
      static get min() {
        return MIN_HOUR;
      }
      static get max() {
        return MAX_HOUR;
      }
      static get chars() {
        return HOUR_CHARS;
      }
      /**
       * CronHour constructor. Initializes the "hour" field with the provided values.
       * @param {HourRange[]} values - Values for the "hour" field
       * @param {CronFieldOptions} [options] - Options provided by the parser
       */
      constructor(values, options) {
        super(values, options);
        this.validate();
      }
      /**
       * Returns an array of allowed values for the "hour" field.
       * @returns {HourRange[]}
       */
      get values() {
        return super.values;
      }
    };
    exports2.CronHour = CronHour;
  }
});

// ../../node_modules/cron-parser/dist/fields/CronMinute.js
var require_CronMinute = __commonJS({
  "../../node_modules/cron-parser/dist/fields/CronMinute.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.CronMinute = void 0;
    var CronField_1 = require_CronField();
    var MIN_MINUTE = 0;
    var MAX_MINUTE = 59;
    var MINUTE_CHARS = Object.freeze([]);
    var CronMinute = class extends CronField_1.CronField {
      static get min() {
        return MIN_MINUTE;
      }
      static get max() {
        return MAX_MINUTE;
      }
      static get chars() {
        return MINUTE_CHARS;
      }
      /**
       * CronSecond constructor. Initializes the "second" field with the provided values.
       * @param {SixtyRange[]} values - Values for the "second" field
       * @param {CronFieldOptions} [options] - Options provided by the parser
       */
      constructor(values, options) {
        super(values, options);
        this.validate();
      }
      /**
       * Returns an array of allowed values for the "second" field.
       * @returns {SixtyRange[]}
       */
      get values() {
        return super.values;
      }
    };
    exports2.CronMinute = CronMinute;
  }
});

// ../../node_modules/luxon/build/node/luxon.js
var require_luxon = __commonJS({
  "../../node_modules/luxon/build/node/luxon.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    var LuxonError = class extends Error {
    };
    var InvalidDateTimeError = class extends LuxonError {
      constructor(reason) {
        super(`Invalid DateTime: ${reason.toMessage()}`);
      }
    };
    var InvalidIntervalError = class extends LuxonError {
      constructor(reason) {
        super(`Invalid Interval: ${reason.toMessage()}`);
      }
    };
    var InvalidDurationError = class extends LuxonError {
      constructor(reason) {
        super(`Invalid Duration: ${reason.toMessage()}`);
      }
    };
    var ConflictingSpecificationError = class extends LuxonError {
    };
    var InvalidUnitError = class extends LuxonError {
      constructor(unit) {
        super(`Invalid unit ${unit}`);
      }
    };
    var InvalidArgumentError = class extends LuxonError {
    };
    var ZoneIsAbstractError = class extends LuxonError {
      constructor() {
        super("Zone is an abstract class");
      }
    };
    var n = "numeric";
    var s = "short";
    var l = "long";
    var DATE_SHORT = {
      year: n,
      month: n,
      day: n
    };
    var DATE_MED = {
      year: n,
      month: s,
      day: n
    };
    var DATE_MED_WITH_WEEKDAY = {
      year: n,
      month: s,
      day: n,
      weekday: s
    };
    var DATE_FULL = {
      year: n,
      month: l,
      day: n
    };
    var DATE_HUGE = {
      year: n,
      month: l,
      day: n,
      weekday: l
    };
    var TIME_SIMPLE = {
      hour: n,
      minute: n
    };
    var TIME_WITH_SECONDS = {
      hour: n,
      minute: n,
      second: n
    };
    var TIME_WITH_SHORT_OFFSET = {
      hour: n,
      minute: n,
      second: n,
      timeZoneName: s
    };
    var TIME_WITH_LONG_OFFSET = {
      hour: n,
      minute: n,
      second: n,
      timeZoneName: l
    };
    var TIME_24_SIMPLE = {
      hour: n,
      minute: n,
      hourCycle: "h23"
    };
    var TIME_24_WITH_SECONDS = {
      hour: n,
      minute: n,
      second: n,
      hourCycle: "h23"
    };
    var TIME_24_WITH_SHORT_OFFSET = {
      hour: n,
      minute: n,
      second: n,
      hourCycle: "h23",
      timeZoneName: s
    };
    var TIME_24_WITH_LONG_OFFSET = {
      hour: n,
      minute: n,
      second: n,
      hourCycle: "h23",
      timeZoneName: l
    };
    var DATETIME_SHORT = {
      year: n,
      month: n,
      day: n,
      hour: n,
      minute: n
    };
    var DATETIME_SHORT_WITH_SECONDS = {
      year: n,
      month: n,
      day: n,
      hour: n,
      minute: n,
      second: n
    };
    var DATETIME_MED = {
      year: n,
      month: s,
      day: n,
      hour: n,
      minute: n
    };
    var DATETIME_MED_WITH_SECONDS = {
      year: n,
      month: s,
      day: n,
      hour: n,
      minute: n,
      second: n
    };
    var DATETIME_MED_WITH_WEEKDAY = {
      year: n,
      month: s,
      day: n,
      weekday: s,
      hour: n,
      minute: n
    };
    var DATETIME_FULL = {
      year: n,
      month: l,
      day: n,
      hour: n,
      minute: n,
      timeZoneName: s
    };
    var DATETIME_FULL_WITH_SECONDS = {
      year: n,
      month: l,
      day: n,
      hour: n,
      minute: n,
      second: n,
      timeZoneName: s
    };
    var DATETIME_HUGE = {
      year: n,
      month: l,
      day: n,
      weekday: l,
      hour: n,
      minute: n,
      timeZoneName: l
    };
    var DATETIME_HUGE_WITH_SECONDS = {
      year: n,
      month: l,
      day: n,
      weekday: l,
      hour: n,
      minute: n,
      second: n,
      timeZoneName: l
    };
    var Zone = class {
      /**
       * The type of zone
       * @abstract
       * @type {string}
       */
      get type() {
        throw new ZoneIsAbstractError();
      }
      /**
       * The name of this zone.
       * @abstract
       * @type {string}
       */
      get name() {
        throw new ZoneIsAbstractError();
      }
      /**
       * The IANA name of this zone.
       * Defaults to `name` if not overwritten by a subclass.
       * @abstract
       * @type {string}
       */
      get ianaName() {
        return this.name;
      }
      /**
       * Returns whether the offset is known to be fixed for the whole year.
       * @abstract
       * @type {boolean}
       */
      get isUniversal() {
        throw new ZoneIsAbstractError();
      }
      /**
       * Returns the offset's common name (such as EST) at the specified timestamp
       * @abstract
       * @param {number} ts - Epoch milliseconds for which to get the name
       * @param {Object} opts - Options to affect the format
       * @param {string} opts.format - What style of offset to return. Accepts 'long' or 'short'.
       * @param {string} opts.locale - What locale to return the offset name in.
       * @return {string}
       */
      offsetName(ts, opts) {
        throw new ZoneIsAbstractError();
      }
      /**
       * Returns the offset's value as a string
       * @abstract
       * @param {number} ts - Epoch milliseconds for which to get the offset
       * @param {string} format - What style of offset to return.
       *                          Accepts 'narrow', 'short', or 'techie'. Returning '+6', '+06:00', or '+0600' respectively
       * @return {string}
       */
      formatOffset(ts, format) {
        throw new ZoneIsAbstractError();
      }
      /**
       * Return the offset in minutes for this zone at the specified timestamp.
       * @abstract
       * @param {number} ts - Epoch milliseconds for which to compute the offset
       * @return {number}
       */
      offset(ts) {
        throw new ZoneIsAbstractError();
      }
      /**
       * Return whether this Zone is equal to another zone
       * @abstract
       * @param {Zone} otherZone - the zone to compare
       * @return {boolean}
       */
      equals(otherZone) {
        throw new ZoneIsAbstractError();
      }
      /**
       * Return whether this Zone is valid.
       * @abstract
       * @type {boolean}
       */
      get isValid() {
        throw new ZoneIsAbstractError();
      }
    };
    var singleton$1 = null;
    var SystemZone = class _SystemZone extends Zone {
      /**
       * Get a singleton instance of the local zone
       * @return {SystemZone}
       */
      static get instance() {
        if (singleton$1 === null) {
          singleton$1 = new _SystemZone();
        }
        return singleton$1;
      }
      /** @override **/
      get type() {
        return "system";
      }
      /** @override **/
      get name() {
        return new Intl.DateTimeFormat().resolvedOptions().timeZone;
      }
      /** @override **/
      get isUniversal() {
        return false;
      }
      /** @override **/
      offsetName(ts, {
        format,
        locale: locale2
      }) {
        return parseZoneInfo(ts, format, locale2);
      }
      /** @override **/
      formatOffset(ts, format) {
        return formatOffset(this.offset(ts), format);
      }
      /** @override **/
      offset(ts) {
        return -new Date(ts).getTimezoneOffset();
      }
      /** @override **/
      equals(otherZone) {
        return otherZone.type === "system";
      }
      /** @override **/
      get isValid() {
        return true;
      }
    };
    var dtfCache = /* @__PURE__ */ new Map();
    function makeDTF(zoneName) {
      let dtf = dtfCache.get(zoneName);
      if (dtf === void 0) {
        dtf = new Intl.DateTimeFormat("en-US", {
          hour12: false,
          timeZone: zoneName,
          year: "numeric",
          month: "2-digit",
          day: "2-digit",
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          era: "short"
        });
        dtfCache.set(zoneName, dtf);
      }
      return dtf;
    }
    var typeToPos = {
      year: 0,
      month: 1,
      day: 2,
      era: 3,
      hour: 4,
      minute: 5,
      second: 6
    };
    function hackyOffset(dtf, date2) {
      const formatted = dtf.format(date2).replace(/\u200E/g, ""), parsed = /(\d+)\/(\d+)\/(\d+) (AD|BC),? (\d+):(\d+):(\d+)/.exec(formatted), [, fMonth, fDay, fYear, fadOrBc, fHour, fMinute, fSecond] = parsed;
      return [fYear, fMonth, fDay, fadOrBc, fHour, fMinute, fSecond];
    }
    function partsOffset(dtf, date2) {
      const formatted = dtf.formatToParts(date2);
      const filled = [];
      for (let i = 0; i < formatted.length; i++) {
        const {
          type,
          value
        } = formatted[i];
        const pos = typeToPos[type];
        if (type === "era") {
          filled[pos] = value;
        } else if (!isUndefined(pos)) {
          filled[pos] = parseInt(value, 10);
        }
      }
      return filled;
    }
    var ianaZoneCache = /* @__PURE__ */ new Map();
    var IANAZone = class _IANAZone extends Zone {
      /**
       * @param {string} name - Zone name
       * @return {IANAZone}
       */
      static create(name) {
        let zone = ianaZoneCache.get(name);
        if (zone === void 0) {
          ianaZoneCache.set(name, zone = new _IANAZone(name));
        }
        return zone;
      }
      /**
       * Reset local caches. Should only be necessary in testing scenarios.
       * @return {void}
       */
      static resetCache() {
        ianaZoneCache.clear();
        dtfCache.clear();
      }
      /**
       * Returns whether the provided string is a valid specifier. This only checks the string's format, not that the specifier identifies a known zone; see isValidZone for that.
       * @param {string} s - The string to check validity on
       * @example IANAZone.isValidSpecifier("America/New_York") //=> true
       * @example IANAZone.isValidSpecifier("Sport~~blorp") //=> false
       * @deprecated For backward compatibility, this forwards to isValidZone, better use `isValidZone()` directly instead.
       * @return {boolean}
       */
      static isValidSpecifier(s2) {
        return this.isValidZone(s2);
      }
      /**
       * Returns whether the provided string identifies a real zone
       * @param {string} zone - The string to check
       * @example IANAZone.isValidZone("America/New_York") //=> true
       * @example IANAZone.isValidZone("Fantasia/Castle") //=> false
       * @example IANAZone.isValidZone("Sport~~blorp") //=> false
       * @return {boolean}
       */
      static isValidZone(zone) {
        if (!zone) {
          return false;
        }
        try {
          new Intl.DateTimeFormat("en-US", {
            timeZone: zone
          }).format();
          return true;
        } catch (e) {
          return false;
        }
      }
      constructor(name) {
        super();
        this.zoneName = name;
        this.valid = _IANAZone.isValidZone(name);
      }
      /**
       * The type of zone. `iana` for all instances of `IANAZone`.
       * @override
       * @type {string}
       */
      get type() {
        return "iana";
      }
      /**
       * The name of this zone (i.e. the IANA zone name).
       * @override
       * @type {string}
       */
      get name() {
        return this.zoneName;
      }
      /**
       * Returns whether the offset is known to be fixed for the whole year:
       * Always returns false for all IANA zones.
       * @override
       * @type {boolean}
       */
      get isUniversal() {
        return false;
      }
      /**
       * Returns the offset's common name (such as EST) at the specified timestamp
       * @override
       * @param {number} ts - Epoch milliseconds for which to get the name
       * @param {Object} opts - Options to affect the format
       * @param {string} opts.format - What style of offset to return. Accepts 'long' or 'short'.
       * @param {string} opts.locale - What locale to return the offset name in.
       * @return {string}
       */
      offsetName(ts, {
        format,
        locale: locale2
      }) {
        return parseZoneInfo(ts, format, locale2, this.name);
      }
      /**
       * Returns the offset's value as a string
       * @override
       * @param {number} ts - Epoch milliseconds for which to get the offset
       * @param {string} format - What style of offset to return.
       *                          Accepts 'narrow', 'short', or 'techie'. Returning '+6', '+06:00', or '+0600' respectively
       * @return {string}
       */
      formatOffset(ts, format) {
        return formatOffset(this.offset(ts), format);
      }
      /**
       * Return the offset in minutes for this zone at the specified timestamp.
       * @override
       * @param {number} ts - Epoch milliseconds for which to compute the offset
       * @return {number}
       */
      offset(ts) {
        if (!this.valid) return NaN;
        const date2 = new Date(ts);
        if (isNaN(date2)) return NaN;
        const dtf = makeDTF(this.name);
        let [year, month, day, adOrBc, hour, minute, second] = dtf.formatToParts ? partsOffset(dtf, date2) : hackyOffset(dtf, date2);
        if (adOrBc === "BC") {
          year = -Math.abs(year) + 1;
        }
        const adjustedHour = hour === 24 ? 0 : hour;
        const asUTC = objToLocalTS({
          year,
          month,
          day,
          hour: adjustedHour,
          minute,
          second,
          millisecond: 0
        });
        let asTS = +date2;
        const over = asTS % 1e3;
        asTS -= over >= 0 ? over : 1e3 + over;
        return (asUTC - asTS) / (60 * 1e3);
      }
      /**
       * Return whether this Zone is equal to another zone
       * @override
       * @param {Zone} otherZone - the zone to compare
       * @return {boolean}
       */
      equals(otherZone) {
        return otherZone.type === "iana" && otherZone.name === this.name;
      }
      /**
       * Return whether this Zone is valid.
       * @override
       * @type {boolean}
       */
      get isValid() {
        return this.valid;
      }
    };
    var intlLFCache = {};
    function getCachedLF(locString, opts = {}) {
      const key = JSON.stringify([locString, opts]);
      let dtf = intlLFCache[key];
      if (!dtf) {
        dtf = new Intl.ListFormat(locString, opts);
        intlLFCache[key] = dtf;
      }
      return dtf;
    }
    var intlDTCache = /* @__PURE__ */ new Map();
    function getCachedDTF(locString, opts = {}) {
      const key = JSON.stringify([locString, opts]);
      let dtf = intlDTCache.get(key);
      if (dtf === void 0) {
        dtf = new Intl.DateTimeFormat(locString, opts);
        intlDTCache.set(key, dtf);
      }
      return dtf;
    }
    var intlNumCache = /* @__PURE__ */ new Map();
    function getCachedINF(locString, opts = {}) {
      const key = JSON.stringify([locString, opts]);
      let inf = intlNumCache.get(key);
      if (inf === void 0) {
        inf = new Intl.NumberFormat(locString, opts);
        intlNumCache.set(key, inf);
      }
      return inf;
    }
    var intlRelCache = /* @__PURE__ */ new Map();
    function getCachedRTF(locString, opts = {}) {
      const {
        base,
        ...cacheKeyOpts
      } = opts;
      const key = JSON.stringify([locString, cacheKeyOpts]);
      let inf = intlRelCache.get(key);
      if (inf === void 0) {
        inf = new Intl.RelativeTimeFormat(locString, opts);
        intlRelCache.set(key, inf);
      }
      return inf;
    }
    var sysLocaleCache = null;
    function systemLocale() {
      if (sysLocaleCache) {
        return sysLocaleCache;
      } else {
        sysLocaleCache = new Intl.DateTimeFormat().resolvedOptions().locale;
        return sysLocaleCache;
      }
    }
    var intlResolvedOptionsCache = /* @__PURE__ */ new Map();
    function getCachedIntResolvedOptions(locString) {
      let opts = intlResolvedOptionsCache.get(locString);
      if (opts === void 0) {
        opts = new Intl.DateTimeFormat(locString).resolvedOptions();
        intlResolvedOptionsCache.set(locString, opts);
      }
      return opts;
    }
    var weekInfoCache = /* @__PURE__ */ new Map();
    function getCachedWeekInfo(locString) {
      let data = weekInfoCache.get(locString);
      if (!data) {
        const locale2 = new Intl.Locale(locString);
        data = "getWeekInfo" in locale2 ? locale2.getWeekInfo() : locale2.weekInfo;
        if (!("minimalDays" in data)) {
          data = {
            ...fallbackWeekSettings,
            ...data
          };
        }
        weekInfoCache.set(locString, data);
      }
      return data;
    }
    function parseLocaleString(localeStr) {
      const xIndex = localeStr.indexOf("-x-");
      if (xIndex !== -1) {
        localeStr = localeStr.substring(0, xIndex);
      }
      const uIndex = localeStr.indexOf("-u-");
      if (uIndex === -1) {
        return [localeStr];
      } else {
        let options;
        let selectedStr;
        try {
          options = getCachedDTF(localeStr).resolvedOptions();
          selectedStr = localeStr;
        } catch (e) {
          const smaller = localeStr.substring(0, uIndex);
          options = getCachedDTF(smaller).resolvedOptions();
          selectedStr = smaller;
        }
        const {
          numberingSystem,
          calendar
        } = options;
        return [selectedStr, numberingSystem, calendar];
      }
    }
    function intlConfigString(localeStr, numberingSystem, outputCalendar) {
      if (outputCalendar || numberingSystem) {
        if (!localeStr.includes("-u-")) {
          localeStr += "-u";
        }
        if (outputCalendar) {
          localeStr += `-ca-${outputCalendar}`;
        }
        if (numberingSystem) {
          localeStr += `-nu-${numberingSystem}`;
        }
        return localeStr;
      } else {
        return localeStr;
      }
    }
    function mapMonths(f) {
      const ms = [];
      for (let i = 1; i <= 12; i++) {
        const dt = DateTime.utc(2009, i, 1);
        ms.push(f(dt));
      }
      return ms;
    }
    function mapWeekdays(f) {
      const ms = [];
      for (let i = 1; i <= 7; i++) {
        const dt = DateTime.utc(2016, 11, 13 + i);
        ms.push(f(dt));
      }
      return ms;
    }
    function listStuff(loc, length, englishFn, intlFn) {
      const mode = loc.listingMode();
      if (mode === "error") {
        return null;
      } else if (mode === "en") {
        return englishFn(length);
      } else {
        return intlFn(length);
      }
    }
    function supportsFastNumbers(loc) {
      if (loc.numberingSystem && loc.numberingSystem !== "latn") {
        return false;
      } else {
        return loc.numberingSystem === "latn" || !loc.locale || loc.locale.startsWith("en") || getCachedIntResolvedOptions(loc.locale).numberingSystem === "latn";
      }
    }
    var PolyNumberFormatter = class {
      constructor(intl, forceSimple, opts) {
        this.padTo = opts.padTo || 0;
        this.floor = opts.floor || false;
        const {
          padTo,
          floor,
          ...otherOpts
        } = opts;
        if (!forceSimple || Object.keys(otherOpts).length > 0) {
          const intlOpts = {
            useGrouping: false,
            ...opts
          };
          if (opts.padTo > 0) intlOpts.minimumIntegerDigits = opts.padTo;
          this.inf = getCachedINF(intl, intlOpts);
        }
      }
      format(i) {
        if (this.inf) {
          const fixed = this.floor ? Math.floor(i) : i;
          return this.inf.format(fixed);
        } else {
          const fixed = this.floor ? Math.floor(i) : roundTo(i, 3);
          return padStart(fixed, this.padTo);
        }
      }
    };
    var PolyDateFormatter = class {
      constructor(dt, intl, opts) {
        this.opts = opts;
        this.originalZone = void 0;
        let z = void 0;
        if (this.opts.timeZone) {
          this.dt = dt;
        } else if (dt.zone.type === "fixed") {
          const gmtOffset = -1 * (dt.offset / 60);
          const offsetZ = gmtOffset >= 0 ? `Etc/GMT+${gmtOffset}` : `Etc/GMT${gmtOffset}`;
          if (dt.offset !== 0 && IANAZone.create(offsetZ).valid) {
            z = offsetZ;
            this.dt = dt;
          } else {
            z = "UTC";
            this.dt = dt.offset === 0 ? dt : dt.setZone("UTC").plus({
              minutes: dt.offset
            });
            this.originalZone = dt.zone;
          }
        } else if (dt.zone.type === "system") {
          this.dt = dt;
        } else if (dt.zone.type === "iana") {
          this.dt = dt;
          z = dt.zone.name;
        } else {
          z = "UTC";
          this.dt = dt.setZone("UTC").plus({
            minutes: dt.offset
          });
          this.originalZone = dt.zone;
        }
        const intlOpts = {
          ...this.opts
        };
        intlOpts.timeZone = intlOpts.timeZone || z;
        this.dtf = getCachedDTF(intl, intlOpts);
      }
      format() {
        if (this.originalZone) {
          return this.formatToParts().map(({
            value
          }) => value).join("");
        }
        return this.dtf.format(this.dt.toJSDate());
      }
      formatToParts() {
        const parts = this.dtf.formatToParts(this.dt.toJSDate());
        if (this.originalZone) {
          return parts.map((part) => {
            if (part.type === "timeZoneName") {
              const offsetName = this.originalZone.offsetName(this.dt.ts, {
                locale: this.dt.locale,
                format: this.opts.timeZoneName
              });
              return {
                ...part,
                value: offsetName
              };
            } else {
              return part;
            }
          });
        }
        return parts;
      }
      resolvedOptions() {
        return this.dtf.resolvedOptions();
      }
    };
    var PolyRelFormatter = class {
      constructor(intl, isEnglish, opts) {
        this.opts = {
          style: "long",
          ...opts
        };
        if (!isEnglish && hasRelative()) {
          this.rtf = getCachedRTF(intl, opts);
        }
      }
      format(count, unit) {
        if (this.rtf) {
          return this.rtf.format(count, unit);
        } else {
          return formatRelativeTime(unit, count, this.opts.numeric, this.opts.style !== "long");
        }
      }
      formatToParts(count, unit) {
        if (this.rtf) {
          return this.rtf.formatToParts(count, unit);
        } else {
          return [];
        }
      }
    };
    var fallbackWeekSettings = {
      firstDay: 1,
      minimalDays: 4,
      weekend: [6, 7]
    };
    var Locale = class _Locale {
      static fromOpts(opts) {
        return _Locale.create(opts.locale, opts.numberingSystem, opts.outputCalendar, opts.weekSettings, opts.defaultToEN);
      }
      static create(locale2, numberingSystem, outputCalendar, weekSettings, defaultToEN = false) {
        const specifiedLocale = locale2 || Settings.defaultLocale;
        const localeR = specifiedLocale || (defaultToEN ? "en-US" : systemLocale());
        const numberingSystemR = numberingSystem || Settings.defaultNumberingSystem;
        const outputCalendarR = outputCalendar || Settings.defaultOutputCalendar;
        const weekSettingsR = validateWeekSettings(weekSettings) || Settings.defaultWeekSettings;
        return new _Locale(localeR, numberingSystemR, outputCalendarR, weekSettingsR, specifiedLocale);
      }
      static resetCache() {
        sysLocaleCache = null;
        intlDTCache.clear();
        intlNumCache.clear();
        intlRelCache.clear();
        intlResolvedOptionsCache.clear();
        weekInfoCache.clear();
      }
      static fromObject({
        locale: locale2,
        numberingSystem,
        outputCalendar,
        weekSettings
      } = {}) {
        return _Locale.create(locale2, numberingSystem, outputCalendar, weekSettings);
      }
      constructor(locale2, numbering, outputCalendar, weekSettings, specifiedLocale) {
        const [parsedLocale, parsedNumberingSystem, parsedOutputCalendar] = parseLocaleString(locale2);
        this.locale = parsedLocale;
        this.numberingSystem = numbering || parsedNumberingSystem || null;
        this.outputCalendar = outputCalendar || parsedOutputCalendar || null;
        this.weekSettings = weekSettings;
        this.intl = intlConfigString(this.locale, this.numberingSystem, this.outputCalendar);
        this.weekdaysCache = {
          format: {},
          standalone: {}
        };
        this.monthsCache = {
          format: {},
          standalone: {}
        };
        this.meridiemCache = null;
        this.eraCache = {};
        this.specifiedLocale = specifiedLocale;
        this.fastNumbersCached = null;
      }
      get fastNumbers() {
        if (this.fastNumbersCached == null) {
          this.fastNumbersCached = supportsFastNumbers(this);
        }
        return this.fastNumbersCached;
      }
      listingMode() {
        const isActuallyEn = this.isEnglish();
        const hasNoWeirdness = (this.numberingSystem === null || this.numberingSystem === "latn") && (this.outputCalendar === null || this.outputCalendar === "gregory");
        return isActuallyEn && hasNoWeirdness ? "en" : "intl";
      }
      clone(alts) {
        if (!alts || Object.getOwnPropertyNames(alts).length === 0) {
          return this;
        } else {
          return _Locale.create(alts.locale || this.specifiedLocale, alts.numberingSystem || this.numberingSystem, alts.outputCalendar || this.outputCalendar, validateWeekSettings(alts.weekSettings) || this.weekSettings, alts.defaultToEN || false);
        }
      }
      redefaultToEN(alts = {}) {
        return this.clone({
          ...alts,
          defaultToEN: true
        });
      }
      redefaultToSystem(alts = {}) {
        return this.clone({
          ...alts,
          defaultToEN: false
        });
      }
      months(length, format = false) {
        return listStuff(this, length, months, () => {
          const monthSpecialCase = this.intl === "ja" || this.intl.startsWith("ja-");
          format &= !monthSpecialCase;
          const intl = format ? {
            month: length,
            day: "numeric"
          } : {
            month: length
          }, formatStr = format ? "format" : "standalone";
          if (!this.monthsCache[formatStr][length]) {
            const mapper = !monthSpecialCase ? (dt) => this.extract(dt, intl, "month") : (dt) => this.dtFormatter(dt, intl).format();
            this.monthsCache[formatStr][length] = mapMonths(mapper);
          }
          return this.monthsCache[formatStr][length];
        });
      }
      weekdays(length, format = false) {
        return listStuff(this, length, weekdays, () => {
          const intl = format ? {
            weekday: length,
            year: "numeric",
            month: "long",
            day: "numeric"
          } : {
            weekday: length
          }, formatStr = format ? "format" : "standalone";
          if (!this.weekdaysCache[formatStr][length]) {
            this.weekdaysCache[formatStr][length] = mapWeekdays((dt) => this.extract(dt, intl, "weekday"));
          }
          return this.weekdaysCache[formatStr][length];
        });
      }
      meridiems() {
        return listStuff(this, void 0, () => meridiems, () => {
          if (!this.meridiemCache) {
            const intl = {
              hour: "numeric",
              hourCycle: "h12"
            };
            this.meridiemCache = [DateTime.utc(2016, 11, 13, 9), DateTime.utc(2016, 11, 13, 19)].map((dt) => this.extract(dt, intl, "dayperiod"));
          }
          return this.meridiemCache;
        });
      }
      eras(length) {
        return listStuff(this, length, eras, () => {
          const intl = {
            era: length
          };
          if (!this.eraCache[length]) {
            this.eraCache[length] = [DateTime.utc(-40, 1, 1), DateTime.utc(2017, 1, 1)].map((dt) => this.extract(dt, intl, "era"));
          }
          return this.eraCache[length];
        });
      }
      extract(dt, intlOpts, field) {
        const df = this.dtFormatter(dt, intlOpts), results = df.formatToParts(), matching = results.find((m) => m.type.toLowerCase() === field);
        return matching ? matching.value : null;
      }
      numberFormatter(opts = {}) {
        return new PolyNumberFormatter(this.intl, opts.forceSimple || this.fastNumbers, opts);
      }
      dtFormatter(dt, intlOpts = {}) {
        return new PolyDateFormatter(dt, this.intl, intlOpts);
      }
      relFormatter(opts = {}) {
        return new PolyRelFormatter(this.intl, this.isEnglish(), opts);
      }
      listFormatter(opts = {}) {
        return getCachedLF(this.intl, opts);
      }
      isEnglish() {
        return this.locale === "en" || this.locale.toLowerCase() === "en-us" || getCachedIntResolvedOptions(this.intl).locale.startsWith("en-us");
      }
      getWeekSettings() {
        if (this.weekSettings) {
          return this.weekSettings;
        } else if (!hasLocaleWeekInfo()) {
          return fallbackWeekSettings;
        } else {
          return getCachedWeekInfo(this.locale);
        }
      }
      getStartOfWeek() {
        return this.getWeekSettings().firstDay;
      }
      getMinDaysInFirstWeek() {
        return this.getWeekSettings().minimalDays;
      }
      getWeekendDays() {
        return this.getWeekSettings().weekend;
      }
      equals(other) {
        return this.locale === other.locale && this.numberingSystem === other.numberingSystem && this.outputCalendar === other.outputCalendar;
      }
      toString() {
        return `Locale(${this.locale}, ${this.numberingSystem}, ${this.outputCalendar})`;
      }
    };
    var singleton = null;
    var FixedOffsetZone = class _FixedOffsetZone extends Zone {
      /**
       * Get a singleton instance of UTC
       * @return {FixedOffsetZone}
       */
      static get utcInstance() {
        if (singleton === null) {
          singleton = new _FixedOffsetZone(0);
        }
        return singleton;
      }
      /**
       * Get an instance with a specified offset
       * @param {number} offset - The offset in minutes
       * @return {FixedOffsetZone}
       */
      static instance(offset2) {
        return offset2 === 0 ? _FixedOffsetZone.utcInstance : new _FixedOffsetZone(offset2);
      }
      /**
       * Get an instance of FixedOffsetZone from a UTC offset string, like "UTC+6"
       * @param {string} s - The offset string to parse
       * @example FixedOffsetZone.parseSpecifier("UTC+6")
       * @example FixedOffsetZone.parseSpecifier("UTC+06")
       * @example FixedOffsetZone.parseSpecifier("UTC-6:00")
       * @return {FixedOffsetZone}
       */
      static parseSpecifier(s2) {
        if (s2) {
          const r = s2.match(/^utc(?:([+-]\d{1,2})(?::(\d{2}))?)?$/i);
          if (r) {
            return new _FixedOffsetZone(signedOffset(r[1], r[2]));
          }
        }
        return null;
      }
      constructor(offset2) {
        super();
        this.fixed = offset2;
      }
      /**
       * The type of zone. `fixed` for all instances of `FixedOffsetZone`.
       * @override
       * @type {string}
       */
      get type() {
        return "fixed";
      }
      /**
       * The name of this zone.
       * All fixed zones' names always start with "UTC" (plus optional offset)
       * @override
       * @type {string}
       */
      get name() {
        return this.fixed === 0 ? "UTC" : `UTC${formatOffset(this.fixed, "narrow")}`;
      }
      /**
       * The IANA name of this zone, i.e. `Etc/UTC` or `Etc/GMT+/-nn`
       *
       * @override
       * @type {string}
       */
      get ianaName() {
        if (this.fixed === 0) {
          return "Etc/UTC";
        } else {
          return `Etc/GMT${formatOffset(-this.fixed, "narrow")}`;
        }
      }
      /**
       * Returns the offset's common name at the specified timestamp.
       *
       * For fixed offset zones this equals to the zone name.
       * @override
       */
      offsetName() {
        return this.name;
      }
      /**
       * Returns the offset's value as a string
       * @override
       * @param {number} ts - Epoch milliseconds for which to get the offset
       * @param {string} format - What style of offset to return.
       *                          Accepts 'narrow', 'short', or 'techie'. Returning '+6', '+06:00', or '+0600' respectively
       * @return {string}
       */
      formatOffset(ts, format) {
        return formatOffset(this.fixed, format);
      }
      /**
       * Returns whether the offset is known to be fixed for the whole year:
       * Always returns true for all fixed offset zones.
       * @override
       * @type {boolean}
       */
      get isUniversal() {
        return true;
      }
      /**
       * Return the offset in minutes for this zone at the specified timestamp.
       *
       * For fixed offset zones, this is constant and does not depend on a timestamp.
       * @override
       * @return {number}
       */
      offset() {
        return this.fixed;
      }
      /**
       * Return whether this Zone is equal to another zone (i.e. also fixed and same offset)
       * @override
       * @param {Zone} otherZone - the zone to compare
       * @return {boolean}
       */
      equals(otherZone) {
        return otherZone.type === "fixed" && otherZone.fixed === this.fixed;
      }
      /**
       * Return whether this Zone is valid:
       * All fixed offset zones are valid.
       * @override
       * @type {boolean}
       */
      get isValid() {
        return true;
      }
    };
    var InvalidZone = class extends Zone {
      constructor(zoneName) {
        super();
        this.zoneName = zoneName;
      }
      /** @override **/
      get type() {
        return "invalid";
      }
      /** @override **/
      get name() {
        return this.zoneName;
      }
      /** @override **/
      get isUniversal() {
        return false;
      }
      /** @override **/
      offsetName() {
        return null;
      }
      /** @override **/
      formatOffset() {
        return "";
      }
      /** @override **/
      offset() {
        return NaN;
      }
      /** @override **/
      equals() {
        return false;
      }
      /** @override **/
      get isValid() {
        return false;
      }
    };
    function normalizeZone(input, defaultZone2) {
      if (isUndefined(input) || input === null) {
        return defaultZone2;
      } else if (input instanceof Zone) {
        return input;
      } else if (isString(input)) {
        const lowered = input.toLowerCase();
        if (lowered === "default") return defaultZone2;
        else if (lowered === "local" || lowered === "system") return SystemZone.instance;
        else if (lowered === "utc" || lowered === "gmt") return FixedOffsetZone.utcInstance;
        else return FixedOffsetZone.parseSpecifier(lowered) || IANAZone.create(input);
      } else if (isNumber(input)) {
        return FixedOffsetZone.instance(input);
      } else if (typeof input === "object" && "offset" in input && typeof input.offset === "function") {
        return input;
      } else {
        return new InvalidZone(input);
      }
    }
    var numberingSystems = {
      arab: "[\u0660-\u0669]",
      arabext: "[\u06F0-\u06F9]",
      bali: "[\u1B50-\u1B59]",
      beng: "[\u09E6-\u09EF]",
      deva: "[\u0966-\u096F]",
      fullwide: "[\uFF10-\uFF19]",
      gujr: "[\u0AE6-\u0AEF]",
      hanidec: "[\u3007|\u4E00|\u4E8C|\u4E09|\u56DB|\u4E94|\u516D|\u4E03|\u516B|\u4E5D]",
      khmr: "[\u17E0-\u17E9]",
      knda: "[\u0CE6-\u0CEF]",
      laoo: "[\u0ED0-\u0ED9]",
      limb: "[\u1946-\u194F]",
      mlym: "[\u0D66-\u0D6F]",
      mong: "[\u1810-\u1819]",
      mymr: "[\u1040-\u1049]",
      orya: "[\u0B66-\u0B6F]",
      tamldec: "[\u0BE6-\u0BEF]",
      telu: "[\u0C66-\u0C6F]",
      thai: "[\u0E50-\u0E59]",
      tibt: "[\u0F20-\u0F29]",
      latn: "\\d"
    };
    var numberingSystemsUTF16 = {
      arab: [1632, 1641],
      arabext: [1776, 1785],
      bali: [6992, 7001],
      beng: [2534, 2543],
      deva: [2406, 2415],
      fullwide: [65296, 65303],
      gujr: [2790, 2799],
      khmr: [6112, 6121],
      knda: [3302, 3311],
      laoo: [3792, 3801],
      limb: [6470, 6479],
      mlym: [3430, 3439],
      mong: [6160, 6169],
      mymr: [4160, 4169],
      orya: [2918, 2927],
      tamldec: [3046, 3055],
      telu: [3174, 3183],
      thai: [3664, 3673],
      tibt: [3872, 3881]
    };
    var hanidecChars = numberingSystems.hanidec.replace(/[\[|\]]/g, "").split("");
    function parseDigits(str) {
      let value = parseInt(str, 10);
      if (isNaN(value)) {
        value = "";
        for (let i = 0; i < str.length; i++) {
          const code = str.charCodeAt(i);
          if (str[i].search(numberingSystems.hanidec) !== -1) {
            value += hanidecChars.indexOf(str[i]);
          } else {
            for (const key in numberingSystemsUTF16) {
              const [min, max] = numberingSystemsUTF16[key];
              if (code >= min && code <= max) {
                value += code - min;
              }
            }
          }
        }
        return parseInt(value, 10);
      } else {
        return value;
      }
    }
    var digitRegexCache = /* @__PURE__ */ new Map();
    function resetDigitRegexCache() {
      digitRegexCache.clear();
    }
    function digitRegex({
      numberingSystem
    }, append = "") {
      const ns = numberingSystem || "latn";
      let appendCache = digitRegexCache.get(ns);
      if (appendCache === void 0) {
        appendCache = /* @__PURE__ */ new Map();
        digitRegexCache.set(ns, appendCache);
      }
      let regex = appendCache.get(append);
      if (regex === void 0) {
        regex = new RegExp(`${numberingSystems[ns]}${append}`);
        appendCache.set(append, regex);
      }
      return regex;
    }
    var now = () => Date.now();
    var defaultZone = "system";
    var defaultLocale = null;
    var defaultNumberingSystem = null;
    var defaultOutputCalendar = null;
    var twoDigitCutoffYear = 60;
    var throwOnInvalid;
    var defaultWeekSettings = null;
    var Settings = class {
      /**
       * Get the callback for returning the current timestamp.
       * @type {function}
       */
      static get now() {
        return now;
      }
      /**
       * Set the callback for returning the current timestamp.
       * The function should return a number, which will be interpreted as an Epoch millisecond count
       * @type {function}
       * @example Settings.now = () => Date.now() + 3000 // pretend it is 3 seconds in the future
       * @example Settings.now = () => 0 // always pretend it's Jan 1, 1970 at midnight in UTC time
       */
      static set now(n2) {
        now = n2;
      }
      /**
       * Set the default time zone to create DateTimes in. Does not affect existing instances.
       * Use the value "system" to reset this value to the system's time zone.
       * @type {string}
       */
      static set defaultZone(zone) {
        defaultZone = zone;
      }
      /**
       * Get the default time zone object currently used to create DateTimes. Does not affect existing instances.
       * The default value is the system's time zone (the one set on the machine that runs this code).
       * @type {Zone}
       */
      static get defaultZone() {
        return normalizeZone(defaultZone, SystemZone.instance);
      }
      /**
       * Get the default locale to create DateTimes with. Does not affect existing instances.
       * @type {string}
       */
      static get defaultLocale() {
        return defaultLocale;
      }
      /**
       * Set the default locale to create DateTimes with. Does not affect existing instances.
       * @type {string}
       */
      static set defaultLocale(locale2) {
        defaultLocale = locale2;
      }
      /**
       * Get the default numbering system to create DateTimes with. Does not affect existing instances.
       * @type {string}
       */
      static get defaultNumberingSystem() {
        return defaultNumberingSystem;
      }
      /**
       * Set the default numbering system to create DateTimes with. Does not affect existing instances.
       * @type {string}
       */
      static set defaultNumberingSystem(numberingSystem) {
        defaultNumberingSystem = numberingSystem;
      }
      /**
       * Get the default output calendar to create DateTimes with. Does not affect existing instances.
       * @type {string}
       */
      static get defaultOutputCalendar() {
        return defaultOutputCalendar;
      }
      /**
       * Set the default output calendar to create DateTimes with. Does not affect existing instances.
       * @type {string}
       */
      static set defaultOutputCalendar(outputCalendar) {
        defaultOutputCalendar = outputCalendar;
      }
      /**
       * @typedef {Object} WeekSettings
       * @property {number} firstDay
       * @property {number} minimalDays
       * @property {number[]} weekend
       */
      /**
       * @return {WeekSettings|null}
       */
      static get defaultWeekSettings() {
        return defaultWeekSettings;
      }
      /**
       * Allows overriding the default locale week settings, i.e. the start of the week, the weekend and
       * how many days are required in the first week of a year.
       * Does not affect existing instances.
       *
       * @param {WeekSettings|null} weekSettings
       */
      static set defaultWeekSettings(weekSettings) {
        defaultWeekSettings = validateWeekSettings(weekSettings);
      }
      /**
       * Get the cutoff year for whether a 2-digit year string is interpreted in the current or previous century. Numbers higher than the cutoff will be considered to mean 19xx and numbers lower or equal to the cutoff will be considered 20xx.
       * @type {number}
       */
      static get twoDigitCutoffYear() {
        return twoDigitCutoffYear;
      }
      /**
       * Set the cutoff year for whether a 2-digit year string is interpreted in the current or previous century. Numbers higher than the cutoff will be considered to mean 19xx and numbers lower or equal to the cutoff will be considered 20xx.
       * @type {number}
       * @example Settings.twoDigitCutoffYear = 0 // all 'yy' are interpreted as 20th century
       * @example Settings.twoDigitCutoffYear = 99 // all 'yy' are interpreted as 21st century
       * @example Settings.twoDigitCutoffYear = 50 // '49' -> 2049; '50' -> 1950
       * @example Settings.twoDigitCutoffYear = 1950 // interpreted as 50
       * @example Settings.twoDigitCutoffYear = 2050 // ALSO interpreted as 50
       */
      static set twoDigitCutoffYear(cutoffYear) {
        twoDigitCutoffYear = cutoffYear % 100;
      }
      /**
       * Get whether Luxon will throw when it encounters invalid DateTimes, Durations, or Intervals
       * @type {boolean}
       */
      static get throwOnInvalid() {
        return throwOnInvalid;
      }
      /**
       * Set whether Luxon will throw when it encounters invalid DateTimes, Durations, or Intervals
       * @type {boolean}
       */
      static set throwOnInvalid(t) {
        throwOnInvalid = t;
      }
      /**
       * Reset Luxon's global caches. Should only be necessary in testing scenarios.
       * @return {void}
       */
      static resetCaches() {
        Locale.resetCache();
        IANAZone.resetCache();
        DateTime.resetCache();
        resetDigitRegexCache();
      }
    };
    var Invalid = class {
      constructor(reason, explanation) {
        this.reason = reason;
        this.explanation = explanation;
      }
      toMessage() {
        if (this.explanation) {
          return `${this.reason}: ${this.explanation}`;
        } else {
          return this.reason;
        }
      }
    };
    var nonLeapLadder = [0, 31, 59, 90, 120, 151, 181, 212, 243, 273, 304, 334];
    var leapLadder = [0, 31, 60, 91, 121, 152, 182, 213, 244, 274, 305, 335];
    function unitOutOfRange(unit, value) {
      return new Invalid("unit out of range", `you specified ${value} (of type ${typeof value}) as a ${unit}, which is invalid`);
    }
    function dayOfWeek(year, month, day) {
      const d = new Date(Date.UTC(year, month - 1, day));
      if (year < 100 && year >= 0) {
        d.setUTCFullYear(d.getUTCFullYear() - 1900);
      }
      const js = d.getUTCDay();
      return js === 0 ? 7 : js;
    }
    function computeOrdinal(year, month, day) {
      return day + (isLeapYear(year) ? leapLadder : nonLeapLadder)[month - 1];
    }
    function uncomputeOrdinal(year, ordinal) {
      const table2 = isLeapYear(year) ? leapLadder : nonLeapLadder, month0 = table2.findIndex((i) => i < ordinal), day = ordinal - table2[month0];
      return {
        month: month0 + 1,
        day
      };
    }
    function isoWeekdayToLocal(isoWeekday, startOfWeek) {
      return (isoWeekday - startOfWeek + 7) % 7 + 1;
    }
    function gregorianToWeek(gregObj, minDaysInFirstWeek = 4, startOfWeek = 1) {
      const {
        year,
        month,
        day
      } = gregObj, ordinal = computeOrdinal(year, month, day), weekday = isoWeekdayToLocal(dayOfWeek(year, month, day), startOfWeek);
      let weekNumber = Math.floor((ordinal - weekday + 14 - minDaysInFirstWeek) / 7), weekYear;
      if (weekNumber < 1) {
        weekYear = year - 1;
        weekNumber = weeksInWeekYear(weekYear, minDaysInFirstWeek, startOfWeek);
      } else if (weekNumber > weeksInWeekYear(year, minDaysInFirstWeek, startOfWeek)) {
        weekYear = year + 1;
        weekNumber = 1;
      } else {
        weekYear = year;
      }
      return {
        weekYear,
        weekNumber,
        weekday,
        ...timeObject(gregObj)
      };
    }
    function weekToGregorian(weekData, minDaysInFirstWeek = 4, startOfWeek = 1) {
      const {
        weekYear,
        weekNumber,
        weekday
      } = weekData, weekdayOfJan4 = isoWeekdayToLocal(dayOfWeek(weekYear, 1, minDaysInFirstWeek), startOfWeek), yearInDays = daysInYear(weekYear);
      let ordinal = weekNumber * 7 + weekday - weekdayOfJan4 - 7 + minDaysInFirstWeek, year;
      if (ordinal < 1) {
        year = weekYear - 1;
        ordinal += daysInYear(year);
      } else if (ordinal > yearInDays) {
        year = weekYear + 1;
        ordinal -= daysInYear(weekYear);
      } else {
        year = weekYear;
      }
      const {
        month,
        day
      } = uncomputeOrdinal(year, ordinal);
      return {
        year,
        month,
        day,
        ...timeObject(weekData)
      };
    }
    function gregorianToOrdinal(gregData) {
      const {
        year,
        month,
        day
      } = gregData;
      const ordinal = computeOrdinal(year, month, day);
      return {
        year,
        ordinal,
        ...timeObject(gregData)
      };
    }
    function ordinalToGregorian(ordinalData) {
      const {
        year,
        ordinal
      } = ordinalData;
      const {
        month,
        day
      } = uncomputeOrdinal(year, ordinal);
      return {
        year,
        month,
        day,
        ...timeObject(ordinalData)
      };
    }
    function usesLocalWeekValues(obj, loc) {
      const hasLocaleWeekData = !isUndefined(obj.localWeekday) || !isUndefined(obj.localWeekNumber) || !isUndefined(obj.localWeekYear);
      if (hasLocaleWeekData) {
        const hasIsoWeekData = !isUndefined(obj.weekday) || !isUndefined(obj.weekNumber) || !isUndefined(obj.weekYear);
        if (hasIsoWeekData) {
          throw new ConflictingSpecificationError("Cannot mix locale-based week fields with ISO-based week fields");
        }
        if (!isUndefined(obj.localWeekday)) obj.weekday = obj.localWeekday;
        if (!isUndefined(obj.localWeekNumber)) obj.weekNumber = obj.localWeekNumber;
        if (!isUndefined(obj.localWeekYear)) obj.weekYear = obj.localWeekYear;
        delete obj.localWeekday;
        delete obj.localWeekNumber;
        delete obj.localWeekYear;
        return {
          minDaysInFirstWeek: loc.getMinDaysInFirstWeek(),
          startOfWeek: loc.getStartOfWeek()
        };
      } else {
        return {
          minDaysInFirstWeek: 4,
          startOfWeek: 1
        };
      }
    }
    function hasInvalidWeekData(obj, minDaysInFirstWeek = 4, startOfWeek = 1) {
      const validYear = isInteger(obj.weekYear), validWeek = integerBetween(obj.weekNumber, 1, weeksInWeekYear(obj.weekYear, minDaysInFirstWeek, startOfWeek)), validWeekday = integerBetween(obj.weekday, 1, 7);
      if (!validYear) {
        return unitOutOfRange("weekYear", obj.weekYear);
      } else if (!validWeek) {
        return unitOutOfRange("week", obj.weekNumber);
      } else if (!validWeekday) {
        return unitOutOfRange("weekday", obj.weekday);
      } else return false;
    }
    function hasInvalidOrdinalData(obj) {
      const validYear = isInteger(obj.year), validOrdinal = integerBetween(obj.ordinal, 1, daysInYear(obj.year));
      if (!validYear) {
        return unitOutOfRange("year", obj.year);
      } else if (!validOrdinal) {
        return unitOutOfRange("ordinal", obj.ordinal);
      } else return false;
    }
    function hasInvalidGregorianData(obj) {
      const validYear = isInteger(obj.year), validMonth = integerBetween(obj.month, 1, 12), validDay = integerBetween(obj.day, 1, daysInMonth(obj.year, obj.month));
      if (!validYear) {
        return unitOutOfRange("year", obj.year);
      } else if (!validMonth) {
        return unitOutOfRange("month", obj.month);
      } else if (!validDay) {
        return unitOutOfRange("day", obj.day);
      } else return false;
    }
    function hasInvalidTimeData(obj) {
      const {
        hour,
        minute,
        second,
        millisecond
      } = obj;
      const validHour = integerBetween(hour, 0, 23) || hour === 24 && minute === 0 && second === 0 && millisecond === 0, validMinute = integerBetween(minute, 0, 59), validSecond = integerBetween(second, 0, 59), validMillisecond = integerBetween(millisecond, 0, 999);
      if (!validHour) {
        return unitOutOfRange("hour", hour);
      } else if (!validMinute) {
        return unitOutOfRange("minute", minute);
      } else if (!validSecond) {
        return unitOutOfRange("second", second);
      } else if (!validMillisecond) {
        return unitOutOfRange("millisecond", millisecond);
      } else return false;
    }
    function isUndefined(o) {
      return typeof o === "undefined";
    }
    function isNumber(o) {
      return typeof o === "number";
    }
    function isInteger(o) {
      return typeof o === "number" && o % 1 === 0;
    }
    function isString(o) {
      return typeof o === "string";
    }
    function isDate2(o) {
      return Object.prototype.toString.call(o) === "[object Date]";
    }
    function hasRelative() {
      try {
        return typeof Intl !== "undefined" && !!Intl.RelativeTimeFormat;
      } catch (e) {
        return false;
      }
    }
    function hasLocaleWeekInfo() {
      try {
        return typeof Intl !== "undefined" && !!Intl.Locale && ("weekInfo" in Intl.Locale.prototype || "getWeekInfo" in Intl.Locale.prototype);
      } catch (e) {
        return false;
      }
    }
    function maybeArray(thing) {
      return Array.isArray(thing) ? thing : [thing];
    }
    function bestBy(arr, by, compare) {
      if (arr.length === 0) {
        return void 0;
      }
      return arr.reduce((best, next) => {
        const pair = [by(next), next];
        if (!best) {
          return pair;
        } else if (compare(best[0], pair[0]) === best[0]) {
          return best;
        } else {
          return pair;
        }
      }, null)[1];
    }
    function pick(obj, keys) {
      return keys.reduce((a, k) => {
        a[k] = obj[k];
        return a;
      }, {});
    }
    function hasOwnProperty(obj, prop) {
      return Object.prototype.hasOwnProperty.call(obj, prop);
    }
    function validateWeekSettings(settings) {
      if (settings == null) {
        return null;
      } else if (typeof settings !== "object") {
        throw new InvalidArgumentError("Week settings must be an object");
      } else {
        if (!integerBetween(settings.firstDay, 1, 7) || !integerBetween(settings.minimalDays, 1, 7) || !Array.isArray(settings.weekend) || settings.weekend.some((v) => !integerBetween(v, 1, 7))) {
          throw new InvalidArgumentError("Invalid week settings");
        }
        return {
          firstDay: settings.firstDay,
          minimalDays: settings.minimalDays,
          weekend: Array.from(settings.weekend)
        };
      }
    }
    function integerBetween(thing, bottom, top) {
      return isInteger(thing) && thing >= bottom && thing <= top;
    }
    function floorMod(x, n2) {
      return x - n2 * Math.floor(x / n2);
    }
    function padStart(input, n2 = 2) {
      const isNeg = input < 0;
      let padded;
      if (isNeg) {
        padded = "-" + ("" + -input).padStart(n2, "0");
      } else {
        padded = ("" + input).padStart(n2, "0");
      }
      return padded;
    }
    function parseInteger(string2) {
      if (isUndefined(string2) || string2 === null || string2 === "") {
        return void 0;
      } else {
        return parseInt(string2, 10);
      }
    }
    function parseFloating(string2) {
      if (isUndefined(string2) || string2 === null || string2 === "") {
        return void 0;
      } else {
        return parseFloat(string2);
      }
    }
    function parseMillis(fraction) {
      if (isUndefined(fraction) || fraction === null || fraction === "") {
        return void 0;
      } else {
        const f = parseFloat("0." + fraction) * 1e3;
        return Math.floor(f);
      }
    }
    function roundTo(number2, digits, rounding = "round") {
      const factor = 10 ** digits;
      switch (rounding) {
        case "expand":
          return number2 > 0 ? Math.ceil(number2 * factor) / factor : Math.floor(number2 * factor) / factor;
        case "trunc":
          return Math.trunc(number2 * factor) / factor;
        case "round":
          return Math.round(number2 * factor) / factor;
        case "floor":
          return Math.floor(number2 * factor) / factor;
        case "ceil":
          return Math.ceil(number2 * factor) / factor;
        default:
          throw new RangeError(`Value rounding ${rounding} is out of range`);
      }
    }
    function isLeapYear(year) {
      return year % 4 === 0 && (year % 100 !== 0 || year % 400 === 0);
    }
    function daysInYear(year) {
      return isLeapYear(year) ? 366 : 365;
    }
    function daysInMonth(year, month) {
      const modMonth = floorMod(month - 1, 12) + 1, modYear = year + (month - modMonth) / 12;
      if (modMonth === 2) {
        return isLeapYear(modYear) ? 29 : 28;
      } else {
        return [31, null, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31][modMonth - 1];
      }
    }
    function objToLocalTS(obj) {
      let d = Date.UTC(obj.year, obj.month - 1, obj.day, obj.hour, obj.minute, obj.second, obj.millisecond);
      if (obj.year < 100 && obj.year >= 0) {
        d = new Date(d);
        d.setUTCFullYear(obj.year, obj.month - 1, obj.day);
      }
      return +d;
    }
    function firstWeekOffset(year, minDaysInFirstWeek, startOfWeek) {
      const fwdlw = isoWeekdayToLocal(dayOfWeek(year, 1, minDaysInFirstWeek), startOfWeek);
      return -fwdlw + minDaysInFirstWeek - 1;
    }
    function weeksInWeekYear(weekYear, minDaysInFirstWeek = 4, startOfWeek = 1) {
      const weekOffset = firstWeekOffset(weekYear, minDaysInFirstWeek, startOfWeek);
      const weekOffsetNext = firstWeekOffset(weekYear + 1, minDaysInFirstWeek, startOfWeek);
      return (daysInYear(weekYear) - weekOffset + weekOffsetNext) / 7;
    }
    function untruncateYear(year) {
      if (year > 99) {
        return year;
      } else return year > Settings.twoDigitCutoffYear ? 1900 + year : 2e3 + year;
    }
    function parseZoneInfo(ts, offsetFormat, locale2, timeZone = null) {
      const date2 = new Date(ts), intlOpts = {
        hourCycle: "h23",
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit"
      };
      if (timeZone) {
        intlOpts.timeZone = timeZone;
      }
      const modified = {
        timeZoneName: offsetFormat,
        ...intlOpts
      };
      const parsed = new Intl.DateTimeFormat(locale2, modified).formatToParts(date2).find((m) => m.type.toLowerCase() === "timezonename");
      return parsed ? parsed.value : null;
    }
    function signedOffset(offHourStr, offMinuteStr) {
      let offHour = parseInt(offHourStr, 10);
      if (Number.isNaN(offHour)) {
        offHour = 0;
      }
      const offMin = parseInt(offMinuteStr, 10) || 0, offMinSigned = offHour < 0 || Object.is(offHour, -0) ? -offMin : offMin;
      return offHour * 60 + offMinSigned;
    }
    function asNumber(value) {
      const numericValue = Number(value);
      if (typeof value === "boolean" || value === "" || !Number.isFinite(numericValue)) throw new InvalidArgumentError(`Invalid unit value ${value}`);
      return numericValue;
    }
    function normalizeObject(obj, normalizer) {
      const normalized = {};
      for (const u in obj) {
        if (hasOwnProperty(obj, u)) {
          const v = obj[u];
          if (v === void 0 || v === null) continue;
          normalized[normalizer(u)] = asNumber(v);
        }
      }
      return normalized;
    }
    function formatOffset(offset2, format) {
      const hours = Math.trunc(Math.abs(offset2 / 60)), minutes = Math.trunc(Math.abs(offset2 % 60)), sign = offset2 >= 0 ? "+" : "-";
      switch (format) {
        case "short":
          return `${sign}${padStart(hours, 2)}:${padStart(minutes, 2)}`;
        case "narrow":
          return `${sign}${hours}${minutes > 0 ? `:${minutes}` : ""}`;
        case "techie":
          return `${sign}${padStart(hours, 2)}${padStart(minutes, 2)}`;
        default:
          throw new RangeError(`Value format ${format} is out of range for property format`);
      }
    }
    function timeObject(obj) {
      return pick(obj, ["hour", "minute", "second", "millisecond"]);
    }
    var monthsLong = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    var monthsShort = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    var monthsNarrow = ["J", "F", "M", "A", "M", "J", "J", "A", "S", "O", "N", "D"];
    function months(length) {
      switch (length) {
        case "narrow":
          return [...monthsNarrow];
        case "short":
          return [...monthsShort];
        case "long":
          return [...monthsLong];
        case "numeric":
          return ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"];
        case "2-digit":
          return ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12"];
        default:
          return null;
      }
    }
    var weekdaysLong = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
    var weekdaysShort = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
    var weekdaysNarrow = ["M", "T", "W", "T", "F", "S", "S"];
    function weekdays(length) {
      switch (length) {
        case "narrow":
          return [...weekdaysNarrow];
        case "short":
          return [...weekdaysShort];
        case "long":
          return [...weekdaysLong];
        case "numeric":
          return ["1", "2", "3", "4", "5", "6", "7"];
        default:
          return null;
      }
    }
    var meridiems = ["AM", "PM"];
    var erasLong = ["Before Christ", "Anno Domini"];
    var erasShort = ["BC", "AD"];
    var erasNarrow = ["B", "A"];
    function eras(length) {
      switch (length) {
        case "narrow":
          return [...erasNarrow];
        case "short":
          return [...erasShort];
        case "long":
          return [...erasLong];
        default:
          return null;
      }
    }
    function meridiemForDateTime(dt) {
      return meridiems[dt.hour < 12 ? 0 : 1];
    }
    function weekdayForDateTime(dt, length) {
      return weekdays(length)[dt.weekday - 1];
    }
    function monthForDateTime(dt, length) {
      return months(length)[dt.month - 1];
    }
    function eraForDateTime(dt, length) {
      return eras(length)[dt.year < 0 ? 0 : 1];
    }
    function formatRelativeTime(unit, count, numeric = "always", narrow = false) {
      const units = {
        years: ["year", "yr."],
        quarters: ["quarter", "qtr."],
        months: ["month", "mo."],
        weeks: ["week", "wk."],
        days: ["day", "day", "days"],
        hours: ["hour", "hr."],
        minutes: ["minute", "min."],
        seconds: ["second", "sec."]
      };
      const lastable = ["hours", "minutes", "seconds"].indexOf(unit) === -1;
      if (numeric === "auto" && lastable) {
        const isDay = unit === "days";
        switch (count) {
          case 1:
            return isDay ? "tomorrow" : `next ${units[unit][0]}`;
          case -1:
            return isDay ? "yesterday" : `last ${units[unit][0]}`;
          case 0:
            return isDay ? "today" : `this ${units[unit][0]}`;
        }
      }
      const isInPast = Object.is(count, -0) || count < 0, fmtValue = Math.abs(count), singular = fmtValue === 1, lilUnits = units[unit], fmtUnit = narrow ? singular ? lilUnits[1] : lilUnits[2] || lilUnits[1] : singular ? units[unit][0] : unit;
      return isInPast ? `${fmtValue} ${fmtUnit} ago` : `in ${fmtValue} ${fmtUnit}`;
    }
    function stringifyTokens(splits, tokenToString) {
      let s2 = "";
      for (const token of splits) {
        if (token.literal) {
          s2 += token.val;
        } else {
          s2 += tokenToString(token.val);
        }
      }
      return s2;
    }
    var macroTokenToFormatOpts = {
      D: DATE_SHORT,
      DD: DATE_MED,
      DDD: DATE_FULL,
      DDDD: DATE_HUGE,
      t: TIME_SIMPLE,
      tt: TIME_WITH_SECONDS,
      ttt: TIME_WITH_SHORT_OFFSET,
      tttt: TIME_WITH_LONG_OFFSET,
      T: TIME_24_SIMPLE,
      TT: TIME_24_WITH_SECONDS,
      TTT: TIME_24_WITH_SHORT_OFFSET,
      TTTT: TIME_24_WITH_LONG_OFFSET,
      f: DATETIME_SHORT,
      ff: DATETIME_MED,
      fff: DATETIME_FULL,
      ffff: DATETIME_HUGE,
      F: DATETIME_SHORT_WITH_SECONDS,
      FF: DATETIME_MED_WITH_SECONDS,
      FFF: DATETIME_FULL_WITH_SECONDS,
      FFFF: DATETIME_HUGE_WITH_SECONDS
    };
    var Formatter = class _Formatter {
      static create(locale2, opts = {}) {
        return new _Formatter(locale2, opts);
      }
      static parseFormat(fmt) {
        let current = null, currentFull = "", bracketed = false;
        const splits = [];
        for (let i = 0; i < fmt.length; i++) {
          const c3 = fmt.charAt(i);
          if (c3 === "'") {
            if (currentFull.length > 0 || bracketed) {
              splits.push({
                literal: bracketed || /^\s+$/.test(currentFull),
                val: currentFull === "" ? "'" : currentFull
              });
            }
            current = null;
            currentFull = "";
            bracketed = !bracketed;
          } else if (bracketed) {
            currentFull += c3;
          } else if (c3 === current) {
            currentFull += c3;
          } else {
            if (currentFull.length > 0) {
              splits.push({
                literal: /^\s+$/.test(currentFull),
                val: currentFull
              });
            }
            currentFull = c3;
            current = c3;
          }
        }
        if (currentFull.length > 0) {
          splits.push({
            literal: bracketed || /^\s+$/.test(currentFull),
            val: currentFull
          });
        }
        return splits;
      }
      static macroTokenToFormatOpts(token) {
        return macroTokenToFormatOpts[token];
      }
      constructor(locale2, formatOpts) {
        this.opts = formatOpts;
        this.loc = locale2;
        this.systemLoc = null;
      }
      formatWithSystemDefault(dt, opts) {
        if (this.systemLoc === null) {
          this.systemLoc = this.loc.redefaultToSystem();
        }
        const df = this.systemLoc.dtFormatter(dt, {
          ...this.opts,
          ...opts
        });
        return df.format();
      }
      dtFormatter(dt, opts = {}) {
        return this.loc.dtFormatter(dt, {
          ...this.opts,
          ...opts
        });
      }
      formatDateTime(dt, opts) {
        return this.dtFormatter(dt, opts).format();
      }
      formatDateTimeParts(dt, opts) {
        return this.dtFormatter(dt, opts).formatToParts();
      }
      formatInterval(interval, opts) {
        const df = this.dtFormatter(interval.start, opts);
        return df.dtf.formatRange(interval.start.toJSDate(), interval.end.toJSDate());
      }
      resolvedOptions(dt, opts) {
        return this.dtFormatter(dt, opts).resolvedOptions();
      }
      num(n2, p = 0, signDisplay = void 0) {
        if (this.opts.forceSimple) {
          return padStart(n2, p);
        }
        const opts = {
          ...this.opts
        };
        if (p > 0) {
          opts.padTo = p;
        }
        if (signDisplay) {
          opts.signDisplay = signDisplay;
        }
        return this.loc.numberFormatter(opts).format(n2);
      }
      formatDateTimeFromString(dt, fmt) {
        const knownEnglish = this.loc.listingMode() === "en", useDateTimeFormatter = this.loc.outputCalendar && this.loc.outputCalendar !== "gregory", string2 = (opts, extract) => this.loc.extract(dt, opts, extract), formatOffset2 = (opts) => {
          if (dt.isOffsetFixed && dt.offset === 0 && opts.allowZ) {
            return "Z";
          }
          return dt.isValid ? dt.zone.formatOffset(dt.ts, opts.format) : "";
        }, meridiem = () => knownEnglish ? meridiemForDateTime(dt) : string2({
          hour: "numeric",
          hourCycle: "h12"
        }, "dayperiod"), month = (length, standalone) => knownEnglish ? monthForDateTime(dt, length) : string2(standalone ? {
          month: length
        } : {
          month: length,
          day: "numeric"
        }, "month"), weekday = (length, standalone) => knownEnglish ? weekdayForDateTime(dt, length) : string2(standalone ? {
          weekday: length
        } : {
          weekday: length,
          month: "long",
          day: "numeric"
        }, "weekday"), maybeMacro = (token) => {
          const formatOpts = _Formatter.macroTokenToFormatOpts(token);
          if (formatOpts) {
            return this.formatWithSystemDefault(dt, formatOpts);
          } else {
            return token;
          }
        }, era = (length) => knownEnglish ? eraForDateTime(dt, length) : string2({
          era: length
        }, "era"), tokenToString = (token) => {
          switch (token) {
            // ms
            case "S":
              return this.num(dt.millisecond);
            case "u":
            // falls through
            case "SSS":
              return this.num(dt.millisecond, 3);
            // seconds
            case "s":
              return this.num(dt.second);
            case "ss":
              return this.num(dt.second, 2);
            // fractional seconds
            case "uu":
              return this.num(Math.floor(dt.millisecond / 10), 2);
            case "uuu":
              return this.num(Math.floor(dt.millisecond / 100));
            // minutes
            case "m":
              return this.num(dt.minute);
            case "mm":
              return this.num(dt.minute, 2);
            // hours
            case "h":
              return this.num(dt.hour % 12 === 0 ? 12 : dt.hour % 12);
            case "hh":
              return this.num(dt.hour % 12 === 0 ? 12 : dt.hour % 12, 2);
            case "H":
              return this.num(dt.hour);
            case "HH":
              return this.num(dt.hour, 2);
            // offset
            case "Z":
              return formatOffset2({
                format: "narrow",
                allowZ: this.opts.allowZ
              });
            case "ZZ":
              return formatOffset2({
                format: "short",
                allowZ: this.opts.allowZ
              });
            case "ZZZ":
              return formatOffset2({
                format: "techie",
                allowZ: this.opts.allowZ
              });
            case "ZZZZ":
              return dt.zone.offsetName(dt.ts, {
                format: "short",
                locale: this.loc.locale
              });
            case "ZZZZZ":
              return dt.zone.offsetName(dt.ts, {
                format: "long",
                locale: this.loc.locale
              });
            // zone
            case "z":
              return dt.zoneName;
            // meridiems
            case "a":
              return meridiem();
            // dates
            case "d":
              return useDateTimeFormatter ? string2({
                day: "numeric"
              }, "day") : this.num(dt.day);
            case "dd":
              return useDateTimeFormatter ? string2({
                day: "2-digit"
              }, "day") : this.num(dt.day, 2);
            // weekdays - standalone
            case "c":
              return this.num(dt.weekday);
            case "ccc":
              return weekday("short", true);
            case "cccc":
              return weekday("long", true);
            case "ccccc":
              return weekday("narrow", true);
            // weekdays - format
            case "E":
              return this.num(dt.weekday);
            case "EEE":
              return weekday("short", false);
            case "EEEE":
              return weekday("long", false);
            case "EEEEE":
              return weekday("narrow", false);
            // months - standalone
            case "L":
              return useDateTimeFormatter ? string2({
                month: "numeric",
                day: "numeric"
              }, "month") : this.num(dt.month);
            case "LL":
              return useDateTimeFormatter ? string2({
                month: "2-digit",
                day: "numeric"
              }, "month") : this.num(dt.month, 2);
            case "LLL":
              return month("short", true);
            case "LLLL":
              return month("long", true);
            case "LLLLL":
              return month("narrow", true);
            // months - format
            case "M":
              return useDateTimeFormatter ? string2({
                month: "numeric"
              }, "month") : this.num(dt.month);
            case "MM":
              return useDateTimeFormatter ? string2({
                month: "2-digit"
              }, "month") : this.num(dt.month, 2);
            case "MMM":
              return month("short", false);
            case "MMMM":
              return month("long", false);
            case "MMMMM":
              return month("narrow", false);
            // years
            case "y":
              return useDateTimeFormatter ? string2({
                year: "numeric"
              }, "year") : this.num(dt.year);
            case "yy":
              return useDateTimeFormatter ? string2({
                year: "2-digit"
              }, "year") : this.num(dt.year.toString().slice(-2), 2);
            case "yyyy":
              return useDateTimeFormatter ? string2({
                year: "numeric"
              }, "year") : this.num(dt.year, 4);
            case "yyyyyy":
              return useDateTimeFormatter ? string2({
                year: "numeric"
              }, "year") : this.num(dt.year, 6);
            // eras
            case "G":
              return era("short");
            case "GG":
              return era("long");
            case "GGGGG":
              return era("narrow");
            case "kk":
              return this.num(dt.weekYear.toString().slice(-2), 2);
            case "kkkk":
              return this.num(dt.weekYear, 4);
            case "W":
              return this.num(dt.weekNumber);
            case "WW":
              return this.num(dt.weekNumber, 2);
            case "n":
              return this.num(dt.localWeekNumber);
            case "nn":
              return this.num(dt.localWeekNumber, 2);
            case "ii":
              return this.num(dt.localWeekYear.toString().slice(-2), 2);
            case "iiii":
              return this.num(dt.localWeekYear, 4);
            case "o":
              return this.num(dt.ordinal);
            case "ooo":
              return this.num(dt.ordinal, 3);
            case "q":
              return this.num(dt.quarter);
            case "qq":
              return this.num(dt.quarter, 2);
            case "X":
              return this.num(Math.floor(dt.ts / 1e3));
            case "x":
              return this.num(dt.ts);
            default:
              return maybeMacro(token);
          }
        };
        return stringifyTokens(_Formatter.parseFormat(fmt), tokenToString);
      }
      formatDurationFromString(dur, fmt) {
        const invertLargest = this.opts.signMode === "negativeLargestOnly" ? -1 : 1;
        const tokenToField = (token) => {
          switch (token[0]) {
            case "S":
              return "milliseconds";
            case "s":
              return "seconds";
            case "m":
              return "minutes";
            case "h":
              return "hours";
            case "d":
              return "days";
            case "w":
              return "weeks";
            case "M":
              return "months";
            case "y":
              return "years";
            default:
              return null;
          }
        }, tokenToString = (lildur, info2) => (token) => {
          const mapped = tokenToField(token);
          if (mapped) {
            const inversionFactor = info2.isNegativeDuration && mapped !== info2.largestUnit ? invertLargest : 1;
            let signDisplay;
            if (this.opts.signMode === "negativeLargestOnly" && mapped !== info2.largestUnit) {
              signDisplay = "never";
            } else if (this.opts.signMode === "all") {
              signDisplay = "always";
            } else {
              signDisplay = "auto";
            }
            return this.num(lildur.get(mapped) * inversionFactor, token.length, signDisplay);
          } else {
            return token;
          }
        }, tokens = _Formatter.parseFormat(fmt), realTokens = tokens.reduce((found, {
          literal,
          val
        }) => literal ? found : found.concat(val), []), collapsed = dur.shiftTo(...realTokens.map(tokenToField).filter((t) => t)), durationInfo = {
          isNegativeDuration: collapsed < 0,
          // this relies on "collapsed" being based on "shiftTo", which builds up the object
          // in order
          largestUnit: Object.keys(collapsed.values)[0]
        };
        return stringifyTokens(tokens, tokenToString(collapsed, durationInfo));
      }
    };
    var ianaRegex = /[A-Za-z_+-]{1,256}(?::?\/[A-Za-z0-9_+-]{1,256}(?:\/[A-Za-z0-9_+-]{1,256})?)?/;
    function combineRegexes(...regexes) {
      const full = regexes.reduce((f, r) => f + r.source, "");
      return RegExp(`^${full}$`);
    }
    function combineExtractors(...extractors) {
      return (m) => extractors.reduce(([mergedVals, mergedZone, cursor], ex) => {
        const [val, zone, next] = ex(m, cursor);
        return [{
          ...mergedVals,
          ...val
        }, zone || mergedZone, next];
      }, [{}, null, 1]).slice(0, 2);
    }
    function parse(s2, ...patterns) {
      if (s2 == null) {
        return [null, null];
      }
      for (const [regex, extractor] of patterns) {
        const m = regex.exec(s2);
        if (m) {
          return extractor(m);
        }
      }
      return [null, null];
    }
    function simpleParse(...keys) {
      return (match2, cursor) => {
        const ret = {};
        let i;
        for (i = 0; i < keys.length; i++) {
          ret[keys[i]] = parseInteger(match2[cursor + i]);
        }
        return [ret, null, cursor + i];
      };
    }
    var offsetRegex = /(?:([Zz])|([+-]\d\d)(?::?(\d\d))?)/;
    var isoExtendedZone = `(?:${offsetRegex.source}?(?:\\[(${ianaRegex.source})\\])?)?`;
    var isoTimeBaseRegex = /(\d\d)(?::?(\d\d)(?::?(\d\d)(?:[.,](\d{1,30}))?)?)?/;
    var isoTimeRegex = RegExp(`${isoTimeBaseRegex.source}${isoExtendedZone}`);
    var isoTimeExtensionRegex = RegExp(`(?:[Tt]${isoTimeRegex.source})?`);
    var isoYmdRegex = /([+-]\d{6}|\d{4})(?:-?(\d\d)(?:-?(\d\d))?)?/;
    var isoWeekRegex = /(\d{4})-?W(\d\d)(?:-?(\d))?/;
    var isoOrdinalRegex = /(\d{4})-?(\d{3})/;
    var extractISOWeekData = simpleParse("weekYear", "weekNumber", "weekDay");
    var extractISOOrdinalData = simpleParse("year", "ordinal");
    var sqlYmdRegex = /(\d{4})-(\d\d)-(\d\d)/;
    var sqlTimeRegex = RegExp(`${isoTimeBaseRegex.source} ?(?:${offsetRegex.source}|(${ianaRegex.source}))?`);
    var sqlTimeExtensionRegex = RegExp(`(?: ${sqlTimeRegex.source})?`);
    function int(match2, pos, fallback) {
      const m = match2[pos];
      return isUndefined(m) ? fallback : parseInteger(m);
    }
    function extractISOYmd(match2, cursor) {
      const item = {
        year: int(match2, cursor),
        month: int(match2, cursor + 1, 1),
        day: int(match2, cursor + 2, 1)
      };
      return [item, null, cursor + 3];
    }
    function extractISOTime(match2, cursor) {
      const item = {
        hours: int(match2, cursor, 0),
        minutes: int(match2, cursor + 1, 0),
        seconds: int(match2, cursor + 2, 0),
        milliseconds: parseMillis(match2[cursor + 3])
      };
      return [item, null, cursor + 4];
    }
    function extractISOOffset(match2, cursor) {
      const local = !match2[cursor] && !match2[cursor + 1], fullOffset = signedOffset(match2[cursor + 1], match2[cursor + 2]), zone = local ? null : FixedOffsetZone.instance(fullOffset);
      return [{}, zone, cursor + 3];
    }
    function extractIANAZone(match2, cursor) {
      const zone = match2[cursor] ? IANAZone.create(match2[cursor]) : null;
      return [{}, zone, cursor + 1];
    }
    var isoTimeOnly = RegExp(`^T?${isoTimeBaseRegex.source}$`);
    var isoDuration = /^-?P(?:(?:(-?\d{1,20}(?:\.\d{1,20})?)Y)?(?:(-?\d{1,20}(?:\.\d{1,20})?)M)?(?:(-?\d{1,20}(?:\.\d{1,20})?)W)?(?:(-?\d{1,20}(?:\.\d{1,20})?)D)?(?:T(?:(-?\d{1,20}(?:\.\d{1,20})?)H)?(?:(-?\d{1,20}(?:\.\d{1,20})?)M)?(?:(-?\d{1,20})(?:[.,](-?\d{1,20}))?S)?)?)$/;
    function extractISODuration(match2) {
      const [s2, yearStr, monthStr, weekStr, dayStr, hourStr, minuteStr, secondStr, millisecondsStr] = match2;
      const hasNegativePrefix = s2[0] === "-";
      const negativeSeconds = secondStr && secondStr[0] === "-";
      const maybeNegate = (num, force = false) => num !== void 0 && (force || num && hasNegativePrefix) ? -num : num;
      return [{
        years: maybeNegate(parseFloating(yearStr)),
        months: maybeNegate(parseFloating(monthStr)),
        weeks: maybeNegate(parseFloating(weekStr)),
        days: maybeNegate(parseFloating(dayStr)),
        hours: maybeNegate(parseFloating(hourStr)),
        minutes: maybeNegate(parseFloating(minuteStr)),
        seconds: maybeNegate(parseFloating(secondStr), secondStr === "-0"),
        milliseconds: maybeNegate(parseMillis(millisecondsStr), negativeSeconds)
      }];
    }
    var obsOffsets = {
      GMT: 0,
      EDT: -4 * 60,
      EST: -5 * 60,
      CDT: -5 * 60,
      CST: -6 * 60,
      MDT: -6 * 60,
      MST: -7 * 60,
      PDT: -7 * 60,
      PST: -8 * 60
    };
    function fromStrings(weekdayStr, yearStr, monthStr, dayStr, hourStr, minuteStr, secondStr) {
      const result = {
        year: yearStr.length === 2 ? untruncateYear(parseInteger(yearStr)) : parseInteger(yearStr),
        month: monthsShort.indexOf(monthStr) + 1,
        day: parseInteger(dayStr),
        hour: parseInteger(hourStr),
        minute: parseInteger(minuteStr)
      };
      if (secondStr) result.second = parseInteger(secondStr);
      if (weekdayStr) {
        result.weekday = weekdayStr.length > 3 ? weekdaysLong.indexOf(weekdayStr) + 1 : weekdaysShort.indexOf(weekdayStr) + 1;
      }
      return result;
    }
    var rfc2822 = /^(?:(Mon|Tue|Wed|Thu|Fri|Sat|Sun),\s)?(\d{1,2})\s(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)\s(\d{2,4})\s(\d\d):(\d\d)(?::(\d\d))?\s(?:(UT|GMT|[ECMP][SD]T)|([Zz])|(?:([+-]\d\d)(\d\d)))$/;
    function extractRFC2822(match2) {
      const [, weekdayStr, dayStr, monthStr, yearStr, hourStr, minuteStr, secondStr, obsOffset, milOffset, offHourStr, offMinuteStr] = match2, result = fromStrings(weekdayStr, yearStr, monthStr, dayStr, hourStr, minuteStr, secondStr);
      let offset2;
      if (obsOffset) {
        offset2 = obsOffsets[obsOffset];
      } else if (milOffset) {
        offset2 = 0;
      } else {
        offset2 = signedOffset(offHourStr, offMinuteStr);
      }
      return [result, new FixedOffsetZone(offset2)];
    }
    function preprocessRFC2822(s2) {
      return s2.replace(/\([^()]*\)|[\n\t]/g, " ").replace(/(\s\s+)/g, " ").trim();
    }
    var rfc1123 = /^(Mon|Tue|Wed|Thu|Fri|Sat|Sun), (\d\d) (Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec) (\d{4}) (\d\d):(\d\d):(\d\d) GMT$/;
    var rfc850 = /^(Monday|Tuesday|Wednesday|Thursday|Friday|Saturday|Sunday), (\d\d)-(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)-(\d\d) (\d\d):(\d\d):(\d\d) GMT$/;
    var ascii = /^(Mon|Tue|Wed|Thu|Fri|Sat|Sun) (Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec) ( \d|\d\d) (\d\d):(\d\d):(\d\d) (\d{4})$/;
    function extractRFC1123Or850(match2) {
      const [, weekdayStr, dayStr, monthStr, yearStr, hourStr, minuteStr, secondStr] = match2, result = fromStrings(weekdayStr, yearStr, monthStr, dayStr, hourStr, minuteStr, secondStr);
      return [result, FixedOffsetZone.utcInstance];
    }
    function extractASCII(match2) {
      const [, weekdayStr, monthStr, dayStr, hourStr, minuteStr, secondStr, yearStr] = match2, result = fromStrings(weekdayStr, yearStr, monthStr, dayStr, hourStr, minuteStr, secondStr);
      return [result, FixedOffsetZone.utcInstance];
    }
    var isoYmdWithTimeExtensionRegex = combineRegexes(isoYmdRegex, isoTimeExtensionRegex);
    var isoWeekWithTimeExtensionRegex = combineRegexes(isoWeekRegex, isoTimeExtensionRegex);
    var isoOrdinalWithTimeExtensionRegex = combineRegexes(isoOrdinalRegex, isoTimeExtensionRegex);
    var isoTimeCombinedRegex = combineRegexes(isoTimeRegex);
    var extractISOYmdTimeAndOffset = combineExtractors(extractISOYmd, extractISOTime, extractISOOffset, extractIANAZone);
    var extractISOWeekTimeAndOffset = combineExtractors(extractISOWeekData, extractISOTime, extractISOOffset, extractIANAZone);
    var extractISOOrdinalDateAndTime = combineExtractors(extractISOOrdinalData, extractISOTime, extractISOOffset, extractIANAZone);
    var extractISOTimeAndOffset = combineExtractors(extractISOTime, extractISOOffset, extractIANAZone);
    function parseISODate(s2) {
      return parse(s2, [isoYmdWithTimeExtensionRegex, extractISOYmdTimeAndOffset], [isoWeekWithTimeExtensionRegex, extractISOWeekTimeAndOffset], [isoOrdinalWithTimeExtensionRegex, extractISOOrdinalDateAndTime], [isoTimeCombinedRegex, extractISOTimeAndOffset]);
    }
    function parseRFC2822Date(s2) {
      return parse(preprocessRFC2822(s2), [rfc2822, extractRFC2822]);
    }
    function parseHTTPDate(s2) {
      return parse(s2, [rfc1123, extractRFC1123Or850], [rfc850, extractRFC1123Or850], [ascii, extractASCII]);
    }
    function parseISODuration(s2) {
      return parse(s2, [isoDuration, extractISODuration]);
    }
    var extractISOTimeOnly = combineExtractors(extractISOTime);
    function parseISOTimeOnly(s2) {
      return parse(s2, [isoTimeOnly, extractISOTimeOnly]);
    }
    var sqlYmdWithTimeExtensionRegex = combineRegexes(sqlYmdRegex, sqlTimeExtensionRegex);
    var sqlTimeCombinedRegex = combineRegexes(sqlTimeRegex);
    var extractISOTimeOffsetAndIANAZone = combineExtractors(extractISOTime, extractISOOffset, extractIANAZone);
    function parseSQL(s2) {
      return parse(s2, [sqlYmdWithTimeExtensionRegex, extractISOYmdTimeAndOffset], [sqlTimeCombinedRegex, extractISOTimeOffsetAndIANAZone]);
    }
    var INVALID$2 = "Invalid Duration";
    var lowOrderMatrix = {
      weeks: {
        days: 7,
        hours: 7 * 24,
        minutes: 7 * 24 * 60,
        seconds: 7 * 24 * 60 * 60,
        milliseconds: 7 * 24 * 60 * 60 * 1e3
      },
      days: {
        hours: 24,
        minutes: 24 * 60,
        seconds: 24 * 60 * 60,
        milliseconds: 24 * 60 * 60 * 1e3
      },
      hours: {
        minutes: 60,
        seconds: 60 * 60,
        milliseconds: 60 * 60 * 1e3
      },
      minutes: {
        seconds: 60,
        milliseconds: 60 * 1e3
      },
      seconds: {
        milliseconds: 1e3
      }
    };
    var casualMatrix = {
      years: {
        quarters: 4,
        months: 12,
        weeks: 52,
        days: 365,
        hours: 365 * 24,
        minutes: 365 * 24 * 60,
        seconds: 365 * 24 * 60 * 60,
        milliseconds: 365 * 24 * 60 * 60 * 1e3
      },
      quarters: {
        months: 3,
        weeks: 13,
        days: 91,
        hours: 91 * 24,
        minutes: 91 * 24 * 60,
        seconds: 91 * 24 * 60 * 60,
        milliseconds: 91 * 24 * 60 * 60 * 1e3
      },
      months: {
        weeks: 4,
        days: 30,
        hours: 30 * 24,
        minutes: 30 * 24 * 60,
        seconds: 30 * 24 * 60 * 60,
        milliseconds: 30 * 24 * 60 * 60 * 1e3
      },
      ...lowOrderMatrix
    };
    var daysInYearAccurate = 146097 / 400;
    var daysInMonthAccurate = 146097 / 4800;
    var accurateMatrix = {
      years: {
        quarters: 4,
        months: 12,
        weeks: daysInYearAccurate / 7,
        days: daysInYearAccurate,
        hours: daysInYearAccurate * 24,
        minutes: daysInYearAccurate * 24 * 60,
        seconds: daysInYearAccurate * 24 * 60 * 60,
        milliseconds: daysInYearAccurate * 24 * 60 * 60 * 1e3
      },
      quarters: {
        months: 3,
        weeks: daysInYearAccurate / 28,
        days: daysInYearAccurate / 4,
        hours: daysInYearAccurate * 24 / 4,
        minutes: daysInYearAccurate * 24 * 60 / 4,
        seconds: daysInYearAccurate * 24 * 60 * 60 / 4,
        milliseconds: daysInYearAccurate * 24 * 60 * 60 * 1e3 / 4
      },
      months: {
        weeks: daysInMonthAccurate / 7,
        days: daysInMonthAccurate,
        hours: daysInMonthAccurate * 24,
        minutes: daysInMonthAccurate * 24 * 60,
        seconds: daysInMonthAccurate * 24 * 60 * 60,
        milliseconds: daysInMonthAccurate * 24 * 60 * 60 * 1e3
      },
      ...lowOrderMatrix
    };
    var orderedUnits$1 = ["years", "quarters", "months", "weeks", "days", "hours", "minutes", "seconds", "milliseconds"];
    var reverseUnits = orderedUnits$1.slice(0).reverse();
    function clone$1(dur, alts, clear = false) {
      const conf = {
        values: clear ? alts.values : {
          ...dur.values,
          ...alts.values || {}
        },
        loc: dur.loc.clone(alts.loc),
        conversionAccuracy: alts.conversionAccuracy || dur.conversionAccuracy,
        matrix: alts.matrix || dur.matrix
      };
      return new Duration(conf);
    }
    function durationToMillis(matrix, vals) {
      var _vals$milliseconds;
      let sum = (_vals$milliseconds = vals.milliseconds) != null ? _vals$milliseconds : 0;
      for (const unit of reverseUnits.slice(1)) {
        if (vals[unit]) {
          sum += vals[unit] * matrix[unit]["milliseconds"];
        }
      }
      return sum;
    }
    function normalizeValues(matrix, vals) {
      const factor = durationToMillis(matrix, vals) < 0 ? -1 : 1;
      orderedUnits$1.reduceRight((previous, current) => {
        if (!isUndefined(vals[current])) {
          if (previous) {
            const previousVal = vals[previous] * factor;
            const conv = matrix[current][previous];
            const rollUp = Math.floor(previousVal / conv);
            vals[current] += rollUp * factor;
            vals[previous] -= rollUp * conv * factor;
          }
          return current;
        } else {
          return previous;
        }
      }, null);
      orderedUnits$1.reduce((previous, current) => {
        if (!isUndefined(vals[current])) {
          if (previous) {
            const fraction = vals[previous] % 1;
            vals[previous] -= fraction;
            vals[current] += fraction * matrix[previous][current];
          }
          return current;
        } else {
          return previous;
        }
      }, null);
    }
    function removeZeroes(vals) {
      const newVals = {};
      for (const [key, value] of Object.entries(vals)) {
        if (value !== 0) {
          newVals[key] = value;
        }
      }
      return newVals;
    }
    var Duration = class _Duration {
      /**
       * @private
       */
      constructor(config) {
        const accurate = config.conversionAccuracy === "longterm" || false;
        let matrix = accurate ? accurateMatrix : casualMatrix;
        if (config.matrix) {
          matrix = config.matrix;
        }
        this.values = config.values;
        this.loc = config.loc || Locale.create();
        this.conversionAccuracy = accurate ? "longterm" : "casual";
        this.invalid = config.invalid || null;
        this.matrix = matrix;
        this.isLuxonDuration = true;
      }
      /**
       * Create Duration from a number of milliseconds.
       * @param {number} count of milliseconds
       * @param {Object} opts - options for parsing
       * @param {string} [opts.locale='en-US'] - the locale to use
       * @param {string} opts.numberingSystem - the numbering system to use
       * @param {string} [opts.conversionAccuracy='casual'] - the conversion system to use
       * @return {Duration}
       */
      static fromMillis(count, opts) {
        return _Duration.fromObject({
          milliseconds: count
        }, opts);
      }
      /**
       * Create a Duration from a JavaScript object with keys like 'years' and 'hours'.
       * If this object is empty then a zero milliseconds duration is returned.
       * @param {Object} obj - the object to create the DateTime from
       * @param {number} obj.years
       * @param {number} obj.quarters
       * @param {number} obj.months
       * @param {number} obj.weeks
       * @param {number} obj.days
       * @param {number} obj.hours
       * @param {number} obj.minutes
       * @param {number} obj.seconds
       * @param {number} obj.milliseconds
       * @param {Object} [opts=[]] - options for creating this Duration
       * @param {string} [opts.locale='en-US'] - the locale to use
       * @param {string} opts.numberingSystem - the numbering system to use
       * @param {string} [opts.conversionAccuracy='casual'] - the preset conversion system to use
       * @param {string} [opts.matrix=Object] - the custom conversion system to use
       * @return {Duration}
       */
      static fromObject(obj, opts = {}) {
        if (obj == null || typeof obj !== "object") {
          throw new InvalidArgumentError(`Duration.fromObject: argument expected to be an object, got ${obj === null ? "null" : typeof obj}`);
        }
        return new _Duration({
          values: normalizeObject(obj, _Duration.normalizeUnit),
          loc: Locale.fromObject(opts),
          conversionAccuracy: opts.conversionAccuracy,
          matrix: opts.matrix
        });
      }
      /**
       * Create a Duration from DurationLike.
       *
       * @param {Object | number | Duration} durationLike
       * One of:
       * - object with keys like 'years' and 'hours'.
       * - number representing milliseconds
       * - Duration instance
       * @return {Duration}
       */
      static fromDurationLike(durationLike) {
        if (isNumber(durationLike)) {
          return _Duration.fromMillis(durationLike);
        } else if (_Duration.isDuration(durationLike)) {
          return durationLike;
        } else if (typeof durationLike === "object") {
          return _Duration.fromObject(durationLike);
        } else {
          throw new InvalidArgumentError(`Unknown duration argument ${durationLike} of type ${typeof durationLike}`);
        }
      }
      /**
       * Create a Duration from an ISO 8601 duration string.
       * @param {string} text - text to parse
       * @param {Object} opts - options for parsing
       * @param {string} [opts.locale='en-US'] - the locale to use
       * @param {string} opts.numberingSystem - the numbering system to use
       * @param {string} [opts.conversionAccuracy='casual'] - the preset conversion system to use
       * @param {string} [opts.matrix=Object] - the preset conversion system to use
       * @see https://en.wikipedia.org/wiki/ISO_8601#Durations
       * @example Duration.fromISO('P3Y6M1W4DT12H30M5S').toObject() //=> { years: 3, months: 6, weeks: 1, days: 4, hours: 12, minutes: 30, seconds: 5 }
       * @example Duration.fromISO('PT23H').toObject() //=> { hours: 23 }
       * @example Duration.fromISO('P5Y3M').toObject() //=> { years: 5, months: 3 }
       * @return {Duration}
       */
      static fromISO(text, opts) {
        const [parsed] = parseISODuration(text);
        if (parsed) {
          return _Duration.fromObject(parsed, opts);
        } else {
          return _Duration.invalid("unparsable", `the input "${text}" can't be parsed as ISO 8601`);
        }
      }
      /**
       * Create a Duration from an ISO 8601 time string.
       * @param {string} text - text to parse
       * @param {Object} opts - options for parsing
       * @param {string} [opts.locale='en-US'] - the locale to use
       * @param {string} opts.numberingSystem - the numbering system to use
       * @param {string} [opts.conversionAccuracy='casual'] - the preset conversion system to use
       * @param {string} [opts.matrix=Object] - the conversion system to use
       * @see https://en.wikipedia.org/wiki/ISO_8601#Times
       * @example Duration.fromISOTime('11:22:33.444').toObject() //=> { hours: 11, minutes: 22, seconds: 33, milliseconds: 444 }
       * @example Duration.fromISOTime('11:00').toObject() //=> { hours: 11, minutes: 0, seconds: 0 }
       * @example Duration.fromISOTime('T11:00').toObject() //=> { hours: 11, minutes: 0, seconds: 0 }
       * @example Duration.fromISOTime('1100').toObject() //=> { hours: 11, minutes: 0, seconds: 0 }
       * @example Duration.fromISOTime('T1100').toObject() //=> { hours: 11, minutes: 0, seconds: 0 }
       * @return {Duration}
       */
      static fromISOTime(text, opts) {
        const [parsed] = parseISOTimeOnly(text);
        if (parsed) {
          return _Duration.fromObject(parsed, opts);
        } else {
          return _Duration.invalid("unparsable", `the input "${text}" can't be parsed as ISO 8601`);
        }
      }
      /**
       * Create an invalid Duration.
       * @param {string} reason - simple string of why this datetime is invalid. Should not contain parameters or anything else data-dependent
       * @param {string} [explanation=null] - longer explanation, may include parameters and other useful debugging information
       * @return {Duration}
       */
      static invalid(reason, explanation = null) {
        if (!reason) {
          throw new InvalidArgumentError("need to specify a reason the Duration is invalid");
        }
        const invalid = reason instanceof Invalid ? reason : new Invalid(reason, explanation);
        if (Settings.throwOnInvalid) {
          throw new InvalidDurationError(invalid);
        } else {
          return new _Duration({
            invalid
          });
        }
      }
      /**
       * @private
       */
      static normalizeUnit(unit) {
        const normalized = {
          year: "years",
          years: "years",
          quarter: "quarters",
          quarters: "quarters",
          month: "months",
          months: "months",
          week: "weeks",
          weeks: "weeks",
          day: "days",
          days: "days",
          hour: "hours",
          hours: "hours",
          minute: "minutes",
          minutes: "minutes",
          second: "seconds",
          seconds: "seconds",
          millisecond: "milliseconds",
          milliseconds: "milliseconds"
        }[unit ? unit.toLowerCase() : unit];
        if (!normalized) throw new InvalidUnitError(unit);
        return normalized;
      }
      /**
       * Check if an object is a Duration. Works across context boundaries
       * @param {object} o
       * @return {boolean}
       */
      static isDuration(o) {
        return o && o.isLuxonDuration || false;
      }
      /**
       * Get  the locale of a Duration, such 'en-GB'
       * @type {string}
       */
      get locale() {
        return this.isValid ? this.loc.locale : null;
      }
      /**
       * Get the numbering system of a Duration, such 'beng'. The numbering system is used when formatting the Duration
       *
       * @type {string}
       */
      get numberingSystem() {
        return this.isValid ? this.loc.numberingSystem : null;
      }
      /**
       * Returns a string representation of this Duration formatted according to the specified format string. You may use these tokens:
       * * `S` for milliseconds
       * * `s` for seconds
       * * `m` for minutes
       * * `h` for hours
       * * `d` for days
       * * `w` for weeks
       * * `M` for months
       * * `y` for years
       * Notes:
       * * Add padding by repeating the token, e.g. "yy" pads the years to two digits, "hhhh" pads the hours out to four digits
       * * Tokens can be escaped by wrapping with single quotes.
       * * The duration will be converted to the set of units in the format string using {@link Duration#shiftTo} and the Durations's conversion accuracy setting.
       * @param {string} fmt - the format string
       * @param {Object} opts - options
       * @param {boolean} [opts.floor=true] - floor numerical values
       * @param {'negative'|'all'|'negativeLargestOnly'} [opts.signMode=negative] - How to handle signs
       * @example Duration.fromObject({ years: 1, days: 6, seconds: 2 }).toFormat("y d s") //=> "1 6 2"
       * @example Duration.fromObject({ years: 1, days: 6, seconds: 2 }).toFormat("yy dd sss") //=> "01 06 002"
       * @example Duration.fromObject({ years: 1, days: 6, seconds: 2 }).toFormat("M S") //=> "12 518402000"
       * @example Duration.fromObject({ days: 6, seconds: 2 }).toFormat("d s", { signMode: "all" }) //=> "+6 +2"
       * @example Duration.fromObject({ days: -6, seconds: -2 }).toFormat("d s", { signMode: "all" }) //=> "-6 -2"
       * @example Duration.fromObject({ days: -6, seconds: -2 }).toFormat("d s", { signMode: "negativeLargestOnly" }) //=> "-6 2"
       * @return {string}
       */
      toFormat(fmt, opts = {}) {
        const fmtOpts = {
          ...opts,
          floor: opts.round !== false && opts.floor !== false
        };
        return this.isValid ? Formatter.create(this.loc, fmtOpts).formatDurationFromString(this, fmt) : INVALID$2;
      }
      /**
       * Returns a string representation of a Duration with all units included.
       * To modify its behavior, use `listStyle` and any Intl.NumberFormat option, though `unitDisplay` is especially relevant.
       * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/NumberFormat/NumberFormat#options
       * @param {Object} opts - Formatting options. Accepts the same keys as the options parameter of the native `Intl.NumberFormat` constructor, as well as `listStyle`.
       * @param {string} [opts.listStyle='narrow'] - How to format the merged list. Corresponds to the `style` property of the options parameter of the native `Intl.ListFormat` constructor.
       * @param {boolean} [opts.showZeros=true] - Show all units previously used by the duration even if they are zero
       * @example
       * ```js
       * var dur = Duration.fromObject({ months: 1, weeks: 0, hours: 5, minutes: 6 })
       * dur.toHuman() //=> '1 month, 0 weeks, 5 hours, 6 minutes'
       * dur.toHuman({ listStyle: "long" }) //=> '1 month, 0 weeks, 5 hours, and 6 minutes'
       * dur.toHuman({ unitDisplay: "short" }) //=> '1 mth, 0 wks, 5 hr, 6 min'
       * dur.toHuman({ showZeros: false }) //=> '1 month, 5 hours, 6 minutes'
       * ```
       */
      toHuman(opts = {}) {
        if (!this.isValid) return INVALID$2;
        const showZeros = opts.showZeros !== false;
        const l2 = orderedUnits$1.map((unit) => {
          const val = this.values[unit];
          if (isUndefined(val) || val === 0 && !showZeros) {
            return null;
          }
          return this.loc.numberFormatter({
            style: "unit",
            unitDisplay: "long",
            ...opts,
            unit: unit.slice(0, -1)
          }).format(val);
        }).filter((n2) => n2);
        return this.loc.listFormatter({
          type: "conjunction",
          style: opts.listStyle || "narrow",
          ...opts
        }).format(l2);
      }
      /**
       * Returns a JavaScript object with this Duration's values.
       * @example Duration.fromObject({ years: 1, days: 6, seconds: 2 }).toObject() //=> { years: 1, days: 6, seconds: 2 }
       * @return {Object}
       */
      toObject() {
        if (!this.isValid) return {};
        return {
          ...this.values
        };
      }
      /**
       * Returns an ISO 8601-compliant string representation of this Duration.
       * @see https://en.wikipedia.org/wiki/ISO_8601#Durations
       * @example Duration.fromObject({ years: 3, seconds: 45 }).toISO() //=> 'P3YT45S'
       * @example Duration.fromObject({ months: 4, seconds: 45 }).toISO() //=> 'P4MT45S'
       * @example Duration.fromObject({ months: 5 }).toISO() //=> 'P5M'
       * @example Duration.fromObject({ minutes: 5 }).toISO() //=> 'PT5M'
       * @example Duration.fromObject({ milliseconds: 6 }).toISO() //=> 'PT0.006S'
       * @return {string}
       */
      toISO() {
        if (!this.isValid) return null;
        let s2 = "P";
        if (this.years !== 0) s2 += this.years + "Y";
        if (this.months !== 0 || this.quarters !== 0) s2 += this.months + this.quarters * 3 + "M";
        if (this.weeks !== 0) s2 += this.weeks + "W";
        if (this.days !== 0) s2 += this.days + "D";
        if (this.hours !== 0 || this.minutes !== 0 || this.seconds !== 0 || this.milliseconds !== 0) s2 += "T";
        if (this.hours !== 0) s2 += this.hours + "H";
        if (this.minutes !== 0) s2 += this.minutes + "M";
        if (this.seconds !== 0 || this.milliseconds !== 0)
          s2 += roundTo(this.seconds + this.milliseconds / 1e3, 3) + "S";
        if (s2 === "P") s2 += "T0S";
        return s2;
      }
      /**
       * Returns an ISO 8601-compliant string representation of this Duration, formatted as a time of day.
       * Note that this will return null if the duration is invalid, negative, or equal to or greater than 24 hours.
       * @see https://en.wikipedia.org/wiki/ISO_8601#Times
       * @param {Object} opts - options
       * @param {boolean} [opts.suppressMilliseconds=false] - exclude milliseconds from the format if they're 0
       * @param {boolean} [opts.suppressSeconds=false] - exclude seconds from the format if they're 0
       * @param {boolean} [opts.includePrefix=false] - include the `T` prefix
       * @param {string} [opts.format='extended'] - choose between the basic and extended format
       * @example Duration.fromObject({ hours: 11 }).toISOTime() //=> '11:00:00.000'
       * @example Duration.fromObject({ hours: 11 }).toISOTime({ suppressMilliseconds: true }) //=> '11:00:00'
       * @example Duration.fromObject({ hours: 11 }).toISOTime({ suppressSeconds: true }) //=> '11:00'
       * @example Duration.fromObject({ hours: 11 }).toISOTime({ includePrefix: true }) //=> 'T11:00:00.000'
       * @example Duration.fromObject({ hours: 11 }).toISOTime({ format: 'basic' }) //=> '110000.000'
       * @return {string}
       */
      toISOTime(opts = {}) {
        if (!this.isValid) return null;
        const millis = this.toMillis();
        if (millis < 0 || millis >= 864e5) return null;
        opts = {
          suppressMilliseconds: false,
          suppressSeconds: false,
          includePrefix: false,
          format: "extended",
          ...opts,
          includeOffset: false
        };
        const dateTime = DateTime.fromMillis(millis, {
          zone: "UTC"
        });
        return dateTime.toISOTime(opts);
      }
      /**
       * Returns an ISO 8601 representation of this Duration appropriate for use in JSON.
       * @return {string}
       */
      toJSON() {
        return this.toISO();
      }
      /**
       * Returns an ISO 8601 representation of this Duration appropriate for use in debugging.
       * @return {string}
       */
      toString() {
        return this.toISO();
      }
      /**
       * Returns a string representation of this Duration appropriate for the REPL.
       * @return {string}
       */
      [/* @__PURE__ */ Symbol.for("nodejs.util.inspect.custom")]() {
        if (this.isValid) {
          return `Duration { values: ${JSON.stringify(this.values)} }`;
        } else {
          return `Duration { Invalid, reason: ${this.invalidReason} }`;
        }
      }
      /**
       * Returns an milliseconds value of this Duration.
       * @return {number}
       */
      toMillis() {
        if (!this.isValid) return NaN;
        return durationToMillis(this.matrix, this.values);
      }
      /**
       * Returns an milliseconds value of this Duration. Alias of {@link toMillis}
       * @return {number}
       */
      valueOf() {
        return this.toMillis();
      }
      /**
       * Make this Duration longer by the specified amount. Return a newly-constructed Duration.
       * @param {Duration|Object|number} duration - The amount to add. Either a Luxon Duration, a number of milliseconds, the object argument to Duration.fromObject()
       * @return {Duration}
       */
      plus(duration) {
        if (!this.isValid) return this;
        const dur = _Duration.fromDurationLike(duration), result = {};
        for (const k of orderedUnits$1) {
          if (hasOwnProperty(dur.values, k) || hasOwnProperty(this.values, k)) {
            result[k] = dur.get(k) + this.get(k);
          }
        }
        return clone$1(this, {
          values: result
        }, true);
      }
      /**
       * Make this Duration shorter by the specified amount. Return a newly-constructed Duration.
       * @param {Duration|Object|number} duration - The amount to subtract. Either a Luxon Duration, a number of milliseconds, the object argument to Duration.fromObject()
       * @return {Duration}
       */
      minus(duration) {
        if (!this.isValid) return this;
        const dur = _Duration.fromDurationLike(duration);
        return this.plus(dur.negate());
      }
      /**
       * Scale this Duration by the specified amount. Return a newly-constructed Duration.
       * @param {function} fn - The function to apply to each unit. Arity is 1 or 2: the value of the unit and, optionally, the unit name. Must return a number.
       * @example Duration.fromObject({ hours: 1, minutes: 30 }).mapUnits(x => x * 2) //=> { hours: 2, minutes: 60 }
       * @example Duration.fromObject({ hours: 1, minutes: 30 }).mapUnits((x, u) => u === "hours" ? x * 2 : x) //=> { hours: 2, minutes: 30 }
       * @return {Duration}
       */
      mapUnits(fn) {
        if (!this.isValid) return this;
        const result = {};
        for (const k of Object.keys(this.values)) {
          result[k] = asNumber(fn(this.values[k], k));
        }
        return clone$1(this, {
          values: result
        }, true);
      }
      /**
       * Get the value of unit.
       * @param {string} unit - a unit such as 'minute' or 'day'
       * @example Duration.fromObject({years: 2, days: 3}).get('years') //=> 2
       * @example Duration.fromObject({years: 2, days: 3}).get('months') //=> 0
       * @example Duration.fromObject({years: 2, days: 3}).get('days') //=> 3
       * @return {number}
       */
      get(unit) {
        return this[_Duration.normalizeUnit(unit)];
      }
      /**
       * "Set" the values of specified units. Return a newly-constructed Duration.
       * @param {Object} values - a mapping of units to numbers
       * @example dur.set({ years: 2017 })
       * @example dur.set({ hours: 8, minutes: 30 })
       * @return {Duration}
       */
      set(values) {
        if (!this.isValid) return this;
        const mixed2 = {
          ...this.values,
          ...normalizeObject(values, _Duration.normalizeUnit)
        };
        return clone$1(this, {
          values: mixed2
        });
      }
      /**
       * "Set" the locale and/or numberingSystem.  Returns a newly-constructed Duration.
       * @example dur.reconfigure({ locale: 'en-GB' })
       * @return {Duration}
       */
      reconfigure({
        locale: locale2,
        numberingSystem,
        conversionAccuracy,
        matrix
      } = {}) {
        const loc = this.loc.clone({
          locale: locale2,
          numberingSystem
        });
        const opts = {
          loc,
          matrix,
          conversionAccuracy
        };
        return clone$1(this, opts);
      }
      /**
       * Return the length of the duration in the specified unit.
       * @param {string} unit - a unit such as 'minutes' or 'days'
       * @example Duration.fromObject({years: 1}).as('days') //=> 365
       * @example Duration.fromObject({years: 1}).as('months') //=> 12
       * @example Duration.fromObject({hours: 60}).as('days') //=> 2.5
       * @return {number}
       */
      as(unit) {
        return this.isValid ? this.shiftTo(unit).get(unit) : NaN;
      }
      /**
       * Reduce this Duration to its canonical representation in its current units.
       * Assuming the overall value of the Duration is positive, this means:
       * - excessive values for lower-order units are converted to higher-order units (if possible, see first and second example)
       * - negative lower-order units are converted to higher order units (there must be such a higher order unit, otherwise
       *   the overall value would be negative, see third example)
       * - fractional values for higher-order units are converted to lower-order units (if possible, see fourth example)
       *
       * If the overall value is negative, the result of this method is equivalent to `this.negate().normalize().negate()`.
       * @example Duration.fromObject({ years: 2, days: 5000 }).normalize().toObject() //=> { years: 15, days: 255 }
       * @example Duration.fromObject({ days: 5000 }).normalize().toObject() //=> { days: 5000 }
       * @example Duration.fromObject({ hours: 12, minutes: -45 }).normalize().toObject() //=> { hours: 11, minutes: 15 }
       * @example Duration.fromObject({ years: 2.5, days: 0, hours: 0 }).normalize().toObject() //=> { years: 2, days: 182, hours: 12 }
       * @return {Duration}
       */
      normalize() {
        if (!this.isValid) return this;
        const vals = this.toObject();
        normalizeValues(this.matrix, vals);
        return clone$1(this, {
          values: vals
        }, true);
      }
      /**
       * Rescale units to its largest representation
       * @example Duration.fromObject({ milliseconds: 90000 }).rescale().toObject() //=> { minutes: 1, seconds: 30 }
       * @return {Duration}
       */
      rescale() {
        if (!this.isValid) return this;
        const vals = removeZeroes(this.normalize().shiftToAll().toObject());
        return clone$1(this, {
          values: vals
        }, true);
      }
      /**
       * Convert this Duration into its representation in a different set of units.
       * @example Duration.fromObject({ hours: 1, seconds: 30 }).shiftTo('minutes', 'milliseconds').toObject() //=> { minutes: 60, milliseconds: 30000 }
       * @return {Duration}
       */
      shiftTo(...units) {
        if (!this.isValid) return this;
        if (units.length === 0) {
          return this;
        }
        units = units.map((u) => _Duration.normalizeUnit(u));
        const built = {}, accumulated = {}, vals = this.toObject();
        let lastUnit;
        for (const k of orderedUnits$1) {
          if (units.indexOf(k) >= 0) {
            lastUnit = k;
            let own = 0;
            for (const ak in accumulated) {
              own += this.matrix[ak][k] * accumulated[ak];
              accumulated[ak] = 0;
            }
            if (isNumber(vals[k])) {
              own += vals[k];
            }
            const i = Math.trunc(own);
            built[k] = i;
            accumulated[k] = (own * 1e3 - i * 1e3) / 1e3;
          } else if (isNumber(vals[k])) {
            accumulated[k] = vals[k];
          }
        }
        for (const key in accumulated) {
          if (accumulated[key] !== 0) {
            built[lastUnit] += key === lastUnit ? accumulated[key] : accumulated[key] / this.matrix[lastUnit][key];
          }
        }
        normalizeValues(this.matrix, built);
        return clone$1(this, {
          values: built
        }, true);
      }
      /**
       * Shift this Duration to all available units.
       * Same as shiftTo("years", "months", "weeks", "days", "hours", "minutes", "seconds", "milliseconds")
       * @return {Duration}
       */
      shiftToAll() {
        if (!this.isValid) return this;
        return this.shiftTo("years", "months", "weeks", "days", "hours", "minutes", "seconds", "milliseconds");
      }
      /**
       * Return the negative of this Duration.
       * @example Duration.fromObject({ hours: 1, seconds: 30 }).negate().toObject() //=> { hours: -1, seconds: -30 }
       * @return {Duration}
       */
      negate() {
        if (!this.isValid) return this;
        const negated = {};
        for (const k of Object.keys(this.values)) {
          negated[k] = this.values[k] === 0 ? 0 : -this.values[k];
        }
        return clone$1(this, {
          values: negated
        }, true);
      }
      /**
       * Removes all units with values equal to 0 from this Duration.
       * @example Duration.fromObject({ years: 2, days: 0, hours: 0, minutes: 0 }).removeZeros().toObject() //=> { years: 2 }
       * @return {Duration}
       */
      removeZeros() {
        if (!this.isValid) return this;
        const vals = removeZeroes(this.values);
        return clone$1(this, {
          values: vals
        }, true);
      }
      /**
       * Get the years.
       * @type {number}
       */
      get years() {
        return this.isValid ? this.values.years || 0 : NaN;
      }
      /**
       * Get the quarters.
       * @type {number}
       */
      get quarters() {
        return this.isValid ? this.values.quarters || 0 : NaN;
      }
      /**
       * Get the months.
       * @type {number}
       */
      get months() {
        return this.isValid ? this.values.months || 0 : NaN;
      }
      /**
       * Get the weeks
       * @type {number}
       */
      get weeks() {
        return this.isValid ? this.values.weeks || 0 : NaN;
      }
      /**
       * Get the days.
       * @type {number}
       */
      get days() {
        return this.isValid ? this.values.days || 0 : NaN;
      }
      /**
       * Get the hours.
       * @type {number}
       */
      get hours() {
        return this.isValid ? this.values.hours || 0 : NaN;
      }
      /**
       * Get the minutes.
       * @type {number}
       */
      get minutes() {
        return this.isValid ? this.values.minutes || 0 : NaN;
      }
      /**
       * Get the seconds.
       * @return {number}
       */
      get seconds() {
        return this.isValid ? this.values.seconds || 0 : NaN;
      }
      /**
       * Get the milliseconds.
       * @return {number}
       */
      get milliseconds() {
        return this.isValid ? this.values.milliseconds || 0 : NaN;
      }
      /**
       * Returns whether the Duration is invalid. Invalid durations are returned by diff operations
       * on invalid DateTimes or Intervals.
       * @return {boolean}
       */
      get isValid() {
        return this.invalid === null;
      }
      /**
       * Returns an error code if this Duration became invalid, or null if the Duration is valid
       * @return {string}
       */
      get invalidReason() {
        return this.invalid ? this.invalid.reason : null;
      }
      /**
       * Returns an explanation of why this Duration became invalid, or null if the Duration is valid
       * @type {string}
       */
      get invalidExplanation() {
        return this.invalid ? this.invalid.explanation : null;
      }
      /**
       * Equality check
       * Two Durations are equal iff they have the same units and the same values for each unit.
       * @param {Duration} other
       * @return {boolean}
       */
      equals(other) {
        if (!this.isValid || !other.isValid) {
          return false;
        }
        if (!this.loc.equals(other.loc)) {
          return false;
        }
        function eq(v1, v2) {
          if (v1 === void 0 || v1 === 0) return v2 === void 0 || v2 === 0;
          return v1 === v2;
        }
        for (const u of orderedUnits$1) {
          if (!eq(this.values[u], other.values[u])) {
            return false;
          }
        }
        return true;
      }
    };
    var INVALID$1 = "Invalid Interval";
    function validateStartEnd(start, end) {
      if (!start || !start.isValid) {
        return Interval.invalid("missing or invalid start");
      } else if (!end || !end.isValid) {
        return Interval.invalid("missing or invalid end");
      } else if (end < start) {
        return Interval.invalid("end before start", `The end of an interval must be after its start, but you had start=${start.toISO()} and end=${end.toISO()}`);
      } else {
        return null;
      }
    }
    var Interval = class _Interval {
      /**
       * @private
       */
      constructor(config) {
        this.s = config.start;
        this.e = config.end;
        this.invalid = config.invalid || null;
        this.isLuxonInterval = true;
      }
      /**
       * Create an invalid Interval.
       * @param {string} reason - simple string of why this Interval is invalid. Should not contain parameters or anything else data-dependent
       * @param {string} [explanation=null] - longer explanation, may include parameters and other useful debugging information
       * @return {Interval}
       */
      static invalid(reason, explanation = null) {
        if (!reason) {
          throw new InvalidArgumentError("need to specify a reason the Interval is invalid");
        }
        const invalid = reason instanceof Invalid ? reason : new Invalid(reason, explanation);
        if (Settings.throwOnInvalid) {
          throw new InvalidIntervalError(invalid);
        } else {
          return new _Interval({
            invalid
          });
        }
      }
      /**
       * Create an Interval from a start DateTime and an end DateTime. Inclusive of the start but not the end.
       * @param {DateTime|Date|Object} start
       * @param {DateTime|Date|Object} end
       * @return {Interval}
       */
      static fromDateTimes(start, end) {
        const builtStart = friendlyDateTime(start), builtEnd = friendlyDateTime(end);
        const validateError = validateStartEnd(builtStart, builtEnd);
        if (validateError == null) {
          return new _Interval({
            start: builtStart,
            end: builtEnd
          });
        } else {
          return validateError;
        }
      }
      /**
       * Create an Interval from a start DateTime and a Duration to extend to.
       * @param {DateTime|Date|Object} start
       * @param {Duration|Object|number} duration - the length of the Interval.
       * @return {Interval}
       */
      static after(start, duration) {
        const dur = Duration.fromDurationLike(duration), dt = friendlyDateTime(start);
        return _Interval.fromDateTimes(dt, dt.plus(dur));
      }
      /**
       * Create an Interval from an end DateTime and a Duration to extend backwards to.
       * @param {DateTime|Date|Object} end
       * @param {Duration|Object|number} duration - the length of the Interval.
       * @return {Interval}
       */
      static before(end, duration) {
        const dur = Duration.fromDurationLike(duration), dt = friendlyDateTime(end);
        return _Interval.fromDateTimes(dt.minus(dur), dt);
      }
      /**
       * Create an Interval from an ISO 8601 string.
       * Accepts `<start>/<end>`, `<start>/<duration>`, and `<duration>/<end>` formats.
       * @param {string} text - the ISO string to parse
       * @param {Object} [opts] - options to pass {@link DateTime#fromISO} and optionally {@link Duration#fromISO}
       * @see https://en.wikipedia.org/wiki/ISO_8601#Time_intervals
       * @return {Interval}
       */
      static fromISO(text, opts) {
        const [s2, e] = (text || "").split("/", 2);
        if (s2 && e) {
          let start, startIsValid;
          try {
            start = DateTime.fromISO(s2, opts);
            startIsValid = start.isValid;
          } catch (e2) {
            startIsValid = false;
          }
          let end, endIsValid;
          try {
            end = DateTime.fromISO(e, opts);
            endIsValid = end.isValid;
          } catch (e2) {
            endIsValid = false;
          }
          if (startIsValid && endIsValid) {
            return _Interval.fromDateTimes(start, end);
          }
          if (startIsValid) {
            const dur = Duration.fromISO(e, opts);
            if (dur.isValid) {
              return _Interval.after(start, dur);
            }
          } else if (endIsValid) {
            const dur = Duration.fromISO(s2, opts);
            if (dur.isValid) {
              return _Interval.before(end, dur);
            }
          }
        }
        return _Interval.invalid("unparsable", `the input "${text}" can't be parsed as ISO 8601`);
      }
      /**
       * Check if an object is an Interval. Works across context boundaries
       * @param {object} o
       * @return {boolean}
       */
      static isInterval(o) {
        return o && o.isLuxonInterval || false;
      }
      /**
       * Returns the start of the Interval
       * @type {DateTime}
       */
      get start() {
        return this.isValid ? this.s : null;
      }
      /**
       * Returns the end of the Interval. This is the first instant which is not part of the interval
       * (Interval is half-open).
       * @type {DateTime}
       */
      get end() {
        return this.isValid ? this.e : null;
      }
      /**
       * Returns the last DateTime included in the interval (since end is not part of the interval)
       * @type {DateTime}
       */
      get lastDateTime() {
        return this.isValid ? this.e ? this.e.minus(1) : null : null;
      }
      /**
       * Returns whether this Interval's end is at least its start, meaning that the Interval isn't 'backwards'.
       * @type {boolean}
       */
      get isValid() {
        return this.invalidReason === null;
      }
      /**
       * Returns an error code if this Interval is invalid, or null if the Interval is valid
       * @type {string}
       */
      get invalidReason() {
        return this.invalid ? this.invalid.reason : null;
      }
      /**
       * Returns an explanation of why this Interval became invalid, or null if the Interval is valid
       * @type {string}
       */
      get invalidExplanation() {
        return this.invalid ? this.invalid.explanation : null;
      }
      /**
       * Returns the length of the Interval in the specified unit.
       * @param {string} unit - the unit (such as 'hours' or 'days') to return the length in.
       * @return {number}
       */
      length(unit = "milliseconds") {
        return this.isValid ? this.toDuration(...[unit]).get(unit) : NaN;
      }
      /**
       * Returns the count of minutes, hours, days, months, or years included in the Interval, even in part.
       * Unlike {@link Interval#length} this counts sections of the calendar, not periods of time, e.g. specifying 'day'
       * asks 'what dates are included in this interval?', not 'how many days long is this interval?'
       * @param {string} [unit='milliseconds'] - the unit of time to count.
       * @param {Object} opts - options
       * @param {boolean} [opts.useLocaleWeeks=false] - If true, use weeks based on the locale, i.e. use the locale-dependent start of the week; this operation will always use the locale of the start DateTime
       * @return {number}
       */
      count(unit = "milliseconds", opts) {
        if (!this.isValid) return NaN;
        const start = this.start.startOf(unit, opts);
        let end;
        if (opts != null && opts.useLocaleWeeks) {
          end = this.end.reconfigure({
            locale: start.locale
          });
        } else {
          end = this.end;
        }
        end = end.startOf(unit, opts);
        return Math.floor(end.diff(start, unit).get(unit)) + (end.valueOf() !== this.end.valueOf());
      }
      /**
       * Returns whether this Interval's start and end are both in the same unit of time
       * @param {string} unit - the unit of time to check sameness on
       * @return {boolean}
       */
      hasSame(unit) {
        return this.isValid ? this.isEmpty() || this.e.minus(1).hasSame(this.s, unit) : false;
      }
      /**
       * Return whether this Interval has the same start and end DateTimes.
       * @return {boolean}
       */
      isEmpty() {
        return this.s.valueOf() === this.e.valueOf();
      }
      /**
       * Return whether this Interval's start is after the specified DateTime.
       * @param {DateTime} dateTime
       * @return {boolean}
       */
      isAfter(dateTime) {
        if (!this.isValid) return false;
        return this.s > dateTime;
      }
      /**
       * Return whether this Interval's end is before the specified DateTime.
       * @param {DateTime} dateTime
       * @return {boolean}
       */
      isBefore(dateTime) {
        if (!this.isValid) return false;
        return this.e <= dateTime;
      }
      /**
       * Return whether this Interval contains the specified DateTime.
       * @param {DateTime} dateTime
       * @return {boolean}
       */
      contains(dateTime) {
        if (!this.isValid) return false;
        return this.s <= dateTime && this.e > dateTime;
      }
      /**
       * "Sets" the start and/or end dates. Returns a newly-constructed Interval.
       * @param {Object} values - the values to set
       * @param {DateTime} values.start - the starting DateTime
       * @param {DateTime} values.end - the ending DateTime
       * @return {Interval}
       */
      set({
        start,
        end
      } = {}) {
        if (!this.isValid) return this;
        return _Interval.fromDateTimes(start || this.s, end || this.e);
      }
      /**
       * Split this Interval at each of the specified DateTimes
       * @param {...DateTime} dateTimes - the unit of time to count.
       * @return {Array}
       */
      splitAt(...dateTimes) {
        if (!this.isValid) return [];
        const sorted = dateTimes.map(friendlyDateTime).filter((d) => this.contains(d)).sort((a, b) => a.toMillis() - b.toMillis()), results = [];
        let {
          s: s2
        } = this, i = 0;
        while (s2 < this.e) {
          const added = sorted[i] || this.e, next = +added > +this.e ? this.e : added;
          results.push(_Interval.fromDateTimes(s2, next));
          s2 = next;
          i += 1;
        }
        return results;
      }
      /**
       * Split this Interval into smaller Intervals, each of the specified length.
       * Left over time is grouped into a smaller interval
       * @param {Duration|Object|number} duration - The length of each resulting interval.
       * @return {Array}
       */
      splitBy(duration) {
        const dur = Duration.fromDurationLike(duration);
        if (!this.isValid || !dur.isValid || dur.as("milliseconds") === 0) {
          return [];
        }
        let {
          s: s2
        } = this, idx = 1, next;
        const results = [];
        while (s2 < this.e) {
          const added = this.start.plus(dur.mapUnits((x) => x * idx));
          next = +added > +this.e ? this.e : added;
          results.push(_Interval.fromDateTimes(s2, next));
          s2 = next;
          idx += 1;
        }
        return results;
      }
      /**
       * Split this Interval into the specified number of smaller intervals.
       * @param {number} numberOfParts - The number of Intervals to divide the Interval into.
       * @return {Array}
       */
      divideEqually(numberOfParts) {
        if (!this.isValid) return [];
        return this.splitBy(this.length() / numberOfParts).slice(0, numberOfParts);
      }
      /**
       * Return whether this Interval overlaps with the specified Interval
       * @param {Interval} other
       * @return {boolean}
       */
      overlaps(other) {
        return this.e > other.s && this.s < other.e;
      }
      /**
       * Return whether this Interval's end is adjacent to the specified Interval's start.
       * @param {Interval} other
       * @return {boolean}
       */
      abutsStart(other) {
        if (!this.isValid) return false;
        return +this.e === +other.s;
      }
      /**
       * Return whether this Interval's start is adjacent to the specified Interval's end.
       * @param {Interval} other
       * @return {boolean}
       */
      abutsEnd(other) {
        if (!this.isValid) return false;
        return +other.e === +this.s;
      }
      /**
       * Returns true if this Interval fully contains the specified Interval, specifically if the intersect (of this Interval and the other Interval) is equal to the other Interval; false otherwise.
       * @param {Interval} other
       * @return {boolean}
       */
      engulfs(other) {
        if (!this.isValid) return false;
        return this.s <= other.s && this.e >= other.e;
      }
      /**
       * Return whether this Interval has the same start and end as the specified Interval.
       * @param {Interval} other
       * @return {boolean}
       */
      equals(other) {
        if (!this.isValid || !other.isValid) {
          return false;
        }
        return this.s.equals(other.s) && this.e.equals(other.e);
      }
      /**
       * Return an Interval representing the intersection of this Interval and the specified Interval.
       * Specifically, the resulting Interval has the maximum start time and the minimum end time of the two Intervals.
       * Returns null if the intersection is empty, meaning, the intervals don't intersect.
       * @param {Interval} other
       * @return {Interval}
       */
      intersection(other) {
        if (!this.isValid) return this;
        const s2 = this.s > other.s ? this.s : other.s, e = this.e < other.e ? this.e : other.e;
        if (s2 >= e) {
          return null;
        } else {
          return _Interval.fromDateTimes(s2, e);
        }
      }
      /**
       * Return an Interval representing the union of this Interval and the specified Interval.
       * Specifically, the resulting Interval has the minimum start time and the maximum end time of the two Intervals.
       * @param {Interval} other
       * @return {Interval}
       */
      union(other) {
        if (!this.isValid) return this;
        const s2 = this.s < other.s ? this.s : other.s, e = this.e > other.e ? this.e : other.e;
        return _Interval.fromDateTimes(s2, e);
      }
      /**
       * Merge an array of Intervals into an equivalent minimal set of Intervals.
       * Combines overlapping and adjacent Intervals.
       * The resulting array will contain the Intervals in ascending order, that is, starting with the earliest Interval
       * and ending with the latest.
       *
       * @param {Array} intervals
       * @return {Array}
       */
      static merge(intervals) {
        const [found, final] = intervals.sort((a, b) => a.s - b.s).reduce(([sofar, current], item) => {
          if (!current) {
            return [sofar, item];
          } else if (current.overlaps(item) || current.abutsStart(item)) {
            return [sofar, current.union(item)];
          } else {
            return [sofar.concat([current]), item];
          }
        }, [[], null]);
        if (final) {
          found.push(final);
        }
        return found;
      }
      /**
       * Return an array of Intervals representing the spans of time that only appear in one of the specified Intervals.
       * @param {Array} intervals
       * @return {Array}
       */
      static xor(intervals) {
        let start = null, currentCount = 0;
        const results = [], ends = intervals.map((i) => [{
          time: i.s,
          type: "s"
        }, {
          time: i.e,
          type: "e"
        }]), flattened = Array.prototype.concat(...ends), arr = flattened.sort((a, b) => a.time - b.time);
        for (const i of arr) {
          currentCount += i.type === "s" ? 1 : -1;
          if (currentCount === 1) {
            start = i.time;
          } else {
            if (start && +start !== +i.time) {
              results.push(_Interval.fromDateTimes(start, i.time));
            }
            start = null;
          }
        }
        return _Interval.merge(results);
      }
      /**
       * Return an Interval representing the span of time in this Interval that doesn't overlap with any of the specified Intervals.
       * @param {...Interval} intervals
       * @return {Array}
       */
      difference(...intervals) {
        return _Interval.xor([this].concat(intervals)).map((i) => this.intersection(i)).filter((i) => i && !i.isEmpty());
      }
      /**
       * Returns a string representation of this Interval appropriate for debugging.
       * @return {string}
       */
      toString() {
        if (!this.isValid) return INVALID$1;
        return `[${this.s.toISO()} \u2013 ${this.e.toISO()})`;
      }
      /**
       * Returns a string representation of this Interval appropriate for the REPL.
       * @return {string}
       */
      [/* @__PURE__ */ Symbol.for("nodejs.util.inspect.custom")]() {
        if (this.isValid) {
          return `Interval { start: ${this.s.toISO()}, end: ${this.e.toISO()} }`;
        } else {
          return `Interval { Invalid, reason: ${this.invalidReason} }`;
        }
      }
      /**
       * Returns a localized string representing this Interval. Accepts the same options as the
       * Intl.DateTimeFormat constructor and any presets defined by Luxon, such as
       * {@link DateTime.DATE_FULL} or {@link DateTime.TIME_SIMPLE}. The exact behavior of this method
       * is browser-specific, but in general it will return an appropriate representation of the
       * Interval in the assigned locale. Defaults to the system's locale if no locale has been
       * specified.
       * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/DateTimeFormat
       * @param {Object} [formatOpts=DateTime.DATE_SHORT] - Either a DateTime preset or
       * Intl.DateTimeFormat constructor options.
       * @param {Object} opts - Options to override the configuration of the start DateTime.
       * @example Interval.fromISO('2022-11-07T09:00Z/2022-11-08T09:00Z').toLocaleString(); //=> 11/7/2022 – 11/8/2022
       * @example Interval.fromISO('2022-11-07T09:00Z/2022-11-08T09:00Z').toLocaleString(DateTime.DATE_FULL); //=> November 7 – 8, 2022
       * @example Interval.fromISO('2022-11-07T09:00Z/2022-11-08T09:00Z').toLocaleString(DateTime.DATE_FULL, { locale: 'fr-FR' }); //=> 7–8 novembre 2022
       * @example Interval.fromISO('2022-11-07T17:00Z/2022-11-07T19:00Z').toLocaleString(DateTime.TIME_SIMPLE); //=> 6:00 – 8:00 PM
       * @example Interval.fromISO('2022-11-07T17:00Z/2022-11-07T19:00Z').toLocaleString({ weekday: 'short', month: 'short', day: '2-digit', hour: '2-digit', minute: '2-digit' }); //=> Mon, Nov 07, 6:00 – 8:00 p
       * @return {string}
       */
      toLocaleString(formatOpts = DATE_SHORT, opts = {}) {
        return this.isValid ? Formatter.create(this.s.loc.clone(opts), formatOpts).formatInterval(this) : INVALID$1;
      }
      /**
       * Returns an ISO 8601-compliant string representation of this Interval.
       * @see https://en.wikipedia.org/wiki/ISO_8601#Time_intervals
       * @param {Object} opts - The same options as {@link DateTime#toISO}
       * @return {string}
       */
      toISO(opts) {
        if (!this.isValid) return INVALID$1;
        return `${this.s.toISO(opts)}/${this.e.toISO(opts)}`;
      }
      /**
       * Returns an ISO 8601-compliant string representation of date of this Interval.
       * The time components are ignored.
       * @see https://en.wikipedia.org/wiki/ISO_8601#Time_intervals
       * @return {string}
       */
      toISODate() {
        if (!this.isValid) return INVALID$1;
        return `${this.s.toISODate()}/${this.e.toISODate()}`;
      }
      /**
       * Returns an ISO 8601-compliant string representation of time of this Interval.
       * The date components are ignored.
       * @see https://en.wikipedia.org/wiki/ISO_8601#Time_intervals
       * @param {Object} opts - The same options as {@link DateTime#toISO}
       * @return {string}
       */
      toISOTime(opts) {
        if (!this.isValid) return INVALID$1;
        return `${this.s.toISOTime(opts)}/${this.e.toISOTime(opts)}`;
      }
      /**
       * Returns a string representation of this Interval formatted according to the specified format
       * string. **You may not want this.** See {@link Interval#toLocaleString} for a more flexible
       * formatting tool.
       * @param {string} dateFormat - The format string. This string formats the start and end time.
       * See {@link DateTime#toFormat} for details.
       * @param {Object} opts - Options.
       * @param {string} [opts.separator =  ' – '] - A separator to place between the start and end
       * representations.
       * @return {string}
       */
      toFormat(dateFormat, {
        separator = " \u2013 "
      } = {}) {
        if (!this.isValid) return INVALID$1;
        return `${this.s.toFormat(dateFormat)}${separator}${this.e.toFormat(dateFormat)}`;
      }
      /**
       * Return a Duration representing the time spanned by this interval.
       * @param {string|string[]} [unit=['milliseconds']] - the unit or units (such as 'hours' or 'days') to include in the duration.
       * @param {Object} opts - options that affect the creation of the Duration
       * @param {string} [opts.conversionAccuracy='casual'] - the conversion system to use
       * @example Interval.fromDateTimes(dt1, dt2).toDuration().toObject() //=> { milliseconds: 88489257 }
       * @example Interval.fromDateTimes(dt1, dt2).toDuration('days').toObject() //=> { days: 1.0241812152777778 }
       * @example Interval.fromDateTimes(dt1, dt2).toDuration(['hours', 'minutes']).toObject() //=> { hours: 24, minutes: 34.82095 }
       * @example Interval.fromDateTimes(dt1, dt2).toDuration(['hours', 'minutes', 'seconds']).toObject() //=> { hours: 24, minutes: 34, seconds: 49.257 }
       * @example Interval.fromDateTimes(dt1, dt2).toDuration('seconds').toObject() //=> { seconds: 88489.257 }
       * @return {Duration}
       */
      toDuration(unit, opts) {
        if (!this.isValid) {
          return Duration.invalid(this.invalidReason);
        }
        return this.e.diff(this.s, unit, opts);
      }
      /**
       * Run mapFn on the interval start and end, returning a new Interval from the resulting DateTimes
       * @param {function} mapFn
       * @return {Interval}
       * @example Interval.fromDateTimes(dt1, dt2).mapEndpoints(endpoint => endpoint.toUTC())
       * @example Interval.fromDateTimes(dt1, dt2).mapEndpoints(endpoint => endpoint.plus({ hours: 2 }))
       */
      mapEndpoints(mapFn) {
        return _Interval.fromDateTimes(mapFn(this.s), mapFn(this.e));
      }
    };
    var Info = class {
      /**
       * Return whether the specified zone contains a DST.
       * @param {string|Zone} [zone='local'] - Zone to check. Defaults to the environment's local zone.
       * @return {boolean}
       */
      static hasDST(zone = Settings.defaultZone) {
        const proto = DateTime.now().setZone(zone).set({
          month: 12
        });
        return !zone.isUniversal && proto.offset !== proto.set({
          month: 6
        }).offset;
      }
      /**
       * Return whether the specified zone is a valid IANA specifier.
       * @param {string} zone - Zone to check
       * @return {boolean}
       */
      static isValidIANAZone(zone) {
        return IANAZone.isValidZone(zone);
      }
      /**
       * Converts the input into a {@link Zone} instance.
       *
       * * If `input` is already a Zone instance, it is returned unchanged.
       * * If `input` is a string containing a valid time zone name, a Zone instance
       *   with that name is returned.
       * * If `input` is a string that doesn't refer to a known time zone, a Zone
       *   instance with {@link Zone#isValid} == false is returned.
       * * If `input is a number, a Zone instance with the specified fixed offset
       *   in minutes is returned.
       * * If `input` is `null` or `undefined`, the default zone is returned.
       * @param {string|Zone|number} [input] - the value to be converted
       * @return {Zone}
       */
      static normalizeZone(input) {
        return normalizeZone(input, Settings.defaultZone);
      }
      /**
       * Get the weekday on which the week starts according to the given locale.
       * @param {Object} opts - options
       * @param {string} [opts.locale] - the locale code
       * @param {string} [opts.locObj=null] - an existing locale object to use
       * @returns {number} the start of the week, 1 for Monday through 7 for Sunday
       */
      static getStartOfWeek({
        locale: locale2 = null,
        locObj = null
      } = {}) {
        return (locObj || Locale.create(locale2)).getStartOfWeek();
      }
      /**
       * Get the minimum number of days necessary in a week before it is considered part of the next year according
       * to the given locale.
       * @param {Object} opts - options
       * @param {string} [opts.locale] - the locale code
       * @param {string} [opts.locObj=null] - an existing locale object to use
       * @returns {number}
       */
      static getMinimumDaysInFirstWeek({
        locale: locale2 = null,
        locObj = null
      } = {}) {
        return (locObj || Locale.create(locale2)).getMinDaysInFirstWeek();
      }
      /**
       * Get the weekdays, which are considered the weekend according to the given locale
       * @param {Object} opts - options
       * @param {string} [opts.locale] - the locale code
       * @param {string} [opts.locObj=null] - an existing locale object to use
       * @returns {number[]} an array of weekdays, 1 for Monday through 7 for Sunday
       */
      static getWeekendWeekdays({
        locale: locale2 = null,
        locObj = null
      } = {}) {
        return (locObj || Locale.create(locale2)).getWeekendDays().slice();
      }
      /**
       * Return an array of standalone month names.
       * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/DateTimeFormat
       * @param {string} [length='long'] - the length of the month representation, such as "numeric", "2-digit", "narrow", "short", "long"
       * @param {Object} opts - options
       * @param {string} [opts.locale] - the locale code
       * @param {string} [opts.numberingSystem=null] - the numbering system
       * @param {string} [opts.locObj=null] - an existing locale object to use
       * @param {string} [opts.outputCalendar='gregory'] - the calendar
       * @example Info.months()[0] //=> 'January'
       * @example Info.months('short')[0] //=> 'Jan'
       * @example Info.months('numeric')[0] //=> '1'
       * @example Info.months('short', { locale: 'fr-CA' } )[0] //=> 'janv.'
       * @example Info.months('numeric', { locale: 'ar' })[0] //=> '١'
       * @example Info.months('long', { outputCalendar: 'islamic' })[0] //=> 'Rabiʻ I'
       * @return {Array}
       */
      static months(length = "long", {
        locale: locale2 = null,
        numberingSystem = null,
        locObj = null,
        outputCalendar = "gregory"
      } = {}) {
        return (locObj || Locale.create(locale2, numberingSystem, outputCalendar)).months(length);
      }
      /**
       * Return an array of format month names.
       * Format months differ from standalone months in that they're meant to appear next to the day of the month. In some languages, that
       * changes the string.
       * See {@link Info#months}
       * @param {string} [length='long'] - the length of the month representation, such as "numeric", "2-digit", "narrow", "short", "long"
       * @param {Object} opts - options
       * @param {string} [opts.locale] - the locale code
       * @param {string} [opts.numberingSystem=null] - the numbering system
       * @param {string} [opts.locObj=null] - an existing locale object to use
       * @param {string} [opts.outputCalendar='gregory'] - the calendar
       * @return {Array}
       */
      static monthsFormat(length = "long", {
        locale: locale2 = null,
        numberingSystem = null,
        locObj = null,
        outputCalendar = "gregory"
      } = {}) {
        return (locObj || Locale.create(locale2, numberingSystem, outputCalendar)).months(length, true);
      }
      /**
       * Return an array of standalone week names.
       * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/DateTimeFormat
       * @param {string} [length='long'] - the length of the weekday representation, such as "narrow", "short", "long".
       * @param {Object} opts - options
       * @param {string} [opts.locale] - the locale code
       * @param {string} [opts.numberingSystem=null] - the numbering system
       * @param {string} [opts.locObj=null] - an existing locale object to use
       * @example Info.weekdays()[0] //=> 'Monday'
       * @example Info.weekdays('short')[0] //=> 'Mon'
       * @example Info.weekdays('short', { locale: 'fr-CA' })[0] //=> 'lun.'
       * @example Info.weekdays('short', { locale: 'ar' })[0] //=> 'الاثنين'
       * @return {Array}
       */
      static weekdays(length = "long", {
        locale: locale2 = null,
        numberingSystem = null,
        locObj = null
      } = {}) {
        return (locObj || Locale.create(locale2, numberingSystem, null)).weekdays(length);
      }
      /**
       * Return an array of format week names.
       * Format weekdays differ from standalone weekdays in that they're meant to appear next to more date information. In some languages, that
       * changes the string.
       * See {@link Info#weekdays}
       * @param {string} [length='long'] - the length of the month representation, such as "narrow", "short", "long".
       * @param {Object} opts - options
       * @param {string} [opts.locale=null] - the locale code
       * @param {string} [opts.numberingSystem=null] - the numbering system
       * @param {string} [opts.locObj=null] - an existing locale object to use
       * @return {Array}
       */
      static weekdaysFormat(length = "long", {
        locale: locale2 = null,
        numberingSystem = null,
        locObj = null
      } = {}) {
        return (locObj || Locale.create(locale2, numberingSystem, null)).weekdays(length, true);
      }
      /**
       * Return an array of meridiems.
       * @param {Object} opts - options
       * @param {string} [opts.locale] - the locale code
       * @example Info.meridiems() //=> [ 'AM', 'PM' ]
       * @example Info.meridiems({ locale: 'my' }) //=> [ 'နံနက်', 'ညနေ' ]
       * @return {Array}
       */
      static meridiems({
        locale: locale2 = null
      } = {}) {
        return Locale.create(locale2).meridiems();
      }
      /**
       * Return an array of eras, such as ['BC', 'AD']. The locale can be specified, but the calendar system is always Gregorian.
       * @param {string} [length='short'] - the length of the era representation, such as "short" or "long".
       * @param {Object} opts - options
       * @param {string} [opts.locale] - the locale code
       * @example Info.eras() //=> [ 'BC', 'AD' ]
       * @example Info.eras('long') //=> [ 'Before Christ', 'Anno Domini' ]
       * @example Info.eras('long', { locale: 'fr' }) //=> [ 'avant Jésus-Christ', 'après Jésus-Christ' ]
       * @return {Array}
       */
      static eras(length = "short", {
        locale: locale2 = null
      } = {}) {
        return Locale.create(locale2, null, "gregory").eras(length);
      }
      /**
       * Return the set of available features in this environment.
       * Some features of Luxon are not available in all environments. For example, on older browsers, relative time formatting support is not available. Use this function to figure out if that's the case.
       * Keys:
       * * `relative`: whether this environment supports relative time formatting
       * * `localeWeek`: whether this environment supports different weekdays for the start of the week based on the locale
       * @example Info.features() //=> { relative: false, localeWeek: true }
       * @return {Object}
       */
      static features() {
        return {
          relative: hasRelative(),
          localeWeek: hasLocaleWeekInfo()
        };
      }
    };
    function dayDiff(earlier, later) {
      const utcDayStart = (dt) => dt.toUTC(0, {
        keepLocalTime: true
      }).startOf("day").valueOf(), ms = utcDayStart(later) - utcDayStart(earlier);
      return Math.floor(Duration.fromMillis(ms).as("days"));
    }
    function highOrderDiffs(cursor, later, units) {
      const differs = [["years", (a, b) => b.year - a.year], ["quarters", (a, b) => b.quarter - a.quarter + (b.year - a.year) * 4], ["months", (a, b) => b.month - a.month + (b.year - a.year) * 12], ["weeks", (a, b) => {
        const days = dayDiff(a, b);
        return (days - days % 7) / 7;
      }], ["days", dayDiff]];
      const results = {};
      const earlier = cursor;
      let lowestOrder, highWater;
      for (const [unit, differ] of differs) {
        if (units.indexOf(unit) >= 0) {
          lowestOrder = unit;
          results[unit] = differ(cursor, later);
          highWater = earlier.plus(results);
          if (highWater > later) {
            results[unit]--;
            cursor = earlier.plus(results);
            if (cursor > later) {
              highWater = cursor;
              results[unit]--;
              cursor = earlier.plus(results);
            }
          } else {
            cursor = highWater;
          }
        }
      }
      return [cursor, results, highWater, lowestOrder];
    }
    function diff(earlier, later, units, opts) {
      let [cursor, results, highWater, lowestOrder] = highOrderDiffs(earlier, later, units);
      const remainingMillis = later - cursor;
      const lowerOrderUnits = units.filter((u) => ["hours", "minutes", "seconds", "milliseconds"].indexOf(u) >= 0);
      if (lowerOrderUnits.length === 0) {
        if (highWater < later) {
          highWater = cursor.plus({
            [lowestOrder]: 1
          });
        }
        if (highWater !== cursor) {
          results[lowestOrder] = (results[lowestOrder] || 0) + remainingMillis / (highWater - cursor);
        }
      }
      const duration = Duration.fromObject(results, opts);
      if (lowerOrderUnits.length > 0) {
        return Duration.fromMillis(remainingMillis, opts).shiftTo(...lowerOrderUnits).plus(duration);
      } else {
        return duration;
      }
    }
    var MISSING_FTP = "missing Intl.DateTimeFormat.formatToParts support";
    function intUnit(regex, post = (i) => i) {
      return {
        regex,
        deser: ([s2]) => post(parseDigits(s2))
      };
    }
    var NBSP = String.fromCharCode(160);
    var spaceOrNBSP = `[ ${NBSP}]`;
    var spaceOrNBSPRegExp = new RegExp(spaceOrNBSP, "g");
    function fixListRegex(s2) {
      return s2.replace(/\./g, "\\.?").replace(spaceOrNBSPRegExp, spaceOrNBSP);
    }
    function stripInsensitivities(s2) {
      return s2.replace(/\./g, "").replace(spaceOrNBSPRegExp, " ").toLowerCase();
    }
    function oneOf(strings, startIndex) {
      if (strings === null) {
        return null;
      } else {
        return {
          regex: RegExp(strings.map(fixListRegex).join("|")),
          deser: ([s2]) => strings.findIndex((i) => stripInsensitivities(s2) === stripInsensitivities(i)) + startIndex
        };
      }
    }
    function offset(regex, groups) {
      return {
        regex,
        deser: ([, h, m]) => signedOffset(h, m),
        groups
      };
    }
    function simple(regex) {
      return {
        regex,
        deser: ([s2]) => s2
      };
    }
    function escapeToken(value) {
      return value.replace(/[\-\[\]{}()*+?.,\\\^$|#\s]/g, "\\$&");
    }
    function unitForToken(token, loc) {
      const one = digitRegex(loc), two = digitRegex(loc, "{2}"), three = digitRegex(loc, "{3}"), four = digitRegex(loc, "{4}"), six = digitRegex(loc, "{6}"), oneOrTwo = digitRegex(loc, "{1,2}"), oneToThree = digitRegex(loc, "{1,3}"), oneToSix = digitRegex(loc, "{1,6}"), oneToNine = digitRegex(loc, "{1,9}"), twoToFour = digitRegex(loc, "{2,4}"), fourToSix = digitRegex(loc, "{4,6}"), literal = (t) => ({
        regex: RegExp(escapeToken(t.val)),
        deser: ([s2]) => s2,
        literal: true
      }), unitate = (t) => {
        if (token.literal) {
          return literal(t);
        }
        switch (t.val) {
          // era
          case "G":
            return oneOf(loc.eras("short"), 0);
          case "GG":
            return oneOf(loc.eras("long"), 0);
          // years
          case "y":
            return intUnit(oneToSix);
          case "yy":
            return intUnit(twoToFour, untruncateYear);
          case "yyyy":
            return intUnit(four);
          case "yyyyy":
            return intUnit(fourToSix);
          case "yyyyyy":
            return intUnit(six);
          // months
          case "M":
            return intUnit(oneOrTwo);
          case "MM":
            return intUnit(two);
          case "MMM":
            return oneOf(loc.months("short", true), 1);
          case "MMMM":
            return oneOf(loc.months("long", true), 1);
          case "L":
            return intUnit(oneOrTwo);
          case "LL":
            return intUnit(two);
          case "LLL":
            return oneOf(loc.months("short", false), 1);
          case "LLLL":
            return oneOf(loc.months("long", false), 1);
          // dates
          case "d":
            return intUnit(oneOrTwo);
          case "dd":
            return intUnit(two);
          // ordinals
          case "o":
            return intUnit(oneToThree);
          case "ooo":
            return intUnit(three);
          // time
          case "HH":
            return intUnit(two);
          case "H":
            return intUnit(oneOrTwo);
          case "hh":
            return intUnit(two);
          case "h":
            return intUnit(oneOrTwo);
          case "mm":
            return intUnit(two);
          case "m":
            return intUnit(oneOrTwo);
          case "q":
            return intUnit(oneOrTwo);
          case "qq":
            return intUnit(two);
          case "s":
            return intUnit(oneOrTwo);
          case "ss":
            return intUnit(two);
          case "S":
            return intUnit(oneToThree);
          case "SSS":
            return intUnit(three);
          case "u":
            return simple(oneToNine);
          case "uu":
            return simple(oneOrTwo);
          case "uuu":
            return intUnit(one);
          // meridiem
          case "a":
            return oneOf(loc.meridiems(), 0);
          // weekYear (k)
          case "kkkk":
            return intUnit(four);
          case "kk":
            return intUnit(twoToFour, untruncateYear);
          // weekNumber (W)
          case "W":
            return intUnit(oneOrTwo);
          case "WW":
            return intUnit(two);
          // weekdays
          case "E":
          case "c":
            return intUnit(one);
          case "EEE":
            return oneOf(loc.weekdays("short", false), 1);
          case "EEEE":
            return oneOf(loc.weekdays("long", false), 1);
          case "ccc":
            return oneOf(loc.weekdays("short", true), 1);
          case "cccc":
            return oneOf(loc.weekdays("long", true), 1);
          // offset/zone
          case "Z":
          case "ZZ":
            return offset(new RegExp(`([+-]${oneOrTwo.source})(?::(${two.source}))?`), 2);
          case "ZZZ":
            return offset(new RegExp(`([+-]${oneOrTwo.source})(${two.source})?`), 2);
          // we don't support ZZZZ (PST) or ZZZZZ (Pacific Standard Time) in parsing
          // because we don't have any way to figure out what they are
          case "z":
            return simple(/[a-z_+-/]{1,256}?/i);
          // this special-case "token" represents a place where a macro-token expanded into a white-space literal
          // in this case we accept any non-newline white-space
          case " ":
            return simple(/[^\S\n\r]/);
          default:
            return literal(t);
        }
      };
      const unit = unitate(token) || {
        invalidReason: MISSING_FTP
      };
      unit.token = token;
      return unit;
    }
    var partTypeStyleToTokenVal = {
      year: {
        "2-digit": "yy",
        numeric: "yyyyy"
      },
      month: {
        numeric: "M",
        "2-digit": "MM",
        short: "MMM",
        long: "MMMM"
      },
      day: {
        numeric: "d",
        "2-digit": "dd"
      },
      weekday: {
        short: "EEE",
        long: "EEEE"
      },
      dayperiod: "a",
      dayPeriod: "a",
      hour12: {
        numeric: "h",
        "2-digit": "hh"
      },
      hour24: {
        numeric: "H",
        "2-digit": "HH"
      },
      minute: {
        numeric: "m",
        "2-digit": "mm"
      },
      second: {
        numeric: "s",
        "2-digit": "ss"
      },
      timeZoneName: {
        long: "ZZZZZ",
        short: "ZZZ"
      }
    };
    function tokenForPart(part, formatOpts, resolvedOpts) {
      const {
        type,
        value
      } = part;
      if (type === "literal") {
        const isSpace = /^\s+$/.test(value);
        return {
          literal: !isSpace,
          val: isSpace ? " " : value
        };
      }
      const style = formatOpts[type];
      let actualType = type;
      if (type === "hour") {
        if (formatOpts.hour12 != null) {
          actualType = formatOpts.hour12 ? "hour12" : "hour24";
        } else if (formatOpts.hourCycle != null) {
          if (formatOpts.hourCycle === "h11" || formatOpts.hourCycle === "h12") {
            actualType = "hour12";
          } else {
            actualType = "hour24";
          }
        } else {
          actualType = resolvedOpts.hour12 ? "hour12" : "hour24";
        }
      }
      let val = partTypeStyleToTokenVal[actualType];
      if (typeof val === "object") {
        val = val[style];
      }
      if (val) {
        return {
          literal: false,
          val
        };
      }
      return void 0;
    }
    function buildRegex(units) {
      const re = units.map((u) => u.regex).reduce((f, r) => `${f}(${r.source})`, "");
      return [`^${re}$`, units];
    }
    function match(input, regex, handlers) {
      const matches = input.match(regex);
      if (matches) {
        const all = {};
        let matchIndex = 1;
        for (const i in handlers) {
          if (hasOwnProperty(handlers, i)) {
            const h = handlers[i], groups = h.groups ? h.groups + 1 : 1;
            if (!h.literal && h.token) {
              all[h.token.val[0]] = h.deser(matches.slice(matchIndex, matchIndex + groups));
            }
            matchIndex += groups;
          }
        }
        return [matches, all];
      } else {
        return [matches, {}];
      }
    }
    function dateTimeFromMatches(matches) {
      const toField = (token) => {
        switch (token) {
          case "S":
            return "millisecond";
          case "s":
            return "second";
          case "m":
            return "minute";
          case "h":
          case "H":
            return "hour";
          case "d":
            return "day";
          case "o":
            return "ordinal";
          case "L":
          case "M":
            return "month";
          case "y":
            return "year";
          case "E":
          case "c":
            return "weekday";
          case "W":
            return "weekNumber";
          case "k":
            return "weekYear";
          case "q":
            return "quarter";
          default:
            return null;
        }
      };
      let zone = null;
      let specificOffset;
      if (!isUndefined(matches.z)) {
        zone = IANAZone.create(matches.z);
      }
      if (!isUndefined(matches.Z)) {
        if (!zone) {
          zone = new FixedOffsetZone(matches.Z);
        }
        specificOffset = matches.Z;
      }
      if (!isUndefined(matches.q)) {
        matches.M = (matches.q - 1) * 3 + 1;
      }
      if (!isUndefined(matches.h)) {
        if (matches.h < 12 && matches.a === 1) {
          matches.h += 12;
        } else if (matches.h === 12 && matches.a === 0) {
          matches.h = 0;
        }
      }
      if (matches.G === 0 && matches.y) {
        matches.y = -matches.y;
      }
      if (!isUndefined(matches.u)) {
        matches.S = parseMillis(matches.u);
      }
      const vals = Object.keys(matches).reduce((r, k) => {
        const f = toField(k);
        if (f) {
          r[f] = matches[k];
        }
        return r;
      }, {});
      return [vals, zone, specificOffset];
    }
    var dummyDateTimeCache = null;
    function getDummyDateTime() {
      if (!dummyDateTimeCache) {
        dummyDateTimeCache = DateTime.fromMillis(1555555555555);
      }
      return dummyDateTimeCache;
    }
    function maybeExpandMacroToken(token, locale2) {
      if (token.literal) {
        return token;
      }
      const formatOpts = Formatter.macroTokenToFormatOpts(token.val);
      const tokens = formatOptsToTokens(formatOpts, locale2);
      if (tokens == null || tokens.includes(void 0)) {
        return token;
      }
      return tokens;
    }
    function expandMacroTokens(tokens, locale2) {
      return Array.prototype.concat(...tokens.map((t) => maybeExpandMacroToken(t, locale2)));
    }
    var TokenParser = class {
      constructor(locale2, format) {
        this.locale = locale2;
        this.format = format;
        this.tokens = expandMacroTokens(Formatter.parseFormat(format), locale2);
        this.units = this.tokens.map((t) => unitForToken(t, locale2));
        this.disqualifyingUnit = this.units.find((t) => t.invalidReason);
        if (!this.disqualifyingUnit) {
          const [regexString, handlers] = buildRegex(this.units);
          this.regex = RegExp(regexString, "i");
          this.handlers = handlers;
        }
      }
      explainFromTokens(input) {
        if (!this.isValid) {
          return {
            input,
            tokens: this.tokens,
            invalidReason: this.invalidReason
          };
        } else {
          const [rawMatches, matches] = match(input, this.regex, this.handlers), [result, zone, specificOffset] = matches ? dateTimeFromMatches(matches) : [null, null, void 0];
          if (hasOwnProperty(matches, "a") && hasOwnProperty(matches, "H")) {
            throw new ConflictingSpecificationError("Can't include meridiem when specifying 24-hour format");
          }
          return {
            input,
            tokens: this.tokens,
            regex: this.regex,
            rawMatches,
            matches,
            result,
            zone,
            specificOffset
          };
        }
      }
      get isValid() {
        return !this.disqualifyingUnit;
      }
      get invalidReason() {
        return this.disqualifyingUnit ? this.disqualifyingUnit.invalidReason : null;
      }
    };
    function explainFromTokens(locale2, input, format) {
      const parser = new TokenParser(locale2, format);
      return parser.explainFromTokens(input);
    }
    function parseFromTokens(locale2, input, format) {
      const {
        result,
        zone,
        specificOffset,
        invalidReason
      } = explainFromTokens(locale2, input, format);
      return [result, zone, specificOffset, invalidReason];
    }
    function formatOptsToTokens(formatOpts, locale2) {
      if (!formatOpts) {
        return null;
      }
      const formatter = Formatter.create(locale2, formatOpts);
      const df = formatter.dtFormatter(getDummyDateTime());
      const parts = df.formatToParts();
      const resolvedOpts = df.resolvedOptions();
      return parts.map((p) => tokenForPart(p, formatOpts, resolvedOpts));
    }
    var INVALID = "Invalid DateTime";
    var MAX_DATE = 864e13;
    function unsupportedZone(zone) {
      return new Invalid("unsupported zone", `the zone "${zone.name}" is not supported`);
    }
    function possiblyCachedWeekData(dt) {
      if (dt.weekData === null) {
        dt.weekData = gregorianToWeek(dt.c);
      }
      return dt.weekData;
    }
    function possiblyCachedLocalWeekData(dt) {
      if (dt.localWeekData === null) {
        dt.localWeekData = gregorianToWeek(dt.c, dt.loc.getMinDaysInFirstWeek(), dt.loc.getStartOfWeek());
      }
      return dt.localWeekData;
    }
    function clone2(inst, alts) {
      const current = {
        ts: inst.ts,
        zone: inst.zone,
        c: inst.c,
        o: inst.o,
        loc: inst.loc,
        invalid: inst.invalid
      };
      return new DateTime({
        ...current,
        ...alts,
        old: current
      });
    }
    function fixOffset(localTS, o, tz) {
      let utcGuess = localTS - o * 60 * 1e3;
      const o2 = tz.offset(utcGuess);
      if (o === o2) {
        return [utcGuess, o];
      }
      utcGuess -= (o2 - o) * 60 * 1e3;
      const o3 = tz.offset(utcGuess);
      if (o2 === o3) {
        return [utcGuess, o2];
      }
      return [localTS - Math.min(o2, o3) * 60 * 1e3, Math.max(o2, o3)];
    }
    function tsToObj(ts, offset2) {
      ts += offset2 * 60 * 1e3;
      const d = new Date(ts);
      return {
        year: d.getUTCFullYear(),
        month: d.getUTCMonth() + 1,
        day: d.getUTCDate(),
        hour: d.getUTCHours(),
        minute: d.getUTCMinutes(),
        second: d.getUTCSeconds(),
        millisecond: d.getUTCMilliseconds()
      };
    }
    function objToTS(obj, offset2, zone) {
      return fixOffset(objToLocalTS(obj), offset2, zone);
    }
    function adjustTime(inst, dur) {
      const oPre = inst.o, year = inst.c.year + Math.trunc(dur.years), month = inst.c.month + Math.trunc(dur.months) + Math.trunc(dur.quarters) * 3, c3 = {
        ...inst.c,
        year,
        month,
        day: Math.min(inst.c.day, daysInMonth(year, month)) + Math.trunc(dur.days) + Math.trunc(dur.weeks) * 7
      }, millisToAdd = Duration.fromObject({
        years: dur.years - Math.trunc(dur.years),
        quarters: dur.quarters - Math.trunc(dur.quarters),
        months: dur.months - Math.trunc(dur.months),
        weeks: dur.weeks - Math.trunc(dur.weeks),
        days: dur.days - Math.trunc(dur.days),
        hours: dur.hours,
        minutes: dur.minutes,
        seconds: dur.seconds,
        milliseconds: dur.milliseconds
      }).as("milliseconds"), localTS = objToLocalTS(c3);
      let [ts, o] = fixOffset(localTS, oPre, inst.zone);
      if (millisToAdd !== 0) {
        ts += millisToAdd;
        o = inst.zone.offset(ts);
      }
      return {
        ts,
        o
      };
    }
    function parseDataToDateTime(parsed, parsedZone, opts, format, text, specificOffset) {
      const {
        setZone,
        zone
      } = opts;
      if (parsed && Object.keys(parsed).length !== 0 || parsedZone) {
        const interpretationZone = parsedZone || zone, inst = DateTime.fromObject(parsed, {
          ...opts,
          zone: interpretationZone,
          specificOffset
        });
        return setZone ? inst : inst.setZone(zone);
      } else {
        return DateTime.invalid(new Invalid("unparsable", `the input "${text}" can't be parsed as ${format}`));
      }
    }
    function toTechFormat(dt, format, allowZ = true) {
      return dt.isValid ? Formatter.create(Locale.create("en-US"), {
        allowZ,
        forceSimple: true
      }).formatDateTimeFromString(dt, format) : null;
    }
    function toISODate(o, extended, precision) {
      const longFormat = o.c.year > 9999 || o.c.year < 0;
      let c3 = "";
      if (longFormat && o.c.year >= 0) c3 += "+";
      c3 += padStart(o.c.year, longFormat ? 6 : 4);
      if (precision === "year") return c3;
      if (extended) {
        c3 += "-";
        c3 += padStart(o.c.month);
        if (precision === "month") return c3;
        c3 += "-";
      } else {
        c3 += padStart(o.c.month);
        if (precision === "month") return c3;
      }
      c3 += padStart(o.c.day);
      return c3;
    }
    function toISOTime(o, extended, suppressSeconds, suppressMilliseconds, includeOffset, extendedZone, precision) {
      let showSeconds = !suppressSeconds || o.c.millisecond !== 0 || o.c.second !== 0, c3 = "";
      switch (precision) {
        case "day":
        case "month":
        case "year":
          break;
        default:
          c3 += padStart(o.c.hour);
          if (precision === "hour") break;
          if (extended) {
            c3 += ":";
            c3 += padStart(o.c.minute);
            if (precision === "minute") break;
            if (showSeconds) {
              c3 += ":";
              c3 += padStart(o.c.second);
            }
          } else {
            c3 += padStart(o.c.minute);
            if (precision === "minute") break;
            if (showSeconds) {
              c3 += padStart(o.c.second);
            }
          }
          if (precision === "second") break;
          if (showSeconds && (!suppressMilliseconds || o.c.millisecond !== 0)) {
            c3 += ".";
            c3 += padStart(o.c.millisecond, 3);
          }
      }
      if (includeOffset) {
        if (o.isOffsetFixed && o.offset === 0 && !extendedZone) {
          c3 += "Z";
        } else if (o.o < 0) {
          c3 += "-";
          c3 += padStart(Math.trunc(-o.o / 60));
          c3 += ":";
          c3 += padStart(Math.trunc(-o.o % 60));
        } else {
          c3 += "+";
          c3 += padStart(Math.trunc(o.o / 60));
          c3 += ":";
          c3 += padStart(Math.trunc(o.o % 60));
        }
      }
      if (extendedZone) {
        c3 += "[" + o.zone.ianaName + "]";
      }
      return c3;
    }
    var defaultUnitValues = {
      month: 1,
      day: 1,
      hour: 0,
      minute: 0,
      second: 0,
      millisecond: 0
    };
    var defaultWeekUnitValues = {
      weekNumber: 1,
      weekday: 1,
      hour: 0,
      minute: 0,
      second: 0,
      millisecond: 0
    };
    var defaultOrdinalUnitValues = {
      ordinal: 1,
      hour: 0,
      minute: 0,
      second: 0,
      millisecond: 0
    };
    var orderedUnits = ["year", "month", "day", "hour", "minute", "second", "millisecond"];
    var orderedWeekUnits = ["weekYear", "weekNumber", "weekday", "hour", "minute", "second", "millisecond"];
    var orderedOrdinalUnits = ["year", "ordinal", "hour", "minute", "second", "millisecond"];
    function normalizeUnit(unit) {
      const normalized = {
        year: "year",
        years: "year",
        month: "month",
        months: "month",
        day: "day",
        days: "day",
        hour: "hour",
        hours: "hour",
        minute: "minute",
        minutes: "minute",
        quarter: "quarter",
        quarters: "quarter",
        second: "second",
        seconds: "second",
        millisecond: "millisecond",
        milliseconds: "millisecond",
        weekday: "weekday",
        weekdays: "weekday",
        weeknumber: "weekNumber",
        weeksnumber: "weekNumber",
        weeknumbers: "weekNumber",
        weekyear: "weekYear",
        weekyears: "weekYear",
        ordinal: "ordinal"
      }[unit.toLowerCase()];
      if (!normalized) throw new InvalidUnitError(unit);
      return normalized;
    }
    function normalizeUnitWithLocalWeeks(unit) {
      switch (unit.toLowerCase()) {
        case "localweekday":
        case "localweekdays":
          return "localWeekday";
        case "localweeknumber":
        case "localweeknumbers":
          return "localWeekNumber";
        case "localweekyear":
        case "localweekyears":
          return "localWeekYear";
        default:
          return normalizeUnit(unit);
      }
    }
    function guessOffsetForZone(zone) {
      if (zoneOffsetTs === void 0) {
        zoneOffsetTs = Settings.now();
      }
      if (zone.type !== "iana") {
        return zone.offset(zoneOffsetTs);
      }
      const zoneName = zone.name;
      let offsetGuess = zoneOffsetGuessCache.get(zoneName);
      if (offsetGuess === void 0) {
        offsetGuess = zone.offset(zoneOffsetTs);
        zoneOffsetGuessCache.set(zoneName, offsetGuess);
      }
      return offsetGuess;
    }
    function quickDT(obj, opts) {
      const zone = normalizeZone(opts.zone, Settings.defaultZone);
      if (!zone.isValid) {
        return DateTime.invalid(unsupportedZone(zone));
      }
      const loc = Locale.fromObject(opts);
      let ts, o;
      if (!isUndefined(obj.year)) {
        for (const u of orderedUnits) {
          if (isUndefined(obj[u])) {
            obj[u] = defaultUnitValues[u];
          }
        }
        const invalid = hasInvalidGregorianData(obj) || hasInvalidTimeData(obj);
        if (invalid) {
          return DateTime.invalid(invalid);
        }
        const offsetProvis = guessOffsetForZone(zone);
        [ts, o] = objToTS(obj, offsetProvis, zone);
      } else {
        ts = Settings.now();
      }
      return new DateTime({
        ts,
        zone,
        loc,
        o
      });
    }
    function diffRelative(start, end, opts) {
      const round = isUndefined(opts.round) ? true : opts.round, rounding = isUndefined(opts.rounding) ? "trunc" : opts.rounding, format = (c3, unit) => {
        c3 = roundTo(c3, round || opts.calendary ? 0 : 2, opts.calendary ? "round" : rounding);
        const formatter = end.loc.clone(opts).relFormatter(opts);
        return formatter.format(c3, unit);
      }, differ = (unit) => {
        if (opts.calendary) {
          if (!end.hasSame(start, unit)) {
            return end.startOf(unit).diff(start.startOf(unit), unit).get(unit);
          } else return 0;
        } else {
          return end.diff(start, unit).get(unit);
        }
      };
      if (opts.unit) {
        return format(differ(opts.unit), opts.unit);
      }
      for (const unit of opts.units) {
        const count = differ(unit);
        if (Math.abs(count) >= 1) {
          return format(count, unit);
        }
      }
      return format(start > end ? -0 : 0, opts.units[opts.units.length - 1]);
    }
    function lastOpts(argList) {
      let opts = {}, args;
      if (argList.length > 0 && typeof argList[argList.length - 1] === "object") {
        opts = argList[argList.length - 1];
        args = Array.from(argList).slice(0, argList.length - 1);
      } else {
        args = Array.from(argList);
      }
      return [opts, args];
    }
    var zoneOffsetTs;
    var zoneOffsetGuessCache = /* @__PURE__ */ new Map();
    var DateTime = class _DateTime {
      /**
       * @access private
       */
      constructor(config) {
        const zone = config.zone || Settings.defaultZone;
        let invalid = config.invalid || (Number.isNaN(config.ts) ? new Invalid("invalid input") : null) || (!zone.isValid ? unsupportedZone(zone) : null);
        this.ts = isUndefined(config.ts) ? Settings.now() : config.ts;
        let c3 = null, o = null;
        if (!invalid) {
          const unchanged = config.old && config.old.ts === this.ts && config.old.zone.equals(zone);
          if (unchanged) {
            [c3, o] = [config.old.c, config.old.o];
          } else {
            const ot = isNumber(config.o) && !config.old ? config.o : zone.offset(this.ts);
            c3 = tsToObj(this.ts, ot);
            invalid = Number.isNaN(c3.year) ? new Invalid("invalid input") : null;
            c3 = invalid ? null : c3;
            o = invalid ? null : ot;
          }
        }
        this._zone = zone;
        this.loc = config.loc || Locale.create();
        this.invalid = invalid;
        this.weekData = null;
        this.localWeekData = null;
        this.c = c3;
        this.o = o;
        this.isLuxonDateTime = true;
      }
      // CONSTRUCT
      /**
       * Create a DateTime for the current instant, in the system's time zone.
       *
       * Use Settings to override these default values if needed.
       * @example DateTime.now().toISO() //~> now in the ISO format
       * @return {DateTime}
       */
      static now() {
        return new _DateTime({});
      }
      /**
       * Create a local DateTime
       * @param {number} [year] - The calendar year. If omitted (as in, call `local()` with no arguments), the current time will be used
       * @param {number} [month=1] - The month, 1-indexed
       * @param {number} [day=1] - The day of the month, 1-indexed
       * @param {number} [hour=0] - The hour of the day, in 24-hour time
       * @param {number} [minute=0] - The minute of the hour, meaning a number between 0 and 59
       * @param {number} [second=0] - The second of the minute, meaning a number between 0 and 59
       * @param {number} [millisecond=0] - The millisecond of the second, meaning a number between 0 and 999
       * @example DateTime.local()                                  //~> now
       * @example DateTime.local({ zone: "America/New_York" })      //~> now, in US east coast time
       * @example DateTime.local(2017)                              //~> 2017-01-01T00:00:00
       * @example DateTime.local(2017, 3)                           //~> 2017-03-01T00:00:00
       * @example DateTime.local(2017, 3, 12, { locale: "fr" })     //~> 2017-03-12T00:00:00, with a French locale
       * @example DateTime.local(2017, 3, 12, 5)                    //~> 2017-03-12T05:00:00
       * @example DateTime.local(2017, 3, 12, 5, { zone: "utc" })   //~> 2017-03-12T05:00:00, in UTC
       * @example DateTime.local(2017, 3, 12, 5, 45)                //~> 2017-03-12T05:45:00
       * @example DateTime.local(2017, 3, 12, 5, 45, 10)            //~> 2017-03-12T05:45:10
       * @example DateTime.local(2017, 3, 12, 5, 45, 10, 765)       //~> 2017-03-12T05:45:10.765
       * @return {DateTime}
       */
      static local() {
        const [opts, args] = lastOpts(arguments), [year, month, day, hour, minute, second, millisecond] = args;
        return quickDT({
          year,
          month,
          day,
          hour,
          minute,
          second,
          millisecond
        }, opts);
      }
      /**
       * Create a DateTime in UTC
       * @param {number} [year] - The calendar year. If omitted (as in, call `utc()` with no arguments), the current time will be used
       * @param {number} [month=1] - The month, 1-indexed
       * @param {number} [day=1] - The day of the month
       * @param {number} [hour=0] - The hour of the day, in 24-hour time
       * @param {number} [minute=0] - The minute of the hour, meaning a number between 0 and 59
       * @param {number} [second=0] - The second of the minute, meaning a number between 0 and 59
       * @param {number} [millisecond=0] - The millisecond of the second, meaning a number between 0 and 999
       * @param {Object} options - configuration options for the DateTime
       * @param {string} [options.locale] - a locale to set on the resulting DateTime instance
       * @param {string} [options.outputCalendar] - the output calendar to set on the resulting DateTime instance
       * @param {string} [options.numberingSystem] - the numbering system to set on the resulting DateTime instance
       * @param {string} [options.weekSettings] - the week settings to set on the resulting DateTime instance
       * @example DateTime.utc()                                              //~> now
       * @example DateTime.utc(2017)                                          //~> 2017-01-01T00:00:00Z
       * @example DateTime.utc(2017, 3)                                       //~> 2017-03-01T00:00:00Z
       * @example DateTime.utc(2017, 3, 12)                                   //~> 2017-03-12T00:00:00Z
       * @example DateTime.utc(2017, 3, 12, 5)                                //~> 2017-03-12T05:00:00Z
       * @example DateTime.utc(2017, 3, 12, 5, 45)                            //~> 2017-03-12T05:45:00Z
       * @example DateTime.utc(2017, 3, 12, 5, 45, { locale: "fr" })          //~> 2017-03-12T05:45:00Z with a French locale
       * @example DateTime.utc(2017, 3, 12, 5, 45, 10)                        //~> 2017-03-12T05:45:10Z
       * @example DateTime.utc(2017, 3, 12, 5, 45, 10, 765, { locale: "fr" }) //~> 2017-03-12T05:45:10.765Z with a French locale
       * @return {DateTime}
       */
      static utc() {
        const [opts, args] = lastOpts(arguments), [year, month, day, hour, minute, second, millisecond] = args;
        opts.zone = FixedOffsetZone.utcInstance;
        return quickDT({
          year,
          month,
          day,
          hour,
          minute,
          second,
          millisecond
        }, opts);
      }
      /**
       * Create a DateTime from a JavaScript Date object. Uses the default zone.
       * @param {Date} date - a JavaScript Date object
       * @param {Object} options - configuration options for the DateTime
       * @param {string|Zone} [options.zone='local'] - the zone to place the DateTime into
       * @return {DateTime}
       */
      static fromJSDate(date2, options = {}) {
        const ts = isDate2(date2) ? date2.valueOf() : NaN;
        if (Number.isNaN(ts)) {
          return _DateTime.invalid("invalid input");
        }
        const zoneToUse = normalizeZone(options.zone, Settings.defaultZone);
        if (!zoneToUse.isValid) {
          return _DateTime.invalid(unsupportedZone(zoneToUse));
        }
        return new _DateTime({
          ts,
          zone: zoneToUse,
          loc: Locale.fromObject(options)
        });
      }
      /**
       * Create a DateTime from a number of milliseconds since the epoch (meaning since 1 January 1970 00:00:00 UTC). Uses the default zone.
       * @param {number} milliseconds - a number of milliseconds since 1970 UTC
       * @param {Object} options - configuration options for the DateTime
       * @param {string|Zone} [options.zone='local'] - the zone to place the DateTime into
       * @param {string} [options.locale] - a locale to set on the resulting DateTime instance
       * @param {string} options.outputCalendar - the output calendar to set on the resulting DateTime instance
       * @param {string} options.numberingSystem - the numbering system to set on the resulting DateTime instance
       * @param {string} options.weekSettings - the week settings to set on the resulting DateTime instance
       * @return {DateTime}
       */
      static fromMillis(milliseconds, options = {}) {
        if (!isNumber(milliseconds)) {
          throw new InvalidArgumentError(`fromMillis requires a numerical input, but received a ${typeof milliseconds} with value ${milliseconds}`);
        } else if (milliseconds < -MAX_DATE || milliseconds > MAX_DATE) {
          return _DateTime.invalid("Timestamp out of range");
        } else {
          return new _DateTime({
            ts: milliseconds,
            zone: normalizeZone(options.zone, Settings.defaultZone),
            loc: Locale.fromObject(options)
          });
        }
      }
      /**
       * Create a DateTime from a number of seconds since the epoch (meaning since 1 January 1970 00:00:00 UTC). Uses the default zone.
       * @param {number} seconds - a number of seconds since 1970 UTC
       * @param {Object} options - configuration options for the DateTime
       * @param {string|Zone} [options.zone='local'] - the zone to place the DateTime into
       * @param {string} [options.locale] - a locale to set on the resulting DateTime instance
       * @param {string} options.outputCalendar - the output calendar to set on the resulting DateTime instance
       * @param {string} options.numberingSystem - the numbering system to set on the resulting DateTime instance
       * @param {string} options.weekSettings - the week settings to set on the resulting DateTime instance
       * @return {DateTime}
       */
      static fromSeconds(seconds, options = {}) {
        if (!isNumber(seconds)) {
          throw new InvalidArgumentError("fromSeconds requires a numerical input");
        } else {
          return new _DateTime({
            ts: seconds * 1e3,
            zone: normalizeZone(options.zone, Settings.defaultZone),
            loc: Locale.fromObject(options)
          });
        }
      }
      /**
       * Create a DateTime from a JavaScript object with keys like 'year' and 'hour' with reasonable defaults.
       * @param {Object} obj - the object to create the DateTime from
       * @param {number} obj.year - a year, such as 1987
       * @param {number} obj.month - a month, 1-12
       * @param {number} obj.day - a day of the month, 1-31, depending on the month
       * @param {number} obj.ordinal - day of the year, 1-365 or 366
       * @param {number} obj.weekYear - an ISO week year
       * @param {number} obj.weekNumber - an ISO week number, between 1 and 52 or 53, depending on the year
       * @param {number} obj.weekday - an ISO weekday, 1-7, where 1 is Monday and 7 is Sunday
       * @param {number} obj.localWeekYear - a week year, according to the locale
       * @param {number} obj.localWeekNumber - a week number, between 1 and 52 or 53, depending on the year, according to the locale
       * @param {number} obj.localWeekday - a weekday, 1-7, where 1 is the first and 7 is the last day of the week, according to the locale
       * @param {number} obj.hour - hour of the day, 0-23
       * @param {number} obj.minute - minute of the hour, 0-59
       * @param {number} obj.second - second of the minute, 0-59
       * @param {number} obj.millisecond - millisecond of the second, 0-999
       * @param {Object} opts - options for creating this DateTime
       * @param {string|Zone} [opts.zone='local'] - interpret the numbers in the context of a particular zone. Can take any value taken as the first argument to setZone()
       * @param {string} [opts.locale='system\'s locale'] - a locale to set on the resulting DateTime instance
       * @param {string} opts.outputCalendar - the output calendar to set on the resulting DateTime instance
       * @param {string} opts.numberingSystem - the numbering system to set on the resulting DateTime instance
       * @param {string} opts.weekSettings - the week settings to set on the resulting DateTime instance
       * @example DateTime.fromObject({ year: 1982, month: 5, day: 25}).toISODate() //=> '1982-05-25'
       * @example DateTime.fromObject({ year: 1982 }).toISODate() //=> '1982-01-01'
       * @example DateTime.fromObject({ hour: 10, minute: 26, second: 6 }) //~> today at 10:26:06
       * @example DateTime.fromObject({ hour: 10, minute: 26, second: 6 }, { zone: 'utc' }),
       * @example DateTime.fromObject({ hour: 10, minute: 26, second: 6 }, { zone: 'local' })
       * @example DateTime.fromObject({ hour: 10, minute: 26, second: 6 }, { zone: 'America/New_York' })
       * @example DateTime.fromObject({ weekYear: 2016, weekNumber: 2, weekday: 3 }).toISODate() //=> '2016-01-13'
       * @example DateTime.fromObject({ localWeekYear: 2022, localWeekNumber: 1, localWeekday: 1 }, { locale: "en-US" }).toISODate() //=> '2021-12-26'
       * @return {DateTime}
       */
      static fromObject(obj, opts = {}) {
        obj = obj || {};
        const zoneToUse = normalizeZone(opts.zone, Settings.defaultZone);
        if (!zoneToUse.isValid) {
          return _DateTime.invalid(unsupportedZone(zoneToUse));
        }
        const loc = Locale.fromObject(opts);
        const normalized = normalizeObject(obj, normalizeUnitWithLocalWeeks);
        const {
          minDaysInFirstWeek,
          startOfWeek
        } = usesLocalWeekValues(normalized, loc);
        const tsNow = Settings.now(), offsetProvis = !isUndefined(opts.specificOffset) ? opts.specificOffset : zoneToUse.offset(tsNow), containsOrdinal = !isUndefined(normalized.ordinal), containsGregorYear = !isUndefined(normalized.year), containsGregorMD = !isUndefined(normalized.month) || !isUndefined(normalized.day), containsGregor = containsGregorYear || containsGregorMD, definiteWeekDef = normalized.weekYear || normalized.weekNumber;
        if ((containsGregor || containsOrdinal) && definiteWeekDef) {
          throw new ConflictingSpecificationError("Can't mix weekYear/weekNumber units with year/month/day or ordinals");
        }
        if (containsGregorMD && containsOrdinal) {
          throw new ConflictingSpecificationError("Can't mix ordinal dates with month/day");
        }
        const useWeekData = definiteWeekDef || normalized.weekday && !containsGregor;
        let units, defaultValues, objNow = tsToObj(tsNow, offsetProvis);
        if (useWeekData) {
          units = orderedWeekUnits;
          defaultValues = defaultWeekUnitValues;
          objNow = gregorianToWeek(objNow, minDaysInFirstWeek, startOfWeek);
        } else if (containsOrdinal) {
          units = orderedOrdinalUnits;
          defaultValues = defaultOrdinalUnitValues;
          objNow = gregorianToOrdinal(objNow);
        } else {
          units = orderedUnits;
          defaultValues = defaultUnitValues;
        }
        let foundFirst = false;
        for (const u of units) {
          const v = normalized[u];
          if (!isUndefined(v)) {
            foundFirst = true;
          } else if (foundFirst) {
            normalized[u] = defaultValues[u];
          } else {
            normalized[u] = objNow[u];
          }
        }
        const higherOrderInvalid = useWeekData ? hasInvalidWeekData(normalized, minDaysInFirstWeek, startOfWeek) : containsOrdinal ? hasInvalidOrdinalData(normalized) : hasInvalidGregorianData(normalized), invalid = higherOrderInvalid || hasInvalidTimeData(normalized);
        if (invalid) {
          return _DateTime.invalid(invalid);
        }
        const gregorian = useWeekData ? weekToGregorian(normalized, minDaysInFirstWeek, startOfWeek) : containsOrdinal ? ordinalToGregorian(normalized) : normalized, [tsFinal, offsetFinal] = objToTS(gregorian, offsetProvis, zoneToUse), inst = new _DateTime({
          ts: tsFinal,
          zone: zoneToUse,
          o: offsetFinal,
          loc
        });
        if (normalized.weekday && containsGregor && obj.weekday !== inst.weekday) {
          return _DateTime.invalid("mismatched weekday", `you can't specify both a weekday of ${normalized.weekday} and a date of ${inst.toISO()}`);
        }
        if (!inst.isValid) {
          return _DateTime.invalid(inst.invalid);
        }
        return inst;
      }
      /**
       * Create a DateTime from an ISO 8601 string
       * @param {string} text - the ISO string
       * @param {Object} opts - options to affect the creation
       * @param {string|Zone} [opts.zone='local'] - use this zone if no offset is specified in the input string itself. Will also convert the time to this zone
       * @param {boolean} [opts.setZone=false] - override the zone with a fixed-offset zone specified in the string itself, if it specifies one
       * @param {string} [opts.locale='system's locale'] - a locale to set on the resulting DateTime instance
       * @param {string} [opts.outputCalendar] - the output calendar to set on the resulting DateTime instance
       * @param {string} [opts.numberingSystem] - the numbering system to set on the resulting DateTime instance
       * @param {string} [opts.weekSettings] - the week settings to set on the resulting DateTime instance
       * @example DateTime.fromISO('2016-05-25T09:08:34.123')
       * @example DateTime.fromISO('2016-05-25T09:08:34.123+06:00')
       * @example DateTime.fromISO('2016-05-25T09:08:34.123+06:00', {setZone: true})
       * @example DateTime.fromISO('2016-05-25T09:08:34.123', {zone: 'utc'})
       * @example DateTime.fromISO('2016-W05-4')
       * @return {DateTime}
       */
      static fromISO(text, opts = {}) {
        const [vals, parsedZone] = parseISODate(text);
        return parseDataToDateTime(vals, parsedZone, opts, "ISO 8601", text);
      }
      /**
       * Create a DateTime from an RFC 2822 string
       * @param {string} text - the RFC 2822 string
       * @param {Object} opts - options to affect the creation
       * @param {string|Zone} [opts.zone='local'] - convert the time to this zone. Since the offset is always specified in the string itself, this has no effect on the interpretation of string, merely the zone the resulting DateTime is expressed in.
       * @param {boolean} [opts.setZone=false] - override the zone with a fixed-offset zone specified in the string itself, if it specifies one
       * @param {string} [opts.locale='system's locale'] - a locale to set on the resulting DateTime instance
       * @param {string} opts.outputCalendar - the output calendar to set on the resulting DateTime instance
       * @param {string} opts.numberingSystem - the numbering system to set on the resulting DateTime instance
       * @param {string} opts.weekSettings - the week settings to set on the resulting DateTime instance
       * @example DateTime.fromRFC2822('25 Nov 2016 13:23:12 GMT')
       * @example DateTime.fromRFC2822('Fri, 25 Nov 2016 13:23:12 +0600')
       * @example DateTime.fromRFC2822('25 Nov 2016 13:23 Z')
       * @return {DateTime}
       */
      static fromRFC2822(text, opts = {}) {
        const [vals, parsedZone] = parseRFC2822Date(text);
        return parseDataToDateTime(vals, parsedZone, opts, "RFC 2822", text);
      }
      /**
       * Create a DateTime from an HTTP header date
       * @see https://www.w3.org/Protocols/rfc2616/rfc2616-sec3.html#sec3.3.1
       * @param {string} text - the HTTP header date
       * @param {Object} opts - options to affect the creation
       * @param {string|Zone} [opts.zone='local'] - convert the time to this zone. Since HTTP dates are always in UTC, this has no effect on the interpretation of string, merely the zone the resulting DateTime is expressed in.
       * @param {boolean} [opts.setZone=false] - override the zone with the fixed-offset zone specified in the string. For HTTP dates, this is always UTC, so this option is equivalent to setting the `zone` option to 'utc', but this option is included for consistency with similar methods.
       * @param {string} [opts.locale='system's locale'] - a locale to set on the resulting DateTime instance
       * @param {string} opts.outputCalendar - the output calendar to set on the resulting DateTime instance
       * @param {string} opts.numberingSystem - the numbering system to set on the resulting DateTime instance
       * @param {string} opts.weekSettings - the week settings to set on the resulting DateTime instance
       * @example DateTime.fromHTTP('Sun, 06 Nov 1994 08:49:37 GMT')
       * @example DateTime.fromHTTP('Sunday, 06-Nov-94 08:49:37 GMT')
       * @example DateTime.fromHTTP('Sun Nov  6 08:49:37 1994')
       * @return {DateTime}
       */
      static fromHTTP(text, opts = {}) {
        const [vals, parsedZone] = parseHTTPDate(text);
        return parseDataToDateTime(vals, parsedZone, opts, "HTTP", opts);
      }
      /**
       * Create a DateTime from an input string and format string.
       * Defaults to en-US if no locale has been specified, regardless of the system's locale. For a table of tokens and their interpretations, see [here](https://moment.github.io/luxon/#/parsing?id=table-of-tokens).
       * @param {string} text - the string to parse
       * @param {string} fmt - the format the string is expected to be in (see the link below for the formats)
       * @param {Object} opts - options to affect the creation
       * @param {string|Zone} [opts.zone='local'] - use this zone if no offset is specified in the input string itself. Will also convert the DateTime to this zone
       * @param {boolean} [opts.setZone=false] - override the zone with a zone specified in the string itself, if it specifies one
       * @param {string} [opts.locale='en-US'] - a locale string to use when parsing. Will also set the DateTime to this locale
       * @param {string} opts.numberingSystem - the numbering system to use when parsing. Will also set the resulting DateTime to this numbering system
       * @param {string} opts.weekSettings - the week settings to set on the resulting DateTime instance
       * @param {string} opts.outputCalendar - the output calendar to set on the resulting DateTime instance
       * @return {DateTime}
       */
      static fromFormat(text, fmt, opts = {}) {
        if (isUndefined(text) || isUndefined(fmt)) {
          throw new InvalidArgumentError("fromFormat requires an input string and a format");
        }
        const {
          locale: locale2 = null,
          numberingSystem = null
        } = opts, localeToUse = Locale.fromOpts({
          locale: locale2,
          numberingSystem,
          defaultToEN: true
        }), [vals, parsedZone, specificOffset, invalid] = parseFromTokens(localeToUse, text, fmt);
        if (invalid) {
          return _DateTime.invalid(invalid);
        } else {
          return parseDataToDateTime(vals, parsedZone, opts, `format ${fmt}`, text, specificOffset);
        }
      }
      /**
       * @deprecated use fromFormat instead
       */
      static fromString(text, fmt, opts = {}) {
        return _DateTime.fromFormat(text, fmt, opts);
      }
      /**
       * Create a DateTime from a SQL date, time, or datetime
       * Defaults to en-US if no locale has been specified, regardless of the system's locale
       * @param {string} text - the string to parse
       * @param {Object} opts - options to affect the creation
       * @param {string|Zone} [opts.zone='local'] - use this zone if no offset is specified in the input string itself. Will also convert the DateTime to this zone
       * @param {boolean} [opts.setZone=false] - override the zone with a zone specified in the string itself, if it specifies one
       * @param {string} [opts.locale='en-US'] - a locale string to use when parsing. Will also set the DateTime to this locale
       * @param {string} opts.numberingSystem - the numbering system to use when parsing. Will also set the resulting DateTime to this numbering system
       * @param {string} opts.weekSettings - the week settings to set on the resulting DateTime instance
       * @param {string} opts.outputCalendar - the output calendar to set on the resulting DateTime instance
       * @example DateTime.fromSQL('2017-05-15')
       * @example DateTime.fromSQL('2017-05-15 09:12:34')
       * @example DateTime.fromSQL('2017-05-15 09:12:34.342')
       * @example DateTime.fromSQL('2017-05-15 09:12:34.342+06:00')
       * @example DateTime.fromSQL('2017-05-15 09:12:34.342 America/Los_Angeles')
       * @example DateTime.fromSQL('2017-05-15 09:12:34.342 America/Los_Angeles', { setZone: true })
       * @example DateTime.fromSQL('2017-05-15 09:12:34.342', { zone: 'America/Los_Angeles' })
       * @example DateTime.fromSQL('09:12:34.342')
       * @return {DateTime}
       */
      static fromSQL(text, opts = {}) {
        const [vals, parsedZone] = parseSQL(text);
        return parseDataToDateTime(vals, parsedZone, opts, "SQL", text);
      }
      /**
       * Create an invalid DateTime.
       * @param {string} reason - simple string of why this DateTime is invalid. Should not contain parameters or anything else data-dependent.
       * @param {string} [explanation=null] - longer explanation, may include parameters and other useful debugging information
       * @return {DateTime}
       */
      static invalid(reason, explanation = null) {
        if (!reason) {
          throw new InvalidArgumentError("need to specify a reason the DateTime is invalid");
        }
        const invalid = reason instanceof Invalid ? reason : new Invalid(reason, explanation);
        if (Settings.throwOnInvalid) {
          throw new InvalidDateTimeError(invalid);
        } else {
          return new _DateTime({
            invalid
          });
        }
      }
      /**
       * Check if an object is an instance of DateTime. Works across context boundaries
       * @param {object} o
       * @return {boolean}
       */
      static isDateTime(o) {
        return o && o.isLuxonDateTime || false;
      }
      /**
       * Produce the format string for a set of options
       * @param formatOpts
       * @param localeOpts
       * @returns {string}
       */
      static parseFormatForOpts(formatOpts, localeOpts = {}) {
        const tokenList = formatOptsToTokens(formatOpts, Locale.fromObject(localeOpts));
        return !tokenList ? null : tokenList.map((t) => t ? t.val : null).join("");
      }
      /**
       * Produce the the fully expanded format token for the locale
       * Does NOT quote characters, so quoted tokens will not round trip correctly
       * @param fmt
       * @param localeOpts
       * @returns {string}
       */
      static expandFormat(fmt, localeOpts = {}) {
        const expanded = expandMacroTokens(Formatter.parseFormat(fmt), Locale.fromObject(localeOpts));
        return expanded.map((t) => t.val).join("");
      }
      static resetCache() {
        zoneOffsetTs = void 0;
        zoneOffsetGuessCache.clear();
      }
      // INFO
      /**
       * Get the value of unit.
       * @param {string} unit - a unit such as 'minute' or 'day'
       * @example DateTime.local(2017, 7, 4).get('month'); //=> 7
       * @example DateTime.local(2017, 7, 4).get('day'); //=> 4
       * @return {number}
       */
      get(unit) {
        return this[unit];
      }
      /**
       * Returns whether the DateTime is valid. Invalid DateTimes occur when:
       * * The DateTime was created from invalid calendar information, such as the 13th month or February 30
       * * The DateTime was created by an operation on another invalid date
       * @type {boolean}
       */
      get isValid() {
        return this.invalid === null;
      }
      /**
       * Returns an error code if this DateTime is invalid, or null if the DateTime is valid
       * @type {string}
       */
      get invalidReason() {
        return this.invalid ? this.invalid.reason : null;
      }
      /**
       * Returns an explanation of why this DateTime became invalid, or null if the DateTime is valid
       * @type {string}
       */
      get invalidExplanation() {
        return this.invalid ? this.invalid.explanation : null;
      }
      /**
       * Get the locale of a DateTime, such 'en-GB'. The locale is used when formatting the DateTime
       *
       * @type {string}
       */
      get locale() {
        return this.isValid ? this.loc.locale : null;
      }
      /**
       * Get the numbering system of a DateTime, such 'beng'. The numbering system is used when formatting the DateTime
       *
       * @type {string}
       */
      get numberingSystem() {
        return this.isValid ? this.loc.numberingSystem : null;
      }
      /**
       * Get the output calendar of a DateTime, such 'islamic'. The output calendar is used when formatting the DateTime
       *
       * @type {string}
       */
      get outputCalendar() {
        return this.isValid ? this.loc.outputCalendar : null;
      }
      /**
       * Get the time zone associated with this DateTime.
       * @type {Zone}
       */
      get zone() {
        return this._zone;
      }
      /**
       * Get the name of the time zone.
       * @type {string}
       */
      get zoneName() {
        return this.isValid ? this.zone.name : null;
      }
      /**
       * Get the year
       * @example DateTime.local(2017, 5, 25).year //=> 2017
       * @type {number}
       */
      get year() {
        return this.isValid ? this.c.year : NaN;
      }
      /**
       * Get the quarter
       * @example DateTime.local(2017, 5, 25).quarter //=> 2
       * @type {number}
       */
      get quarter() {
        return this.isValid ? Math.ceil(this.c.month / 3) : NaN;
      }
      /**
       * Get the month (1-12).
       * @example DateTime.local(2017, 5, 25).month //=> 5
       * @type {number}
       */
      get month() {
        return this.isValid ? this.c.month : NaN;
      }
      /**
       * Get the day of the month (1-30ish).
       * @example DateTime.local(2017, 5, 25).day //=> 25
       * @type {number}
       */
      get day() {
        return this.isValid ? this.c.day : NaN;
      }
      /**
       * Get the hour of the day (0-23).
       * @example DateTime.local(2017, 5, 25, 9).hour //=> 9
       * @type {number}
       */
      get hour() {
        return this.isValid ? this.c.hour : NaN;
      }
      /**
       * Get the minute of the hour (0-59).
       * @example DateTime.local(2017, 5, 25, 9, 30).minute //=> 30
       * @type {number}
       */
      get minute() {
        return this.isValid ? this.c.minute : NaN;
      }
      /**
       * Get the second of the minute (0-59).
       * @example DateTime.local(2017, 5, 25, 9, 30, 52).second //=> 52
       * @type {number}
       */
      get second() {
        return this.isValid ? this.c.second : NaN;
      }
      /**
       * Get the millisecond of the second (0-999).
       * @example DateTime.local(2017, 5, 25, 9, 30, 52, 654).millisecond //=> 654
       * @type {number}
       */
      get millisecond() {
        return this.isValid ? this.c.millisecond : NaN;
      }
      /**
       * Get the week year
       * @see https://en.wikipedia.org/wiki/ISO_week_date
       * @example DateTime.local(2014, 12, 31).weekYear //=> 2015
       * @type {number}
       */
      get weekYear() {
        return this.isValid ? possiblyCachedWeekData(this).weekYear : NaN;
      }
      /**
       * Get the week number of the week year (1-52ish).
       * @see https://en.wikipedia.org/wiki/ISO_week_date
       * @example DateTime.local(2017, 5, 25).weekNumber //=> 21
       * @type {number}
       */
      get weekNumber() {
        return this.isValid ? possiblyCachedWeekData(this).weekNumber : NaN;
      }
      /**
       * Get the day of the week.
       * 1 is Monday and 7 is Sunday
       * @see https://en.wikipedia.org/wiki/ISO_week_date
       * @example DateTime.local(2014, 11, 31).weekday //=> 4
       * @type {number}
       */
      get weekday() {
        return this.isValid ? possiblyCachedWeekData(this).weekday : NaN;
      }
      /**
       * Returns true if this date is on a weekend according to the locale, false otherwise
       * @returns {boolean}
       */
      get isWeekend() {
        return this.isValid && this.loc.getWeekendDays().includes(this.weekday);
      }
      /**
       * Get the day of the week according to the locale.
       * 1 is the first day of the week and 7 is the last day of the week.
       * If the locale assigns Sunday as the first day of the week, then a date which is a Sunday will return 1,
       * @returns {number}
       */
      get localWeekday() {
        return this.isValid ? possiblyCachedLocalWeekData(this).weekday : NaN;
      }
      /**
       * Get the week number of the week year according to the locale. Different locales assign week numbers differently,
       * because the week can start on different days of the week (see localWeekday) and because a different number of days
       * is required for a week to count as the first week of a year.
       * @returns {number}
       */
      get localWeekNumber() {
        return this.isValid ? possiblyCachedLocalWeekData(this).weekNumber : NaN;
      }
      /**
       * Get the week year according to the locale. Different locales assign week numbers (and therefor week years)
       * differently, see localWeekNumber.
       * @returns {number}
       */
      get localWeekYear() {
        return this.isValid ? possiblyCachedLocalWeekData(this).weekYear : NaN;
      }
      /**
       * Get the ordinal (meaning the day of the year)
       * @example DateTime.local(2017, 5, 25).ordinal //=> 145
       * @type {number|DateTime}
       */
      get ordinal() {
        return this.isValid ? gregorianToOrdinal(this.c).ordinal : NaN;
      }
      /**
       * Get the human readable short month name, such as 'Oct'.
       * Defaults to the system's locale if no locale has been specified
       * @example DateTime.local(2017, 10, 30).monthShort //=> Oct
       * @type {string}
       */
      get monthShort() {
        return this.isValid ? Info.months("short", {
          locObj: this.loc
        })[this.month - 1] : null;
      }
      /**
       * Get the human readable long month name, such as 'October'.
       * Defaults to the system's locale if no locale has been specified
       * @example DateTime.local(2017, 10, 30).monthLong //=> October
       * @type {string}
       */
      get monthLong() {
        return this.isValid ? Info.months("long", {
          locObj: this.loc
        })[this.month - 1] : null;
      }
      /**
       * Get the human readable short weekday, such as 'Mon'.
       * Defaults to the system's locale if no locale has been specified
       * @example DateTime.local(2017, 10, 30).weekdayShort //=> Mon
       * @type {string}
       */
      get weekdayShort() {
        return this.isValid ? Info.weekdays("short", {
          locObj: this.loc
        })[this.weekday - 1] : null;
      }
      /**
       * Get the human readable long weekday, such as 'Monday'.
       * Defaults to the system's locale if no locale has been specified
       * @example DateTime.local(2017, 10, 30).weekdayLong //=> Monday
       * @type {string}
       */
      get weekdayLong() {
        return this.isValid ? Info.weekdays("long", {
          locObj: this.loc
        })[this.weekday - 1] : null;
      }
      /**
       * Get the UTC offset of this DateTime in minutes
       * @example DateTime.now().offset //=> -240
       * @example DateTime.utc().offset //=> 0
       * @type {number}
       */
      get offset() {
        return this.isValid ? +this.o : NaN;
      }
      /**
       * Get the short human name for the zone's current offset, for example "EST" or "EDT".
       * Defaults to the system's locale if no locale has been specified
       * @type {string}
       */
      get offsetNameShort() {
        if (this.isValid) {
          return this.zone.offsetName(this.ts, {
            format: "short",
            locale: this.locale
          });
        } else {
          return null;
        }
      }
      /**
       * Get the long human name for the zone's current offset, for example "Eastern Standard Time" or "Eastern Daylight Time".
       * Defaults to the system's locale if no locale has been specified
       * @type {string}
       */
      get offsetNameLong() {
        if (this.isValid) {
          return this.zone.offsetName(this.ts, {
            format: "long",
            locale: this.locale
          });
        } else {
          return null;
        }
      }
      /**
       * Get whether this zone's offset ever changes, as in a DST.
       * @type {boolean}
       */
      get isOffsetFixed() {
        return this.isValid ? this.zone.isUniversal : null;
      }
      /**
       * Get whether the DateTime is in a DST.
       * @type {boolean}
       */
      get isInDST() {
        if (this.isOffsetFixed) {
          return false;
        } else {
          return this.offset > this.set({
            month: 1,
            day: 1
          }).offset || this.offset > this.set({
            month: 5
          }).offset;
        }
      }
      /**
       * Get those DateTimes which have the same local time as this DateTime, but a different offset from UTC
       * in this DateTime's zone. During DST changes local time can be ambiguous, for example
       * `2023-10-29T02:30:00` in `Europe/Berlin` can have offset `+01:00` or `+02:00`.
       * This method will return both possible DateTimes if this DateTime's local time is ambiguous.
       * @returns {DateTime[]}
       */
      getPossibleOffsets() {
        if (!this.isValid || this.isOffsetFixed) {
          return [this];
        }
        const dayMs = 864e5;
        const minuteMs = 6e4;
        const localTS = objToLocalTS(this.c);
        const oEarlier = this.zone.offset(localTS - dayMs);
        const oLater = this.zone.offset(localTS + dayMs);
        const o1 = this.zone.offset(localTS - oEarlier * minuteMs);
        const o2 = this.zone.offset(localTS - oLater * minuteMs);
        if (o1 === o2) {
          return [this];
        }
        const ts1 = localTS - o1 * minuteMs;
        const ts2 = localTS - o2 * minuteMs;
        const c1 = tsToObj(ts1, o1);
        const c22 = tsToObj(ts2, o2);
        if (c1.hour === c22.hour && c1.minute === c22.minute && c1.second === c22.second && c1.millisecond === c22.millisecond) {
          return [clone2(this, {
            ts: ts1
          }), clone2(this, {
            ts: ts2
          })];
        }
        return [this];
      }
      /**
       * Returns true if this DateTime is in a leap year, false otherwise
       * @example DateTime.local(2016).isInLeapYear //=> true
       * @example DateTime.local(2013).isInLeapYear //=> false
       * @type {boolean}
       */
      get isInLeapYear() {
        return isLeapYear(this.year);
      }
      /**
       * Returns the number of days in this DateTime's month
       * @example DateTime.local(2016, 2).daysInMonth //=> 29
       * @example DateTime.local(2016, 3).daysInMonth //=> 31
       * @type {number}
       */
      get daysInMonth() {
        return daysInMonth(this.year, this.month);
      }
      /**
       * Returns the number of days in this DateTime's year
       * @example DateTime.local(2016).daysInYear //=> 366
       * @example DateTime.local(2013).daysInYear //=> 365
       * @type {number}
       */
      get daysInYear() {
        return this.isValid ? daysInYear(this.year) : NaN;
      }
      /**
       * Returns the number of weeks in this DateTime's year
       * @see https://en.wikipedia.org/wiki/ISO_week_date
       * @example DateTime.local(2004).weeksInWeekYear //=> 53
       * @example DateTime.local(2013).weeksInWeekYear //=> 52
       * @type {number}
       */
      get weeksInWeekYear() {
        return this.isValid ? weeksInWeekYear(this.weekYear) : NaN;
      }
      /**
       * Returns the number of weeks in this DateTime's local week year
       * @example DateTime.local(2020, 6, {locale: 'en-US'}).weeksInLocalWeekYear //=> 52
       * @example DateTime.local(2020, 6, {locale: 'de-DE'}).weeksInLocalWeekYear //=> 53
       * @type {number}
       */
      get weeksInLocalWeekYear() {
        return this.isValid ? weeksInWeekYear(this.localWeekYear, this.loc.getMinDaysInFirstWeek(), this.loc.getStartOfWeek()) : NaN;
      }
      /**
       * Returns the resolved Intl options for this DateTime.
       * This is useful in understanding the behavior of formatting methods
       * @param {Object} opts - the same options as toLocaleString
       * @return {Object}
       */
      resolvedLocaleOptions(opts = {}) {
        const {
          locale: locale2,
          numberingSystem,
          calendar
        } = Formatter.create(this.loc.clone(opts), opts).resolvedOptions(this);
        return {
          locale: locale2,
          numberingSystem,
          outputCalendar: calendar
        };
      }
      // TRANSFORM
      /**
       * "Set" the DateTime's zone to UTC. Returns a newly-constructed DateTime.
       *
       * Equivalent to {@link DateTime#setZone}('utc')
       * @param {number} [offset=0] - optionally, an offset from UTC in minutes
       * @param {Object} [opts={}] - options to pass to `setZone()`
       * @return {DateTime}
       */
      toUTC(offset2 = 0, opts = {}) {
        return this.setZone(FixedOffsetZone.instance(offset2), opts);
      }
      /**
       * "Set" the DateTime's zone to the host's local zone. Returns a newly-constructed DateTime.
       *
       * Equivalent to `setZone('local')`
       * @return {DateTime}
       */
      toLocal() {
        return this.setZone(Settings.defaultZone);
      }
      /**
       * "Set" the DateTime's zone to specified zone. Returns a newly-constructed DateTime.
       *
       * By default, the setter keeps the underlying time the same (as in, the same timestamp), but the new instance will report different local times and consider DSTs when making computations, as with {@link DateTime#plus}. You may wish to use {@link DateTime#toLocal} and {@link DateTime#toUTC} which provide simple convenience wrappers for commonly used zones.
       * @param {string|Zone} [zone='local'] - a zone identifier. As a string, that can be any IANA zone supported by the host environment, or a fixed-offset name of the form 'UTC+3', or the strings 'local' or 'utc'. You may also supply an instance of a {@link DateTime#Zone} class.
       * @param {Object} opts - options
       * @param {boolean} [opts.keepLocalTime=false] - If true, adjust the underlying time so that the local time stays the same, but in the target zone. You should rarely need this.
       * @return {DateTime}
       */
      setZone(zone, {
        keepLocalTime = false,
        keepCalendarTime = false
      } = {}) {
        zone = normalizeZone(zone, Settings.defaultZone);
        if (zone.equals(this.zone)) {
          return this;
        } else if (!zone.isValid) {
          return _DateTime.invalid(unsupportedZone(zone));
        } else {
          let newTS = this.ts;
          if (keepLocalTime || keepCalendarTime) {
            const offsetGuess = zone.offset(this.ts);
            const asObj = this.toObject();
            [newTS] = objToTS(asObj, offsetGuess, zone);
          }
          return clone2(this, {
            ts: newTS,
            zone
          });
        }
      }
      /**
       * "Set" the locale, numberingSystem, or outputCalendar. Returns a newly-constructed DateTime.
       * @param {Object} properties - the properties to set
       * @example DateTime.local(2017, 5, 25).reconfigure({ locale: 'en-GB' })
       * @return {DateTime}
       */
      reconfigure({
        locale: locale2,
        numberingSystem,
        outputCalendar
      } = {}) {
        const loc = this.loc.clone({
          locale: locale2,
          numberingSystem,
          outputCalendar
        });
        return clone2(this, {
          loc
        });
      }
      /**
       * "Set" the locale. Returns a newly-constructed DateTime.
       * Just a convenient alias for reconfigure({ locale })
       * @example DateTime.local(2017, 5, 25).setLocale('en-GB')
       * @return {DateTime}
       */
      setLocale(locale2) {
        return this.reconfigure({
          locale: locale2
        });
      }
      /**
       * "Set" the values of specified units. Returns a newly-constructed DateTime.
       * You can only set units with this method; for "setting" metadata, see {@link DateTime#reconfigure} and {@link DateTime#setZone}.
       *
       * This method also supports setting locale-based week units, i.e. `localWeekday`, `localWeekNumber` and `localWeekYear`.
       * They cannot be mixed with ISO-week units like `weekday`.
       * @param {Object} values - a mapping of units to numbers
       * @example dt.set({ year: 2017 })
       * @example dt.set({ hour: 8, minute: 30 })
       * @example dt.set({ weekday: 5 })
       * @example dt.set({ year: 2005, ordinal: 234 })
       * @return {DateTime}
       */
      set(values) {
        if (!this.isValid) return this;
        const normalized = normalizeObject(values, normalizeUnitWithLocalWeeks);
        const {
          minDaysInFirstWeek,
          startOfWeek
        } = usesLocalWeekValues(normalized, this.loc);
        const settingWeekStuff = !isUndefined(normalized.weekYear) || !isUndefined(normalized.weekNumber) || !isUndefined(normalized.weekday), containsOrdinal = !isUndefined(normalized.ordinal), containsGregorYear = !isUndefined(normalized.year), containsGregorMD = !isUndefined(normalized.month) || !isUndefined(normalized.day), containsGregor = containsGregorYear || containsGregorMD, definiteWeekDef = normalized.weekYear || normalized.weekNumber;
        if ((containsGregor || containsOrdinal) && definiteWeekDef) {
          throw new ConflictingSpecificationError("Can't mix weekYear/weekNumber units with year/month/day or ordinals");
        }
        if (containsGregorMD && containsOrdinal) {
          throw new ConflictingSpecificationError("Can't mix ordinal dates with month/day");
        }
        let mixed2;
        if (settingWeekStuff) {
          mixed2 = weekToGregorian({
            ...gregorianToWeek(this.c, minDaysInFirstWeek, startOfWeek),
            ...normalized
          }, minDaysInFirstWeek, startOfWeek);
        } else if (!isUndefined(normalized.ordinal)) {
          mixed2 = ordinalToGregorian({
            ...gregorianToOrdinal(this.c),
            ...normalized
          });
        } else {
          mixed2 = {
            ...this.toObject(),
            ...normalized
          };
          if (isUndefined(normalized.day)) {
            mixed2.day = Math.min(daysInMonth(mixed2.year, mixed2.month), mixed2.day);
          }
        }
        const [ts, o] = objToTS(mixed2, this.o, this.zone);
        return clone2(this, {
          ts,
          o
        });
      }
      /**
       * Add a period of time to this DateTime and return the resulting DateTime
       *
       * Adding hours, minutes, seconds, or milliseconds increases the timestamp by the right number of milliseconds. Adding days, months, or years shifts the calendar, accounting for DSTs and leap years along the way. Thus, `dt.plus({ hours: 24 })` may result in a different time than `dt.plus({ days: 1 })` if there's a DST shift in between.
       * @param {Duration|Object|number} duration - The amount to add. Either a Luxon Duration, a number of milliseconds, the object argument to Duration.fromObject()
       * @example DateTime.now().plus(123) //~> in 123 milliseconds
       * @example DateTime.now().plus({ minutes: 15 }) //~> in 15 minutes
       * @example DateTime.now().plus({ days: 1 }) //~> this time tomorrow
       * @example DateTime.now().plus({ days: -1 }) //~> this time yesterday
       * @example DateTime.now().plus({ hours: 3, minutes: 13 }) //~> in 3 hr, 13 min
       * @example DateTime.now().plus(Duration.fromObject({ hours: 3, minutes: 13 })) //~> in 3 hr, 13 min
       * @return {DateTime}
       */
      plus(duration) {
        if (!this.isValid) return this;
        const dur = Duration.fromDurationLike(duration);
        return clone2(this, adjustTime(this, dur));
      }
      /**
       * Subtract a period of time to this DateTime and return the resulting DateTime
       * See {@link DateTime#plus}
       * @param {Duration|Object|number} duration - The amount to subtract. Either a Luxon Duration, a number of milliseconds, the object argument to Duration.fromObject()
       @return {DateTime}
       */
      minus(duration) {
        if (!this.isValid) return this;
        const dur = Duration.fromDurationLike(duration).negate();
        return clone2(this, adjustTime(this, dur));
      }
      /**
       * "Set" this DateTime to the beginning of a unit of time.
       * @param {string} unit - The unit to go to the beginning of. Can be 'year', 'quarter', 'month', 'week', 'day', 'hour', 'minute', 'second', or 'millisecond'.
       * @param {Object} opts - options
       * @param {boolean} [opts.useLocaleWeeks=false] - If true, use weeks based on the locale, i.e. use the locale-dependent start of the week
       * @example DateTime.local(2014, 3, 3).startOf('month').toISODate(); //=> '2014-03-01'
       * @example DateTime.local(2014, 3, 3).startOf('year').toISODate(); //=> '2014-01-01'
       * @example DateTime.local(2014, 3, 3).startOf('week').toISODate(); //=> '2014-03-03', weeks always start on Mondays
       * @example DateTime.local(2014, 3, 3, 5, 30).startOf('day').toISOTime(); //=> '00:00.000-05:00'
       * @example DateTime.local(2014, 3, 3, 5, 30).startOf('hour').toISOTime(); //=> '05:00:00.000-05:00'
       * @return {DateTime}
       */
      startOf(unit, {
        useLocaleWeeks = false
      } = {}) {
        if (!this.isValid) return this;
        const o = {}, normalizedUnit = Duration.normalizeUnit(unit);
        switch (normalizedUnit) {
          case "years":
            o.month = 1;
          // falls through
          case "quarters":
          case "months":
            o.day = 1;
          // falls through
          case "weeks":
          case "days":
            o.hour = 0;
          // falls through
          case "hours":
            o.minute = 0;
          // falls through
          case "minutes":
            o.second = 0;
          // falls through
          case "seconds":
            o.millisecond = 0;
            break;
        }
        if (normalizedUnit === "weeks") {
          if (useLocaleWeeks) {
            const startOfWeek = this.loc.getStartOfWeek();
            const {
              weekday
            } = this;
            if (weekday < startOfWeek) {
              o.weekNumber = this.weekNumber - 1;
            }
            o.weekday = startOfWeek;
          } else {
            o.weekday = 1;
          }
        }
        if (normalizedUnit === "quarters") {
          const q = Math.ceil(this.month / 3);
          o.month = (q - 1) * 3 + 1;
        }
        return this.set(o);
      }
      /**
       * "Set" this DateTime to the end (meaning the last millisecond) of a unit of time
       * @param {string} unit - The unit to go to the end of. Can be 'year', 'quarter', 'month', 'week', 'day', 'hour', 'minute', 'second', or 'millisecond'.
       * @param {Object} opts - options
       * @param {boolean} [opts.useLocaleWeeks=false] - If true, use weeks based on the locale, i.e. use the locale-dependent start of the week
       * @example DateTime.local(2014, 3, 3).endOf('month').toISO(); //=> '2014-03-31T23:59:59.999-05:00'
       * @example DateTime.local(2014, 3, 3).endOf('year').toISO(); //=> '2014-12-31T23:59:59.999-05:00'
       * @example DateTime.local(2014, 3, 3).endOf('week').toISO(); // => '2014-03-09T23:59:59.999-05:00', weeks start on Mondays
       * @example DateTime.local(2014, 3, 3, 5, 30).endOf('day').toISO(); //=> '2014-03-03T23:59:59.999-05:00'
       * @example DateTime.local(2014, 3, 3, 5, 30).endOf('hour').toISO(); //=> '2014-03-03T05:59:59.999-05:00'
       * @return {DateTime}
       */
      endOf(unit, opts) {
        return this.isValid ? this.plus({
          [unit]: 1
        }).startOf(unit, opts).minus(1) : this;
      }
      // OUTPUT
      /**
       * Returns a string representation of this DateTime formatted according to the specified format string.
       * **You may not want this.** See {@link DateTime#toLocaleString} for a more flexible formatting tool. For a table of tokens and their interpretations, see [here](https://moment.github.io/luxon/#/formatting?id=table-of-tokens).
       * Defaults to en-US if no locale has been specified, regardless of the system's locale.
       * @param {string} fmt - the format string
       * @param {Object} opts - opts to override the configuration options on this DateTime
       * @example DateTime.now().toFormat('yyyy LLL dd') //=> '2017 Apr 22'
       * @example DateTime.now().setLocale('fr').toFormat('yyyy LLL dd') //=> '2017 avr. 22'
       * @example DateTime.now().toFormat('yyyy LLL dd', { locale: "fr" }) //=> '2017 avr. 22'
       * @example DateTime.now().toFormat("HH 'hours and' mm 'minutes'") //=> '20 hours and 55 minutes'
       * @return {string}
       */
      toFormat(fmt, opts = {}) {
        return this.isValid ? Formatter.create(this.loc.redefaultToEN(opts)).formatDateTimeFromString(this, fmt) : INVALID;
      }
      /**
       * Returns a localized string representing this date. Accepts the same options as the Intl.DateTimeFormat constructor and any presets defined by Luxon, such as `DateTime.DATE_FULL` or `DateTime.TIME_SIMPLE`.
       * The exact behavior of this method is browser-specific, but in general it will return an appropriate representation
       * of the DateTime in the assigned locale.
       * Defaults to the system's locale if no locale has been specified
       * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/DateTimeFormat
       * @param formatOpts {Object} - Intl.DateTimeFormat constructor options and configuration options
       * @param {Object} opts - opts to override the configuration options on this DateTime
       * @example DateTime.now().toLocaleString(); //=> 4/20/2017
       * @example DateTime.now().setLocale('en-gb').toLocaleString(); //=> '20/04/2017'
       * @example DateTime.now().toLocaleString(DateTime.DATE_FULL); //=> 'April 20, 2017'
       * @example DateTime.now().toLocaleString(DateTime.DATE_FULL, { locale: 'fr' }); //=> '28 août 2022'
       * @example DateTime.now().toLocaleString(DateTime.TIME_SIMPLE); //=> '11:32 AM'
       * @example DateTime.now().toLocaleString(DateTime.DATETIME_SHORT); //=> '4/20/2017, 11:32 AM'
       * @example DateTime.now().toLocaleString({ weekday: 'long', month: 'long', day: '2-digit' }); //=> 'Thursday, April 20'
       * @example DateTime.now().toLocaleString({ weekday: 'short', month: 'short', day: '2-digit', hour: '2-digit', minute: '2-digit' }); //=> 'Thu, Apr 20, 11:27 AM'
       * @example DateTime.now().toLocaleString({ hour: '2-digit', minute: '2-digit', hourCycle: 'h23' }); //=> '11:32'
       * @return {string}
       */
      toLocaleString(formatOpts = DATE_SHORT, opts = {}) {
        return this.isValid ? Formatter.create(this.loc.clone(opts), formatOpts).formatDateTime(this) : INVALID;
      }
      /**
       * Returns an array of format "parts", meaning individual tokens along with metadata. This is allows callers to post-process individual sections of the formatted output.
       * Defaults to the system's locale if no locale has been specified
       * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/DateTimeFormat/formatToParts
       * @param opts {Object} - Intl.DateTimeFormat constructor options, same as `toLocaleString`.
       * @example DateTime.now().toLocaleParts(); //=> [
       *                                   //=>   { type: 'day', value: '25' },
       *                                   //=>   { type: 'literal', value: '/' },
       *                                   //=>   { type: 'month', value: '05' },
       *                                   //=>   { type: 'literal', value: '/' },
       *                                   //=>   { type: 'year', value: '1982' }
       *                                   //=> ]
       */
      toLocaleParts(opts = {}) {
        return this.isValid ? Formatter.create(this.loc.clone(opts), opts).formatDateTimeParts(this) : [];
      }
      /**
       * Returns an ISO 8601-compliant string representation of this DateTime
       * @param {Object} opts - options
       * @param {boolean} [opts.suppressMilliseconds=false] - exclude milliseconds from the format if they're 0
       * @param {boolean} [opts.suppressSeconds=false] - exclude seconds from the format if they're 0
       * @param {boolean} [opts.includeOffset=true] - include the offset, such as 'Z' or '-04:00'
       * @param {boolean} [opts.extendedZone=false] - add the time zone format extension
       * @param {string} [opts.format='extended'] - choose between the basic and extended format
       * @param {string} [opts.precision='milliseconds'] - truncate output to desired presicion: 'years', 'months', 'days', 'hours', 'minutes', 'seconds' or 'milliseconds'. When precision and suppressSeconds or suppressMilliseconds are used together, precision sets the maximum unit shown in the output, however seconds or milliseconds will still be suppressed if they are 0.
       * @example DateTime.utc(1983, 5, 25).toISO() //=> '1982-05-25T00:00:00.000Z'
       * @example DateTime.now().toISO() //=> '2017-04-22T20:47:05.335-04:00'
       * @example DateTime.now().toISO({ includeOffset: false }) //=> '2017-04-22T20:47:05.335'
       * @example DateTime.now().toISO({ format: 'basic' }) //=> '20170422T204705.335-0400'
       * @example DateTime.now().toISO({ precision: 'day' }) //=> '2017-04-22Z'
       * @example DateTime.now().toISO({ precision: 'minute' }) //=> '2017-04-22T20:47Z'
       * @return {string|null}
       */
      toISO({
        format = "extended",
        suppressSeconds = false,
        suppressMilliseconds = false,
        includeOffset = true,
        extendedZone = false,
        precision = "milliseconds"
      } = {}) {
        if (!this.isValid) {
          return null;
        }
        precision = normalizeUnit(precision);
        const ext = format === "extended";
        let c3 = toISODate(this, ext, precision);
        if (orderedUnits.indexOf(precision) >= 3) c3 += "T";
        c3 += toISOTime(this, ext, suppressSeconds, suppressMilliseconds, includeOffset, extendedZone, precision);
        return c3;
      }
      /**
       * Returns an ISO 8601-compliant string representation of this DateTime's date component
       * @param {Object} opts - options
       * @param {string} [opts.format='extended'] - choose between the basic and extended format
       * @param {string} [opts.precision='day'] - truncate output to desired precision: 'years', 'months', or 'days'.
       * @example DateTime.utc(1982, 5, 25).toISODate() //=> '1982-05-25'
       * @example DateTime.utc(1982, 5, 25).toISODate({ format: 'basic' }) //=> '19820525'
       * @example DateTime.utc(1982, 5, 25).toISODate({ precision: 'month' }) //=> '1982-05'
       * @return {string|null}
       */
      toISODate({
        format = "extended",
        precision = "day"
      } = {}) {
        if (!this.isValid) {
          return null;
        }
        return toISODate(this, format === "extended", normalizeUnit(precision));
      }
      /**
       * Returns an ISO 8601-compliant string representation of this DateTime's week date
       * @example DateTime.utc(1982, 5, 25).toISOWeekDate() //=> '1982-W21-2'
       * @return {string}
       */
      toISOWeekDate() {
        return toTechFormat(this, "kkkk-'W'WW-c");
      }
      /**
       * Returns an ISO 8601-compliant string representation of this DateTime's time component
       * @param {Object} opts - options
       * @param {boolean} [opts.suppressMilliseconds=false] - exclude milliseconds from the format if they're 0
       * @param {boolean} [opts.suppressSeconds=false] - exclude seconds from the format if they're 0
       * @param {boolean} [opts.includeOffset=true] - include the offset, such as 'Z' or '-04:00'
       * @param {boolean} [opts.extendedZone=true] - add the time zone format extension
       * @param {boolean} [opts.includePrefix=false] - include the `T` prefix
       * @param {string} [opts.format='extended'] - choose between the basic and extended format
       * @param {string} [opts.precision='milliseconds'] - truncate output to desired presicion: 'hours', 'minutes', 'seconds' or 'milliseconds'. When precision and suppressSeconds or suppressMilliseconds are used together, precision sets the maximum unit shown in the output, however seconds or milliseconds will still be suppressed if they are 0.
       * @example DateTime.utc().set({ hour: 7, minute: 34 }).toISOTime() //=> '07:34:19.361Z'
       * @example DateTime.utc().set({ hour: 7, minute: 34, seconds: 0, milliseconds: 0 }).toISOTime({ suppressSeconds: true }) //=> '07:34Z'
       * @example DateTime.utc().set({ hour: 7, minute: 34 }).toISOTime({ format: 'basic' }) //=> '073419.361Z'
       * @example DateTime.utc().set({ hour: 7, minute: 34 }).toISOTime({ includePrefix: true }) //=> 'T07:34:19.361Z'
       * @example DateTime.utc().set({ hour: 7, minute: 34, second: 56 }).toISOTime({ precision: 'minute' }) //=> '07:34Z'
       * @return {string}
       */
      toISOTime({
        suppressMilliseconds = false,
        suppressSeconds = false,
        includeOffset = true,
        includePrefix = false,
        extendedZone = false,
        format = "extended",
        precision = "milliseconds"
      } = {}) {
        if (!this.isValid) {
          return null;
        }
        precision = normalizeUnit(precision);
        let c3 = includePrefix && orderedUnits.indexOf(precision) >= 3 ? "T" : "";
        return c3 + toISOTime(this, format === "extended", suppressSeconds, suppressMilliseconds, includeOffset, extendedZone, precision);
      }
      /**
       * Returns an RFC 2822-compatible string representation of this DateTime
       * @example DateTime.utc(2014, 7, 13).toRFC2822() //=> 'Sun, 13 Jul 2014 00:00:00 +0000'
       * @example DateTime.local(2014, 7, 13).toRFC2822() //=> 'Sun, 13 Jul 2014 00:00:00 -0400'
       * @return {string}
       */
      toRFC2822() {
        return toTechFormat(this, "EEE, dd LLL yyyy HH:mm:ss ZZZ", false);
      }
      /**
       * Returns a string representation of this DateTime appropriate for use in HTTP headers. The output is always expressed in GMT.
       * Specifically, the string conforms to RFC 1123.
       * @see https://www.w3.org/Protocols/rfc2616/rfc2616-sec3.html#sec3.3.1
       * @example DateTime.utc(2014, 7, 13).toHTTP() //=> 'Sun, 13 Jul 2014 00:00:00 GMT'
       * @example DateTime.utc(2014, 7, 13, 19).toHTTP() //=> 'Sun, 13 Jul 2014 19:00:00 GMT'
       * @return {string}
       */
      toHTTP() {
        return toTechFormat(this.toUTC(), "EEE, dd LLL yyyy HH:mm:ss 'GMT'");
      }
      /**
       * Returns a string representation of this DateTime appropriate for use in SQL Date
       * @example DateTime.utc(2014, 7, 13).toSQLDate() //=> '2014-07-13'
       * @return {string|null}
       */
      toSQLDate() {
        if (!this.isValid) {
          return null;
        }
        return toISODate(this, true);
      }
      /**
       * Returns a string representation of this DateTime appropriate for use in SQL Time
       * @param {Object} opts - options
       * @param {boolean} [opts.includeZone=false] - include the zone, such as 'America/New_York'. Overrides includeOffset.
       * @param {boolean} [opts.includeOffset=true] - include the offset, such as 'Z' or '-04:00'
       * @param {boolean} [opts.includeOffsetSpace=true] - include the space between the time and the offset, such as '05:15:16.345 -04:00'
       * @example DateTime.utc().toSQL() //=> '05:15:16.345'
       * @example DateTime.now().toSQL() //=> '05:15:16.345 -04:00'
       * @example DateTime.now().toSQL({ includeOffset: false }) //=> '05:15:16.345'
       * @example DateTime.now().toSQL({ includeZone: false }) //=> '05:15:16.345 America/New_York'
       * @return {string}
       */
      toSQLTime({
        includeOffset = true,
        includeZone = false,
        includeOffsetSpace = true
      } = {}) {
        let fmt = "HH:mm:ss.SSS";
        if (includeZone || includeOffset) {
          if (includeOffsetSpace) {
            fmt += " ";
          }
          if (includeZone) {
            fmt += "z";
          } else if (includeOffset) {
            fmt += "ZZ";
          }
        }
        return toTechFormat(this, fmt, true);
      }
      /**
       * Returns a string representation of this DateTime appropriate for use in SQL DateTime
       * @param {Object} opts - options
       * @param {boolean} [opts.includeZone=false] - include the zone, such as 'America/New_York'. Overrides includeOffset.
       * @param {boolean} [opts.includeOffset=true] - include the offset, such as 'Z' or '-04:00'
       * @param {boolean} [opts.includeOffsetSpace=true] - include the space between the time and the offset, such as '05:15:16.345 -04:00'
       * @example DateTime.utc(2014, 7, 13).toSQL() //=> '2014-07-13 00:00:00.000 Z'
       * @example DateTime.local(2014, 7, 13).toSQL() //=> '2014-07-13 00:00:00.000 -04:00'
       * @example DateTime.local(2014, 7, 13).toSQL({ includeOffset: false }) //=> '2014-07-13 00:00:00.000'
       * @example DateTime.local(2014, 7, 13).toSQL({ includeZone: true }) //=> '2014-07-13 00:00:00.000 America/New_York'
       * @return {string}
       */
      toSQL(opts = {}) {
        if (!this.isValid) {
          return null;
        }
        return `${this.toSQLDate()} ${this.toSQLTime(opts)}`;
      }
      /**
       * Returns a string representation of this DateTime appropriate for debugging
       * @return {string}
       */
      toString() {
        return this.isValid ? this.toISO() : INVALID;
      }
      /**
       * Returns a string representation of this DateTime appropriate for the REPL.
       * @return {string}
       */
      [/* @__PURE__ */ Symbol.for("nodejs.util.inspect.custom")]() {
        if (this.isValid) {
          return `DateTime { ts: ${this.toISO()}, zone: ${this.zone.name}, locale: ${this.locale} }`;
        } else {
          return `DateTime { Invalid, reason: ${this.invalidReason} }`;
        }
      }
      /**
       * Returns the epoch milliseconds of this DateTime. Alias of {@link DateTime#toMillis}
       * @return {number}
       */
      valueOf() {
        return this.toMillis();
      }
      /**
       * Returns the epoch milliseconds of this DateTime.
       * @return {number}
       */
      toMillis() {
        return this.isValid ? this.ts : NaN;
      }
      /**
       * Returns the epoch seconds (including milliseconds in the fractional part) of this DateTime.
       * @return {number}
       */
      toSeconds() {
        return this.isValid ? this.ts / 1e3 : NaN;
      }
      /**
       * Returns the epoch seconds (as a whole number) of this DateTime.
       * @return {number}
       */
      toUnixInteger() {
        return this.isValid ? Math.floor(this.ts / 1e3) : NaN;
      }
      /**
       * Returns an ISO 8601 representation of this DateTime appropriate for use in JSON.
       * @return {string}
       */
      toJSON() {
        return this.toISO();
      }
      /**
       * Returns a BSON serializable equivalent to this DateTime.
       * @return {Date}
       */
      toBSON() {
        return this.toJSDate();
      }
      /**
       * Returns a JavaScript object with this DateTime's year, month, day, and so on.
       * @param opts - options for generating the object
       * @param {boolean} [opts.includeConfig=false] - include configuration attributes in the output
       * @example DateTime.now().toObject() //=> { year: 2017, month: 4, day: 22, hour: 20, minute: 49, second: 42, millisecond: 268 }
       * @return {Object}
       */
      toObject(opts = {}) {
        if (!this.isValid) return {};
        const base = {
          ...this.c
        };
        if (opts.includeConfig) {
          base.outputCalendar = this.outputCalendar;
          base.numberingSystem = this.loc.numberingSystem;
          base.locale = this.loc.locale;
        }
        return base;
      }
      /**
       * Returns a JavaScript Date equivalent to this DateTime.
       * @return {Date}
       */
      toJSDate() {
        return new Date(this.isValid ? this.ts : NaN);
      }
      // COMPARE
      /**
       * Return the difference between two DateTimes as a Duration.
       * @param {DateTime} otherDateTime - the DateTime to compare this one to
       * @param {string|string[]} [unit=['milliseconds']] - the unit or array of units (such as 'hours' or 'days') to include in the duration.
       * @param {Object} opts - options that affect the creation of the Duration
       * @param {string} [opts.conversionAccuracy='casual'] - the conversion system to use
       * @example
       * var i1 = DateTime.fromISO('1982-05-25T09:45'),
       *     i2 = DateTime.fromISO('1983-10-14T10:30');
       * i2.diff(i1).toObject() //=> { milliseconds: 43807500000 }
       * i2.diff(i1, 'hours').toObject() //=> { hours: 12168.75 }
       * i2.diff(i1, ['months', 'days']).toObject() //=> { months: 16, days: 19.03125 }
       * i2.diff(i1, ['months', 'days', 'hours']).toObject() //=> { months: 16, days: 19, hours: 0.75 }
       * @return {Duration}
       */
      diff(otherDateTime, unit = "milliseconds", opts = {}) {
        if (!this.isValid || !otherDateTime.isValid) {
          return Duration.invalid("created by diffing an invalid DateTime");
        }
        const durOpts = {
          locale: this.locale,
          numberingSystem: this.numberingSystem,
          ...opts
        };
        const units = maybeArray(unit).map(Duration.normalizeUnit), otherIsLater = otherDateTime.valueOf() > this.valueOf(), earlier = otherIsLater ? this : otherDateTime, later = otherIsLater ? otherDateTime : this, diffed = diff(earlier, later, units, durOpts);
        return otherIsLater ? diffed.negate() : diffed;
      }
      /**
       * Return the difference between this DateTime and right now.
       * See {@link DateTime#diff}
       * @param {string|string[]} [unit=['milliseconds']] - the unit or units units (such as 'hours' or 'days') to include in the duration
       * @param {Object} opts - options that affect the creation of the Duration
       * @param {string} [opts.conversionAccuracy='casual'] - the conversion system to use
       * @return {Duration}
       */
      diffNow(unit = "milliseconds", opts = {}) {
        return this.diff(_DateTime.now(), unit, opts);
      }
      /**
       * Return an Interval spanning between this DateTime and another DateTime
       * @param {DateTime} otherDateTime - the other end point of the Interval
       * @return {Interval|DateTime}
       */
      until(otherDateTime) {
        return this.isValid ? Interval.fromDateTimes(this, otherDateTime) : this;
      }
      /**
       * Return whether this DateTime is in the same unit of time as another DateTime.
       * Higher-order units must also be identical for this function to return `true`.
       * Note that time zones are **ignored** in this comparison, which compares the **local** calendar time. Use {@link DateTime#setZone} to convert one of the dates if needed.
       * @param {DateTime} otherDateTime - the other DateTime
       * @param {string} unit - the unit of time to check sameness on
       * @param {Object} opts - options
       * @param {boolean} [opts.useLocaleWeeks=false] - If true, use weeks based on the locale, i.e. use the locale-dependent start of the week; only the locale of this DateTime is used
       * @example DateTime.now().hasSame(otherDT, 'day'); //~> true if otherDT is in the same current calendar day
       * @return {boolean}
       */
      hasSame(otherDateTime, unit, opts) {
        if (!this.isValid) return false;
        const inputMs = otherDateTime.valueOf();
        const adjustedToZone = this.setZone(otherDateTime.zone, {
          keepLocalTime: true
        });
        return adjustedToZone.startOf(unit, opts) <= inputMs && inputMs <= adjustedToZone.endOf(unit, opts);
      }
      /**
       * Equality check
       * Two DateTimes are equal if and only if they represent the same millisecond, have the same zone and location, and are both valid.
       * To compare just the millisecond values, use `+dt1 === +dt2`.
       * @param {DateTime} other - the other DateTime
       * @return {boolean}
       */
      equals(other) {
        return this.isValid && other.isValid && this.valueOf() === other.valueOf() && this.zone.equals(other.zone) && this.loc.equals(other.loc);
      }
      /**
       * Returns a string representation of a this time relative to now, such as "in two days". Can only internationalize if your
       * platform supports Intl.RelativeTimeFormat. Rounds towards zero by default.
       * @param {Object} options - options that affect the output
       * @param {DateTime} [options.base=DateTime.now()] - the DateTime to use as the basis to which this time is compared. Defaults to now.
       * @param {string} [options.style="long"] - the style of units, must be "long", "short", or "narrow"
       * @param {string|string[]} options.unit - use a specific unit or array of units; if omitted, or an array, the method will pick the best unit. Use an array or one of "years", "quarters", "months", "weeks", "days", "hours", "minutes", or "seconds"
       * @param {boolean} [options.round=true] - whether to round the numbers in the output.
       * @param {string} [options.rounding="trunc"] - rounding method to use when rounding the numbers in the output. Can be "trunc" (toward zero), "expand" (away from zero), "round", "floor", or "ceil".
       * @param {number} [options.padding=0] - padding in milliseconds. This allows you to round up the result if it fits inside the threshold. Don't use in combination with {round: false} because the decimal output will include the padding.
       * @param {string} options.locale - override the locale of this DateTime
       * @param {string} options.numberingSystem - override the numberingSystem of this DateTime. The Intl system may choose not to honor this
       * @example DateTime.now().plus({ days: 1 }).toRelative() //=> "in 1 day"
       * @example DateTime.now().setLocale("es").toRelative({ days: 1 }) //=> "dentro de 1 día"
       * @example DateTime.now().plus({ days: 1 }).toRelative({ locale: "fr" }) //=> "dans 23 heures"
       * @example DateTime.now().minus({ days: 2 }).toRelative() //=> "2 days ago"
       * @example DateTime.now().minus({ days: 2 }).toRelative({ unit: "hours" }) //=> "48 hours ago"
       * @example DateTime.now().minus({ hours: 36 }).toRelative({ round: false }) //=> "1.5 days ago"
       */
      toRelative(options = {}) {
        if (!this.isValid) return null;
        const base = options.base || _DateTime.fromObject({}, {
          zone: this.zone
        }), padding = options.padding ? this < base ? -options.padding : options.padding : 0;
        let units = ["years", "months", "days", "hours", "minutes", "seconds"];
        let unit = options.unit;
        if (Array.isArray(options.unit)) {
          units = options.unit;
          unit = void 0;
        }
        return diffRelative(base, this.plus(padding), {
          ...options,
          numeric: "always",
          units,
          unit
        });
      }
      /**
       * Returns a string representation of this date relative to today, such as "yesterday" or "next month".
       * Only internationalizes on platforms that supports Intl.RelativeTimeFormat.
       * @param {Object} options - options that affect the output
       * @param {DateTime} [options.base=DateTime.now()] - the DateTime to use as the basis to which this time is compared. Defaults to now.
       * @param {string} options.locale - override the locale of this DateTime
       * @param {string} options.unit - use a specific unit; if omitted, the method will pick the unit. Use one of "years", "quarters", "months", "weeks", or "days"
       * @param {string} options.numberingSystem - override the numberingSystem of this DateTime. The Intl system may choose not to honor this
       * @example DateTime.now().plus({ days: 1 }).toRelativeCalendar() //=> "tomorrow"
       * @example DateTime.now().setLocale("es").plus({ days: 1 }).toRelative() //=> ""mañana"
       * @example DateTime.now().plus({ days: 1 }).toRelativeCalendar({ locale: "fr" }) //=> "demain"
       * @example DateTime.now().minus({ days: 2 }).toRelativeCalendar() //=> "2 days ago"
       */
      toRelativeCalendar(options = {}) {
        if (!this.isValid) return null;
        return diffRelative(options.base || _DateTime.fromObject({}, {
          zone: this.zone
        }), this, {
          ...options,
          numeric: "auto",
          units: ["years", "months", "days"],
          calendary: true
        });
      }
      /**
       * Return the min of several date times
       * @param {...DateTime} dateTimes - the DateTimes from which to choose the minimum
       * @return {DateTime} the min DateTime, or undefined if called with no argument
       */
      static min(...dateTimes) {
        if (!dateTimes.every(_DateTime.isDateTime)) {
          throw new InvalidArgumentError("min requires all arguments be DateTimes");
        }
        return bestBy(dateTimes, (i) => i.valueOf(), Math.min);
      }
      /**
       * Return the max of several date times
       * @param {...DateTime} dateTimes - the DateTimes from which to choose the maximum
       * @return {DateTime} the max DateTime, or undefined if called with no argument
       */
      static max(...dateTimes) {
        if (!dateTimes.every(_DateTime.isDateTime)) {
          throw new InvalidArgumentError("max requires all arguments be DateTimes");
        }
        return bestBy(dateTimes, (i) => i.valueOf(), Math.max);
      }
      // MISC
      /**
       * Explain how a string would be parsed by fromFormat()
       * @param {string} text - the string to parse
       * @param {string} fmt - the format the string is expected to be in (see description)
       * @param {Object} options - options taken by fromFormat()
       * @return {Object}
       */
      static fromFormatExplain(text, fmt, options = {}) {
        const {
          locale: locale2 = null,
          numberingSystem = null
        } = options, localeToUse = Locale.fromOpts({
          locale: locale2,
          numberingSystem,
          defaultToEN: true
        });
        return explainFromTokens(localeToUse, text, fmt);
      }
      /**
       * @deprecated use fromFormatExplain instead
       */
      static fromStringExplain(text, fmt, options = {}) {
        return _DateTime.fromFormatExplain(text, fmt, options);
      }
      /**
       * Build a parser for `fmt` using the given locale. This parser can be passed
       * to {@link DateTime.fromFormatParser} to a parse a date in this format. This
       * can be used to optimize cases where many dates need to be parsed in a
       * specific format.
       *
       * @param {String} fmt - the format the string is expected to be in (see
       * description)
       * @param {Object} options - options used to set locale and numberingSystem
       * for parser
       * @returns {TokenParser} - opaque object to be used
       */
      static buildFormatParser(fmt, options = {}) {
        const {
          locale: locale2 = null,
          numberingSystem = null
        } = options, localeToUse = Locale.fromOpts({
          locale: locale2,
          numberingSystem,
          defaultToEN: true
        });
        return new TokenParser(localeToUse, fmt);
      }
      /**
       * Create a DateTime from an input string and format parser.
       *
       * The format parser must have been created with the same locale as this call.
       *
       * @param {String} text - the string to parse
       * @param {TokenParser} formatParser - parser from {@link DateTime.buildFormatParser}
       * @param {Object} opts - options taken by fromFormat()
       * @returns {DateTime}
       */
      static fromFormatParser(text, formatParser, opts = {}) {
        if (isUndefined(text) || isUndefined(formatParser)) {
          throw new InvalidArgumentError("fromFormatParser requires an input string and a format parser");
        }
        const {
          locale: locale2 = null,
          numberingSystem = null
        } = opts, localeToUse = Locale.fromOpts({
          locale: locale2,
          numberingSystem,
          defaultToEN: true
        });
        if (!localeToUse.equals(formatParser.locale)) {
          throw new InvalidArgumentError(`fromFormatParser called with a locale of ${localeToUse}, but the format parser was created for ${formatParser.locale}`);
        }
        const {
          result,
          zone,
          specificOffset,
          invalidReason
        } = formatParser.explainFromTokens(text);
        if (invalidReason) {
          return _DateTime.invalid(invalidReason);
        } else {
          return parseDataToDateTime(result, zone, opts, `format ${formatParser.format}`, text, specificOffset);
        }
      }
      // FORMAT PRESETS
      /**
       * {@link DateTime#toLocaleString} format like 10/14/1983
       * @type {Object}
       */
      static get DATE_SHORT() {
        return DATE_SHORT;
      }
      /**
       * {@link DateTime#toLocaleString} format like 'Oct 14, 1983'
       * @type {Object}
       */
      static get DATE_MED() {
        return DATE_MED;
      }
      /**
       * {@link DateTime#toLocaleString} format like 'Fri, Oct 14, 1983'
       * @type {Object}
       */
      static get DATE_MED_WITH_WEEKDAY() {
        return DATE_MED_WITH_WEEKDAY;
      }
      /**
       * {@link DateTime#toLocaleString} format like 'October 14, 1983'
       * @type {Object}
       */
      static get DATE_FULL() {
        return DATE_FULL;
      }
      /**
       * {@link DateTime#toLocaleString} format like 'Tuesday, October 14, 1983'
       * @type {Object}
       */
      static get DATE_HUGE() {
        return DATE_HUGE;
      }
      /**
       * {@link DateTime#toLocaleString} format like '09:30 AM'. Only 12-hour if the locale is.
       * @type {Object}
       */
      static get TIME_SIMPLE() {
        return TIME_SIMPLE;
      }
      /**
       * {@link DateTime#toLocaleString} format like '09:30:23 AM'. Only 12-hour if the locale is.
       * @type {Object}
       */
      static get TIME_WITH_SECONDS() {
        return TIME_WITH_SECONDS;
      }
      /**
       * {@link DateTime#toLocaleString} format like '09:30:23 AM EDT'. Only 12-hour if the locale is.
       * @type {Object}
       */
      static get TIME_WITH_SHORT_OFFSET() {
        return TIME_WITH_SHORT_OFFSET;
      }
      /**
       * {@link DateTime#toLocaleString} format like '09:30:23 AM Eastern Daylight Time'. Only 12-hour if the locale is.
       * @type {Object}
       */
      static get TIME_WITH_LONG_OFFSET() {
        return TIME_WITH_LONG_OFFSET;
      }
      /**
       * {@link DateTime#toLocaleString} format like '09:30', always 24-hour.
       * @type {Object}
       */
      static get TIME_24_SIMPLE() {
        return TIME_24_SIMPLE;
      }
      /**
       * {@link DateTime#toLocaleString} format like '09:30:23', always 24-hour.
       * @type {Object}
       */
      static get TIME_24_WITH_SECONDS() {
        return TIME_24_WITH_SECONDS;
      }
      /**
       * {@link DateTime#toLocaleString} format like '09:30:23 EDT', always 24-hour.
       * @type {Object}
       */
      static get TIME_24_WITH_SHORT_OFFSET() {
        return TIME_24_WITH_SHORT_OFFSET;
      }
      /**
       * {@link DateTime#toLocaleString} format like '09:30:23 Eastern Daylight Time', always 24-hour.
       * @type {Object}
       */
      static get TIME_24_WITH_LONG_OFFSET() {
        return TIME_24_WITH_LONG_OFFSET;
      }
      /**
       * {@link DateTime#toLocaleString} format like '10/14/1983, 9:30 AM'. Only 12-hour if the locale is.
       * @type {Object}
       */
      static get DATETIME_SHORT() {
        return DATETIME_SHORT;
      }
      /**
       * {@link DateTime#toLocaleString} format like '10/14/1983, 9:30:33 AM'. Only 12-hour if the locale is.
       * @type {Object}
       */
      static get DATETIME_SHORT_WITH_SECONDS() {
        return DATETIME_SHORT_WITH_SECONDS;
      }
      /**
       * {@link DateTime#toLocaleString} format like 'Oct 14, 1983, 9:30 AM'. Only 12-hour if the locale is.
       * @type {Object}
       */
      static get DATETIME_MED() {
        return DATETIME_MED;
      }
      /**
       * {@link DateTime#toLocaleString} format like 'Oct 14, 1983, 9:30:33 AM'. Only 12-hour if the locale is.
       * @type {Object}
       */
      static get DATETIME_MED_WITH_SECONDS() {
        return DATETIME_MED_WITH_SECONDS;
      }
      /**
       * {@link DateTime#toLocaleString} format like 'Fri, 14 Oct 1983, 9:30 AM'. Only 12-hour if the locale is.
       * @type {Object}
       */
      static get DATETIME_MED_WITH_WEEKDAY() {
        return DATETIME_MED_WITH_WEEKDAY;
      }
      /**
       * {@link DateTime#toLocaleString} format like 'October 14, 1983, 9:30 AM EDT'. Only 12-hour if the locale is.
       * @type {Object}
       */
      static get DATETIME_FULL() {
        return DATETIME_FULL;
      }
      /**
       * {@link DateTime#toLocaleString} format like 'October 14, 1983, 9:30:33 AM EDT'. Only 12-hour if the locale is.
       * @type {Object}
       */
      static get DATETIME_FULL_WITH_SECONDS() {
        return DATETIME_FULL_WITH_SECONDS;
      }
      /**
       * {@link DateTime#toLocaleString} format like 'Friday, October 14, 1983, 9:30 AM Eastern Daylight Time'. Only 12-hour if the locale is.
       * @type {Object}
       */
      static get DATETIME_HUGE() {
        return DATETIME_HUGE;
      }
      /**
       * {@link DateTime#toLocaleString} format like 'Friday, October 14, 1983, 9:30:33 AM Eastern Daylight Time'. Only 12-hour if the locale is.
       * @type {Object}
       */
      static get DATETIME_HUGE_WITH_SECONDS() {
        return DATETIME_HUGE_WITH_SECONDS;
      }
    };
    function friendlyDateTime(dateTimeish) {
      if (DateTime.isDateTime(dateTimeish)) {
        return dateTimeish;
      } else if (dateTimeish && dateTimeish.valueOf && isNumber(dateTimeish.valueOf())) {
        return DateTime.fromJSDate(dateTimeish);
      } else if (dateTimeish && typeof dateTimeish === "object") {
        return DateTime.fromObject(dateTimeish);
      } else {
        throw new InvalidArgumentError(`Unknown datetime argument: ${dateTimeish}, of type ${typeof dateTimeish}`);
      }
    }
    var VERSION = "3.7.2";
    exports2.DateTime = DateTime;
    exports2.Duration = Duration;
    exports2.FixedOffsetZone = FixedOffsetZone;
    exports2.IANAZone = IANAZone;
    exports2.Info = Info;
    exports2.Interval = Interval;
    exports2.InvalidZone = InvalidZone;
    exports2.Settings = Settings;
    exports2.SystemZone = SystemZone;
    exports2.VERSION = VERSION;
    exports2.Zone = Zone;
  }
});

// ../../node_modules/cron-parser/dist/CronDate.js
var require_CronDate = __commonJS({
  "../../node_modules/cron-parser/dist/CronDate.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.CronDate = exports2.DAYS_IN_MONTH = exports2.DateMathOp = exports2.TimeUnit = void 0;
    var luxon_1 = require_luxon();
    var TimeUnit;
    (function(TimeUnit2) {
      TimeUnit2["Second"] = "Second";
      TimeUnit2["Minute"] = "Minute";
      TimeUnit2["Hour"] = "Hour";
      TimeUnit2["Day"] = "Day";
      TimeUnit2["Month"] = "Month";
      TimeUnit2["Year"] = "Year";
    })(TimeUnit || (exports2.TimeUnit = TimeUnit = {}));
    var DateMathOp;
    (function(DateMathOp2) {
      DateMathOp2["Add"] = "Add";
      DateMathOp2["Subtract"] = "Subtract";
    })(DateMathOp || (exports2.DateMathOp = DateMathOp = {}));
    exports2.DAYS_IN_MONTH = Object.freeze([31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]);
    var CronDate = class _CronDate {
      #date;
      #dstStart = null;
      #dstEnd = null;
      /**
       * Maps the verb to the appropriate method
       */
      #verbMap = {
        add: {
          [TimeUnit.Year]: this.addYear.bind(this),
          [TimeUnit.Month]: this.addMonth.bind(this),
          [TimeUnit.Day]: this.addDay.bind(this),
          [TimeUnit.Hour]: this.addHour.bind(this),
          [TimeUnit.Minute]: this.addMinute.bind(this),
          [TimeUnit.Second]: this.addSecond.bind(this)
        },
        subtract: {
          [TimeUnit.Year]: this.subtractYear.bind(this),
          [TimeUnit.Month]: this.subtractMonth.bind(this),
          [TimeUnit.Day]: this.subtractDay.bind(this),
          [TimeUnit.Hour]: this.subtractHour.bind(this),
          [TimeUnit.Minute]: this.subtractMinute.bind(this),
          [TimeUnit.Second]: this.subtractSecond.bind(this)
        }
      };
      /**
       * Constructs a new CronDate instance.
       * @param {CronDate | Date | number | string} [timestamp] - The timestamp to initialize the CronDate with.
       * @param {string} [tz] - The timezone to use for the CronDate.
       */
      constructor(timestamp, tz) {
        const dateOpts = { zone: tz };
        if (!timestamp) {
          this.#date = luxon_1.DateTime.local();
        } else if (timestamp instanceof _CronDate) {
          this.#date = timestamp.#date;
          this.#dstStart = timestamp.#dstStart;
          this.#dstEnd = timestamp.#dstEnd;
        } else if (timestamp instanceof Date) {
          this.#date = luxon_1.DateTime.fromJSDate(timestamp, dateOpts);
        } else if (typeof timestamp === "number") {
          this.#date = luxon_1.DateTime.fromMillis(timestamp, dateOpts);
        } else {
          this.#date = luxon_1.DateTime.fromISO(timestamp, dateOpts);
          this.#date.isValid || (this.#date = luxon_1.DateTime.fromRFC2822(timestamp, dateOpts));
          this.#date.isValid || (this.#date = luxon_1.DateTime.fromSQL(timestamp, dateOpts));
          this.#date.isValid || (this.#date = luxon_1.DateTime.fromFormat(timestamp, "EEE, d MMM yyyy HH:mm:ss", dateOpts));
        }
        if (!this.#date.isValid) {
          throw new Error(`CronDate: unhandled timestamp: ${timestamp}`);
        }
        if (tz && tz !== this.#date.zoneName) {
          this.#date = this.#date.setZone(tz);
        }
      }
      /**
       * Determines if the given year is a leap year.
       * @param {number} year - The year to check
       * @returns {boolean} - True if the year is a leap year, false otherwise
       * @private
       */
      static #isLeapYear(year) {
        return year % 4 === 0 && year % 100 !== 0 || year % 400 === 0;
      }
      /**
       * Returns daylight savings start time.
       * @returns {number | null}
       */
      get dstStart() {
        return this.#dstStart;
      }
      /**
       * Sets daylight savings start time.
       * @param {number | null} value
       */
      set dstStart(value) {
        this.#dstStart = value;
      }
      /**
       * Returns daylight savings end time.
       * @returns {number | null}
       */
      get dstEnd() {
        return this.#dstEnd;
      }
      /**
       * Sets daylight savings end time.
       * @param {number | null} value
       */
      set dstEnd(value) {
        this.#dstEnd = value;
      }
      /**
       * Adds one year to the current CronDate.
       */
      addYear() {
        this.#date = this.#date.plus({ years: 1 });
      }
      /**
       * Adds one month to the current CronDate.
       */
      addMonth() {
        this.#date = this.#date.plus({ months: 1 }).startOf("month");
      }
      /**
       * Adds one day to the current CronDate.
       */
      addDay() {
        this.#date = this.#date.plus({ days: 1 }).startOf("day");
      }
      /**
       * Adds one hour to the current CronDate.
       */
      addHour() {
        this.#date = this.#date.plus({ hours: 1 }).startOf("hour");
      }
      /**
       * Adds one minute to the current CronDate.
       */
      addMinute() {
        this.#date = this.#date.plus({ minutes: 1 }).startOf("minute");
      }
      /**
       * Adds one second to the current CronDate.
       */
      addSecond() {
        this.#date = this.#date.plus({ seconds: 1 });
      }
      /**
       * Subtracts one year from the current CronDate.
       */
      subtractYear() {
        this.#date = this.#date.minus({ years: 1 });
      }
      /**
       * Subtracts one month from the current CronDate.
       * If the month is 1, it will subtract one year instead.
       */
      subtractMonth() {
        this.#date = this.#date.minus({ months: 1 }).endOf("month").startOf("second");
      }
      /**
       * Subtracts one day from the current CronDate.
       * If the day is 1, it will subtract one month instead.
       */
      subtractDay() {
        this.#date = this.#date.minus({ days: 1 }).endOf("day").startOf("second");
      }
      /**
       * Subtracts one hour from the current CronDate.
       * If the hour is 0, it will subtract one day instead.
       */
      subtractHour() {
        this.#date = this.#date.minus({ hours: 1 }).endOf("hour").startOf("second");
      }
      /**
       * Subtracts one minute from the current CronDate.
       * If the minute is 0, it will subtract one hour instead.
       */
      subtractMinute() {
        this.#date = this.#date.minus({ minutes: 1 }).endOf("minute").startOf("second");
      }
      /**
       * Subtracts one second from the current CronDate.
       * If the second is 0, it will subtract one minute instead.
       */
      subtractSecond() {
        this.#date = this.#date.minus({ seconds: 1 });
      }
      /**
       * Adds a unit of time to the current CronDate.
       * @param {TimeUnit} unit
       */
      addUnit(unit) {
        this.#verbMap.add[unit]();
      }
      /**
       * Subtracts a unit of time from the current CronDate.
       * @param {TimeUnit} unit
       */
      subtractUnit(unit) {
        this.#verbMap.subtract[unit]();
      }
      /**
       * Handles a math operation.
       * @param {DateMathOp} verb - {'add' | 'subtract'}
       * @param {TimeUnit} unit - {'year' | 'month' | 'day' | 'hour' | 'minute' | 'second'}
       */
      invokeDateOperation(verb, unit) {
        if (verb === DateMathOp.Add) {
          this.addUnit(unit);
          return;
        }
        if (verb === DateMathOp.Subtract) {
          this.subtractUnit(unit);
          return;
        }
        throw new Error(`Invalid verb: ${verb}`);
      }
      /**
       * Returns the day.
       * @returns {number}
       */
      getDate() {
        return this.#date.day;
      }
      /**
       * Returns the year.
       * @returns {number}
       */
      getFullYear() {
        return this.#date.year;
      }
      /**
       * Returns the day of the week.
       * @returns {number}
       */
      getDay() {
        const weekday = this.#date.weekday;
        return weekday === 7 ? 0 : weekday;
      }
      /**
       * Returns the month.
       * @returns {number}
       */
      getMonth() {
        return this.#date.month - 1;
      }
      /**
       * Returns the hour.
       * @returns {number}
       */
      getHours() {
        return this.#date.hour;
      }
      /**
       * Returns the minutes.
       * @returns {number}
       */
      getMinutes() {
        return this.#date.minute;
      }
      /**
       * Returns the seconds.
       * @returns {number}
       */
      getSeconds() {
        return this.#date.second;
      }
      /**
       * Returns the milliseconds.
       * @returns {number}
       */
      getMilliseconds() {
        return this.#date.millisecond;
      }
      /**
       * Returns the timezone offset from UTC in minutes (e.g. UTC+2 => 120).
       * Useful for detecting DST transition days.
       *
       * @returns {number} UTC offset in minutes
       */
      getUTCOffset() {
        return this.#date.offset;
      }
      /**
       * Sets the time to the start of the day (00:00:00.000) in the current timezone.
       */
      setStartOfDay() {
        this.#date = this.#date.startOf("day");
      }
      /**
       * Sets the time to the end of the day (23:59:59.999) in the current timezone.
       */
      setEndOfDay() {
        this.#date = this.#date.endOf("day");
      }
      /**
       * Returns the time.
       * @returns {number}
       */
      getTime() {
        return this.#date.valueOf();
      }
      /**
       * Returns the UTC day.
       * @returns {number}
       */
      getUTCDate() {
        return this.#getUTC().day;
      }
      /**
       * Returns the UTC year.
       * @returns {number}
       */
      getUTCFullYear() {
        return this.#getUTC().year;
      }
      /**
       * Returns the UTC day of the week.
       * @returns {number}
       */
      getUTCDay() {
        const weekday = this.#getUTC().weekday;
        return weekday === 7 ? 0 : weekday;
      }
      /**
       * Returns the UTC month.
       * @returns {number}
       */
      getUTCMonth() {
        return this.#getUTC().month - 1;
      }
      /**
       * Returns the UTC hour.
       * @returns {number}
       */
      getUTCHours() {
        return this.#getUTC().hour;
      }
      /**
       * Returns the UTC minutes.
       * @returns {number}
       */
      getUTCMinutes() {
        return this.#getUTC().minute;
      }
      /**
       * Returns the UTC seconds.
       * @returns {number}
       */
      getUTCSeconds() {
        return this.#getUTC().second;
      }
      /**
       * Returns the UTC milliseconds.
       * @returns {string | null}
       */
      toISOString() {
        return this.#date.toUTC().toISO();
      }
      /**
       * Returns the date as a JSON string.
       * @returns {string | null}
       */
      toJSON() {
        return this.#date.toJSON();
      }
      /**
       * Sets the day.
       * @param d
       */
      setDate(d) {
        this.#date = this.#date.set({ day: d });
      }
      /**
       * Sets the year.
       * @param y
       */
      setFullYear(y) {
        this.#date = this.#date.set({ year: y });
      }
      /**
       * Sets the day of the week.
       * @param d
       */
      setDay(d) {
        this.#date = this.#date.set({ weekday: d });
      }
      /**
       * Sets the month.
       * @param m
       */
      setMonth(m) {
        this.#date = this.#date.set({ month: m + 1 });
      }
      /**
       * Sets the hour.
       * @param h
       */
      setHours(h) {
        this.#date = this.#date.set({ hour: h });
      }
      /**
       * Sets the minutes.
       * @param m
       */
      setMinutes(m) {
        this.#date = this.#date.set({ minute: m });
      }
      /**
       * Sets the seconds.
       * @param s
       */
      setSeconds(s) {
        this.#date = this.#date.set({ second: s });
      }
      /**
       * Sets the milliseconds.
       * @param s
       */
      setMilliseconds(s) {
        this.#date = this.#date.set({ millisecond: s });
      }
      /**
       * Returns the date as a string.
       * @returns {string}
       */
      toString() {
        return this.toDate().toString();
      }
      /**
       * Returns the date as a Date object.
       * @returns {Date}
       */
      toDate() {
        return this.#date.toJSDate();
      }
      /**
       * Returns true if the day is the last day of the month.
       * @returns {boolean}
       */
      isLastDayOfMonth() {
        const { day, month } = this.#date;
        if (month === 2) {
          const isLeap = _CronDate.#isLeapYear(this.#date.year);
          return day === exports2.DAYS_IN_MONTH[month - 1] - (isLeap ? 0 : 1);
        }
        return day === exports2.DAYS_IN_MONTH[month - 1];
      }
      /**
       * Returns true if the day is the last weekday of the month.
       * @returns {boolean}
       */
      isLastWeekdayOfMonth() {
        const { day, month } = this.#date;
        let lastDay;
        if (month === 2) {
          lastDay = exports2.DAYS_IN_MONTH[month - 1] - (_CronDate.#isLeapYear(this.#date.year) ? 0 : 1);
        } else {
          lastDay = exports2.DAYS_IN_MONTH[month - 1];
        }
        return day > lastDay - 7;
      }
      /**
       * Primarily for internal use.
       * @param {DateMathOp} op - The operation to perform.
       * @param {TimeUnit} unit - The unit of time to use.
       * @param {number} [hoursLength] - The length of the hours. Required when unit is not month or day.
       */
      applyDateOperation(op, unit, hoursLength) {
        if (unit === TimeUnit.Month || unit === TimeUnit.Day) {
          this.invokeDateOperation(op, unit);
          return;
        }
        const previousHour = this.getHours();
        this.invokeDateOperation(op, unit);
        const currentHour = this.getHours();
        const diff = currentHour - previousHour;
        if (diff === 2) {
          if (hoursLength !== 24) {
            this.dstStart = currentHour;
          }
        } else if (diff === 0 && this.getMinutes() === 0 && this.getSeconds() === 0) {
          if (hoursLength !== 24) {
            this.dstEnd = currentHour;
          }
        }
      }
      /**
       * Returns the UTC date.
       * @private
       * @returns {DateTime}
       */
      #getUTC() {
        return this.#date.toUTC();
      }
    };
    exports2.CronDate = CronDate;
    exports2.default = CronDate;
  }
});

// ../../node_modules/cron-parser/dist/fields/CronMonth.js
var require_CronMonth = __commonJS({
  "../../node_modules/cron-parser/dist/fields/CronMonth.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.CronMonth = void 0;
    var CronDate_1 = require_CronDate();
    var CronField_1 = require_CronField();
    var MIN_MONTH = 1;
    var MAX_MONTH = 12;
    var MONTH_CHARS = Object.freeze([]);
    var CronMonth = class extends CronField_1.CronField {
      static get min() {
        return MIN_MONTH;
      }
      static get max() {
        return MAX_MONTH;
      }
      static get chars() {
        return MONTH_CHARS;
      }
      static get daysInMonth() {
        return CronDate_1.DAYS_IN_MONTH;
      }
      /**
       * CronDayOfMonth constructor. Initializes the "day of the month" field with the provided values.
       * @param {MonthRange[]} values - Values for the "day of the month" field
       * @param {CronFieldOptions} [options] - Options provided by the parser
       */
      constructor(values, options) {
        super(values, options);
        this.validate();
      }
      /**
       * Returns an array of allowed values for the "day of the month" field.
       * @returns {MonthRange[]}
       */
      get values() {
        return super.values;
      }
    };
    exports2.CronMonth = CronMonth;
  }
});

// ../../node_modules/cron-parser/dist/fields/CronSecond.js
var require_CronSecond = __commonJS({
  "../../node_modules/cron-parser/dist/fields/CronSecond.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.CronSecond = void 0;
    var CronField_1 = require_CronField();
    var MIN_SECOND = 0;
    var MAX_SECOND = 59;
    var SECOND_CHARS = Object.freeze([]);
    var CronSecond = class extends CronField_1.CronField {
      static get min() {
        return MIN_SECOND;
      }
      static get max() {
        return MAX_SECOND;
      }
      static get chars() {
        return SECOND_CHARS;
      }
      /**
       * CronSecond constructor. Initializes the "second" field with the provided values.
       * @param {SixtyRange[]} values - Values for the "second" field
       * @param {CronFieldOptions} [options] - Options provided by the parser
       */
      constructor(values, options) {
        super(values, options);
        this.validate();
      }
      /**
       * Returns an array of allowed values for the "second" field.
       * @returns {SixtyRange[]}
       */
      get values() {
        return super.values;
      }
    };
    exports2.CronSecond = CronSecond;
  }
});

// ../../node_modules/cron-parser/dist/fields/index.js
var require_fields = __commonJS({
  "../../node_modules/cron-parser/dist/fields/index.js"(exports2) {
    "use strict";
    var __createBinding = exports2 && exports2.__createBinding || (Object.create ? (function(o, m, k, k2) {
      if (k2 === void 0) k2 = k;
      var desc = Object.getOwnPropertyDescriptor(m, k);
      if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
        desc = { enumerable: true, get: function() {
          return m[k];
        } };
      }
      Object.defineProperty(o, k2, desc);
    }) : (function(o, m, k, k2) {
      if (k2 === void 0) k2 = k;
      o[k2] = m[k];
    }));
    var __exportStar = exports2 && exports2.__exportStar || function(m, exports3) {
      for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports3, p)) __createBinding(exports3, m, p);
    };
    Object.defineProperty(exports2, "__esModule", { value: true });
    __exportStar(require_types2(), exports2);
    __exportStar(require_CronDayOfMonth(), exports2);
    __exportStar(require_CronDayOfWeek(), exports2);
    __exportStar(require_CronField(), exports2);
    __exportStar(require_CronHour(), exports2);
    __exportStar(require_CronMinute(), exports2);
    __exportStar(require_CronMonth(), exports2);
    __exportStar(require_CronSecond(), exports2);
  }
});

// ../../node_modules/cron-parser/dist/CronFieldCollection.js
var require_CronFieldCollection = __commonJS({
  "../../node_modules/cron-parser/dist/CronFieldCollection.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.CronFieldCollection = void 0;
    var fields_1 = require_fields();
    var CronFieldCollection = class _CronFieldCollection {
      #second;
      #minute;
      #hour;
      #dayOfMonth;
      #month;
      #dayOfWeek;
      /**
       * Creates a new CronFieldCollection instance by partially overriding fields from an existing one.
       * @param {CronFieldCollection} base - The base CronFieldCollection to copy fields from
       * @param {CronFieldOverride} fields - The fields to override, can be CronField instances or raw values
       * @returns {CronFieldCollection} A new CronFieldCollection instance
       * @example
       * const base = new CronFieldCollection({
       *   second: new CronSecond([0]),
       *   minute: new CronMinute([0]),
       *   hour: new CronHour([12]),
       *   dayOfMonth: new CronDayOfMonth([1]),
       *   month: new CronMonth([1]),
       *   dayOfWeek: new CronDayOfWeek([1])
       * });
       *
       * // Using CronField instances
       * const modified1 = CronFieldCollection.from(base, {
       *   hour: new CronHour([15]),
       *   minute: new CronMinute([30])
       * });
       *
       * // Using raw values
       * const modified2 = CronFieldCollection.from(base, {
       *   hour: [15],        // Will create new CronHour
       *   minute: [30]       // Will create new CronMinute
       * });
       */
      static from(base, fields) {
        return new _CronFieldCollection({
          second: this.resolveField(fields_1.CronSecond, base.second, fields.second),
          minute: this.resolveField(fields_1.CronMinute, base.minute, fields.minute),
          hour: this.resolveField(fields_1.CronHour, base.hour, fields.hour),
          dayOfMonth: this.resolveField(fields_1.CronDayOfMonth, base.dayOfMonth, fields.dayOfMonth),
          month: this.resolveField(fields_1.CronMonth, base.month, fields.month),
          dayOfWeek: this.resolveField(fields_1.CronDayOfWeek, base.dayOfWeek, fields.dayOfWeek)
        });
      }
      /**
       * Resolves a field value, either using the provided CronField instance or creating a new one from raw values.
       * @param constructor - The constructor for creating new field instances
       * @param baseField - The base field to use if no override is provided
       * @param fieldValue - The override value, either a CronField instance or raw values
       * @returns The resolved CronField instance
       * @private
       */
      static resolveField(constructor, baseField, fieldValue) {
        if (!fieldValue) {
          return baseField;
        }
        if (fieldValue instanceof fields_1.CronField) {
          return fieldValue;
        }
        return new constructor(fieldValue);
      }
      /**
       * CronFieldCollection constructor. Initializes the cron fields with the provided values.
       * @param {CronFields} param0 - The cron fields values
       * @throws {Error} if validation fails
       * @example
       * const cronFields = new CronFieldCollection({
       *   second: new CronSecond([0]),
       *   minute: new CronMinute([0, 30]),
       *   hour: new CronHour([9]),
       *   dayOfMonth: new CronDayOfMonth([15]),
       *   month: new CronMonth([1]),
       *   dayOfWeek: new CronDayOfTheWeek([1, 2, 3, 4, 5]),
       * })
       *
       * console.log(cronFields.second.values); // [0]
       * console.log(cronFields.minute.values); // [0, 30]
       * console.log(cronFields.hour.values); // [9]
       * console.log(cronFields.dayOfMonth.values); // [15]
       * console.log(cronFields.month.values); // [1]
       * console.log(cronFields.dayOfWeek.values); // [1, 2, 3, 4, 5]
       */
      constructor({ second, minute, hour, dayOfMonth, month, dayOfWeek }) {
        if (!second) {
          throw new Error("Validation error, Field second is missing");
        }
        if (!minute) {
          throw new Error("Validation error, Field minute is missing");
        }
        if (!hour) {
          throw new Error("Validation error, Field hour is missing");
        }
        if (!dayOfMonth) {
          throw new Error("Validation error, Field dayOfMonth is missing");
        }
        if (!month) {
          throw new Error("Validation error, Field month is missing");
        }
        if (!dayOfWeek) {
          throw new Error("Validation error, Field dayOfWeek is missing");
        }
        if (month.values.length === 1 && !dayOfMonth.hasLastChar) {
          if (!(parseInt(dayOfMonth.values[0], 10) <= fields_1.CronMonth.daysInMonth[month.values[0] - 1])) {
            throw new Error("Invalid explicit day of month definition");
          }
        }
        this.#second = second;
        this.#minute = minute;
        this.#hour = hour;
        this.#month = month;
        this.#dayOfWeek = dayOfWeek;
        this.#dayOfMonth = dayOfMonth;
      }
      /**
       * Returns the second field.
       * @returns {CronSecond}
       */
      get second() {
        return this.#second;
      }
      /**
       * Returns the minute field.
       * @returns {CronMinute}
       */
      get minute() {
        return this.#minute;
      }
      /**
       * Returns the hour field.
       * @returns {CronHour}
       */
      get hour() {
        return this.#hour;
      }
      /**
       * Returns the day of the month field.
       * @returns {CronDayOfMonth}
       */
      get dayOfMonth() {
        return this.#dayOfMonth;
      }
      /**
       * Returns the month field.
       * @returns {CronMonth}
       */
      get month() {
        return this.#month;
      }
      /**
       * Returns the day of the week field.
       * @returns {CronDayOfWeek}
       */
      get dayOfWeek() {
        return this.#dayOfWeek;
      }
      /**
       * Returns a string representation of the cron fields.
       * @param {(number | CronChars)[]} input - The cron fields values
       * @static
       * @returns {FieldRange[]} - The compacted cron fields
       */
      static compactField(input) {
        if (input.length === 0) {
          return [];
        }
        const output4 = [];
        let current = void 0;
        input.forEach((item, i, arr) => {
          if (current === void 0) {
            current = { start: item, count: 1 };
            return;
          }
          const prevItem = arr[i - 1] || current.start;
          const nextItem = arr[i + 1];
          if (item === "L" || item === "W") {
            output4.push(current);
            output4.push({ start: item, count: 1 });
            current = void 0;
            return;
          }
          if (current.step === void 0 && nextItem !== void 0) {
            const step = item - prevItem;
            const nextStep = nextItem - item;
            if (step <= nextStep) {
              current = { ...current, count: 2, end: item, step };
              return;
            }
            current.step = 1;
          }
          if (item - (current.end ?? 0) === current.step) {
            current.count++;
            current.end = item;
          } else {
            if (current.count === 1) {
              output4.push({ start: current.start, count: 1 });
            } else if (current.count === 2) {
              output4.push({ start: current.start, count: 1 });
              output4.push({
                start: current.end ?? /* istanbul ignore next - see above */
                prevItem,
                count: 1
              });
            } else {
              output4.push(current);
            }
            current = { start: item, count: 1 };
          }
        });
        if (current) {
          output4.push(current);
        }
        return output4;
      }
      /**
       * Handles a single range.
       * @param {CronField} field - The cron field to stringify
       * @param {FieldRange} range {start: number, end: number, step: number, count: number} The range to handle.
       * @param {number} max The maximum value for the field.
       * @returns {string | null} The stringified range or null if it cannot be stringified.
       * @private
       */
      static #handleSingleRange(field, range, max) {
        const step = range.step;
        if (!step) {
          return null;
        }
        if (step === 1 && range.start === field.min && range.end && range.end >= max) {
          return field.hasQuestionMarkChar ? "?" : "*";
        }
        if (step !== 1 && range.start === field.min && range.end && range.end >= max - step + 1) {
          return `*/${step}`;
        }
        return null;
      }
      /**
       * Handles multiple ranges.
       * @param {FieldRange} range {start: number, end: number, step: number, count: number} The range to handle.
       * @param {number} max The maximum value for the field.
       * @returns {string} The stringified range.
       * @private
       */
      static #handleMultipleRanges(range, max) {
        const step = range.step;
        if (step === 1) {
          return `${range.start}-${range.end}`;
        }
        const multiplier = range.start === 0 ? range.count - 1 : range.count;
        if (!step) {
          throw new Error("Unexpected range step");
        }
        if (!range.end) {
          throw new Error("Unexpected range end");
        }
        if (step * multiplier > range.end) {
          const mapFn = (_, index) => {
            if (typeof range.start !== "number") {
              throw new Error("Unexpected range start");
            }
            return index % step === 0 ? range.start + index : null;
          };
          if (typeof range.start !== "number") {
            throw new Error("Unexpected range start");
          }
          const seed = { length: range.end - range.start + 1 };
          return Array.from(seed, mapFn).filter((value) => value !== null).join(",");
        }
        return range.end === max - step + 1 ? `${range.start}/${step}` : `${range.start}-${range.end}/${step}`;
      }
      /**
       * Returns a string representation of the cron fields.
       * @param {CronField} field - The cron field to stringify
       * @static
       * @returns {string} - The stringified cron field
       */
      stringifyField(field) {
        let max = field.max;
        let values = field.values;
        if (field instanceof fields_1.CronDayOfWeek) {
          max = 6;
          const dayOfWeek = this.#dayOfWeek.values;
          values = dayOfWeek[dayOfWeek.length - 1] === 7 ? dayOfWeek.slice(0, -1) : dayOfWeek;
        }
        if (field instanceof fields_1.CronDayOfMonth) {
          max = this.#month.values.length === 1 ? fields_1.CronMonth.daysInMonth[this.#month.values[0] - 1] : field.max;
        }
        const ranges = _CronFieldCollection.compactField(values);
        if (ranges.length === 1) {
          const singleRangeResult = _CronFieldCollection.#handleSingleRange(field, ranges[0], max);
          if (singleRangeResult) {
            return singleRangeResult;
          }
        }
        return ranges.map((range) => {
          const value = range.count === 1 ? range.start.toString() : _CronFieldCollection.#handleMultipleRanges(range, max);
          if (field instanceof fields_1.CronDayOfWeek && field.nthDay > 0) {
            return `${value}#${field.nthDay}`;
          }
          return value;
        }).join(",");
      }
      /**
       * Returns a string representation of the cron field values.
       * @param {boolean} includeSeconds - Whether to include seconds in the output
       * @returns {string} The formatted cron string
       */
      stringify(includeSeconds = false) {
        const arr = [];
        if (includeSeconds) {
          arr.push(this.stringifyField(this.#second));
        }
        arr.push(
          this.stringifyField(this.#minute),
          // minute
          this.stringifyField(this.#hour),
          // hour
          this.stringifyField(this.#dayOfMonth),
          // dayOfMonth
          this.stringifyField(this.#month),
          // month
          this.stringifyField(this.#dayOfWeek)
        );
        return arr.join(" ");
      }
      /**
       * Returns a serialized representation of the cron fields values.
       * @returns {SerializedCronFields} An object containing the cron field values
       */
      serialize() {
        return {
          second: this.#second.serialize(),
          minute: this.#minute.serialize(),
          hour: this.#hour.serialize(),
          dayOfMonth: this.#dayOfMonth.serialize(),
          month: this.#month.serialize(),
          dayOfWeek: this.#dayOfWeek.serialize()
        };
      }
    };
    exports2.CronFieldCollection = CronFieldCollection;
  }
});

// ../../node_modules/cron-parser/dist/CronExpression.js
var require_CronExpression = __commonJS({
  "../../node_modules/cron-parser/dist/CronExpression.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.CronExpression = exports2.LOOPS_LIMIT_EXCEEDED_ERROR_MESSAGE = exports2.TIME_SPAN_OUT_OF_BOUNDS_ERROR_MESSAGE = void 0;
    var CronDate_1 = require_CronDate();
    exports2.TIME_SPAN_OUT_OF_BOUNDS_ERROR_MESSAGE = "Out of the time span range";
    exports2.LOOPS_LIMIT_EXCEEDED_ERROR_MESSAGE = "Invalid expression, loop limit exceeded";
    var LOOP_LIMIT = 1e4;
    var CronExpression = class _CronExpression {
      #options;
      #tz;
      #currentDate;
      #startDate;
      #endDate;
      #fields;
      #dstTransitionDayKey = null;
      #isDstTransitionDay = false;
      /**
       * Creates a new CronExpression instance.
       *
       * @param {CronFieldCollection} fields - Cron fields.
       * @param {CronExpressionOptions} options - Parser options.
       */
      constructor(fields, options) {
        this.#options = options;
        this.#tz = options.tz;
        this.#startDate = options.startDate ? new CronDate_1.CronDate(options.startDate, this.#tz) : null;
        this.#endDate = options.endDate ? new CronDate_1.CronDate(options.endDate, this.#tz) : null;
        let currentDateValue = options.currentDate ?? options.startDate;
        if (currentDateValue) {
          const tempCurrentDate = new CronDate_1.CronDate(currentDateValue, this.#tz);
          if (this.#startDate && tempCurrentDate.getTime() < this.#startDate.getTime()) {
            currentDateValue = this.#startDate;
          } else if (this.#endDate && tempCurrentDate.getTime() > this.#endDate.getTime()) {
            currentDateValue = this.#endDate;
          }
        }
        this.#currentDate = new CronDate_1.CronDate(currentDateValue, this.#tz);
        this.#fields = fields;
      }
      /**
       * Getter for the cron fields.
       *
       * @returns {CronFieldCollection} Cron fields.
       */
      get fields() {
        return this.#fields;
      }
      /**
       * Converts cron fields back to a CronExpression instance.
       *
       * @public
       * @param {Record<string, number[]>} fields - The input cron fields object.
       * @param {CronExpressionOptions} [options] - Optional parsing options.
       * @returns {CronExpression} - A new CronExpression instance.
       */
      static fieldsToExpression(fields, options) {
        return new _CronExpression(fields, options || {});
      }
      /**
       * Checks if the given value matches any element in the sequence.
       *
       * @param {number} value - The value to be matched.
       * @param {number[]} sequence - The sequence to be checked against.
       * @returns {boolean} - True if the value matches an element in the sequence; otherwise, false.
       * @memberof CronExpression
       * @private
       */
      static #matchSchedule(value, sequence) {
        return sequence.some((element) => element === value);
      }
      /**
       * Returns the minimum or maximum value from the given array of numbers.
       *
       * @param {number[]} values - An array of numbers.
       * @param {boolean} reverse - If true, returns the maximum value; otherwise, returns the minimum value.
       * @returns {number} - The minimum or maximum value.
       */
      #getMinOrMax(values, reverse) {
        return values[reverse ? values.length - 1 : 0];
      }
      /**
       * Checks whether the given date falls on a DST transition day in its timezone.
       *
       * This is used to disable certain “direct set” fast paths on DST days, because setting the hour
       * directly may land on a non-existent or repeated local time. We cache the result per calendar day
       * to keep iteration overhead low.
       *
       * @param {CronDate} currentDate - Date to check (in the cron timezone)
       * @returns {boolean} True when the day has a DST transition
       * @private
       */
      #checkDstTransition(currentDate) {
        const key = `${currentDate.getFullYear()}-${currentDate.getMonth() + 1}-${currentDate.getDate()}`;
        if (this.#dstTransitionDayKey === key) {
          return this.#isDstTransitionDay;
        }
        const startOfDay = new CronDate_1.CronDate(currentDate);
        startOfDay.setStartOfDay();
        const endOfDay = new CronDate_1.CronDate(currentDate);
        endOfDay.setEndOfDay();
        this.#dstTransitionDayKey = key;
        this.#isDstTransitionDay = startOfDay.getUTCOffset() !== endOfDay.getUTCOffset();
        return this.#isDstTransitionDay;
      }
      /**
       * Moves the date to the next/previous allowed second value. If there is no remaining allowed second
       * within the current minute, rolls to the next/previous minute and resets seconds to the min/max allowed.
       *
       * @param {CronDate} currentDate - Mutable date being iterated
       * @param {DateMathOp} dateMathVerb - Add/Subtract depending on direction
       * @param {boolean} reverse - When true, iterating backwards
       * @private
       */
      #moveToNextSecond(currentDate, dateMathVerb, reverse) {
        const seconds = this.#fields.second.values;
        const currentSecond = currentDate.getSeconds();
        const nextSecond = this.#fields.second.findNearestValue(currentSecond, reverse);
        if (nextSecond !== null) {
          currentDate.setSeconds(nextSecond);
          return;
        }
        currentDate.applyDateOperation(dateMathVerb, CronDate_1.TimeUnit.Minute, this.#fields.hour.values.length);
        currentDate.setSeconds(this.#getMinOrMax(seconds, reverse));
      }
      /**
       * Moves the date to the next/previous allowed minute value and resets seconds to the min/max allowed.
       * If there is no remaining allowed minute within the current hour, rolls to the next/previous hour and
       * resets minutes/seconds to their extrema.
       *
       * @param {CronDate} currentDate - Mutable date being iterated
       * @param {DateMathOp} dateMathVerb - Add/Subtract depending on direction
       * @param {boolean} reverse - When true, iterating backwards
       * @private
       */
      #moveToNextMinute(currentDate, dateMathVerb, reverse) {
        const minutes = this.#fields.minute.values;
        const seconds = this.#fields.second.values;
        const currentMinute = currentDate.getMinutes();
        const nextMinute = this.#fields.minute.findNearestValue(currentMinute, reverse);
        if (nextMinute !== null) {
          currentDate.setMinutes(nextMinute);
          currentDate.setSeconds(this.#getMinOrMax(seconds, reverse));
          return;
        }
        currentDate.applyDateOperation(dateMathVerb, CronDate_1.TimeUnit.Hour, this.#fields.hour.values.length);
        currentDate.setMinutes(this.#getMinOrMax(minutes, reverse));
        currentDate.setSeconds(this.#getMinOrMax(seconds, reverse));
      }
      /**
       * Determines if the current date matches the last specified weekday of the month.
       *
       * @param {Array<(number|string)>} expressions - An array of expressions containing weekdays and "L" for the last weekday.
       * @param {CronDate} currentDate - The current date object.
       * @returns {boolean} - True if the current date matches the last specified weekday of the month; otherwise, false.
       * @memberof CronExpression
       * @private
       */
      static #isLastWeekdayOfMonthMatch(expressions, currentDate) {
        const isLastWeekdayOfMonth = currentDate.isLastWeekdayOfMonth();
        return expressions.some((expression) => {
          const weekday = parseInt(expression.toString().charAt(0), 10) % 7;
          if (Number.isNaN(weekday)) {
            throw new Error(`Invalid last weekday of the month expression: ${expression}`);
          }
          return currentDate.getDay() === weekday && isLastWeekdayOfMonth;
        });
      }
      /**
       * Find the next scheduled date based on the cron expression.
       * @returns {CronDate} - The next scheduled date or an ES6 compatible iterator object.
       * @memberof CronExpression
       * @public
       */
      next() {
        return this.#findSchedule();
      }
      /**
       * Find the previous scheduled date based on the cron expression.
       * @returns {CronDate} - The previous scheduled date or an ES6 compatible iterator object.
       * @memberof CronExpression
       * @public
       */
      prev() {
        return this.#findSchedule(true);
      }
      /**
       * Check if there is a next scheduled date based on the current date and cron expression.
       * @returns {boolean} - Returns true if there is a next scheduled date, false otherwise.
       * @memberof CronExpression
       * @public
       */
      hasNext() {
        const current = this.#currentDate;
        try {
          this.#findSchedule();
          return true;
        } catch {
          return false;
        } finally {
          this.#currentDate = current;
        }
      }
      /**
       * Check if there is a previous scheduled date based on the current date and cron expression.
       * @returns {boolean} - Returns true if there is a previous scheduled date, false otherwise.
       * @memberof CronExpression
       * @public
       */
      hasPrev() {
        const current = this.#currentDate;
        try {
          this.#findSchedule(true);
          return true;
        } catch {
          return false;
        } finally {
          this.#currentDate = current;
        }
      }
      /**
       * Iterate over a specified number of steps and optionally execute a callback function for each step.
       * @param {number} steps - The number of steps to iterate. Positive value iterates forward, negative value iterates backward.
       * @returns {CronDate[]} - An array of iterator fields or CronDate objects.
       * @memberof CronExpression
       * @public
       */
      take(limit) {
        const items = [];
        if (limit >= 0) {
          for (let i = 0; i < limit; i++) {
            try {
              items.push(this.next());
            } catch {
              return items;
            }
          }
        } else {
          for (let i = 0; i > limit; i--) {
            try {
              items.push(this.prev());
            } catch {
              return items;
            }
          }
        }
        return items;
      }
      /**
       * Reset the iterators current date to a new date or the initial date.
       * @param {Date | CronDate} [newDate] - Optional new date to reset to. If not provided, it will reset to the initial date.
       * @memberof CronExpression
       * @public
       */
      reset(newDate) {
        this.#currentDate = new CronDate_1.CronDate(newDate || this.#options.currentDate);
      }
      /**
       * Generate a string representation of the cron expression.
       * @param {boolean} [includeSeconds=false] - Whether to include the seconds field in the string representation.
       * @returns {string} - The string representation of the cron expression.
       * @memberof CronExpression
       * @public
       */
      stringify(includeSeconds = false) {
        return this.#fields.stringify(includeSeconds);
      }
      /**
       * Check if the cron expression includes the given date
       * @param {Date|CronDate} date
       * @returns {boolean}
       */
      includesDate(date2) {
        const { second, minute, hour, month } = this.#fields;
        const dt = new CronDate_1.CronDate(date2, this.#tz);
        if (!second.values.includes(dt.getSeconds()) || !minute.values.includes(dt.getMinutes()) || !hour.values.includes(dt.getHours()) || !month.values.includes(dt.getMonth() + 1)) {
          return false;
        }
        if (!this.#matchDayOfMonth(dt)) {
          return false;
        }
        if (this.#fields.dayOfWeek.nthDay > 0) {
          const weekInMonth = Math.ceil(dt.getDate() / 7);
          if (weekInMonth !== this.#fields.dayOfWeek.nthDay) {
            return false;
          }
        }
        return true;
      }
      /**
       * Returns the string representation of the cron expression.
       * @returns {CronDate} - The next schedule date.
       */
      toString() {
        return this.#options.expression || this.stringify(true);
      }
      /**
       * Determines if the given date matches the cron expression's day of month and day of week fields.
       *
       * The function checks the following rules:
       * Rule 1: If both "day of month" and "day of week" are restricted (not wildcard), then one or both must match the current day.
       * Rule 2: If "day of month" is restricted and "day of week" is not restricted, then "day of month" must match the current day.
       * Rule 3: If "day of month" is a wildcard, "day of week" is not a wildcard, and "day of week" matches the current day, then the match is accepted.
       * If none of the rules match, the match is rejected.
       *
       * @param {CronDate} currentDate - The current date to be evaluated against the cron expression.
       * @returns {boolean} Returns true if the current date matches the cron expression's day of month and day of week fields, otherwise false.
       * @memberof CronExpression
       * @private
       */
      #matchDayOfMonth(currentDate) {
        const isDayOfMonthWildcardMatch = this.#fields.dayOfMonth.isWildcard;
        const isRestrictedDayOfMonth = !isDayOfMonthWildcardMatch;
        const isDayOfWeekWildcardMatch = this.#fields.dayOfWeek.isWildcard;
        const isRestrictedDayOfWeek = !isDayOfWeekWildcardMatch;
        const matchedDOM = _CronExpression.#matchSchedule(currentDate.getDate(), this.#fields.dayOfMonth.values) || this.#fields.dayOfMonth.hasLastChar && currentDate.isLastDayOfMonth();
        const matchedDOW = _CronExpression.#matchSchedule(currentDate.getDay(), this.#fields.dayOfWeek.values) || this.#fields.dayOfWeek.hasLastChar && _CronExpression.#isLastWeekdayOfMonthMatch(this.#fields.dayOfWeek.values, currentDate);
        if (isRestrictedDayOfMonth && isRestrictedDayOfWeek && (matchedDOM || matchedDOW)) {
          return true;
        }
        if (matchedDOM && !isRestrictedDayOfWeek) {
          return true;
        }
        if (isDayOfMonthWildcardMatch && !isDayOfWeekWildcardMatch && matchedDOW) {
          return true;
        }
        return false;
      }
      /**
       * Determines if the current hour matches the cron expression.
       *
       * @param {CronDate} currentDate - The current date object.
       * @param {DateMathOp} dateMathVerb - The date math operation enumeration value.
       * @param {boolean} reverse - A flag indicating whether the matching should be done in reverse order.
       * @returns {boolean} - True if the current hour matches the cron expression; otherwise, false.
       */
      #matchHour(currentDate, dateMathVerb, reverse) {
        const hourValues = this.#fields.hour.values;
        const hours = hourValues;
        const currentHour = currentDate.getHours();
        const isMatch = _CronExpression.#matchSchedule(currentHour, hourValues);
        const isDstStart = currentDate.dstStart === currentHour;
        const isDstEnd = currentDate.dstEnd === currentHour;
        if (isDstStart) {
          if (_CronExpression.#matchSchedule(currentHour - 1, hourValues)) {
            return true;
          }
          currentDate.invokeDateOperation(dateMathVerb, CronDate_1.TimeUnit.Hour);
          return false;
        }
        if (isDstEnd && !reverse) {
          currentDate.dstEnd = null;
          currentDate.applyDateOperation(CronDate_1.DateMathOp.Add, CronDate_1.TimeUnit.Hour, hours.length);
          return false;
        }
        if (isMatch) {
          return true;
        }
        currentDate.dstStart = null;
        const nextHour = this.#fields.hour.findNearestValue(currentHour, reverse);
        if (nextHour === null) {
          currentDate.applyDateOperation(dateMathVerb, CronDate_1.TimeUnit.Day, hours.length);
          return false;
        }
        if (this.#checkDstTransition(currentDate)) {
          const steps = reverse ? currentHour - nextHour : nextHour - currentHour;
          for (let i = 0; i < steps; i++) {
            currentDate.applyDateOperation(dateMathVerb, CronDate_1.TimeUnit.Hour, hours.length);
          }
        } else {
          currentDate.setHours(nextHour);
        }
        currentDate.setMinutes(this.#getMinOrMax(this.#fields.minute.values, reverse));
        currentDate.setSeconds(this.#getMinOrMax(this.#fields.second.values, reverse));
        return false;
      }
      /**
       * Validates the current date against the start and end dates of the cron expression.
       * If the current date is outside the specified time span, an error is thrown.
       *
       * @param currentDate {CronDate} - The current date to validate.
       * @throws {Error} If the current date is outside the specified time span.
       * @private
       */
      #validateTimeSpan(currentDate) {
        if (!this.#startDate && !this.#endDate) {
          return;
        }
        const currentTime = currentDate.getTime();
        if (this.#startDate && currentTime < this.#startDate.getTime()) {
          throw new Error(exports2.TIME_SPAN_OUT_OF_BOUNDS_ERROR_MESSAGE);
        }
        if (this.#endDate && currentTime > this.#endDate.getTime()) {
          throw new Error(exports2.TIME_SPAN_OUT_OF_BOUNDS_ERROR_MESSAGE);
        }
      }
      /**
       * Finds the next or previous schedule based on the cron expression.
       *
       * @param {boolean} [reverse=false] - If true, finds the previous schedule; otherwise, finds the next schedule.
       * @returns {CronDate} - The next or previous schedule date.
       * @private
       */
      #findSchedule(reverse = false) {
        const dateMathVerb = reverse ? CronDate_1.DateMathOp.Subtract : CronDate_1.DateMathOp.Add;
        const currentDate = new CronDate_1.CronDate(this.#currentDate);
        const startTimestamp = currentDate.getTime();
        let stepCount = 0;
        while (++stepCount < LOOP_LIMIT) {
          this.#validateTimeSpan(currentDate);
          if (!this.#matchDayOfMonth(currentDate)) {
            currentDate.applyDateOperation(dateMathVerb, CronDate_1.TimeUnit.Day, this.#fields.hour.values.length);
            continue;
          }
          if (!(this.#fields.dayOfWeek.nthDay <= 0 || Math.ceil(currentDate.getDate() / 7) === this.#fields.dayOfWeek.nthDay)) {
            currentDate.applyDateOperation(dateMathVerb, CronDate_1.TimeUnit.Day, this.#fields.hour.values.length);
            continue;
          }
          if (!_CronExpression.#matchSchedule(currentDate.getMonth() + 1, this.#fields.month.values)) {
            currentDate.applyDateOperation(dateMathVerb, CronDate_1.TimeUnit.Month, this.#fields.hour.values.length);
            continue;
          }
          if (!this.#matchHour(currentDate, dateMathVerb, reverse)) {
            continue;
          }
          if (!_CronExpression.#matchSchedule(currentDate.getMinutes(), this.#fields.minute.values)) {
            this.#moveToNextMinute(currentDate, dateMathVerb, reverse);
            continue;
          }
          if (!_CronExpression.#matchSchedule(currentDate.getSeconds(), this.#fields.second.values)) {
            this.#moveToNextSecond(currentDate, dateMathVerb, reverse);
            continue;
          }
          if (startTimestamp === currentDate.getTime()) {
            if (dateMathVerb === "Add" || currentDate.getMilliseconds() === 0) {
              currentDate.applyDateOperation(dateMathVerb, CronDate_1.TimeUnit.Second, this.#fields.hour.values.length);
            }
            continue;
          }
          break;
        }
        if (stepCount > LOOP_LIMIT) {
          throw new Error(exports2.LOOPS_LIMIT_EXCEEDED_ERROR_MESSAGE);
        }
        if (currentDate.getMilliseconds() !== 0) {
          currentDate.setMilliseconds(0);
        }
        this.#currentDate = currentDate;
        return currentDate;
      }
      /**
       * Returns an iterator for iterating through future CronDate instances
       *
       * @name Symbol.iterator
       * @memberof CronExpression
       * @returns {Iterator<CronDate>} An iterator object for CronExpression that returns CronDate values.
       */
      [Symbol.iterator]() {
        return {
          next: () => {
            const schedule = this.#findSchedule();
            return { value: schedule, done: !this.hasNext() };
          }
        };
      }
    };
    exports2.CronExpression = CronExpression;
    exports2.default = CronExpression;
  }
});

// ../../node_modules/cron-parser/dist/utils/random.js
var require_random = __commonJS({
  "../../node_modules/cron-parser/dist/utils/random.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.seededRandom = seededRandom;
    function xfnv1a(str) {
      let h = 2166136261 >>> 0;
      for (let i = 0; i < str.length; i++) {
        h ^= str.charCodeAt(i);
        h = Math.imul(h, 16777619);
      }
      return () => h >>> 0;
    }
    function mulberry32(seed) {
      return () => {
        let t = seed += 1831565813;
        t = Math.imul(t ^ t >>> 15, t | 1);
        t ^= t + Math.imul(t ^ t >>> 7, t | 61);
        return ((t ^ t >>> 14) >>> 0) / 4294967296;
      };
    }
    function seededRandom(str) {
      const seed = str ? xfnv1a(str)() : Math.floor(Math.random() * 1e10);
      return mulberry32(seed);
    }
  }
});

// ../../node_modules/cron-parser/dist/CronExpressionParser.js
var require_CronExpressionParser = __commonJS({
  "../../node_modules/cron-parser/dist/CronExpressionParser.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.CronExpressionParser = exports2.DayOfWeek = exports2.Months = exports2.CronUnit = exports2.PredefinedExpressions = void 0;
    var CronFieldCollection_1 = require_CronFieldCollection();
    var CronExpression_1 = require_CronExpression();
    var random_1 = require_random();
    var fields_1 = require_fields();
    var PredefinedExpressions;
    (function(PredefinedExpressions2) {
      PredefinedExpressions2["@yearly"] = "0 0 0 1 1 *";
      PredefinedExpressions2["@annually"] = "0 0 0 1 1 *";
      PredefinedExpressions2["@monthly"] = "0 0 0 1 * *";
      PredefinedExpressions2["@weekly"] = "0 0 0 * * 0";
      PredefinedExpressions2["@daily"] = "0 0 0 * * *";
      PredefinedExpressions2["@hourly"] = "0 0 * * * *";
      PredefinedExpressions2["@minutely"] = "0 * * * * *";
      PredefinedExpressions2["@secondly"] = "* * * * * *";
      PredefinedExpressions2["@weekdays"] = "0 0 0 * * 1-5";
      PredefinedExpressions2["@weekends"] = "0 0 0 * * 0,6";
    })(PredefinedExpressions || (exports2.PredefinedExpressions = PredefinedExpressions = {}));
    var CronUnit;
    (function(CronUnit2) {
      CronUnit2["Second"] = "Second";
      CronUnit2["Minute"] = "Minute";
      CronUnit2["Hour"] = "Hour";
      CronUnit2["DayOfMonth"] = "DayOfMonth";
      CronUnit2["Month"] = "Month";
      CronUnit2["DayOfWeek"] = "DayOfWeek";
    })(CronUnit || (exports2.CronUnit = CronUnit = {}));
    var Months;
    (function(Months2) {
      Months2[Months2["jan"] = 1] = "jan";
      Months2[Months2["feb"] = 2] = "feb";
      Months2[Months2["mar"] = 3] = "mar";
      Months2[Months2["apr"] = 4] = "apr";
      Months2[Months2["may"] = 5] = "may";
      Months2[Months2["jun"] = 6] = "jun";
      Months2[Months2["jul"] = 7] = "jul";
      Months2[Months2["aug"] = 8] = "aug";
      Months2[Months2["sep"] = 9] = "sep";
      Months2[Months2["oct"] = 10] = "oct";
      Months2[Months2["nov"] = 11] = "nov";
      Months2[Months2["dec"] = 12] = "dec";
    })(Months || (exports2.Months = Months = {}));
    var DayOfWeek;
    (function(DayOfWeek2) {
      DayOfWeek2[DayOfWeek2["sun"] = 0] = "sun";
      DayOfWeek2[DayOfWeek2["mon"] = 1] = "mon";
      DayOfWeek2[DayOfWeek2["tue"] = 2] = "tue";
      DayOfWeek2[DayOfWeek2["wed"] = 3] = "wed";
      DayOfWeek2[DayOfWeek2["thu"] = 4] = "thu";
      DayOfWeek2[DayOfWeek2["fri"] = 5] = "fri";
      DayOfWeek2[DayOfWeek2["sat"] = 6] = "sat";
    })(DayOfWeek || (exports2.DayOfWeek = DayOfWeek = {}));
    var CronExpressionParser = class _CronExpressionParser {
      /**
       * Parses a cron expression and returns a CronExpression object.
       * @param {string} expression - The cron expression to parse.
       * @param {CronExpressionOptions} [options={}] - The options to use when parsing the expression.
       * @param {boolean} [options.strict=false] - If true, will throw an error if the expression contains both dayOfMonth and dayOfWeek.
       * @param {CronDate} [options.currentDate=new CronDate(undefined, 'UTC')] - The date to use when calculating the next/previous occurrence.
       *
       * @returns {CronExpression} A CronExpression object.
       */
      static parse(expression, options = {}) {
        const { strict = false, hashSeed } = options;
        const rand = (0, random_1.seededRandom)(hashSeed);
        expression = PredefinedExpressions[expression] || expression;
        const rawFields = _CronExpressionParser.#getRawFields(expression, strict);
        if (!(rawFields.dayOfMonth === "*" || rawFields.dayOfWeek === "*" || !strict)) {
          throw new Error("Cannot use both dayOfMonth and dayOfWeek together in strict mode!");
        }
        const second = _CronExpressionParser.#parseField(CronUnit.Second, rawFields.second, fields_1.CronSecond.constraints, rand);
        const minute = _CronExpressionParser.#parseField(CronUnit.Minute, rawFields.minute, fields_1.CronMinute.constraints, rand);
        const hour = _CronExpressionParser.#parseField(CronUnit.Hour, rawFields.hour, fields_1.CronHour.constraints, rand);
        const month = _CronExpressionParser.#parseField(CronUnit.Month, rawFields.month, fields_1.CronMonth.constraints, rand);
        const dayOfMonth = _CronExpressionParser.#parseField(CronUnit.DayOfMonth, rawFields.dayOfMonth, fields_1.CronDayOfMonth.constraints, rand);
        const { dayOfWeek: _dayOfWeek, nthDayOfWeek } = _CronExpressionParser.#parseNthDay(rawFields.dayOfWeek);
        const dayOfWeek = _CronExpressionParser.#parseField(CronUnit.DayOfWeek, _dayOfWeek, fields_1.CronDayOfWeek.constraints, rand);
        const fields = new CronFieldCollection_1.CronFieldCollection({
          second: new fields_1.CronSecond(second, { rawValue: rawFields.second }),
          minute: new fields_1.CronMinute(minute, { rawValue: rawFields.minute }),
          hour: new fields_1.CronHour(hour, { rawValue: rawFields.hour }),
          dayOfMonth: new fields_1.CronDayOfMonth(dayOfMonth, { rawValue: rawFields.dayOfMonth }),
          month: new fields_1.CronMonth(month, { rawValue: rawFields.month }),
          dayOfWeek: new fields_1.CronDayOfWeek(dayOfWeek, { rawValue: rawFields.dayOfWeek, nthDayOfWeek })
        });
        return new CronExpression_1.CronExpression(fields, { ...options, expression });
      }
      /**
       * Get the raw fields from a cron expression.
       * @param {string} expression - The cron expression to parse.
       * @param {boolean} strict - If true, will throw an error if the expression contains both dayOfMonth and dayOfWeek.
       * @private
       * @returns {RawCronFields} The raw fields.
       */
      static #getRawFields(expression, strict) {
        if (strict && !expression.length) {
          throw new Error("Invalid cron expression");
        }
        expression = expression || "0 * * * * *";
        const atoms = expression.trim().split(/\s+/);
        if (strict && atoms.length < 6) {
          throw new Error("Invalid cron expression, expected 6 fields");
        }
        if (atoms.length > 6) {
          throw new Error("Invalid cron expression, too many fields");
        }
        const defaults = ["*", "*", "*", "*", "*", "0"];
        if (atoms.length < defaults.length) {
          atoms.unshift(...defaults.slice(atoms.length));
        }
        const [second, minute, hour, dayOfMonth, month, dayOfWeek] = atoms;
        return { second, minute, hour, dayOfMonth, month, dayOfWeek };
      }
      /**
       * Parse a field from a cron expression.
       * @param {CronUnit} field - The field to parse.
       * @param {string} value - The value of the field.
       * @param {CronConstraints} constraints - The constraints for the field.
       * @private
       * @returns {(number | string)[]} The parsed field.
       */
      static #parseField(field, value, constraints, rand) {
        if (field === CronUnit.Month || field === CronUnit.DayOfWeek) {
          value = value.replace(/[a-z]{3}/gi, (match) => {
            match = match.toLowerCase();
            const replacer = Months[match] || DayOfWeek[match];
            if (replacer === void 0) {
              throw new Error(`Validation error, cannot resolve alias "${match}"`);
            }
            return replacer.toString();
          });
        }
        if (!constraints.validChars.test(value)) {
          throw new Error(`Invalid characters, got value: ${value}`);
        }
        value = this.#parseWildcard(value, constraints);
        value = this.#parseHashed(value, constraints, rand);
        return this.#parseSequence(field, value, constraints);
      }
      /**
       * Parse a wildcard from a cron expression.
       * @param {string} value - The value to parse.
       * @param {CronConstraints} constraints - The constraints for the field.
       * @private
       */
      static #parseWildcard(value, constraints) {
        return value.replace(/[*?]/g, constraints.min + "-" + constraints.max);
      }
      /**
       * Parse a hashed value from a cron expression.
       * @param {string} value - The value to parse.
       * @param {CronConstraints} constraints - The constraints for the field.
       * @param {PRNG} rand - The random number generator to use.
       * @private
       */
      static #parseHashed(value, constraints, rand) {
        const randomValue = rand();
        return value.replace(/H(?:\((\d+)-(\d+)\))?(?:\/(\d+))?/g, (_, min, max, step) => {
          if (min && max && step) {
            const minNum = parseInt(min, 10);
            const maxNum = parseInt(max, 10);
            const stepNum = parseInt(step, 10);
            if (minNum > maxNum) {
              throw new Error(`Invalid range: ${minNum}-${maxNum}, min > max`);
            }
            if (stepNum <= 0) {
              throw new Error(`Invalid step: ${stepNum}, must be positive`);
            }
            const minStart = Math.max(minNum, constraints.min);
            const offset = Math.floor(randomValue * stepNum);
            const values = [];
            for (let i = Math.floor(minStart / stepNum) * stepNum + offset; i <= maxNum; i += stepNum) {
              if (i >= minStart) {
                values.push(i);
              }
            }
            return values.join(",");
          } else if (min && max) {
            const minNum = parseInt(min, 10);
            const maxNum = parseInt(max, 10);
            if (minNum > maxNum) {
              throw new Error(`Invalid range: ${minNum}-${maxNum}, min > max`);
            }
            return String(Math.floor(randomValue * (maxNum - minNum + 1)) + minNum);
          } else if (step) {
            const stepNum = parseInt(step, 10);
            if (stepNum <= 0) {
              throw new Error(`Invalid step: ${stepNum}, must be positive`);
            }
            const offset = Math.floor(randomValue * stepNum);
            const values = [];
            for (let i = Math.floor(constraints.min / stepNum) * stepNum + offset; i <= constraints.max; i += stepNum) {
              if (i >= constraints.min) {
                values.push(i);
              }
            }
            return values.join(",");
          } else {
            return String(Math.floor(randomValue * (constraints.max - constraints.min + 1) + constraints.min));
          }
        });
      }
      /**
       * Parse a sequence from a cron expression.
       * @param {CronUnit} field - The field to parse.
       * @param {string} val - The sequence to parse.
       * @param {CronConstraints} constraints - The constraints for the field.
       * @private
       */
      static #parseSequence(field, val, constraints) {
        const stack = [];
        function handleResult(result, constraints2) {
          if (Array.isArray(result)) {
            stack.push(...result);
          } else {
            if (_CronExpressionParser.#isValidConstraintChar(constraints2, result)) {
              stack.push(result);
            } else {
              const v = parseInt(result.toString(), 10);
              const isValid = v >= constraints2.min && v <= constraints2.max;
              if (!isValid) {
                throw new Error(`Constraint error, got value ${result} expected range ${constraints2.min}-${constraints2.max}`);
              }
              stack.push(field === CronUnit.DayOfWeek ? v % 7 : result);
            }
          }
        }
        const atoms = val.split(",");
        atoms.forEach((atom) => {
          if (!(atom.length > 0)) {
            throw new Error("Invalid list value format");
          }
          handleResult(_CronExpressionParser.#parseRepeat(field, atom, constraints), constraints);
        });
        return stack;
      }
      /**
       * Parse repeat from a cron expression.
       * @param {CronUnit} field - The field to parse.
       * @param {string} val - The repeat to parse.
       * @param {CronConstraints} constraints - The constraints for the field.
       * @private
       * @returns {(number | string)[]} The parsed repeat.
       */
      static #parseRepeat(field, val, constraints) {
        const atoms = val.split("/");
        if (atoms.length > 2) {
          throw new Error(`Invalid repeat: ${val}`);
        }
        if (atoms.length === 2) {
          if (!isNaN(parseInt(atoms[0], 10))) {
            atoms[0] = `${atoms[0]}-${constraints.max}`;
          }
          return _CronExpressionParser.#parseRange(field, atoms[0], parseInt(atoms[1], 10), constraints);
        }
        return _CronExpressionParser.#parseRange(field, val, 1, constraints);
      }
      /**
       * Validate a cron range.
       * @param {number} min - The minimum value of the range.
       * @param {number} max - The maximum value of the range.
       * @param {CronConstraints} constraints - The constraints for the field.
       * @private
       * @returns {void}
       * @throws {Error} Throws an error if the range is invalid.
       */
      static #validateRange(min, max, constraints) {
        const isValid = !isNaN(min) && !isNaN(max) && min >= constraints.min && max <= constraints.max;
        if (!isValid) {
          throw new Error(`Constraint error, got range ${min}-${max} expected range ${constraints.min}-${constraints.max}`);
        }
        if (min > max) {
          throw new Error(`Invalid range: ${min}-${max}, min(${min}) > max(${max})`);
        }
      }
      /**
       * Validate a cron repeat interval.
       * @param {number} repeatInterval - The repeat interval to validate.
       * @private
       * @returns {void}
       * @throws {Error} Throws an error if the repeat interval is invalid.
       */
      static #validateRepeatInterval(repeatInterval) {
        if (!(!isNaN(repeatInterval) && repeatInterval > 0)) {
          throw new Error(`Constraint error, cannot repeat at every ${repeatInterval} time.`);
        }
      }
      /**
       * Create a range from a cron expression.
       * @param {CronUnit} field - The field to parse.
       * @param {number} min - The minimum value of the range.
       * @param {number} max - The maximum value of the range.
       * @param {number} repeatInterval - The repeat interval of the range.
       * @private
       * @returns {number[]} The created range.
       */
      static #createRange(field, min, max, repeatInterval) {
        const stack = [];
        if (field === CronUnit.DayOfWeek && max % 7 === 0) {
          stack.push(0);
        }
        for (let index = min; index <= max; index += repeatInterval) {
          if (stack.indexOf(index) === -1) {
            stack.push(index);
          }
        }
        return stack;
      }
      /**
       * Parse a range from a cron expression.
       * @param {CronUnit} field - The field to parse.
       * @param {string} val - The range to parse.
       * @param {number} repeatInterval - The repeat interval of the range.
       * @param {CronConstraints} constraints - The constraints for the field.
       * @private
       * @returns {number[] | string[] | number | string} The parsed range.
       */
      static #parseRange(field, val, repeatInterval, constraints) {
        const atoms = val.split("-");
        if (atoms.length <= 1) {
          return isNaN(+val) ? val : +val;
        }
        const [min, max] = atoms.map((num) => parseInt(num, 10));
        this.#validateRange(min, max, constraints);
        this.#validateRepeatInterval(repeatInterval);
        return this.#createRange(field, min, max, repeatInterval);
      }
      /**
       * Parse a cron expression.
       * @param {string} val - The cron expression to parse.
       * @private
       * @returns {string} The parsed cron expression.
       */
      static #parseNthDay(val) {
        const atoms = val.split("#");
        if (atoms.length <= 1) {
          return { dayOfWeek: atoms[0] };
        }
        const nthValue = +atoms[atoms.length - 1];
        const matches = val.match(/([,-/])/);
        if (matches !== null) {
          throw new Error(`Constraint error, invalid dayOfWeek \`#\` and \`${matches?.[0]}\` special characters are incompatible`);
        }
        if (!(atoms.length <= 2 && !isNaN(nthValue) && nthValue >= 1 && nthValue <= 5)) {
          throw new Error("Constraint error, invalid dayOfWeek occurrence number (#)");
        }
        return { dayOfWeek: atoms[0], nthDayOfWeek: nthValue };
      }
      /**
       * Checks if a character is valid for a field.
       * @param {CronConstraints} constraints - The constraints for the field.
       * @param {string | number} value - The value to check.
       * @private
       * @returns {boolean} Whether the character is valid for the field.
       */
      static #isValidConstraintChar(constraints, value) {
        return constraints.chars.some((char) => value.toString().includes(char));
      }
    };
    exports2.CronExpressionParser = CronExpressionParser;
  }
});

// ../../node_modules/cron-parser/dist/CronFileParser.js
var require_CronFileParser = __commonJS({
  "../../node_modules/cron-parser/dist/CronFileParser.js"(exports2) {
    "use strict";
    var __createBinding = exports2 && exports2.__createBinding || (Object.create ? (function(o, m, k, k2) {
      if (k2 === void 0) k2 = k;
      var desc = Object.getOwnPropertyDescriptor(m, k);
      if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
        desc = { enumerable: true, get: function() {
          return m[k];
        } };
      }
      Object.defineProperty(o, k2, desc);
    }) : (function(o, m, k, k2) {
      if (k2 === void 0) k2 = k;
      o[k2] = m[k];
    }));
    var __setModuleDefault = exports2 && exports2.__setModuleDefault || (Object.create ? (function(o, v) {
      Object.defineProperty(o, "default", { enumerable: true, value: v });
    }) : function(o, v) {
      o["default"] = v;
    });
    var __importStar = exports2 && exports2.__importStar || /* @__PURE__ */ (function() {
      var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function(o2) {
          var ar = [];
          for (var k in o2) if (Object.prototype.hasOwnProperty.call(o2, k)) ar[ar.length] = k;
          return ar;
        };
        return ownKeys(o);
      };
      return function(mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) {
          for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        }
        __setModuleDefault(result, mod);
        return result;
      };
    })();
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.CronFileParser = void 0;
    var CronExpressionParser_1 = require_CronExpressionParser();
    var CronFileParser = class _CronFileParser {
      /**
       * Parse a crontab file asynchronously
       * @param filePath Path to crontab file
       * @returns Promise resolving to parse results
       * @throws If file cannot be read
       */
      static async parseFile(filePath) {
        const { readFile } = await Promise.resolve().then(() => __importStar(require("fs/promises")));
        const data = await readFile(filePath, "utf8");
        return _CronFileParser.#parseContent(data);
      }
      /**
       * Parse a crontab file synchronously
       * @param filePath Path to crontab file
       * @returns Parse results
       * @throws If file cannot be read
       */
      static parseFileSync(filePath) {
        const { readFileSync: readFileSync10 } = require("fs");
        const data = readFileSync10(filePath, "utf8");
        return _CronFileParser.#parseContent(data);
      }
      /**
       * Internal method to parse crontab file content
       * @private
       */
      static #parseContent(data) {
        const blocks = data.split("\n");
        const result = {
          variables: {},
          expressions: [],
          errors: {}
        };
        for (const block of blocks) {
          const entry = block.trim();
          if (entry.length === 0 || entry.startsWith("#")) {
            continue;
          }
          const variableMatch = entry.match(/^(.*)=(.*)$/);
          if (variableMatch) {
            const [, key, value] = variableMatch;
            result.variables[key] = value.replace(/["']/g, "");
            continue;
          }
          try {
            const parsedEntry = _CronFileParser.#parseEntry(entry);
            result.expressions.push(parsedEntry.interval);
          } catch (err) {
            result.errors[entry] = err;
          }
        }
        return result;
      }
      /**
       * Parse a single crontab entry
       * @private
       */
      static #parseEntry(entry) {
        const atoms = entry.split(" ");
        return {
          interval: CronExpressionParser_1.CronExpressionParser.parse(atoms.slice(0, 5).join(" ")),
          command: atoms.slice(5, atoms.length)
        };
      }
    };
    exports2.CronFileParser = CronFileParser;
  }
});

// ../../node_modules/cron-parser/dist/index.js
var require_dist = __commonJS({
  "../../node_modules/cron-parser/dist/index.js"(exports2) {
    "use strict";
    var __createBinding = exports2 && exports2.__createBinding || (Object.create ? (function(o, m, k, k2) {
      if (k2 === void 0) k2 = k;
      var desc = Object.getOwnPropertyDescriptor(m, k);
      if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
        desc = { enumerable: true, get: function() {
          return m[k];
        } };
      }
      Object.defineProperty(o, k2, desc);
    }) : (function(o, m, k, k2) {
      if (k2 === void 0) k2 = k;
      o[k2] = m[k];
    }));
    var __exportStar = exports2 && exports2.__exportStar || function(m, exports3) {
      for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports3, p)) __createBinding(exports3, m, p);
    };
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.CronFileParser = exports2.CronExpressionParser = exports2.CronExpression = exports2.CronFieldCollection = exports2.CronDate = void 0;
    var CronExpressionParser_1 = require_CronExpressionParser();
    var CronDate_1 = require_CronDate();
    Object.defineProperty(exports2, "CronDate", { enumerable: true, get: function() {
      return CronDate_1.CronDate;
    } });
    var CronFieldCollection_1 = require_CronFieldCollection();
    Object.defineProperty(exports2, "CronFieldCollection", { enumerable: true, get: function() {
      return CronFieldCollection_1.CronFieldCollection;
    } });
    var CronExpression_1 = require_CronExpression();
    Object.defineProperty(exports2, "CronExpression", { enumerable: true, get: function() {
      return CronExpression_1.CronExpression;
    } });
    var CronExpressionParser_2 = require_CronExpressionParser();
    Object.defineProperty(exports2, "CronExpressionParser", { enumerable: true, get: function() {
      return CronExpressionParser_2.CronExpressionParser;
    } });
    var CronFileParser_1 = require_CronFileParser();
    Object.defineProperty(exports2, "CronFileParser", { enumerable: true, get: function() {
      return CronFileParser_1.CronFileParser;
    } });
    __exportStar(require_fields(), exports2);
    exports2.default = CronExpressionParser_1.CronExpressionParser;
  }
});

// ../../node_modules/cron-validate/lib/result.js
var require_result = __commonJS({
  "../../node_modules/cron-validate/lib/result.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.Err = exports2.Valid = exports2.err = exports2.valid = void 0;
    var valid = (value) => new Valid(value);
    exports2.valid = valid;
    var err = (error2) => new Err(error2);
    exports2.err = err;
    var Valid = class {
      constructor(value) {
        this.value = value;
      }
      isValid() {
        return true;
      }
      isError() {
        return !this.isValid();
      }
      getValue() {
        return this.value;
      }
      getError() {
        throw new Error("Tried to get error from a valid.");
      }
      map(func) {
        return (0, exports2.valid)(func(this.value));
      }
      mapErr(func) {
        return (0, exports2.valid)(this.value);
      }
    };
    exports2.Valid = Valid;
    var Err = class {
      constructor(error2) {
        this.error = error2;
      }
      isError() {
        return true;
      }
      isValid() {
        return !this.isError();
      }
      getValue() {
        throw new Error("Tried to get success value from an error.");
      }
      getError() {
        return this.error;
      }
      map(func) {
        return (0, exports2.err)(this.error);
      }
      mapErr(func) {
        return (0, exports2.err)(func(this.error));
      }
    };
    exports2.Err = Err;
  }
});

// ../../node_modules/cron-validate/lib/types.js
var require_types3 = __commonJS({
  "../../node_modules/cron-validate/lib/types.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
  }
});

// ../../node_modules/cron-validate/lib/helper.js
var require_helper = __commonJS({
  "../../node_modules/cron-validate/lib/helper.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    require_lib();
    var result_1 = require_result();
    require_types3();
    var monthAliases = [
      "jan",
      "feb",
      "mar",
      "apr",
      "may",
      "jun",
      "jul",
      "aug",
      "sep",
      "oct",
      "nov",
      "dec"
    ];
    var daysOfWeekAliases = ["sun", "mon", "tue", "wed", "thu", "fri", "sat"];
    var checkWildcardLimit = (cronFieldType, options) => options[cronFieldType].lowerLimit === options.preset[cronFieldType].minValue && options[cronFieldType].upperLimit === options.preset[cronFieldType].maxValue;
    var checkSingleElementWithinLimits = (element, cronFieldType, options) => {
      if (cronFieldType === "months" && options.useAliases && monthAliases.indexOf(element.toLowerCase()) !== -1) {
        return (0, result_1.valid)(true);
      }
      if (cronFieldType === "daysOfWeek" && options.useAliases && daysOfWeekAliases.indexOf(element.toLowerCase()) !== -1) {
        return (0, result_1.valid)(true);
      }
      const number2 = Number(element);
      if (Number.isNaN(number2)) {
        return (0, result_1.err)(`Element '${element}' of ${cronFieldType} field is invalid.`);
      }
      if (number2 % 1 !== 0) {
        return (0, result_1.err)(`Element '${element}' of ${cronFieldType} field is not an integer.`);
      }
      const { lowerLimit } = options[cronFieldType];
      const { upperLimit } = options[cronFieldType];
      if (lowerLimit && number2 < lowerLimit) {
        return (0, result_1.err)(`Number '${number2}' of ${cronFieldType} field is smaller than lower limit '${lowerLimit}'.`);
      }
      if (upperLimit && number2 > upperLimit) {
        return (0, result_1.err)(`Number '${number2}' of ${cronFieldType} field is bigger than upper limit '${upperLimit}'.`);
      }
      return (0, result_1.valid)(true);
    };
    var checkSingleElement = (element, cronFieldType, options) => {
      if (element === "*") {
        if (!checkWildcardLimit(cronFieldType, options)) {
          return (0, result_1.err)(`Field ${cronFieldType} uses wildcard '*', but is limited to ${options[cronFieldType].lowerLimit}-${options[cronFieldType].upperLimit}.`);
        }
        return (0, result_1.valid)(true);
      }
      if (element === "") {
        return (0, result_1.err)(`One of the elements is empty in ${cronFieldType} field.`);
      }
      if (cronFieldType === "daysOfMonth" && options.useLastDayOfMonth && element === "L") {
        return (0, result_1.valid)(true);
      }
      if (cronFieldType === "daysOfWeek" && options.useLastDayOfWeek && element.endsWith("L")) {
        const day = element.slice(0, -1);
        if (day === "") {
          return (0, result_1.valid)(true);
        }
        return checkSingleElementWithinLimits(day, cronFieldType, options);
      }
      if (cronFieldType === "daysOfMonth" && options.useNearestWeekday && element.endsWith("W")) {
        const day = element.slice(0, -1);
        if (day === "") {
          return (0, result_1.err)(`The 'W' must be preceded by a day.`);
        }
        if (options.useLastDayOfMonth && day === "L") {
          return (0, result_1.valid)(true);
        }
        return checkSingleElementWithinLimits(day, cronFieldType, options);
      }
      if (cronFieldType === "daysOfWeek" && options.useNthWeekdayOfMonth && element.indexOf("#") !== -1) {
        const [day, occurrence, ...leftOvers] = element.split("#");
        if (leftOvers.length !== 0) {
          return (0, result_1.err)(`Unexpected number of '#' in ${element}, can only be used once.`);
        }
        const occurrenceNum = Number(occurrence);
        if (!occurrence || Number.isNaN(occurrenceNum)) {
          return (0, result_1.err)(`Unexpected value following the '#' symbol, a positive number was expected but found ${occurrence}.`);
        }
        if (occurrenceNum > 5) {
          return (0, result_1.err)(`Number of occurrence of the day of the week cannot be greater than 5.`);
        }
        return checkSingleElementWithinLimits(day, cronFieldType, options);
      }
      return checkSingleElementWithinLimits(element, cronFieldType, options);
    };
    var checkRangeElement = (element, cronFieldType, options, position) => {
      if (element === "*") {
        return (0, result_1.err)(`'*' can't be part of a range in ${cronFieldType} field.`);
      }
      if (element === "") {
        return (0, result_1.err)(`One of the range elements is empty in ${cronFieldType} field.`);
      }
      if (options.useLastDayOfMonth && cronFieldType === "daysOfMonth" && element === "L" && position === 0) {
        return (0, result_1.valid)(true);
      }
      return checkSingleElementWithinLimits(element, cronFieldType, options);
    };
    var checkFirstStepElement = (firstStepElement, cronFieldType, options) => {
      const rangeArray = firstStepElement.split("-");
      if (rangeArray.length > 2) {
        return (0, result_1.err)(`List element '${firstStepElement}' is not valid. (More than one '-').`);
      }
      if (rangeArray.length === 1) {
        return checkSingleElement(rangeArray[0], cronFieldType, options);
      }
      if (rangeArray.length === 2) {
        const firstRangeElementResult = checkRangeElement(rangeArray[0], cronFieldType, options, 0);
        const secondRangeElementResult = checkRangeElement(rangeArray[1], cronFieldType, options, 1);
        if (firstRangeElementResult.isError()) {
          return firstRangeElementResult;
        }
        if (secondRangeElementResult.isError()) {
          return secondRangeElementResult;
        }
        if (Number(rangeArray[0]) > Number(rangeArray[1])) {
          return (0, result_1.err)(`Lower range end '${rangeArray[0]}' is bigger than upper range end '${rangeArray[1]}' of ${cronFieldType} field.`);
        }
        return (0, result_1.valid)(true);
      }
      return (0, result_1.err)("Some other error in checkFirstStepElement (rangeArray less than 1)");
    };
    var checkListElement = (listElement, cronFieldType, options) => {
      const stepArray = listElement.split("/");
      if (stepArray.length > 2) {
        return (0, result_1.err)(`List element '${listElement}' is not valid. (More than one '/').`);
      }
      if (!options.allowStepping) {
        return (0, result_1.err)("Stepping ('/') is not allowed.");
      }
      const firstElementResult = checkFirstStepElement(stepArray[0], cronFieldType, options);
      if (firstElementResult.isError()) {
        return firstElementResult;
      }
      if (stepArray.length === 2) {
        const secondStepElement = stepArray[1];
        if (!secondStepElement) {
          return (0, result_1.err)(`Second step element '${secondStepElement}' of '${listElement}' is not valid (doesnt exist).`);
        }
        if (Number.isNaN(Number(secondStepElement))) {
          return (0, result_1.err)(`Second step element '${secondStepElement}' of '${listElement}' is not valid (not a number).`);
        }
        const secondStepNumber = Number(secondStepElement);
        if (secondStepNumber === 0) {
          return (0, result_1.err)(`Second step element '${secondStepElement}' of '${listElement}' cannot be zero.`);
        }
        if (secondStepNumber < 0) {
          return (0, result_1.err)(`Second step element '${secondStepElement}' of '${listElement}' cannot be negative.`);
        }
        if (secondStepNumber % 1 !== 0) {
          return (0, result_1.err)(`Second step element '${secondStepElement}' of '${listElement}' is not an integer.`);
        }
        const { lowerLimit, upperLimit } = options[cronFieldType];
        if (upperLimit && secondStepNumber > upperLimit) {
          return (0, result_1.err)(`Second step element '${secondStepElement}' of '${listElement}' is bigger than the upper limit '${upperLimit}'.`);
        }
        const rangeArray = stepArray[0].split("-");
        if (rangeArray.length === 2) {
          const rangeStart = Number(rangeArray[0]);
          const rangeEnd = Number(rangeArray[1]);
          if (!Number.isNaN(rangeStart) && !Number.isNaN(rangeEnd)) {
            if (secondStepNumber <= 0) {
              return (0, result_1.err)(`Step value '${secondStepElement}' must be greater than 0.`);
            }
            const customRange = rangeEnd - rangeStart + 1;
            if (secondStepNumber >= customRange) {
              return (0, result_1.err)(`Step value '${secondStepElement}' is too large for the range '${rangeStart}-${rangeEnd}'.`);
            }
          }
        }
      }
      return (0, result_1.valid)(true);
    };
    var checkField = (cronField, cronFieldType, options) => {
      if (![
        "seconds",
        "minutes",
        "hours",
        "daysOfMonth",
        "months",
        "daysOfWeek",
        "years"
      ].includes(cronFieldType)) {
        return (0, result_1.err)([`Cron field type '${cronFieldType}' does not exist.`]);
      }
      if (cronField === "?") {
        if (cronFieldType === "daysOfMonth" || cronFieldType === "daysOfWeek") {
          if (options.useBlankDay) {
            return (0, result_1.valid)(true);
          }
          return (0, result_1.err)([
            `useBlankDay is not enabled, but is used in ${cronFieldType} field.`
          ]);
        }
        return (0, result_1.err)([`blank notation is not allowed in ${cronFieldType} field.`]);
      }
      const listArray = cronField.split(",");
      const checkResults = [];
      listArray.forEach((listElement) => {
        checkResults.push(checkListElement(listElement, cronFieldType, options));
      });
      if (checkResults.every((value) => value.isValid())) {
        return (0, result_1.valid)(true);
      }
      const errorArray = [];
      checkResults.forEach((result) => {
        if (result.isError()) {
          errorArray.push(result.getError());
        }
      });
      return (0, result_1.err)(errorArray);
    };
    exports2.default = checkField;
  }
});

// ../../node_modules/cron-validate/lib/fieldCheckers/secondChecker.js
var require_secondChecker = __commonJS({
  "../../node_modules/cron-validate/lib/fieldCheckers/secondChecker.js"(exports2) {
    "use strict";
    var __importDefault = exports2 && exports2.__importDefault || function(mod) {
      return mod && mod.__esModule ? mod : { "default": mod };
    };
    Object.defineProperty(exports2, "__esModule", { value: true });
    require_lib();
    var result_1 = require_result();
    var helper_1 = __importDefault(require_helper());
    require_types3();
    var checkSeconds = (cronData, options) => {
      if (!cronData.seconds) {
        return (0, result_1.err)([
          "seconds field is undefined, but useSeconds options is enabled."
        ]);
      }
      const { seconds } = cronData;
      return (0, helper_1.default)(seconds, "seconds", options);
    };
    exports2.default = checkSeconds;
  }
});

// ../../node_modules/cron-validate/lib/fieldCheckers/minuteChecker.js
var require_minuteChecker = __commonJS({
  "../../node_modules/cron-validate/lib/fieldCheckers/minuteChecker.js"(exports2) {
    "use strict";
    var __importDefault = exports2 && exports2.__importDefault || function(mod) {
      return mod && mod.__esModule ? mod : { "default": mod };
    };
    Object.defineProperty(exports2, "__esModule", { value: true });
    require_lib();
    var result_1 = require_result();
    var helper_1 = __importDefault(require_helper());
    require_types3();
    var checkMinutes = (cronData, options) => {
      if (!cronData.minutes) {
        return (0, result_1.err)(["minutes field is undefined."]);
      }
      const { minutes } = cronData;
      return (0, helper_1.default)(minutes, "minutes", options);
    };
    exports2.default = checkMinutes;
  }
});

// ../../node_modules/cron-validate/lib/fieldCheckers/hourChecker.js
var require_hourChecker = __commonJS({
  "../../node_modules/cron-validate/lib/fieldCheckers/hourChecker.js"(exports2) {
    "use strict";
    var __importDefault = exports2 && exports2.__importDefault || function(mod) {
      return mod && mod.__esModule ? mod : { "default": mod };
    };
    Object.defineProperty(exports2, "__esModule", { value: true });
    require_lib();
    var result_1 = require_result();
    var helper_1 = __importDefault(require_helper());
    require_types3();
    var checkHours = (cronData, options) => {
      if (!cronData.hours) {
        return (0, result_1.err)(["hours field is undefined."]);
      }
      const { hours } = cronData;
      return (0, helper_1.default)(hours, "hours", options);
    };
    exports2.default = checkHours;
  }
});

// ../../node_modules/cron-validate/lib/fieldCheckers/dayOfMonthChecker.js
var require_dayOfMonthChecker = __commonJS({
  "../../node_modules/cron-validate/lib/fieldCheckers/dayOfMonthChecker.js"(exports2) {
    "use strict";
    var __importDefault = exports2 && exports2.__importDefault || function(mod) {
      return mod && mod.__esModule ? mod : { "default": mod };
    };
    Object.defineProperty(exports2, "__esModule", { value: true });
    require_lib();
    var result_1 = require_result();
    var helper_1 = __importDefault(require_helper());
    require_types3();
    var checkDaysOfMonth = (cronData, options) => {
      if (!cronData.daysOfMonth) {
        return (0, result_1.err)(["daysOfMonth field is undefined."]);
      }
      const { daysOfMonth } = cronData;
      if (options.allowOnlyOneBlankDayField && options.useBlankDay && cronData.daysOfMonth === "?" && cronData.daysOfWeek === "?") {
        return (0, result_1.err)([
          `Cannot use blank value in daysOfMonth and daysOfWeek field when allowOnlyOneBlankDayField option is enabled.`
        ]);
      }
      if (options.mustHaveBlankDayField && cronData.daysOfMonth !== "?" && cronData.daysOfWeek !== "?") {
        return (0, result_1.err)([
          `Cannot specify both daysOfMonth and daysOfWeek field when mustHaveBlankDayField option is enabled.`
        ]);
      }
      if (options.useLastDayOfMonth && cronData.daysOfMonth.indexOf("L") !== -1 && cronData.daysOfMonth.match(/[,/]/)) {
        return (0, result_1.err)([
          `Cannot specify last day of month with lists, or ranges (symbols ,/).`
        ]);
      }
      if (options.useNearestWeekday && cronData.daysOfMonth.indexOf("W") !== -1 && cronData.daysOfMonth.match(/[,/-]/)) {
        return (0, result_1.err)([
          `Cannot specify nearest weekday with lists, steps or ranges (symbols ,-/).`
        ]);
      }
      return (0, helper_1.default)(daysOfMonth, "daysOfMonth", options);
    };
    exports2.default = checkDaysOfMonth;
  }
});

// ../../node_modules/cron-validate/lib/fieldCheckers/monthChecker.js
var require_monthChecker = __commonJS({
  "../../node_modules/cron-validate/lib/fieldCheckers/monthChecker.js"(exports2) {
    "use strict";
    var __importDefault = exports2 && exports2.__importDefault || function(mod) {
      return mod && mod.__esModule ? mod : { "default": mod };
    };
    Object.defineProperty(exports2, "__esModule", { value: true });
    require_lib();
    var result_1 = require_result();
    var helper_1 = __importDefault(require_helper());
    require_types3();
    var checkMonths = (cronData, options) => {
      if (!cronData.months) {
        return (0, result_1.err)(["months field is undefined."]);
      }
      const { months } = cronData;
      return (0, helper_1.default)(months, "months", options);
    };
    exports2.default = checkMonths;
  }
});

// ../../node_modules/cron-validate/lib/fieldCheckers/dayOfWeekChecker.js
var require_dayOfWeekChecker = __commonJS({
  "../../node_modules/cron-validate/lib/fieldCheckers/dayOfWeekChecker.js"(exports2) {
    "use strict";
    var __importDefault = exports2 && exports2.__importDefault || function(mod) {
      return mod && mod.__esModule ? mod : { "default": mod };
    };
    Object.defineProperty(exports2, "__esModule", { value: true });
    require_lib();
    var result_1 = require_result();
    var helper_1 = __importDefault(require_helper());
    require_types3();
    var checkDaysOfWeek = (cronData, options) => {
      if (!cronData.daysOfWeek) {
        return (0, result_1.err)(["daysOfWeek field is undefined."]);
      }
      const { daysOfWeek } = cronData;
      if (options.allowOnlyOneBlankDayField && cronData.daysOfMonth === "?" && cronData.daysOfWeek === "?") {
        return (0, result_1.err)([
          `Cannot use blank value in daysOfMonth and daysOfWeek field when allowOnlyOneBlankDayField option is enabled.`
        ]);
      }
      if (options.mustHaveBlankDayField && cronData.daysOfMonth !== "?" && cronData.daysOfWeek !== "?") {
        return (0, result_1.err)([
          `Cannot specify both daysOfMonth and daysOfWeek field when mustHaveBlankDayField option is enabled.`
        ]);
      }
      if (options.useLastDayOfWeek && cronData.daysOfWeek.indexOf("L") !== -1 && cronData.daysOfWeek.match(/[,/-]/)) {
        return (0, result_1.err)([
          `Cannot specify last day of week with lists, steps or ranges (symbols ,-/).`
        ]);
      }
      if (options.useNthWeekdayOfMonth && cronData.daysOfWeek.indexOf("#") !== -1 && cronData.daysOfWeek.match(/[,/-]/)) {
        return (0, result_1.err)([
          `Cannot specify Nth weekday of month with lists, steps or ranges (symbols ,-/).`
        ]);
      }
      return (0, helper_1.default)(daysOfWeek, "daysOfWeek", options);
    };
    exports2.default = checkDaysOfWeek;
  }
});

// ../../node_modules/cron-validate/lib/fieldCheckers/yearChecker.js
var require_yearChecker = __commonJS({
  "../../node_modules/cron-validate/lib/fieldCheckers/yearChecker.js"(exports2) {
    "use strict";
    var __importDefault = exports2 && exports2.__importDefault || function(mod) {
      return mod && mod.__esModule ? mod : { "default": mod };
    };
    Object.defineProperty(exports2, "__esModule", { value: true });
    require_lib();
    var result_1 = require_result();
    var helper_1 = __importDefault(require_helper());
    require_types3();
    var checkYears = (cronData, options) => {
      if (!cronData.years) {
        return (0, result_1.err)(["years field is undefined, but useYears option is enabled."]);
      }
      const { years } = cronData;
      return (0, helper_1.default)(years, "years", options);
    };
    exports2.default = checkYears;
  }
});

// ../../node_modules/property-expr/index.js
var require_property_expr = __commonJS({
  "../../node_modules/property-expr/index.js"(exports2, module2) {
    "use strict";
    function Cache(maxSize) {
      this._maxSize = maxSize;
      this.clear();
    }
    Cache.prototype.clear = function() {
      this._size = 0;
      this._values = /* @__PURE__ */ Object.create(null);
    };
    Cache.prototype.get = function(key) {
      return this._values[key];
    };
    Cache.prototype.set = function(key, value) {
      this._size >= this._maxSize && this.clear();
      if (!(key in this._values)) this._size++;
      return this._values[key] = value;
    };
    var SPLIT_REGEX = /[^.^\]^[]+|(?=\[\]|\.\.)/g;
    var DIGIT_REGEX = /^\d+$/;
    var LEAD_DIGIT_REGEX = /^\d/;
    var SPEC_CHAR_REGEX = /[~`!#$%\^&*+=\-\[\]\\';,/{}|\\":<>\?]/g;
    var CLEAN_QUOTES_REGEX = /^\s*(['"]?)(.*?)(\1)\s*$/;
    var MAX_CACHE_SIZE = 512;
    var pathCache = new Cache(MAX_CACHE_SIZE);
    var setCache = new Cache(MAX_CACHE_SIZE);
    var getCache = new Cache(MAX_CACHE_SIZE);
    module2.exports = {
      Cache,
      split: split2,
      normalizePath: normalizePath2,
      setter: function(path7) {
        var parts = normalizePath2(path7);
        return setCache.get(path7) || setCache.set(path7, function setter(obj, value) {
          var index = 0;
          var len = parts.length;
          var data = obj;
          while (index < len - 1) {
            var part = parts[index];
            if (part === "__proto__" || part === "constructor" || part === "prototype") {
              return obj;
            }
            data = data[parts[index++]];
          }
          data[parts[index]] = value;
        });
      },
      getter: function(path7, safe) {
        var parts = normalizePath2(path7);
        return getCache.get(path7) || getCache.set(path7, function getter2(data) {
          var index = 0, len = parts.length;
          while (index < len) {
            if (data != null || !safe) data = data[parts[index++]];
            else return;
          }
          return data;
        });
      },
      join: function(segments) {
        return segments.reduce(function(path7, part) {
          return path7 + (isQuoted(part) || DIGIT_REGEX.test(part) ? "[" + part + "]" : (path7 ? "." : "") + part);
        }, "");
      },
      forEach: function(path7, cb, thisArg) {
        forEach2(Array.isArray(path7) ? path7 : split2(path7), cb, thisArg);
      }
    };
    function normalizePath2(path7) {
      return pathCache.get(path7) || pathCache.set(
        path7,
        split2(path7).map(function(part) {
          return part.replace(CLEAN_QUOTES_REGEX, "$2");
        })
      );
    }
    function split2(path7) {
      return path7.match(SPLIT_REGEX) || [""];
    }
    function forEach2(parts, iter, thisArg) {
      var len = parts.length, part, idx, isArray, isBracket;
      for (idx = 0; idx < len; idx++) {
        part = parts[idx];
        if (part) {
          if (shouldBeQuoted(part)) {
            part = '"' + part + '"';
          }
          isBracket = isQuoted(part);
          isArray = !isBracket && /^\d+$/.test(part);
          iter.call(thisArg, part, isBracket, isArray, idx, parts);
        }
      }
    }
    function isQuoted(str) {
      return typeof str === "string" && str && ["'", '"'].indexOf(str.charAt(0)) !== -1;
    }
    function hasLeadingNumber(part) {
      return part.match(LEAD_DIGIT_REGEX) && !part.match(DIGIT_REGEX);
    }
    function hasSpecialChars(part) {
      return SPEC_CHAR_REGEX.test(part);
    }
    function shouldBeQuoted(part) {
      return !isQuoted(part) && (hasLeadingNumber(part) || hasSpecialChars(part));
    }
  }
});

// ../../node_modules/tiny-case/index.js
var require_tiny_case = __commonJS({
  "../../node_modules/tiny-case/index.js"(exports2, module2) {
    "use strict";
    var reWords = /[A-Z\xc0-\xd6\xd8-\xde]?[a-z\xdf-\xf6\xf8-\xff]+(?:['’](?:d|ll|m|re|s|t|ve))?(?=[\xac\xb1\xd7\xf7\x00-\x2f\x3a-\x40\x5b-\x60\x7b-\xbf\u2000-\u206f \t\x0b\f\xa0\ufeff\n\r\u2028\u2029\u1680\u180e\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u202f\u205f\u3000]|[A-Z\xc0-\xd6\xd8-\xde]|$)|(?:[A-Z\xc0-\xd6\xd8-\xde]|[^\ud800-\udfff\xac\xb1\xd7\xf7\x00-\x2f\x3a-\x40\x5b-\x60\x7b-\xbf\u2000-\u206f \t\x0b\f\xa0\ufeff\n\r\u2028\u2029\u1680\u180e\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u202f\u205f\u3000\d+\u2700-\u27bfa-z\xdf-\xf6\xf8-\xffA-Z\xc0-\xd6\xd8-\xde])+(?:['’](?:D|LL|M|RE|S|T|VE))?(?=[\xac\xb1\xd7\xf7\x00-\x2f\x3a-\x40\x5b-\x60\x7b-\xbf\u2000-\u206f \t\x0b\f\xa0\ufeff\n\r\u2028\u2029\u1680\u180e\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u202f\u205f\u3000]|[A-Z\xc0-\xd6\xd8-\xde](?:[a-z\xdf-\xf6\xf8-\xff]|[^\ud800-\udfff\xac\xb1\xd7\xf7\x00-\x2f\x3a-\x40\x5b-\x60\x7b-\xbf\u2000-\u206f \t\x0b\f\xa0\ufeff\n\r\u2028\u2029\u1680\u180e\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u202f\u205f\u3000\d+\u2700-\u27bfa-z\xdf-\xf6\xf8-\xffA-Z\xc0-\xd6\xd8-\xde])|$)|[A-Z\xc0-\xd6\xd8-\xde]?(?:[a-z\xdf-\xf6\xf8-\xff]|[^\ud800-\udfff\xac\xb1\xd7\xf7\x00-\x2f\x3a-\x40\x5b-\x60\x7b-\xbf\u2000-\u206f \t\x0b\f\xa0\ufeff\n\r\u2028\u2029\u1680\u180e\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u202f\u205f\u3000\d+\u2700-\u27bfa-z\xdf-\xf6\xf8-\xffA-Z\xc0-\xd6\xd8-\xde])+(?:['’](?:d|ll|m|re|s|t|ve))?|[A-Z\xc0-\xd6\xd8-\xde]+(?:['’](?:D|LL|M|RE|S|T|VE))?|\d*(?:1ST|2ND|3RD|(?![123])\dTH)(?=\b|[a-z_])|\d*(?:1st|2nd|3rd|(?![123])\dth)(?=\b|[A-Z_])|\d+|(?:[\u2700-\u27bf]|(?:\ud83c[\udde6-\uddff]){2}|[\ud800-\udbff][\udc00-\udfff])[\ufe0e\ufe0f]?(?:[\u0300-\u036f\ufe20-\ufe2f\u20d0-\u20ff]|\ud83c[\udffb-\udfff])?(?:\u200d(?:[^\ud800-\udfff]|(?:\ud83c[\udde6-\uddff]){2}|[\ud800-\udbff][\udc00-\udfff])[\ufe0e\ufe0f]?(?:[\u0300-\u036f\ufe20-\ufe2f\u20d0-\u20ff]|\ud83c[\udffb-\udfff])?)*/g;
    var words = (str) => str.match(reWords) || [];
    var upperFirst = (str) => str[0].toUpperCase() + str.slice(1);
    var join7 = (str, d) => words(str).join(d).toLowerCase();
    var camelCase2 = (str) => words(str).reduce(
      (acc, next) => `${acc}${!acc ? next.toLowerCase() : next[0].toUpperCase() + next.slice(1).toLowerCase()}`,
      ""
    );
    var pascalCase = (str) => upperFirst(camelCase2(str));
    var snakeCase2 = (str) => join7(str, "_");
    var kebabCase = (str) => join7(str, "-");
    var sentenceCase = (str) => upperFirst(join7(str, " "));
    var titleCase = (str) => words(str).map(upperFirst).join(" ");
    module2.exports = {
      words,
      upperFirst,
      camelCase: camelCase2,
      pascalCase,
      snakeCase: snakeCase2,
      kebabCase,
      sentenceCase,
      titleCase
    };
  }
});

// ../../node_modules/toposort/index.js
var require_toposort = __commonJS({
  "../../node_modules/toposort/index.js"(exports2, module2) {
    "use strict";
    module2.exports = function(edges) {
      return toposort2(uniqueNodes(edges), edges);
    };
    module2.exports.array = toposort2;
    function toposort2(nodes, edges) {
      var cursor = nodes.length, sorted = new Array(cursor), visited = {}, i = cursor, outgoingEdges = makeOutgoingEdges(edges), nodesHash = makeNodesHash(nodes);
      edges.forEach(function(edge) {
        if (!nodesHash.has(edge[0]) || !nodesHash.has(edge[1])) {
          throw new Error("Unknown node. There is an unknown node in the supplied edges.");
        }
      });
      while (i--) {
        if (!visited[i]) visit(nodes[i], i, /* @__PURE__ */ new Set());
      }
      return sorted;
      function visit(node, i2, predecessors) {
        if (predecessors.has(node)) {
          var nodeRep;
          try {
            nodeRep = ", node was:" + JSON.stringify(node);
          } catch (e) {
            nodeRep = "";
          }
          throw new Error("Cyclic dependency" + nodeRep);
        }
        if (!nodesHash.has(node)) {
          throw new Error("Found unknown node. Make sure to provided all involved nodes. Unknown node: " + JSON.stringify(node));
        }
        if (visited[i2]) return;
        visited[i2] = true;
        var outgoing = outgoingEdges.get(node) || /* @__PURE__ */ new Set();
        outgoing = Array.from(outgoing);
        if (i2 = outgoing.length) {
          predecessors.add(node);
          do {
            var child = outgoing[--i2];
            visit(child, nodesHash.get(child), predecessors);
          } while (i2);
          predecessors.delete(node);
        }
        sorted[--cursor] = node;
      }
    }
    function uniqueNodes(arr) {
      var res = /* @__PURE__ */ new Set();
      for (var i = 0, len = arr.length; i < len; i++) {
        var edge = arr[i];
        res.add(edge[0]);
        res.add(edge[1]);
      }
      return Array.from(res);
    }
    function makeOutgoingEdges(arr) {
      var edges = /* @__PURE__ */ new Map();
      for (var i = 0, len = arr.length; i < len; i++) {
        var edge = arr[i];
        if (!edges.has(edge[0])) edges.set(edge[0], /* @__PURE__ */ new Set());
        if (!edges.has(edge[1])) edges.set(edge[1], /* @__PURE__ */ new Set());
        edges.get(edge[0]).add(edge[1]);
      }
      return edges;
    }
    function makeNodesHash(arr) {
      var res = /* @__PURE__ */ new Map();
      for (var i = 0, len = arr.length; i < len; i++) {
        res.set(arr[i], i);
      }
      return res;
    }
  }
});

// ../../node_modules/yup/index.esm.js
var index_esm_exports = {};
__export(index_esm_exports, {
  ArraySchema: () => ArraySchema,
  BooleanSchema: () => BooleanSchema,
  DateSchema: () => DateSchema,
  LazySchema: () => Lazy,
  MixedSchema: () => MixedSchema,
  NumberSchema: () => NumberSchema,
  ObjectSchema: () => ObjectSchema,
  Schema: () => Schema,
  StringSchema: () => StringSchema,
  TupleSchema: () => TupleSchema,
  ValidationError: () => ValidationError,
  addMethod: () => addMethod,
  array: () => create$2,
  bool: () => create$7,
  boolean: () => create$7,
  date: () => create$4,
  defaultLocale: () => locale,
  getIn: () => getIn,
  isSchema: () => isSchema,
  lazy: () => create,
  mixed: () => create$8,
  number: () => create$5,
  object: () => create$3,
  printValue: () => printValue,
  reach: () => reach,
  ref: () => create$9,
  setLocale: () => setLocale,
  string: () => create$6,
  tuple: () => create$1
});
function printNumber(val) {
  if (val != +val) return "NaN";
  const isNegativeZero = val === 0 && 1 / val < 0;
  return isNegativeZero ? "-0" : "" + val;
}
function printSimpleValue(val, quoteStrings = false) {
  if (val == null || val === true || val === false) return "" + val;
  const typeOf = typeof val;
  if (typeOf === "number") return printNumber(val);
  if (typeOf === "string") return quoteStrings ? `"${val}"` : val;
  if (typeOf === "function") return "[Function " + (val.name || "anonymous") + "]";
  if (typeOf === "symbol") return symbolToString.call(val).replace(SYMBOL_REGEXP, "Symbol($1)");
  const tag = toString.call(val).slice(8, -1);
  if (tag === "Date") return isNaN(val.getTime()) ? "" + val : val.toISOString(val);
  if (tag === "Error" || val instanceof Error) return "[" + errorToString.call(val) + "]";
  if (tag === "RegExp") return regExpToString.call(val);
  return null;
}
function printValue(value, quoteStrings) {
  let result = printSimpleValue(value, quoteStrings);
  if (result !== null) return result;
  return JSON.stringify(value, function(key, value2) {
    let result2 = printSimpleValue(this[key], quoteStrings);
    if (result2 !== null) return result2;
    return value2;
  }, 2);
}
function toArray(value) {
  return value == null ? [] : [].concat(value);
}
function create$9(key, options) {
  return new Reference(key, options);
}
function createValidation(config) {
  function validate({
    value,
    path: path7 = "",
    options,
    originalValue,
    schema
  }, panic, next) {
    const {
      name,
      test,
      params,
      message,
      skipAbsent
    } = config;
    let {
      parent,
      context,
      abortEarly = schema.spec.abortEarly,
      disableStackTrace = schema.spec.disableStackTrace
    } = options;
    const resolveOptions = {
      value,
      parent,
      context
    };
    function createError(overrides = {}) {
      const nextParams = resolveParams(Object.assign({
        value,
        originalValue,
        label: schema.spec.label,
        path: overrides.path || path7,
        spec: schema.spec,
        disableStackTrace: overrides.disableStackTrace || disableStackTrace
      }, params, overrides.params), resolveOptions);
      const error2 = new ValidationError(ValidationError.formatError(overrides.message || message, nextParams), value, nextParams.path, overrides.type || name, nextParams.disableStackTrace);
      error2.params = nextParams;
      return error2;
    }
    const invalid = abortEarly ? panic : next;
    let ctx = {
      path: path7,
      parent,
      type: name,
      from: options.from,
      createError,
      resolve(item) {
        return resolveMaybeRef(item, resolveOptions);
      },
      options,
      originalValue,
      schema
    };
    const handleResult = (validOrError) => {
      if (ValidationError.isError(validOrError)) invalid(validOrError);
      else if (!validOrError) invalid(createError());
      else next(null);
    };
    const handleError = (err) => {
      if (ValidationError.isError(err)) invalid(err);
      else panic(err);
    };
    const shouldSkip = skipAbsent && isAbsent(value);
    if (shouldSkip) {
      return handleResult(true);
    }
    let result;
    try {
      var _result;
      result = test.call(ctx, value, ctx);
      if (typeof ((_result = result) == null ? void 0 : _result.then) === "function") {
        if (options.sync) {
          throw new Error(`Validation test of type: "${ctx.type}" returned a Promise during a synchronous validate. This test will finish after the validate call has returned`);
        }
        return Promise.resolve(result).then(handleResult, handleError);
      }
    } catch (err) {
      handleError(err);
      return;
    }
    handleResult(result);
  }
  validate.OPTIONS = config;
  return validate;
}
function resolveParams(params, options) {
  if (!params) return params;
  for (const key of Object.keys(params)) {
    params[key] = resolveMaybeRef(params[key], options);
  }
  return params;
}
function resolveMaybeRef(item, options) {
  return Reference.isRef(item) ? item.getValue(options.value, options.parent, options.context) : item;
}
function getIn(schema, path7, value, context = value) {
  let parent, lastPart, lastPartDebug;
  if (!path7) return {
    parent,
    parentPath: path7,
    schema
  };
  (0, import_property_expr.forEach)(path7, (_part, isBracket, isArray) => {
    let part = isBracket ? _part.slice(1, _part.length - 1) : _part;
    schema = schema.resolve({
      context,
      parent,
      value
    });
    let isTuple = schema.type === "tuple";
    let idx = isArray ? parseInt(part, 10) : 0;
    if (schema.innerType || isTuple) {
      if (isTuple && !isArray) throw new Error(`Yup.reach cannot implicitly index into a tuple type. the path part "${lastPartDebug}" must contain an index to the tuple element, e.g. "${lastPartDebug}[0]"`);
      if (value && idx >= value.length) {
        throw new Error(`Yup.reach cannot resolve an array item at index: ${_part}, in the path: ${path7}. because there is no value at that index. `);
      }
      parent = value;
      value = value && value[idx];
      schema = isTuple ? schema.spec.types[idx] : schema.innerType;
    }
    if (!isArray) {
      if (!schema.fields || !schema.fields[part]) throw new Error(`The schema does not contain the path: ${path7}. (failed at: ${lastPartDebug} which is a type: "${schema.type}")`);
      parent = value;
      value = value && value[part];
      schema = schema.fields[part];
    }
    lastPart = part;
    lastPartDebug = isBracket ? "[" + _part + "]" : "." + _part;
  });
  return {
    schema,
    parent,
    parentPath: lastPart
  };
}
function reach(obj, path7, value, context) {
  return getIn(obj, path7, value, context).schema;
}
function clone(src, seen = /* @__PURE__ */ new Map()) {
  if (isSchema(src) || !src || typeof src !== "object") return src;
  if (seen.has(src)) return seen.get(src);
  let copy;
  if (src instanceof Date) {
    copy = new Date(src.getTime());
    seen.set(src, copy);
  } else if (src instanceof RegExp) {
    copy = new RegExp(src);
    seen.set(src, copy);
  } else if (Array.isArray(src)) {
    copy = new Array(src.length);
    seen.set(src, copy);
    for (let i = 0; i < src.length; i++) copy[i] = clone(src[i], seen);
  } else if (src instanceof Map) {
    copy = /* @__PURE__ */ new Map();
    seen.set(src, copy);
    for (const [k, v] of src.entries()) copy.set(k, clone(v, seen));
  } else if (src instanceof Set) {
    copy = /* @__PURE__ */ new Set();
    seen.set(src, copy);
    for (const v of src) copy.add(clone(v, seen));
  } else if (src instanceof Object) {
    copy = {};
    seen.set(src, copy);
    for (const [k, v] of Object.entries(src)) copy[k] = clone(v, seen);
  } else {
    throw Error(`Unable to clone ${src}`);
  }
  return copy;
}
function createStandardPath(path7) {
  if (!(path7 != null && path7.length)) {
    return void 0;
  }
  const segments = [];
  let currentSegment = "";
  let inBrackets = false;
  let inQuotes = false;
  for (let i = 0; i < path7.length; i++) {
    const char = path7[i];
    if (char === "[" && !inQuotes) {
      if (currentSegment) {
        segments.push(...currentSegment.split(".").filter(Boolean));
        currentSegment = "";
      }
      inBrackets = true;
      continue;
    }
    if (char === "]" && !inQuotes) {
      if (currentSegment) {
        if (/^\d+$/.test(currentSegment)) {
          segments.push(currentSegment);
        } else {
          segments.push(currentSegment.replace(/^"|"$/g, ""));
        }
        currentSegment = "";
      }
      inBrackets = false;
      continue;
    }
    if (char === '"') {
      inQuotes = !inQuotes;
      continue;
    }
    if (char === "." && !inBrackets && !inQuotes) {
      if (currentSegment) {
        segments.push(currentSegment);
        currentSegment = "";
      }
      continue;
    }
    currentSegment += char;
  }
  if (currentSegment) {
    segments.push(...currentSegment.split(".").filter(Boolean));
  }
  return segments;
}
function createStandardIssues(error2, parentPath) {
  const path7 = parentPath ? `${parentPath}.${error2.path}` : error2.path;
  return error2.errors.map((err) => ({
    message: err,
    path: createStandardPath(path7)
  }));
}
function issuesFromValidationError(error2, parentPath) {
  var _error$inner;
  if (!((_error$inner = error2.inner) != null && _error$inner.length) && error2.errors.length) {
    return createStandardIssues(error2, parentPath);
  }
  const path7 = parentPath ? `${parentPath}.${error2.path}` : error2.path;
  return error2.inner.flatMap((err) => issuesFromValidationError(err, path7));
}
function create$8(spec) {
  return new MixedSchema(spec);
}
function create$7() {
  return new BooleanSchema();
}
function parseIsoDate(date2) {
  const struct = parseDateStruct(date2);
  if (!struct) return Date.parse ? Date.parse(date2) : Number.NaN;
  if (struct.z === void 0 && struct.plusMinus === void 0) {
    return new Date(struct.year, struct.month, struct.day, struct.hour, struct.minute, struct.second, struct.millisecond).valueOf();
  }
  let totalMinutesOffset = 0;
  if (struct.z !== "Z" && struct.plusMinus !== void 0) {
    totalMinutesOffset = struct.hourOffset * 60 + struct.minuteOffset;
    if (struct.plusMinus === "+") totalMinutesOffset = 0 - totalMinutesOffset;
  }
  return Date.UTC(struct.year, struct.month, struct.day, struct.hour, struct.minute + totalMinutesOffset, struct.second, struct.millisecond);
}
function parseDateStruct(date2) {
  var _regexResult$7$length, _regexResult$;
  const regexResult = isoReg.exec(date2);
  if (!regexResult) return null;
  return {
    year: toNumber(regexResult[1]),
    month: toNumber(regexResult[2], 1) - 1,
    day: toNumber(regexResult[3], 1),
    hour: toNumber(regexResult[4]),
    minute: toNumber(regexResult[5]),
    second: toNumber(regexResult[6]),
    millisecond: regexResult[7] ? (
      // allow arbitrary sub-second precision beyond milliseconds
      toNumber(regexResult[7].substring(0, 3))
    ) : 0,
    precision: (_regexResult$7$length = (_regexResult$ = regexResult[7]) == null ? void 0 : _regexResult$.length) != null ? _regexResult$7$length : void 0,
    z: regexResult[8] || void 0,
    plusMinus: regexResult[9] || void 0,
    hourOffset: toNumber(regexResult[10]),
    minuteOffset: toNumber(regexResult[11])
  };
}
function toNumber(str, defaultValue = 0) {
  return Number(str) || defaultValue;
}
function create$6() {
  return new StringSchema();
}
function create$5() {
  return new NumberSchema();
}
function create$4() {
  return new DateSchema();
}
function sortFields(fields, excludedEdges = []) {
  let edges = [];
  let nodes = /* @__PURE__ */ new Set();
  let excludes = new Set(excludedEdges.map(([a, b]) => `${a}-${b}`));
  function addNode(depPath, key) {
    let node = (0, import_property_expr.split)(depPath)[0];
    nodes.add(node);
    if (!excludes.has(`${key}-${node}`)) edges.push([key, node]);
  }
  for (const key of Object.keys(fields)) {
    let value = fields[key];
    nodes.add(key);
    if (Reference.isRef(value) && value.isSibling) addNode(value.path, key);
    else if (isSchema(value) && "deps" in value) value.deps.forEach((path7) => addNode(path7, key));
  }
  return import_toposort.default.array(Array.from(nodes), edges).reverse();
}
function findIndex(arr, err) {
  let idx = Infinity;
  arr.some((key, ii) => {
    var _err$path;
    if ((_err$path = err.path) != null && _err$path.includes(key)) {
      idx = ii;
      return true;
    }
  });
  return idx;
}
function sortByKeyOrder(keys) {
  return (a, b) => {
    return findIndex(keys, a) - findIndex(keys, b);
  };
}
function deepPartial(schema) {
  if ("fields" in schema) {
    const partial = {};
    for (const [key, fieldSchema] of Object.entries(schema.fields)) {
      partial[key] = deepPartial(fieldSchema);
    }
    return schema.setFields(partial);
  }
  if (schema.type === "array") {
    const nextArray = schema.optional();
    if (nextArray.innerType) nextArray.innerType = deepPartial(nextArray.innerType);
    return nextArray;
  }
  if (schema.type === "tuple") {
    return schema.optional().clone({
      types: schema.spec.types.map(deepPartial)
    });
  }
  if ("optional" in schema) {
    return schema.optional();
  }
  return schema;
}
function unknown(ctx, value) {
  let known = Object.keys(ctx.fields);
  return Object.keys(value).filter((key) => known.indexOf(key) === -1);
}
function create$3(spec) {
  return new ObjectSchema(spec);
}
function create$2(type) {
  return new ArraySchema(type);
}
function create$1(schemas) {
  return new TupleSchema(schemas);
}
function create(builder) {
  return new Lazy(builder);
}
function catchValidationError(fn) {
  try {
    return fn();
  } catch (err) {
    if (ValidationError.isError(err)) return Promise.reject(err);
    throw err;
  }
}
function setLocale(custom) {
  Object.keys(custom).forEach((type) => {
    Object.keys(custom[type]).forEach((method) => {
      locale[type][method] = custom[type][method];
    });
  });
}
function addMethod(schemaType, name, fn) {
  if (!schemaType || !isSchema(schemaType.prototype)) throw new TypeError("You must provide a yup schema constructor function");
  if (typeof name !== "string") throw new TypeError("A Method name must be provided");
  if (typeof fn !== "function") throw new TypeError("Method function must be provided");
  schemaType.prototype[name] = fn;
}
var import_property_expr, import_tiny_case, import_toposort, toString, errorToString, regExpToString, symbolToString, SYMBOL_REGEXP, _Symbol$toStringTag, _Symbol$hasInstance, _Symbol$toStringTag2, strReg, ValidationErrorNoStack, ValidationError, mixed, string, number, date, boolean, object, array, tuple, locale, isSchema, Condition, prefixes, Reference, isAbsent, ReferenceSet, Schema, returnsTrue, MixedSchema, BooleanSchema, isoReg, rEmail, rUrl, rUUID, yearMonthDay, hourMinuteSecond, zOrOffset, rIsoDateTime, isTrimmed, objStringTag, StringSchema, isNaN$1, NumberSchema, invalidDate, isDate, DateSchema, parseJson2, deepHas, isObject, defaultSort, ObjectSchema, ArraySchema, TupleSchema, Lazy;
var init_index_esm = __esm({
  "../../node_modules/yup/index.esm.js"() {
    "use strict";
    import_property_expr = __toESM(require_property_expr());
    import_tiny_case = __toESM(require_tiny_case());
    import_toposort = __toESM(require_toposort());
    toString = Object.prototype.toString;
    errorToString = Error.prototype.toString;
    regExpToString = RegExp.prototype.toString;
    symbolToString = typeof Symbol !== "undefined" ? Symbol.prototype.toString : () => "";
    SYMBOL_REGEXP = /^Symbol\((.*)\)(.*)$/;
    strReg = /\$\{\s*(\w+)\s*\}/g;
    _Symbol$toStringTag = Symbol.toStringTag;
    ValidationErrorNoStack = class {
      constructor(errorOrErrors, value, field, type) {
        this.name = void 0;
        this.message = void 0;
        this.value = void 0;
        this.path = void 0;
        this.type = void 0;
        this.params = void 0;
        this.errors = void 0;
        this.inner = void 0;
        this[_Symbol$toStringTag] = "Error";
        this.name = "ValidationError";
        this.value = value;
        this.path = field;
        this.type = type;
        this.errors = [];
        this.inner = [];
        toArray(errorOrErrors).forEach((err) => {
          if (ValidationError.isError(err)) {
            this.errors.push(...err.errors);
            const innerErrors = err.inner.length ? err.inner : [err];
            this.inner.push(...innerErrors);
          } else {
            this.errors.push(err);
          }
        });
        this.message = this.errors.length > 1 ? `${this.errors.length} errors occurred` : this.errors[0];
      }
    };
    _Symbol$hasInstance = Symbol.hasInstance;
    _Symbol$toStringTag2 = Symbol.toStringTag;
    ValidationError = class _ValidationError extends Error {
      static formatError(message, params) {
        const path7 = params.label || params.path || "this";
        params = Object.assign({}, params, {
          path: path7,
          originalPath: params.path
        });
        if (typeof message === "string") return message.replace(strReg, (_, key) => printValue(params[key]));
        if (typeof message === "function") return message(params);
        return message;
      }
      static isError(err) {
        return err && err.name === "ValidationError";
      }
      constructor(errorOrErrors, value, field, type, disableStack) {
        const errorNoStack = new ValidationErrorNoStack(errorOrErrors, value, field, type);
        if (disableStack) {
          return errorNoStack;
        }
        super();
        this.value = void 0;
        this.path = void 0;
        this.type = void 0;
        this.params = void 0;
        this.errors = [];
        this.inner = [];
        this[_Symbol$toStringTag2] = "Error";
        this.name = errorNoStack.name;
        this.message = errorNoStack.message;
        this.type = errorNoStack.type;
        this.value = errorNoStack.value;
        this.path = errorNoStack.path;
        this.errors = errorNoStack.errors;
        this.inner = errorNoStack.inner;
        if (Error.captureStackTrace) {
          Error.captureStackTrace(this, _ValidationError);
        }
      }
      static [_Symbol$hasInstance](inst) {
        return ValidationErrorNoStack[Symbol.hasInstance](inst) || super[Symbol.hasInstance](inst);
      }
    };
    mixed = {
      default: "${path} is invalid",
      required: "${path} is a required field",
      defined: "${path} must be defined",
      notNull: "${path} cannot be null",
      oneOf: "${path} must be one of the following values: ${values}",
      notOneOf: "${path} must not be one of the following values: ${values}",
      notType: ({
        path: path7,
        type,
        value,
        originalValue
      }) => {
        const castMsg = originalValue != null && originalValue !== value ? ` (cast from the value \`${printValue(originalValue, true)}\`).` : ".";
        return type !== "mixed" ? `${path7} must be a \`${type}\` type, but the final value was: \`${printValue(value, true)}\`` + castMsg : `${path7} must match the configured type. The validated value was: \`${printValue(value, true)}\`` + castMsg;
      }
    };
    string = {
      length: "${path} must be exactly ${length} characters",
      min: "${path} must be at least ${min} characters",
      max: "${path} must be at most ${max} characters",
      matches: '${path} must match the following: "${regex}"',
      email: "${path} must be a valid email",
      url: "${path} must be a valid URL",
      uuid: "${path} must be a valid UUID",
      datetime: "${path} must be a valid ISO date-time",
      datetime_precision: "${path} must be a valid ISO date-time with a sub-second precision of exactly ${precision} digits",
      datetime_offset: '${path} must be a valid ISO date-time with UTC "Z" timezone',
      trim: "${path} must be a trimmed string",
      lowercase: "${path} must be a lowercase string",
      uppercase: "${path} must be a upper case string"
    };
    number = {
      min: "${path} must be greater than or equal to ${min}",
      max: "${path} must be less than or equal to ${max}",
      lessThan: "${path} must be less than ${less}",
      moreThan: "${path} must be greater than ${more}",
      positive: "${path} must be a positive number",
      negative: "${path} must be a negative number",
      integer: "${path} must be an integer"
    };
    date = {
      min: "${path} field must be later than ${min}",
      max: "${path} field must be at earlier than ${max}"
    };
    boolean = {
      isValue: "${path} field must be ${value}"
    };
    object = {
      noUnknown: "${path} field has unspecified keys: ${unknown}",
      exact: "${path} object contains unknown properties: ${properties}"
    };
    array = {
      min: "${path} field must have at least ${min} items",
      max: "${path} field must have less than or equal to ${max} items",
      length: "${path} must have ${length} items"
    };
    tuple = {
      notType: (params) => {
        const {
          path: path7,
          value,
          spec
        } = params;
        const typeLen = spec.types.length;
        if (Array.isArray(value)) {
          if (value.length < typeLen) return `${path7} tuple value has too few items, expected a length of ${typeLen} but got ${value.length} for value: \`${printValue(value, true)}\``;
          if (value.length > typeLen) return `${path7} tuple value has too many items, expected a length of ${typeLen} but got ${value.length} for value: \`${printValue(value, true)}\``;
        }
        return ValidationError.formatError(mixed.notType, params);
      }
    };
    locale = Object.assign(/* @__PURE__ */ Object.create(null), {
      mixed,
      string,
      number,
      date,
      object,
      array,
      boolean,
      tuple
    });
    isSchema = (obj) => obj && obj.__isYupSchema__;
    Condition = class _Condition {
      static fromOptions(refs, config) {
        if (!config.then && !config.otherwise) throw new TypeError("either `then:` or `otherwise:` is required for `when()` conditions");
        let {
          is,
          then,
          otherwise
        } = config;
        let check = typeof is === "function" ? is : (...values) => values.every((value) => value === is);
        return new _Condition(refs, (values, schema) => {
          var _branch;
          let branch = check(...values) ? then : otherwise;
          return (_branch = branch == null ? void 0 : branch(schema)) != null ? _branch : schema;
        });
      }
      constructor(refs, builder) {
        this.fn = void 0;
        this.refs = refs;
        this.refs = refs;
        this.fn = builder;
      }
      resolve(base, options) {
        let values = this.refs.map((ref) => (
          // TODO: ? operator here?
          ref.getValue(options == null ? void 0 : options.value, options == null ? void 0 : options.parent, options == null ? void 0 : options.context)
        ));
        let schema = this.fn(values, base, options);
        if (schema === void 0 || // @ts-ignore this can be base
        schema === base) {
          return base;
        }
        if (!isSchema(schema)) throw new TypeError("conditions must return a schema object");
        return schema.resolve(options);
      }
    };
    prefixes = {
      context: "$",
      value: "."
    };
    Reference = class {
      constructor(key, options = {}) {
        this.key = void 0;
        this.isContext = void 0;
        this.isValue = void 0;
        this.isSibling = void 0;
        this.path = void 0;
        this.getter = void 0;
        this.map = void 0;
        if (typeof key !== "string") throw new TypeError("ref must be a string, got: " + key);
        this.key = key.trim();
        if (key === "") throw new TypeError("ref must be a non-empty string");
        this.isContext = this.key[0] === prefixes.context;
        this.isValue = this.key[0] === prefixes.value;
        this.isSibling = !this.isContext && !this.isValue;
        let prefix = this.isContext ? prefixes.context : this.isValue ? prefixes.value : "";
        this.path = this.key.slice(prefix.length);
        this.getter = this.path && (0, import_property_expr.getter)(this.path, true);
        this.map = options.map;
      }
      getValue(value, parent, context) {
        let result = this.isContext ? context : this.isValue ? value : parent;
        if (this.getter) result = this.getter(result || {});
        if (this.map) result = this.map(result);
        return result;
      }
      /**
       *
       * @param {*} value
       * @param {Object} options
       * @param {Object=} options.context
       * @param {Object=} options.parent
       */
      cast(value, options) {
        return this.getValue(value, options == null ? void 0 : options.parent, options == null ? void 0 : options.context);
      }
      resolve() {
        return this;
      }
      describe() {
        return {
          type: "ref",
          key: this.key
        };
      }
      toString() {
        return `Ref(${this.key})`;
      }
      static isRef(value) {
        return value && value.__isYupRef;
      }
    };
    Reference.prototype.__isYupRef = true;
    isAbsent = (value) => value == null;
    ReferenceSet = class _ReferenceSet extends Set {
      describe() {
        const description = [];
        for (const item of this.values()) {
          description.push(Reference.isRef(item) ? item.describe() : item);
        }
        return description;
      }
      resolveAll(resolve5) {
        let result = [];
        for (const item of this.values()) {
          result.push(resolve5(item));
        }
        return result;
      }
      clone() {
        return new _ReferenceSet(this.values());
      }
      merge(newItems, removeItems) {
        const next = this.clone();
        newItems.forEach((value) => next.add(value));
        removeItems.forEach((value) => next.delete(value));
        return next;
      }
    };
    Schema = class {
      constructor(options) {
        this.type = void 0;
        this.deps = [];
        this.tests = void 0;
        this.transforms = void 0;
        this.conditions = [];
        this._mutate = void 0;
        this.internalTests = {};
        this._whitelist = new ReferenceSet();
        this._blacklist = new ReferenceSet();
        this.exclusiveTests = /* @__PURE__ */ Object.create(null);
        this._typeCheck = void 0;
        this.spec = void 0;
        this.tests = [];
        this.transforms = [];
        this.withMutation(() => {
          this.typeError(mixed.notType);
        });
        this.type = options.type;
        this._typeCheck = options.check;
        this.spec = Object.assign({
          strip: false,
          strict: false,
          abortEarly: true,
          recursive: true,
          disableStackTrace: false,
          nullable: false,
          optional: true,
          coerce: true
        }, options == null ? void 0 : options.spec);
        this.withMutation((s) => {
          s.nonNullable();
        });
      }
      // TODO: remove
      get _type() {
        return this.type;
      }
      clone(spec) {
        if (this._mutate) {
          if (spec) Object.assign(this.spec, spec);
          return this;
        }
        const next = Object.create(Object.getPrototypeOf(this));
        next.type = this.type;
        next._typeCheck = this._typeCheck;
        next._whitelist = this._whitelist.clone();
        next._blacklist = this._blacklist.clone();
        next.internalTests = Object.assign({}, this.internalTests);
        next.exclusiveTests = Object.assign({}, this.exclusiveTests);
        next.deps = [...this.deps];
        next.conditions = [...this.conditions];
        next.tests = [...this.tests];
        next.transforms = [...this.transforms];
        next.spec = clone(Object.assign({}, this.spec, spec));
        return next;
      }
      label(label) {
        let next = this.clone();
        next.spec.label = label;
        return next;
      }
      meta(...args) {
        if (args.length === 0) return this.spec.meta;
        let next = this.clone();
        next.spec.meta = Object.assign(next.spec.meta || {}, args[0]);
        return next;
      }
      withMutation(fn) {
        let before = this._mutate;
        this._mutate = true;
        let result = fn(this);
        this._mutate = before;
        return result;
      }
      concat(schema) {
        if (!schema || schema === this) return this;
        if (schema.type !== this.type && this.type !== "mixed") throw new TypeError(`You cannot \`concat()\` schema's of different types: ${this.type} and ${schema.type}`);
        let base = this;
        let combined = schema.clone();
        const mergedSpec = Object.assign({}, base.spec, combined.spec);
        combined.spec = mergedSpec;
        combined.internalTests = Object.assign({}, base.internalTests, combined.internalTests);
        combined._whitelist = base._whitelist.merge(schema._whitelist, schema._blacklist);
        combined._blacklist = base._blacklist.merge(schema._blacklist, schema._whitelist);
        combined.tests = base.tests;
        combined.exclusiveTests = base.exclusiveTests;
        combined.withMutation((next) => {
          schema.tests.forEach((fn) => {
            next.test(fn.OPTIONS);
          });
        });
        combined.transforms = [...base.transforms, ...combined.transforms];
        return combined;
      }
      isType(v) {
        if (v == null) {
          if (this.spec.nullable && v === null) return true;
          if (this.spec.optional && v === void 0) return true;
          return false;
        }
        return this._typeCheck(v);
      }
      resolve(options) {
        let schema = this;
        if (schema.conditions.length) {
          let conditions = schema.conditions;
          schema = schema.clone();
          schema.conditions = [];
          schema = conditions.reduce((prevSchema, condition) => condition.resolve(prevSchema, options), schema);
          schema = schema.resolve(options);
        }
        return schema;
      }
      resolveOptions(options) {
        var _options$strict, _options$abortEarly, _options$recursive, _options$disableStack;
        return Object.assign({}, options, {
          from: options.from || [],
          strict: (_options$strict = options.strict) != null ? _options$strict : this.spec.strict,
          abortEarly: (_options$abortEarly = options.abortEarly) != null ? _options$abortEarly : this.spec.abortEarly,
          recursive: (_options$recursive = options.recursive) != null ? _options$recursive : this.spec.recursive,
          disableStackTrace: (_options$disableStack = options.disableStackTrace) != null ? _options$disableStack : this.spec.disableStackTrace
        });
      }
      /**
       * Run the configured transform pipeline over an input value.
       */
      cast(value, options = {}) {
        let resolvedSchema = this.resolve(Object.assign({}, options, {
          value
          // parent: options.parent,
          // context: options.context,
        }));
        let allowOptionality = options.assert === "ignore-optionality";
        let result = resolvedSchema._cast(value, options);
        if (options.assert !== false && !resolvedSchema.isType(result)) {
          if (allowOptionality && isAbsent(result)) {
            return result;
          }
          let formattedValue = printValue(value);
          let formattedResult = printValue(result);
          throw new TypeError(`The value of ${options.path || "field"} could not be cast to a value that satisfies the schema type: "${resolvedSchema.type}". 

attempted value: ${formattedValue} 
` + (formattedResult !== formattedValue ? `result of cast: ${formattedResult}` : ""));
        }
        return result;
      }
      _cast(rawValue, options) {
        let value = rawValue === void 0 ? rawValue : this.transforms.reduce((prevValue, fn) => fn.call(this, prevValue, rawValue, this, options), rawValue);
        if (value === void 0) {
          value = this.getDefault(options);
        }
        return value;
      }
      _validate(_value, options = {}, panic, next) {
        let {
          path: path7,
          originalValue = _value,
          strict = this.spec.strict
        } = options;
        let value = _value;
        if (!strict) {
          value = this._cast(value, Object.assign({
            assert: false
          }, options));
        }
        let initialTests = [];
        for (let test of Object.values(this.internalTests)) {
          if (test) initialTests.push(test);
        }
        this.runTests({
          path: path7,
          value,
          originalValue,
          options,
          tests: initialTests
        }, panic, (initialErrors) => {
          if (initialErrors.length) {
            return next(initialErrors, value);
          }
          this.runTests({
            path: path7,
            value,
            originalValue,
            options,
            tests: this.tests
          }, panic, next);
        });
      }
      /**
       * Executes a set of validations, either schema, produced Tests or a nested
       * schema validate result.
       */
      runTests(runOptions, panic, next) {
        let fired = false;
        let {
          tests,
          value,
          originalValue,
          path: path7,
          options
        } = runOptions;
        let panicOnce = (arg) => {
          if (fired) return;
          fired = true;
          panic(arg, value);
        };
        let nextOnce = (arg) => {
          if (fired) return;
          fired = true;
          next(arg, value);
        };
        let count = tests.length;
        let nestedErrors = [];
        if (!count) return nextOnce([]);
        let args = {
          value,
          originalValue,
          path: path7,
          options,
          schema: this
        };
        for (let i = 0; i < tests.length; i++) {
          const test = tests[i];
          test(args, panicOnce, function finishTestRun(err) {
            if (err) {
              Array.isArray(err) ? nestedErrors.push(...err) : nestedErrors.push(err);
            }
            if (--count <= 0) {
              nextOnce(nestedErrors);
            }
          });
        }
      }
      asNestedTest({
        key,
        index,
        parent,
        parentPath,
        originalParent,
        options
      }) {
        const k = key != null ? key : index;
        if (k == null) {
          throw TypeError("Must include `key` or `index` for nested validations");
        }
        const isIndex = typeof k === "number";
        let value = parent[k];
        const testOptions = Object.assign({}, options, {
          // Nested validations fields are always strict:
          //    1. parent isn't strict so the casting will also have cast inner values
          //    2. parent is strict in which case the nested values weren't cast either
          strict: true,
          parent,
          value,
          originalValue: originalParent[k],
          // FIXME: tests depend on `index` being passed around deeply,
          //   we should not let the options.key/index bleed through
          key: void 0,
          // index: undefined,
          [isIndex ? "index" : "key"]: k,
          path: isIndex || k.includes(".") ? `${parentPath || ""}[${isIndex ? k : `"${k}"`}]` : (parentPath ? `${parentPath}.` : "") + key
        });
        return (_, panic, next) => this.resolve(testOptions)._validate(value, testOptions, panic, next);
      }
      validate(value, options) {
        var _options$disableStack2;
        let schema = this.resolve(Object.assign({}, options, {
          value
        }));
        let disableStackTrace = (_options$disableStack2 = options == null ? void 0 : options.disableStackTrace) != null ? _options$disableStack2 : schema.spec.disableStackTrace;
        return new Promise((resolve5, reject) => schema._validate(value, options, (error2, parsed) => {
          if (ValidationError.isError(error2)) error2.value = parsed;
          reject(error2);
        }, (errors, validated) => {
          if (errors.length) reject(new ValidationError(errors, validated, void 0, void 0, disableStackTrace));
          else resolve5(validated);
        }));
      }
      validateSync(value, options) {
        var _options$disableStack3;
        let schema = this.resolve(Object.assign({}, options, {
          value
        }));
        let result;
        let disableStackTrace = (_options$disableStack3 = options == null ? void 0 : options.disableStackTrace) != null ? _options$disableStack3 : schema.spec.disableStackTrace;
        schema._validate(value, Object.assign({}, options, {
          sync: true
        }), (error2, parsed) => {
          if (ValidationError.isError(error2)) error2.value = parsed;
          throw error2;
        }, (errors, validated) => {
          if (errors.length) throw new ValidationError(errors, value, void 0, void 0, disableStackTrace);
          result = validated;
        });
        return result;
      }
      isValid(value, options) {
        return this.validate(value, options).then(() => true, (err) => {
          if (ValidationError.isError(err)) return false;
          throw err;
        });
      }
      isValidSync(value, options) {
        try {
          this.validateSync(value, options);
          return true;
        } catch (err) {
          if (ValidationError.isError(err)) return false;
          throw err;
        }
      }
      _getDefault(options) {
        let defaultValue = this.spec.default;
        if (defaultValue == null) {
          return defaultValue;
        }
        return typeof defaultValue === "function" ? defaultValue.call(this, options) : clone(defaultValue);
      }
      getDefault(options) {
        let schema = this.resolve(options || {});
        return schema._getDefault(options);
      }
      default(def) {
        if (arguments.length === 0) {
          return this._getDefault();
        }
        let next = this.clone({
          default: def
        });
        return next;
      }
      strict(isStrict = true) {
        return this.clone({
          strict: isStrict
        });
      }
      nullability(nullable, message) {
        const next = this.clone({
          nullable
        });
        next.internalTests.nullable = createValidation({
          message,
          name: "nullable",
          test(value) {
            return value === null ? this.schema.spec.nullable : true;
          }
        });
        return next;
      }
      optionality(optional, message) {
        const next = this.clone({
          optional
        });
        next.internalTests.optionality = createValidation({
          message,
          name: "optionality",
          test(value) {
            return value === void 0 ? this.schema.spec.optional : true;
          }
        });
        return next;
      }
      optional() {
        return this.optionality(true);
      }
      defined(message = mixed.defined) {
        return this.optionality(false, message);
      }
      nullable() {
        return this.nullability(true);
      }
      nonNullable(message = mixed.notNull) {
        return this.nullability(false, message);
      }
      required(message = mixed.required) {
        return this.clone().withMutation((next) => next.nonNullable(message).defined(message));
      }
      notRequired() {
        return this.clone().withMutation((next) => next.nullable().optional());
      }
      transform(fn) {
        let next = this.clone();
        next.transforms.push(fn);
        return next;
      }
      /**
       * Adds a test function to the schema's queue of tests.
       * tests can be exclusive or non-exclusive.
       *
       * - exclusive tests, will replace any existing tests of the same name.
       * - non-exclusive: can be stacked
       *
       * If a non-exclusive test is added to a schema with an exclusive test of the same name
       * the exclusive test is removed and further tests of the same name will be stacked.
       *
       * If an exclusive test is added to a schema with non-exclusive tests of the same name
       * the previous tests are removed and further tests of the same name will replace each other.
       */
      test(...args) {
        let opts;
        if (args.length === 1) {
          if (typeof args[0] === "function") {
            opts = {
              test: args[0]
            };
          } else {
            opts = args[0];
          }
        } else if (args.length === 2) {
          opts = {
            name: args[0],
            test: args[1]
          };
        } else {
          opts = {
            name: args[0],
            message: args[1],
            test: args[2]
          };
        }
        if (opts.message === void 0) opts.message = mixed.default;
        if (typeof opts.test !== "function") throw new TypeError("`test` is a required parameters");
        let next = this.clone();
        let validate = createValidation(opts);
        let isExclusive = opts.exclusive || opts.name && next.exclusiveTests[opts.name] === true;
        if (opts.exclusive) {
          if (!opts.name) throw new TypeError("Exclusive tests must provide a unique `name` identifying the test");
        }
        if (opts.name) next.exclusiveTests[opts.name] = !!opts.exclusive;
        next.tests = next.tests.filter((fn) => {
          if (fn.OPTIONS.name === opts.name) {
            if (isExclusive) return false;
            if (fn.OPTIONS.test === validate.OPTIONS.test) return false;
          }
          return true;
        });
        next.tests.push(validate);
        return next;
      }
      when(keys, options) {
        if (!Array.isArray(keys) && typeof keys !== "string") {
          options = keys;
          keys = ".";
        }
        let next = this.clone();
        let deps = toArray(keys).map((key) => new Reference(key));
        deps.forEach((dep) => {
          if (dep.isSibling) next.deps.push(dep.key);
        });
        next.conditions.push(typeof options === "function" ? new Condition(deps, options) : Condition.fromOptions(deps, options));
        return next;
      }
      typeError(message) {
        let next = this.clone();
        next.internalTests.typeError = createValidation({
          message,
          name: "typeError",
          skipAbsent: true,
          test(value) {
            if (!this.schema._typeCheck(value)) return this.createError({
              params: {
                type: this.schema.type
              }
            });
            return true;
          }
        });
        return next;
      }
      oneOf(enums, message = mixed.oneOf) {
        let next = this.clone();
        enums.forEach((val) => {
          next._whitelist.add(val);
          next._blacklist.delete(val);
        });
        next.internalTests.whiteList = createValidation({
          message,
          name: "oneOf",
          skipAbsent: true,
          test(value) {
            let valids = this.schema._whitelist;
            let resolved = valids.resolveAll(this.resolve);
            return resolved.includes(value) ? true : this.createError({
              params: {
                values: Array.from(valids).join(", "),
                resolved
              }
            });
          }
        });
        return next;
      }
      notOneOf(enums, message = mixed.notOneOf) {
        let next = this.clone();
        enums.forEach((val) => {
          next._blacklist.add(val);
          next._whitelist.delete(val);
        });
        next.internalTests.blacklist = createValidation({
          message,
          name: "notOneOf",
          test(value) {
            let invalids = this.schema._blacklist;
            let resolved = invalids.resolveAll(this.resolve);
            if (resolved.includes(value)) return this.createError({
              params: {
                values: Array.from(invalids).join(", "),
                resolved
              }
            });
            return true;
          }
        });
        return next;
      }
      strip(strip = true) {
        let next = this.clone();
        next.spec.strip = strip;
        return next;
      }
      /**
       * Return a serialized description of the schema including validations, flags, types etc.
       *
       * @param options Provide any needed context for resolving runtime schema alterations (lazy, when conditions, etc).
       */
      describe(options) {
        const next = (options ? this.resolve(options) : this).clone();
        const {
          label,
          meta,
          optional,
          nullable
        } = next.spec;
        const description = {
          meta,
          label,
          optional,
          nullable,
          default: next.getDefault(options),
          type: next.type,
          oneOf: next._whitelist.describe(),
          notOneOf: next._blacklist.describe(),
          tests: next.tests.filter((n, idx, list) => list.findIndex((c3) => c3.OPTIONS.name === n.OPTIONS.name) === idx).map((fn) => {
            const params = fn.OPTIONS.params && options ? resolveParams(Object.assign({}, fn.OPTIONS.params), options) : fn.OPTIONS.params;
            return {
              name: fn.OPTIONS.name,
              params
            };
          })
        };
        return description;
      }
      get ["~standard"]() {
        const schema = this;
        const standard = {
          version: 1,
          vendor: "yup",
          async validate(value) {
            try {
              const result = await schema.validate(value, {
                abortEarly: false
              });
              return {
                value: result
              };
            } catch (err) {
              if (err instanceof ValidationError) {
                return {
                  issues: issuesFromValidationError(err)
                };
              }
              throw err;
            }
          }
        };
        return standard;
      }
    };
    Schema.prototype.__isYupSchema__ = true;
    for (const method of ["validate", "validateSync"]) Schema.prototype[`${method}At`] = function(path7, value, options = {}) {
      const {
        parent,
        parentPath,
        schema
      } = getIn(this, path7, value, options.context);
      return schema[method](parent && parent[parentPath], Object.assign({}, options, {
        parent,
        path: path7
      }));
    };
    for (const alias of ["equals", "is"]) Schema.prototype[alias] = Schema.prototype.oneOf;
    for (const alias of ["not", "nope"]) Schema.prototype[alias] = Schema.prototype.notOneOf;
    returnsTrue = () => true;
    MixedSchema = class extends Schema {
      constructor(spec) {
        super(typeof spec === "function" ? {
          type: "mixed",
          check: spec
        } : Object.assign({
          type: "mixed",
          check: returnsTrue
        }, spec));
      }
    };
    create$8.prototype = MixedSchema.prototype;
    BooleanSchema = class extends Schema {
      constructor() {
        super({
          type: "boolean",
          check(v) {
            if (v instanceof Boolean) v = v.valueOf();
            return typeof v === "boolean";
          }
        });
        this.withMutation(() => {
          this.transform((value, _raw) => {
            if (this.spec.coerce && !this.isType(value)) {
              if (/^(true|1)$/i.test(String(value))) return true;
              if (/^(false|0)$/i.test(String(value))) return false;
            }
            return value;
          });
        });
      }
      isTrue(message = boolean.isValue) {
        return this.test({
          message,
          name: "is-value",
          exclusive: true,
          params: {
            value: "true"
          },
          test(value) {
            return isAbsent(value) || value === true;
          }
        });
      }
      isFalse(message = boolean.isValue) {
        return this.test({
          message,
          name: "is-value",
          exclusive: true,
          params: {
            value: "false"
          },
          test(value) {
            return isAbsent(value) || value === false;
          }
        });
      }
      default(def) {
        return super.default(def);
      }
      defined(msg) {
        return super.defined(msg);
      }
      optional() {
        return super.optional();
      }
      required(msg) {
        return super.required(msg);
      }
      notRequired() {
        return super.notRequired();
      }
      nullable() {
        return super.nullable();
      }
      nonNullable(msg) {
        return super.nonNullable(msg);
      }
      strip(v) {
        return super.strip(v);
      }
    };
    create$7.prototype = BooleanSchema.prototype;
    isoReg = /^(\d{4}|[+-]\d{6})(?:-?(\d{2})(?:-?(\d{2}))?)?(?:[ T]?(\d{2}):?(\d{2})(?::?(\d{2})(?:[,.](\d{1,}))?)?(?:(Z)|([+-])(\d{2})(?::?(\d{2}))?)?)?$/;
    rEmail = // eslint-disable-next-line
    /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
    rUrl = // eslint-disable-next-line
    /^((https?|ftp):)?\/\/(((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:)*@)?(((\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5]))|((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?)(:\d*)?)(\/((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)+(\/(([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)*)*)?)?(\?((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|[\uE000-\uF8FF]|\/|\?)*)?(\#((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|\/|\?)*)?$/i;
    rUUID = /^(?:[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}|00000000-0000-0000-0000-000000000000)$/i;
    yearMonthDay = "^\\d{4}-\\d{2}-\\d{2}";
    hourMinuteSecond = "\\d{2}:\\d{2}:\\d{2}";
    zOrOffset = "(([+-]\\d{2}(:?\\d{2})?)|Z)";
    rIsoDateTime = new RegExp(`${yearMonthDay}T${hourMinuteSecond}(\\.\\d+)?${zOrOffset}$`);
    isTrimmed = (value) => isAbsent(value) || value === value.trim();
    objStringTag = {}.toString();
    StringSchema = class extends Schema {
      constructor() {
        super({
          type: "string",
          check(value) {
            if (value instanceof String) value = value.valueOf();
            return typeof value === "string";
          }
        });
        this.withMutation(() => {
          this.transform((value, _raw) => {
            if (!this.spec.coerce || this.isType(value)) return value;
            if (Array.isArray(value)) return value;
            const strValue = value != null && value.toString ? value.toString() : value;
            if (strValue === objStringTag) return value;
            return strValue;
          });
        });
      }
      required(message) {
        return super.required(message).withMutation((schema) => schema.test({
          message: message || mixed.required,
          name: "required",
          skipAbsent: true,
          test: (value) => !!value.length
        }));
      }
      notRequired() {
        return super.notRequired().withMutation((schema) => {
          schema.tests = schema.tests.filter((t) => t.OPTIONS.name !== "required");
          return schema;
        });
      }
      length(length, message = string.length) {
        return this.test({
          message,
          name: "length",
          exclusive: true,
          params: {
            length
          },
          skipAbsent: true,
          test(value) {
            return value.length === this.resolve(length);
          }
        });
      }
      min(min, message = string.min) {
        return this.test({
          message,
          name: "min",
          exclusive: true,
          params: {
            min
          },
          skipAbsent: true,
          test(value) {
            return value.length >= this.resolve(min);
          }
        });
      }
      max(max, message = string.max) {
        return this.test({
          name: "max",
          exclusive: true,
          message,
          params: {
            max
          },
          skipAbsent: true,
          test(value) {
            return value.length <= this.resolve(max);
          }
        });
      }
      matches(regex, options) {
        let excludeEmptyString = false;
        let message;
        let name;
        if (options) {
          if (typeof options === "object") {
            ({
              excludeEmptyString = false,
              message,
              name
            } = options);
          } else {
            message = options;
          }
        }
        return this.test({
          name: name || "matches",
          message: message || string.matches,
          params: {
            regex
          },
          skipAbsent: true,
          test: (value) => value === "" && excludeEmptyString || value.search(regex) !== -1
        });
      }
      email(message = string.email) {
        return this.matches(rEmail, {
          name: "email",
          message,
          excludeEmptyString: true
        });
      }
      url(message = string.url) {
        return this.matches(rUrl, {
          name: "url",
          message,
          excludeEmptyString: true
        });
      }
      uuid(message = string.uuid) {
        return this.matches(rUUID, {
          name: "uuid",
          message,
          excludeEmptyString: false
        });
      }
      datetime(options) {
        let message = "";
        let allowOffset;
        let precision;
        if (options) {
          if (typeof options === "object") {
            ({
              message = "",
              allowOffset = false,
              precision = void 0
            } = options);
          } else {
            message = options;
          }
        }
        return this.matches(rIsoDateTime, {
          name: "datetime",
          message: message || string.datetime,
          excludeEmptyString: true
        }).test({
          name: "datetime_offset",
          message: message || string.datetime_offset,
          params: {
            allowOffset
          },
          skipAbsent: true,
          test: (value) => {
            if (!value || allowOffset) return true;
            const struct = parseDateStruct(value);
            if (!struct) return false;
            return !!struct.z;
          }
        }).test({
          name: "datetime_precision",
          message: message || string.datetime_precision,
          params: {
            precision
          },
          skipAbsent: true,
          test: (value) => {
            if (!value || precision == void 0) return true;
            const struct = parseDateStruct(value);
            if (!struct) return false;
            return struct.precision === precision;
          }
        });
      }
      //-- transforms --
      ensure() {
        return this.default("").transform((val) => val === null ? "" : val);
      }
      trim(message = string.trim) {
        return this.transform((val) => val != null ? val.trim() : val).test({
          message,
          name: "trim",
          test: isTrimmed
        });
      }
      lowercase(message = string.lowercase) {
        return this.transform((value) => !isAbsent(value) ? value.toLowerCase() : value).test({
          message,
          name: "string_case",
          exclusive: true,
          skipAbsent: true,
          test: (value) => isAbsent(value) || value === value.toLowerCase()
        });
      }
      uppercase(message = string.uppercase) {
        return this.transform((value) => !isAbsent(value) ? value.toUpperCase() : value).test({
          message,
          name: "string_case",
          exclusive: true,
          skipAbsent: true,
          test: (value) => isAbsent(value) || value === value.toUpperCase()
        });
      }
    };
    create$6.prototype = StringSchema.prototype;
    isNaN$1 = (value) => value != +value;
    NumberSchema = class extends Schema {
      constructor() {
        super({
          type: "number",
          check(value) {
            if (value instanceof Number) value = value.valueOf();
            return typeof value === "number" && !isNaN$1(value);
          }
        });
        this.withMutation(() => {
          this.transform((value, _raw) => {
            if (!this.spec.coerce) return value;
            let parsed = value;
            if (typeof parsed === "string") {
              parsed = parsed.replace(/\s/g, "");
              if (parsed === "") return NaN;
              parsed = +parsed;
            }
            if (this.isType(parsed) || parsed === null) return parsed;
            return parseFloat(parsed);
          });
        });
      }
      min(min, message = number.min) {
        return this.test({
          message,
          name: "min",
          exclusive: true,
          params: {
            min
          },
          skipAbsent: true,
          test(value) {
            return value >= this.resolve(min);
          }
        });
      }
      max(max, message = number.max) {
        return this.test({
          message,
          name: "max",
          exclusive: true,
          params: {
            max
          },
          skipAbsent: true,
          test(value) {
            return value <= this.resolve(max);
          }
        });
      }
      lessThan(less, message = number.lessThan) {
        return this.test({
          message,
          name: "max",
          exclusive: true,
          params: {
            less
          },
          skipAbsent: true,
          test(value) {
            return value < this.resolve(less);
          }
        });
      }
      moreThan(more, message = number.moreThan) {
        return this.test({
          message,
          name: "min",
          exclusive: true,
          params: {
            more
          },
          skipAbsent: true,
          test(value) {
            return value > this.resolve(more);
          }
        });
      }
      positive(msg = number.positive) {
        return this.moreThan(0, msg);
      }
      negative(msg = number.negative) {
        return this.lessThan(0, msg);
      }
      integer(message = number.integer) {
        return this.test({
          name: "integer",
          message,
          skipAbsent: true,
          test: (val) => Number.isInteger(val)
        });
      }
      truncate() {
        return this.transform((value) => !isAbsent(value) ? value | 0 : value);
      }
      round(method) {
        var _method;
        let avail = ["ceil", "floor", "round", "trunc"];
        method = ((_method = method) == null ? void 0 : _method.toLowerCase()) || "round";
        if (method === "trunc") return this.truncate();
        if (avail.indexOf(method.toLowerCase()) === -1) throw new TypeError("Only valid options for round() are: " + avail.join(", "));
        return this.transform((value) => !isAbsent(value) ? Math[method](value) : value);
      }
    };
    create$5.prototype = NumberSchema.prototype;
    invalidDate = /* @__PURE__ */ new Date("");
    isDate = (obj) => Object.prototype.toString.call(obj) === "[object Date]";
    DateSchema = class _DateSchema extends Schema {
      constructor() {
        super({
          type: "date",
          check(v) {
            return isDate(v) && !isNaN(v.getTime());
          }
        });
        this.withMutation(() => {
          this.transform((value, _raw) => {
            if (!this.spec.coerce || this.isType(value) || value === null) return value;
            value = parseIsoDate(value);
            return !isNaN(value) ? new Date(value) : _DateSchema.INVALID_DATE;
          });
        });
      }
      prepareParam(ref, name) {
        let param;
        if (!Reference.isRef(ref)) {
          let cast = this.cast(ref);
          if (!this._typeCheck(cast)) throw new TypeError(`\`${name}\` must be a Date or a value that can be \`cast()\` to a Date`);
          param = cast;
        } else {
          param = ref;
        }
        return param;
      }
      min(min, message = date.min) {
        let limit = this.prepareParam(min, "min");
        return this.test({
          message,
          name: "min",
          exclusive: true,
          params: {
            min
          },
          skipAbsent: true,
          test(value) {
            return value >= this.resolve(limit);
          }
        });
      }
      max(max, message = date.max) {
        let limit = this.prepareParam(max, "max");
        return this.test({
          message,
          name: "max",
          exclusive: true,
          params: {
            max
          },
          skipAbsent: true,
          test(value) {
            return value <= this.resolve(limit);
          }
        });
      }
    };
    DateSchema.INVALID_DATE = invalidDate;
    create$4.prototype = DateSchema.prototype;
    create$4.INVALID_DATE = invalidDate;
    parseJson2 = (value, _, schema) => {
      if (typeof value !== "string") {
        return value;
      }
      let parsed = value;
      try {
        parsed = JSON.parse(value);
      } catch (err) {
      }
      return schema.isType(parsed) ? parsed : value;
    };
    deepHas = (obj, p) => {
      const path7 = [...(0, import_property_expr.normalizePath)(p)];
      if (path7.length === 1) return path7[0] in obj;
      let last = path7.pop();
      let parent = (0, import_property_expr.getter)((0, import_property_expr.join)(path7), true)(obj);
      return !!(parent && last in parent);
    };
    isObject = (obj) => Object.prototype.toString.call(obj) === "[object Object]";
    defaultSort = sortByKeyOrder([]);
    ObjectSchema = class extends Schema {
      constructor(spec) {
        super({
          type: "object",
          check(value) {
            return isObject(value) || typeof value === "function";
          }
        });
        this.fields = /* @__PURE__ */ Object.create(null);
        this._sortErrors = defaultSort;
        this._nodes = [];
        this._excludedEdges = [];
        this.withMutation(() => {
          if (spec) {
            this.shape(spec);
          }
        });
      }
      _cast(_value, options = {}) {
        var _options$stripUnknown;
        let value = super._cast(_value, options);
        if (value === void 0) return this.getDefault(options);
        if (!this._typeCheck(value)) return value;
        let fields = this.fields;
        let strip = (_options$stripUnknown = options.stripUnknown) != null ? _options$stripUnknown : this.spec.noUnknown;
        let props = [].concat(this._nodes, Object.keys(value).filter((v) => !this._nodes.includes(v)));
        let intermediateValue = {};
        let innerOptions = Object.assign({}, options, {
          parent: intermediateValue,
          __validating: options.__validating || false
        });
        let isChanged = false;
        for (const prop of props) {
          let field = fields[prop];
          let exists = prop in value;
          let inputValue = value[prop];
          if (field) {
            let fieldValue;
            innerOptions.path = (options.path ? `${options.path}.` : "") + prop;
            field = field.resolve({
              value: inputValue,
              context: options.context,
              parent: intermediateValue
            });
            let fieldSpec = field instanceof Schema ? field.spec : void 0;
            let strict = fieldSpec == null ? void 0 : fieldSpec.strict;
            if (fieldSpec != null && fieldSpec.strip) {
              isChanged = isChanged || prop in value;
              continue;
            }
            fieldValue = !options.__validating || !strict ? field.cast(inputValue, innerOptions) : inputValue;
            if (fieldValue !== void 0) {
              intermediateValue[prop] = fieldValue;
            }
          } else if (exists && !strip) {
            intermediateValue[prop] = inputValue;
          }
          if (exists !== prop in intermediateValue || intermediateValue[prop] !== inputValue) {
            isChanged = true;
          }
        }
        return isChanged ? intermediateValue : value;
      }
      _validate(_value, options = {}, panic, next) {
        let {
          from = [],
          originalValue = _value,
          recursive = this.spec.recursive
        } = options;
        options.from = [{
          schema: this,
          value: originalValue
        }, ...from];
        options.__validating = true;
        options.originalValue = originalValue;
        super._validate(_value, options, panic, (objectErrors, value) => {
          if (!recursive || !isObject(value)) {
            next(objectErrors, value);
            return;
          }
          originalValue = originalValue || value;
          let tests = [];
          for (let key of this._nodes) {
            let field = this.fields[key];
            if (!field || Reference.isRef(field)) {
              continue;
            }
            tests.push(field.asNestedTest({
              options,
              key,
              parent: value,
              parentPath: options.path,
              originalParent: originalValue
            }));
          }
          this.runTests({
            tests,
            value,
            originalValue,
            options
          }, panic, (fieldErrors) => {
            next(fieldErrors.sort(this._sortErrors).concat(objectErrors), value);
          });
        });
      }
      clone(spec) {
        const next = super.clone(spec);
        next.fields = Object.assign({}, this.fields);
        next._nodes = this._nodes;
        next._excludedEdges = this._excludedEdges;
        next._sortErrors = this._sortErrors;
        return next;
      }
      concat(schema) {
        let next = super.concat(schema);
        let nextFields = next.fields;
        for (let [field, schemaOrRef] of Object.entries(this.fields)) {
          const target = nextFields[field];
          nextFields[field] = target === void 0 ? schemaOrRef : target;
        }
        return next.withMutation((s) => (
          // XXX: excludes here is wrong
          s.setFields(nextFields, [...this._excludedEdges, ...schema._excludedEdges])
        ));
      }
      _getDefault(options) {
        if ("default" in this.spec) {
          return super._getDefault(options);
        }
        if (!this._nodes.length) {
          return void 0;
        }
        let dft = {};
        this._nodes.forEach((key) => {
          var _innerOptions;
          const field = this.fields[key];
          let innerOptions = options;
          if ((_innerOptions = innerOptions) != null && _innerOptions.value) {
            innerOptions = Object.assign({}, innerOptions, {
              parent: innerOptions.value,
              value: innerOptions.value[key]
            });
          }
          dft[key] = field && "getDefault" in field ? field.getDefault(innerOptions) : void 0;
        });
        return dft;
      }
      setFields(shape, excludedEdges) {
        let next = this.clone();
        next.fields = shape;
        next._nodes = sortFields(shape, excludedEdges);
        next._sortErrors = sortByKeyOrder(Object.keys(shape));
        if (excludedEdges) next._excludedEdges = excludedEdges;
        return next;
      }
      shape(additions, excludes = []) {
        return this.clone().withMutation((next) => {
          let edges = next._excludedEdges;
          if (excludes.length) {
            if (!Array.isArray(excludes[0])) excludes = [excludes];
            edges = [...next._excludedEdges, ...excludes];
          }
          return next.setFields(Object.assign(next.fields, additions), edges);
        });
      }
      partial() {
        const partial = {};
        for (const [key, schema] of Object.entries(this.fields)) {
          partial[key] = "optional" in schema && schema.optional instanceof Function ? schema.optional() : schema;
        }
        return this.setFields(partial);
      }
      deepPartial() {
        const next = deepPartial(this);
        return next;
      }
      pick(keys) {
        const picked = {};
        for (const key of keys) {
          if (this.fields[key]) picked[key] = this.fields[key];
        }
        return this.setFields(picked, this._excludedEdges.filter(([a, b]) => keys.includes(a) && keys.includes(b)));
      }
      omit(keys) {
        const remaining = [];
        for (const key of Object.keys(this.fields)) {
          if (keys.includes(key)) continue;
          remaining.push(key);
        }
        return this.pick(remaining);
      }
      from(from, to, alias) {
        let fromGetter = (0, import_property_expr.getter)(from, true);
        return this.transform((obj) => {
          if (!obj) return obj;
          let newObj = obj;
          if (deepHas(obj, from)) {
            newObj = Object.assign({}, obj);
            if (!alias) delete newObj[from];
            newObj[to] = fromGetter(obj);
          }
          return newObj;
        });
      }
      /** Parse an input JSON string to an object */
      json() {
        return this.transform(parseJson2);
      }
      /**
       * Similar to `noUnknown` but only validates that an object is the right shape without stripping the unknown keys
       */
      exact(message) {
        return this.test({
          name: "exact",
          exclusive: true,
          message: message || object.exact,
          test(value) {
            if (value == null) return true;
            const unknownKeys = unknown(this.schema, value);
            return unknownKeys.length === 0 || this.createError({
              params: {
                properties: unknownKeys.join(", ")
              }
            });
          }
        });
      }
      stripUnknown() {
        return this.clone({
          noUnknown: true
        });
      }
      noUnknown(noAllow = true, message = object.noUnknown) {
        if (typeof noAllow !== "boolean") {
          message = noAllow;
          noAllow = true;
        }
        let next = this.test({
          name: "noUnknown",
          exclusive: true,
          message,
          test(value) {
            if (value == null) return true;
            const unknownKeys = unknown(this.schema, value);
            return !noAllow || unknownKeys.length === 0 || this.createError({
              params: {
                unknown: unknownKeys.join(", ")
              }
            });
          }
        });
        next.spec.noUnknown = noAllow;
        return next;
      }
      unknown(allow = true, message = object.noUnknown) {
        return this.noUnknown(!allow, message);
      }
      transformKeys(fn) {
        return this.transform((obj) => {
          if (!obj) return obj;
          const result = {};
          for (const key of Object.keys(obj)) result[fn(key)] = obj[key];
          return result;
        });
      }
      camelCase() {
        return this.transformKeys(import_tiny_case.camelCase);
      }
      snakeCase() {
        return this.transformKeys(import_tiny_case.snakeCase);
      }
      constantCase() {
        return this.transformKeys((key) => (0, import_tiny_case.snakeCase)(key).toUpperCase());
      }
      describe(options) {
        const next = (options ? this.resolve(options) : this).clone();
        const base = super.describe(options);
        base.fields = {};
        for (const [key, value] of Object.entries(next.fields)) {
          var _innerOptions2;
          let innerOptions = options;
          if ((_innerOptions2 = innerOptions) != null && _innerOptions2.value) {
            innerOptions = Object.assign({}, innerOptions, {
              parent: innerOptions.value,
              value: innerOptions.value[key]
            });
          }
          base.fields[key] = value.describe(innerOptions);
        }
        return base;
      }
    };
    create$3.prototype = ObjectSchema.prototype;
    ArraySchema = class extends Schema {
      constructor(type) {
        super({
          type: "array",
          spec: {
            types: type
          },
          check(v) {
            return Array.isArray(v);
          }
        });
        this.innerType = void 0;
        this.innerType = type;
      }
      _cast(_value, _opts) {
        const value = super._cast(_value, _opts);
        if (!this._typeCheck(value) || !this.innerType) {
          return value;
        }
        let isChanged = false;
        const castArray = value.map((v, idx) => {
          const castElement = this.innerType.cast(v, Object.assign({}, _opts, {
            path: `${_opts.path || ""}[${idx}]`,
            parent: value,
            originalValue: v,
            value: v,
            index: idx
          }));
          if (castElement !== v) {
            isChanged = true;
          }
          return castElement;
        });
        return isChanged ? castArray : value;
      }
      _validate(_value, options = {}, panic, next) {
        var _options$recursive;
        let innerType = this.innerType;
        let recursive = (_options$recursive = options.recursive) != null ? _options$recursive : this.spec.recursive;
        options.originalValue != null ? options.originalValue : _value;
        super._validate(_value, options, panic, (arrayErrors, value) => {
          var _options$originalValu2;
          if (!recursive || !innerType || !this._typeCheck(value)) {
            next(arrayErrors, value);
            return;
          }
          let tests = new Array(value.length);
          for (let index = 0; index < value.length; index++) {
            var _options$originalValu;
            tests[index] = innerType.asNestedTest({
              options,
              index,
              parent: value,
              parentPath: options.path,
              originalParent: (_options$originalValu = options.originalValue) != null ? _options$originalValu : _value
            });
          }
          this.runTests({
            value,
            tests,
            originalValue: (_options$originalValu2 = options.originalValue) != null ? _options$originalValu2 : _value,
            options
          }, panic, (innerTypeErrors) => next(innerTypeErrors.concat(arrayErrors), value));
        });
      }
      clone(spec) {
        const next = super.clone(spec);
        next.innerType = this.innerType;
        return next;
      }
      /** Parse an input JSON string to an object */
      json() {
        return this.transform(parseJson2);
      }
      concat(schema) {
        let next = super.concat(schema);
        next.innerType = this.innerType;
        if (schema.innerType)
          next.innerType = next.innerType ? (
            // @ts-expect-error Lazy doesn't have concat and will break
            next.innerType.concat(schema.innerType)
          ) : schema.innerType;
        return next;
      }
      of(schema) {
        let next = this.clone();
        if (!isSchema(schema)) throw new TypeError("`array.of()` sub-schema must be a valid yup schema not: " + printValue(schema));
        next.innerType = schema;
        next.spec = Object.assign({}, next.spec, {
          types: schema
        });
        return next;
      }
      length(length, message = array.length) {
        return this.test({
          message,
          name: "length",
          exclusive: true,
          params: {
            length
          },
          skipAbsent: true,
          test(value) {
            return value.length === this.resolve(length);
          }
        });
      }
      min(min, message) {
        message = message || array.min;
        return this.test({
          message,
          name: "min",
          exclusive: true,
          params: {
            min
          },
          skipAbsent: true,
          // FIXME(ts): Array<typeof T>
          test(value) {
            return value.length >= this.resolve(min);
          }
        });
      }
      max(max, message) {
        message = message || array.max;
        return this.test({
          message,
          name: "max",
          exclusive: true,
          params: {
            max
          },
          skipAbsent: true,
          test(value) {
            return value.length <= this.resolve(max);
          }
        });
      }
      ensure() {
        return this.default(() => []).transform((val, original) => {
          if (this._typeCheck(val)) return val;
          return original == null ? [] : [].concat(original);
        });
      }
      compact(rejector) {
        let reject = !rejector ? (v) => !!v : (v, i, a) => !rejector(v, i, a);
        return this.transform((values) => values != null ? values.filter(reject) : values);
      }
      describe(options) {
        const next = (options ? this.resolve(options) : this).clone();
        const base = super.describe(options);
        if (next.innerType) {
          var _innerOptions;
          let innerOptions = options;
          if ((_innerOptions = innerOptions) != null && _innerOptions.value) {
            innerOptions = Object.assign({}, innerOptions, {
              parent: innerOptions.value,
              value: innerOptions.value[0]
            });
          }
          base.innerType = next.innerType.describe(innerOptions);
        }
        return base;
      }
    };
    create$2.prototype = ArraySchema.prototype;
    TupleSchema = class extends Schema {
      constructor(schemas) {
        super({
          type: "tuple",
          spec: {
            types: schemas
          },
          check(v) {
            const types = this.spec.types;
            return Array.isArray(v) && v.length === types.length;
          }
        });
        this.withMutation(() => {
          this.typeError(tuple.notType);
        });
      }
      _cast(inputValue, options) {
        const {
          types
        } = this.spec;
        const value = super._cast(inputValue, options);
        if (!this._typeCheck(value)) {
          return value;
        }
        let isChanged = false;
        const castArray = types.map((type, idx) => {
          const castElement = type.cast(value[idx], Object.assign({}, options, {
            path: `${options.path || ""}[${idx}]`,
            parent: value,
            originalValue: value[idx],
            value: value[idx],
            index: idx
          }));
          if (castElement !== value[idx]) isChanged = true;
          return castElement;
        });
        return isChanged ? castArray : value;
      }
      _validate(_value, options = {}, panic, next) {
        let itemTypes = this.spec.types;
        super._validate(_value, options, panic, (tupleErrors, value) => {
          var _options$originalValu2;
          if (!this._typeCheck(value)) {
            next(tupleErrors, value);
            return;
          }
          let tests = [];
          for (let [index, itemSchema] of itemTypes.entries()) {
            var _options$originalValu;
            tests[index] = itemSchema.asNestedTest({
              options,
              index,
              parent: value,
              parentPath: options.path,
              originalParent: (_options$originalValu = options.originalValue) != null ? _options$originalValu : _value
            });
          }
          this.runTests({
            value,
            tests,
            originalValue: (_options$originalValu2 = options.originalValue) != null ? _options$originalValu2 : _value,
            options
          }, panic, (innerTypeErrors) => next(innerTypeErrors.concat(tupleErrors), value));
        });
      }
      describe(options) {
        const next = (options ? this.resolve(options) : this).clone();
        const base = super.describe(options);
        base.innerType = next.spec.types.map((schema, index) => {
          var _innerOptions;
          let innerOptions = options;
          if ((_innerOptions = innerOptions) != null && _innerOptions.value) {
            innerOptions = Object.assign({}, innerOptions, {
              parent: innerOptions.value,
              value: innerOptions.value[index]
            });
          }
          return schema.describe(innerOptions);
        });
        return base;
      }
    };
    create$1.prototype = TupleSchema.prototype;
    Lazy = class _Lazy {
      constructor(builder) {
        this.type = "lazy";
        this.__isYupSchema__ = true;
        this.spec = void 0;
        this._resolve = (value, options = {}) => {
          let schema = this.builder(value, options);
          if (!isSchema(schema)) throw new TypeError("lazy() functions must return a valid schema");
          if (this.spec.optional) schema = schema.optional();
          return schema.resolve(options);
        };
        this.builder = builder;
        this.spec = {
          meta: void 0,
          optional: false
        };
      }
      clone(spec) {
        const next = new _Lazy(this.builder);
        next.spec = Object.assign({}, this.spec, spec);
        return next;
      }
      optionality(optional) {
        const next = this.clone({
          optional
        });
        return next;
      }
      optional() {
        return this.optionality(true);
      }
      resolve(options) {
        return this._resolve(options.value, options);
      }
      cast(value, options) {
        return this._resolve(value, options).cast(value, options);
      }
      asNestedTest(config) {
        let {
          key,
          index,
          parent,
          options
        } = config;
        let value = parent[index != null ? index : key];
        return this._resolve(value, Object.assign({}, options, {
          value,
          parent
        })).asNestedTest(config);
      }
      validate(value, options) {
        return catchValidationError(() => this._resolve(value, options).validate(value, options));
      }
      validateSync(value, options) {
        return this._resolve(value, options).validateSync(value, options);
      }
      validateAt(path7, value, options) {
        return catchValidationError(() => this._resolve(value, options).validateAt(path7, value, options));
      }
      validateSyncAt(path7, value, options) {
        return this._resolve(value, options).validateSyncAt(path7, value, options);
      }
      isValid(value, options) {
        try {
          return this._resolve(value, options).isValid(value, options);
        } catch (err) {
          if (ValidationError.isError(err)) {
            return Promise.resolve(false);
          }
          throw err;
        }
      }
      isValidSync(value, options) {
        return this._resolve(value, options).isValidSync(value, options);
      }
      describe(options) {
        return options ? this.resolve(options).describe(options) : {
          type: "lazy",
          meta: this.spec.meta,
          label: void 0
        };
      }
      meta(...args) {
        if (args.length === 0) return this.spec.meta;
        let next = this.clone();
        next.spec.meta = Object.assign(next.spec.meta || {}, args[0]);
        return next;
      }
      get ["~standard"]() {
        const schema = this;
        const standard = {
          version: 1,
          vendor: "yup",
          async validate(value) {
            try {
              const result = await schema.validate(value, {
                abortEarly: false
              });
              return {
                value: result
              };
            } catch (err) {
              if (ValidationError.isError(err)) {
                return {
                  issues: issuesFromValidationError(err)
                };
              }
              throw err;
            }
          }
        };
        return standard;
      }
    };
  }
});

// ../../node_modules/cron-validate/lib/presets.js
var require_presets = __commonJS({
  "../../node_modules/cron-validate/lib/presets.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.default = [
      {
        name: "npm-node-cron",
        preset: {
          // https://github.com/kelektiv/node-cron
          presetId: "npm-node-cron",
          useSeconds: true,
          useYears: false,
          useAliases: true,
          useBlankDay: false,
          allowOnlyOneBlankDayField: false,
          mustHaveBlankDayField: false,
          useLastDayOfMonth: false,
          useLastDayOfWeek: false,
          useNearestWeekday: false,
          useNthWeekdayOfMonth: false,
          seconds: {
            minValue: 0,
            maxValue: 59
          },
          minutes: {
            minValue: 0,
            maxValue: 59
          },
          hours: {
            minValue: 0,
            maxValue: 23
          },
          daysOfMonth: {
            minValue: 1,
            maxValue: 31
          },
          months: {
            minValue: 0,
            maxValue: 11
          },
          daysOfWeek: {
            minValue: 0,
            maxValue: 6
          },
          years: {
            minValue: 1970,
            maxValue: 2099
          }
        }
      },
      {
        name: "aws-cloud-watch",
        preset: {
          // https://docs.aws.amazon.com/de_de/AmazonCloudWatch/latest/events/ScheduledEvents.html
          presetId: "aws-cloud-watch",
          useSeconds: false,
          useYears: true,
          useAliases: true,
          useBlankDay: true,
          allowOnlyOneBlankDayField: true,
          mustHaveBlankDayField: true,
          useLastDayOfMonth: true,
          useLastDayOfWeek: true,
          useNearestWeekday: true,
          useNthWeekdayOfMonth: true,
          seconds: {
            minValue: 0,
            maxValue: 59
          },
          minutes: {
            minValue: 0,
            maxValue: 59
          },
          hours: {
            minValue: 0,
            maxValue: 23
          },
          daysOfMonth: {
            minValue: 1,
            maxValue: 31
          },
          months: {
            minValue: 1,
            maxValue: 12
          },
          daysOfWeek: {
            minValue: 1,
            maxValue: 7
          },
          years: {
            minValue: 1970,
            maxValue: 2199
          }
        }
      },
      {
        name: "npm-cron-schedule",
        preset: {
          // https://github.com/P4sca1/cron-schedule
          presetId: "npm-cron-schedule",
          useSeconds: true,
          useYears: false,
          useAliases: true,
          useBlankDay: false,
          allowOnlyOneBlankDayField: false,
          mustHaveBlankDayField: false,
          useLastDayOfMonth: false,
          useLastDayOfWeek: false,
          useNearestWeekday: false,
          useNthWeekdayOfMonth: false,
          seconds: {
            minValue: 0,
            maxValue: 59
          },
          minutes: {
            minValue: 0,
            maxValue: 59
          },
          hours: {
            minValue: 0,
            maxValue: 23
          },
          daysOfMonth: {
            minValue: 1,
            maxValue: 31
          },
          months: {
            minValue: 1,
            maxValue: 12
          },
          daysOfWeek: {
            minValue: 0,
            maxValue: 7
          },
          years: {
            minValue: 1970,
            maxValue: 2099
          }
        }
      }
    ];
  }
});

// ../../node_modules/cron-validate/lib/option.js
var require_option = __commonJS({
  "../../node_modules/cron-validate/lib/option.js"(exports2) {
    "use strict";
    var __createBinding = exports2 && exports2.__createBinding || (Object.create ? (function(o, m, k, k2) {
      if (k2 === void 0) k2 = k;
      var desc = Object.getOwnPropertyDescriptor(m, k);
      if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
        desc = { enumerable: true, get: function() {
          return m[k];
        } };
      }
      Object.defineProperty(o, k2, desc);
    }) : (function(o, m, k, k2) {
      if (k2 === void 0) k2 = k;
      o[k2] = m[k];
    }));
    var __setModuleDefault = exports2 && exports2.__setModuleDefault || (Object.create ? (function(o, v) {
      Object.defineProperty(o, "default", { enumerable: true, value: v });
    }) : function(o, v) {
      o["default"] = v;
    });
    var __importStar = exports2 && exports2.__importStar || function(mod) {
      if (mod && mod.__esModule) return mod;
      var result = {};
      if (mod != null) {
        for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
      }
      __setModuleDefault(result, mod);
      return result;
    };
    var __importDefault = exports2 && exports2.__importDefault || function(mod) {
      return mod && mod.__esModule ? mod : { "default": mod };
    };
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.validateOptions = exports2.registerOptionPreset = exports2.getOptionPresets = exports2.getOptionPreset = void 0;
    var yup = __importStar((init_index_esm(), __toCommonJS(index_esm_exports)));
    init_index_esm();
    var result_1 = require_result();
    var presets_1 = __importDefault(require_presets());
    require_types3();
    var optionPresets = {
      // http://crontab.org/
      default: {
        presetId: "default",
        useSeconds: false,
        useYears: false,
        useAliases: false,
        useBlankDay: false,
        allowOnlyOneBlankDayField: false,
        // Optional for backward compatibility.
        // Undefined implies true.
        allowStepping: true,
        // Undefined implies false.
        mustHaveBlankDayField: false,
        useLastDayOfMonth: false,
        useLastDayOfWeek: false,
        useNearestWeekday: false,
        useNthWeekdayOfMonth: false,
        //
        seconds: {
          minValue: 0,
          maxValue: 59
        },
        minutes: {
          minValue: 0,
          maxValue: 59
        },
        hours: {
          minValue: 0,
          maxValue: 23
        },
        daysOfMonth: {
          minValue: 0,
          maxValue: 31
        },
        months: {
          minValue: 0,
          maxValue: 12
        },
        daysOfWeek: {
          minValue: 0,
          maxValue: 7
        },
        years: {
          minValue: 1970,
          maxValue: 2099
        }
      }
    };
    var optionPresetSchema = yup.object({
      presetId: yup.string().required(),
      useSeconds: yup.boolean().required(),
      useYears: yup.boolean().required(),
      useAliases: yup.boolean(),
      useBlankDay: yup.boolean().required(),
      allowOnlyOneBlankDayField: yup.boolean().required(),
      allowStepping: yup.boolean(),
      mustHaveBlankDayField: yup.boolean(),
      useLastDayOfMonth: yup.boolean(),
      useLastDayOfWeek: yup.boolean(),
      useNearestWeekday: yup.boolean(),
      useNthWeekdayOfMonth: yup.boolean(),
      seconds: yup.object({
        minValue: yup.number().min(0).required(),
        maxValue: yup.number().min(0).required(),
        lowerLimit: yup.number().min(0),
        upperLimit: yup.number().min(0)
      }).required(),
      minutes: yup.object({
        minValue: yup.number().min(0).required(),
        maxValue: yup.number().min(0).required(),
        lowerLimit: yup.number().min(0),
        upperLimit: yup.number().min(0)
      }).required(),
      hours: yup.object({
        minValue: yup.number().min(0).required(),
        maxValue: yup.number().min(0).required(),
        lowerLimit: yup.number().min(0),
        upperLimit: yup.number().min(0)
      }).required(),
      daysOfMonth: yup.object({
        minValue: yup.number().min(0).required(),
        maxValue: yup.number().min(0).required(),
        lowerLimit: yup.number().min(0),
        upperLimit: yup.number().min(0)
      }).required(),
      months: yup.object({
        minValue: yup.number().min(0).required(),
        maxValue: yup.number().min(0).required(),
        lowerLimit: yup.number().min(0),
        upperLimit: yup.number().min(0)
      }).required(),
      daysOfWeek: yup.object({
        minValue: yup.number().min(0).required(),
        maxValue: yup.number().min(0).required(),
        lowerLimit: yup.number().min(0),
        upperLimit: yup.number().min(0)
      }).required(),
      years: yup.object({
        minValue: yup.number().min(0).required(),
        maxValue: yup.number().min(0).required(),
        lowerLimit: yup.number().min(0),
        upperLimit: yup.number().min(0)
      }).required()
    }).required();
    var getOptionPreset = (presetId) => {
      if (optionPresets[presetId]) {
        return (0, result_1.valid)(optionPresets[presetId]);
      }
      return (0, result_1.err)(`Option preset '${presetId}' not found.`);
    };
    exports2.getOptionPreset = getOptionPreset;
    var getOptionPresets = () => optionPresets;
    exports2.getOptionPresets = getOptionPresets;
    var registerOptionPreset = (presetName, preset) => {
      optionPresets[presetName] = optionPresetSchema.validateSync(preset, {
        strict: false,
        abortEarly: false,
        stripUnknown: true,
        recursive: true
      });
    };
    exports2.registerOptionPreset = registerOptionPreset;
    function loadPresets() {
      for (let index = 0; index < presets_1.default.length; index += 1) {
        const { name, preset } = presets_1.default[index];
        (0, exports2.registerOptionPreset)(name, preset);
      }
    }
    loadPresets();
    var optionsCache = /* @__PURE__ */ new Map();
    function toOptionsCacheKey(presetId, override) {
      var _a;
      return presetId + ((_a = JSON.stringify(override)) !== null && _a !== void 0 ? _a : "");
    }
    function presetToOptionsSchema(preset) {
      return yup.object({
        presetId: yup.string().required(),
        preset: optionPresetSchema.required(),
        useSeconds: yup.boolean().required(),
        useYears: yup.boolean().required(),
        useAliases: yup.boolean(),
        useBlankDay: yup.boolean().required(),
        allowOnlyOneBlankDayField: yup.boolean().required(),
        allowStepping: yup.boolean(),
        mustHaveBlankDayField: yup.boolean(),
        useLastDayOfMonth: yup.boolean(),
        useLastDayOfWeek: yup.boolean(),
        useNearestWeekday: yup.boolean(),
        useNthWeekdayOfMonth: yup.boolean(),
        seconds: yup.object({
          lowerLimit: yup.number().min(preset.seconds.minValue).max(preset.seconds.maxValue),
          upperLimit: yup.number().min(preset.seconds.minValue).max(preset.seconds.maxValue)
        }).required(),
        minutes: yup.object({
          lowerLimit: yup.number().min(preset.minutes.minValue).max(preset.minutes.maxValue),
          upperLimit: yup.number().min(preset.minutes.minValue).max(preset.minutes.maxValue)
        }).required(),
        hours: yup.object({
          lowerLimit: yup.number().min(preset.hours.minValue).max(preset.hours.maxValue),
          upperLimit: yup.number().min(preset.hours.minValue).max(preset.hours.maxValue)
        }).required(),
        daysOfMonth: yup.object({
          lowerLimit: yup.number().min(preset.daysOfMonth.minValue).max(preset.daysOfMonth.maxValue),
          upperLimit: yup.number().min(preset.daysOfMonth.minValue).max(preset.daysOfMonth.maxValue)
        }).required(),
        months: yup.object({
          lowerLimit: yup.number().min(preset.months.minValue).max(preset.months.maxValue),
          upperLimit: yup.number().min(preset.months.minValue).max(preset.months.maxValue)
        }).required(),
        daysOfWeek: yup.object({
          lowerLimit: yup.number().min(preset.daysOfWeek.minValue).max(preset.daysOfWeek.maxValue),
          upperLimit: yup.number().min(preset.daysOfWeek.minValue).max(preset.daysOfWeek.maxValue)
        }).required(),
        years: yup.object({
          lowerLimit: yup.number().min(preset.years.minValue).max(preset.years.maxValue),
          upperLimit: yup.number().min(preset.years.minValue).max(preset.years.maxValue)
        }).required()
      }).required();
    }
    function presetToOptions(preset, override) {
      var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s, _t, _u, _v, _w;
      const unvalidatedConfig = Object.assign(Object.assign({ presetId: preset.presetId, preset }, {
        useSeconds: preset.useSeconds,
        useYears: preset.useYears,
        useAliases: (_a = preset.useAliases) !== null && _a !== void 0 ? _a : false,
        useBlankDay: preset.useBlankDay,
        allowOnlyOneBlankDayField: preset.allowOnlyOneBlankDayField,
        allowStepping: (_b = preset.allowStepping) !== null && _b !== void 0 ? _b : true,
        mustHaveBlankDayField: (_c = preset.mustHaveBlankDayField) !== null && _c !== void 0 ? _c : false,
        useLastDayOfMonth: (_d = preset.useLastDayOfMonth) !== null && _d !== void 0 ? _d : false,
        useLastDayOfWeek: (_e = preset.useLastDayOfWeek) !== null && _e !== void 0 ? _e : false,
        useNearestWeekday: (_f = preset.useNearestWeekday) !== null && _f !== void 0 ? _f : false,
        useNthWeekdayOfMonth: (_g = preset.useNthWeekdayOfMonth) !== null && _g !== void 0 ? _g : false,
        seconds: {
          lowerLimit: (_h = preset.seconds.lowerLimit) !== null && _h !== void 0 ? _h : preset.seconds.minValue,
          upperLimit: (_j = preset.seconds.upperLimit) !== null && _j !== void 0 ? _j : preset.seconds.maxValue
        },
        minutes: {
          lowerLimit: (_k = preset.minutes.lowerLimit) !== null && _k !== void 0 ? _k : preset.minutes.minValue,
          upperLimit: (_l = preset.minutes.upperLimit) !== null && _l !== void 0 ? _l : preset.minutes.maxValue
        },
        hours: {
          lowerLimit: (_m = preset.hours.lowerLimit) !== null && _m !== void 0 ? _m : preset.hours.minValue,
          upperLimit: (_o = preset.hours.upperLimit) !== null && _o !== void 0 ? _o : preset.hours.maxValue
        },
        daysOfMonth: {
          lowerLimit: (_p = preset.daysOfMonth.lowerLimit) !== null && _p !== void 0 ? _p : preset.daysOfMonth.minValue,
          upperLimit: (_q = preset.daysOfMonth.upperLimit) !== null && _q !== void 0 ? _q : preset.daysOfMonth.maxValue
        },
        months: {
          lowerLimit: (_r = preset.months.lowerLimit) !== null && _r !== void 0 ? _r : preset.months.minValue,
          upperLimit: (_s = preset.months.upperLimit) !== null && _s !== void 0 ? _s : preset.months.maxValue
        },
        daysOfWeek: {
          lowerLimit: (_t = preset.daysOfWeek.lowerLimit) !== null && _t !== void 0 ? _t : preset.daysOfWeek.minValue,
          upperLimit: (_u = preset.daysOfWeek.upperLimit) !== null && _u !== void 0 ? _u : preset.daysOfWeek.maxValue
        },
        years: {
          lowerLimit: (_v = preset.years.lowerLimit) !== null && _v !== void 0 ? _v : preset.years.minValue,
          upperLimit: (_w = preset.years.upperLimit) !== null && _w !== void 0 ? _w : preset.years.maxValue
        }
      }), override);
      const optionsSchema = presetToOptionsSchema(preset);
      const validatedConfig = optionsSchema.validateSync(unvalidatedConfig, {
        strict: false,
        abortEarly: false,
        stripUnknown: true,
        recursive: true
      });
      return validatedConfig;
    }
    var validateOptions2 = (inputOptions) => {
      try {
        let preset;
        if (inputOptions.preset) {
          if (typeof inputOptions.preset === "string") {
            if (!optionPresets[inputOptions.preset]) {
              return (0, result_1.err)([`Option preset ${inputOptions.preset} does not exist.`]);
            }
            preset = optionPresets[inputOptions.preset];
          } else {
            preset = inputOptions.preset;
          }
        } else {
          preset = optionPresets.default;
        }
        const cacheKey = toOptionsCacheKey(preset.presetId, inputOptions.override);
        const cachedOptions = optionsCache.get(cacheKey);
        if (cachedOptions)
          return (0, result_1.valid)(cachedOptions);
        const options = presetToOptions(preset, inputOptions.override);
        optionsCache.set(cacheKey, options);
        return (0, result_1.valid)(options);
      } catch (validationError) {
        return (0, result_1.err)(validationError.errors);
      }
    };
    exports2.validateOptions = validateOptions2;
  }
});

// ../../node_modules/cron-validate/lib/index.js
var require_lib = __commonJS({
  "../../node_modules/cron-validate/lib/index.js"(exports2) {
    "use strict";
    var __importDefault = exports2 && exports2.__importDefault || function(mod) {
      return mod && mod.__esModule ? mod : { "default": mod };
    };
    Object.defineProperty(exports2, "__esModule", { value: true });
    var result_1 = require_result();
    var secondChecker_1 = __importDefault(require_secondChecker());
    var minuteChecker_1 = __importDefault(require_minuteChecker());
    var hourChecker_1 = __importDefault(require_hourChecker());
    var dayOfMonthChecker_1 = __importDefault(require_dayOfMonthChecker());
    var monthChecker_1 = __importDefault(require_monthChecker());
    var dayOfWeekChecker_1 = __importDefault(require_dayOfWeekChecker());
    var yearChecker_1 = __importDefault(require_yearChecker());
    var option_1 = require_option();
    require_types3();
    var splitCronString = (cronString, options) => {
      const splittedCronString = cronString.trim().split(" ");
      if (options.useSeconds && options.useYears && splittedCronString.length !== 7) {
        return (0, result_1.err)(`Expected 7 values, but got ${splittedCronString.length}.`);
      }
      if ((options.useSeconds && !options.useYears || options.useYears && !options.useSeconds) && splittedCronString.length !== 6) {
        return (0, result_1.err)(`Expected 6 values, but got ${splittedCronString.length}.`);
      }
      if (!options.useSeconds && !options.useYears && splittedCronString.length !== 5) {
        return (0, result_1.err)(`Expected 5 values, but got ${splittedCronString.length}.`);
      }
      const cronData = {
        seconds: options.useSeconds ? splittedCronString[0] : void 0,
        minutes: splittedCronString[options.useSeconds ? 1 : 0],
        hours: splittedCronString[options.useSeconds ? 2 : 1],
        daysOfMonth: splittedCronString[options.useSeconds ? 3 : 2],
        months: splittedCronString[options.useSeconds ? 4 : 3],
        daysOfWeek: splittedCronString[options.useSeconds ? 5 : 4],
        years: options.useYears ? splittedCronString[options.useSeconds ? 6 : 5] : void 0
      };
      return (0, result_1.valid)(cronData);
    };
    var cron = (cronString, inputOptions = {}) => {
      const optionsResult = (0, option_1.validateOptions)(inputOptions);
      if (optionsResult.isError()) {
        return optionsResult;
      }
      const options = optionsResult.getValue();
      const cronDataResult = splitCronString(cronString, options);
      if (cronDataResult.isError()) {
        return (0, result_1.err)([`${cronDataResult.getError()} (Input cron: '${cronString}')`]);
      }
      const cronData = cronDataResult.getValue();
      const checkResults = [];
      if (options.useSeconds) {
        checkResults.push((0, secondChecker_1.default)(cronData, options));
      }
      checkResults.push((0, minuteChecker_1.default)(cronData, options));
      checkResults.push((0, hourChecker_1.default)(cronData, options));
      checkResults.push((0, dayOfMonthChecker_1.default)(cronData, options));
      checkResults.push((0, monthChecker_1.default)(cronData, options));
      checkResults.push((0, dayOfWeekChecker_1.default)(cronData, options));
      if (options.useYears) {
        checkResults.push((0, yearChecker_1.default)(cronData, options));
      }
      if (checkResults.every((value) => value.isValid())) {
        return (0, result_1.valid)(cronData);
      }
      const errorArray = [];
      checkResults.forEach((result) => {
        if (result.isError()) {
          result.getError().forEach((error2) => {
            errorArray.push(error2);
          });
        }
      });
      errorArray.forEach((error2, index) => {
        errorArray[index] = `${error2} (Input cron: '${cronString}')`;
      });
      return (0, result_1.err)(errorArray);
    };
    exports2.default = cron;
  }
});

// ../shared/dist/utils/cron.js
var require_cron = __commonJS({
  "../shared/dist/utils/cron.js"(exports2) {
    "use strict";
    var __importDefault = exports2 && exports2.__importDefault || function(mod) {
      return mod && mod.__esModule ? mod : { "default": mod };
    };
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.calculateNextRun = calculateNextRun;
    exports2.validateCronExpression = validateCronExpression;
    var cron_parser_1 = require_dist();
    var cron_validate_1 = __importDefault(require_lib());
    function calculateNextRun(cronExpression, timezone, from) {
      const currentDate = from || new Date(Date.now());
      const parsed = cron_parser_1.CronExpressionParser.parse(cronExpression, {
        currentDate,
        tz: timezone
      });
      const nextRunInTimezone = parsed.next().toDate();
      return new Date(nextRunInTimezone.toISOString());
    }
    function validateCronExpression(cronExpression) {
      try {
        const result = (0, cron_validate_1.default)(cronExpression, {
          preset: "default",
          override: {
            useSeconds: false,
            useYears: false,
            useAliases: false,
            allowStepping: true,
            useLastDayOfMonth: false,
            useLastDayOfWeek: false,
            useNearestWeekday: false
          }
        });
        return result.isValid();
      } catch {
        return false;
      }
    }
  }
});

// ../shared/dist/utils/model-context-length.js
var require_model_context_length = __commonJS({
  "../shared/dist/utils/model-context-length.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.getModelContextLength = getModelContextLength;
    exports2.getConfiguredModelContextLength = getConfiguredModelContextLength;
    var DEFAULT_CONTEXT_LENGTH = 15e4;
    function getModelContextLength(modelId) {
      return DEFAULT_CONTEXT_LENGTH;
    }
    function getConfiguredModelContextLength() {
      const provider = process.env.LLM_PROVIDER?.toLowerCase();
      let modelId;
      switch (provider) {
        case "anthropic":
          modelId = process.env.ANTHROPIC_MODEL;
          break;
        case "openai":
          modelId = process.env.OPENAI_MODEL;
          break;
        case "gemini":
          modelId = process.env.GEMINI_MODEL;
          break;
        case "azure":
          modelId = process.env.AZURE_MODEL;
          break;
        case "bedrock":
          modelId = process.env.BEDROCK_MODEL;
          break;
        case "vertex":
          modelId = process.env.VERTEX_MODEL;
          break;
      }
      return modelId ? getModelContextLength(modelId) : DEFAULT_CONTEXT_LENGTH;
    }
  }
});

// ../../node_modules/base64-js/index.js
var require_base64_js = __commonJS({
  "../../node_modules/base64-js/index.js"(exports2) {
    "use strict";
    exports2.byteLength = byteLength;
    exports2.toByteArray = toByteArray;
    exports2.fromByteArray = fromByteArray;
    var lookup = [];
    var revLookup = [];
    var Arr = typeof Uint8Array !== "undefined" ? Uint8Array : Array;
    var code = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
    for (i = 0, len = code.length; i < len; ++i) {
      lookup[i] = code[i];
      revLookup[code.charCodeAt(i)] = i;
    }
    var i;
    var len;
    revLookup["-".charCodeAt(0)] = 62;
    revLookup["_".charCodeAt(0)] = 63;
    function getLens(b64) {
      var len2 = b64.length;
      if (len2 % 4 > 0) {
        throw new Error("Invalid string. Length must be a multiple of 4");
      }
      var validLen = b64.indexOf("=");
      if (validLen === -1) validLen = len2;
      var placeHoldersLen = validLen === len2 ? 0 : 4 - validLen % 4;
      return [validLen, placeHoldersLen];
    }
    function byteLength(b64) {
      var lens = getLens(b64);
      var validLen = lens[0];
      var placeHoldersLen = lens[1];
      return (validLen + placeHoldersLen) * 3 / 4 - placeHoldersLen;
    }
    function _byteLength(b64, validLen, placeHoldersLen) {
      return (validLen + placeHoldersLen) * 3 / 4 - placeHoldersLen;
    }
    function toByteArray(b64) {
      var tmp;
      var lens = getLens(b64);
      var validLen = lens[0];
      var placeHoldersLen = lens[1];
      var arr = new Arr(_byteLength(b64, validLen, placeHoldersLen));
      var curByte = 0;
      var len2 = placeHoldersLen > 0 ? validLen - 4 : validLen;
      var i2;
      for (i2 = 0; i2 < len2; i2 += 4) {
        tmp = revLookup[b64.charCodeAt(i2)] << 18 | revLookup[b64.charCodeAt(i2 + 1)] << 12 | revLookup[b64.charCodeAt(i2 + 2)] << 6 | revLookup[b64.charCodeAt(i2 + 3)];
        arr[curByte++] = tmp >> 16 & 255;
        arr[curByte++] = tmp >> 8 & 255;
        arr[curByte++] = tmp & 255;
      }
      if (placeHoldersLen === 2) {
        tmp = revLookup[b64.charCodeAt(i2)] << 2 | revLookup[b64.charCodeAt(i2 + 1)] >> 4;
        arr[curByte++] = tmp & 255;
      }
      if (placeHoldersLen === 1) {
        tmp = revLookup[b64.charCodeAt(i2)] << 10 | revLookup[b64.charCodeAt(i2 + 1)] << 4 | revLookup[b64.charCodeAt(i2 + 2)] >> 2;
        arr[curByte++] = tmp >> 8 & 255;
        arr[curByte++] = tmp & 255;
      }
      return arr;
    }
    function tripletToBase64(num) {
      return lookup[num >> 18 & 63] + lookup[num >> 12 & 63] + lookup[num >> 6 & 63] + lookup[num & 63];
    }
    function encodeChunk(uint8, start, end) {
      var tmp;
      var output4 = [];
      for (var i2 = start; i2 < end; i2 += 3) {
        tmp = (uint8[i2] << 16 & 16711680) + (uint8[i2 + 1] << 8 & 65280) + (uint8[i2 + 2] & 255);
        output4.push(tripletToBase64(tmp));
      }
      return output4.join("");
    }
    function fromByteArray(uint8) {
      var tmp;
      var len2 = uint8.length;
      var extraBytes = len2 % 3;
      var parts = [];
      var maxChunkLength = 16383;
      for (var i2 = 0, len22 = len2 - extraBytes; i2 < len22; i2 += maxChunkLength) {
        parts.push(encodeChunk(uint8, i2, i2 + maxChunkLength > len22 ? len22 : i2 + maxChunkLength));
      }
      if (extraBytes === 1) {
        tmp = uint8[len2 - 1];
        parts.push(
          lookup[tmp >> 2] + lookup[tmp << 4 & 63] + "=="
        );
      } else if (extraBytes === 2) {
        tmp = (uint8[len2 - 2] << 8) + uint8[len2 - 1];
        parts.push(
          lookup[tmp >> 10] + lookup[tmp >> 4 & 63] + lookup[tmp << 2 & 63] + "="
        );
      }
      return parts.join("");
    }
  }
});

// ../../node_modules/js-tiktoken/dist/lite.cjs
var require_lite = __commonJS({
  "../../node_modules/js-tiktoken/dist/lite.cjs"(exports2) {
    "use strict";
    var base64 = require_base64_js();
    function _interopDefault(e) {
      return e && e.__esModule ? e : { default: e };
    }
    var base64__default = /* @__PURE__ */ _interopDefault(base64);
    var __defProp2 = Object.defineProperty;
    var __defNormalProp = (obj, key, value) => key in obj ? __defProp2(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
    var __publicField = (obj, key, value) => {
      __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
      return value;
    };
    function bytePairMerge(piece, ranks) {
      let parts = Array.from(
        { length: piece.length },
        (_, i) => ({ start: i, end: i + 1 })
      );
      while (parts.length > 1) {
        let minRank = null;
        for (let i = 0; i < parts.length - 1; i++) {
          const slice = piece.slice(parts[i].start, parts[i + 1].end);
          const rank = ranks.get(slice.join(","));
          if (rank == null)
            continue;
          if (minRank == null || rank < minRank[0]) {
            minRank = [rank, i];
          }
        }
        if (minRank != null) {
          const i = minRank[1];
          parts[i] = { start: parts[i].start, end: parts[i + 1].end };
          parts.splice(i + 1, 1);
        } else {
          break;
        }
      }
      return parts;
    }
    function bytePairEncode(piece, ranks) {
      if (piece.length === 1)
        return [ranks.get(piece.join(","))];
      return bytePairMerge(piece, ranks).map((p) => ranks.get(piece.slice(p.start, p.end).join(","))).filter((x) => x != null);
    }
    function escapeRegex(str) {
      return str.replace(/[\\^$*+?.()|[\]{}]/g, "\\$&");
    }
    var _Tiktoken = class {
      /** @internal */
      specialTokens;
      /** @internal */
      inverseSpecialTokens;
      /** @internal */
      patStr;
      /** @internal */
      textEncoder = new TextEncoder();
      /** @internal */
      textDecoder = new TextDecoder("utf-8");
      /** @internal */
      rankMap = /* @__PURE__ */ new Map();
      /** @internal */
      textMap = /* @__PURE__ */ new Map();
      constructor(ranks, extendedSpecialTokens) {
        this.patStr = ranks.pat_str;
        const uncompressed = ranks.bpe_ranks.split("\n").filter(Boolean).reduce((memo, x) => {
          const [_, offsetStr, ...tokens] = x.split(" ");
          const offset = Number.parseInt(offsetStr, 10);
          tokens.forEach((token, i) => memo[token] = offset + i);
          return memo;
        }, {});
        for (const [token, rank] of Object.entries(uncompressed)) {
          const bytes = base64__default.default.toByteArray(token);
          this.rankMap.set(bytes.join(","), rank);
          this.textMap.set(rank, bytes);
        }
        this.specialTokens = { ...ranks.special_tokens, ...extendedSpecialTokens };
        this.inverseSpecialTokens = Object.entries(this.specialTokens).reduce((memo, [text, rank]) => {
          memo[rank] = this.textEncoder.encode(text);
          return memo;
        }, {});
      }
      encode(text, allowedSpecial = [], disallowedSpecial = "all") {
        const regexes = new RegExp(this.patStr, "ug");
        const specialRegex = _Tiktoken.specialTokenRegex(
          Object.keys(this.specialTokens)
        );
        const ret = [];
        const allowedSpecialSet = new Set(
          allowedSpecial === "all" ? Object.keys(this.specialTokens) : allowedSpecial
        );
        const disallowedSpecialSet = new Set(
          disallowedSpecial === "all" ? Object.keys(this.specialTokens).filter(
            (x) => !allowedSpecialSet.has(x)
          ) : disallowedSpecial
        );
        if (disallowedSpecialSet.size > 0) {
          const disallowedSpecialRegex = _Tiktoken.specialTokenRegex([
            ...disallowedSpecialSet
          ]);
          const specialMatch = text.match(disallowedSpecialRegex);
          if (specialMatch != null) {
            throw new Error(
              `The text contains a special token that is not allowed: ${specialMatch[0]}`
            );
          }
        }
        let start = 0;
        while (true) {
          let nextSpecial = null;
          let startFind = start;
          while (true) {
            specialRegex.lastIndex = startFind;
            nextSpecial = specialRegex.exec(text);
            if (nextSpecial == null || allowedSpecialSet.has(nextSpecial[0]))
              break;
            startFind = nextSpecial.index + 1;
          }
          const end = nextSpecial?.index ?? text.length;
          for (const match of text.substring(start, end).matchAll(regexes)) {
            const piece = this.textEncoder.encode(match[0]);
            const token2 = this.rankMap.get(piece.join(","));
            if (token2 != null) {
              ret.push(token2);
              continue;
            }
            ret.push(...bytePairEncode(piece, this.rankMap));
          }
          if (nextSpecial == null)
            break;
          let token = this.specialTokens[nextSpecial[0]];
          ret.push(token);
          start = nextSpecial.index + nextSpecial[0].length;
        }
        return ret;
      }
      decode(tokens) {
        const res = [];
        let length = 0;
        for (let i2 = 0; i2 < tokens.length; ++i2) {
          const token = tokens[i2];
          const bytes = this.textMap.get(token) ?? this.inverseSpecialTokens[token];
          if (bytes != null) {
            res.push(bytes);
            length += bytes.length;
          }
        }
        const mergedArray = new Uint8Array(length);
        let i = 0;
        for (const bytes of res) {
          mergedArray.set(bytes, i);
          i += bytes.length;
        }
        return this.textDecoder.decode(mergedArray);
      }
    };
    var Tiktoken = _Tiktoken;
    __publicField(Tiktoken, "specialTokenRegex", (tokens) => {
      return new RegExp(tokens.map((i) => escapeRegex(i)).join("|"), "g");
    });
    function getEncodingNameForModel(model) {
      switch (model) {
        case "gpt2": {
          return "gpt2";
        }
        case "code-cushman-001":
        case "code-cushman-002":
        case "code-davinci-001":
        case "code-davinci-002":
        case "cushman-codex":
        case "davinci-codex":
        case "davinci-002":
        case "text-davinci-002":
        case "text-davinci-003": {
          return "p50k_base";
        }
        case "code-davinci-edit-001":
        case "text-davinci-edit-001": {
          return "p50k_edit";
        }
        case "ada":
        case "babbage":
        case "babbage-002":
        case "code-search-ada-code-001":
        case "code-search-babbage-code-001":
        case "curie":
        case "davinci":
        case "text-ada-001":
        case "text-babbage-001":
        case "text-curie-001":
        case "text-davinci-001":
        case "text-search-ada-doc-001":
        case "text-search-babbage-doc-001":
        case "text-search-curie-doc-001":
        case "text-search-davinci-doc-001":
        case "text-similarity-ada-001":
        case "text-similarity-babbage-001":
        case "text-similarity-curie-001":
        case "text-similarity-davinci-001": {
          return "r50k_base";
        }
        case "gpt-3.5-turbo-instruct-0914":
        case "gpt-3.5-turbo-instruct":
        case "gpt-3.5-turbo-16k-0613":
        case "gpt-3.5-turbo-16k":
        case "gpt-3.5-turbo-0613":
        case "gpt-3.5-turbo-0301":
        case "gpt-3.5-turbo":
        case "gpt-4-32k-0613":
        case "gpt-4-32k-0314":
        case "gpt-4-32k":
        case "gpt-4-0613":
        case "gpt-4-0314":
        case "gpt-4":
        case "gpt-3.5-turbo-1106":
        case "gpt-35-turbo":
        case "gpt-4-1106-preview":
        case "gpt-4-vision-preview":
        case "gpt-3.5-turbo-0125":
        case "gpt-4-turbo":
        case "gpt-4-turbo-2024-04-09":
        case "gpt-4-turbo-preview":
        case "gpt-4-0125-preview":
        case "text-embedding-ada-002":
        case "text-embedding-3-small":
        case "text-embedding-3-large": {
          return "cl100k_base";
        }
        case "gpt-4o":
        case "gpt-4o-2024-05-13":
        case "gpt-4o-2024-08-06":
        case "gpt-4o-2024-11-20":
        case "gpt-4o-mini-2024-07-18":
        case "gpt-4o-mini":
        case "gpt-4o-search-preview":
        case "gpt-4o-search-preview-2025-03-11":
        case "gpt-4o-mini-search-preview":
        case "gpt-4o-mini-search-preview-2025-03-11":
        case "gpt-4o-audio-preview":
        case "gpt-4o-audio-preview-2024-12-17":
        case "gpt-4o-audio-preview-2024-10-01":
        case "gpt-4o-mini-audio-preview":
        case "gpt-4o-mini-audio-preview-2024-12-17":
        case "o1":
        case "o1-2024-12-17":
        case "o1-mini":
        case "o1-mini-2024-09-12":
        case "o1-preview":
        case "o1-preview-2024-09-12":
        case "o1-pro":
        case "o1-pro-2025-03-19":
        case "o3":
        case "o3-2025-04-16":
        case "o3-mini":
        case "o3-mini-2025-01-31":
        case "o4-mini":
        case "o4-mini-2025-04-16":
        case "chatgpt-4o-latest":
        case "gpt-4o-realtime":
        case "gpt-4o-realtime-preview-2024-10-01":
        case "gpt-4o-realtime-preview-2024-12-17":
        case "gpt-4o-mini-realtime-preview":
        case "gpt-4o-mini-realtime-preview-2024-12-17":
        case "gpt-4.1":
        case "gpt-4.1-2025-04-14":
        case "gpt-4.1-mini":
        case "gpt-4.1-mini-2025-04-14":
        case "gpt-4.1-nano":
        case "gpt-4.1-nano-2025-04-14":
        case "gpt-4.5-preview":
        case "gpt-4.5-preview-2025-02-27":
        case "gpt-5":
        case "gpt-5-2025-08-07":
        case "gpt-5-nano":
        case "gpt-5-nano-2025-08-07":
        case "gpt-5-mini":
        case "gpt-5-mini-2025-08-07":
        case "gpt-5-chat-latest": {
          return "o200k_base";
        }
        default:
          throw new Error("Unknown model");
      }
    }
    exports2.Tiktoken = Tiktoken;
    exports2.getEncodingNameForModel = getEncodingNameForModel;
  }
});

// ../shared/dist/utils/token-count.js
var require_token_count = __commonJS({
  "../shared/dist/utils/token-count.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.estimateTokenCount = estimateTokenCount;
    var lite_1 = require_lite();
    var encoder = null;
    async function getEncoder() {
      if (!encoder) {
        const rankPath = "js-tiktoken/ranks/cl100k_base";
        const { default: cl100k_base } = await import(rankPath);
        encoder = new lite_1.Tiktoken(cl100k_base);
      }
      return encoder;
    }
    async function estimateTokenCount(text) {
      const enc = await getEncoder();
      return enc.encode(text).length;
    }
  }
});

// ../shared/dist/utils.js
var require_utils = __commonJS({
  "../shared/dist/utils.js"(exports2) {
    "use strict";
    var __createBinding = exports2 && exports2.__createBinding || (Object.create ? (function(o, m, k, k2) {
      if (k2 === void 0) k2 = k;
      var desc = Object.getOwnPropertyDescriptor(m, k);
      if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
        desc = { enumerable: true, get: function() {
          return m[k];
        } };
      }
      Object.defineProperty(o, k2, desc);
    }) : (function(o, m, k, k2) {
      if (k2 === void 0) k2 = k;
      o[k2] = m[k];
    }));
    var __exportStar = exports2 && exports2.__exportStar || function(m, exports3) {
      for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports3, p)) __createBinding(exports3, m, p);
    };
    var __importDefault = exports2 && exports2.__importDefault || function(mod) {
      return mod && mod.__esModule ? mod : { "default": mod };
    };
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.ALLOWED_PATCH_SYSTEM_FIELDS = exports2.getSystemAuthStatus = exports2.detectSystemAuthType = exports2.maskSystemCredentials = exports2.isSensitiveCredentialKey = exports2.ALLOWED_FILE_EXTENSIONS = exports2.getConnectionProtocol = void 0;
    exports2.isAbortError = isAbortError;
    exports2.validateExternalUrl = validateExternalUrl;
    exports2.flattenAndNamespaceCredentials = flattenAndNamespaceCredentials;
    exports2.flattenAndNamespaceSystemUrls = flattenAndNamespaceSystemUrls;
    exports2.slugify = slugify2;
    exports2.generateUniqueId = generateUniqueId;
    exports2.waitForSystemProcessing = waitForSystemProcessing;
    exports2.inferJsonSchema = inferJsonSchema;
    exports2.resolveOAuthCertAndKey = resolveOAuthCertAndKey;
    exports2.isArrowFunction = isArrowFunction;
    exports2.assertValidArrowFunction = assertValidArrowFunction;
    exports2.isMaskedValue = isMaskedValue;
    exports2.mergeCredentials = mergeCredentials;
    exports2.maskCredentials = maskCredentials;
    exports2.sampleResultObject = sampleResultObject;
    exports2.safeStringify = safeStringify;
    exports2.truncateForLLM = truncateForLLM;
    exports2.getDateMessage = getDateMessage;
    exports2.parseIconString = parseIconString;
    exports2.serializeIcon = serializeIcon;
    exports2.normalizeToolDiff = normalizeToolDiff;
    exports2.normalizeToolDiffs = normalizeToolDiffs;
    exports2.composeUrl = composeUrl;
    exports2.truncateRunResult = truncateRunResult;
    exports2.getToolSystemIds = getToolSystemIds;
    exports2.isProductionSystem = isProductionSystem;
    var json_schema_js_1 = require_json_schema();
    var types_js_1 = require_types();
    var truncate_json_1 = __importDefault((init_main5(), __toCommonJS(main_exports)));
    __exportStar(require_cron(), exports2);
    __exportStar(require_model_context_length(), exports2);
    __exportStar(require_token_count(), exports2);
    var getConnectionProtocol2 = (url) => {
      if (url.startsWith("postgres://") || url.startsWith("postgresql://"))
        return "postgres";
      if (url.startsWith("redis://") || url.startsWith("rediss://"))
        return "redis";
      if (url.startsWith("ftp://") || url.startsWith("ftps://") || url.startsWith("sftp://"))
        return "sftp";
      if (url.startsWith("smb://"))
        return "smb";
      return "http";
    };
    exports2.getConnectionProtocol = getConnectionProtocol2;
    function isAbortError(error2) {
      if (!error2)
        return false;
      if (typeof error2 === "string")
        return error2.startsWith("AbortError:");
      if (error2 instanceof DOMException)
        return error2.name === "AbortError";
      if (error2 instanceof Error) {
        return error2.name === "AbortError" || error2.message.startsWith("AbortError:");
      }
      return false;
    }
    function validateExternalUrl(raw) {
      const parsed = new URL(raw);
      if (!["http:", "https:"].includes(parsed.protocol)) {
        throw new Error(`Unsupported protocol: ${parsed.protocol}`);
      }
      const host = parsed.hostname.toLowerCase();
      if (host === "localhost" || host === "127.0.0.1" || host === "::1" || host === "0.0.0.0" || host.startsWith("169.254.") || host.endsWith(".internal")) {
        throw new Error(`URL target is not allowed: ${host}`);
      }
      return parsed;
    }
    exports2.ALLOWED_FILE_EXTENSIONS = [
      ".json",
      ".csv",
      ".txt",
      ".xml",
      ".xlsx",
      ".xls",
      ".pdf",
      ".docx",
      ".zip",
      ".gz",
      ".yaml",
      ".yml",
      // Code files (extracted as plain text)
      ".py",
      ".ts",
      ".tsx",
      ".js",
      ".jsx",
      ".java",
      ".go",
      ".rs",
      ".rb",
      ".php",
      ".c",
      ".cpp",
      ".h",
      ".hpp",
      ".cs",
      ".swift",
      ".kt",
      ".scala",
      ".sh",
      ".bash",
      ".sql",
      ".html",
      ".css",
      ".scss",
      ".md",
      ".rst"
    ];
    var SMALL_ARRAY_THRESHOLD = 100;
    var SAMPLE_SIZE2 = 50;
    var HEAD_SIZE = 15;
    var TAIL_SIZE = 15;
    var MAX_UNIQUE_SCHEMAS = 10;
    var DEEP_SIGNATURE_DEPTH = 5;
    var isPlainObject = (value) => {
      return value != null && typeof value === "object" && !Array.isArray(value) && !(value instanceof Date);
    };
    var sampleLargeArray = (data) => {
      const samples = [];
      for (let i = 0; i < Math.min(HEAD_SIZE, data.length); i++)
        samples.push(data[i]);
      const tailStart = Math.max(HEAD_SIZE, data.length - TAIL_SIZE);
      for (let i = tailStart; i < data.length; i++)
        samples.push(data[i]);
      const middleSize = SAMPLE_SIZE2 - samples.length;
      if (middleSize > 0 && data.length > HEAD_SIZE + TAIL_SIZE) {
        const middleStart = HEAD_SIZE;
        const middleEnd = tailStart;
        const reservoir = [];
        for (let i = middleStart; i < Math.min(middleStart + middleSize, middleEnd); i++)
          reservoir.push(data[i]);
        for (let i = middleStart + middleSize; i < middleEnd; i++) {
          const j = Math.floor(Math.random() * (i - middleStart + 1));
          if (j < middleSize)
            reservoir[j] = data[i];
        }
        samples.push(...reservoir);
      }
      return samples;
    };
    var getDeepStructureKey = (schema, depth = DEEP_SIGNATURE_DEPTH) => {
      if (depth === 0 || !schema || typeof schema !== "object")
        return schema?.type || "unknown";
      if (schema.type === "object" && schema.properties) {
        const propSigs = Object.keys(schema.properties).sort().map((key) => `${key}:${getDeepStructureKey(schema.properties[key], depth - 1)}`);
        return `{${propSigs.join(",")}}`;
      }
      if (schema.type === "array" && schema.items) {
        return `[${getDeepStructureKey(schema.items, depth - 1)}]`;
      }
      if (schema.oneOf) {
        const sigs = schema.oneOf.map((s) => getDeepStructureKey(s, depth - 1));
        return `oneOf(${sigs.join("|")})`;
      }
      return schema.type || "unknown";
    };
    function buildArraySchemaFromData(arr) {
      if (!arr || arr.length === 0)
        return { type: "array", items: {} };
      const hasObjects = arr.some((item) => isPlainObject(item));
      const samples = arr.length <= SMALL_ARRAY_THRESHOLD ? arr : sampleLargeArray(arr);
      if (hasObjects) {
        const uniqueSchemas = [];
        const schemaCache = /* @__PURE__ */ new Map();
        for (const item of samples) {
          if (!isPlainObject(item))
            continue;
          const itemSchema = (0, json_schema_js_1.toJsonSchema)(item, {
            arrays: { mode: "all" },
            objects: { additionalProperties: true }
          });
          const key = getDeepStructureKey(itemSchema);
          if (!schemaCache.has(key)) {
            schemaCache.set(key, itemSchema);
            uniqueSchemas.push(itemSchema);
            if (uniqueSchemas.length >= MAX_UNIQUE_SCHEMAS)
              break;
          }
        }
        if (uniqueSchemas.length > 1)
          return { type: "array", items: { oneOf: uniqueSchemas } };
        if (uniqueSchemas.length === 1)
          return { type: "array", items: uniqueSchemas[0] };
      }
      const base = (0, json_schema_js_1.toJsonSchema)(samples, {
        arrays: { mode: "all" },
        objects: { additionalProperties: true }
      });
      return base?.type === "array" ? base : { type: "array", items: base };
    }
    function enhanceSchemaWithData(value, schema) {
      if (!schema || typeof schema !== "object")
        return schema;
      if (Array.isArray(value)) {
        return buildArraySchemaFromData(value);
      }
      if (isPlainObject(value) && schema.type === "object" && schema.properties) {
        const enhanced = { ...schema, properties: { ...schema.properties } };
        for (const key of Object.keys(enhanced.properties)) {
          const childSchema = enhanced.properties[key];
          const childValue = value?.[key];
          if (Array.isArray(childValue) || isPlainObject(childValue)) {
            enhanced.properties[key] = enhanceSchemaWithData(childValue, childSchema);
          }
        }
        return enhanced;
      }
      if (schema.type === "array" && Array.isArray(value)) {
        return buildArraySchemaFromData(value);
      }
      return schema;
    }
    function flattenAndNamespaceCredentials(systems2) {
      return systems2.reduce((acc, sys) => {
        Object.entries(sys.credentials || {}).forEach(([key, value]) => {
          acc[`${sys.id}_${key}`] = value;
        });
        return acc;
      }, {});
    }
    function flattenAndNamespaceSystemUrls(systems2) {
      return systems2.reduce((acc, sys) => {
        if (sys.url) {
          acc[`${sys.id}_url`] = sys.url;
        }
        return acc;
      }, {});
    }
    function slugify2(value) {
      const slug = value.normalize("NFKD").replace(/[\u0300-\u036f]/g, "").toLowerCase().replace(/[^a-z0-9]+/g, "_").replace(/^_+|_+$/g, "");
      return slug || "system";
    }
    async function generateUniqueId({ baseId, exists }) {
      if (!await exists(baseId)) {
        return baseId;
      }
      let counter = 1;
      const match = baseId.match(/(.*)-(\d+)$/);
      let root = baseId;
      if (match) {
        root = match[1];
        counter = parseInt(match[2], 10) + 1;
      }
      while (true) {
        const newId = `${root}-${counter}`;
        if (!await exists(newId)) {
          return newId;
        }
        counter++;
      }
    }
    async function waitForSystemProcessing(systemGetter, systemIds, timeoutMs = 9e4) {
      const start = Date.now();
      while (Date.now() - start < timeoutMs) {
        let systems2;
        if (systemGetter.getManySystems) {
          systems2 = await systemGetter.getManySystems(systemIds);
        } else {
          const settled = await Promise.allSettled(systemIds.map(async (id) => {
            try {
              return await systemGetter.getSystem(id);
            } catch {
              return null;
            }
          }));
          systems2 = settled.map((r) => r.status === "fulfilled" ? r.value : null).filter(Boolean);
        }
        const hasPendingDocs = systems2.some((i) => i.documentationPending === true);
        if (!hasPendingDocs)
          return systems2;
        await new Promise((resolve5) => setTimeout(resolve5, 4e3));
      }
      throw new Error(`Waiting for documentation processing to complete timed out after ${timeoutMs / 1e3} seconds for: ${systemIds.join(", ")}. Please try again in a few minutes.`);
    }
    function inferJsonSchema(data) {
      if (!Array.isArray(data)) {
        const base = (0, json_schema_js_1.toJsonSchema)(data, {
          arrays: { mode: "all" },
          objects: { additionalProperties: true }
        });
        return enhanceSchemaWithData(data, base);
      }
      if (data.length === 0) {
        return { type: "array", items: {} };
      }
      return buildArraySchemaFromData(data);
    }
    function resolveOAuthCertAndKey(oauthCert, oauthKey) {
      let parsedCert = null;
      let parsedKey = null;
      try {
        if (oauthCert && oauthKey) {
          parsedCert = JSON.parse(oauthCert);
          parsedKey = JSON.parse(oauthKey);
        }
      } catch {
        return {
          cert: { content: void 0, filename: void 0 },
          key: { content: void 0, filename: void 0 }
        };
      }
      return { cert: parsedCert, key: parsedKey };
    }
    function isArrowFunction(code) {
      const text = (code || "").trim();
      if (!text)
        return false;
      return /^\s*(\([^)]*\)|[a-zA-Z_$][a-zA-Z0-9_$]*)\s*=>/.test(text);
    }
    function assertValidArrowFunction(code) {
      const text = (code || "").trim();
      if (!text)
        return `(sourceData) => {
  return {};
}`;
      if (text === "$")
        return `(sourceData) => {
  return sourceData;
}`;
      if (isArrowFunction(text)) {
        return text;
      }
      if (text.startsWith("//")) {
        throw new Error(`Found comment in code: ${text}.`);
      }
      throw new Error(`Invalid arrow function: ${text}. Expected a valid arrow function.`);
    }
    var NON_SENSITIVE_CREDENTIAL_KEYS = /* @__PURE__ */ new Set([
      "client_id",
      "auth_url",
      "token_url",
      "scopes",
      "grant_type",
      "redirect_uri",
      "audience",
      "host",
      "port",
      "database",
      "username",
      "region"
    ]);
    var isSensitiveCredentialKey = (key) => {
      return !NON_SENSITIVE_CREDENTIAL_KEYS.has(key.toLowerCase().trim());
    };
    exports2.isSensitiveCredentialKey = isSensitiveCredentialKey;
    var maskSystemCredentials = (credentials) => {
      if (!credentials)
        return void 0;
      return Object.fromEntries(Object.entries(credentials).map(([key, value]) => [
        key,
        (0, exports2.isSensitiveCredentialKey)(key) ? `<<masked_${key}>>` : value
      ]));
    };
    exports2.maskSystemCredentials = maskSystemCredentials;
    function isMaskedValue(value) {
      if (typeof value !== "string")
        return false;
      const v = value.trim();
      if (v.startsWith("<<") && v.endsWith(">>"))
        return true;
      if (v.startsWith("{masked_") && v.endsWith("}"))
        return true;
      return false;
    }
    function mergeCredentials(incoming, existing) {
      if (!incoming || Object.keys(incoming).length === 0) {
        return existing || {};
      }
      if (!existing || Object.keys(existing).length === 0) {
        return Object.fromEntries(Object.entries(incoming).filter(([_, v]) => !isMaskedValue(v) && v !== true));
      }
      const merged = { ...existing };
      for (const [key, value] of Object.entries(incoming)) {
        if (isMaskedValue(value))
          continue;
        if (value === true)
          continue;
        merged[key] = value;
      }
      return merged;
    }
    function maskCredentials(message, credentials) {
      if (!credentials) {
        return message;
      }
      let maskedMessage = message;
      const tokenMap = [];
      let tokenIndex = 0;
      Object.entries(credentials).sort(([, a], [, b]) => String(b).length - String(a).length).forEach(([key, value]) => {
        const valueString = String(value);
        if (value && valueString) {
          const token = `\0MASK_${tokenIndex++}\0`;
          tokenMap.push([token, `{masked_${key}}`]);
          const regex = new RegExp(valueString.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), "g");
          maskedMessage = maskedMessage.replace(regex, token);
        }
      });
      for (const [token, masked] of tokenMap) {
        maskedMessage = maskedMessage.split(token).join(masked);
      }
      return maskedMessage;
    }
    function sampleResultObject(value, sampleSize = 10, seen = /* @__PURE__ */ new WeakSet()) {
      if (value === null || value === void 0)
        return value;
      if (typeof value !== "object")
        return value;
      if (seen.has(value))
        return "[Circular]";
      seen.add(value);
      if (Array.isArray(value)) {
        const arrLength = value.length;
        if (arrLength <= sampleSize) {
          return value.map((item) => sampleResultObject(item, sampleSize, seen));
        }
        const newArray = value.slice(0, sampleSize).map((item) => sampleResultObject(item, sampleSize, seen));
        newArray.push(`sampled from ${arrLength} items`);
        return newArray;
      }
      if (value instanceof Date)
        return value.toISOString();
      if (value instanceof Map)
        return Object.fromEntries(Array.from(value.entries()).map(([k, v]) => [k, sampleResultObject(v, sampleSize, seen)]));
      if (value instanceof Set)
        return sampleResultObject(Array.from(value), sampleSize, seen);
      if (value instanceof RegExp)
        return value.toString();
      if (value instanceof Error)
        return { name: value.name, message: value.message };
      if (!isPlainObject(value))
        return String(value);
      return Object.entries(value).reduce((acc, [key, val]) => ({
        ...acc,
        [key]: sampleResultObject(val, sampleSize, seen)
      }), {});
    }
    function safeStringify(value, indent = 2) {
      const seen = /* @__PURE__ */ new WeakSet();
      try {
        return JSON.stringify(value, (key, val) => {
          if (typeof val === "object" && val !== null) {
            if (seen.has(val))
              return "[Circular]";
            seen.add(val);
          }
          if (typeof val === "bigint")
            return val.toString();
          if (typeof val === "function")
            return "[Function]";
          return val;
        }, indent);
      } catch (err) {
        return String(value ?? "");
      }
    }
    function truncateForLLM(value, maxChars = 5e3, sampleSize = 10) {
      if (value === void 0 || value === null)
        return "null";
      if (typeof value === "string") {
        return value.length <= maxChars ? value : value.slice(0, maxChars) + "... [truncated]";
      }
      const fullStr = safeStringify(value);
      if (fullStr.length <= maxChars)
        return fullStr;
      const sampled = sampleResultObject(value, sampleSize);
      const sampledStr = safeStringify(sampled);
      if (sampledStr.length <= maxChars)
        return sampledStr;
      return sampledStr.slice(0, maxChars) + "... [truncated]";
    }
    function getDateMessage() {
      return {
        role: "system",
        content: "The current date and time is " + (/* @__PURE__ */ new Date()).toISOString()
      };
    }
    function parseIconString(icon) {
      if (!icon)
        return null;
      const colonIndex = icon.indexOf(":");
      if (colonIndex === -1) {
        return { source: "simpleicons", name: icon };
      }
      const source = icon.substring(0, colonIndex);
      const name = icon.substring(colonIndex + 1);
      if (source !== "simpleicons" && source !== "lucide") {
        return { source: "simpleicons", name: icon };
      }
      return { source, name };
    }
    function serializeIcon(icon) {
      if (!icon)
        return null;
      if (typeof icon === "string") {
        const colonIndex = icon.indexOf(":");
        if (colonIndex !== -1) {
          return icon;
        }
        return `simpleicons:${icon}`;
      }
      return `${icon.source}:${icon.name}`;
    }
    function normalizeToolDiff(diff) {
      if (diff.op === "remove" || diff.value === void 0 || typeof diff.value !== "string") {
        return diff;
      }
      const shouldAlwaysBeObject = diff.path === "/inputSchema" || diff.path === "/outputSchema" || diff.path.startsWith("/inputSchema/properties/") || diff.path.startsWith("/outputSchema/properties/") || diff.path.match(/^\/steps\/\d+\/config\/pagination$/) || diff.path.match(/^\/steps\/\d+\/config\/headers$/) || diff.path.match(/^\/steps\/\d+\/config\/queryParams$/);
      if (shouldAlwaysBeObject) {
        try {
          return { ...diff, value: JSON.parse(diff.value) };
        } catch {
          return diff;
        }
      }
      return diff;
    }
    function normalizeToolDiffs(diffs) {
      return diffs.map((diff) => normalizeToolDiff(diff));
    }
    function composeUrl(host, path7) {
      if (!host)
        host = "";
      if (!path7)
        path7 = "";
      if (!/^(https?|postgres(ql)?|ftp(s)?|sftp|smb|file):\/\//i.test(host)) {
        host = `https://${host}`;
      }
      const cleanHost = host.endsWith("/") ? host.slice(0, -1) : host;
      const cleanPath = path7.startsWith("/") ? path7.slice(1) : path7;
      return `${cleanHost}/${cleanPath}`;
    }
    var detectSystemAuthType = (credentials) => {
      if (!credentials || Object.keys(credentials).length === 0)
        return "none";
      const oauthFields = [
        "auth_url",
        "token_url",
        "client_id",
        "client_secret",
        "access_token",
        "refresh_token"
      ];
      const hasOAuthFields = oauthFields.some((field) => field in credentials);
      if (hasOAuthFields)
        return "oauth";
      return "apikey";
    };
    exports2.detectSystemAuthType = detectSystemAuthType;
    var getSystemAuthStatus = (system) => {
      const creds = system.credentials || {};
      const authType = (0, exports2.detectSystemAuthType)(creds);
      const isMultiTenancy = system.multiTenancyMode === "enabled";
      if (authType === "none") {
        return { authType: "none", isComplete: true, label: "No auth" };
      }
      if (authType === "oauth") {
        if (isMultiTenancy) {
          const hasAuthUrl = Boolean(creds.auth_url);
          const hasTokenUrl = Boolean(creds.token_url);
          const hasClientId = Boolean(creds.client_id);
          const isComplete2 = hasAuthUrl && hasTokenUrl && hasClientId;
          return {
            authType: "oauth",
            isComplete: isComplete2,
            label: isComplete2 ? "Ready for end users" : "OAuth template incomplete"
          };
        }
        const grantType = creds.grant_type || "authorization_code";
        const hasAccessToken = Boolean(creds.access_token);
        const hasRefreshToken = Boolean(creds.refresh_token);
        const isComplete = grantType === "client_credentials" ? hasAccessToken : hasAccessToken && hasRefreshToken;
        return {
          authType: "oauth",
          isComplete,
          label: isComplete ? "OAuth configured" : "OAuth incomplete"
        };
      }
      const hasKeys = Object.keys(creds).length > 0;
      if (isMultiTenancy) {
        return {
          authType: "apikey",
          isComplete: hasKeys,
          label: hasKeys ? "Ready for end users" : "No credential fields"
        };
      }
      return {
        authType: "apikey",
        isComplete: hasKeys,
        label: hasKeys ? "API Key configured" : "No credentials"
      };
    };
    exports2.getSystemAuthStatus = getSystemAuthStatus;
    exports2.ALLOWED_PATCH_SYSTEM_FIELDS = [
      "name",
      "url",
      "specificInstructions",
      "icon",
      "credentials",
      "metadata",
      "templateName",
      "multiTenancyMode",
      "documentationFiles",
      "tunnel"
      // Note: "environment" is NOT patchable because it's part of the composite primary key
    ];
    var SAMPLEABLE_KEYS = /* @__PURE__ */ new Set([
      "data",
      "stepResults",
      "toolPayload",
      "rawData",
      "transformedData"
    ]);
    var DEFAULT_MAX_LENGTH = 8e4;
    function truncateRunResult(result, maxLength = DEFAULT_MAX_LENGTH) {
      if (result === null || result === void 0)
        return result;
      let data = result;
      if (typeof result === "string") {
        if (result.length <= maxLength)
          return result;
        try {
          data = JSON.parse(result);
        } catch {
          return {
            _truncated: true,
            _message: "String result too large to parse",
            _size: result.length
          };
        }
      }
      if (typeof data !== "object")
        return data;
      let truncatedCount = 0;
      let originalSize = 0;
      const truncateSampleableFields = (value, depth = 0) => {
        if (depth > 20)
          return value;
        if (value === null || typeof value !== "object")
          return value;
        if (Array.isArray(value)) {
          return value.map((item) => truncateSampleableFields(item, depth + 1));
        }
        const obj = {};
        for (const [key, val] of Object.entries(value)) {
          if (SAMPLEABLE_KEYS.has(key) && val !== null && typeof val === "object") {
            const valString = JSON.stringify(val);
            if (valString.length > maxLength) {
              originalSize += valString.length;
              try {
                const { jsonString: truncated, truncatedProps } = (0, truncate_json_1.default)(valString, maxLength);
                obj[key] = JSON.parse(truncated);
                truncatedCount += truncatedProps.length;
              } catch {
                obj[key] = val;
              }
            } else {
              obj[key] = val;
            }
          } else {
            obj[key] = truncateSampleableFields(val, depth + 1);
          }
        }
        return obj;
      };
      try {
        const fullString = JSON.stringify(data);
        if (fullString.length <= maxLength)
          return data;
        const truncated = truncateSampleableFields(data);
        if (truncatedCount > 0 && typeof truncated === "object" && truncated !== null) {
          truncated._note = `Result truncated: ${truncatedCount} items omitted (original ${originalSize} characters)`;
        }
        return truncated;
      } catch {
        return {
          _truncated: true,
          _message: "Result too large to display"
        };
      }
    }
    function getToolSystemIds(tool) {
      if (!tool.steps)
        return [];
      const ids = /* @__PURE__ */ new Set();
      for (const step of tool.steps) {
        if (step.config && (0, types_js_1.isRequestConfig)(step.config) && step.config.systemId) {
          ids.add(step.config.systemId);
        }
      }
      return Array.from(ids);
    }
    function isProductionSystem(system) {
      return system.environment !== "dev";
    }
  }
});

// ../shared/dist/utils/vm-helpers.js
var require_vm_helpers = __commonJS({
  "../shared/dist/utils/vm-helpers.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.VM_HELPERS_CODE = void 0;
    exports2.executeWithVMHelpers = executeWithVMHelpers;
    function executeWithVMHelpers(code, sourceData) {
      const trimmedCode = code.replace(/;\s*$/, "");
      const wrappedCode = `
    ${exports2.VM_HELPERS_CODE}
    
    const fn = (
      ${trimmedCode}
    );
    return fn(sourceData);
  `;
      try {
        const fn = new Function("sourceData", wrappedCode);
        return fn(sourceData);
      } catch (error2) {
        throw new Error(`Code execution failed: ${error2 instanceof Error ? error2.message : String(error2)}`);
      }
    }
    exports2.VM_HELPERS_CODE = `
  // String.prototype.matchAll polyfill
  if (!String.prototype.matchAll) {
    String.prototype.matchAll = function(regexp) {
      if (typeof regexp === 'string') {
        regexp = new RegExp(regexp, 'g');
      }
      if (!(regexp instanceof RegExp)) {
        regexp = new RegExp(regexp, 'g');
      }
      if (!regexp.global) {
        throw new TypeError('matchAll requires a global RegExp');
      }
      const matches = [];
      const str = this;
      const regex = new RegExp(regexp.source, regexp.flags);
      let match;
      while ((match = regex.exec(str)) !== null) {
        matches.push(match);
      }
      return matches[Symbol.iterator] ? matches[Symbol.iterator]() : (function* () {
        for (let i = 0; i < matches.length; i++) {
          yield matches[i];
        }
      })();
    };
  }
  
  // String.prototype.replaceAll polyfill
  if (!String.prototype.replaceAll) {
    String.prototype.replaceAll = function(search, replace) {
      if (search instanceof RegExp) {
        if (!search.global) {
          throw new TypeError('replaceAll requires a global RegExp');
        }
        return this.replace(search, replace);
      }
      if (typeof replace === 'function') {
        const parts = this.split(search);
        let result = parts[0];
        for (let i = 1; i < parts.length; i++) {
          result += replace(search, result.length, this) + parts[i];
        }
        return result;
      }
      return this.split(search).join(replace);
    };
  }
  
  // Array.prototype.flat polyfill
  if (!Array.prototype.flat) {
    Array.prototype.flat = function(depth) {
      depth = depth === undefined ? 1 : Math.floor(depth);
      if (depth < 1) return Array.prototype.slice.call(this);
      return (function flatten(arr, d) {
        return arr.reduce(function(acc, val) {
          return acc.concat(d > 1 && Array.isArray(val) ? flatten(val, d - 1) : val);
        }, []);
      })(this, depth);
    };
  }
  
  // Array.prototype.flatMap polyfill
  if (!Array.prototype.flatMap) {
    Array.prototype.flatMap = function(callback, thisArg) {
      return this.map(callback, thisArg).flat(1);
    };
  }
  
  // Object.fromEntries polyfill
  if (!Object.fromEntries) {
    Object.fromEntries = function(entries) {
      const obj = {};
      for (const [key, value] of entries) {
        obj[key] = value;
      }
      return obj;
    };
  }
  
  // String.prototype.trimStart/trimEnd polyfills
  if (!String.prototype.trimStart) {
    String.prototype.trimStart = function() {
      return this.replace(/^\\s+/, '');
    };
    String.prototype.trimLeft = String.prototype.trimStart;
  }
  if (!String.prototype.trimEnd) {
    String.prototype.trimEnd = function() {
      return this.replace(/\\s+$/, '');
    };
    String.prototype.trimRight = String.prototype.trimEnd;
  }
  
  // String.prototype.padStart/padEnd polyfills
  if (!String.prototype.padStart) {
    String.prototype.padStart = function(targetLength, padString) {
      targetLength = targetLength >> 0;
      padString = String(typeof padString !== 'undefined' ? padString : ' ');
      if (this.length >= targetLength || padString.length === 0) {
        return String(this);
      }
      targetLength = targetLength - this.length;
      if (targetLength > padString.length) {
        const repeatCount = Math.ceil(targetLength / padString.length);
        padString = padString.repeat(repeatCount);
      }
      return padString.slice(0, targetLength) + String(this);
    };
  }
  if (!String.prototype.padEnd) {
    String.prototype.padEnd = function(targetLength, padString) {
      targetLength = targetLength >> 0;
      padString = String(typeof padString !== 'undefined' ? padString : ' ');
      if (this.length >= targetLength || padString.length === 0) {
        return String(this);
      }
      targetLength = targetLength - this.length;
      if (targetLength > padString.length) {
        const repeatCount = Math.ceil(targetLength / padString.length);
        padString = padString.repeat(repeatCount);
      }
      return String(this) + padString.slice(0, targetLength);
    };
  }
  
  // Array.prototype.at polyfill
  if (!Array.prototype.at) {
    Array.prototype.at = function(index) {
      index = Math.trunc(index) || 0;
      const len = this.length;
      const relativeIndex = index >= 0 ? index : len + index;
      if (relativeIndex < 0 || relativeIndex >= len) {
        return undefined;
      }
      return this[relativeIndex];
    };
    String.prototype.at = Array.prototype.at;
  }
  
  // Array.prototype.findLast/findLastIndex polyfills
  if (!Array.prototype.findLast) {
    Array.prototype.findLast = function(callback, thisArg) {
      for (let i = this.length - 1; i >= 0; i--) {
        if (callback.call(thisArg, this[i], i, this)) {
          return this[i];
        }
      }
      return undefined;
    };
  }
  if (!Array.prototype.findLastIndex) {
    Array.prototype.findLastIndex = function(callback, thisArg) {
      for (let i = this.length - 1; i >= 0; i--) {
        if (callback.call(thisArg, this[i], i, this)) {
          return i;
        }
      }
      return -1;
    };
  }
  
  // Object.hasOwn polyfill
  if (!Object.hasOwn) {
    Object.hasOwn = function(obj, prop) {
      return Object.prototype.hasOwnProperty.call(obj, prop);
    };
  }
  
  // Base64 encoding
  if (typeof btoa === 'undefined') {
    btoa = function(str) {
      if (!str) return '';
      
      const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';
      let binary = '';
      
      // Convert string to binary
      for (let i = 0; i < str.length; i++) {
        const code = str.charCodeAt(i);
        if (code > 255) {
          throw new Error('btoa failed: The string to be encoded contains characters outside of the Latin1 range.');
        }
        binary += code.toString(2).padStart(8, '0');
      }
      
      // Pad binary to make it divisible by 6
      while (binary.length % 6 !== 0) {
        binary += '0';
      }
      
      let result = '';
      
      // Convert 6-bit chunks to base64 characters
      for (let i = 0; i < binary.length; i += 6) {
        const chunk = binary.substr(i, 6);
        const index = parseInt(chunk, 2);
        result += chars[index];
      }
      
      // Add padding
      while (result.length % 4 !== 0) {
        result += '=';
      }
      
      return result;
    };
  }
  
  // Base64 decoding
  if (typeof atob === 'undefined') {
    atob = function(str) {
      if (!str) return '';
      str = str.replace(/-/g, '+').replace(/_/g, '/');
      
      const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';
      str = str.replace(/=+$/, '');
      
      let binary = '';
      for (let i = 0; i < str.length; i++) {
        const index = chars.indexOf(str[i]);
        if (index === -1) continue;
        binary += index.toString(2).padStart(6, '0');
      }
      
      const bytes = [];
      for (let i = 0; i < binary.length; i += 8) {
        if (i + 8 <= binary.length) {
          bytes.push(parseInt(binary.substr(i, 8), 2));
        }
      }
      
      let result = '';
      for (let i = 0; i < bytes.length; i++) {
        result += String.fromCharCode(bytes[i]);
      }
      
      return result;
    };
  }
  
  // escape function - matches standard escape() with %uXXXX for non-ASCII, keeps ! unencoded for API compatibility
    escape = function(str) {
      let result = '';
      for (let i = 0; i < str.length; i++) {
        const code = str.charCodeAt(i);
        if (/[A-Za-z0-9@*_+.-/!~'()]/.test(str[i])) {
          result += str[i];
        } else if (code < 256) {
            result += '%' + code.toString(16).toUpperCase().padStart(2, '0');
        } else {
          result += '%u' + code.toString(16).toUpperCase().padStart(4, '0');
        }
      }
      return result;
    };
  
  // decodeURIComponent - handles UTF-8 multi-byte sequences
  if (typeof decodeURIComponent === 'undefined') {
    decodeURIComponent = function(str) {
      const decoded = str.replace(/%([0-9A-F]{2})/gi, (_, hex) => String.fromCharCode(parseInt(hex, 16)));
      try {
        const bytes = [];
        for (let i = 0; i < decoded.length; i++) bytes.push(decoded.charCodeAt(i));
        let result = '', j = 0;
        while (j < bytes.length) {
          const b = bytes[j];
          if (b < 0x80) { result += String.fromCharCode(b); j++; }
          else if ((b & 0xE0) === 0xC0 && j + 1 < bytes.length) {
            result += String.fromCharCode(((b & 0x1F) << 6) | (bytes[j+1] & 0x3F)); j += 2;
          } else if ((b & 0xF0) === 0xE0 && j + 2 < bytes.length) {
            result += String.fromCharCode(((b & 0x0F) << 12) | ((bytes[j+1] & 0x3F) << 6) | (bytes[j+2] & 0x3F)); j += 3;
          } else if ((b & 0xF8) === 0xF0 && j + 3 < bytes.length) {
            const cp = ((b & 0x07) << 18) | ((bytes[j+1] & 0x3F) << 12) | ((bytes[j+2] & 0x3F) << 6) | (bytes[j+3] & 0x3F);
            result += String.fromCodePoint(cp); j += 4;
          } else { result += String.fromCharCode(b); j++; }
        }
        return result;
      } catch { return decoded; }
    };
  }
  
  // Buffer object
  if (typeof Buffer === 'undefined') {
    Buffer = {
      from: function(str, encoding) {
        if (encoding === 'base64') {
          return {
            toString: function(enc) {
              if (enc === 'utf-8' || enc === 'utf8') {
                const decoded = atob(str);
                // Proper UTF-8 decoding
                const bytes = [];
                for (let i = 0; i < decoded.length; i++) {
                  bytes.push(decoded.charCodeAt(i));
                }
                
                let result = '';
                let i = 0;
                while (i < bytes.length) {
                  const byte1 = bytes[i];
                  
                  if (byte1 < 0x80) {
                    // 1-byte sequence (ASCII)
                    result += String.fromCharCode(byte1);
                    i++;
                  } else if ((byte1 & 0xE0) === 0xC0) {
                    // 2-byte sequence
                    const byte2 = bytes[i + 1];
                    const codePoint = ((byte1 & 0x1F) << 6) | (byte2 & 0x3F);
                    result += String.fromCharCode(codePoint);
                    i += 2;
                  } else if ((byte1 & 0xF0) === 0xE0) {
                    // 3-byte sequence
                    const byte2 = bytes[i + 1];
                    const byte3 = bytes[i + 2];
                    const codePoint = ((byte1 & 0x0F) << 12) | ((byte2 & 0x3F) << 6) | (byte3 & 0x3F);
                    result += String.fromCharCode(codePoint);
                    i += 3;
                  } else if ((byte1 & 0xF8) === 0xF0) {
                    // 4-byte sequence (surrogate pairs for JS)
                    const byte2 = bytes[i + 1];
                    const byte3 = bytes[i + 2];
                    const byte4 = bytes[i + 3];
                    const codePoint = ((byte1 & 0x07) << 18) | ((byte2 & 0x3F) << 12) | ((byte3 & 0x3F) << 6) | (byte4 & 0x3F);
                    
                    // Convert to surrogate pair
                    const temp = codePoint - 0x10000;
                    result += String.fromCharCode((temp >> 10) + 0xD800, (temp & 0x3FF) + 0xDC00);
                    i += 4;
                  } else {
                    // Invalid sequence, skip
                    i++;
                  }
                }
                
                return result;
              }
              return str;
            }
          };
        }
        // Default: treat as string to encode
        return { 
          toString: function(enc) { 
            if (enc === 'base64') {
              return btoa(str);
            }
            return str; 
          } 
        };
      }
    };
  }
  
  // URL constructor (simplified version for frontend - backend will override with native implementation)
  if (typeof URL === 'undefined' || !URL.prototype) {
    const NativeURL = typeof window !== 'undefined' && window.URL ? window.URL : (typeof globalThis !== 'undefined' && globalThis.URL ? globalThis.URL : null);
    if (NativeURL) {
      URL = function(url, base) {
        try {
          const parsed = new NativeURL(url, base);
          Object.assign(this, {
            href: parsed.href,
            protocol: parsed.protocol,
            host: parsed.host,
            hostname: parsed.hostname,
            port: parsed.port,
            pathname: parsed.pathname,
            search: parsed.search,
            hash: parsed.hash,
            origin: parsed.origin,
            searchParams: Object.fromEntries(parsed.searchParams.entries())
          });
          this.toString = function() { return this.href; };
          this.toJSON = function() { return this.href; };
        } catch (error) {
          throw new Error(error.message);
        }
      };
    }
    // If no native URL available (e.g., isolated-vm), leave it undefined - backend will inject it
  }
  
  // crypto.randomUUID
  if (typeof crypto === 'undefined' || !crypto.randomUUID) {
    if (typeof crypto === 'undefined') {
      crypto = {};
    }
    crypto.randomUUID = function() {
      return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        const r = Math.random() * 16 | 0;
        const v = c === 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
      });
    };
  }
`;
  }
});

// ../shared/dist/utils/cli-oauth.js
var require_cli_oauth = __commonJS({
  "../shared/dist/utils/cli-oauth.js"(exports2) {
    "use strict";
    var __importDefault = exports2 && exports2.__importDefault || function(mod) {
      return mod && mod.__esModule ? mod : { "default": mod };
    };
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.encryptCliApiKey = encryptCliApiKey2;
    exports2.decryptCliApiKey = decryptCliApiKey;
    var node_crypto_1 = __importDefault(require("crypto"));
    function encryptCliApiKey2(apiKey, systemId, secret) {
      if (!secret) {
        throw new Error("Server secret required for CLI OAuth encryption");
      }
      const key = node_crypto_1.default.createHash("sha256").update(`${secret}:cli-oauth:${systemId}`).digest();
      const iv = node_crypto_1.default.randomBytes(12);
      const cipher = node_crypto_1.default.createCipheriv("aes-256-gcm", key, iv);
      let encrypted = cipher.update(apiKey, "utf8", "hex");
      encrypted += cipher.final("hex");
      const authTag = cipher.getAuthTag().toString("hex");
      return `${iv.toString("hex")}:${encrypted}:${authTag}`;
    }
    function decryptCliApiKey(encrypted, systemId, secret) {
      if (!secret) {
        return null;
      }
      try {
        const [ivHex, encryptedHex, authTagHex] = encrypted.split(":");
        if (!ivHex || !encryptedHex || !authTagHex)
          return null;
        const key = node_crypto_1.default.createHash("sha256").update(`${secret}:cli-oauth:${systemId}`).digest();
        const iv = Buffer.from(ivHex, "hex");
        const authTag = Buffer.from(authTagHex, "hex");
        const decipher = node_crypto_1.default.createDecipheriv("aes-256-gcm", key, iv);
        decipher.setAuthTag(authTag);
        let decrypted = decipher.update(encryptedHex, "hex", "utf8");
        decrypted += decipher.final("utf8");
        return decrypted;
      } catch {
        return null;
      }
    }
  }
});

// ../shared/dist/sse-log-subscription.js
var require_sse_log_subscription = __commonJS({
  "../shared/dist/sse-log-subscription.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.SSELogSubscriptionManager = void 0;
    var types_js_1 = require_types();
    var SSELogSubscriptionManager = class {
      constructor(apiEndpoint, apiKey) {
        this.controllers = /* @__PURE__ */ new Map();
        this.apiEndpoint = apiEndpoint.replace(/\/$/, "");
        this.apiKey = apiKey;
      }
      async subscribeToLogs(options = {}) {
        const controller = new AbortController();
        const subscriptionId = Math.random().toString(36).substring(2, 15);
        this.controllers.set(subscriptionId, controller);
        const params = new URLSearchParams();
        if (options.traceId)
          params.set("traceId", options.traceId);
        const url = `${this.apiEndpoint}/v1/logs/stream${params.toString() ? `?${params}` : ""}`;
        const cleanup = () => this.controllers.delete(subscriptionId);
        const startStream = async () => {
          try {
            const response = await fetch(url, {
              headers: { Authorization: `Bearer ${this.apiKey}` },
              signal: controller.signal
            });
            if (!response.ok || !response.body) {
              cleanup();
              options.onError?.(new Error(`SSE connection failed: ${response.status}`));
              return;
            }
            const reader = response.body.getReader();
            const decoder = new TextDecoder();
            let buffer = "";
            while (true) {
              const { done, value } = await reader.read();
              if (done)
                break;
              buffer += decoder.decode(value, { stream: true });
              const lines = buffer.split("\n");
              buffer = lines.pop() || "";
              for (const line of lines) {
                if (!line.startsWith("data: "))
                  continue;
                try {
                  const log = JSON.parse(line.slice(6));
                  log.timestamp = new Date(log.timestamp);
                  if (options.traceId && log.traceId !== options.traceId)
                    continue;
                  if (!options.includeDebug && log.level === types_js_1.LogLevel.DEBUG)
                    continue;
                  options.onLog?.(log);
                } catch {
                }
              }
            }
            cleanup();
            options.onComplete?.();
          } catch (error2) {
            cleanup();
            if (error2.name === "AbortError")
              return;
            options.onError?.(error2);
          }
        };
        startStream();
        return {
          unsubscribe: () => {
            const ctrl = this.controllers.get(subscriptionId);
            if (ctrl) {
              ctrl.abort();
              this.controllers.delete(subscriptionId);
            }
          }
        };
      }
      async disconnect() {
        for (const [id, controller] of this.controllers) {
          controller.abort();
        }
        this.controllers.clear();
      }
    };
    exports2.SSELogSubscriptionManager = SSELogSubscriptionManager;
  }
});

// ../shared/dist/superglue-client.js
var require_superglue_client = __commonJS({
  "../shared/dist/superglue-client.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.SuperglueClient = void 0;
    var types_js_1 = require_types();
    var sse_log_subscription_js_1 = require_sse_log_subscription();
    var utils_js_1 = require_utils();
    var SuperglueClient3 = class {
      constructor({ apiKey, apiEndpoint, onInfrastructureError }) {
        this.apiKey = apiKey;
        this.apiEndpoint = apiEndpoint ?? "https://api.superglue.cloud";
        this.sseManager = new sse_log_subscription_js_1.SSELogSubscriptionManager(this.apiEndpoint, this.apiKey);
        this.onInfrastructureError = onInfrastructureError;
      }
      isInfrastructureError(error2) {
        if ((0, utils_js_1.isAbortError)(error2))
          return false;
        if (error2 instanceof TypeError && error2.message.toLowerCase().includes("fetch"))
          return true;
        if (error2 instanceof Error && error2.name === "TimeoutError")
          return true;
        return false;
      }
      async restRequest(method, path7, body, extraHeaders, requestInit) {
        const url = `${this.apiEndpoint.replace(/\/$/, "")}${path7}`;
        const headers = {
          Authorization: `Bearer ${this.apiKey}`,
          ...extraHeaders
        };
        if (body && method !== "GET") {
          headers["Content-Type"] = "application/json";
        }
        let response;
        try {
          response = await fetch(url, {
            method,
            headers,
            body: body ? JSON.stringify(body) : void 0,
            signal: requestInit?.signal
          });
        } catch (error2) {
          if (this.isInfrastructureError(error2)) {
            this.onInfrastructureError?.();
          }
          throw error2;
        }
        if (!response.ok) {
          if (response.status >= 500) {
            this.onInfrastructureError?.();
          }
          const errorText = await response.text();
          let errorMessage = `HTTP ${response.status}: ${errorText}`;
          try {
            const errorJson = JSON.parse(errorText);
            const error2 = errorJson.error;
            if (typeof error2 === "string") {
              errorMessage = error2;
            } else if (error2 && typeof error2 === "object") {
              errorMessage = error2.message || JSON.stringify(error2);
            }
          } catch {
          }
          throw new Error(errorMessage);
        }
        const text = await response.text();
        if (!text)
          return void 0;
        return JSON.parse(text);
      }
      async subscribeToLogsSSE(options = {}) {
        return this.sseManager.subscribeToLogs(options);
      }
      async disconnect() {
        await this.sseManager.disconnect();
      }
      /**
       * Execute a saved tool by ID (creates run record)
       */
      async runTool(params) {
        const response = await this.restRequest("POST", `/v1/tools/${encodeURIComponent(params.toolId)}/run`, {
          inputs: params.payload,
          credentials: params.credentials,
          options: params.options,
          runId: params.runId
        });
        return {
          success: response.status === "success",
          data: response.data,
          error: response.error,
          tool: response.tool,
          stepResults: response.stepResults?.map((sr) => ({
            stepId: sr.stepId,
            success: sr.success,
            data: sr.data,
            error: sr.error
          }))
        };
      }
      /**
       * Execute a tool config directly without persisting the tool.
       * Optionally creates a run record when `createRun` is true.
       */
      async runToolConfig(params) {
        const path7 = params.createRun ? "/v1/tools/run?createRun=true" : "/v1/tools/run";
        const response = await this.restRequest("POST", path7, {
          tool: params.tool,
          payload: params.payload,
          credentials: params.credentials,
          options: params.options,
          runId: params.runId
        }, params.traceId ? { "X-Trace-Id": params.traceId } : void 0);
        return {
          success: response.success,
          data: response.data,
          error: response.error,
          tool: response.tool,
          stepResults: response.stepResults?.map((sr) => ({
            stepId: sr.stepId,
            success: sr.success,
            data: sr.data,
            error: sr.error
          }))
        };
      }
      async abortToolExecution(runId) {
        const response = await this.restRequest("POST", `/v1/runs/${encodeURIComponent(runId)}/cancel`);
        return { success: true, runId: response.runId };
      }
      /**
       * Execute a single step without creating a run in the database.
       * Used for individual step testing in the playground.
       */
      async executeStep({ step, payload, previousResults, credentials, options, runId, mode, systemIds }) {
        return this.restRequest("POST", "/v1/tools/step/run", {
          step,
          payload,
          previousResults,
          credentials,
          options,
          runId,
          mode,
          systemIds
        });
      }
      /**
       * Abort an in-flight step execution by runId.
       */
      async abortStep(runId) {
        return this.restRequest("POST", "/v1/tools/step/abort", { runId });
      }
      /**
       * Execute a final transform without creating a run in the database.
       * Used for transform testing in the playground.
       */
      async executeTransformOnly({ outputTransform, outputSchema, inputSchema, payload, stepResults, responseFilters, options, runId }) {
        return this.restRequest("POST", "/v1/tools/transform/run", {
          outputTransform,
          outputSchema,
          inputSchema,
          payload,
          stepResults,
          responseFilters,
          options,
          runId
        });
      }
      /**
       * Create a run entry in the database after manual tool execution.
       * Used when "Run All Steps" completes in the playground.
       */
      async createRun({ toolId, toolConfig, toolResult, stepResults, toolPayload, status, error: error2, startedAt, completedAt }) {
        return this.restRequest("POST", "/v1/runs", {
          toolId,
          toolConfig,
          toolResult,
          stepResults,
          toolPayload,
          status,
          error: error2,
          startedAt: startedAt.toISOString(),
          completedAt: completedAt.toISOString()
        });
      }
      async extract({ file }) {
        if (!file) {
          throw new Error("File must be provided for extract.");
        }
        const formData = new FormData();
        formData.append("file", file);
        const url = `${this.apiEndpoint.replace(/\/$/, "")}/v1/extract`;
        const response = await fetch(url, {
          method: "POST",
          headers: {
            Authorization: `Bearer ${this.apiKey}`
          },
          body: formData
        });
        if (!response.ok) {
          const errorText = await response.text();
          let errorMessage = `HTTP ${response.status}: ${errorText}`;
          try {
            const errorJson = JSON.parse(errorText);
            if (errorJson.error)
              errorMessage = errorJson.error;
          } catch {
          }
          throw new Error(errorMessage);
        }
        return response.json();
      }
      mapOpenAPIRunToRun(openAPIRun) {
        const statusMap = {
          running: types_js_1.RunStatus.RUNNING,
          success: types_js_1.RunStatus.SUCCESS,
          failed: types_js_1.RunStatus.FAILED,
          aborted: types_js_1.RunStatus.ABORTED
        };
        return {
          runId: openAPIRun.runId ?? openAPIRun.id,
          toolId: openAPIRun.toolId,
          tool: openAPIRun.tool,
          status: statusMap[openAPIRun.status] ?? types_js_1.RunStatus.FAILED,
          toolPayload: openAPIRun.toolPayload,
          data: openAPIRun.data,
          toolResult: openAPIRun.data,
          error: openAPIRun.error,
          stepResults: openAPIRun.stepResults,
          options: openAPIRun.options,
          requestSource: openAPIRun.requestSource,
          traceId: openAPIRun.traceId,
          resultStorageUri: openAPIRun.resultStorageUri,
          userId: openAPIRun.userId,
          userEmail: openAPIRun.userEmail,
          userName: openAPIRun.userName,
          metadata: openAPIRun.metadata
        };
      }
      async listRuns(options) {
        const { limit = 100, page = 1, toolId, search, searchUserIds, includeTotal = true, startedAfter, status, requestSources, userId, systemId, signal } = options ?? {};
        const params = new URLSearchParams({
          limit: String(limit),
          page: String(page)
        });
        if (toolId)
          params.set("toolId", toolId);
        if (search?.trim())
          params.set("search", search.trim());
        if (searchUserIds && searchUserIds.length > 0) {
          params.set("searchUserIds", searchUserIds.join(","));
        }
        if (!includeTotal)
          params.set("includeTotal", "false");
        if (startedAfter) {
          params.set("startedAfter", startedAfter instanceof Date ? startedAfter.toISOString() : startedAfter);
        }
        if (status)
          params.set("status", status);
        if (requestSources && requestSources.length > 0) {
          params.set("requestSources", requestSources.join(","));
        }
        if (userId)
          params.set("userId", userId);
        if (systemId)
          params.set("systemId", systemId);
        const response = await this.restRequest("GET", `/v1/runs?${params.toString()}`, void 0, void 0, { signal });
        return {
          items: response.data.map((run) => this.mapOpenAPIRunToRun(run)),
          total: response.total,
          page: response.page,
          limit: response.limit,
          hasMore: response.hasMore
        };
      }
      async getRun(id) {
        try {
          const response = await this.restRequest("GET", `/v1/runs/${encodeURIComponent(id)}`);
          return this.mapOpenAPIRunToRun(response);
        } catch (err) {
          if (err.message?.includes("404") || err.message?.includes("not found")) {
            return null;
          }
          throw err;
        }
      }
      async getWorkflow(id) {
        try {
          return await this.restRequest("GET", `/v1/tools/${encodeURIComponent(id)}`);
        } catch (err) {
          if (err.message?.includes("404") || err.message?.includes("not found")) {
            return null;
          }
          if (err.message?.includes("403") || err.message?.includes("not allowed")) {
            return null;
          }
          throw err;
        }
      }
      async archiveWorkflow(id, archived = true) {
        return this.upsertWorkflow(id, { archived });
      }
      async listWorkflows(limit = 10, offset = 0, includeArchived = false) {
        const page = Math.floor(offset / limit) + 1;
        const archiveParam = includeArchived ? "&includeArchived=true" : "";
        const response = await this.restRequest("GET", `/v1/tools?limit=${limit}&page=${page}${archiveParam}`);
        return { items: response.data, total: response.total };
      }
      async upsertWorkflow(id, input) {
        const existing = await this.getWorkflow(id);
        if (existing) {
          return this.restRequest("PUT", `/v1/tools/${encodeURIComponent(id)}`, input);
        } else {
          return this.restRequest("POST", "/v1/tools", { id, ...input });
        }
      }
      async deleteWorkflow(id) {
        try {
          await this.restRequest("DELETE", `/v1/tools/${encodeURIComponent(id)}`);
          return true;
        } catch (err) {
          if (err.message?.includes("404")) {
            return false;
          }
          throw err;
        }
      }
      async renameWorkflow(oldId, newId) {
        return this.restRequest("POST", `/v1/tools/${encodeURIComponent(oldId)}/rename`, {
          newId
        });
      }
      async listSystems(limit = 10, page = 1, options) {
        const params = new URLSearchParams({
          limit: String(limit),
          page: String(page)
        });
        if (options?.mode) {
          params.set("mode", options.mode);
        }
        const response = await this.restRequest("GET", `/v1/systems?${params.toString()}`);
        return { items: response.data, total: response.total };
      }
      async getSystem(id, options) {
        const queryParams = options?.environment ? `?env=${options.environment}` : "";
        const response = await this.restRequest("GET", `/v1/systems/${encodeURIComponent(id)}${queryParams}`);
        return response.data;
      }
      async createSystem(input) {
        const response = await this.restRequest("POST", "/v1/systems", input);
        return response.data;
      }
      async updateSystem(id, input, options) {
        const queryParams = options?.environment ? `?env=${options.environment}` : "";
        const response = await this.restRequest("PATCH", `/v1/systems/${encodeURIComponent(id)}${queryParams}`, input);
        return response.data;
      }
      async deleteSystem(id, options) {
        const queryParams = options?.environment ? `?env=${options.environment}` : "";
        await this.restRequest("DELETE", `/v1/systems/${encodeURIComponent(id)}${queryParams}`);
        return true;
      }
      async cacheOAuthSecret(args) {
        await this.restRequest("POST", "/v1/oauth/secrets", args);
        return true;
      }
      async getOAuthSecret(uid) {
        const response = await this.restRequest("GET", `/v1/oauth/secrets/${encodeURIComponent(uid)}`);
        return response.data;
      }
      async getTemplateOAuthCredentials(templateId) {
        const response = await this.restRequest("GET", `/v1/oauth/templates/${encodeURIComponent(templateId)}/credentials`);
        return response.data;
      }
      async searchSystemDocumentation(systemId, keywords) {
        const response = await this.restRequest("POST", `/v1/systems/${encodeURIComponent(systemId)}/documentation/search`, { keywords });
        return response.data;
      }
      async cacheOauthClientCredentials(params) {
        return this.restRequest("POST", "/v1/oauth/secrets", {
          uid: params.clientCredentialsUid,
          clientId: params.clientId,
          clientSecret: params.clientSecret
        });
      }
      async getOAuthClientCredentials(params) {
        if (params.clientCredentialsUid) {
          const response2 = await this.restRequest("GET", `/v1/oauth/secrets/${encodeURIComponent(params.clientCredentialsUid)}`);
          return response2.data;
        }
        if (!params.templateId) {
          throw new Error("No valid credentials source provided");
        }
        const response = await this.restRequest("GET", `/v1/oauth/templates/${encodeURIComponent(params.templateId)}/credentials`);
        return response.data;
      }
      /**
       * Get the CLI OAuth encryption secret and orgId.
       * Used by CLI to encrypt API keys in OAuth state parameters.
       */
      async getCliOAuthSecret() {
        const response = await this.restRequest("GET", "/v1/oauth/cli-secret");
        return response.data;
      }
      async triggerSystemDocumentationScrapeJob(systemId, options) {
        const response = await this.restRequest("POST", `/v1/systems/${encodeURIComponent(systemId)}/documentation/scrape`, options);
        return response.data;
      }
      async fetchOpenApiSpec(systemId, url) {
        const response = await this.restRequest("POST", `/v1/systems/${encodeURIComponent(systemId)}/documentation/openapi`, { url });
        return response.data;
      }
      async createSystemFileUploadUrls(systemId, files) {
        const response = await this.restRequest("POST", `/v1/systems/${encodeURIComponent(systemId)}/file-references`, {
          files: files.map((f) => ({
            fileName: f.fileName,
            metadata: { contentType: f.contentType, contentLength: f.contentLength }
          }))
        });
        return response.data.files;
      }
      async uploadSystemFileReferences(systemId, files) {
        const uploadUrls = await this.createSystemFileUploadUrls(systemId, files.map((f) => ({ fileName: f.fileName, contentType: f.contentType })));
        await Promise.all(uploadUrls.map(async (fileInfo, i) => {
          const uploadResponse = await fetch(fileInfo.uploadUrl, {
            method: "PUT",
            body: files[i].content,
            headers: files[i].contentType ? { "Content-Type": files[i].contentType } : void 0
          });
          if (!uploadResponse.ok) {
            throw new Error(`Upload failed for ${files[i].fileName}: ${uploadResponse.status} ${uploadResponse.statusText}`);
          }
        }));
        return uploadUrls.map((f, i) => ({ id: f.id, fileName: files[i].fileName }));
      }
      async listSystemFileReferences(systemId) {
        const response = await this.restRequest("GET", `/v1/systems/${encodeURIComponent(systemId)}/file-references`);
        return response.data;
      }
      async deleteSystemFileReference(systemId, fileId) {
        await this.restRequest("DELETE", `/v1/systems/${encodeURIComponent(systemId)}/file-references/${encodeURIComponent(fileId)}`);
      }
      async getFileReferenceContent(fileId) {
        const response = await this.restRequest("GET", `/v1/file-references/${encodeURIComponent(fileId)}?includeContent=true`);
        return response.data.content ?? null;
      }
      /**
       * Generate a portal link for end-user authentication.
       * Returns a URL that can be shared with end users to authenticate with systems.
       */
      async getTenantInfo() {
        return this.restRequest("GET", "/v1/tenant-info");
      }
      async setTenantInfo(input) {
        return this.restRequest("PUT", "/v1/tenant-info", input);
      }
      async generatePortalLink() {
        try {
          const result = await this.restRequest("POST", "/v1/authenticate", {});
          return {
            success: true,
            portalUrl: result.data.portalUrl
          };
        } catch (error2) {
          return {
            success: false,
            error: error2.message
          };
        }
      }
    };
    exports2.SuperglueClient = SuperglueClient3;
  }
});

// ../shared/dist/index.js
var require_dist2 = __commonJS({
  "../shared/dist/index.js"(exports2) {
    "use strict";
    var __createBinding = exports2 && exports2.__createBinding || (Object.create ? (function(o, m, k, k2) {
      if (k2 === void 0) k2 = k;
      var desc = Object.getOwnPropertyDescriptor(m, k);
      if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
        desc = { enumerable: true, get: function() {
          return m[k];
        } };
      }
      Object.defineProperty(o, k2, desc);
    }) : (function(o, m, k, k2) {
      if (k2 === void 0) k2 = k;
      o[k2] = m[k];
    }));
    var __exportStar = exports2 && exports2.__exportStar || function(m, exports3) {
      for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports3, p)) __createBinding(exports3, m, p);
    };
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.SSELogSubscriptionManager = exports2.SuperglueClient = void 0;
    __exportStar(require_json_schema(), exports2);
    __exportStar(require_rbac_utils(), exports2);
    __exportStar(require_seed_config(), exports2);
    __exportStar(require_templates(), exports2);
    __exportStar(require_type_utils(), exports2);
    __exportStar(require_types(), exports2);
    __exportStar(require_utils(), exports2);
    __exportStar(require_vm_helpers(), exports2);
    __exportStar(require_cli_oauth(), exports2);
    var superglue_client_js_1 = require_superglue_client();
    Object.defineProperty(exports2, "SuperglueClient", { enumerable: true, get: function() {
      return superglue_client_js_1.SuperglueClient;
    } });
    var sse_log_subscription_js_1 = require_sse_log_subscription();
    Object.defineProperty(exports2, "SSELogSubscriptionManager", { enumerable: true, get: function() {
      return sse_log_subscription_js_1.SSELogSubscriptionManager;
    } });
  }
});

// src/cli.ts
var import_commander6 = require("commander");

// src/config.ts
var fs = __toESM(require("fs"));
var os = __toESM(require("os"));
var path = __toESM(require("path"));
var DEFAULT_CONFIG = {
  output: { mode: "stdout", directory: ".superglue/output" }
};
function getConfigDir(preferLocal) {
  const localDir = path.join(process.cwd(), ".superglue");
  const homeDir = os.homedir();
  if (!homeDir) {
    return localDir;
  }
  const globalDir = path.join(homeDir, ".superglue");
  if (preferLocal === true) {
    return localDir;
  }
  if (preferLocal === false) {
    return globalDir;
  }
  if (fs.existsSync(path.join(localDir, "config.json"))) {
    return localDir;
  }
  return globalDir;
}
function getConfigPath(preferLocal) {
  return path.join(getConfigDir(preferLocal), "config.json");
}
function loadConfigFile() {
  const configPath = getConfigPath();
  if (!fs.existsSync(configPath)) return {};
  try {
    return JSON.parse(fs.readFileSync(configPath, "utf-8"));
  } catch {
    return {};
  }
}
function resolveConfig(flags) {
  const file = loadConfigFile();
  const apiKey = flags.apiKey || process.env.SUPERGLUE_API_KEY || file.apiKey || "";
  const endpoint = flags.endpoint || process.env.SUPERGLUE_API_ENDPOINT || file.endpoint || "https://api.superglue.cloud";
  const webEndpoint = process.env.SUPERGLUE_WEB_ENDPOINT || file.webEndpoint || endpoint.replace(/:3002\b/, ":3001").replace(/api\.superglue/, "app.superglue");
  return {
    ...DEFAULT_CONFIG,
    ...file,
    apiKey,
    endpoint,
    webEndpoint,
    output: { ...DEFAULT_CONFIG.output, ...file.output }
  };
}
function writeConfig(config, preferLocal) {
  const dir = getConfigDir(preferLocal);
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(path.join(dir, "config.json"), JSON.stringify(config, null, 2) + "\n", {
    mode: 384
  });
}
function ensureConfigDirs(config, preferLocal) {
  const draftsDir = path.join(getConfigDir(preferLocal), "drafts");
  if (!fs.existsSync(draftsDir)) fs.mkdirSync(draftsDir, { recursive: true });
  if (config.output.mode === "stdout+file") {
    const outDir = path.resolve(config.output.directory);
    if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });
  }
}

// src/client.ts
var import_shared = __toESM(require_dist2());
function createClient(config) {
  if (!config.apiKey) {
    console.error("Error: No API key configured. Run `sg init` or set SUPERGLUE_API_KEY.");
    process.exit(1);
  }
  return new import_shared.SuperglueClient({
    apiKey: config.apiKey,
    apiEndpoint: config.endpoint
  });
}

// src/commands/init.ts
var fs2 = __toESM(require("fs"));
var path2 = __toESM(require("path"));
var os2 = __toESM(require("os"));
var import_commander = require("commander");
var import_shared2 = __toESM(require_dist2());

// src/output.ts
var readline = __toESM(require("readline"));

// src/version.ts
var import_node_child_process = require("child_process");
var import_node_util = require("util");

// package.json
var package_default = {
  name: "@superglue/cli",
  version: "1.1.13",
  bin: {
    sg: "./dist/cli.js"
  },
  files: [
    ".claude-plugin/",
    "dist/",
    "skills/",
    "LICENSE"
  ],
  dependencies: {
    commander: "^13.0.0",
    "fast-json-patch": "^3.1.1"
  },
  devDependencies: {
    "@superglue/shared": "file:../shared",
    "@types/node": "^20.0.0",
    tsup: "^8.0.0",
    typescript: "^5.0.0"
  },
  scripts: {
    build: "tsup && (cp -r skills dist/ 2>/dev/null || true)",
    dev: "tsup --watch",
    "type-check": "tsc --noEmit",
    prepublishOnly: "npm run build"
  },
  publishConfig: {
    access: "public"
  }
};

// src/version.ts
var execAsync = (0, import_node_util.promisify)(import_node_child_process.exec);
var CLI_VERSION = package_default.version;
function parseVersionPart(part) {
  const match = part.match(/^(\d+)(?:-(.+))?$/);
  if (match) {
    return { numeric: parseInt(match[1], 10), prerelease: match[2] || null };
  }
  return { numeric: 0, prerelease: part };
}
function compareVersions(a, b) {
  const partsA = a.split(".");
  const partsB = b.split(".");
  const maxLen = Math.max(partsA.length, partsB.length);
  for (let i = 0; i < maxLen; i++) {
    const parsedA = parseVersionPart(partsA[i] || "0");
    const parsedB = parseVersionPart(partsB[i] || "0");
    if (parsedA.numeric < parsedB.numeric) return -1;
    if (parsedA.numeric > parsedB.numeric) return 1;
    if (parsedA.prerelease === null && parsedB.prerelease !== null) return 1;
    if (parsedA.prerelease !== null && parsedB.prerelease === null) return -1;
    if (parsedA.prerelease !== null && parsedB.prerelease !== null) {
      if (parsedA.prerelease < parsedB.prerelease) return -1;
      if (parsedA.prerelease > parsedB.prerelease) return 1;
    }
  }
  return 0;
}
async function checkVersionCompatibility(endpoint) {
  try {
    const healthUrl = `${endpoint.replace(/\/$/, "")}/v1/health`;
    const response = await fetch(healthUrl, { signal: AbortSignal.timeout(3e3) });
    if (!response.ok) return;
    const health = await response.json();
    if (!health.minCliVersion) return;
    if (compareVersions(CLI_VERSION, health.minCliVersion) < 0) {
      console.error("");
      console.error(`${c.yellow}${c.bold}\u26A0 CLI version ${CLI_VERSION} is outdated.${c.reset}`);
      console.error(
        `${c.yellow}  Server requires at least v${health.minCliVersion}. Run: ${c.bold}sg update${c.reset}`
      );
      console.error("");
    }
  } catch {
  }
}
async function getLatestNpmVersion() {
  try {
    const response = await fetch("https://registry.npmjs.org/@superglue/cli/latest", {
      signal: AbortSignal.timeout(5e3)
    });
    if (!response.ok) return null;
    const data = await response.json();
    return data.version || null;
  } catch {
    return null;
  }
}
var updateCheckPromise = null;
function startBackgroundUpdateCheck() {
  updateCheckPromise = getLatestNpmVersion();
}
async function printUpdateNotification() {
  if (!updateCheckPromise) return;
  try {
    const timeout = new Promise((resolve5) => {
      const timer = setTimeout(() => resolve5(null), 2e3);
      timer.unref();
    });
    const latest = await Promise.race([updateCheckPromise, timeout]);
    if (latest && compareVersions(CLI_VERSION, latest) < 0) {
      console.error("");
      console.error(`${c.cyan}${c.bold}  Update available: ${CLI_VERSION} \u2192 ${latest}${c.reset}`);
      console.error(`${c.cyan}  Run ${c.bold}sg update${c.reset}${c.cyan} to upgrade${c.reset}`);
      console.error("");
    }
  } catch {
  }
  updateCheckPromise = null;
}
async function updateCli() {
  const latestVersion = await getLatestNpmVersion();
  if (!latestVersion) {
    return { success: false, message: "Could not fetch latest version from npm" };
  }
  if (compareVersions(CLI_VERSION, latestVersion) >= 0) {
    return { success: true, message: `Already on latest version (${CLI_VERSION})` };
  }
  try {
    await execAsync("npm install -g @superglue/cli@latest");
    return {
      success: true,
      message: `Updated from ${CLI_VERSION} to ${latestVersion}`
    };
  } catch (err) {
    return {
      success: false,
      message: `Update failed: ${err.message}. Try manually: npm install -g @superglue/cli@latest`
    };
  }
}

// src/output.ts
var isJsonMode = () => process.argv.includes("--json") || !process.stdout.isTTY;
var c = {
  reset: "\x1B[0m",
  bold: "\x1B[1m",
  dim: "\x1B[2m",
  italic: "\x1B[3m",
  underline: "\x1B[4m",
  red: "\x1B[31m",
  green: "\x1B[32m",
  yellow: "\x1B[33m",
  blue: "\x1B[34m",
  magenta: "\x1B[35m",
  cyan: "\x1B[36m",
  white: "\x1B[37m",
  gray: "\x1B[90m",
  bgRed: "\x1B[41m",
  bgGreen: "\x1B[42m",
  bgYellow: "\x1B[43m",
  bgBlue: "\x1B[44m",
  bgMagenta: "\x1B[45m",
  bgCyan: "\x1B[46m"
};
function link(url, label) {
  const text = label || url;
  return `\x1B]8;;${url}\x07${c.underline}${c.cyan}${text}${c.reset}\x1B]8;;\x07`;
}
function banner() {
  if (isJsonMode()) return;
  const rst = c.reset;
  const d = c.dim;
  const inv = "\x1B[47;30m";
  const art = [
    "       #@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@-       ",
    "     =@@@-                                                                                 @@@@     ",
    "    @@@                                                                                       @@%   ",
    "  -@@        @@@@=  @@@  @@@ @@@@@#@  @@@@@@@ @@@@@@@    @@@@@@   @@@     @@@   @@@ @@@@@@*      %@@  ",
    "  @@        @@@  *@ @@@  @@@ @@@  :@@ @@@     @@@  -@@ @@@    @%  @@@     @@@   @@@ @@*           @@# ",
    " #@@        @@@#    @@@  @@@ @@@  :@@ @@@     @@@  -@@ @@@        @@@     @@@   @@@ @@*            @@ ",
    " @@-         @@@@=  @@@  @@@ @@@@@@@  @@@@@@  @@@@@@@  @@@    @@% @@@     @@@   @@@ @@@@@.         @@.",
    " #@%          .@@@@ @@@  @@@ @@@      @@@     @@@  -@@ @@@    @@% @@@     @@@   @@@ @@*            @@ ",
    "  @@        @   @@@ @@@  @@@ @@@      @@@     @@@  -@@ @@@    @@% @@@     @@@   @@@ @@*           *@@ ",
    "  -@@        @@@@=   @@@@@@  @@@      @@@@@@@ @@@  -@@   @@@@@@   @@@@@@%  @@@@@@.  @@@@@@*      #@@  ",
    "   :@@*                                                                                       @@@   ",
    "     %@@@                                                                                  =@@@.    ",
    "       :@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@%        "
  ];
  console.log("");
  art.forEach((line) => {
    const first = line.search(/\S/);
    const last = line.length - [...line].reverse().join("").search(/\S/) - 1;
    if (first === -1) return console.log("  " + line);
    const before = line.slice(0, first);
    const inside = line.slice(first, last + 1).split("").map((ch) => ch === " " ? " " : "\u2588").join("");
    const after = line.slice(last + 1);
    console.log(`  ${before}${inv}${inside}${rst}${after}`);
  });
  console.log(`  ${d}  CLI v${CLI_VERSION}${rst}`);
  console.log("");
}
function spinner(message) {
  if (isJsonMode()) return { stop: () => {
  }, update: () => {
  }, log: () => {
  } };
  const frames = ["\u280B", "\u2819", "\u2839", "\u2838", "\u283C", "\u2834", "\u2826", "\u2827", "\u2807", "\u280F"];
  let i = 0;
  let currentMsg = message;
  const clearLine = () => process.stdout.write(`\r\x1B[2K`);
  const drawSpinner = () => {
    process.stdout.write(`\r  ${c.cyan}${frames[i++ % frames.length]}${c.reset} ${currentMsg}`);
  };
  const interval = setInterval(drawSpinner, 80);
  return {
    update: (msg) => {
      currentMsg = msg;
    },
    log: (line) => {
      clearLine();
      console.log(`  ${c.dim}\u2502${c.reset} ${line}`);
      drawSpinner();
    },
    stop: (finalMsg) => {
      clearInterval(interval);
      clearLine();
      if (finalMsg) console.log(`  ${finalMsg}`);
    }
  };
}
function output(data) {
  if (isJsonMode()) {
    console.log(JSON.stringify(data, null, 2));
  } else {
    prettyPrint(data);
  }
}
function success(message, data) {
  if (isJsonMode()) {
    console.log(
      JSON.stringify({
        success: true,
        message,
        ...data && typeof data === "object" ? data : { data }
      })
    );
  } else {
    console.log(`  ${c.green}\u2713${c.reset} ${message}`);
    if (data) prettyPrint(data, 4);
  }
}
function error(message, details) {
  if (isJsonMode()) {
    console.error(JSON.stringify({ success: false, error: message, details }));
  } else {
    console.error(`  ${c.red}\u2717${c.reset} ${message}`);
    if (details) prettyPrint(details, 4);
  }
}
function warn(message) {
  if (!isJsonMode()) {
    console.log(`  ${c.yellow}\u26A0${c.reset} ${message}`);
  }
}
function info(message) {
  if (!isJsonMode()) {
    console.log(`  ${c.dim}${message}${c.reset}`);
  }
}
function heading(text) {
  if (!isJsonMode()) {
    console.log(`
  ${c.bold}${c.cyan}${text}${c.reset}`);
    console.log(`  ${c.dim}${"\u2500".repeat(text.length)}${c.reset}`);
  }
}
function table(rows, columns) {
  if (isJsonMode()) {
    console.log(JSON.stringify(rows, null, 2));
    return;
  }
  if (rows.length === 0) {
    console.log(`
  ${c.dim}(no results)${c.reset}
`);
    return;
  }
  const cols = columns || Object.keys(rows[0]);
  const maxColWidth = 60;
  const widths = cols.map(
    (col) => Math.min(
      maxColWidth,
      Math.max(
        col.length,
        ...rows.map(
          (r) => String(r[col] ?? "").replace(/[\n\r]+/g, " ").trim().length
        )
      )
    )
  );
  console.log("");
  const header = cols.map((col, i) => `${c.bold}${c.cyan}${col.toUpperCase().padEnd(widths[i])}${c.reset}`).join("  ");
  console.log(`  ${header}`);
  const sep = widths.map((w) => `${c.dim}${"\u2500".repeat(w)}${c.reset}`).join(`${c.dim}\u2500\u2500${c.reset}`);
  console.log(`  ${sep}`);
  for (const row of rows) {
    const line = cols.map((col, i) => {
      let val = String(row[col] ?? "").replace(/[\n\r]+/g, " ").trim();
      if (val.length > maxColWidth) val = val.slice(0, maxColWidth - 1) + "\u2026";
      if (col === "status") {
        const statusColors = {
          success: c.green,
          running: c.yellow,
          failed: c.red,
          aborted: c.red,
          error: c.red,
          pending: c.dim
        };
        const sc = statusColors[val.toLowerCase()] || "";
        return `${sc}${val.padEnd(widths[i])}${c.reset}`;
      }
      return val.padEnd(widths[i]);
    }).join("  ");
    console.log(`  ${line}`);
  }
  console.log(`
  ${c.dim}${rows.length} result${rows.length === 1 ? "" : "s"}${c.reset}
`);
}
function prettyPrint(data, indent = 2) {
  const pad = " ".repeat(indent);
  if (data === null || data === void 0) {
    console.log(`${pad}${c.dim}(empty)${c.reset}`);
    return;
  }
  if (typeof data !== "object") {
    console.log(`${pad}${String(data)}`);
    return;
  }
  const obj = data;
  const entries = Object.entries(obj);
  console.log("");
  for (const [key, value] of entries) {
    if (value === void 0 || value === null) continue;
    if (key === "success" && typeof value === "boolean") {
      const icon = value ? `${c.green}\u2713${c.reset}` : `${c.red}\u2717${c.reset}`;
      console.log(`${pad}${icon} ${value ? "Success" : "Failed"}`);
      continue;
    }
    if (key === "error" && typeof value === "string") {
      console.log(`${pad}${c.red}error:${c.reset} ${value}`);
      continue;
    }
    if (typeof value === "string") {
      if (value.length > 200) {
        console.log(`${pad}${c.dim}${key}:${c.reset}`);
        const wrapped = value.match(/.{1,100}/g) || [value];
        for (const line of wrapped.slice(0, 20)) {
          console.log(`${pad}  ${line}`);
        }
        if (wrapped.length > 20)
          console.log(`${pad}  ${c.dim}... (${value.length} chars total)${c.reset}`);
      } else {
        console.log(`${pad}${c.dim}${key}:${c.reset} ${value}`);
      }
      continue;
    }
    if (typeof value === "number" || typeof value === "boolean") {
      console.log(`${pad}${c.dim}${key}:${c.reset} ${c.yellow}${value}${c.reset}`);
      continue;
    }
    if (Array.isArray(value)) {
      if (value.length === 0) {
        console.log(`${pad}${c.dim}${key}:${c.reset} ${c.dim}[]${c.reset}`);
      } else if (value.every((v) => typeof v === "string" || typeof v === "number")) {
        console.log(`${pad}${c.dim}${key}:${c.reset} ${value.join(", ")}`);
      } else {
        console.log(`${pad}${c.dim}${key}:${c.reset}`);
        printCompactJson(value, indent + 2);
      }
      continue;
    }
    if (typeof value === "object") {
      console.log(`${pad}${c.dim}${key}:${c.reset}`);
      prettyPrint(value, indent + 2);
      continue;
    }
  }
  console.log("");
}
function printCompactJson(data, indent) {
  const pad = " ".repeat(indent);
  const jsonStr = JSON.stringify(data, null, 2);
  const lines = jsonStr.split("\n");
  const maxLines = 40;
  for (let i = 0; i < Math.min(lines.length, maxLines); i++) {
    const line = lines[i];
    const colored = line.replace(/"([^"]+)":/g, `${c.cyan}"$1":${c.reset}`).replace(/: "([^"]*)"(,?)$/g, `: ${c.green}"$1"${c.reset}$2`).replace(/: (\d+)(,?)$/g, `: ${c.yellow}$1${c.reset}$2`).replace(/: (true|false)(,?)$/g, `: ${c.magenta}$1${c.reset}$2`).replace(/: (null)(,?)$/g, `: ${c.dim}$1${c.reset}$2`);
    console.log(`${pad}${colored}`);
  }
  if (lines.length > maxLines) {
    console.log(`${pad}${c.dim}... (${lines.length - maxLines} more lines)${c.reset}`);
  }
}
function renderDiffs(diffs) {
  return diffs.map((d) => {
    const opColors = {
      remove: c.red,
      add: c.green,
      replace: c.yellow,
      move: c.blue,
      copy: c.blue
    };
    const opIcons = {
      remove: "\u2501",
      add: "\u2503",
      replace: "\u2503",
      move: "\u21B3",
      copy: "\u2295"
    };
    const color = opColors[d.op] || c.white;
    const icon = opIcons[d.op] || "\u2502";
    const valueStr = "value" in d ? ` \u2192 ${c.bold}${JSON.stringify(d.value).slice(0, 100)}${c.reset}` : "";
    return `  ${color}${icon} ${c.bold}[${d.op}]${c.reset} ${c.dim}${d.path}${c.reset}${valueStr}`;
  }).join("\n");
}
async function prompt(message, defaultValue) {
  const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
  const suffix = defaultValue ? ` ${c.dim}[${defaultValue}]${c.reset}` : "";
  return new Promise((resolve5) => {
    rl.question(`  ${message}${suffix}: `, (answer) => {
      rl.close();
      resolve5(answer.trim() || defaultValue || "");
    });
  });
}
async function promptHidden(message) {
  return new Promise((resolve5) => {
    process.stdout.write(`${message}: `);
    if (!process.stdin.isTTY) {
      const rl = readline.createInterface({ input: process.stdin });
      rl.once("line", (line) => {
        rl.close();
        resolve5(line.trim());
      });
      return;
    }
    process.stdin.setRawMode(true);
    process.stdin.resume();
    let input = "";
    const onData = (ch) => {
      const s = ch.toString();
      for (const char of s) {
        if (char === "\n" || char === "\r") {
          process.stdin.setRawMode(false);
          process.stdin.removeListener("data", onData);
          process.stdin.pause();
          process.stdout.write("\n");
          resolve5(input);
          return;
        } else if (char === "") {
          process.stdin.setRawMode(false);
          process.exit(130);
        } else if (char === "\x7F" || char === "\b") {
          if (input.length > 0) {
            input = input.slice(0, -1);
            process.stdout.write("\b \b");
          }
        } else {
          input += char;
          process.stdout.write(`${c.dim}\u2022${c.reset}`);
        }
      }
    };
    process.stdin.on("data", onData);
  });
}
async function choose(message, options, defaultIndex = 0) {
  if (!process.stdout.isTTY) return defaultIndex;
  let selected = defaultIndex;
  const render = () => {
    for (let i = 0; i < options.length; i++) {
      const marker = i === selected ? `${c.cyan}\u276F${c.reset}` : " ";
      const label = i === selected ? `${c.bold}${options[i]}${c.reset}` : `${c.dim}${options[i]}${c.reset}`;
      console.log(`    ${marker} ${label}`);
    }
  };
  const moveUp = () => {
    process.stdout.write(`\x1B[${options.length}A\r`);
    for (let i = 0; i < options.length; i++) {
      process.stdout.write(`\x1B[2K`);
      if (i < options.length - 1) process.stdout.write(`
`);
    }
    process.stdout.write(`\x1B[${options.length - 1}A\r`);
  };
  console.log(
    `
  ${c.bold}${message}${c.reset} ${c.dim}(\u2191/\u2193 to select, enter to confirm)${c.reset}`
  );
  render();
  return new Promise((resolve5) => {
    process.stdin.setRawMode(true);
    process.stdin.resume();
    const onData = (ch) => {
      const s = ch.toString();
      if (s === "\r" || s === "\n") {
        process.stdin.setRawMode(false);
        process.stdin.removeListener("data", onData);
        process.stdin.pause();
        resolve5(selected);
        return;
      }
      if (s === "") {
        process.stdin.setRawMode(false);
        process.exit(130);
      }
      if (s === "\x1B[A" || s === "k") {
        selected = (selected - 1 + options.length) % options.length;
      } else if (s === "\x1B[B" || s === "j") {
        selected = (selected + 1) % options.length;
      } else {
        return;
      }
      moveUp();
      render();
    };
    process.stdin.on("data", onData);
  });
}

// src/commands/init.ts
function registerInitCommand(program2) {
  program2.command("init").description("Set up superglue CLI configuration").option("--web-endpoint <url>", "Web endpoint for OAuth callbacks").addOption(
    new import_commander.Option("--output-mode <mode>", "Output mode: stdout or stdout+file").choices(["stdout", "stdout+file"]).default("stdout")
  ).option("--output-dir <dir>", "Output directory for stdout+file mode", ".superglue/output").option("--global", "Save config globally (~/.superglue/) instead of locally").action(async function(opts) {
    const parentOpts = this.parent?.opts() ?? {};
    const resolvedApiKey = parentOpts.apiKey || process.env.SUPERGLUE_API_KEY;
    const resolvedEndpoint = parentOpts.endpoint || process.env.SUPERGLUE_API_ENDPOINT;
    const isNonInteractive = resolvedApiKey || !process.stdin.isTTY;
    let apiKey;
    let endpoint;
    let webEndpoint;
    let outputMode;
    let outputDir;
    let preferLocal;
    if (isNonInteractive) {
      apiKey = resolvedApiKey;
      if (!apiKey) {
        error("API key is required (--api-key or SUPERGLUE_API_KEY)");
        process.exit(1);
      }
      endpoint = resolvedEndpoint || "https://api.superglue.cloud";
      const defaultWeb = endpoint.replace(/:3002\b/, ":3001").replace(/api\.superglue/, "app.superglue");
      webEndpoint = opts.webEndpoint || defaultWeb;
      outputMode = opts.outputMode === "stdout+file" ? "stdout+file" : "stdout";
      outputDir = opts.outputDir;
      preferLocal = !opts.global;
      const spin = spinner("Verifying connection...");
      try {
        const client = new import_shared2.SuperglueClient({ apiKey, apiEndpoint: endpoint });
        await client.listSystems(1);
        spin.stop(`${c.green}\u2713${c.reset} Connected to ${c.bold}${endpoint}${c.reset}`);
      } catch (err) {
        spin.stop(`${c.red}\u2717${c.reset} Connection failed`);
        error(err.message);
        process.exit(1);
      }
    } else {
      banner();
      console.log(`  ${c.bold}Welcome to the superglue CLI setup!${c.reset}`);
      console.log(`  ${c.dim}Let's get you connected in a few steps.${c.reset}
`);
      heading("Authentication");
      console.log(
        `  ${c.dim}Get your API key at${c.reset} ${link("https://app.superglue.cloud/admin?view=api-keys")}`
      );
      console.log("");
      apiKey = await promptHidden("  API Key");
      if (!apiKey) {
        error("API key is required");
        process.exit(1);
      }
      endpoint = await prompt(
        "  API Endpoint",
        resolvedEndpoint || "https://api.superglue.cloud"
      );
      const defaultWeb = endpoint.replace(/:3002\b/, ":3001").replace(/api\.superglue/, "app.superglue");
      webEndpoint = await prompt("  Web Endpoint (for OAuth callbacks)", defaultWeb);
      const spin = spinner("Verifying connection...");
      try {
        const client = new import_shared2.SuperglueClient({ apiKey, apiEndpoint: endpoint });
        await client.listSystems(1);
        spin.stop(`${c.green}\u2713${c.reset} Connected to ${c.bold}${endpoint}${c.reset}`);
      } catch (err) {
        spin.stop(`${c.red}\u2717${c.reset} Connection failed`);
        error(err.message);
        process.exit(1);
      }
      heading("Output Preferences");
      const outputModeIdx = await choose(
        "Output mode",
        [
          "stdout only \u2014 print results to terminal",
          "stdout + file \u2014 also save results as JSON files"
        ],
        0
      );
      outputMode = outputModeIdx === 1 ? "stdout+file" : "stdout";
      outputDir = ".superglue/output";
      if (outputMode === "stdout+file") {
        outputDir = await prompt("  Output directory", ".superglue/output");
      }
      heading("Config Location");
      const homeDir = os2.homedir();
      const localPath = path2.join(process.cwd(), ".superglue");
      const globalPath = path2.join(homeDir, ".superglue");
      const configLocationIdx = await choose(
        "Where to save config?",
        [
          `Project (${localPath}) \u2014 config stays with this project`,
          `Global (${globalPath}) \u2014 shared across all projects`
        ],
        0
      );
      preferLocal = configLocationIdx === 0;
    }
    const config = {
      apiKey,
      endpoint,
      webEndpoint,
      output: { mode: outputMode, directory: outputDir }
    };
    writeConfig(config, preferLocal);
    ensureConfigDirs(config, preferLocal);
    const configDir = getConfigDir(preferLocal);
    const configRelPath = preferLocal ? ".superglue/config.json" : path2.join(configDir, "config.json");
    const gitignorePath = path2.join(process.cwd(), ".gitignore");
    const ignoreEntries = [];
    if (outputMode === "stdout+file" && !path2.isAbsolute(outputDir)) {
      ignoreEntries.push(`${outputDir}/`);
    }
    if (preferLocal) {
      ignoreEntries.push(".superglue/drafts/", ".superglue/config.json");
    }
    if (ignoreEntries.length > 0) {
      if (fs2.existsSync(gitignorePath)) {
        const existing = fs2.readFileSync(gitignorePath, "utf-8");
        const toAdd = ignoreEntries.filter((e) => !existing.includes(e));
        if (toAdd.length > 0) {
          fs2.appendFileSync(gitignorePath, "\n# superglue CLI\n" + toAdd.join("\n") + "\n");
          info("Updated .gitignore");
        }
      } else if (preferLocal) {
        fs2.writeFileSync(gitignorePath, "# superglue CLI\n" + ignoreEntries.join("\n") + "\n");
        info("Created .gitignore");
      }
    }
    console.log("");
    success(`Config saved to ${c.bold}${configRelPath}${c.reset}`);
    if (preferLocal) {
      success(`Created ${c.bold}.superglue/drafts/${c.reset}`);
    }
    if (outputMode === "stdout+file") {
      success(`Created ${c.bold}${outputDir}/${c.reset}`);
    }
    console.log("");
    console.log(`  ${c.bold}You're all set!${c.reset} Try these commands:
`);
    console.log(
      `    ${c.cyan}sg system list${c.reset}    ${c.dim}\u2014 see your connected systems${c.reset}`
    );
    console.log(
      `    ${c.cyan}sg tool list${c.reset}      ${c.dim}\u2014 see your saved tools${c.reset}`
    );
    console.log(
      `    ${c.cyan}sg run list${c.reset}       ${c.dim}\u2014 see recent executions${c.reset}`
    );
    console.log("");
  });
}

// src/commands/tool/build.ts
var fs5 = __toESM(require("fs"));
var crypto = __toESM(require("crypto"));
var import_shared3 = __toESM(require_dist2());

// src/drafts.ts
var fs3 = __toESM(require("fs"));
var path3 = __toESM(require("path"));
function getDraftsDir() {
  return path3.join(getConfigDir(), "drafts");
}
function encodeDraftId(draftId) {
  return Buffer.from(draftId, "utf-8").toString("base64url");
}
function getDraftPath(draftId) {
  return path3.join(getDraftsDir(), `${encodeDraftId(draftId)}.json`);
}
function writeDraft(draft) {
  const dir = getDraftsDir();
  if (!fs3.existsSync(dir)) fs3.mkdirSync(dir, { recursive: true });
  fs3.writeFileSync(getDraftPath(draft.draftId), JSON.stringify(draft, null, 2));
}
function readDraft(draftId) {
  const filePath = getDraftPath(draftId);
  if (!fs3.existsSync(filePath)) return null;
  try {
    return JSON.parse(fs3.readFileSync(filePath, "utf-8"));
  } catch {
    return null;
  }
}
function deleteDraft(draftId) {
  const filePath = getDraftPath(draftId);
  if (fs3.existsSync(filePath)) fs3.unlinkSync(filePath);
}

// src/files.ts
var fs4 = __toESM(require("fs"));
var path4 = __toESM(require("path"));
async function parseFileFlags(fileFlags, client) {
  if (!fileFlags || fileFlags.length === 0) return {};
  const payloads = {};
  for (const flag of fileFlags) {
    const eqIdx = flag.indexOf("=");
    if (eqIdx === -1) {
      console.error(`Invalid --file format: "${flag}". Expected key=path`);
      process.exit(1);
    }
    const key = flag.slice(0, eqIdx);
    const filePath = path4.resolve(flag.slice(eqIdx + 1));
    if (!fs4.existsSync(filePath)) {
      console.error(`File not found: ${filePath}`);
      process.exit(1);
    }
    const fileBuffer = fs4.readFileSync(filePath);
    const blob = new Blob([fileBuffer]);
    const file = new File([blob], path4.basename(filePath));
    try {
      const result = await client.extract({ file });
      payloads[key] = result.data;
    } catch (err) {
      console.error(`Failed to extract file "${key}" (${filePath}): ${err.message}`);
      process.exit(1);
    }
  }
  return payloads;
}
function resolveFileReferences(value, filePayloads) {
  if (typeof value === "string" && value.startsWith("file::")) {
    const key = value.slice(6);
    if (!(key in filePayloads)) {
      throw new Error(
        `File reference 'file::${key}' not found. Available: ${Object.keys(filePayloads).join(", ") || "(none)"}`
      );
    }
    return filePayloads[key];
  }
  if (Array.isArray(value)) {
    return value.map((v) => resolveFileReferences(v, filePayloads));
  }
  if (value && typeof value === "object") {
    const resolved = {};
    for (const [k, v] of Object.entries(value)) {
      resolved[k] = resolveFileReferences(v, filePayloads);
    }
    return resolved;
  }
  return value;
}
function resolvePayloadWithFiles(payload, filePayloads) {
  if (!payload) return { success: true, resolved: payload };
  try {
    const resolved = resolveFileReferences(payload, filePayloads);
    return { success: true, resolved };
  } catch (err) {
    return { success: false, error: err.message };
  }
}

// src/commands/tool/build.ts
function registerBuildCommand(parent, getContext2) {
  parent.command("build").description("Build a new superglue tool from a configuration").option("--config <file>", "JSON config file for the tool").option("--id <id>", "Tool ID in kebab-case").option("--instruction <text>", "Brief human-readable tool instruction").option("--steps <file>", "JSON file containing steps array").option("--output-transform <code>", "JS output transform function").option("--output-schema <file>", "JSON file for output schema").option("--payload <json>", "Sample payload JSON").option(
    "--file <key=path...>",
    "File references (key=path)",
    (v, arr) => {
      arr.push(v);
      return arr;
    },
    []
  ).action(async (opts) => {
    const { client } = getContext2();
    let toolConfig;
    if (opts.config) {
      const raw = opts.config.trim();
      toolConfig = raw.startsWith("{") ? JSON.parse(raw) : JSON.parse(fs5.readFileSync(raw, "utf-8"));
    } else {
      toolConfig = {
        id: opts.id,
        instruction: opts.instruction,
        steps: opts.steps ? JSON.parse(fs5.readFileSync(opts.steps, "utf-8")) : void 0,
        outputTransform: opts.outputTransform,
        outputSchema: opts.outputSchema ? JSON.parse(fs5.readFileSync(opts.outputSchema, "utf-8")) : void 0
      };
    }
    if (!toolConfig.id || !toolConfig.instruction || !toolConfig.steps) {
      error("Required: id, instruction, and steps");
      process.exit(1);
    }
    const filePayloads = await parseFileFlags(opts.file, client);
    let payload = opts.payload ? JSON.parse(opts.payload) : void 0;
    if (payload) {
      const fileResult = resolvePayloadWithFiles(payload, filePayloads);
      if (!fileResult.success) {
        error(fileResult.error);
        process.exit(1);
      }
      payload = fileResult.resolved;
    }
    let inputSchema;
    if (payload && Object.keys(payload).length > 0) {
      try {
        inputSchema = (0, import_shared3.convertRequiredToArray)(
          (0, import_shared3.toJsonSchema)(payload, { arrays: { mode: "all" }, required: true })
        );
      } catch {
        inputSchema = void 0;
      }
    }
    const draftId = `draft_${crypto.randomUUID()}`;
    const draft = {
      draftId,
      config: {
        ...toolConfig,
        inputSchema,
        createdAt: (/* @__PURE__ */ new Date()).toISOString(),
        updatedAt: (/* @__PURE__ */ new Date()).toISOString()
      },
      systemIds: toolConfig.systemIds || [],
      instruction: toolConfig.instruction,
      createdAt: (/* @__PURE__ */ new Date()).toISOString()
    };
    writeDraft(draft);
    if (process.argv.includes("--json") || !process.stdout.isTTY) {
      output({ success: true, draftId, toolId: toolConfig.id, config: draft.config });
    } else {
      success(`Draft created: ${c.bold}${draftId}${c.reset}`);
      console.log(`  ${c.dim}tool:${c.reset}   ${toolConfig.id}`);
      console.log(`  ${c.dim}steps:${c.reset}  ${toolConfig.steps.length}`);
      console.log(
        `
  ${c.dim}Next: ${c.reset}${c.cyan}sg tool run --draft ${draftId}${c.reset}`
      );
      console.log("");
    }
  });
}

// src/commands/tool/run.ts
var fs6 = __toESM(require("fs"));
var path5 = __toESM(require("path"));
var crypto2 = __toESM(require("crypto"));
var import_shared4 = __toESM(require_dist2());
function registerRunCommand(parent, getContext2) {
  parent.command("run").description("Execute a draft, saved tool, or inline tool config").option("--draft <id>", "Draft ID from build").option("--tool <id>", "Saved tool ID").option("--config <json>", "Inline tool config JSON").option("--config-file <path>", "Tool config JSON file").option("--payload <json>", "JSON payload").option("--payload-file <path>", "JSON payload file").option(
    "--file <key=path...>",
    "File references",
    (v, arr) => {
      arr.push(v);
      return arr;
    },
    []
  ).option("--include-step-results", "Include raw step results").option("--include-config", "Include full tool config").action(async (opts) => {
    const { config, client } = getContext2();
    const selectors = [opts.tool, opts.draft, opts.config, opts.configFile].filter(Boolean);
    if (selectors.length === 0) {
      error("Provide one of --tool, --draft, --config, or --config-file");
      process.exit(1);
    }
    if (selectors.length > 1) {
      error("Only one of --tool, --draft, --config, or --config-file can be used");
      process.exit(1);
    }
    const filePayloads = await parseFileFlags(opts.file, client);
    let payload = opts.payloadFile ? JSON.parse(fs6.readFileSync(opts.payloadFile, "utf-8")) : opts.payload ? JSON.parse(opts.payload) : void 0;
    if (payload) {
      const fileResult = resolvePayloadWithFiles(payload, filePayloads);
      if (!fileResult.success) {
        error(fileResult.error);
        process.exit(1);
      }
      payload = fileResult.resolved;
    }
    let result;
    const toolLabel = opts.tool || opts.draft || "inline-config";
    const traceId = crypto2.randomUUID();
    const spin = spinner(`Running ${c.bold}${toolLabel}${c.reset}...`);
    const logSub = await client.subscribeToLogsSSE({
      traceId,
      onLog: (log) => spin.log(`${c.dim}${log.message}${c.reset}`)
    }).catch(() => ({ unsubscribe: () => {
    } }));
    const runToolConfig = async (toolConfig) => {
      try {
        const res = await client.runToolConfig({
          tool: toolConfig,
          payload,
          options: { requestSource: import_shared4.RequestSource.CLI },
          traceId,
          createRun: true
        });
        logSub.unsubscribe();
        spin.stop();
        return res;
      } catch (err) {
        logSub.unsubscribe();
        spin.stop();
        error(err.message);
        process.exit(1);
      }
    };
    if (opts.tool) {
      try {
        result = await client.runTool({
          toolId: opts.tool,
          payload,
          options: { requestSource: import_shared4.RequestSource.CLI, traceId }
        });
        logSub.unsubscribe();
        spin.stop();
      } catch (err) {
        logSub.unsubscribe();
        spin.stop();
        error(err.message);
        process.exit(1);
      }
    } else if (opts.config || opts.configFile) {
      let toolConfig;
      try {
        toolConfig = opts.configFile ? JSON.parse(fs6.readFileSync(opts.configFile, "utf-8")) : JSON.parse(opts.config);
      } catch (err) {
        logSub.unsubscribe();
        spin.stop();
        error(`Invalid tool config JSON: ${err.message}`);
        process.exit(1);
      }
      result = await runToolConfig(toolConfig);
    } else {
      const draft = readDraft(opts.draft);
      if (!draft) {
        logSub.unsubscribe();
        spin.stop();
        error(`Draft not found: ${opts.draft}`);
        process.exit(1);
      }
      result = await runToolConfig(draft.config);
    }
    const out = {
      success: result.success,
      data: result.data,
      ...result.error ? { error: result.error } : {},
      ...opts.includeStepResults && result.stepResults ? { stepResults: result.stepResults } : {},
      ...opts.includeConfig && result.tool ? { config: result.tool } : {}
    };
    output(out);
    if (config.output.mode === "stdout+file") {
      const outDir = path5.resolve(config.output.directory);
      if (!fs6.existsSync(outDir)) fs6.mkdirSync(outDir, { recursive: true });
      const rawId = opts.tool || opts.draft || "inline-config";
      const safeId = path5.basename(rawId).replace(/[^a-zA-Z0-9_-]/g, "_");
      const filename = `${safeId}-${Date.now()}.json`;
      fs6.writeFileSync(path5.join(outDir, filename), JSON.stringify(out, null, 2));
    }
    if (!result.success) process.exit(1);
  });
}

// src/commands/tool/edit.ts
var fs7 = __toESM(require("fs"));
var import_shared5 = __toESM(require_dist2());
var jsonpatch = __toESM(require("fast-json-patch"));
function registerEditCommand(parent, getContext2) {
  parent.command("edit").description("Edit a tool using JSON Patch operations").option("--draft <id>", "Draft ID to edit").option("--tool <id>", "Saved tool ID to edit").option("--patches <json-or-file>", "JSON Patch array (inline JSON or file path)").action(async (opts) => {
    const { client } = getContext2();
    if (!opts.draft && !opts.tool) {
      error("Provide --draft or --tool");
      process.exit(1);
    }
    if (!opts.patches) {
      error("--patches is required");
      process.exit(1);
    }
    let patches;
    try {
      const raw = fs7.existsSync(opts.patches) ? fs7.readFileSync(opts.patches, "utf-8") : opts.patches;
      patches = JSON.parse(raw);
      if (!Array.isArray(patches)) patches = [patches];
    } catch (err) {
      error(`Invalid patches: ${err.message}`);
      process.exit(1);
    }
    let originalConfig;
    let workingDraftId;
    if (opts.tool) {
      try {
        const saved = await client.getWorkflow(opts.tool);
        if (!saved) {
          error(`Tool not found: ${opts.tool}`);
          process.exit(1);
        }
        originalConfig = saved;
        workingDraftId = `fix-${opts.tool}-${Date.now()}`;
      } catch (err) {
        error(err.message);
        process.exit(1);
      }
    } else {
      const draft2 = readDraft(opts.draft);
      if (!draft2) {
        error(`Draft not found: ${opts.draft}`);
        process.exit(1);
      }
      originalConfig = draft2.config;
      workingDraftId = opts.draft;
    }
    let patchedConfig;
    try {
      const copy = JSON.parse(JSON.stringify(originalConfig));
      const result = jsonpatch.applyPatch(copy, patches, true, true);
      patchedConfig = (0, import_shared5.normalizeToolSchemas)(result.newDocument || copy);
    } catch (err) {
      error(`Patch failed: ${err.message}`);
      process.exit(1);
    }
    const diffs = patches.map((p) => ({
      op: p.op,
      path: p.path,
      ..."value" in p ? { value: p.value } : {},
      ..."from" in p && p.from ? { from: p.from } : {}
    }));
    if (process.stdout.isTTY && !process.argv.includes("--json")) {
      heading("Proposed Changes");
      console.log(renderDiffs(diffs));
      console.log("");
    }
    const draft = {
      draftId: workingDraftId,
      config: {
        ...patchedConfig,
        instruction: patchedConfig.instruction ?? originalConfig.instruction,
        updatedAt: (/* @__PURE__ */ new Date()).toISOString()
      },
      systemIds: patchedConfig.systemIds || [],
      instruction: patchedConfig.instruction ?? "",
      createdAt: (/* @__PURE__ */ new Date()).toISOString()
    };
    writeDraft(draft);
    if (process.argv.includes("--json") || !process.stdout.isTTY) {
      output({ success: true, draftId: workingDraftId, diffs });
    } else {
      success(`Draft updated: ${c.bold}${workingDraftId}${c.reset}`);
      console.log("");
    }
  });
}

// src/commands/tool/save.ts
function registerSaveCommand(parent, getContext2) {
  parent.command("save").description("Persist a draft tool to the database").requiredOption("--draft <id>", "Draft ID to save").option("--id <customId>", "Custom ID for the saved tool").action(async (opts) => {
    const { config, client } = getContext2();
    const draft = readDraft(opts.draft);
    if (!draft) {
      error(`Draft not found: ${opts.draft}`);
      process.exit(1);
    }
    const toolId = opts.id || draft.config.id;
    const spin = spinner(`Saving tool ${c.bold}${toolId}${c.reset}...`);
    try {
      const saved = await client.upsertWorkflow(toolId, {
        ...draft.config,
        id: toolId,
        systemIds: draft.systemIds
      });
      deleteDraft(opts.draft);
      spin.stop();
      const apiEndpoint = config.endpoint;
      if (process.argv.includes("--json") || !process.stdout.isTTY) {
        output({
          success: true,
          toolId: saved.id,
          webhookUrl: `${apiEndpoint}/v1/hooks/${saved.id}?token=YOUR_API_KEY`
        });
      } else {
        success(`Tool saved: ${c.bold}${saved.id}${c.reset}`);
        console.log(`  ${c.dim}webhook:${c.reset} ${apiEndpoint}/v1/hooks/${saved.id}`);
        console.log(`  ${c.dim}draft ${opts.draft} deleted${c.reset}`);
        console.log("");
      }
    } catch (err) {
      spin.stop();
      error(err.message);
      process.exit(1);
    }
  });
}

// src/commands/tool/find.ts
function registerFindCommand(parent, getContext2) {
  parent.command("list").description("List all tools").action(async () => {
    const { client } = getContext2();
    try {
      const { items } = await client.listWorkflows(1e3);
      table(
        items.map((t) => ({
          id: t.id,
          instruction: (t.instruction || "").slice(0, 60),
          steps: t.steps?.length || 0
        })),
        ["id", "instruction", "steps"]
      );
    } catch (err) {
      error(err.message);
      process.exit(1);
    }
  });
  parent.command("find [query]").description("Find tools by query or exact ID").option("--id <exactId>", "Exact tool ID lookup").action(async (query, opts) => {
    const { client } = getContext2();
    try {
      if (opts.id) {
        const tool = await client.getWorkflow(opts.id);
        if (!tool) {
          error(`Tool not found: ${opts.id}`);
          process.exit(1);
        }
        output({ success: true, tool });
        return;
      }
      const searchQuery = (query || "").trim() || "*";
      const { items } = await client.listWorkflows(1e3);
      const filtered = searchQuery === "*" ? items : (() => {
        const keywords = searchQuery.toLowerCase().split(/\s+/).filter((k) => k.length > 0);
        const scored = items.map((t) => {
          const text = [t.id, t.name, t.instruction].filter(Boolean).join(" ").toLowerCase();
          return {
            tool: t,
            score: keywords.filter((kw) => text.includes(kw)).length
          };
        });
        const matches = scored.filter((s) => s.score > 0);
        if (matches.length === 0) return items;
        matches.sort((a, b) => b.score - a.score);
        return matches.map((m) => m.tool);
      })();
      output({
        success: true,
        tools: filtered.map((t) => ({
          id: t.id,
          instruction: (t.instruction || "").slice(0, 80),
          steps: t.steps?.length || 0
        }))
      });
    } catch (err) {
      error(err.message);
      process.exit(1);
    }
  });
}

// src/commands/tool/index.ts
function registerToolCommands(program2, getContext2) {
  const tool = program2.command("tool").description("Manage superglue tools");
  registerBuildCommand(tool, getContext2);
  registerRunCommand(tool, getContext2);
  registerEditCommand(tool, getContext2);
  registerSaveCommand(tool, getContext2);
  registerFindCommand(tool, getContext2);
}

// src/commands/system/create.ts
var fs8 = __toESM(require("fs"));
var import_commander2 = require("commander");
var import_shared6 = __toESM(require_dist2());
async function collectSensitiveCredentials(fields) {
  const creds = {};
  for (const field of fields) {
    const envKey = `SUPERGLUE_CRED_${field.toUpperCase()}`;
    const envVal = process.env[envKey];
    if (envVal) {
      creds[field] = envVal;
    } else if (process.stdin.isTTY) {
      creds[field] = await promptHidden(`  Enter ${field}`);
    } else {
      error(`Missing credential: ${field}. Set ${envKey} or use interactive mode.`);
      process.exit(1);
    }
  }
  return creds;
}
function registerCreateCommand(parent, getContext2) {
  parent.command("create").description("Create a new system").option("--config <file>", "JSON config file").option("--id <id>", "System ID (derived from name if omitted)").option("--name <name>", "Human-readable name (required)").option("--url <url>", "API URL").option(
    "--template <id>",
    "Template ID \u2014 auto-fills URL, OAuth config, and credentials. Auto-detected from URL if omitted."
  ).option("--instructions <text>", "Specific instructions").option("--credentials <json>", "Non-sensitive credentials JSON").option("--sensitive-credentials <fields>", "Comma-separated sensitive credential field names").option("--docs-url <url>", "Documentation URL to scrape").option("--openapi-url <url>", "OpenAPI spec URL").addOption(
    new import_commander2.Option("--env <environment>", "Environment: dev or prod (default: prod)").choices([
      "dev",
      "prod"
    ])
  ).addHelpText("after", () => {
    const oauthTemplates = Object.entries(import_shared6.systems).filter(([, t]) => t.oauth).map(([key, t]) => `  ${key.padEnd(24)} ${t.name}`).join("\n");
    return `
OAuth templates (use with --template or auto-detected from URL):
${oauthTemplates}
`;
  }).action(async (opts) => {
    const { client } = getContext2();
    let systemInput;
    if (opts.config) {
      try {
        const parsed = JSON.parse(fs8.readFileSync(opts.config, "utf-8"));
        if (opts.env === "dev" || opts.env === "prod") {
          parsed.environment = opts.env;
        }
        systemInput = parsed;
      } catch (err) {
        error(`Invalid config file: ${err.message}`);
        process.exit(1);
      }
    } else {
      let credentials;
      if (opts.credentials) {
        try {
          credentials = JSON.parse(opts.credentials);
        } catch (err) {
          error(`Invalid --credentials JSON: ${err.message}`);
          process.exit(1);
        }
      }
      systemInput = {
        id: opts.id,
        name: opts.name,
        url: opts.url,
        specificInstructions: opts.instructions,
        credentials,
        environment: opts.env === "dev" || opts.env === "prod" ? opts.env : void 0
      };
    }
    let templateKey = opts.template;
    let template;
    if (templateKey) {
      template = import_shared6.systems[templateKey];
      if (!template) {
        error(
          `Template not found: ${templateKey}. Available: ${Object.keys(import_shared6.systems).join(", ")}`
        );
        process.exit(1);
      }
    } else if (systemInput.url || systemInput.name || systemInput.id) {
      const match = (0, import_shared6.findTemplateForSystem)({
        url: systemInput.url,
        name: systemInput.name,
        id: systemInput.id
      });
      if (match) {
        templateKey = match.key;
        template = match.template;
        if (process.stderr.isTTY) {
          process.stderr.write(
            `${c.dim}Auto-detected template: ${c.bold}${templateKey}${c.reset}${c.dim} (use --template to override)${c.reset}
`
          );
        }
      }
    }
    if (template && templateKey) {
      const oauthCreds = {};
      if (template.oauth) {
        if (template.oauth.authUrl) oauthCreds.auth_url = template.oauth.authUrl;
        if (template.oauth.tokenUrl) oauthCreds.token_url = template.oauth.tokenUrl;
        if (template.oauth.scopes) oauthCreds.scopes = template.oauth.scopes;
        if (template.oauth.client_id) oauthCreds.client_id = template.oauth.client_id;
      }
      systemInput = {
        ...systemInput,
        name: systemInput.name || template.name,
        url: systemInput.url || template.apiUrl,
        templateName: templateKey,
        credentials: { ...oauthCreds, ...systemInput.credentials }
      };
    }
    if (opts.sensitiveCredentials) {
      const fields = opts.sensitiveCredentials.split(",").map((f) => f.trim()).filter(Boolean);
      const sensitive = await collectSensitiveCredentials(fields);
      systemInput.credentials = { ...systemInput.credentials, ...sensitive };
    }
    if (typeof systemInput.name !== "string" || systemInput.name.trim() === "") {
      error("System name is required (--name)");
      process.exit(1);
    }
    if (!systemInput.id) {
      systemInput.id = (0, import_shared6.slugify)(systemInput.name.trim());
      if (!systemInput.id) {
        error("System ID could not be derived from name; use --id with letters or numbers");
        process.exit(1);
      }
    }
    try {
      const spin = spinner(`Creating system ${c.bold}${systemInput.id}${c.reset}...`);
      const result = await client.createSystem(systemInput);
      spin.stop();
      if (opts.docsUrl) {
        try {
          await client.triggerSystemDocumentationScrapeJob(result.id, { url: opts.docsUrl });
        } catch {
        }
      }
      if (opts.openapiUrl) {
        try {
          await client.fetchOpenApiSpec(result.id, opts.openapiUrl);
        } catch {
        }
      }
      if (process.argv.includes("--json") || !process.stdout.isTTY) {
        output({
          success: true,
          system: { id: result.id, name: result.name, url: result.url },
          ...templateKey ? { template: templateKey } : {}
        });
      } else {
        success(`System created: ${c.bold}${result.id}${c.reset}`, {
          name: result.name,
          url: result.url,
          ...templateKey ? { template: templateKey } : {}
        });
      }
    } catch (err) {
      error(err.message);
      process.exit(1);
    }
  });
}

// src/commands/system/edit.ts
var import_commander3 = require("commander");
function registerEditCommand2(parent, getContext2) {
  parent.command("edit").description("Edit an existing system").requiredOption("--id <id>", "System ID").option("--name <name>", "New name").option("--url <url>", "New URL").option("--instructions <text>", "New specific instructions").option("--credentials <json>", "Non-sensitive credentials JSON to merge").option("--sensitive-credentials <fields>", "Comma-separated sensitive credential field names").option("--scrape-url <url>", "Documentation URL to scrape").option("--scrape-keywords <keywords>", "Space-separated scrape keywords").addOption(
    new import_commander3.Option("--env <environment>", "Environment: dev or prod").choices(["dev", "prod"])
  ).action(async (opts) => {
    const { client } = getContext2();
    const patchPayload = { id: opts.id };
    if (opts.name) patchPayload.name = opts.name;
    if (opts.url) patchPayload.url = opts.url;
    if (opts.instructions) patchPayload.specificInstructions = opts.instructions;
    if (opts.credentials) {
      try {
        patchPayload.credentials = JSON.parse(opts.credentials);
      } catch (err) {
        error(`Invalid --credentials JSON: ${err.message}`);
        process.exit(1);
      }
    }
    if (opts.sensitiveCredentials) {
      const fields = opts.sensitiveCredentials.split(",").map((f) => f.trim()).filter(Boolean);
      const creds = {};
      for (const field of fields) {
        const envKey = `SUPERGLUE_CRED_${field.toUpperCase()}`;
        const envVal = process.env[envKey];
        if (envVal) {
          creds[field] = envVal;
        } else if (process.stdin.isTTY) {
          creds[field] = await promptHidden(`  Enter ${field}`);
        } else {
          error(`Missing credential: ${field}. Set ${envKey} or use interactive mode.`);
          process.exit(1);
        }
      }
      patchPayload.credentials = { ...patchPayload.credentials, ...creds };
    }
    try {
      const envOption = opts.env === "dev" || opts.env === "prod" ? { environment: opts.env } : void 0;
      const spin = spinner(`Updating system ${c.bold}${opts.id}${c.reset}...`);
      const existing = await client.getSystem(opts.id, envOption);
      if (!existing) {
        spin.stop();
        error(`System not found: ${opts.id}`);
        process.exit(1);
      }
      if (patchPayload.credentials && existing.credentials) {
        patchPayload.credentials = { ...existing.credentials, ...patchPayload.credentials };
      }
      const result = await client.updateSystem(opts.id, patchPayload, envOption);
      if (opts.scrapeUrl) {
        try {
          const keywords = opts.scrapeKeywords?.split(" ").filter(Boolean);
          await client.triggerSystemDocumentationScrapeJob(result.id, {
            url: opts.scrapeUrl,
            keywords
          });
        } catch (scrapeErr) {
          const errMsg = scrapeErr instanceof Error ? scrapeErr.message : String(scrapeErr || "Unknown error");
          warn(`Documentation scrape failed for ${opts.scrapeUrl}: ${errMsg}`);
        }
      }
      spin.stop();
      if (process.argv.includes("--json") || !process.stdout.isTTY) {
        output({ success: true, system: { id: result.id, name: result.name, url: result.url } });
      } else {
        success(`System updated: ${c.bold}${result.id}${c.reset}`);
      }
    } catch (err) {
      error(err.message);
      process.exit(1);
    }
  });
}

// src/commands/system/find.ts
var import_commander4 = require("commander");
var import_shared7 = __toESM(require_dist2());
function filterSystemFields(system) {
  const credentialKeys = Object.keys(system.credentials || {});
  return {
    id: system.id,
    name: system.name,
    url: system.url,
    environment: system.environment,
    specificInstructions: system.specificInstructions,
    credentialPlaceholders: credentialKeys.map((k) => `<<${system.id}_${k}>>`)
  };
}
function registerFindCommand2(parent, getContext2) {
  parent.command("list").description("List all systems").option("--mode <mode>", "Filter by environment: dev, prod, or all (default: all)").action(async (opts) => {
    const { client } = getContext2();
    try {
      const mode = opts.mode === "dev" || opts.mode === "prod" ? opts.mode : "all";
      const { items } = await client.listSystems(100, 1, { mode });
      table(
        items.map((s) => ({
          id: s.id,
          name: s.name || "",
          env: s.environment || "prod",
          url: (s.url || "").slice(0, 50)
        })),
        ["id", "name", "env", "url"]
      );
    } catch (err) {
      error(err.message);
      process.exit(1);
    }
  });
  parent.command("find [query]").description("Find systems by query or exact ID").option("--id <exactId>", "Exact system ID lookup").addOption(
    new import_commander4.Option("--env <environment>", "Environment: dev or prod").choices(["dev", "prod"])
  ).action(async (query, opts) => {
    const { client } = getContext2();
    try {
      if (opts.id) {
        const envOption = opts.env === "dev" || opts.env === "prod" ? { environment: opts.env } : void 0;
        const system = await client.getSystem(opts.id, envOption);
        if (!system) {
          error(`System not found: ${opts.id}`);
          process.exit(1);
        }
        const templateMatch = (0, import_shared7.findTemplateForSystem)(system);
        output({
          success: true,
          system: filterSystemFields(system),
          template: templateMatch?.template || null
        });
        return;
      }
      const listMode = opts.env ? { mode: opts.env } : void 0;
      const rawQuery = (query || "*").trim();
      const { items } = await client.listSystems(100, 1, listMode);
      if (rawQuery === "*") {
        output({
          success: true,
          systems: items.map((s) => ({ id: s.id, name: s.name, url: s.url }))
        });
        return;
      }
      const keywords = rawQuery.toLowerCase().split(/\s+/);
      const filtered = items.filter((s) => {
        const text = [s.id, s.name, s.url].filter(Boolean).join(" ").toLowerCase();
        return keywords.some((kw) => text.includes(kw));
      });
      output({
        success: true,
        systems: filtered.map((s) => ({ id: s.id, name: s.name, url: s.url }))
      });
    } catch (err) {
      error(err.message);
      process.exit(1);
    }
  });
}

// src/commands/system/call.ts
var import_commander5 = require("commander");
var import_shared8 = __toESM(require_dist2());
function registerCallCommand(parent, getContext2) {
  parent.command("call").description("Call a system (API, database, file server)").requiredOption("--url <url>", "Full URL including protocol").option("--system-id <id>", "System ID for credential injection").option("--method <method>", "HTTP method", "GET").option("--headers <json>", "HTTP headers JSON").option("--body <string>", "Request body").option(
    "--file <key=path...>",
    "File references",
    (v, arr) => {
      arr.push(v);
      return arr;
    },
    []
  ).addOption(
    new import_commander5.Option("--env <environment>", "Environment: dev or prod").choices(["dev", "prod"])
  ).action(async (opts) => {
    const { client } = getContext2();
    const method = opts.method || "GET";
    const filePayloads = await parseFileFlags(opts.file, client);
    let body = opts.body;
    if (body && Object.keys(filePayloads).length > 0) {
      try {
        let parsed = JSON.parse(body);
        const resolveFileRefs = (obj) => {
          if (typeof obj === "string" && obj.startsWith("file::")) {
            const key = obj.slice(6);
            if (key in filePayloads) return filePayloads[key];
            error(
              `Unresolved file reference: file::${key}. Available: ${Object.keys(filePayloads).join(", ") || "(none)"}`
            );
            process.exit(1);
          }
          if (Array.isArray(obj)) return obj.map(resolveFileRefs);
          if (obj && typeof obj === "object") {
            const result = {};
            for (const [k, v] of Object.entries(obj)) {
              result[k] = resolveFileRefs(v);
            }
            return result;
          }
          return obj;
        };
        parsed = resolveFileRefs(parsed);
        body = JSON.stringify(parsed);
      } catch (err) {
        if (err.message?.startsWith("Unresolved file reference")) throw err;
      }
    }
    let headers;
    if (opts.headers) {
      try {
        headers = JSON.parse(opts.headers);
      } catch (err) {
        error(`Invalid --headers JSON: ${err.message}`);
        process.exit(1);
      }
    }
    const step = {
      id: `call_system_${Date.now()}`,
      failureBehavior: "continue",
      config: {
        url: opts.url,
        method,
        headers,
        body,
        systemId: opts.systemId
      }
    };
    try {
      const mode = opts.env === "dev" || opts.env === "prod" ? opts.env : void 0;
      const result = await client.executeStep({ step, payload: {}, mode });
      const responseData = result.data?.data !== void 0 ? result.data.data : result.data;
      output({
        success: result.success,
        protocol: (0, import_shared8.getConnectionProtocol)(opts.url),
        data: responseData,
        ...result.error ? { error: result.error } : {}
      });
      if (!result.success) process.exit(1);
    } catch (err) {
      error(err.message);
      process.exit(1);
    }
  });
}

// src/commands/system/docs.ts
function registerDocsCommand(parent, getContext2) {
  parent.command("search-docs").description("Search system documentation by keywords").requiredOption("--system-id <id>", "System ID").requiredOption("-k, --keywords <keywords>", "Search keywords").action(async (opts) => {
    const { client } = getContext2();
    try {
      const result = await client.searchSystemDocumentation(opts.systemId, opts.keywords);
      if (!result || result.trim().length === 0) {
        if (process.argv.includes("--json") || !process.stdout.isTTY) {
          output({ success: false, message: "No documentation found for this system" });
        } else {
          info("No documentation found for this system");
        }
      } else if (result.startsWith("No relevant sections found")) {
        if (process.argv.includes("--json") || !process.stdout.isTTY) {
          output({ success: true, noResults: true, message: result, keywords: opts.keywords });
        } else {
          info(result);
        }
      } else {
        if (process.argv.includes("--json") || !process.stdout.isTTY) {
          output({ success: true, content: result, keywords: opts.keywords });
        } else {
          heading(`Documentation: ${opts.systemId}`);
          console.log(`  ${c.dim}Keywords: ${opts.keywords}${c.reset}
`);
          const lines = result.split("\n");
          for (const line of lines) {
            if (line.startsWith("# ") || line.startsWith("## ") || line.startsWith("### ")) {
              console.log(`  ${c.bold}${c.cyan}${line}${c.reset}`);
            } else if (line.startsWith("```")) {
              console.log(`  ${c.dim}${line}${c.reset}`);
            } else if (line.startsWith("- ") || line.startsWith("* ")) {
              console.log(`  ${c.yellow}\u2022${c.reset} ${line.slice(2)}`);
            } else {
              console.log(`  ${line}`);
            }
          }
          console.log("");
        }
      }
    } catch (err) {
      error(err.message);
      process.exit(1);
    }
  });
}

// src/commands/system/oauth.ts
var import_node_child_process2 = require("child_process");
var import_node_crypto = __toESM(require("crypto"));
var import_shared9 = __toESM(require_dist2());
function openBrowser(url) {
  const platform = process.platform;
  const cmd = platform === "darwin" ? "open" : platform === "win32" ? "cmd" : "xdg-open";
  const args = platform === "win32" ? ["/c", "start", "", url] : [url];
  (0, import_node_child_process2.spawn)(cmd, args, { detached: true, stdio: "ignore" }).unref();
}
async function pollForTokens(client, systemId, originalToken, timeoutMs = 3e5, intervalMs = 2e3) {
  const start = Date.now();
  while (Date.now() - start < timeoutMs) {
    await new Promise((r) => setTimeout(r, intervalMs));
    try {
      const system = await client.getSystem(systemId);
      const currentToken = system?.credentials?.access_token;
      if (currentToken && currentToken !== originalToken) {
        return true;
      }
    } catch {
    }
  }
  return false;
}
function registerOAuthCommand(parent, getContext2) {
  parent.command("oauth").description("Authenticate a system via OAuth").requiredOption("--system-id <id>", "System ID").requiredOption("--scopes <scopes>", "Space-separated OAuth scopes").option("--auth-url <url>", "OAuth authorization URL").option("--token-url <url>", "OAuth token URL").option("--grant-type <type>", "Grant type", "authorization_code").action(async (opts) => {
    const { config, client } = getContext2();
    let system;
    try {
      system = await client.getSystem(opts.systemId);
      if (!system) {
        error(`System not found: ${opts.systemId}`);
        process.exit(1);
      }
    } catch (err) {
      error(err.message);
      process.exit(1);
    }
    const templateMatch = (0, import_shared9.findTemplateForSystem)(system);
    const templateOAuth = templateMatch?.template?.oauth;
    const clientId = system.credentials?.client_id ?? templateOAuth?.client_id;
    const authUrl = opts.authUrl ?? system.credentials?.auth_url ?? templateOAuth?.authUrl;
    const tokenUrl = opts.tokenUrl ?? system.credentials?.token_url ?? templateOAuth?.tokenUrl;
    const grantType = opts.grantType ?? system.credentials?.grant_type ?? "authorization_code";
    if (!clientId) {
      error("Missing client_id. Add it to the system credentials first.");
      process.exit(1);
    }
    if (!tokenUrl) {
      error("Missing token_url. Provide --token-url or add it to credentials.");
      process.exit(1);
    }
    if (grantType === "client_credentials") {
      const spin2 = spinner("Exchanging client credentials...");
      try {
        const step = {
          id: `oauth_cc_${Date.now()}`,
          failureBehavior: "continue",
          config: {
            url: tokenUrl,
            method: "POST",
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
            body: new URLSearchParams({
              grant_type: "client_credentials",
              client_id: clientId,
              ...system.credentials?.client_secret ? { client_secret: system.credentials.client_secret } : {},
              ...opts.scopes ? { scope: opts.scopes } : {}
            }).toString()
          }
        };
        const result = await client.executeStep({ step, payload: {} });
        if (result.success && result.data) {
          const tokens = result.data.data || result.data;
          if (tokens.access_token) {
            await client.updateSystem(opts.systemId, {
              credentials: {
                ...system.credentials,
                access_token: tokens.access_token,
                refresh_token: tokens.refresh_token,
                token_type: tokens.token_type || "Bearer",
                ...tokens.expires_in ? {
                  expires_at: new Date(Date.now() + tokens.expires_in * 1e3).toISOString()
                } : {}
              }
            });
            spin2.stop();
            success(
              `OAuth client_credentials flow completed for ${c.bold}${opts.systemId}${c.reset}`
            );
            return;
          }
        }
        spin2.stop();
        error("Token exchange failed");
        process.exit(1);
      } catch (err) {
        spin2.stop();
        error(err.message);
        process.exit(1);
      }
    }
    if (!authUrl) {
      error("Missing auth_url for authorization_code flow. Provide --auth-url.");
      process.exit(1);
    }
    const originalToken = system.credentials?.access_token;
    let encryptionSecret;
    let orgId;
    try {
      const secretData = await client.getCliOAuthSecret();
      encryptionSecret = secretData.secret;
      orgId = secretData.orgId;
    } catch (err) {
      error(`Failed to get OAuth encryption secret: ${err.message}`);
      process.exit(1);
    }
    const encryptedApiKey = (0, import_shared9.encryptCliApiKey)(config.apiKey, opts.systemId, encryptionSecret);
    let clientCredentialsUid;
    if (system.credentials?.client_secret && clientId) {
      clientCredentialsUid = import_node_crypto.default.randomUUID();
      try {
        await client.cacheOauthClientCredentials({
          clientCredentialsUid,
          clientId,
          clientSecret: system.credentials.client_secret
        });
      } catch (err) {
        error(`Failed to cache OAuth credentials: ${err.message}`);
        process.exit(1);
      }
    }
    const redirectUri = `${config.webEndpoint.replace(/\/$/, "")}/api/auth/callback`;
    const state = {
      systemId: opts.systemId,
      orgId,
      timestamp: Date.now(),
      redirectUri,
      token_url: tokenUrl,
      clientId,
      ...templateMatch ? { templateId: templateMatch.key } : {},
      ...clientCredentialsUid ? { client_credentials_uid: clientCredentialsUid } : {},
      scopes: opts.scopes,
      cliApiKey: encryptedApiKey
    };
    const params = new URLSearchParams({
      client_id: clientId,
      redirect_uri: redirectUri,
      response_type: "code",
      state: Buffer.from(JSON.stringify(state)).toString("base64"),
      scope: opts.scopes
    });
    if (authUrl.includes("google.com")) {
      params.append("access_type", "offline");
      params.append("prompt", "consent");
    }
    const fullAuthUrl = `${authUrl}?${params.toString()}`;
    const spin = spinner("Waiting for browser authentication...");
    openBrowser(fullAuthUrl);
    const authenticated = await pollForTokens(client, opts.systemId, originalToken);
    spin.stop();
    if (authenticated) {
      success(`OAuth authentication successful for ${c.bold}${opts.systemId}${c.reset}`);
    } else {
      error("Authentication timed out (5 minutes)");
      process.exit(1);
    }
  });
}

// src/commands/system/index.ts
function registerSystemCommands(program2, getContext2) {
  const system = program2.command("system").description("Manage superglue systems");
  registerCreateCommand(system, getContext2);
  registerEditCommand2(system, getContext2);
  registerFindCommand2(system, getContext2);
  registerCallCommand(system, getContext2);
  registerDocsCommand(system, getContext2);
  registerOAuthCommand(system, getContext2);
}

// src/commands/run/list.ts
function registerListCommand(parent, getContext2) {
  parent.command("list").description("List recent runs").option("--tool <id>", "Filter by tool ID").option("--status <status>", "Filter by status (running, success, failed, aborted)").option("--source <sources>", "Comma-separated request sources").option("--user <userId>", "Filter by user ID").option("--system-id <id>", "Filter by system ID").option("--limit <n>", "Max results", "10").option("--offset <n>", "Skip first N results", "0").action(async (opts) => {
    const { client } = getContext2();
    try {
      const limit = Math.min(parseInt(opts.limit, 10) || 10, 50);
      const offset = parseInt(opts.offset, 10) || 0;
      const page = Math.ceil((offset + 1) / limit);
      const requestSources = opts.source?.split(",").filter(Boolean);
      const result = await client.listRuns({
        toolId: opts.tool,
        limit,
        page,
        status: opts.status,
        requestSources,
        userId: opts.user,
        systemId: opts.systemId
      });
      if (process.argv.includes("--json") || !process.stdout.isTTY) {
        output({
          success: true,
          total: result.total,
          runs: result.items.map((r) => ({
            runId: r.runId,
            toolId: r.toolId,
            status: r.status,
            requestSource: r.requestSource,
            error: r.error
          }))
        });
      } else {
        if (result.total > 0) {
          info(
            `${result.total} total runs${opts.tool ? ` for ${c.bold}${opts.tool}${c.reset}` : ""}`
          );
        }
        table(
          result.items.map((r) => ({
            runId: (r.runId || "").slice(0, 12),
            toolId: r.toolId || "",
            status: r.status || "",
            source: r.requestSource || ""
          })),
          ["runId", "toolId", "status", "source"]
        );
      }
    } catch (err) {
      error(err.message);
      process.exit(1);
    }
  });
}

// src/commands/run/get.ts
function registerGetCommand(parent, getContext2) {
  parent.command("get <runId>").description("Get details of a specific run").action(async (runId) => {
    const { client } = getContext2();
    try {
      const run = await client.getRun(runId);
      if (!run) {
        error(`Run not found: ${runId}`);
        process.exit(1);
      }
      output({
        success: true,
        run: {
          runId: run.runId,
          toolId: run.toolId,
          status: run.status,
          error: run.error,
          toolPayload: run.toolPayload,
          data: run.data,
          requestSource: run.requestSource,
          ...run.stepResults ? { stepResults: run.stepResults } : {}
        }
      });
    } catch (err) {
      error(err.message);
      process.exit(1);
    }
  });
}

// src/commands/run/index.ts
function registerRunCommands(program2, getContext2) {
  const run = program2.command("run").description("View tool execution runs");
  registerListCommand(run, getContext2);
  registerGetCommand(run, getContext2);
}

// src/commands/update.ts
function registerUpdateCommand(program2) {
  program2.command("update").description("Update the superglue CLI to the latest version").option("--check", "Only check for updates, don't install").action(async (opts) => {
    if (opts.check) {
      const spin2 = spinner("Checking for updates...");
      const latestVersion = await getLatestNpmVersion();
      spin2.stop();
      if (!latestVersion) {
        error("Could not fetch latest version from npm");
        process.exit(1);
      }
      const comparison = compareVersions(CLI_VERSION, latestVersion);
      if (comparison >= 0) {
        success(`You're on the latest version (${CLI_VERSION})`);
      } else {
        console.log("");
        console.log(`  ${c.dim}Current version:${c.reset} ${CLI_VERSION}`);
        console.log(`  ${c.green}Latest version:${c.reset}  ${latestVersion}`);
        console.log("");
        console.log(`  Run ${c.bold}sg update${c.reset} to upgrade`);
        console.log("");
      }
      return;
    }
    const spin = spinner("Updating @superglue/cli...");
    const result = await updateCli();
    spin.stop();
    if (result.success) {
      success(result.message);
    } else {
      error(result.message);
      process.exit(1);
    }
  });
}

// src/commands/skill.ts
var fs9 = __toESM(require("fs"));
var path6 = __toESM(require("path"));
var SKILLS_DIR = fs9.existsSync(path6.resolve(__dirname, "skills/superglue")) ? path6.resolve(__dirname, "skills/superglue") : path6.resolve(__dirname, "../../skills/superglue");
function registerSkillCommand(program2) {
  program2.command("skill").description("Print the superglue skill reference (SKILL.md) for AI agents").argument("[topic]", "Optional topic: references/<topic>.md (e.g. databases, integration)").action((topic) => {
    const file = topic ? path6.join(SKILLS_DIR, "references", `${topic}.md`) : path6.join(SKILLS_DIR, "SKILL.md");
    if (!fs9.existsSync(file)) {
      if (topic) {
        const refsDir = path6.join(SKILLS_DIR, "references");
        const available = fs9.existsSync(refsDir) ? fs9.readdirSync(refsDir).filter((f) => f.endsWith(".md")).map((f) => f.replace(".md", "")) : [];
        error(`Topic not found: ${topic}. Available: ${available.join(", ") || "none"}`);
      } else {
        error(`Skill file not found: ${file}`);
      }
      process.exit(1);
    }
    process.stdout.write(fs9.readFileSync(file, "utf-8"));
  });
}

// src/cli.ts
var program = new import_commander6.Command();
program.name("sg").description("superglue CLI \u2014 build, run, and manage integration tools").version(CLI_VERSION).option("--api-key <key>", "superglue API key").option("--endpoint <url>", "superglue API endpoint").option("--json", "force JSON output").addHelpText(
  "after",
  `
IMPORTANT FOR AI AGENTS:
  Before using the sg CLI, you MUST read the skill reference for complete usage
  instructions, patterns, and examples:

    sg skill                        Print the main SKILL.md reference
    sg skill databases              Print the databases reference
    sg skill integration            Print the SDK/REST/webhook reference
    sg skill file-servers           Print the file servers reference
    sg skill transforms-and-output  Print the transforms reference
    sg skill redis                  Print the Redis reference

  The main skill reference covers: tool building, system setup, OAuth flows,
  credential handling, variable syntax, data selectors, and common pitfalls.
  DO NOT attempt to use sg commands without reading the skill reference first.

All Commands:
  sg init                                        Set up CLI configuration

  sg tool build --config <file>                  Build a tool from a JSON config
  sg tool build --id <id> --instruction <text>   Build a tool from flags (requires --steps)
  sg tool run --tool <id> [--payload <json>]     Run a saved tool
  sg tool run --draft <id> [--payload <json>]    Run a draft tool
  sg tool run --config <json> [--payload <json>] Run inline config
  sg tool edit --tool <id> --patches <json>      Edit a tool via JSON Patch
  sg tool edit --draft <id> --patches <json>     Edit a draft via JSON Patch
  sg tool save --draft <id>                      Save a draft to the server
  sg tool list                                   List all saved tools
  sg tool find [query]                           Search tools by keyword
  sg tool find --id <id>                         Get full config of a tool

  sg system create --config <file>               Create a system from JSON config
  sg system create --name <name> --url <url>     Create a system from flags
  sg system edit --id <id>                       Edit a system's configuration
  sg system list                                 List all systems
  sg system find [query]                         Search systems by keyword
  sg system find --id <id>                       Get full config of a system
  sg system call --url <url> [--method GET]      Call an API, database, or file server
  sg system search-docs --system-id <id> -k <kw> Search system documentation
  sg system oauth --system-id <id> --scopes <s>  Authenticate a system via OAuth

  sg run list [toolId]                           List runs, optionally filtered by tool
  sg run get <runId>                             Get details of a specific run

  sg skill [topic]                                Print skill reference for AI agents
  sg update                                      Update CLI to latest version
  sg update --check                              Check for available updates

Global Flags:
  --api-key <key>    Override API key from config
  --endpoint <url>   Override API endpoint from config
  --json             Force JSON output (default in non-TTY)
`
);
var getContext = () => {
  const opts = program.opts();
  const config = resolveConfig({ apiKey: opts.apiKey, endpoint: opts.endpoint });
  const client = createClient(config);
  return { config, client };
};
registerInitCommand(program);
registerUpdateCommand(program);
registerSkillCommand(program);
registerToolCommands(program, getContext);
registerSystemCommands(program, getContext);
registerRunCommands(program, getContext);
var commandsRequiringServer = ["tool", "system", "run"];
var globalFlagsWithValues = ["--api-key", "--endpoint"];
var globalFlagsNoValue = ["--json", "-h", "--help", "-V", "--version"];
function findSubcommand(argv) {
  let i = 2;
  while (i < argv.length) {
    const arg = argv[i];
    if (globalFlagsWithValues.includes(arg)) {
      i += 2;
    } else if (globalFlagsNoValue.includes(arg)) {
      i += 1;
    } else if (arg.startsWith("-")) {
      i += 1;
    } else {
      return arg;
    }
  }
  return void 0;
}
function extractFlagValue(argv, flag) {
  for (let i = 0; i < argv.length; i++) {
    const arg = argv[i];
    if (arg.startsWith(`${flag}=`)) {
      return arg.slice(flag.length + 1);
    }
    if (arg === flag && i + 1 < argv.length) {
      return argv[i + 1];
    }
  }
  return void 0;
}
var subcommand = findSubcommand(process.argv);
startBackgroundUpdateCheck();
var runAndNotify = async (parsePromise) => {
  await parsePromise;
  await printUpdateNotification();
};
if (subcommand && commandsRequiringServer.includes(subcommand)) {
  const cliApiKey = extractFlagValue(process.argv, "--api-key");
  const cliEndpoint = extractFlagValue(process.argv, "--endpoint");
  const config = resolveConfig({ apiKey: cliApiKey, endpoint: cliEndpoint });
  if (config.apiKey) {
    runAndNotify(checkVersionCompatibility(config.endpoint).then(() => program.parseAsync()));
  } else {
    runAndNotify(program.parseAsync());
  }
} else {
  runAndNotify(program.parseAsync());
}
