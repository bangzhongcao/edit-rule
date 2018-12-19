import Vue from 'vue'
import Router from 'vue-router'
import panel from '@/components/contentPanel'

Vue.use(Router)

export default new Router({
	mode:'history',
  	routes: [
	    {
	      path: '/',
	      name: 'index',
	      component: panel
	    }
  	]
})
