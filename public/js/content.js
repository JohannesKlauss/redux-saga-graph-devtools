const Events = {
  RELAY: 'RELAY',
  TAB_DISCONNECTED: 'TAB_DISCONNECTED',
  TAB_RECONNECTED: 'TAB_RECONNECTED'
};

const EVENT_SOURCE = '@sagaMonitor';
const TAB = 'tab';

let background,
  connected = false;

function connect() {
  connected = true;

  background = chrome.runtime.connect({name: TAB});
}

function sendMessage(message) {
  if (!connected) {
    connect();
  }

  background.postMessage({
    name: Events.RELAY,
    message
  });
}

function handleMessage(event) {
  const message = event.data;

  if(message.source === EVENT_SOURCE) {
    sendMessage(message.action);
  }
}

window.addEventListener('message', handleMessage, false);
