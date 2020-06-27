/*主要程式運作*/

$(document).ready(function(){
    SetTable();

    //如果有人來設定日期
    $("#InputDate").change(function(){
       let InputDate = $(this).val();
       console.log(InputDate);//yyyy-mm-dd
       let SplitText = InputDate.split("-");
       console.log(SplitText);
       SetMonthAndDay(SplitText[1],SplitText[2]);
       SetTable(); 
    });

});

function SetTable(){
    $("#CourseTable").empty();

    //一次產生固定標題列
    $("#CourseTable").append(
        //表格語法
        "<tr><th>場次</th><th>時間</th><th>主題</th></tr>"
    );
    //反覆產生資料列
    let TopicCount = TopicsArray.length;    

    //計算一天有多少毫秒
    let OneDayMilliSeconds = 24*60*60*1000;

    /*先將時間轉換成累積毫秒，用累積毫秒設定日期時間*/
    for(let x=0; x<TopicCount; x++){
        //計算一天的毫秒量
        let ThisDate = new Date(StartDate.getTime()+7*x*OneDayMilliSeconds);

        let TrSpecial = "<tr>";

        if(TopicsArray[x]=="不上課"){
            TrSpecial = "<tr style='background-color:lightyellow'>";
        }

        $("#CourseTable").append(
            TrSpecial+
            "<td>"+ (x+1) +"</td>"+
            //顯示時轉換成字串，用slice使之不顯示年分
            "<td>"+ ThisDate.toLocaleDateString().slice(5) +"</td>"+
            "<td>"+ TopicsArray[x]+"</td>"+
            "</tr>"
        );//每一列有場次、預計日期、主題
    }
}