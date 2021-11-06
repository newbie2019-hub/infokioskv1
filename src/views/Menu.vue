<template>
  <div>
    <div class="grid-container">
      <div class="title">
        <h1 class="text-center text-yellow">MAIN MENU</h1>
        <p class="text-">Use your hand for navigation</p>
      </div>
      <main class="grid-item main">
        <div class="items" ref="horizontal" @mousedown="onMouseDown" @mousemove="onMouseMove" @mouseup="onMouseUp">
          <div id="" class="item-text-only item-text" v-tilt="{ perspective: 500}">
            <div class="text">
              <h6 class="heading">Welcome, Pinch and drag your fingers to the left ←</h6>
            </div>
          </div>
          <router-link to="/tutorial">
          <div id="introcard" class="item item1" v-tilt="{ perspective: 500}">
            <img id="introcard" src="@/assets/images/tutorial-section.jpg" alt="">
            <div class="introcard-description">
              <h6>Learn how to navigate the system by hand gestures.</h6>
            </div>
            <div class="introcard-button">
              <a href="" class="btn rounded-pill btn-primary">TUTORIALS</a>
            </div>
          </div>
          </router-link>
          <router-link to="/university">
            <div id="introcard" class="item item2" v-tilt="{ perspective: 500}">
              <img id="introcard" src="@/assets/images/university-section.jpg" alt="">
              <div class="introcard-description">
                <h6>Need some information about the University?</h6>
              </div>
              <div class="introcard-button">
                <a href="" class="btn rounded-pill btn-primary">UNIVERSITY</a>
              </div>
            </div>
          </router-link>
          <router-link to="/entertainment">
          <div id="introcard" class="item item3" v-tilt="{ perspective: 500}">
             <img id="introcard" src="@/assets/images/entertainment-section.jpg" alt="">
            <div class="introcard-description">
              <h6>Have some fun and learn other use cases of touchless technology.</h6>
            </div>
            <div class="introcard-button">
              <a href="" class="btn rounded-pill btn-primary">ENTERTAINMENT</a>
            </div>
          </div>
          </router-link>
          <router-link to="/review">
          <div id="introcard" class="item item4" v-tilt="{ perspective: 500}">
             <img id="introcard" src="@/assets/images/review-section.jpg" alt="">
              <div class="introcard-description">
                <h6>Leave us some review from your experience.</h6>
              </div>
              <div class="introcard-button">
                <a href="" class="btn rounded-pill btn-primary">REVIEW</a>
              </div>
            </div>
          </router-link>
        </div>
      </main>
    </div>
  </div>
</template>
<script>
export default {
  data(){
    return {
      startX: 0,
      scrollLeft: 0,
      isDown: false,
    }
  },
  mounted() {
   
  },
  components: {
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
      e.preventDefault();
      if(!this.isDown) return;
      const x = e.pageX - this.$refs.horizontal.offsetLeft;
      const walk = (x - this.startX) * 2.5; //scroll-fast
      this.$refs.horizontal.scrollLeft = this.scrollLeft - walk;
    },
    
  },
 

}
</script>
<style>

</style>