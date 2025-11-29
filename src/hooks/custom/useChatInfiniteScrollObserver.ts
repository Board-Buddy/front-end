'use client';

import { InfiniteQueryObserverResult } from '@tanstack/react-query';
import { RefObject, useCallback, useEffect, useRef, useState } from 'react';

interface Props {
  threshold?: number;
  hasPreviousPage: boolean | undefined;
  fetchPreviousPage: () => Promise<InfiniteQueryObserverResult>;
  scrollRef: RefObject<HTMLDivElement | null>;
}

export const useChatInfiniteScrollObserver = ({
  threshold = 0.1,
  hasPreviousPage,
  fetchPreviousPage,
  scrollRef,
}: Props) => {
  const [target, setTarget] = useState<HTMLDivElement | null | undefined>(null);
  const previousScrollHeightRef = useRef<number | null>(null);

  // fetchPreviousPage 전후로 스크롤 조정
  const adjustScroll = useCallback(async () => {
    const scrollContainer = scrollRef?.current;

    if (scrollContainer) {
      previousScrollHeightRef.current = scrollContainer.scrollHeight;
    }

    await fetchPreviousPage();

    if (scrollContainer && previousScrollHeightRef.current !== null) {
      const previousScrollHeight = previousScrollHeightRef.current;

      // 이중 rAF를 사용해 브라우저가 모든 작업을 완료한 이후임을 보장
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          const newScrollHeight = scrollContainer.scrollHeight;
          const scrollDiff = newScrollHeight - previousScrollHeight;
          scrollContainer.scrollTop += scrollDiff;
        });
      });
    }
  }, [fetchPreviousPage, scrollRef]);

  const observerCallback = useCallback<IntersectionObserverCallback>(
    (entries) => {
      entries.forEach((entry) => {
        // target이 화면에 관찰되고, 이전 페이지가 있다면 이전 페이지 호출
        if (entry.isIntersecting && hasPreviousPage) {
          adjustScroll();
        }
      });
    },
    [hasPreviousPage, adjustScroll],
  );

  useEffect(() => {
    if (!target) return;

    const observer = new IntersectionObserver(observerCallback, {
      threshold,
    });

    observer.observe(target);

    return () => observer.unobserve(target);
  }, [observerCallback, threshold, target]);

  return { setTarget };
};
