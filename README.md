# noble mock device

`client` part of the noble mock.

the server part is is located at: 
[noble-mock](http://github.com/PoweredBySAM/noble-mock)

# installation

  npm run build

# usage:

```js
  var device = require('../lib/device.js');
  var deviceData = advertisement: {
      localName: 'MyDeviceName',
      manufacturerData: {
        type: 'Buffer',
        data: [1, 2, 3 ...]
      }
    },
    uuids: {
      charDataRead: "xxx",
      charSetGroupID: "xxx",
      charDataWrite: "xxx",
      pairedFlag: "xxx",
      pairedProfileID: "xxx",
      bdAddress: "xxx",

      serviceBattery: "180f",
      charBatteryLevel: "2a19"
    }

  };

  var pot = device.createDevice("MyNamespace", deviceData); // initialize a device
  pot.connect();                              // connect (get discovered)
  pot.write([42, 42, 42]);                    // send data
  pot.on('write', function(data) {            // receive data
    console.log("data in", data);
  });
  pot.disconnect();                           // close connection

  console.log(pot)
```
