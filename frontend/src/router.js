import { createWebHashHistory, createRouter } from 'vue-router'

import MainPage from './pages/MainPage.vue'
import LogIn from './pages/LogIn.vue'
import { useStore } from './store'
import Admin from './pages/Admin.vue'
import SendingMoney from './pages/SendingMoney.vue'
import Lottery from './pages/Lottery.vue'
import KaraokeVote from './pages/KaraokeVote.vue'

const routes = [
  { path: '/', redirect: '/my/sending', meta: {shouldBeAuthed: true} },
  { 
    path: '/my', 
    component: MainPage, 
    children: [
      { 
        path: 'sending', 
        component: SendingMoney, 
      },
      { 
        path: 'lottery', 
        component: Lottery, 
      },
      { 
        path: 'karaoke', 
        component: KaraokeVote, 
      },
    ],
    meta: {shouldBeAuthed: true},
  },
  { path: '/admin', component: Admin, meta: {shouldBeAuthed: true, admin: true} },
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
  }

  if(to.meta.shouldBeAuthed && !store.user) {
    return '/login'
  }

  if (!to.meta.shouldBeAuthed && store.user) {
    return '/'
  }

  if (to.meta.admin && !store.user?.isAdmin)
    return '/'

  return

})