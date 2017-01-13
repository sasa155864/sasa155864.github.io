var box = document.querySelector('.bg-picture-1');
var width = box.offsetWidth;
var imgbox = box.querySelectorAll('ul')[0];
var pointbox = box.querySelectorAll('ul')[1];
var point = pointbox.querySelectorAll('li');
function setTransform(speed){
    imgbox.style.transform='translateX('+speed+'px)';
}
function setTransition(){
    imgbox.style.transition='all .5s linear';
}
function removeTransition(){
    imgbox.style.transition='none'
}

var index=1;
var timer=null;
run();
function run(){
    timer=setInterval(function(){
        index++;
        setTransform(-index*width);
        setTransition();
        color();

    },2000);
}
function color(){
    for(var i=0;i<point.length;i++){
        point[i].classList.remove('active');
    }
    var pointIndex=index;
    if(index>=5){
        pointIndex=1;
    }else  if(index<=0){
        pointIndex=4;
    }
    point[pointIndex-1].classList.add('active');
}


setTransitionEnd(imgbox,function(){
    if(index>=5){
        index=1;
    }else  if(index<=0){
        index=4;
    }
    removeTransition();
    setTransform(-index*width)
});
function  setTransitionEnd(ele,callback){
    ele.addEventListener("webkitTransitionEnd",function(){
        callback&&callback();
    });
    ele.addEventListener("transitionEnd",function(){
        callback&&callback();
    })
}
var start=0;
var end=0;
var instance=0;
imgbox.addEventListener("touchstart",function(e){
    start= e.touches[0].clientX;
    clearInterval(timer);
});
imgbox.addEventListener("touchmove",function(e){
    e.preventDefault();
    end= e.touches[0].clientX;
    instance=start-end;
    setTransform(-index*width-instance);
});
imgbox.addEventListener("touchend",function(e){
   if(Math.abs(instance)>width/3){
       if(instance>0){
           index++;
       }else {
           index--;
       }
   }
    setTransform(-index*width);
    setTransition();
    run();
    color();
});
