/*主要程式運作*/

/*建立變數、建立按鈕事件處理*/ 
$(document).ready(function(){
    //建立CurrentQuiz,儲存目前作答到第幾題
    let CurrentQuiz=null;

    //當按下按鈕後，需要做的事情放在這裡面
    $("#StartButton").click(function(){
        /*第一題的顯示:if*/
        //如果還沒作答就從這裡開始
        if(CurrentQuiz==null){
            //設定目前作答到第0題
            CurrentQuiz = 0;
            
            //顯示題目
            $("#Question").text(Questions[0].question);

            //清空選項區域
            $("#Options").empty();

            //加入選項
            for(let x=0;x<Questions[0].answers.length;x++){
               $("#Options").append(
                "<input name='Options' type='radio' value="+
                x+
                "<label>"+Questions[0].answers[x][0]+
                "</label><br><br>"
            );
            }
            //將按鈕文字換成Next或下一題
            $("#StartButton").attr("value","Next");
        }else{  /*檢查哪一個選項被使用者選取，是要往下一題顯示還是通往結果:else*/ 
            //如果已經開始作答就從這裡繼續
            //尋訪每個選項是否有被選取
            $.each(
                /*顯示結果標題、結果詳細內容*/
                $(":radio"),function(i, val){
                    if(val.checked){
                        //分成是否已產生最終結果(A~D)
                        if(isNaN(Questions[CurrentQuiz].answers[i][1])){
                            //通往最終成果
                            let FinalResult = Questions[CurrentQuiz].answers[i][1];
                            //顯示最終成果的標題
                            $("#Question").text(FinalAnswers[FinalResult][0]);
                            //清空選項區域
                            $("#Options").empty();
                            //顯示最終成果內容
                            $("#Options").append(FinalAnswers[FinalResult][1]+"<br><br>");
                            //將目前作答到第幾題的變數清空
                            CurrentQuiz=null;
                            //修改按鈕為重新開始
                            $("#StartButton").attr("value","Restart");
                        }else{/*顯示下一題*/
                            //指定下一個要顯示的題目，原始資料從1開始，所以要-1
                            CurrentQuiz = Questions[CurrentQuiz].answers[i][1]-1;
                            //顯示新的題目
                            $("#Question").text(Questions[CurrentQuiz].question);
                            //清空舊的選項內容
                            $("#Options").empty();
                            //顯示新的選項內容
                            for(let x=0;x<Questions[CurrentQuiz].answers.length;x++){
                                $("#Options").append(
                                 "<input name='Options' type='radio' value="+
                                 x+
                                 "<label>"+Questions[CurrentQuiz].answers[x][0]+
                                 "</label><br><br>" 
                                );
                            }                       
                        }
                        //完成後即可跳離迴圈
                        return false;
                    }
                }
            );
        }
    });
});