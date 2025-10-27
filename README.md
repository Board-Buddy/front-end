![header](https://capsule-render.vercel.app/api?type=waving&height=250&color=E9711C&text=BoardBuddy&textBg=false&fontColor=ffffff&fontSize=40&fontAlign=50&fontAlignY=39&section=header)

<div align="center">
  <h4>개발 기간: 2024/6/28 ~ 진행 중</h3><br>
  <a href="#배포-주소">배포 주소</a> • <a href="#프로젝트-소개">프로젝트 소개</a> • <a href="#프론트엔드-주요-기술-스택">기술 스택</a> • <a href="#front-end-멤버-소개">멤버 소개</a> • <a href="#역할-및-담당-기능">역할 및 담당 기능</a> • <a href="#주요-기능">주요 기능</a> • <a href="#아키텍처">아키텍처</a> • <a href="#산출물">산출물</a> • <a href="#시연영상">시연영상</a>
</div>

<br><br>

## 팀 노션
> 🔗 [숨코다](https://yuuub.notion.site/80ce8cc8225e496ebaa752b4a04efeec?pvs=4)

<br><br>

## 배포 주소
> 🔗 [Board Buddy 바로가기](https://m.boardbuddi.com)

<br><br>

## 프로젝트 소개
BoardBuddy는 보드게임을 좋아하는 사람들이 주변에서 보드게임을 함께할 친구들을 쉽게 모집하고 참여할 수 있도록 돕는 커뮤니티 플랫폼입니다.

<br><br>

## 프론트엔드 주요 기술 스택
<img src="https://img.shields.io/badge/NextJS-000000?style=for-the-badge&logo=nextdotjs&logoColor=white"> <img src="https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white"> <img src="https://img.shields.io/badge/ReactQuery-FF4154?style=for-the-badge&logo=reactquery&logoColor=white"> <img src="https://img.shields.io/badge/TailwindCSS-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white"> <img src="https://img.shields.io/badge/shadcn/ui-000000?style=for-the-badge&logo=shadcnui&logoColor=white"> <img src="https://img.shields.io/badge/MSW-FF6A33?style=for-the-badge&logo=mockserviceworker&logoColor=white"> <img src="https://img.shields.io/badge/axios-5A29E4?style=for-the-badge&logo=axios&logoColor=white"> <img src="https://img.shields.io/badge/stompjs-000000?style=for-the-badge">

<br><br>

## Front-end 멤버 소개
|<img width="200" src="https://avatars.githubusercontent.com/u/63189595?v=4" alt="프로필 이미지">|<img width="200" src="https://github.com/user-attachments/assets/c447b0c3-146c-415e-a147-eed3af3ad366" alt="프로필 이미지">|
|:---:|:---:|
|[**채유빈**](https://github.com/ChaeYubin)|[**마혜준**](https://github.com)|

<br><br>

## 역할 및 담당 기능

<table width="100%">
  <tr>
    <th width="10%">이름</th>
    <td width="45%">채유빈</td>
    <td width="45%">마혜준</td>
  </tr>
  <tr>
    <th>역할</th>
    <td>팀장, 프로젝트 PM</td>
    <td>팀원</td>
  </tr>
  <tr>
    <th>기능</th>
    <td>
      <ul>
        <li>프로젝트 일정 관리</li>
        <li>프론트엔드 CI/CD 구측</li>
        <li>전반적인 UI 및 기능 구현</li>
      </ul>
    </td>
    <td>
      <ul>
        <li>와이어프레임 제작</li>
        <li>프로토타입 제작</li>
        <li>UI 디자인</li>
      </ul>
    </td>
  </tr>
</table>

<br><br>

## 로컬에서 실행하는 방법
1. 레포지토리를 클론합니다.
```bash
git clone https://github.com/Board-Buddy/front-end.git

cd front-end
```
2. `front-end` 디렉토리의 최상위에 `.env.local` 파일 생성 후 아래와 같이 작성합니다.
```bash
NEXT_PUBLIC_API_MOCKING=enabled
NEXT_PUBLIC_API_SERVER_URL=http://localhost:3000
```

3. 터미널에서 아래 명령어를 차례대로 입력합니다.
```bash
npm install
npm run dev
```

4. 브라우저에서 [http://localhost:3000](http://localhost:3000) 페이지에 접속합니다.

<br>

## 주요 기능
#### 🔒 회원가입 및 로그인
일반 회원가입, 로그인 기능 제공과 동시에 소셜 로그인 기능을 제공하여 사용자는 별도의 회원가입과 로그인 과정을 거치지 않고도 카카오, 네이버, 구글 계정을 통해 서비스를 이용할 수 있습니다.
`react-hook-form`과 `zod`를 이용하여 유효성 검사를 진행하며, 인증된 사용자의 상태는 세션을 통해 유지합니다.

<br>

#### 📍 내 동네 설정
동네를 선택하고, 가까운 동네부터 먼 동네까지 사용자가 원하는 범위(반경)를 선택할 수 있습니다. `kakao 지도 API`를 사용해 선택한 동네의 범위만큼 반경을 그려 보여줍니다.

<br>

#### 👥 버디 모집 게시판
사용자는 설정한 동네와 반경을 기반으로 주변 동네의 모집글 리스트를 조회하며, 현재 모집 중인 글로 필터링 하거나 모임 시간이 빠른 글 순으로 정렬할 수 있습니다.
`React-Query`의 `useInfiniteQuery`를 이용하여 페이지 하단에 도달할 때마다 API가 호출함으로써 모집글이 끊김 없이 계속 로드되는 무한 스크롤 방식의 사용자 경험을 제공합니다.

<br>

#### 🤝 모임 참가 및 승인, 거절
모집글을 작성한 유저는 다른 유저들이 모임에 대해 참가 신청을 했을 때, 승인 또는 거절할 수 있습니다.

<br>

#### 💡 알림 기능
사용자는 내 동네 기반 새로운 모집글이 작성되었을 때 알림을 받을 수 있습니다.
또한 자신이 작성한 모집글에 새로운 댓글이 달리거나 자신이 작성한 댓글에 대댓글이 달리면 알림을 받으며, 참가 신청과 승인/거절에 대해 알림을 받을 수 있습니다.
`EventSource` 객체를 통해 서버의 이벤트를 구독 및 수신합니다. `react-hot-toast`를 사용해 토스트 메시지 형태로 알림을 보여줍니다.

<br>

#### 🖋️ 리뷰 및 평가 시스템
모집글 작성자가 모임 예상 종료시간을 입력하면 그 시간에 맞춰 각 참가자들에게 리뷰 작성 요청 알림이 발송됩니다. 최고예요/좋아요/별로예요/노쇼 리뷰를 보낼 수 있습니다.
각 리뷰는 랭킹 및 버디 지수(보드버디 서비스 내에서의 매너점수)에 반영됩니다.

<br>

#### 💬 실시간 단체 채팅
모임에 참가하는 사용자들이 단체 채팅을 할 수 있도록 작성된 모집글마다 단체 채팅방이 자동으로 생성됩니다. 웹소켓을 활용하여 실시간 단체 채팅이 가능합니다.

<br>

#### 🔎 보드게임 카페 찾기
`Geolocation`, `Kakao 지도 API`를 통해 사용자의 현재 위치에 따라 주변 보드게임 카페를 찾을 수 있습니다. 보드게임 카페의 위치와 정보를 마커를 통해 제공합니다.

<br>

#### 🏅 랭킹 시스템
매월 1일에 사용자의 월별 서비스 이용 내역, 받은 후기에 따라 TOP3를 선정하며, 프로필에 특별한 뱃지(1\~3등)를 함께 표시합니다. 또한 해당하는 월의 뱃지(1\~12월)를 얻을 수 있습니다.

<br><br>


## 아키텍처
![아키텍처_최종](https://github.com/user-attachments/assets/f2a00f79-f5d1-45e7-b315-b557a02638a4)

<br><br>

## 산출물
- [기능 명세서](https://www.notion.so/yuuub/b910b7a7655947f4ba49269faa5466e1?pvs=4)
- [API 명세서](https://www.notion.so/yuuub/API-e84b3ff32494414cb95d9dd66666388b?pvs=4)

<br><br>

## 시연영상
[![보드버디 시연영상 썸네일](https://github.com/user-attachments/assets/cb9f0f10-1847-4ce0-bd8d-0884df89221f)](https://youtu.be/GB8Cqv4oayo?feature=shared)

<br><br>

![footer](https://capsule-render.vercel.app/api?type=waving&height=150&color=E9711C&section=footer)
