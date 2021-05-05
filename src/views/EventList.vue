

/* eslint-disable */
<template>
  <div class="div">
    <h1>Event for {{ user.user.name }}</h1>
    <event-card v-for="event in events.events" :key="event.id" :event="event" />
    <template v-if="page != 1">
      <router-link
        :to="{ name: 'event-list', query: { page: page - 1 } }"
        rel="prev"
        >Prev Page
      </router-link>
    </template>
    <template v-if="page != 1 && !isLastPage"> | </template>
    <router-link
      v-if="!isLastPage"
      :to="{ name: 'event-list', query: { page: page + 1 } }"
      rel="next"
      >Next Page</router-link
    >
  </div>
</template>   

<script>
import EventCard from "../components/EventCard";
import { mapState } from "vuex";
import store from "@/store";

function getPageEvents(routeTo, next) {
  const currentPage = parseInt(routeTo.query.page) || 1;
  store
    .dispatch("events/fetchEvents", {
      page: currentPage,
    })
    .then(() => {
      routeTo.params.page = currentPage;
      next();
    });
}

export default {
  name: "EventList",
  components: {
    EventCard,
  },
  props: {
    page: {
      type: Number,
      required: true,
    },
  },
  beforeRouteEnter(routeTo, routeFrom, next) {
    getPageEvents(routeTo, next);
  },
  beforeRouteUpdate(routeTo, routeFrom, next) {
    getPageEvents(routeTo, next);
  },
  // created() {
  //   this.$store.dispatch("events/fetchEvents", {
  //     perPage: 3,
  //     page: this.page,
  //   });
  // },
  computed: {
    ...mapState(["events", "user"]),
    // page() {
    //   return parseInt(this.$route.query.page) || 1;
    // },
    isLastPage() {
      return this.events.numberOfEvents < this.page * this.events.perPage;
    },
  },
};
</script>

<style lang="scss" scoped>
</style>
