enum TYPE {
  USER = "USER",
  ROOM = "ROOM",
  MSG = "MSG",
}

enum ACTION {
  JOIN = "JOIN",
  UPDATE = "UPDATE",
  LEAVE = "LEAVE",
  SEND = "SEND",
  RECEIVE = "RECEIVE",
}

type Event = {
  type: TYPE;
  action: ACTION;
  status?: "OK" | "ERROR";
  data?: any;
};

type Msg = {
  from: string;
  message: string;
};

type Listener = (data: any) => void;

let socket: WebSocket | undefined;
const listeners: Record<string, Listener[]> = {};

function send(event: Event) {
  socket?.send(JSON.stringify(event));
}

function onMessage(event: Event) {
  if (event.status === "ERROR") {
    console.error(event);
    return;
  }

  const name = `${event.type}_${event.action}`;

  listeners[name]?.forEach((func) => func(event.data));
}

export function on<T>(event: string, listener: Listener) {
  const group = (listeners[event] || []).concat(listener);

  listeners[event] = group;

  return () => {
    const group = listeners[event].filter((func) => func !== listener);

    listeners[event] = group;
  };
}

export function sendMsg(data: Msg) {
  send({
    type: TYPE.MSG,
    action: ACTION.SEND,
    data,
  });
}

export function joinRoom(roomID: string) {
  send({
    type: TYPE.ROOM,
    action: ACTION.JOIN,
    data: { room_id: roomID },
  });
}
export function leaveRoom() {
  send({
    type: TYPE.ROOM,
    action: ACTION.LEAVE,
  });
}

export function login(username: string) {
  send({
    type: TYPE.USER,
    action: ACTION.JOIN,
    data: { username },
  });
}

export function logout() {
  send({
    type: TYPE.USER,
    action: ACTION.LEAVE,
  });
}

export function connect(url: string) {
  socket = new WebSocket(url);

  socket.onmessage = (event) => {
    onMessage(JSON.parse(event.data));
  };
}
