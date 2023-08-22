import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'jumper',
    component:()=>import('@/views/jumper')
  },
  {
    path: '/student',
    name: 'student',
    children:[
      {
        path:'/my-message',
        name:'myMessage',
        component:()=>import('@/views/studentSub/myMessage')
      },
      {
        path:'/my-score',
        name:'myScore',
        component:()=>import('@/views/studentSub/myScore')
      },
      {
        path:'/my-diploma',
        name:'myDiploma',
        component:()=>import('@/views/studentSub/myDiploma')
      },
      {
        path:'/change-password',
        name:'changePassword',
        component:()=>import('@/views/studentSub/changePassword')
      }
    ],
    component:()=>import('@/views/student')
  },
  {
    path: '/admin',
    name: 'admin',
    children:[
      {
        path:'/student-message',
        name:'studentMessage',
        component:()=>import('@/views/sub/studentMessage')
      },
      {
        path:'/create-diploma',
        name:'createDiploma',
        component:()=>import('@/views/sub/createDiploma')        
      },
      {
        path:'/certificate-message',
        name:'certificateMessage',
        component:()=>import('@/views/sub/certificateMessage')
      },
      {
        path:'/operation-log',
        name:'operationLog',
        component:()=>import('@/views/sub/operationLog')
      },
      {
        path:'/create-student',
        name:'createStudent',
        component:()=>import('@/views/sub/createStudent')
      },
      {
        path:'/change-student',
        name:'changeStudent',
        component:()=>import('@/views/sub/changeStudent')        
      },
      {
        path:'/upload-photos',
        name:'uploadPhotos',
        component:()=>import('@/views/sub/uploadPhotos')        
      },
      {
        path:'/student-score',
        name:'studentScore',
        component:()=>import('@/views/sub/studentScore')
      },
      {
        path:'/change-score',
        name:'changeScore',
        component:()=>import('@/views/sub/changeScore')
      }
    ],
    component:()=>import('@/views/admin')
  },
  {
    path: '/login',
    name: 'login',
    component:()=>import('@/views/login')
  }
]

const router = createRouter({
  history: createWebHashHistory(process.env.BASE_URL),
  mode:"history",
  routes
})

export default router
