'use client';

import { Dispatch, SetStateAction, useEffect, useRef } from 'react';
import { Client, IMessage } from '@stomp/stompjs';
import { ChatRoom, Message } from '@/types/chat';
import { useQueryClient } from '@tanstack/react-query';
import { UserInfo } from '@/types/user';
import { ENDPOINT, WS_BASE_URL } from '@/services/endpoint';

const useWebSocket = (
  chatRoomId: ChatRoom['chatRoomId'],
  setMessages: Dispatch<SetStateAction<Message[] | null>>,
) => {
  const cache = useQueryClient();
  const userInfo = cache.getQueryData(['userInfo']) as UserInfo;
  const { nickname } = userInfo;

  const clientRef = useRef<Client | null>(null);

  const handleSendMessage = (message: string) => {
    if (clientRef.current?.connected) {
      clientRef.current?.publish({
        destination: `/ws${ENDPOINT.CHAT_ROOM.DETAIL.MESSAGE_PUBLICATION(Number(chatRoomId))}`,
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
    const handleWebSocketConnect = () => {
      console.log('WebSocket Connected');

      clientRef.current?.subscribe(
        `/ws${ENDPOINT.CHAT_ROOM.DETAIL.MESSAGE_SUBSCRIPTION(Number(chatRoomId))}`,
        (message: IMessage) => {
          try {
            const newMessage = JSON.parse(message.body) as Message;
            setMessages((prevMessages) => [
              ...(prevMessages || []),
              newMessage,
            ]);
          } catch (error: unknown) {
            console.error('Failed to parse message:', error);
          }
        },
      );
    };

    clientRef.current = new Client({
      brokerURL: `${WS_BASE_URL}${ENDPOINT.CHAT_ROOM.DETAIL.CONNECTION()}`,
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
  }, [chatRoomId, setMessages]);

  return { handleSendMessage };
};

export default useWebSocket;
