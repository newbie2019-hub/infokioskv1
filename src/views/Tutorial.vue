<template>
  <div>
    <div ref="clickedGesture" class="clickedOverlay">
      <div class="clicked">
        <div class="clicked-modal">
          <h5>Card Clicked!</h5>
        </div>
      </div>
    </div>
    <div class="grid-container">
      <div class="title">
        <h1 class="text-center text-yellow font-weight-bold">TUTORIAL</h1>
        <p class="text-">Please use slow hand movements</p>
      </div>
      <main class="grid-item main">
        <div class="items" ref="horizontal" @mousedown="onMouseDown" @mousemove="onMouseMove" @mouseup="onMouseUp">
          <div class="item-tutorial item1">
            <div id="introcard" class="item-tutorial-card" v-tilt="{ perspective: 500}">
              <img id="introcard" src="@/assets/images/draggesture.gif" alt="">
              <div class="item-tutorial-description">
                <h6><span class="font-weight-bold">Drag Gesture</span> - Pinch your fingers and drag to the left and unpinch after.</h6>
              </div>
            </div>
          </div>
          <div class="item-tutorial item2">
           <div id="introcard" @click="showClickModal" class="item-tutorial-card" v-tilt="{ perspective: 500}">
              <img id="introcard" src="@/assets/images/clickgesture.gif" alt="">
              <div class="item-tutorial-description">
                <h6><span class="font-weight-bold">Click Gesture</span> - To click, simply hover to an element and pinch and unpinch your fingers.</h6>
              </div>
            </div>
          </div>
          <div class="item-tutorial item3">
            <router-link to="/menu">
              <div id="introcard" class="item-tutorial-card" v-tilt="{ perspective: 500}">
                <img id="introcard" src="@/assets/images/logo.png" alt="" class="bg-secondary" style="object-fit: contain">
                <div class="item-tutorial-description">
                  <h6><span class="font-weight-bold">Main Menu</span> - Click this card to proceed to main menu</h6>
                </div>
              </div>
            </router-link>
          </div>
        </div>
      </main>
    </div>
  </div>
</template>
<script>
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
    showClickModal(){
      this.$refs.clickedGesture.style.display = 'flex'
      this.$refs.clickedGesture.style.background = 'rgba(39, 39, 39, 0.76)'
      setTimeout(() => {
        this.$refs.clickedGesture.style.display = 'none'
        this.$refs.clickedGesture.style.background = '#fff'
      }, 1200)
    }
    
  },
 

}
</script>
<style>

</style>