import EventService from '@/services/EventService.js';

export const namespaced = true

export const state = {
  events: [],
  numberOfEvents: 0,
  event: {},
  perPage: 3,

}
export const mutations = {
  AD_EVENT(state, event) {
    state.events.push(event)
  },
  SET_EVENTS(state, events) {
    state.events = events
  },
  SET_NUMBEROFEVENTS(state, number) {
    state.numberOfEvents = number
  },
  SET_EVENT(state, event) {
    state.event = event
  }
}
export const actions = {
  createEvent({ commit, dispatch }, event) {
    return EventService.postEvent(event).then(() => {
      commit("AD_EVENT", event)

      const notification = {
        type: 'success',
        message: 'Your event has been created!'
      }
      // here error
      dispatch('notification/add', notification, { root: true })

    }).catch(error => {
      const notification = {
        type: 'error',
        message: 'There was a problem creating  your event ' + error.message
      }
      dispatch('notification/add', notification, { root: true })
      throw error
    })

  },
  fetchEvents({ commit, dispatch, state }, { page }) {

    return EventService.getEvents(state.perPage, page)
      .then((response) => {
        commit("SET_NUMBEROFEVENTS", response.headers['x-total-count'])
        commit('SET_EVENTS', response.data)
      })
      .catch((error) => {
        const notification = {
          type: 'error',
          message: 'There was a problem fetching events: ' + error.message
        }
        dispatch('notification/add', notification, { root: true })

      });
  },
  fetchEvent({ commit, getters, }, id) {

    let event = getters.getEventById(id)

    if (event) {
      commit('SET_EVENT', event)
      return event
    } else {
      return EventService.getEvent(id)
        .then((response) => {
          commit("SET_EVENT", response.data)
          return response.data
        })
        ;

    }

  }
}
export const getters = {

  getEventById: state => id => {
    return state.events.find(event => event.id === id)
  }
}

