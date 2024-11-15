import { createRouter, createWebHistory } from 'vue-router'
import FrontPage from '../views/FrontPage.vue'
import Search from '../views/Search.vue'
import Theater from '../views/Theater.vue'
import Show from '../views/Show.vue'
import Comment from '../views/Comment.vue'

const routes = [
	{ path: '/', name: 'frontpage', component: FrontPage },
	{ path: '/search', name: 'search', component: Search },
	{ path: '/theater', name: 'theater', component: Theater },
	{ path: '/show', name: 'show', component: Show },
	{ path: '/comment', name: 'comment', component: Comment },
]

const router = createRouter({
	history: createWebHistory(),
	routes,
})

export default router
