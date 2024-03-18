// service/notification.js

let clients = [];

const sendNotification = (eventName, data) => {
  clients.forEach(client => {
    client.res.write(`event: ${eventName}\ndata: ${JSON.stringify(data)}\n\n`);
  });
};

const handleSSE = (req, res) => {
  res.setHeader('Content-Type', 'text/event-stream');
  res.setHeader('Cache-Control', 'no-cache');
  res.setHeader('Connection', 'keep-alive');
  res.flushHeaders();

  clients.push({ req, res });

  req.on('close', () => {
    clients = clients.filter(client => client.res !== res);
  });
};

module.exports = { sendNotification, handleSSE };
