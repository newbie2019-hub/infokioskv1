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
              <h4 class="heading w-75"><span class="text-yellow font-weight-bold">Core Values</span><br/>Welcome, Pinch and drag your fingers to begin ←</h4>
            </div>
          </div>
          <div id="" class="item-text-only-university item-text" v-for="(core, i) in core_values" :key="i">
           <div class="text quote  d-flex flex-column text-center justify-content-center align-items-center">
             <h1 class="heading text-yellow font-weight-bold">{{core.core_value}}</h1><br/>
             <h5 class="heading w-50 text-wrap text-center">{{core.description}}</h5>
           </div>
         </div>
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
  async mounted() {
   document.title = "Welcome to Touchless Information Kiosk"
   await this.$store.dispatch('info/getCoreValues')

   
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