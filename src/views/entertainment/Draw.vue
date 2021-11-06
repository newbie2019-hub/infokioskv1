<template>
  <div>
    <div class="container-fluid" style="height: 100vh">
      <canvas class="drawcanvas" ref="drawcanvas" id="drawcanvas" @mousedown="startPosition" @mouseup="finishedPosition" @mousemove="draw"></canvas>
      <div class="model-container">
       <v-swatches v-model="color" class=""></v-swatches>
       <div class="clear " @click.prevent="clearCanvas" >Clear</div>
      </div>
    </div>
    <PinchGesture/>
  </div>
</template>
<script>
import VSwatches from 'vue-swatches'
import 'vue-swatches/dist/vue-swatches.css'
import PinchGesture from '../component/PinchGesture.vue'

export default {
  components: { VSwatches, PinchGesture },
  data() {
    return {
      painting: false,
      ctx: '',
      color: 'white',
      lineWidth: 8,
      swatches: [
        ['#F64272', '#F6648B', '#F493A7', '#F891A6'],
        ['#8b5aff', '#a27bff', '#b99cff', '#d0bdff'],
        ['#51e5db', '#74ebe3', '#96f0ea', '#b9f5f1'],
        ['#ffa51a', '#ffb748', '#ffc976', '#ffdba3']
      ]
    }
  },
  mounted() {
   const canvas = document.querySelector('#drawcanvas');
   canvas.setAttribute('width', window.innerWidth)
   canvas.setAttribute('height', window.innerHeight)
   const ctx_i = canvas.getContext('2d');

   ctx_i.width = window.innerWidth;
   ctx_i.height = window.innerHeight;
   this.ctx = ctx_i
  },
  methods: {
    startPosition(e){
      this.painting = true;
      this.draw(e)
    },
    draw(e){
      if(!this.painting) return
      this.ctx.lineWidth = this.lineWidth;
      this.ctx.lineCap = 'round';
      this.ctx.strokeStyle = this.color;
      this.ctx.lineTo(e.clientX, e.clientY);
      this.ctx.stroke();
      this.ctx.beginPath();
      this.ctx.moveTo(e.clientX, e.clientY);
    },
    finishedPosition(){
      this.painting = false;
      this.ctx.beginPath();
    },
    clearCanvas(){
      this.ctx.clearRect(0, 0, this.ctx.width, this.ctx.height);
    }
  },

}
</script>
<style>
.clear {
  height: 75px;
  width: 75px;
  position: relative;
  background-color: rgba(39, 119, 238, 0.664);
  border-radius: 10px;
  margin-left: 2rem;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  
}

.model-container {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  display: flex;
  justify-content: center;
  margin-top: 15px;
  padding: 2rem 5rem;
  
}

.vue-swatches__trigger {
  height: 75px !important;
  width: 75px  !important;
}

.drawcanvas {
  position: absolute;
  left: 0;
  right: 0;
  width: 100%;
  height: 100vh;
}
</style>