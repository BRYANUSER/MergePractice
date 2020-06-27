var canvas = document.getElementById("myCanvas");//將<canvas>元件的參考存成變數canvas
var ctx = canvas.getContext("2d");//建立ctx變數儲存"2D渲染環境"
var x = canvas.width/2;
var y = canvas.height-30;        
var dx = 2;
var dy = -2;
var ballRadius = 10;
/*球拍長、寬以及球拍在X軸上初始位置*/
var paddleHeight = 10;
var paddleWidth = 75;
var paddleX = (canvas.width-paddleWidth)/2;
/*使用定義布林變量來儲存左右鍵狀態，並初始化為false*/
var rightPressed = false;
var leftPressed = false;
/*定義磚塊變量:列、行、寬、高、填充(確保磚塊之間不會互相接觸)*/
var brickRowCount = 3;
var brickColumnCount = 5;
var brickWidth = 75;
var brickHeight = 20;
var brickPadding = 10;
/*定義磚塊上偏移量、左偏移量，確保磚塊不會從canvas畫布的邊緣開始繪製(canvas是從左到右、上到下繪圖)*/
var brickOffsetTop = 30;
var brickOffsetLeft = 30;
/*定義二維陣列儲存所有磚塊位置、狀態*/
var bricks = [];
for(c=0; c<brickColumnCount; c++) {//行
    bricks[c] = [];
    for(r=0; r<brickRowCount; r++) {//列
    bricks[c][r] = { x: 0, y: 0, status: 1};//初始化每一塊地x、y位置(數組)、狀態
    }
}
var score = 0;//紀錄分數
var lives = 3;

/*當按下按鍵時觸發此函式，按下時:相關變數變為true*/
function keyDownHandler(e) {
    if(e.keyCode == 39) {//keyCode:39(右鍵)
        rightPressed = true;
    }
    else if(e.keyCode == 37) {//keyCode:37(左鍵)
        leftPressed = true;
    }
}

document.addEventListener("mousemove", mouseMoveHandler, false);
/*當鬆開按鍵時觸發此函式，鬆開時:相關變數變為false*/
function keyUpHandler(e) {
    if(e.keyCode == 39) {//keyCode:39(右鍵)
        rightPressed = false;
    }
    else if(e.keyCode == 37) {//keyCode:37(左鍵)
        leftPressed = false;
    }
}

function mouseMoveHandler(e) {
    var relativeX = e.clientX - canvas.offsetLeft;
    if(relativeX > 0 && relativeX < canvas.width) {
        paddleX = relativeX - paddleWidth/2;
    }
}

/*在canvas上印出圓形(球)*/
function drawBall() {
    ctx.beginPath();
    ctx.arc(x, y, ballRadius, 0, Math.PI*2, false);//定義圓弧，參數:圓弧中心的x、y座標、圓弧的半徑、圓弧開始和結束的角度(從開始到結束的角度, 以弧度表示)、繪製的方向(false順時針,預設或true為逆時針) 
    ctx.fillStyle = "#0095DD";//設定填滿時的顏色
    ctx.fill();//圓弧填滿顏色(變成園)(以上一次beginPath”之後的所有路徑為基礎)
    ctx.closePath();
}
        
/*在canvas上印出矩形(球拍)*/
function drawPaddle() {
    ctx.beginPath();
    ctx.rect(paddleX, canvas.height-paddleHeight, paddleWidth, paddleHeight);//定義矩形、大小
    ctx.fillStyle = "#0095DD";//設定填滿時的顏色
    ctx.fill();//矩形填滿顏色填滿顏色(以上一次beginPath”之後的所有路徑為基礎)
    ctx.closePath();
}

/*在canvas上印出矩形(磚塊)*/
function drawBricks() {
    for(c=0; c<brickColumnCount; c++) {
        for(r=0; r<brickRowCount; r++) {
            if(bricks[c][r].status == 1) {//該磚塊狀態為1就繪製
                var brickX = (c*(brickWidth+brickPadding))+brickOffsetLeft;
                var brickY = (r*(brickHeight+brickPadding))+brickOffsetTop;
                bricks[c][r].x = brickX;
                bricks[c][r].y = brickY;
                ctx.beginPath();
                ctx.rect(brickX, brickY, brickWidth, brickHeight);
                ctx.fillStyle = "#0095DD";
                ctx.fill();
                ctx.closePath();
            }
        }
    }
}

/*逐一偵測磚塊是否被撞擊*/
function collisionDetection() {
    for(c=0; c<brickColumnCount; c++) {
        for(r=0; r<brickRowCount; r++) {
            var b = bricks[c][r];
            if(b.status == 1) {//若該位置存在磚塊:則該磚塊狀態改為0，且球的位移量反轉
                /*下列4種情況同時發生，代表發生碰撞:
                1.球的x、y位置大於磚塊的x、y位置
                2.球的x位置小於磚塊(x+寬度)
                3.球的y位置小於磚塊(y+高度)*/
                if(x > b.x && x < b.x+brickWidth && y > b.y && y < b.y+brickHeight) {
                dy = -dy;
                b.status = 0;
                score++;//加分
                /*所有分數都拿到後:顯示獲勝訊息，再重置頁面*/
                if(score == brickRowCount*brickColumnCount) {
                    alert("YOU WIN, CONGRATULATIONS!");
                    document.location.reload();
                }
                }
            }
        }
    }

}
/*創建和更新顯示的分數*/
function drawScore() {
    ctx.font = "16px Arial";
    ctx.fillStyle = "#0095DD";
    ctx.fillText("Score: "+score, 8, 20);
}

/*繪製生命值*/
function drawLives() {
    ctx.font = "16px Arial";
    ctx.fillStyle = "#0095DD";
    ctx.fillText("Lives: "+lives, canvas.width-65, 20);
}

/*將會重複執行，用不同的變數改變球的位置或其他物的位置。重複執行一個函式*/
function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);//長方形範圍內所繪製的東西將會被清除掉。參數:長方形左上角的 x和 y座標、右下角的 x 和 y 座標            
    drawBricks();
    drawBall();
    drawPaddle();
    collisionDetection()
    drawLives();

    /*當球的中心與左右牆的邊緣之間的距離與球的半徑完全相同時，它會改變運動方向，營造反彈的效果。*/
    if(x + dx > canvas.width-ballRadius || x + dx < ballRadius) {//當下一步會碰到右壁與左壁時，反轉位移量
        dx = -dx;
    }
    if(y + dy < ballRadius) {//當下一步會碰到頂部時:反轉位移量
        dy = -dy;
    }
    else if(y + dy > canvas.height-ballRadius) {//當下一步會碰到底部時:
        /*如果在球在球拍之間；只反轉位移量，否則再加上結束遊戲與重啟頁面*/
        if(x > paddleX && x < paddleX + paddleWidth) {
            dy = -dy;
        }
        else {
            dy = -dy;
            lives--;
            if(!lives) {//生命值歸0，輸
                alert("GAME OVER");
                document.location.reload();
                //clearInterval(interval); // Needed for Chrome to end game
            }
            else {//重置部分參數
                x = canvas.width/2;
                y = canvas.height-30;
                dx = 2;
                dy = -2;
                paddleX = (canvas.width-paddleWidth)/2;
            }
        }
    }

    if(rightPressed && paddleX < canvas.width-paddleWidth) {//"右鍵狀態為按下"且"在右壁界內時"，球拍向右移動7像素
        paddleX += 7;
    }
    else if(leftPressed && paddleX > 0) {//"左鍵狀態為按下"且"在左壁界內時"，球拍向左移動7像素
        paddleX -= 7;
    }
            
    x += dx;
    y += dy;
    requestAnimationFrame(draw);//將幀率的控制權交給瀏覽器，而不是固定10ms，瀏覽器會適當地同步幀率，必要時才刷新渲染的圖形
}

/*添加事件監聽器*/
document.addEventListener("keydown", keyDownHandler, false);//按下時觸發keyDownHandler()
document.addEventListener("keyup", keyUpHandler, false);//鬆開時觸發keyUpHandler()
        
draw();
//setInterval(draw, 10);// JavaScript timing function，無限循環的特性， draw()將會每 10 毫秒被呼叫一次除非我們將它停止。

    