import { EventEmitter } from 'events'
import ipc from '../vendor/node-ipc'

ipc.config.id = 'device-client-' + Math.random()
ipc.config.retry = 1500
ipc.config.silent = true

export const createDevice = (namespace, deviceType) => {
  const device = new Device(namespace, deviceType)
  return device
}

class Device extends EventEmitter {
  constructor(namespace, params) {
    super()
    ipc.config.appspace = namespace + "."
    this.params = params
  }
  connect() {
    ipc.connectTo('noblemock', () => {
      ipc.of.noblemock.on('connect', () => {
        ipc.of.noblemock.emit('client:connected', this.params)
      })
      ipc.of.noblemock.on('disconnect', () => {
        // ipc.log('disconnected from mock'.notice)
      })
      ipc.of.noblemock.on('client:write', (data) => {
        this.emit("write", data);
      })
    })
  }
  disconnect() {
    ipc.of.noblemock.emit('client:disconnected')
  }
  write(data) {
    ipc.of.noblemock.emit('client:read', data)
  }
  turnOn() {
    if (!this.connection) {
      throw "No IPC connection"
    }
    connection.write({event: 'turnedOn'})
  }

  turnOff() {
    if (!this.connection) {
      throw "No IPC connection"
    }
    connection.write({event: 'turnedOff'})
  }


}
