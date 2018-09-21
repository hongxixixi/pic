window.onload = (function(){
     var wrap = document.getElementsByClassName('wrap')[0];
     var boxFlag = [],count = 0;        //标记位置小盒子是否已经初始化
    initBlock();
    createDivs();
    createDivs();
    moveBlock();
    function initBlock(){
        for(let i=0;i<4;i++){
            boxFlag[i] = [];
            for(let j=0;j<4;j++ ){
                var divBlock = document.createElement('div');
                divBlock.style.left = j*120+'px';
                divBlock.style.top = i*120+'px';
                divBlock.classList.add('box');
                wrap.appendChild(divBlock);
                boxFlag[i][j] = 0;
            }
        }
    }

    function createDivs(){
        if(count == 16){        //格子满了 
            alert('游戏结束');
            return;
        }

        for(;;){  
            var col =parseInt(Math.random()*4),     //行
            row = parseInt(Math.random()*4);    //列  
            if(!boxFlag[col][row]){
                var divBlock = document.createElement('div');
                divBlock.style.left = row*120 +'px';
                divBlock.style.top = col*120 +'px';
                divBlock.classList.add('contend');
                divBlock.innerHTML = Math.random()>0.5?2:4;
                wrap.appendChild(divBlock);
                boxFlag[col][row]=divBlock;
                count++;
                return ;
            }
        }
    }

    function moveBlock(){
        document.onkeydown = function(e){
            var event = e ||window.event;
            switch(event.keyCode){
                case 37:Left();break;
                case 38:Up();break;   //上
                case 39:console.log(event.keyCode);break;   //右
                case 40:console.log(event.keyCode);break;   //下
                default:break;
            }
            setTimeout(function(){
              createDivs();  
            },302)
        }  
   }

    function Left(){ 
        for(let i = 0;i < 4;i++){               // 行数
            var arr=[];                         // 存储每一行节点的数组变量
             for(let j = 0;j < 4;j++){          // 列数
                 if(!boxFlag[i][j]){ continue; }
                    else {
                            arr.push(boxFlag[i][j]);  
                          }
                          if( arr.length >1 && arr[arr.length-2].innerHTML == arr[arr.length-1].innerHTML){
                              arr[arr.length-2].innerHTML = parseInt(arr[arr.length-2].innerHTML)*2;
                              var temp = boxFlag[i][j];
                              boxFlag[i][j].style.left = (arr.length-2)*120+'px'; 
                              setTimeout(function(){
                                  console.log(temp);
                                    wrap.removeChild(temp);
                                    count--;
                                },300)
                              arr.pop();
                          }
                        } 
                     
                     boxFlag[i] = arr;
                     for(let n = 0;n<boxFlag[i].length;n++){
                        boxFlag[i][n].style.left = n*120+'px'; 
                     }
        }
    }
})