<template>
  <div>
    <div class="grid-container">
      <div class="title">
        <h1 class="text-center font-weight-bold text-yellow">THE UNIVERSITY</h1>
        <p class="text-">Use your hand for navigation</p>
      </div>
      <main class="grid-item main">
        <div class="items" ref="horizontal" @mousedown="onMouseDown" @mousemove="onMouseMove" @mouseup="onMouseUp">
          <div id="" class="item-text-only-university item-text">
            <div class="text">
              <h4 class="heading w-75">Welcome, Pinch and drag your fingers to begin ←</h4>
            </div>
          </div>
          <div id="" class="item-text-only-university item-text">
            <div class="text quote d-flex flex-column text-center justify-content-center align-items-center">
              <h1 class="heading text-yellow font-weight-bold">OUR MISSION</h1><br/>
              <h5 class="heading w-50 text-wrap text-center">{{missionvision[0].lnu_mission}}</h5>
            </div>
          </div>
          <div id="" class="item-text-only-university item-text">
            <div class="text quote  d-flex flex-column text-center justify-content-center align-items-center">
              <h1 class="heading text-yellow font-weight-bold">OUR VISION</h1><br/>
              <h5 class="heading w-50 text-wrap text-center">{{missionvision[0].lnu_vision}}</h5>
            </div>
          </div>
          <div id="" class="item-text-only-university item-text">
            <div class="text">
              <h4 class="heading w-75">Pinch and drag your fingers to continue ←</h4>
            </div>
          </div>
          <router-link to="/corevalues">
            <div id="introcard" class="item item3" v-tilt="{ perspective: 500}">
              <img id="introcard" src="@/assets/images/universityinfo.jpg" alt="">
              <div class="introcard-description">
                <h6>Learn more about the core values of the University</h6>
              </div>
              <div class="introcard-button">
                <a href="" class="btn rounded-pill btn-primary">CORE VALUES</a>
              </div>
            </div>
          </router-link>
          <router-link to="/schoolofficials">
            <div id="introcard" class="item item3" v-tilt="{ perspective: 500}">
              <img id="introcard" src="@/assets/images/universityinfo.jpg" alt="">
              <div class="introcard-description">
                <h6>Get to know of the school officials of the University</h6>
              </div>
              <div class="introcard-button">
                <a href="" class="btn rounded-pill btn-primary">SCHOOL OFFICIALS</a>
              </div>
            </div>
          </router-link>
          <router-link to="/departments">
            <div id="introcard" class="item item3" v-tilt="{ perspective: 500}">
              <img id="introcard" src="@/assets/images/universityinfo.jpg" alt="">
              <div class="introcard-description">
                <h6>Learn more about the departments of the university</h6>
              </div>
              <div class="introcard-button">
                <a href="" class="btn rounded-pill btn-primary">DEPARTMENTS</a>
              </div>
            </div>
          </router-link>
          <router-link to="/organizations">
            <div id="introcard" class="item item3" v-tilt="{ perspective: 500}">
              <img id="introcard" src="@/assets/images/universityinfo.jpg" alt="">
              <div class="introcard-description">
                <h6>Learn more about the organizations of the university</h6>
              </div>
              <div class="introcard-button">
                <a href="" class="btn rounded-pill btn-primary">ORGANIZATIONS</a>
              </div>
            </div>
          </router-link>
          <router-link to="">
            <div id="introcard" class="item item3" v-tilt="{ perspective: 500}">
              <img id="introcard" src="@/assets/images/universityinfo.jpg" alt="">
              <div class="introcard-description">
                <h6>Get updated for the latest announcements in the university</h6>
              </div>
              <div class="introcard-button">
                <a href="" class="btn rounded-pill btn-primary">ANNOUNCEMENTS</a>
              </div>
            </div>
          </router-link>
        </div>
      </main>
    </div>
    <PinchGesture />
  </div>
</template>
<script>
import {mapState} from 'vuex';
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
  mounted() {
   document.title = "Welcome to Touchless Information Kiosk"
   
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
   ...mapState('info', ['missionvision', 'core_values'])
  }
 

}
</script>
<style>

</style>