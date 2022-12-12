# 기획 의도
최근 증강현실(AR)과 가상현실(VR) 시장의 전망이 높아지면서 사용자가 가상현실 전용기기 없이 스마트폰만으로도 증강된 현실을 경험할 수 있는 확장현실(XR)이 주목받고 있다. 또한 공공데이터 개방과 활용 정책이 추진되면서 무료로 사용할 수 있는 이미지 데이터들을 활용한 여러 콘텐츠가 만들어지고 있다.
웹 브라우저 환경에서 카메라 제어를 통해 현실을 배경으로 공공데이터 기반의 전통문양 이미지를 증강시키는 애플리케이션을 연구하고 현실과 가상 이미지가 결합한 콘텐츠로서 다양한 분야에서 활용할 수 있는 공공데이터의 확장성을 확인한다.

## 사용 기술
<img src="https://img.shields.io/badge/HTML5-E34F26?style=flat&logo=HTML5&logoColor=white"/> <img src="https://img.shields.io/badge/CSS3-1572B6?style=flat&logo=CSS3&logoColor=white"/> <img src="https://img.shields.io/badge/JavaScript-F7DF1E?style=flat&logo=JavaScript&logoColor=orange"/> <img src="https://img.shields.io/badge/jQuery-0769AD?style=flat&logo=jQuery&logoColor=orange"/>
## 사용 공공데이터
문화포털_한국의 문양 조회 서비스(2D개별문양 목록조회, 3D개별문양 목록조회, 개별문양 상세정보조회)

## 워크 플로우
<img src="https://user-images.githubusercontent.com/86540140/206972638-93e39ba2-13fc-4bdd-bbb8-0cad01f83949.png" width="600"><br/>
<br/>

# 구현 사항
+ 메인 페이지
+ 문양 정보 페이지
+ 뷰어 페이지

***


> ### 메인 페이지
#### - 형태별 디자인 <br/>
형태 카테고리 클릭시 요청 API에 파라미터를 넘겨주어 새롭게 데이터를 받아온다.<br/><br/>

#### - 목록 <br/>
받아온 xml 데이터는 6개의 목록으로 만들어 보여주도록 하고 더보기 버튼을 클릭하면 6개씩 목록에 추가한다.

<br/>

> ### 문양 정보 페이지
문양을 선택하면 해당 문양의 개별코드를 통해 문양의 상세정보 조회 API를 요청한다.

<br/>

> ### 결과물
<img src="https://user-images.githubusercontent.com/86540140/206977050-e3964e1f-26fb-464d-b289-22e4b79f4772.png" width="250"> <img src="https://user-images.githubusercontent.com/86540140/206977048-35c76ebf-1ece-4141-8169-a1ee9befcffc.png" width="250"> <img src="https://user-images.githubusercontent.com/86540140/206977046-16f54e97-f624-4534-ac18-684c83b6914a.png" width="250">


***

> ### 뷰어 페이지

문양 상세정보 페이지에서 뷰어 버튼을 클릭했을 때 새로운 페이지로 이동한다.
사물에 문양을 비춰볼 수 있도록 하기 위해서는 스마트폰의 카메라 화면이 필요하다. 자바스크립트로 디바이스의 카메라에 접근하여 카메라 화면을 html 파일의 배경으로 지정한다. 
이때 카메라 옵션은 후면카메라가 기본이며 인터페이스 상의 회전 버튼을 클릭하면 전면카메라로 변환할 수 있다. 
이렇게 하면 문서의 전체 화면에서 카메라가 비추고 있는 화면을 띄울 수 있다. 또 해당 문양의 이미지를 그 위에 얹혀 카메라 화면과 공공데이터 이미지가 겹쳐보이도록 하였다. 
터치 & 드래그하여 원하는 곳으로 이미지를 이동시킬 수 있게 하였고 크기 조절 버튼을 클릭해서 이미지의 사이즈 조절이 가능하게 하였다. 

<br/>

> ### 결과물
형태 카테고리 클릭시 요청 API에 파라미터를 넘겨주어 새롭게 데이터를 받아온다.<br/><br/>
<img src="https://user-images.githubusercontent.com/86540140/206973161-928516ea-d2d9-46f7-841f-e28b91270e01.png" width="250">
<img src="https://user-images.githubusercontent.com/86540140/206973221-31e1fa49-5906-4602-b2b4-81d66116870c.png" width="250">
<img src="https://user-images.githubusercontent.com/86540140/206973231-b3d21e32-28b7-4e81-bb05-786ee3c4008e.png" width="250">

***

# 아쉬운 점

한국 문양 공공 데이터는 2D 이미지뿐만 아니라 3D 모델 데이터도 존재했다. 
해당 문양의 상세 페이지에서 뷰어 페이지로 넘어갔을 때 사용자 카메라 화면을 배경으로 깔아두고 3D 모델링을 그 위에 얹어 손가락으로 돌려가며 보고 원하는 곳에 배치하여 좀 더 AR에 가깝게 만드는 것이 목표였다. 
해당 기능을 구현하기 위해 ThreeJS를 사용하였고 3D 모델링을 불러와 카메라 화면 위에 띄우고 스와이프하여 직접 돌리고 크기를 조절해가면서 3D 모델을 확인할 수 있었다. 
하지만 그렇기에 스마트폰 화면의 원하는 곳에 배치할 수 없었다. 
결국 ThreeJS 없이 2D 이미지 데이터만 사용하여 터치 좌표를 따라 이미지가 이동되게 하고 버튼 클릭으로 이미지 사이즈를 조절하도록 하였다. 
아쉬웠지만 WebGL에 관심이 있어 ThreeJS 책을 구매했고 좀 더 공부한 후에 꼭 다시 한번 만들어볼 계획이다.
