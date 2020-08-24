enum TYPE {
  USER = "USER",
  ROOM = "ROOM",
}

enum ACTION {
  JOIN = "JOIN",
}

interface Event {
  type: TYPE;
  action: ACTION;
  from: string;
  message?: any;
}

let socket: WebSocket | undefined;

function send(event: Event) {
  socket?.send(JSON.stringify(event));
}

type Listener = (event: Event) => void;
const listeners: Record<string, Listener[]> = {};

function onMessage(event: Event) {
  if (event.type === TYPE.USER && event.action === ACTION.JOIN) {
    listeners["userjoin"]?.forEach((func) => func(event));
  }
}

export function on(event: string, listener: Listener) {
  const group = (listeners[event] || []).concat(listener);

  listeners[event] = group;
}

export function login(username: string) {
  send({
    type: TYPE.USER,
    action: ACTION.JOIN,
    from: username,
  });
}

export function connect(url: string) {
  socket = new WebSocket(url);

  socket.onopen = (event) => {};

  socket.onmessage = (event) => {
    onMessage(JSON.parse(event.data));
  };
}
