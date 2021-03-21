const date = new Date();
const yearEl = document.querySelector(".year");
const currentMonthEl = document.querySelector(".current-month");
const prevMonthEl = document.querySelector(".prev-month");
const nextMonthEl = document.querySelector(".next-month");
const dateListsEl = document.querySelector(".date-lists");
let year = date.getFullYear(); // YYYY
let month = date.getMonth(); // 0 ~ 11
let nowMonth = month + 1; // 1 ~ 12
let day = date.getDay(); // 0 ~ 6(일~토)
let date2 = date.getDate();
//화면에 초기값 설정
yearEl.innerHTML = year;
setMonthText();
setDateText(year, month);

nextMonthEl.addEventListener("click", function () {
  setMonthText("next");
  const [currNum] = getMonthText(nowMonth);
  setDateText(year, currNum);
  setYearText(year);
});
prevMonthEl.addEventListener("click", function () {
  setMonthText("prev");
  const [currNum] = getMonthText(nowMonth);
  setDateText(year, currNum);
  setYearText(year);
});

function setMonthText(direction) {
  if (direction === "prev") {
    nowMonth = (nowMonth - 1 + 12) % 12 || 12;
    if (nowMonth === 12) {
      year -= 1;
    }
  } else if (direction === "next") {
    nowMonth = (nowMonth % 12) + 1;
    if (nowMonth === 1) {
      year += 1;
    }
  }
  const [prevNum, currNum, nextNum] = getMonthText(nowMonth);
  currentMonthEl.innerHTML = `${currNum}월`;
  nextMonthEl.innerHTML = `${nextNum}월`;
  prevMonthEl.innerHTML = `${prevNum}월`;
}

function getMonthText(nowMonth) {
  const currNum = nowMonth;
  const nextNum = (nowMonth + 1) % 12;
  const prevNum = nowMonth - 1 || 12;
  return [prevNum, currNum, nextNum];
}

function setYearText() {
  yearEl.innerHTML = year;
}

function getLastDateOfMonth(year, month) {
  let date = new Date(year, month + 1, 0);
  return date.getDate();
}

function getDateArrayOfMonth(year, month) {
  let lastDate = getLastDateOfMonth(year, month);
  let arr = [];
  for (let i = 0; i < lastDate; i++) {
    arr[i] = i + 1;
  }
  let firstDate = new Date(year, month, 1);
  let firstDay = firstDate.getDay();
  let frontArr = [];
  if (firstDay !== 0) {
    for (let i = 0; i < firstDay; i++) {
      frontArr.unshift(new Date(year, month, -i).getDate());
    }
  }
  let divBy7 =
    Math.ceil((frontArr.length + arr.length) / 7) * 7 -
    (frontArr.length + arr.length);
  //   console.log(frontArr.length, arr.length, divBy7);
  let backArr = [];
  if (divBy7 > 0) {
    for (let i = 0; i < divBy7; i++) {
      backArr[i] = i + 1;
    }
  }
  return [frontArr, arr, backArr];
}

function setDateText(year, month) {
  removeChild(dateListsEl);
  const [frontArr, arr, backArr] = getDateArrayOfMonth(year, month);
  //   console.log(backArr.length);
  for (let i = 0; i < frontArr.length; i++) {
    let newLi = document.createElement("li");
    newLi.classList.add("prevDate", "gray");
    let prevContent = document.createTextNode(frontArr[i]);
    newLi.appendChild(prevContent);
    dateListsEl.appendChild(newLi);
  }
  for (let i = 0; i < arr.length; i++) {
    let newLi = document.createElement("li");
    newLi.classList.add("currDate");
    let currContent = document.createTextNode(arr[i]);
    newLi.appendChild(currContent);
    dateListsEl.appendChild(newLi);
  }
  for (let i = 0; i < backArr.length; i++) {
    let newLi = document.createElement("li");
    newLi.classList.add("nextDate", "gray");
    let nextContent = document.createTextNode(backArr[i]);
    newLi.appendChild(nextContent);
    dateListsEl.appendChild(newLi);
  }
  //이전. 다음 날짜에는 prevDate, nextDate 클래스 추가해서 선택 시 체크하고 해당되면 이전,다음 월을 클릭한것처럼 동작시키기
}

function removeChild(parentObj) {
  while (parentObj.firstChild) {
    parentObj.removeChild(parentObj.firstChild);
  }
}
