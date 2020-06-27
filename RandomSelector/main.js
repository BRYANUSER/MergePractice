/*
window.onload=function(){
    //document.write("Hello JavaScript");
}
*/

$(document).ready(function(){
    //按鈕功能
    $("input").click(function(){
        //alert("Hi");//跳出提示
        //$("H1").text("Hello");//改變問號成Hello
            //$("H1").text($("li:last").text());//改變問號成li的第一個元素
            //$("H1").text($("li:first").text());//改變問號成的最後一個元素
            //$("H1").text($("li").eq(1).text());//改變問號成的第二個元素
        let NumberOfListItem = $("#choices li").length;//先計算li元件有幾個
        //Math.random():0~0.9999xxxx
        //0~0.9999xxxx * 3 = 0 ~ 2.999xxxx
        //floor() : 變成整數 => 0, 1, 2
        let RandomChildNumber = Math.floor(Math.random()*NumberOfListItem);//產生對應的亂數範圍
        //eq:返回是一個 jquery物件 作用是 將匹配的元素集合縮減為一個元素
        $("#random-result").text($("#choices li").eq(RandomChildNumber).text());//使用這個亂數
        $("#random-pic").attr("src", Pictures[RandomChildNumber]);
    });
});