function start(){
    window.setInterval(change, 2000); //此处change方法不可加()，否则只会运行一次
}

function change(){

    var newBlock=document.getElementsByClassName("block");

    var colorNum1=parseInt(Math.random()*256)+","+Math.random()*256+","+Math.random()*256;
    console.log(colorNum1);
    var colorNum2=parseInt(Math.random()*256)+","+Math.random()*256+","+Math.random()*256;
    console.log(colorNum2);
    var colorNum3=parseInt(Math.random()*256)+","+Math.random()*256+","+Math.random()*256;
    console.log(colorNum3);

    var ranNum1=parseInt(Math.random()*newBlock.length-1);
    var ranNum2=parseInt(Math.random()*newBlock.length-1);
    var ranNum3=parseInt(Math.random()*newBlock.length-1);

    newBlock[ranNum1].style.backgroundColor="rgb("+colorNum1+")";
    newBlock[ranNum2].style.backgroundColor="rgb("+colorNum2+")";
    newBlock[ranNum3].style.backgroundColor="rgb("+colorNum3+")";

}

function format(){
    var Arr=document.getElementsByClassName("block");
    for(var i=0; i<Arr.length;i++){
        Arr[i].style.backgroundColor="orange";
    }
}

function end(){
    format();
    clearInterval(change);

}