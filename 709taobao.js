window.onload=function() {
    var lunL=document.getElementsByClassName('lunb-i-left')[0];  //左边点击按钮
    var lunR=document.getElementsByClassName('lunb-i-right')[0]; //右边点击按钮
    var lun=document.getElementsByClassName('lunb-li')[0];      //轮播的div
    var lunImg=lun.getElementsByTagName('img');              //轮播的img-s
    var lunb=document.getElementsByClassName('lunb')[0]; 
    var spans=lunb.getElementsByTagName('span');
    var spanslen=spans.length;
    var len=lunImg.length;                                          //图片的个数
    var timers;
    var indexnow=0;
    var flag=true;
    for(var i=0;i<spanslen;i++){
        spans[i].index=i;
    }
    spans[0].className="spanover";
    function lunpage(offset){ 
        if(flag){
        var newleft = parseInt(lun.style.left)+offset;
        var time=200;
        var degree=10;
        var speed=offset/(time/degree);   //总的时间除与次数 等于每次要增加的长度
       function go(){                     //利用递归，每次当前左距离没有达到做移一个图片的距离就递归继续，到了就停止
         flag=false; 
           if((speed <0 && parseInt(lun.style.left)>newleft)||(speed>0 && parseInt(lun.style.left)<newleft)) {
             lun.style.left = parseInt(lun.style.left)+speed+'px' ;
             setTimeout(go,10);
           }
           else{
               if(parseInt(lun.style.left)>=0){
                  lun.style.left = -520*(len-2)+'px';
               }
               else if(parseInt(lun.style.left)<=-520*(len-1)){
                  lun.style.left = -520+'px';
               }
               flag=true; 
           }
       }
       go(); 
     }
     else{
         return;
     }
    }

    function play(){
        timers=setInterval(function(){
            lunpage(-520);
            if(indexnow>=3){
                indexnow=0;
            }
            else{
                indexnow++;
            }
            for(var i=0;i<spanslen;i++){
                spans[i].className="";
            }
            spans[indexnow].className="spanover";},1500);
    }

    function showb(){
        for(var i=0;i<spanslen;i++){
            spans[i].onclick=function(){
               if(indexnow!=this.index){
                   var offsets=(this.index-indexnow)*-520;
                   lunpage(offsets);
                   indexnow = this.index;
               }
               for(var i=0;i<spanslen;i++){
                spans[i].className="";
            }
            spans[indexnow].className="spanover";
        }
      }
   }

    lunL.onclick=function(){
        lunpage(-520);
        if(indexnow>=3){
            indexnow=0;
        }
        else{
            indexnow++;
        }
        for(var i=0;i<spanslen;i++){
            spans[i].className="";
        }
        spans[indexnow].className="spanover";
        clearInterval(timers);
    }

    lunR.onclick=function(){
        lunpage(+520);
        if(indexnow<=0){
            indexnow=3;
        }
        else{
            indexnow--;
        }
        for(var i=0;i<spanslen;i++){
            spans[i].className="";
        }
        spans[indexnow].className="spanover";
        clearInterval(timers);
    }

    lunb.onmouseout=function(){
       play();
    }
    lunb.onmouseover=function(){
        clearInterval(timers);
    }
    play();
    showb();
}