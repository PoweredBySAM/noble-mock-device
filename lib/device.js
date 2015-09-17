'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _events = require('events');

var _nodeIpc = require('node-ipc');

var _nodeIpc2 = _interopRequireDefault(_nodeIpc);

_nodeIpc2['default'].config.id = 'device-client';
_nodeIpc2['default'].config.retry = 1500;

var createDevice = function createDevice(namespace, deviceType) {
  var device = new Device(namespace, deviceType);
  return device;
};

exports.createDevice = createDevice;

var Device = (function (_EventEmitter) {
  _inherits(Device, _EventEmitter);

  function Device(namespace, params) {
    _classCallCheck(this, Device);

    _get(Object.getPrototypeOf(Device.prototype), 'constructor', this).call(this);
    _nodeIpc2['default'].config.appspace = namespace + ".";
    this.params = params;
  }

  _createClass(Device, [{
    key: 'connect',
    value: function connect() {
      var _this = this;

      _nodeIpc2['default'].connectTo('noblemock', function () {
        _nodeIpc2['default'].of.noblemock.on('connect', function () {
          // ipc.log('connected to mock'.rainbow, ipc.config.delay)
          _nodeIpc2['default'].of.noblemock.emit('client:connected', _this.params);
        });
        _nodeIpc2['default'].of.noblemock.on('disconnect', function () {
          // ipc.log('disconnected from mock'.notice)
        });
        _nodeIpc2['default'].of.noblemock.on('message', function (data) {
          // console.log("MESSAGE");
          // ipc.log('message:'.debug, data)
        });
      });
    }
  }, {
    key: 'disconnect',
    value: function disconnect() {
      _nodeIpc2['default'].of.noblemock.emit('client:disconnected');
    }
  }, {
    key: 'turnOn',
    value: function turnOn() {
      if (!this.connection) {
        throw "No IPC connection";
      }
      connection.write({ event: 'turnedOn' });
    }
  }, {
    key: 'turnOff',
    value: function turnOff() {
      if (!this.connection) {
        throw "No IPC connection";
      }
      connection.write({ event: 'turnedOff' });
    }
  }]);

  return Device;
})(_events.EventEmitter);