enum TYPE {
  USER = "USER",
  ROOM = "ROOM",
}

enum ACTION {
  JOIN = "JOIN",
  UPDATE = "UPDATE",
  LEAVE = "LEAVE",
}

interface Event {
  type: TYPE;
  action: ACTION;
  from: string;
  message?: any;
}

type Listener = (event: Event) => void;

let socket: WebSocket | undefined;
const listeners: Record<string, Listener[]> = {};

function send(event: Event) {
  socket?.send(JSON.stringify(event));
}

function onMessage(event: Event) {
  const name = `${event.type}_${event.action}`;

  listeners[name]?.forEach((func) => func(event));
}

export function on(event: string, listener: Listener) {
  const group = (listeners[event] || []).concat(listener);

  listeners[event] = group;

  return () => {
    const group = listeners[event].filter((func) => func !== listener);

    listeners[event] = group;
  };
}

export function joinRoom(username: string, roomID: string) {
  send({
    type: TYPE.ROOM,
    action: ACTION.JOIN,
    from: username,
    message: roomID,
  });
}
export function leaveRoom(username: string) {
  send({
    type: TYPE.ROOM,
    action: ACTION.LEAVE,
    from: username,
  });
}

export function login(username: string) {
  send({
    type: TYPE.USER,
    action: ACTION.JOIN,
    from: username,
  });
}

export function logout(username: string) {
  send({
    type: TYPE.USER,
    action: ACTION.LEAVE,
    from: username,
  });
}

export function connect(url: string) {
  socket = new WebSocket(url);

  socket.onmessage = (event) => {
    onMessage(JSON.parse(event.data));
  };
}
