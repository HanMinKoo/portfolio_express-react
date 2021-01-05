# 운동장 예약 관리 웹 (React, Node.JS Express 프레임워크)


## 프로젝트 실행 URL

### http://13.209.171.139


## 프로젝트 내용
- 관리자와 대면 또는 전화로만 예약할 수 있던 여러 곳의 운동장들을 웹을 통해 편리하게 예약하고자 만든 웹 프로젝트입니다.


## 역할
- 기여도:100% (개인 프로젝트)


## 사용 기술 및 언어
  - HTML5
  - CSS3
  - JavaScript(ES6+)
  - React 라이브러리
  - Node.js Express 프레임워크
  - MySQL
  - AWS EC2 클라우드 서버 구축


## 주요 기능
1. 로그인 및 회원가입
 - 회원가입 정보 입력 시 실시간 유효성 검사 기능을 만들었습니다.
 - DOM 조작을 최소화하며 유효성 검사 결과를 출력했습니다.
 - 비밀번호는 단방향 암호화를 적용했습니다.

2. 반응형 웹 구현
 - 디바이스 기기에 따라 최적화된 화면을 보여주고자 반응형 웹을 구현했습니다.
 
3. REST API
 - 서버와 클라이언트 간에 API 통신을 REST 기반으로 이루고자 노력했습니다.
 
4. 달력 예약 현황 구현
 - 예약 현황을 직관적으로 보여주고자 예약 현황을 담고 있는 달력을 구현했습니다.
 
5. 예약 CRUD 구현
 - 예약 추가, 조회, 업데이트, 삭제 기능을 구현했습니다.
 
6. 중복 예약 방지
 - DB의 복합 유니크키를 활용하여 중복예약을 방지했습니다.
 
7. 마이 페이지 및 관리자 페이지
 - 예약 현황을 관리할 수 있도록 관리자 및 마이 페이지를 구현했습니다.
 
8. 세션
 - 세션을 활용하여 로그인을 유지했습니다.
 
9. 이메일 문의
 - 운동장 예약 관련 문의 사항을 이메일로 받고자 문의하기 기능을 만들었습니다.


## DB ERD

![ERD](https://user-images.githubusercontent.com/46620616/103676731-ca3b4b80-4fc4-11eb-85d0-8a7378011976.JPG)



## 주요 소스 코드 폴더 및 파일 설명

+ src 폴더 - 프론트엔드 소스 코드 폴더(js, JSX, CSS, image 등)

  - routes 폴더: 페이지 이동 시 실행되는 소스 코드 파일 모음 폴더
    - adminpage.js: 관리자 페이지 소스 코드
    - ground_detail.js: 운동장 상세 화면 소스 코드
    - ground_list.js: 예약 가능한 운동장 목록을 보여주는 소스 코드
    - home.js: 홈 화면 소스 코드
    - inquire.js: 이메일 문의 소스 코드
    - join.js: 회원가입 소스 코드
    - login.js: 로그인 소스 코드
    - mypage.js: 마이페이지 소스 코드
    
  - components 폴더: 컴포넌트 소스 코드 파일 모음 폴더
    - fetchGroundData.js 파일: 여러 파일에서 운동장 정보, 예약 정보를 불러오기 위해 공통으로 사용하는 Ajax API 소스 코드
    - footer.js: 제작자 정보 관련 소스 코드
    - ground_detail_calendar.js: 운동장 상세 페이지의 달력 관련 소스 코드
    - ground_detail_groundInfo.js: 운동장 상세 페이지의 운동장 정보 관련 소스 코드
    - home_reservationNotice.jsx: 홈 화면의 예약 설명 소스 코드
    - home_reviewNotice.jsx: 홈 화면의 리뷰 설명 소스 코드
    - nav.js: 네비게이션 바 소스 코드
    
  + css 폴더: css 소스 코드 파일 모음 폴더
  
  + images 폴더: 이미지 파일 모음
  

+ server 폴더 - 백엔드 소스 코드 폴더

  + app.js: 미들웨어 소스 코드
  
  + routes 폴더: 프론트엔드의 router 별 서버 소스 코드 파일 모음
    - admingpage_router.js: 관리자 페이지에 필요한 모든 예약 현황 데이터 조회 소스 코드 
    - ground_router.js: 운동장 정보 데이터 조회 소스 코드
    - inquire_router.js: 문의 내역 DB에 저장 및 이메일 전송 로직 구현 소스 코드
    - join_router.js: 회원 정보 저장 및 아이디, 이메일 중복 체크, 비밀번호 암호화 로직 구현 소스 코드
    - login_router.js: 로그인 처리 소스 코드, 비밀번호 암호화 로직 구현 소스 코드
    - mypage_router.js: 로그인 사용자의 예약 현황 데이터 조회 소스 코드
    - reservation_router.js: 예약 조회, 추가, 삭제, 변경(예약 관련 CRUD) 구현 소스 코드 
  
  + bin 폴더 - 서버 실행 파일
 
  + models - db 연동 관련 소스 코드 모음


## 제작자 
 - 한민구 
 - alsrnalsrn94@naver.com
