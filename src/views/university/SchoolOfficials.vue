<template>
  <div>
    <div class="grid-container">
      <div class="title">
        <h1 class="text-center font-weight-bold text-yellow">UNIVERSITY OFFICIALS</h1>
        <p class="text-">Use your hand for navigation</p>
      </div>
      <main class="grid-item main">
        <div class="items" ref="horizontal" @mousedown="onMouseDown" @mousemove="onMouseMove" @mouseup="onMouseUp">
          <div id="" class="item-text-only item-text" v-tilt="{ perspective: 500}">
            <div class="text">
              <h6 class="heading">Welcome, Pinch and drag your fingers to start ←</h6>
            </div>
          </div>
          <div id="introcard" class="item item1" v-tilt="{ perspective: 500}" v-for="(official, i) in schoolofficials" :key="i">
            <img id="introcard" src="@/assets/images/userplaceholder.png" alt="">
            <div class="introcard-description" style="height: auto !important; padding: 2rem 2rem">
              <h6 class="font-weight-bold">{{official.role}}<br/><small>{{official.email}}</small></h6>
            </div>
            <div class="introcard-button">
              <a href="" class="btn rounded-pill btn-primary">{{official.title}} {{official.first_name}} {{official.last_name}}</a>
            </div>
          </div>
        </div>
      </main>
    </div>
    <PinchGesture/>
  </div>
</template>
<script>
import { mapState } from 'vuex';
import PinchGesture from '../component/PinchGesture.vue'

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
  async mounted() {
   await this.$store.dispatch('info/getSchoolOfficials')
   
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
      const walk = (x - this.startX) * 2.5; //scroll-fast
      this.$refs.horizontal.scrollLeft = this.scrollLeft - walk;
    },
    
  },
  computed: {
   ...mapState('info', ['schoolofficials'])
  }
 

}
</script>
<style>

</style>