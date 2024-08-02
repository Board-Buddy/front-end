'use client';

import { WS_BASE_URL } from '@/constants/env';
import { useEffect, useRef, useState } from 'react';
import { Client, IMessage } from '@stomp/stompjs';
import { Message } from '@/types/chat';
import { useQueryClient } from '@tanstack/react-query';
import { UserInfo } from '@/types/user';
import { formatSentAt, formatDate } from '@/utils/date';

const useWebSocket = (chatRoomId: string, existingMessages: Message[]) => {
  const cache = useQueryClient();
  const userInfo = cache.getQueryData(['userInfo']) as UserInfo;
  const { nickname } = userInfo;

  const [messages, setMessages] = useState<Message[]>(existingMessages);

  const clientRef = useRef<Client | null>(null);

  const handleWebSocketConnect = () => {
    console.log('WebSocket Connected');

    clientRef.current?.subscribe(
      `/api/ws-stomp/reception/${chatRoomId}`,
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
      messageType: 'TALK',
      nickname,
      content: message,
      sentAt: formatSentAt(formatDate(new Date())),
    };

    if (clientRef.current?.connected) {
      clientRef.current?.publish({
        destination: `/api/ws-stomp/publication/${chatRoomId}`,
        body: JSON.stringify({
          content: message,
          nickname: nickname,
        }),
      });

      setMessages((prevMessages) => [...prevMessages, newMessage]);
    } else {
      console.error('WebSocket is not connected');
    }
  };

  useEffect(() => {
    clientRef.current = new Client({
      brokerURL: `${WS_BASE_URL}/api/ws-stomp/connection`,
      onConnect: () => handleWebSocketConnect(),
      onDisconnect: () => console.log('WebSocket Disconnected'),
      onWebSocketError: (error) => console.log(error),
      reconnectDelay: 5000,
      heartbeatIncoming: 4000,
      heartbeatOutgoing: 4000,
    });

    // 웹소켓 연결
    clientRef.current.activate();

    return () => {
      // 웹소켓 연결 해제
      clientRef.current?.deactivate();
      clientRef.current = null;
    };
  }, []);

  return { messages, handleSendMessage };
};

export default useWebSocket;
