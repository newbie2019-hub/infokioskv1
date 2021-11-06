<template>
  <div>
    <div class="grid-container">
      <div class="title">
        <h1 class="text-center text-yellow">ENTERTAINMENT</h1>
        <p class="text-">Use your hand for navigation</p>
      </div>
      <main class="grid-item main">
        <div class="items" ref="horizontal" @mousedown="onMouseDown" @mousemove="onMouseMove" @mouseup="onMouseUp">
          <router-link to="/entertainment/draw">
          <div id="introcard" class="item item1" v-tilt="{ perspective: 500}">
            <img id="introcard" src="@/assets/images/paint.png" alt="">
            <div class="introcard-description">
              <h6>Have some fun and paint in the air with your fingers.</h6>
            </div>
            <div class="introcard-button">
              <a href="" class="btn rounded-pill btn-primary">DRAWING BOARD</a>
            </div>
          </div>
          </router-link>
          <div id="introcard" class="item item2" v-tilt="{ perspective: 500}">
            <img id="introcard" src="@/assets/images/seeyousoon.jpg" alt="">
            <div class="introcard-description">
              <h6>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</h6>
            </div>
            <div class="introcard-button">
              <a href="" class="btn rounded-pill btn-primary">COMING SOON</a>
            </div>
          </div>
          <router-link to="/entertainment">
            <div id="introcard" class="item item3" v-tilt="{ perspective: 500}">
              <img id="introcard" src="@/assets/images/seeyousoon.jpg" alt="">
              <div class="introcard-description">
                <h6>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</h6>
              </div>
              <div class="introcard-button">
                <a href="" class="btn rounded-pill btn-primary">COMING SOON</a>
              </div>
            </div>
          </router-link>
          <div id="introcard" class="item item4" v-tilt="{ perspective: 500}">
             <img id="introcard" src="@/assets/images/seeyousoon.jpg" alt="">
            <div class="introcard-description">
              <h6>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</h6>
            </div>
            <div class="introcard-button">
              <a href="" class="btn rounded-pill btn-primary">COMING SOON</a>
            </div>
          </div>
        </div>
      </main>
    </div>
    <PinchGesture />
  </div>
</template>
<script>
import PinchGesture from './component/PinchGesture.vue'
export default {
  data(){
    return {
      handsVisible: false,
      count: 0,
      startX: 0,
      scrollLeft: 0,
      isDown: false,
    }
  },
  mounted() {
   
  },
  components: {
    PinchGesture
  },
  methods: {
    onMouseDown(e) {
      this.isDown = true
      this.startX = e.pageX - this.$refs.horizontal.offsetLeft;
      this.scrollLeft = this.$refs.horizontal.scrollLeft;
    },
    onMouseUp() {
      this.isDown = false
    },
    onMouseMove(e) {
      if(!this.isDown) return;
      e.preventDefault();
      const x = e.pageX - this.$refs.horizontal.offsetLeft;
      const walk = (x - this.startX) * 1.3; //scroll-fast
      this.$refs.horizontal.scrollLeft = this.scrollLeft - walk;
    },
    
  },
}
</script>
<style>

</style>