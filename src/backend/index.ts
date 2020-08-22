enum TYPE {
  USER = "USER",
}

enum ACTION {
  JOIN = "JOIN",
}

interface Event {
  type: TYPE;
  action: ACTION;
  from: string;
}

let socket: WebSocket | undefined;

function send(event: Event) {
  socket?.send(JSON.stringify(event));
}

function onMessage(event: Event) {
  console.log(event);
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
