import { createWebHashHistory, createRouter } from 'vue-router'

import MainPage from './pages/MainPage.vue'
import LogIn from './pages/LogIn.vue'
import { useStore } from './store'

const routes = [
  { path: '/', component: MainPage, meta: {shouldBeAuthed: true} },
  { path: '/login', component: LogIn, meta: {shouldBeAuthed: false} },
]

export const router = createRouter({
  history: createWebHashHistory(),
  routes,
})

router.beforeEach(async (to, from) => {
  const store = useStore()
  
  if(to.meta.shouldBeAuthed === undefined) {
    return
  }
  
  if (!store.user) {
    await store.getUser()
    console.log(store.user, to.meta.shouldBeAuthed );
    
  }

  if(to.meta.shouldBeAuthed && !store.user) {
    console.log('here')
    return '/login'
  }
  if (!to.meta.shouldBeAuthed && store.user) {
    console.log('there')
    return '/'
  }
    console.log('none')
   return

})