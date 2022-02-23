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
