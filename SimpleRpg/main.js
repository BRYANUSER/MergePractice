/*主要程式運作*/

/*全域變數宣告、事件觸發*/ 
//MapArray : 決定地圖中每個格子的元素
//Ctx : HTML5 Canvas使用
//CurrentImgMainX, CurrentImgMainY : 決定主角所在座標
//ImgMountain, ImgMain, ImgEnemy : 障礙物、主角、敵人的圖片物件

let MapArray, Ctx, CurrentImgMainX, CurrentImgMainY;
let ImgMountain, ImgMain, ImgEnemy;

//當網頁元件載入完成要做的事情
$(document).ready(function(){
    //遊戲地圖
    //0:遊走、1:障礙、2:終點、3:敵人
    MapArray = [0,1,1,0,0,0,3,1,2];
    Ctx = $("#MyCanvas")[0].getContext("2d");

    //擺主角
    ImgMain = new Image();
    ImgMain.src = "SimpleRpg/images/spriteSheet.png";
    CurrentImgMainX = 0;
    CurrentImgMainY = 0;
    ImgMain.onload = function(){
        Ctx.drawImage(ImgMain,0,0,80,130, CurrentImgMainX, CurrentImgMainY, 200, 200);
    };

    //擺障礙物與敵人
    ImgMountain = new Image();
    ImgMountain.src = "SimpleRpg/images/material.png";
    ImgEnemy = new Image();
    ImgEnemy.src = "SimpleRpg/images/Enemy.png";
    ImgMountain.onload = function(){
        ImgEnemy.onload = function(){
            for(let x in MapArray){
                if(MapArray[x]==1){
                    Ctx.drawImage(ImgMountain,32,65,32,32,x%3*200, Math.floor(x/3)*200, 200, 200);
                }else if(MapArray[x]==3){
                    Ctx.drawImage(ImgEnemy,7,40,104,135,x%3*200, Math.floor(x/3)*200, 200, 200);
                }
            }
        }
    };
});

/*當有人按下按鍵後要執行的事情*/
$(document).keydown(function(event){
    //主角即將要移動過去的目標位置X、Y、主角即將要移動過去的那一格編號、依照主角朝向什麼方向而決定的圖片
    let TargetImgMainX, TargetImgMainY, TargetBlock, CutImagePositionX;
    //避免點擊鍵盤出現瀏覽器的其他行為，例如:捲動、放大、換頁...
    event.preventDefault();

    //根據使用者按鍵指示，對應計算目標位置、主角新的方向圖片
    switch(event.code){/*按鍵判斷、座標設定、排除其他狀況 */
        case "ArrowLeft": //向左
            TargetImgMainX = CurrentImgMainX-200;
            TargetImgMainY = CurrentImgMainY;
            CutImagePositionX = 175;
            break;
        case "ArrowUp": //向上
            TargetImgMainX = CurrentImgMainX;
            TargetImgMainY = CurrentImgMainY-200;
            CutImagePositionX = 355;
            break;
        case "ArrowRight": //向右
            TargetImgMainX = CurrentImgMainX+200;
            TargetImgMainY = CurrentImgMainY;
            CutImagePositionX = 540;
            break;
        case "ArrowDown": //向下
            TargetImgMainX = CurrentImgMainX;
            TargetImgMainY = CurrentImgMainY+200;
            CutImagePositionX = 0;
            break;
        default: //其他按鍵不回應
            return;                
    }
    //在邊界內
    if(TargetImgMainX<=400 && TargetImgMainX>=0 &&TargetImgMainY<=400&&TargetImgMainY>=0){
        TargetBlock = TargetImgMainX/200+TargetImgMainY/200*3;
    }else{ //超出邊界
        TargetBlock = -1;
    }
    //清除主角原本所在位置
    Ctx.clearRect(CurrentImgMainX, CurrentImgMainY, 200, 200);
    if(TargetBlock == -1 || MapArray[TargetBlock]==1 || MapArray[TargetBlock]==3){
    //所有異常(出界、遇到敵人、遇到障礙物都不動)
    }else{ //正常情況就設定新的位置
        $("#TalkBox").empty();
        CurrentImgMainX = TargetImgMainX;
        CurrentImgMainY = TargetImgMainY;
    }
    //在新的位置上畫上主角
    Ctx.drawImage(ImgMain,CutImagePositionX,0,80,130,CurrentImgMainX, CurrentImgMainY, 200, 200);

    //對應用文字顯示狀態
    switch(MapArray[TargetBlock]){
        case undefined:
            $("#TalkBox").text("邊界");
            break;
        case 1:
            $("#TalkBox").text("有山");
            break;
        case 2:
            $("#TalkBox").text("抵達終點");
            break;
        case 3:
            $("#TalkBox").text("哈摟");
            break;
    }
});