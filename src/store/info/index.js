import API from '../base/'

export default {
  namespaced: true,
  state: {
   missionvision: '',
   core_values: '',
   departments: '',
   organizations: '',
   schoolofficials: '',
  },
  getters: {

  },
  mutations: {
   SET_MISSION_VISION(state, data){
    state.missionvision = data
   },
   SET_CORE_VALUES(state, data){
    state.core_values = data
   },
   SET_DEPARTMENTS(state, data){
    state.departments = data
   },
   SET_ORGANIZATIONS(state, data){
    state.organizations = data
   },
   SET_SCHOOL_OFFICIALS(state, data){
    state.schoolofficials = data
   },
  
  },
  actions: {
    async getMissionVision({commit}){
      const res = await API.get(`/missionvision`).then(res => {
        commit('SET_MISSION_VISION', res.data)
        return res;
      }).catch(err => {
       return err.response;
      })

      return res;
    },
    async getCoreValues({commit}){
      const res = await API.get(`/corevalues`).then(res => {
        commit('SET_CORE_VALUES', res.data)
        return res;
      }).catch(err => {
       return err.response;
      })

      return res;
    },
    async getDepartments({commit}){
      const res = await API.get(`/departments`).then(res => {
        commit('SET_DEPARTMENTS', res.data)
        return res;
      }).catch(err => {
       return err.response;
      })

      return res;
    },
    async getOrganizations({commit}){
      const res = await API.get(`/organizations`).then(res => {
        commit('SET_ORGANIZATIONS', res.data)
        return res;
      }).catch(err => {
       return err.response;
      })

      return res;
    },
    async getSchoolOfficials({commit}){
      const res = await API.get(`/schoolofficials`).then(res => {
        commit('SET_SCHOOL_OFFICIALS', res.data)
        return res;
      }).catch(err => {
       return err.response;
      })

      return res;
    },
    async sendReview({commit}, data){
      const res = await API.post('/rate', data).then(res => {
        return res;
      }).catch(err => {
       return err.response;
      })

      return res;
    }
  }
}