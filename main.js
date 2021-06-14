const calculator = document.querySelector("#calculator");
const monitor = document.querySelector("#monitor");
const subMonitor = document.querySelector("#sub-monitor");
const zero = document.querySelector("#zero");
const dot = document.querySelector("#dot");

let inputNumber = "";
const calcuTool = [];
calculator.addEventListener("click", function (event) {
let target = event.target;
if (target.classList.contains("number")) {
    // 鍵入數字
    if (inputNumber.length === 0 && target === zero && target !== dot) {
      // 如果第一個是0 將不寫入
    } else {
      // 其他狀況下寫入數字
    inputNumber += target.innerHTML;
    monitorSync();
    }
} else if (target === dot) {
    // 按的是點的狀況
    if (inputNumber.indexOf(".") === -1) {
    addDot();
    } else {
      // 點已存在，不進行更動
      // inputNumber = inputNumber
    }
} else if (target.classList.contains("calculate")) {
    // 輸入運算符號
    if (calcuTool.length < 2) {
      // 尚未擁有第一組數字
    if (target.innerHTML !== "=" && monitor.value === inputNumber) {
        // 存入第一組數字
        saveNumber(inputNumber, target.innerHTML);
    } else if (target.innerHTML !== "=" && monitor.value !== inputNumber) {
        // 按完=後直接利用剛答案繼續進行運算
        saveNumber(monitor.value, target.innerHTML);
    }
    } else {
      // 一組數字與運算符號，進行運算
    if (target.innerHTML === "=") {
        // 輸入等號，直接計算
        calculateAnswer(calcuTool[1]);
        monitorSync();
        // 顯示答案
        clean();
        // 清空計算空間
    } else {
        // 有一組數字與運算符號，再輸入運算符號時，先將先前數字進行運算
        calculateAnswer(calcuTool[1]);
        calcuTool.splice(0, calcuTool.length);
        saveNumber(inputNumber, target.innerHTML);
    }
    }
} else {
    // 其他功能
    if (target.innerHTML === "back") {
      // 刪除最後一位
    inputNumber = inputNumber.slice(0, inputNumber.length - 1);
    monitorSync();
    } else if (target.innerHTML === "+/-" && inputNumber !== "") {
      // 正負轉換
    if (monitor.value !== inputNumber) {
        inputNumber = monitor.value;
    }
      inputNumber = String((inputNumber *= -1));
    monitorSync();
    } else if (target.classList.contains("clean")) {
      // 清除
    clean();
    monitorSync();
    }
}
});

function monitorSync() {
monitor.value = inputNumber;
}

function saveNumber(number, signs) {
  calcuTool.push(Number(number));
  calcuTool.push(signs);
  inputNumber = "";
  monitorSync();
  subMonitor.value = calcuTool[0] + " " + calcuTool[1];
}

function calculateAnswer(calculatingSigns) {
  if (calculatingSigns === "+") {
    inputNumber = calcuTool[0] + Number(inputNumber);
  } else if (calculatingSigns === "-") {
    inputNumber = calcuTool[0] - Number(inputNumber);
  } else if (calculatingSigns === "*") {
    inputNumber = calcuTool[0] * Number(inputNumber);
  } else {
    inputNumber = calcuTool[0] / Number(inputNumber);
  }
}

function addDot() {
  inputNumber.length === 0 ? (inputNumber = "0.") : (inputNumber += ".");
  monitorSync();
}

function clean() {
  inputNumber = "";
  subMonitor.value = "";
  calcuTool.splice(0, calcuTool.length);
}

// function cleanSubMonitor () {
//   subMonitor.value = ""
// }