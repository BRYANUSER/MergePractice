/*存放資料 */

/*建立一個陣列存放資料*/
let TopicsArray = [
    "尚未開學",
    "國定假日",
    "環境準備",
    "隨機性",
    "重複性",
    "條件判斷"
];

/*建立方便輸入日期的機制*/
let StartDate = new Date();

function SetMonthAndDay(StartMonth, StartDay){
    //一次設定好月份與日期
    StartDate.setMonth(StartMonth-1, StartDay);
    //時間先忽略，設為0
    StartDate.setHours(0);
    StartDate.setMinutes(0);
    StartDate.setSeconds(0);
}

//先在程式碼中直接指定社團課程第一天
SetMonthAndDay(4,1);
