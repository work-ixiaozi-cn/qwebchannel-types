declare enum QWebChannelMessageTypes {
    signal = 1,
    propertyUpdate = 2,
    init = 3,
    idle = 4,
    debug = 5,
    invokeMethod = 6,
    connectToSignal = 7,
    disconnectFromSignal = 8,
    setProperty = 9,
    response = 10,
  }
  
  declare interface QWebChannelTransport {
      send(data: string): void;
      onmessage: (message: { data: any }) => void;
  }
  
  declare interface QWebChannelObject {
      [signalName: string]: {
          connect(callback: Function): void;
          disconnect(callback: Function): void;
      };
  }
  
  declare class QObject {
      constructor(name: string, data: any, webChannel: QWebChannel);
  
      public unwrapProperties(): void;
  
      public signalEmitted(signalName: string, signalArgs: any[]): void;
  
      public propertyUpdate(signals: { [key: string]: any[] }, propertyMap: { [key: string]: any }): void;
  
      public toJSON(): { id: string; "__QObject*__": true };
  }
  
  declare class QWebChannel {
      constructor(transport: QWebChannelTransport, initCallback?: (channel: QWebChannel) => void);
  
      public send(data: any): void;
  
      public exec(data: any, callback?: (response: any) => void): void;
  
      public debug(message: string): void;
  
      public objects: { [key: string]: QObject };
  }
  
  export { QWebChannel, QWebChannelTransport, QWebChannelObject, QObject };
  
  declare global {
    interface Window {
      qt: {
        webChannelTransport: QWebChannelTransport
      };
    }
  }