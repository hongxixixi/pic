window.onload=function(){
    var divArea = document.getElementById('mineArea'); //雷区div
   function makeArea(){     //创建雷区
        var tableArea = document.createElement('table');  //创建一个table
        divArea.appendChild(tableArea);             //把table加入div
            for(var rows=0;rows<10;rows++){
                var tr = document.createElement('tr');
                tableArea.appendChild(tr);
                for(var cows=0;cows<10;cows++){
                    var td = document.createElement('td');
                    tr.appendChild(td);
                }
            }
   }
   var tds=document.getElementsByTagName('td');

   function makemine(){ //随机产雷----15个
        for(var i=0;i<10;i++){
            var mineIndex=Math.floor(100*Math.random());  //Math.floor--向下取整
            tds[mineIndex].celltype='●';  //标记为雷   
        }
        for(var i=0;i<100;i++){
            tds[i].indexs=i;
      }
}

function many(){
    var cou=0;
    for(var i=0;i<6;i++){
    var manyindex=Math.floor(100*Math.random())
    if(tds[manyindex].cellIndex!='mine'){
        tds[manyindex].celltype='many';
        cou++;
        console.log(manyindex);
    }
  }
}

    function clickmine(){
        var count=0;
        if(this.celltype=='●'&&this.innerHTML==''){   //踩雷
            for(var i=0;i<100;i++){
                if(tds[i].celltype=='●'){
                    tds[i].innerHTML='●';
            }
          }
        }

        else if(this.celltype=='many'&&this.innerHTML==''){
            console.log(this.indexs);
            this.innerHTML='!!';
            clickmine.call(tds[this.indexs-11]);
            clickmine.call(tds[this.indexs-10]);
            clickmine.call(tds[this.indexs-9]);
            clickmine.call(tds[this.indexs-1]);
            clickmine.call(tds[this.indexs+1]);
            clickmine.call(tds[this.indexs+9]);
            clickmine.call(tds[this.indexs+10]);
            clickmine.call(tds[this.indexs+11]);
        }

        else if(this.innerHTML==''){
        if(this.indexs-11>0){
            if(tds[this.indexs-11].celltype=='●'){
                count++;
            }
        }
        if(this.indexs-10>0){
            if(tds[this.indexs-10].celltype=='●'){
                count++;
            }
        }
        if(this.indexs-9>0){
            if(tds[this.indexs-9].celltype=='●'){
                count++;
            }
        }

        if(this.indexs-1>0){
            if(tds[this.indexs-1].celltype=='●'){
                count++;
            }
        }
        if(this.indexs+1<100){
            if(tds[this.indexs+1].celltype=='●'){
                count++;
            }
        }

        if(this.indexs+11<100){
            if(tds[this.indexs+11].celltype=='●'){
                count++;
            }
        }
        if(this.indexs+10<100){
            if(tds[this.indexs+10].celltype=='●'){
                count++;
            }
        }
        if(this.indexs+9<100){
            if(tds[this.indexs+9].celltype=='●'){
                count++;
            }
        }
        this.innerHTML=count;
      }

    }

   makeArea();
   makemine();
   many();
   for(var i=0;i<100;i++){
    tds[i].onclick=clickmine;
    }    //为每一个td绑定事件
}