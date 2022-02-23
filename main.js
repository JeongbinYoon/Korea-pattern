let page = 1;
let shapeRealm = "";
let did = "";
const url2D = `http://www.culture.go.kr/openapi/rest/koreanpattern/individualizations/2d?serviceKey=PF9LAJQoopohm%2Bi%2BBlO%2FJn7Lf6nT2aorMXAUsPRVsjlLEfwFmcOF4PHdCylgveVUWm8hAvKR1qC0Z7jVJ4IqYg%3D%3D&`;
const url3D = `http://www.culture.go.kr/openapi/rest/koreanpattern/individualizations/3d?serviceKey=PF9LAJQoopohm%2Bi%2BBlO%2FJn7Lf6nT2aorMXAUsPRVsjlLEfwFmcOF4PHdCylgveVUWm8hAvKR1qC0Z7jVJ4IqYg%3D%3D&`;
const didUrl = `http://www.culture.go.kr/openapi/rest/koreanpattern/individualizations/d/?serviceKey=PF9LAJQoopohm%2Bi%2BBlO%2FJn7Lf6nT2aorMXAUsPRVsjlLEfwFmcOF4PHdCylgveVUWm8hAvKR1qC0Z7jVJ4IqYg%3D%3D&RequestTime=20100810:23003422&`;
let totalCount2D = 0;
let totalCount3D = 0;

// API 불러오기
function patternData(url, how, shapeRealm) {
  $.ajax({
    method: "GET",
    url: url + `shapeRealm=${shapeRealm}&cPage=${page}&rows=5`,
  })
    .done(function (data) {
      console.log(data);
      // 문양 개수
      if (url.match("2d")) {
        totalCount2D = Number($(data).find("totalCount").text());
        $(".totalCount2D").text(totalCount2D);
      } else if (url.match("3d")) {
        totalCount3D = Number($(data).find("totalCount").text());
        $(".totalCount3D").text(totalCount3D);
      }
      $(".totalCountAll").text(totalCount2D + totalCount3D);

      // item 리스트 만들기
      const el = itemList(data);

      // append() or html()
      if (how == "append") {
        $(".items").append(el);
      } else if (how == "html") {
        $(".items").html(el);
      }
    })
    .fail(function () {
      alert("ajax 연결 실패");
    });
}

// item 리스트 생성
function itemList(data) {
  let el = "";
  $.each($(data).find("patternList"), function (idx, val) {
    console.log(idx, val);
    did = $(val).find("did").text();
    let title = $(val).find("title").text();
    let thumbnail = $(val).find("thumbnail").text();
    el += `<li class='item'>`;
    el += `<img src="${thumbnail}" alt="#" class="thumbnail">`;
    el += `<div class="info">`;
    el += `<h2 class="title">${title}</h2>`;
    el += `<span class="did">${did}</span>`;
    el += `</div>`;
    el += `<div class="showDetail">자세히보기＞</div>`;

    el += `</li>`;
  });

  return el;
}

patternData(url2D, "html", shapeRealm);
patternData(url3D, "html", shapeRealm);

//  카테고리 클릭
$(".category-2d").on("click", function () {
  $(".category-3d").removeClass("active");
  $(".category-2d").addClass("active");
  patternData(url2D, "html", shapeRealm);
});
$(".category-3d").on("click", function () {
  patternData(url3D, "html", shapeRealm);
  $(".category-2d").removeClass("active");
  $(".category-3d").addClass("active");
});

//검색
$(".searchBtn").on("click", function () {
  const searchValue = $(".searchInput").val();
  shapeRealm = searchValue;
  patternData(url2D, "html", shapeRealm);
});

// 패턴 타입 클릭
$(".pattern").on("click", function () {
  console.log($(this).text());
  $(this).parent().find(".active").removeClass("active");
  $(this).addClass("active");

  shapeRealm = $(this).text();
  if ($(this).text() == "전체") {
    shapeRealm = "";
  }
  console.log(shapeRealm);

  if ($(".category-2d").hasClass("active")) {
    patternData(url2D, "html", shapeRealm);
  } else if ($(".category-3d").hasClass("active")) {
    patternData(url3D, "html", shapeRealm);
  }

  console.log(url2D);
});

// 더보기 버튼 클릭
$(".moreBtn").on("click", function () {
  page += 1;
  console.log(page);
  if ($(".category-2d").hasClass("active")) {
    console.log(url2D);
    patternData(url2D, "append", shapeRealm);
  } else if ($(".category-3d").hasClass("active")) {
    patternData(url3D, "append", shapeRealm);
  }
});

// 문양 클릭
$(document).on("click", ".item .showDetail", function (event) {
  let popupDid = $(this).prev().children(".did").text();

  $.ajax({
    method: "GET",
    url: `${didUrl}&did=${popupDid}`,
  })
    .done(function (data) {
      console.log(data);
      console.log(popupDid);
      $("#itemInfo").css("display", "block");

      // 팝업 시 리스트 숨기기
      $(".items").css("display", "none");

      const thumbnail = $(data).find("thumbnail").text();
      const title = $(data).find("title").text();
      const type = $(data).find("type").text();
      const dimension = $(data).find("dimension").text();
      const age = $(data).find("age").text();
      const location = $(data).find("location").text();
      const mat = $(data).find("mat").text();
      let abstractTxt = $(data).find("abstractTxt").text();
      const thumbnailTag = `<div class="thumbnailBox"><img class="thumbnail" src="${thumbnail}" alt="${title}"></div>`;
      const patternInfo = `<h5 class="patternInfo">문양정보</h5>`;

      let el = "<ul class='list'>";
      el += `<li>`;
      el += `<span class='tit'>문양명칭</span>`;
      el += `<span class='txt'>${title}</span>`;
      el += `</li>`;
      el += `<li>`;
      el += `<span class='tit'>문양구분</span>`;
      el += `<span class='txt'>${type}${dimension}</span>`;
      el += `</li>`;
      el += `<li>`;
      el += `<span class='tit'>국적/시대</span>`;
      el += `<span class='txt'>${age}</span>`;
      el += `</li>`;
      el += `<li>`;
      el += `<span class='tit'>소장기관</span>`;
      el += `<span class='txt'>${location}</span>`;
      el += `</li>`;
      el += `<li>`;
      el += `<span class='tit'>원천유물 재질</span>`;
      el += `<span class='txt'>${mat}</span>`;
      el += `</li>`;
      el += `</ul>`;

      $(".patternDetail").html(thumbnailTag + patternInfo + el);

      // 문양설명 없을 시
      if (!abstractTxt) {
        abstractTxt = "없음";
      }
      $(".discription").text(abstractTxt);

      // 문양 확대
      $(".thumbnailBox").on("click", function (e) {
        $(this).addClass("active");
      });
      $("html").on("click", function (e) {
        if (
          !$(e.target).hasClass("active") &&
          !$(e.target).hasClass("thumbnail")
        ) {
          $(".thumbnailBox").removeClass("active");
        }
      });

      // 뒤로가기 버튼
      $(".backBtn").on("click", function () {
        $("#itemInfo").css("display", "none");
        $(".items").css("display", "block");
      });
    })
    .fail(function () {
      alert("ajax 연결 실패");
    });
});

// 스크롤
$(window).scroll(function () {
  if ($(this).scrollTop() > 200) {
    $(".scrollUp").fadeIn();
  } else {
    $(".scrollUp").fadeOut();
  }
});

$(".scrollUp").on("click", function () {
  $("html").animate(
    {
      scrollTop: 0,
    },
    400
  );
});
