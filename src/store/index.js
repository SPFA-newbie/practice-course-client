import { createStore } from 'vuex'

export default createStore({
  state: {
    secondStage: true,
    
    studentFilter: {
      sname:'',
      sid:'',
      major:'',
      enrollment:['', ''],
      graduation:['', ''],
      diploma_condition:{
          graduation: 0,
          degree: 0,
          transcript: 0
      }
    },
    majorList: [],

    studentInfo: {
      sid: '',
      sname: '',
      major: '',
      sex: '',
      birthday: '',
      enrollment: '',
      graduation: ''
    },

    scoreSid:''
  },
  getters: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
  }
})
