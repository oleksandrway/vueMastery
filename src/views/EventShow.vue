<template>
  <div>
    <div class="event-header">
      <span class="eyebrow">@{{ event.time }} on {{ event.date | date }}</span>
      <h1 class="title">{{ event.title }}</h1>
      <h5>
        Organized by
        {{ event.organizer ? event.organizer : "" }}
      </h5>
      <h5>Category: {{ event.category }}</h5>
    </div>

    <BaseIcon name="map"><h2>Location</h2></BaseIcon>

    <address>{{ event.location }}</address>

    <h2>Event details</h2>
    <p>{{ event.description }}</p>

    <h2>
      Attendees
      <span class="badge -fill-gradient">{{
        event.attendees ? event.attendees.length : 0
      }}</span>
    </h2>
    <ul class="list-group">
      <li
        v-for="(attendee, index) in event.attendees"
        :key="index"
        class="list-item"
      >
        <b>{{ attendee.name }}</b>
      </li>
    </ul>
  </div>
</template>

<script>
// import { mapState /* , mapActions  */ } from "vuex";
// import NProgress from "nprogress";
// import store from "@/store";

export default {
  name: "EventShow",
  props: {
    id: {
      type: [String, Number],
      required: true,
    },
    event: {
      type: Object,
      required: true,
    },
  },

  // add progress bar  and fetch with store becouse here isn't 'this'
  // beforeRouteEnter(routeTo, routeFrom, next) {
  //   NProgress.start();
  //   store.dispatch("events/fetchEvent", routeTo.params.id).then(() => {
  //     NProgress.done();
  //     next();
  //   });
  // },

  // created() {
  //   this.fetchEvent(this.id);
  // },

  // computed: {
  //   ...mapState({
  //     event: (state) => state.events.event,
  //   }),
  // },

  // methods: mapActions("events", ["fetchEvent"]),
};
</script>

<style lang="scss" scoped>
.location {
  margin-bottom: 0;
}
.location > .icon {
  margin-left: 10px;
}
.event-header > .title {
  margin: 0;
}
.list-group {
  margin: 0;
  padding: 0;
  list-style: none;
}
.list-group > .list-item {
  padding: 1em 0;
  border-bottom: solid 1px #e5e5e5;
}
</style>
