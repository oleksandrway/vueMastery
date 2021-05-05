import Vue from "vue";
import Vuex from "vuex";
import * as user from '@/store/modules/user';
import * as events from '@/store/modules/events';
import * as notification from '@/store/modules/notification';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    user,
    events,
    notification
  },
  state: {

    categories: [
      'sustainability',
      'nature',
      'animal welfare',
      'housing',
      'education',
      'food',
      'community'
    ],
  }
});
