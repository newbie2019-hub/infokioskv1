import Handsfree from 'handsfree'
import router from '../../router'
import Vue from 'vue';

//HANDSFREE 
const handsfree = new Handsfree({ 
  hands: { 
    enabled: true, 
    maxNumHands: 2, 
    minDetectionConfidence: 0.75,
    minTrackingConfidence: 0.55
  },   
  plugin: {
    pinchers: {
      threshold: 35
    }
  },
  showDebug: true, 
  assetsPath: `${window.location.origin}/assets`,
})

document.addEventListener('handsfree-handsModelReady', (event) => {
  handsfree.emit('handsModelLoaded', true)  
})

// =PAUSE AFTER LOADED
// handsfree.start(() => {
//   handsfree.pause()
// })

handsfree.start() 

window.handsfree = handsfree
let toast_nohand_id = null, scroll_enabled = null
let origclickx, origclicky, currclickx, currclicky;

handsfree.use('palmPointerBasic', {
  onUse () {
    this.$pointer = document.createElement('div')
    this.$pointer.classList.add('handsfree-pointer')
    this.$pointer.style.display = 'none'
    document.body.appendChild(this.$pointer)
  },

  onFrame ({hands}) {
    // console.log(handsfree.plugin)
    if (!hands.multiHandLandmarks) {
      this.$pointer.style.display = 'none'

      if(window.location.pathname != '/') {
        if(toast_nohand_id == null) {
          toast_nohand_id = Vue.$toast('No Hand Detected', {timeout: false})
        }  
      }
      
      return
    }

    if(toast_nohand_id != null){
      closeNoHandsToast() 
    }

    // console.log('LEFT-ORIG', hands.origPinch[0][0])
    // console.log('LEFT-CURPINCH', hands.curPinch[0][0])
    // console.log('RIGHT-CURPINCH-X', hands.curPinch[1][0].x * window.outerWidth)
    // console.log('RIGHT-CURPINCH-Y', hands.curPinch[1][0].y * window.outerHeight)

    // console.log('RIGHT-ORIG-X', hands.origPinch[1][0].x * window.outerWidth)
    // console.log('RIGHT-ORIG-Y', hands.origPinch[1][0].y * window.outerHeight)
   
    this.$pointer.style.display = 'block'

    let x, y;
    x = hands.multiHandLandmarks[0][4].x
    y = hands.multiHandLandmarks[0][4].y
    // Map to the window
    x *= window.outerWidth + 80
    y *= window.outerHeight - 100

    // Flip x
    x = window.outerWidth - x

    // Position pointer
    this.$pointer.style.left = `${x}px`
    this.$pointer.style.top = `${y}px`
    // console.log(`${x}px`, `${y}px`);
    
    hands.pointer = {x, y}

    const $el = document.elementFromPoint(x, y)

    if(hands.pinchState[1][0] == 'start' || hands.pinchState[0][0] == 'start'){
      origclickx = x
      origclicky = y

      this.$pointer.style.width = '55px';
      this.$pointer.style.height = '55px';
      this.$pointer.style.padding = '2px';
      this.$pointer.style.borderRadius = '50%';
      this.$pointer.style.border = '1.5px dashed rgb(255, 255, 255)';
      this.$pointer.style.backgroundClip = 'content-box';
      this.$pointer.style.animation = 'rotating 2s linear infinite';

      if ($el) {
        $el.dispatchEvent(
          new MouseEvent('mouseup', {
            bubbles: true,
            view: window,
            cancelable: true,
            clientX: x,
            clientY: y,
            pageX: x,
            pageY: y,
          })
        )
        $el.dispatchEvent(
          new MouseEvent('mousedown', {
            bubbles: true,
            cancelable: true,
            clientX: x,
            clientY: y,
            pageX: x,
            pageY: y,
          })
        )

        // Focus
        if (['INPUT', 'TEXTAREA', 'BUTTON', 'A'].includes($el.nodeName))
          $el.focus()
      }
    }

    else if(hands.pinchState[1][0] == 'held' || hands.pinchState[0][0] == 'held') {
      if ($el) {
        $el.dispatchEvent(
          new MouseEvent('mousemove', {
            bubbles: true,
            cancelable: true,
            clientX: x,
            clientY: y,
            pageX: x,
            pageY: y,
          })
        )
        
      }
    }

    const element = document.elementFromPoint(x,y)
    const cards = document.querySelectorAll('#introcard')
    let prevelem
    if(element){
      if(element.id == 'introcard'){
        prevelem = element
        element.style.boxShadow = '0px 0px 8px #1976d2d0'
      }
      else{
        cards.forEach(card => {
          card.style.boxShadow = '0px 0px 10px #1976d200'
        });

      }
    }

    if(hands.pinchState[1][0] == 'released' || hands.pinchState[0][0] == 'released'){
      currclickx = x
      currclicky = y
      $el.dispatchEvent(
        new MouseEvent('mouseup', {
          bubbles: true,
          view: window,
          cancelable: true,
          clientX: x,
          clientY: y,
          pageX: x,
          pageY: y,
        })
      )
      // console.log('CURRENT - X: ' + currclickx)
      // console.log('ORIG - X: ' + origclickx)
      if(currclickx <= (origclickx + 50) && (currclickx + 50) >= (origclickx)){
        $el.dispatchEvent(
          new MouseEvent('click', {
            bubbles: true,
            view: window,
            cancelable: true,
            clientX: origclickx,
            clientY: origclicky,
            pageX: origclickx,
            pageY: origclicky,
          })
        )
      }
      setDefaultPointer()
    }

    if ($el) {
      $el.dispatchEvent(
        new MouseEvent('mouseenter', {
          bubbles: true,
          view: window,
          cancelable: true,
          clientX: x,
          clientY: y,
          pageX: x,
          pageY: y,
        })
      )

      $el.dispatchEvent(
        new MouseEvent('mouseover', {
          bubbles: true,
          view: window,
          cancelable: true,
          clientX: x,
          clientY: y,
          pageX: x,
          pageY: y,
        })
      )

      $el.dispatchEvent(
        new MouseEvent('mousemove', {
          bubbles: true,
          view: window,
          cancelable: true,
          clientX: x,
          clientY: y,
          pageX: x,
          pageY: y,
        })
      )
    }
  }
})

//SCROLL FEATURE 2.0 - BOTH HANDS SCROLL
function scrollingBehavior(){
  handsfree.use('bothHandsScroll', {
    onFrame ({hands}) {
      // console.log(hands.multiHandLandmarks)

      //CHECK FOR MULTI-HAND LANDMARKS
      if(hands.multiHandLandmarks && hands.multiHandLandmarks.length == 2){
        
        //FIRST REMOVE MOUSE POINTER 
        if(mousepointer){
          noPointer()
        }

        //SHOW TOAST FOR SCROLLING ONCE
        if(scroll_enabled == null) {
          scroll_enabled = Vue.$toast('Scrolling Enabled. You can now scroll horizontally or vertically', {timeout: false})
        }

        
        /*
          
          CHECK FOR THE OFFSET OF THE RIGHT HAND - 
          DETERMINE IF IT MOVED TO LEFT OR RIGHT/UP OR DOWN BY COMPARING THE 
          INITIAL LANDMARK OF THE BOUNDING BOX OF THE RIGHT HAND

        */

      }
      else 
      {
        if(scroll_enabled != null){
          Vue.$toast.dismiss(scroll_enabled)
          scroll_enabled = null
        }
      }

    }
  })
}

scrollingBehavior()

function closeNoHandsToast(){
  if(toast_nohand_id == null) return
  Vue.$toast.dismiss(toast_nohand_id)
  toast_nohand_id = null
}

let mousepointer = document.querySelectorAll('.handsfree-pointer');

function noPointer(){
  if(mousepointer){
    for (let i = 1; i < mousepointer.length; i++) {
      mousepointer[i].style.display = 'none';
    }
  }
}

if(mousepointer){
  for (let i = 1; i < mousepointer.length; i++) {
    mousepointer[i].style.width = '37px';
    mousepointer[i].style.height = '37px';
  }
}

function setDefaultPointer(){
  for (let i = 1; i < mousepointer.length; i++) {
    mousepointer[i].style.width = '40px';
    mousepointer[i].style.height = '40px';
    mousepointer[i].style.padding = '5px';
    mousepointer[i].style.borderRadius = '50%';
    mousepointer[i].style.border = '1.5px dashed rgb(255, 255, 255)';
    mousepointer[i].style.backgroundClip = 'content-box';
    mousepointer[i].style.animation = 'none';
    mousepointer[i].style.clipPath = 'none';
  }

}

/** 
 * ------------------------
 * 
 * RETURN GESTURE
 * 
 * ------------------------
 *
 */

handsfree.useGesture({
  "name": "return",
  "algorithm": "fingerpose",
  "models": "hands",
  "confidence": "8",
  "description": [
    [
      "addCurl",
      "Thumb",
      "NoCurl",
      1
    ],
    [
      "addDirection",
      "Thumb",
      "VerticalUp",
      0.6666666666666666
    ],
    [
      "addDirection",
      "Thumb",
      "DiagonalUpLeft",
      1
    ],
    [
      "addCurl",
      "Index",
      "NoCurl",
      1
    ],
    [
      "addDirection",
      "Index",
      "DiagonalUpRight",
      1
    ],
    [
      "addCurl",
      "Middle",
      "NoCurl",
      1
    ],
    [
      "addDirection",
      "Middle",
      "VerticalUp",
      1
    ],
    [
      "addCurl",
      "Ring",
      "FullCurl",
      1
    ],
    [
      "addDirection",
      "Ring",
      "VerticalUp",
      1
    ],
    [
      "addCurl",
      "Pinky",
      "FullCurl",
      1
    ],
    [
      "addDirection",
      "Pinky",
      "VerticalUp",
      1
    ],
    [
      "addDirection",
      "Pinky",
      "DiagonalUpLeft",
      0.07142857142857142
    ]
  ],
  "enabled": true
})

/**
 * -------------------
 *                    |
 *        TIMER       |
 *                    |
 * -------------------
 */

let iv = null //interval
let return_timer = null;
let countdown = 3;
let flag = false;
let cantreturntoast = null
let returntoast = null
handsfree.use('return', ({ hands }) => {
  if (!hands.multiHandLandmarks) return
  
  if(hands.gesture[1] == null) {
    clearTimeout(return_timer)
    return_timer = null
    clearInterval(iv)
    countdown = 4
    setDefaultPointer()
    iv = null;
  }

  if(hands.gesture[1] != null && hands.gesture[1] != ''){
    if(hands.gesture[1].name != null){
      if(hands.gesture[1].name == 'return') {

        //If path is / return toast message
        if(window.location.pathname == '/') {
          setDefaultPointer()
          if(cantreturntoast != null) return 
          cantreturntoast = Vue.$toast('Previous route is not available. Proceed first to the main menu', {timeout: 2500})
          setTimeout(() => {
            cantreturntoast = null
          }, 2600)
          return
        }

        returnPrev()
        flag = true
        for (let i = 1; i < mousepointer.length; i++) {
          mousepointer[i].style.width = '40px';
          mousepointer[i].style.height = '40px';
          mousepointer[i].style.padding = '8px';
          if(countdown == 3){
          mousepointer[i].style.clipPath = 'polygon(10% 38%, 11% 10%, 19% 0%, 81% 0%, 89% 8%, 90% 48%, 79% 56%, 89% 65%, 89% 93%, 81% 100%, 14% 100%, 10% 90%, 10% 64%, 30% 64%, 30% 80%, 35% 83%, 65% 83%, 69% 78%, 69% 69%, 66% 63%, 36% 63%, 36% 45%, 66% 45%, 71% 38%, 70% 22%, 65% 17%, 36% 17%, 30% 23%, 30% 38%)';
          }  
          else if(countdown == 2){
          mousepointer[i].style.clipPath = 'polygon(10% 35%, 34% 35%, 34% 22%, 39% 17%, 63% 17%, 68% 24%, 68% 39%, 62% 45%, 14% 61%, 10% 72%, 11% 100%, 88% 100%, 88% 81%, 30% 82%, 30% 77%, 82% 60%, 87% 48%, 86% 9%, 81% 0, 17% 0, 10% 10%)';
          }
          else if(countdown == 1) {
          mousepointer[i].style.clipPath = 'polygon(16% 83%, 16% 100%, 86% 100%, 86% 83%, 62% 83%, 62% 9%, 57% 0%, 18% 0, 18% 19%, 29% 19%, 41% 19%, 41% 83%)';
          }
          else {
            setDefaultPointer()
            clearTimeout(return_timer)
            clearInterval(iv)
            hideReturnToast()
            return_timer = null
            flag = false
            iv = null;
          }  
          mousepointer[i].style.borderRadius = '0';
          mousepointer[i].style.border = '0 none';
          mousepointer[i].style.animation = 'none';
          mousepointer[i].style.backgroundClip = 'initial';
        }
      }
      else {
        clearTimeout(return_timer)
        clearInterval(iv)
        hideReturnToast()
        return_timer = null
        flag = false
        iv = null;
      }
    }
  }

});

function returnPrev(){
  showReturnToast()
  if(flag) return
  countdown = 3;

  iv = window.setInterval(() => {
    countdown--
  }, 1000)

  return_timer = window.setTimeout(()=>{
    setDefaultPointer()
    router.go(-1);
  }, 3000)
}

function showReturnToast(){
  if (returntoast != null) return
  returntoast = Vue.$toast('Returning to previous route', {timeout: false})
}

function hideReturnToast(){
  if(returntoast == null) return
  setDefaultPointer()
  Vue.$toast.dismiss(returntoast)
  returntoast = null
  return
}

