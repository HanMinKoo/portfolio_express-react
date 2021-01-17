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

![erd 찐찐찐](https://user-images.githubusercontent.com/46620616/104605058-60582b80-56c1-11eb-8c82-afb5c5317db1.png)



## 주요 기능
1. 로그인 및 회원가입
 - 회원가입 시 입력 정보를 실시간으로 검사하는 유효성 검사 기능을 만들었습니다.
 - DOM 조작을 최소화하며 유효성 검사 결과를 출력했습니다.
 - 비밀번호는 단방향 암호화를 적용했습니다.
 - 로그인은 세션을 활용했습니다.
 
 ![로그인 회원가입](https://user-images.githubusercontent.com/46620616/104114392-4af0a380-5347-11eb-9b57-1dce82023146.JPG)
 

 <br></br>
2. 반응형 웹 구현
 - 브라우저 너비에 따라 최적화된 화면을 보여주고자 반응형 웹을 구현했습니다.
 
 ![반응형웹](https://user-images.githubusercontent.com/46620616/104831990-134aa400-58d1-11eb-9cb6-3f5d9c598bd3.JPG)

 
 <br></br>
3. REST API
 - 서버와 클라이언트 간에 REST 기반의 API 통신을 이루고자 노력했습니다.
 
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
 7. 이메일 문의
  - 운동장 예약 관련 문의 사항을 이메일로 받고자 문의하기 기능을 만들었습니다.
 
 <br></br>
8. 마이 페이지 및 관리자 페이지
 - 운동장 예약 정보 테이블, 회원 정보 테이블, 운동장 정보 테이블을 LEFT JOIN 쿼리문을 통해 결합하여 예약 현황 정보를 출력했습니다. 
 - 예약 승인 버튼을 누르면 DB에서 해당 예약 번호의 예약 상태를 ‘승인 대기’에서 ‘승인 완료’로 변경했습니다.
 - 예약 취소 버튼을 누르면 해당 예약 번호의 예약을 DB에서 삭제했습니다.
 
 ### 마이 페이지
 ![마이페이지123](https://user-images.githubusercontent.com/46620616/104600184-0739c900-56bc-11eb-9888-1fbf49c3c29c.JPG)
 
  <br></br>
  
 ### 관리자 페이지
 ![관리자페이지](https://user-images.githubusercontent.com/46620616/104605295-a8774e00-56c1-11eb-98f2-c239c01878a7.png)

 
 <br></br> 
9. 운동장 이용 후기 기능 구현
 - 예약 날짜가 지나면 운동장 사용 후기를 작성할 수 있게 만들었습니다.
 - 작성한 후기를 DB에 저장하는 작업과 해당 예약의 후기 작성 여부를 DB에서 업데이트 하는 작업을 일련의 과정으로 처리하기 위해 트랜잭션을 활용했습니다.
 - INNER JOIN을 활용하여 작성 후기를 운동장 상세 페이지에 출력했습니다.

<br></br>
 - <h3>이용 후기 흐름</h3>
 <br></br> 
  - <h3>1번. 마이 페이지에서 리뷰 작성 버튼 클릭</h3>
   - <h4> 버튼을 클릭하면 해당 예약 번호를 쿼리스트링에 포함해 리뷰 작성 페이지로 이동합니다.</h4>

<img src="https://user-images.githubusercontent.com/46620616/104832287-9ec53480-58d3-11eb-97c7-735f14c642fa.JPG"  width="80%" >
  <br></br> 
  
  - <h3>2번. 리뷰 작성</h3>
   - <h4> 리뷰 작성 성공 시 예약 번호, 작성 내용, 작성 시간을 reivew 테이블에 추가합니다.</h4>
   - <h4> 그 후, 해당 예약 번호의 리뷰 등록 여부를 예약 현황 테이블에서 업데이트합니다.</h4>
   - <h4> 이 과정을 일련의 과정으로 처리하기 위해 트랜잭션을 활용했습니다.</h4>
   <img src="https://user-images.githubusercontent.com/46620616/104832289-a1278e80-58d3-11eb-869f-40650b1b843f.JPG"  width="50%"  >
   <br></br> 
   
  - <h3>3번. 운동장 상세 페이지에 작성 리뷰 출력</h3>
   - <h4> 운동장 리뷰 테이블, 예약 현황 테이블, 사용자 정보 테이블을 INNER JOIN을 통해 결합하여 해당 운동장의 예약 현황을 출력합니다.</h4>
  <img src="https://user-images.githubusercontent.com/46620616/104832215-edbe9a00-58d2-11eb-8140-d4f63c40f826.JPG"  width="80%"  >
  <br></br> 
 



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
    - review.js: 리뷰 작성 화면 출력 및 리뷰 등록 요청 소스 코드
    
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
    - review.router.js: 리뷰 관련 API 서버 소스코드

  
  + bin 폴더 - 서버 실행 파일
 
  + models - db 연동 관련 소스 코드 모음


## 제작자 
 - 한민구 
 - alsrnalsrn94@naver.com
