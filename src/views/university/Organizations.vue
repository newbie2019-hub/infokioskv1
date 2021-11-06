<template>
  <div>
    <div class="grid-container">
      <div class="title">
        <h1 class="text-center font-weight-bold text-yellow">UNIVERSITY ORGANIZATIONS</h1>
        <p class="text-">Use your hand for navigation</p>
      </div>
      <main class="grid-item main">
        <div class="items" ref="horizontal" @mousedown="onMouseDown" @mousemove="onMouseMove" @mouseup="onMouseUp">
          <div id="" class="item-text-only item-text" v-tilt="{ perspective: 500}">
            <div class="text">
              <h6 class="heading">Welcome, Pinch and drag your fingers to start ←</h6>
            </div>
          </div>
          <div id="introcard" class="item item1" v-tilt="{ perspective: 500}" v-for="(org, i) in organizations" :key="i">
            <img id="introcard" src="@/assets/images/university-section.jpg" alt="">
            <div class="introcard-description">
              <h6>Click to learn more about this organization.</h6>
            </div>
            <div class="introcard-button">
              <a href="" class="btn rounded-pill btn-primary">{{org.organization}}</a>
            </div>
          </div>
        </div>
      </main>
    </div>
  </div>
</template>
<script>
import { mapState } from 'vuex';
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
      const walk = (x - this.startX) * 2.5; //scroll-fast
      this.$refs.horizontal.scrollLeft = this.scrollLeft - walk;
    },
    
  },
  computed: {
   ...mapState('info', ['organizations'])
  }
 

}
</script>
<style>

</style>