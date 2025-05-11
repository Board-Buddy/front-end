'use client';

import { WS_BASE_URL } from '@/constants/env';
import { useEffect, useRef, useState } from 'react';
import { Client, IMessage } from '@stomp/stompjs';
import { Message } from '@/types/chat';
import { UserInfo } from '@/types/user';
import { getUserInfo } from '@/utils/userInfoStorage';

const useWebSocket = (chatRoomId: string, existingMessages: Message[]) => {
  const userInfo = getUserInfo() as UserInfo;
  const { nickname } = userInfo;

  const [messages, setMessages] = useState<Message[]>(existingMessages);

  const clientRef = useRef<Client | null>(null);

  const handleWebSocketConnect = () => {
    console.log('WebSocket Connected');

    clientRef.current?.subscribe(
      `/ws-stomp/reception/${chatRoomId}`,
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
    if (clientRef.current?.connected) {
      clientRef.current?.publish({
        destination: `/ws-stomp/publication/${chatRoomId}`,
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
    clientRef.current = new Client({
      brokerURL: `${WS_BASE_URL}/ws-stomp/connection`,
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
