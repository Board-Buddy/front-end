import LoginDrawer from '@/containers/login/LoginDrawer';
import Image from 'next/image';

const page = () => {
  return (
    <div className="h-[100vh] relative w-full flex flex-col items-center overflow-hidden">
      <div className="self-start pt-16 pb-24 px-8">
        <div className="text-primary pb-2 text-3xl">
          <p>
            <span className="font-extrabold">보드</span>
            게임할사람,
          </p>
          <p>
            여기<span className="font-extrabold">버디</span> 모여라
          </p>
        </div>
        <div className="bg-primary flex pl-1 pr-2 py-1.5 h-7 text-white gap-1 rounded-md text-sm w-fit items-center">
          <Image
            src="/images/logo/boardbuddy_small_logo_white.png"
            alt="보드버디 흰색 로고"
            width={20}
            height={17}
            className="p-0.5"
          />
          쉽게 찾는 게임친구
        </div>
      </div>
      <Image
        src="/images/sundy/sundy_dice.png"
        alt="주사위를 든 썬디"
        width={180}
        height={215}
      />
      <LoginDrawer />
    </div>
  );
};

export default page;
