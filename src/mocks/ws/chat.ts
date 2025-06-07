import { WS_BASE_URL } from '@/services/endpoint';
import { ws } from 'msw';

export const chat = ws.link(`${WS_BASE_URL}/chat/connection`);

export const chatHandler = chat.addEventListener('connection', ({ client }) => {
  client.addEventListener('message', (event) => {
    const message = event.data.toString();

    // CONNECT
    if (message.startsWith('CONNECT')) {
      client.send('CONNECTED\nversion:1.2\n\n\u0000');
    }

    // SEND(PUBLICATION)
    if (message.startsWith('SEND')) {
      const destination = message.split('\n')[1].split(':')[1];
      const body = JSON.parse(message.split('\n\n')[1].replace(/\u0000$/, ''));

      body.id = Math.floor(Math.random() * 100000);
      body.messageType = 'TALK';
      body.sentAt = new Date().toISOString();

      const response = `MESSAGE\nsubscription:sub-0\nmessage-id:msg-0\ndestination:${destination}\ncontent-type:text/plain\n\n${JSON.stringify(body)}\u0000`;

      client.send(response);
    }
  });
});
