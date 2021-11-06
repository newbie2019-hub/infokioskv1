<template>
  <div>
    <div class="model-loading" v-if="!modelLoaded && isLoading">
      <div class="loading-container">
        <div class="spinner-grow text-light" role="status" style="height: 3rem; width: 3rem">
        </div>
        <h4 class="text-yellow fw-bold mt-3">Loading Model</h4>
        <h6 class="text-light mt-3 w-25 text-center">Loading the model for the first time may take a while but it will be cached by your browser after then.</h6>
      </div>
    </div>
    <div class="bg-intro">
    <div class="container">
        <div class="row align-items-center w-100 text-white">
            <div class="col-sm-6 col-md-6">
                <h6 class="mt-5 ps-5 fw-light">TOUCHLESS INFO KIOSK</h6>
            </div>
            <div class="col-sm-6 col-md-6 d-flex justify-content-end">
                <a href="" @click.prevent="proceedTouchless" class="btn btn-primary rounded-pill mt-5 me-5 px-4">Proceed</a>
            </div>
        </div>

        <div class="container">
            <div class="row justify-content-center text-white">
                <div class="col-md-2 col-lg-3 col-xl-2 mt-5">
                    <span class="arrow">&#10230;</span>
                </div>
                <div class="col-md-10 col-lg-9 col-xl-9">
                    <p class="topText"><span class="">Navigate</span> the system without the need to touch.</p>
                </div>
            </div>
            <div class="row justify-content-center text-white">
                <div class="col-md-8 col-lg-6 col-xl-7 mb-5 ps-5">
                  <p class="fs-4 fw-light lh-2">These experiment was made possible by <a href="https://google.github.io/mediapipe/solutions/hands">MediaPipe's Hand</a> Project and requires a newer computer</p>
                </div>
            </div>  
            <div class="row justify-content-center">
                <a class="ca3-scroll-down-link ca3-scroll-down-arrow" data-ca3_iconfont="ETmodules" data-ca3_icon=""></a>
            </div>         
        </div>

        <div class="row gestureSec-2 justify-content-center align-items-center text-white">
          <div class="col-md-3 col-lg-4 col-xl-4">
              <p class="touchlessTech lh-1 fw-normal"><span class="">Touchless</span> technology</p>
          </div>
          <div class="col-md-10 col-lg-7 col-xl-6">
              <p class="fs-5 fw-light lh-sm">Interactive digital displays are found in food service, information kiosks, and more. However, due to the ongoing COVID-19 pandemic, the users are now resistant to touch these devices. <br><br> This created a demand for technology that would allow us to interact without touching and using any expensive sensor devices. <br/><br/>This is where MediaPipe's Hands Model comes in handy for this project. MediaPipe's Hands Model is a Machine Learning Solution co-created by Google. MediaPipe's Hand Tracking will track hands and by adding some custom hand gestures we can interact within the system.</p>            
          </div>
        </div>

        <div class="container gestureSec">
          <div class="row justify-content-center align-items-center text-white mt-5 flex-sm-column-reverse flex-md-row flex-lg-row flex-xl-row">
            <div class="col-11 col-sm-11 col-md-9 col-lg-9 col-xl-8">
              <div class="row justify-content-center">
                <div class=" col-sm-5 col-md-3">
                  <img src="@/assets/images/clickgesture.gif" class="img-fluid" alt="" lazy>
                </div>
                <div class="col-md-6">
                  <h3 class="my-4 fw-normal ">Click Gesture</h3>
                  <p class="fs-5 fw-light">To click, simply hover to an element (e.g., card) and pinch and unpinch your fingers to click.</p>
                </div>
              </div>
              <div class="row justify-content-center">
                <div class="col-sm-4 col-md-3">
                    <img src="@/assets/images/draggesture.gif" class="img-fluid" alt="" lazy>
                </div>
                <div class="col-md-6">
                    <h3 class="my-4 fw-normal ">Drag Gesture</h3>
                    <p class="fs-5 fw-light pe-5">To drag, simply pinch your fingers and drag to left or right. The pointer will grow a bit bigger indicating a drag gesture.</p>
                </div>
              </div>
              <div class="row justify-content-center ">
                 <div class=" col-sm-5 col-md-3">
                    <img src="@/assets/images/returngesture.gif" class="img-fluid" alt="" lazy>
                </div>
                <div class="col-md-6 overflow-hidden">
                    <h3 class="my-4 fw-normal ">Return Gesture</h3>
                    <p class="fs-5 fw-light">To return, simply make a victory or peace gesture. Cursor or mouse pointer will morph into a countdown and wait it to go to zero.</p>
                </div>
              </div>
            </div>
            <div class="col-11 col-sm-11 col-md-3 col-lg-3 col-xl-4">
              <h5 class="w-lg-100 w-md-100 w-sm-100 touchlessTech text-white">Gestures used in our system</h5>
            </div>
          </div>
        </div>

        <div class="row justify-content-center align-items-center text-white gestureSec-2">
          <div class="col-md-3 col-lg-4 col-xl-4">
              <p class="touchlessTech lh-sm fw-normal">Our Project - Touchless Info Kiosk</p>
          </div>
          <div class="col-md-10 col-lg-7 col-xl-6">
              <p class="fs-5 fw-light lh-sm">We aim to create a touchless information kiosk for Leyte Normal University. This will provide informations about the University such as the administration, mission, vision, core values, announcements, events, list of organizations, departments and many more.</p>            
              <p class="fs-5 fw-light lh-sm">This may not be stable as you think and this requires a newer computer for the machine learning model to operate well. <br/> Learning and getting used to navigating the system will take time especially for those non-techy persons - though this can still be navigated with a mouse</p>            
          </div>
        </div>

        <div class="row justify-content-center align-items-center text-white gestureSec-2">
          <div class="col-md-3 col-lg-4 col-xl-4">
              <p class="touchlessTech lh-sm fw-normal">You can try our system</p>
          </div>
          <div class="col-md-10 col-lg-7 col-xl-6">
              <p class="fs-5 fw-light lh-sm">Explore what can be done with hand tracking technology. <br/> Everything is processed locally and no webcam data is being sent or stored to our server.</p>            
              <a href="" @click.prevent="proceedTouchless" class="btn btn-primary rounded-pill mt-3 me-5 px-4">Proceed</a>
          </div>
        </div>
        <div class="container footer text-white">
            <div class="row justify-content-center align-items-center mt-5">
                <div class="col-10 col-sm-6 col-md-5 col-lg-5 col-xl-4 ">
                  <div class="d-flex align-items-center">
                    <img src="@/assets/images/logo.png" class="img-fluid w-25 " alt="">
                    <h5 class="fw-normal ml-4">Bachelor of Science in Information Technology</h5>
                  </div>
                </div>
                <div class="col-10 col-sm-6 col-md-5 col-lg-5 col-xl-4">
                    <img src="@/assets/images/logo_mp.png" class="img-fluid mt-4 ms-5 w-75" alt="">
                </div>
            </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data(){
    return {
      modelLoaded: false,
      isLoading: false,
    }
  },
  async mounted() {
   this.isLoading = true
   document.title = "Welcome to Touchless Information Kiosk"
   await this.$store.dispatch('info/getMissionVision')
   await this.$store.dispatch('info/getCoreValues')
   await this.$store.dispatch('info/getOrganizations')
   await this.$store.dispatch('info/getSchoolOfficials')
   await this.$store.dispatch('info/getDepartments')
   document.addEventListener('handsfree-modelReady', (event) => {
     this.modelLoaded = true
   })
   this.isLoading = false
  },
  components: {
  },
  methods: {
   proceedTouchless(){
     window.handsfree.unpause()
     this.$router.push('/tutorial')
   }
    
  },
 

}
</script>
<style>
.bg-intro {
  position: relative;
  width: 100%;
  height: 100%;
  background: #000;
  font-family: "Poppins", sans-serif;
}

.arrow{
    font-size: 80px;
}

.topText{
    font-size: 70px;
    font-family: "Poppins", sans-serif;
    margin-top: 60px;
}

.touchlessTech{
  font-size: 50px;
}

.gestureSec { 
    margin-top: 60px;
    overflow-y: hidden;
    overflow-x: hidden;
}

.gestureSec-2 {
    margin-top: 100px;
    overflow-y: hidden;
    overflow-x: hidden;
}

.footer{
    margin-top: 150px;
    margin-bottom: 120px;
}

</style>