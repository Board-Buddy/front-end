import LoginDrawer from '@/containers/login/LoginDrawer';
import Image from 'next/image';
import SmallLogoWhite from '@images/logo/boardbuddy_small_logo_white.png';
import SundyDice from '@images/sundy/sundy_dice.png';

const page = () => {
  return (
    <div className="relative flex h-screen w-full flex-col items-center overflow-hidden">
      <div className="self-start px-8 pb-24 pt-16">
        <div className="pb-2 text-3xl text-primary">
          <p>
            <span className="font-extrabold">보드</span>
            게임할사람,
          </p>
          <p>
            여기<span className="font-extrabold">버디</span> 모여라
          </p>
        </div>
        <div className="flex h-7 w-fit items-center gap-1 rounded-md bg-primary py-1.5 pl-1 pr-2 text-sm text-white">
          <Image
            src={SmallLogoWhite}
            alt="보드버디 흰색 로고"
            width={20}
            height={20}
            className="p-0.5"
          />
          쉽게 찾는 게임친구
        </div>
      </div>
      <Image
        src={SundyDice}
        alt="주사위를 든 썬디"
        width={180}
        height={273.5}
      />
      <LoginDrawer />
    </div>
  );
};

export default page;
