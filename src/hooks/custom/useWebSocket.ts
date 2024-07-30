'use client';

import { WS_BASE_URL } from '@/constants/env';
import { useEffect, useState } from 'react';
import { Client, IMessage } from '@stomp/stompjs';
import { WebSocketServer } from 'ws';
import { Message } from '@/types/chat';
import { useQueryClient } from '@tanstack/react-query';
import { UserInfo } from '@/types/user';
import { formatSentAt } from '@/utils/date';

// Node.js 환경에서 WebSocketServer 객체를 전역으로 사용 가능하게 하기 위해 사용
Object.assign(global, { WebSocketServer });

const useWebSocket = (chatRoomId: string, existingMessages: Message[]) => {
  const cache = useQueryClient();
  const userInfo = cache.getQueryData(['userInfo']) as UserInfo;
  const { nickname } = userInfo;

  const [messages, setMessages] = useState<Message[]>(existingMessages);

  const client = new Client({
    brokerURL: `${WS_BASE_URL}/api/chat/connection`,
    onConnect: () => handleWebSocketConnect(),
    onDisconnect: () => console.log('WebSocket Disconnected'),
    reconnectDelay: 5000,
    heartbeatIncoming: 4000,
    heartbeatOutgoing: 4000,
  });

  const handleWebSocketConnect = () => {
    console.log('WebSocket Connected');

    client.subscribe(
      `/api/chat/reception/${chatRoomId}`,
      (message: IMessage) => {
        try {
          const newMessage = JSON.parse(message.body) as Message;
          setMessages((prevMessages) => [...prevMessages, newMessage]);
        } catch (error: any) {
          console.error('Failed to parse message:', error);
        }
      },
    );
  };

  const handleSendMessage = (message: string) => {
    const newMessage: Message = {
      messageType: 'talk',
      nickname,
      content: message,
      sentAt: formatSentAt(Date.toString()),
    };

    if (client.connected) {
      client.publish({
        destination: `/api/chat/publication/${chatRoomId}`,
        body: JSON.stringify({
          content: message,
        }),
      });

      setMessages((prevMessages) => [...prevMessages, newMessage]);
    } else {
      console.error('WebSocket is not connected');
    }
  };

  useEffect(() => {
    // 웹소켓 연결
    client.activate();

    return () => {
      // 웹소켓 연결 해제
      client.deactivate();
    };
  }, [chatRoomId, client]);

  return { messages, handleSendMessage };
};

export default useWebSocket;
