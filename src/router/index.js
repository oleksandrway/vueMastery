import Vue from "vue";
import VueRouter from "vue-router";

import EventList from '../views/EventList.vue';
import EventShow from '../views/EventShow.vue';
import NotFound from '@/views/NotFound.vue';
import NetworkIssue from '@/views/NetworkIssue.vue';


import NProgress from 'nprogress';
import store from '@/store';

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "event-list",
    component: EventList,
    props: true,

  },
  {
    path: "/event/create",
    name: "event-create",
    // alias: "/oldway",  // not good for SEO but can be used instead of redirect 


    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import('../views/EventCreate.vue'),
  },
  {
    path: "/event/:id",
    name: "event-show",
    component: EventShow,
    props: true,
    beforeEnter(routeTo, routeFrom, next) {
      store.dispatch('events/fetchEvent', routeTo.params.id).then(event => {
        routeTo.params.event = event
        next()
      }).catch(error => {
        if (error.response && error.response.status == 404) {
          next({ name: '404', params: { resource: 'event' } })

        } else {
          next({ name: 'network-issue' })
        }
      })
    }

  },
  {
    path: '/404',
    name: '404',
    component: NotFound,
    props: true

  },
  {
    path: '*',
    redirect: { name: '404', params: { resource: 'page' } }
  },
  {
    path: '/network-issue',
    name: 'network-issue',
    component: NetworkIssue
  },


];

const router = new VueRouter({
  mode: "history",
  routes,
});

router.beforeEach((routeTo, routeFrom, next) => {
  NProgress.start()
  next()
})

router.afterEach(() => {
  NProgress.done()
})

export default router;
