let n
init()
let timer = setInterval(()=>{
  makeLeave(getImage(n)).one('transitionend', (e)=>{
      makeEnter($(e.currentTarget))
    })
  makeCurrent(getImage(n+1))
  n += 1
},3000)

/*解决tab切换再返回该页面出现图片混乱，当用户看不见该页面时候把闹钟停掉，再回来的时候再执行*/
document.addEventListener('visibilitychange', function(){
  if(document.hidden){
      window.clearInterval(timer)
  }else{
      timer = setInterval(()=>{
        makeLeave(getImage(n)).one('transitionend', (e)=>{
            makeEnter($(e.currentTarget))
          })
        makeCurrent(getImage(n+1))
        n += 1
      },3000)
  }
})


function getImage(n){
  return $(`.images > img:nth-child(${x(n)})`)
}

function x(n){
  if(n>3){
    n = n%3
    if (n===0){
      n =3
    }
  } // n = 1 2 3
  return n
}

function init(){
  n = 1
  $(`.images > img:nth-child(${n})`).addClass('current')
    .siblings().addClass('enter')
}

function makeCurrent($node){
  return $node.removeClass('enter leave').addClass('current')
}
function makeLeave($node){
  return $node.removeClass('enter current').addClass('leave')
}
function makeEnter($node){
  return $node.removeClass('leave current').addClass('enter')
}
