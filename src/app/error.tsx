'use client';

const error = () => {
  return (
    <div className="flex h-[calc(100dvh-100px)] flex-col items-center justify-center">
      <p className="mb-4 text-center font-semibold text-gray-800">
        알 수 없는 오류가 발생했어요😥
        <br />
        지속적으로 문제가 발생한다면 관리자에게 문의해 주세요
      </p>
    </div>
  );
};

export default error;
