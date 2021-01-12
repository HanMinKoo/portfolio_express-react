# 운동장 예약 관리 웹 (React, Node.JS Express 프레임워크)


## 프로젝트 실행 URL

### http://13.209.171.139


## 프로젝트 내용
- 여러 곳의 운동장을 웹을 통해 편리하게 예약하고자 만든 웹 프로젝트입니다.


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
  
  
## DB ERD
![ERD](https://user-images.githubusercontent.com/46620616/104114425-a9b61d00-5347-11eb-8b27-b90971209522.JPG)


## 주요 기능
1. 로그인 및 회원가입
 - 회원가입 시 입력 정보를 실시간으로 검사하는 유효성 검사 기능을 만들었습니다.
 - DOM 조작을 최소화하며 유효성 검사 결과를 출력했습니다.
 - 비밀번호는 단방향 암호화를 적용했습니다.
 - 로그인은 세션을 활용했습니다.
 
 ![로그인 회원가입](https://user-images.githubusercontent.com/46620616/104114392-4af0a380-5347-11eb-9b57-1dce82023146.JPG)
 

 <br></br>
2. 반응형 웹 구현
 - 디바이스 기기에 따라 최적화된 화면을 보여주고자 반응형 웹을 구현했습니다.
 
 <br></br>
3. REST API
 - 서버와 클라이언트 간에 API 통신을 REST 기반으로 이루고자 노력했습니다.
 
 <br></br>
4. 달력 예약 현황 구현
 - 예약 현황을 직관적으로 보여주고자 예약 현황을 담고 있는 달력을 구현했습니다.
 - 현실 날짜 기준 이전의 날짜는 예약할 수 없게 만들었습니다.
 
![진짜 최종 달력](https://user-images.githubusercontent.com/46620616/104114922-15e74f80-534d-11eb-90a8-6b776fa585a3.JPG)
 
 
 <br></br> 
5. 예약 CRUD 구현
 - 예약 추가, 조회, 업데이트, 삭제 기능을 구현했습니다.
 
 <br></br>
6. 중복 예약 방지
 - DB의 복합 유니크키를 활용하여 중복예약을 방지했습니다.
 
 <br></br>
7. 마이 페이지 및 관리자 페이지
 - 운동장 예약 정보 테이블, 회원 정보 테이블, 운동장 정보 테이블을 LEFT JOIN 쿼리문을 통해 결합하여 예약 현황 정보를 출력했습니다. 
 - 예약 승인 기능: 예약 승인 버튼을 누르면 해당 예약 번호의 예약 상태를 '승인 대기'에서 '승인 완료'로 DB를 업데이트했습니다.
 - 예약 취소 기능: 예약 취소 버튼을 누르면 해당 예약 번호의 예약을 DB에서 삭제했습니다.
 
 
 ![마이페이지 관리자페이지](https://user-images.githubusercontent.com/46620616/104114698-9d7f8f00-534a-11eb-93b2-d5e01688ca81.JPG)
 
 
 <br></br> 
8. 이메일 문의
 - 운동장 예약 관련 문의 사항을 이메일로 받고자 문의하기 기능을 만들었습니다.



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
    - fetchGroundData.js 파일: 여러 파일에서 운동장 정보, 예약 정보를 불러오기 위해 공통으로 사용하는 Ajax API 요청 소스 코드
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
  
  + routes 폴더: API 서버 소스 코드 파일 모음
  
    - admingpage_router.js: 관리자 페이지 API 서버 소스 코드
    - ground_router.js: 운동장 정보 관련 API 서버 소스 코드
    - inquire_router.js: 이메일 문의 API 서버 소스 코드
    - join_router.js: 회원 가입 관련 API 서버 소스 코드
    - login_router.js: 로그인 관련 API 서버 소스 코드
    - mypage_router.js: 로그인 사용자 예약 현황 API 서버 소스 코드
    - reservation_router.js: 운동장 예약 관련 API 서버 소스 코드

  
  + bin 폴더 - 서버 실행 파일
 
  + models - db 연동 관련 소스 코드 모음


## 제작자 
 - 한민구 
 - alsrnalsrn94@naver.com
