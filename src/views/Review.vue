<template>
  <div>
    <div ref="rateContainer" class="rate-container">
     <div class="rate-input-container">
       <h5 class="text-yellow ">Please use your keyboard for input</h5>
       <h6 class="text-light mb-4">Data will be sent anonymously</h6>
       <textarea v-model="data.suggestion" type="text" class="form-control" rows="5" placeholder="Please enter your suggestions"/>
       <div class="d-flex">
        <button class="btn btn-secondary mt-4 mr-2" @click="$refs.rateContainer.style.display = 'none'">Cancel</button>
        <button class="btn btn-primary mt-4" @click.prevent="sendReview">Proceed</button>

       </div>
     </div>
    </div>
    <div class="grid-container">
      <div class="title">
        <h1 class="text-center font-weight-bold text-yellow">SYSTEM RATING</h1>
        <p class="text-">Data will be sent anonymously</p>
      </div>
      <main class="grid-item main">
        <div class="items" ref="horizontal" @mousedown="onMouseDown" @mousemove="onMouseMove" @mouseup="onMouseUp">
          <div id="" class="item-text-only item-text" v-tilt="{ perspective: 500}">
            <div class="text">
              <h6 class="heading">Welcome, Select from 3 of the emojis to rate ←</h6>
            </div>
          </div>
          <div @click.prevent="setSelectedReview('sad')" id="introcard" class="item item2" v-tilt="{ perspective: 500}">
            <img id="introcard" class="emoji" src="@/assets/images/sad.png" alt="">
          </div>
          <div @click.prevent="setSelectedReview('happy')" id="introcard" class="item item3" v-tilt="{ perspective: 500}">
             <img id="introcard" class="emoji" src="@/assets/images/laugh.png" alt="">
          </div>
          <div @click.prevent="setSelectedReview('angry')" id="introcard" class="item item4" v-tilt="{ perspective: 500}">
             <img id="introcard" class="emoji" src="@/assets/images/angry.png" alt="">
           </div>
        </div>
      </main>
    </div>
    <PinchGesture/>
  </div>
</template>
<script>
import PinchGesture from './component/PinchGesture'
export default {
  data(){
    return {
      startX: 0,
      scrollLeft: 0,
      isDown: false,
      data: {
       emoji: '',
       suggestion: '',
      },
      isLoading: false,
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
      const walk = (x - this.startX) * 2.5; //scroll-fast
      this.$refs.horizontal.scrollLeft = this.scrollLeft - walk;
    },
    setSelectedReview(data){
     this.data.emoji = data
     this.$refs.rateContainer.style.display = 'block'
    },
    async sendReview(){
     if(this.data.suggestion == '') return this.$toast.error('Please leave us some suggestions')
     const res = await this.$store.dispatch('info/sendReview', this.data)
     res.status == 200 ? this.$toast.success('Thank you for your feedback') : this.$toast.error('Something went wrong \nPlease contact the developer')
     this.data.suggestion = ''
     this.$refs.rateContainer.style.display = 'none'
    }
    
  },
 

}
</script>
<style>

</style>