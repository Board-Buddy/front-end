'use client';

import SockJS from 'sockjs-client';
import { CompatClient, IMessage, Stomp } from '@stomp/stompjs';
import { WS_BASE_URL } from '@/constants/env';
import { useEffect, useRef, useState } from 'react';
import { Message } from '@/types/chat';
import { UserInfo } from '@/types/user';
import { useQueryClient } from '@tanstack/react-query';

const useSockWebSocket = (chatRoomId: string, existingMessages: Message[]) => {
  const cache = useQueryClient();
  const userInfo = cache.getQueryData(['userInfo']) as UserInfo;
  const { nickname } = userInfo;

  const [messages, setMessages] = useState<Message[]>(existingMessages);

  const clientRef = useRef<CompatClient | null>(null);

  // 웹소켓 연결
  const connectToWebSocket = () => {
    const socket = new SockJS(`${WS_BASE_URL}/api/ws-stomp/connection`);
    const client = Stomp.over(socket);
    clientRef.current = client;

    client.connect(
      {},
      () => {
        console.log('WebSocket Connected');
      },
      () => {
        console.log('Connection failed');
      },
    );

    // 채팅방 메시지 구독
    client.subscribe(
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

  // 채팅방 메시지 발행
  const handleSendMessage = (message: string) => {
    if (clientRef.current?.connected) {
      clientRef.current?.publish({
        destination: `/api/ws-stomp/publication/${chatRoomId}`,
        body: JSON.stringify({
          content: message,
          nickname,
        }),
      });
    } else {
      console.error('WebSocket is not connected');
    }
  };

  useEffect(() => {
    connectToWebSocket();

    return () => {
      // 웹소켓 연결 해제
      if (clientRef.current) {
        clientRef.current.disconnect();
      }
    };
  });

  return { messages, handleSendMessage };
};

export default useSockWebSocket;
