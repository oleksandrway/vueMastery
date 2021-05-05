<template>
  <div>
    <h1>Event create {{ user.name }}</h1>
    <form @submit.prevent="createEvent">
      <base-select
        label="Select a category"
        :options="categories"
        v-model="event.category"
        @blur="$v.event.category.$touch()"
        :class="{ error: $v.event.category.$error }"
      />

      <p
        v-if="!$v.event.category.required && $v.event.category.$error"
        class="errorMessage"
      >
        Category is requred
      </p>

      <h3>Name & describe your event</h3>
      <base-input
        label="Title"
        v-model="event.title"
        type="text"
        placeholder="Title"
        class="field"
        @blur="$v.event.title.$touch()"
        :class="{ error: $v.event.title.$error }"
      />

      <p
        v-if="!$v.event.title.required && $v.event.title.$error"
        class="errorMessage"
      >
        title is requred
      </p>

      <base-input
        label="Description"
        v-model="event.description"
        type="text"
        placeholder="Add a description"
        class="field"
        @blur="$v.event.description.$touch()"
        :class="{ error: $v.event.description.$error }"
      />

      <p
        v-if="!$v.event.description.required && $v.event.description.$error"
        class="errorMessage"
      >
        Description is requred
      </p>

      <h3>Where is your event?</h3>
      <base-input
        label="Location"
        v-model="event.location"
        type="text"
        placeholder="Add a location"
        class="field"
        @blur="$v.event.location.$touch()"
        :class="{ error: $v.event.location.$error }"
      />

      <p
        v-if="!$v.event.location.required && $v.event.location.$error"
        class="errorMessage"
      >
        Location is requred
      </p>

      <h3>When is your event?</h3>

      <div class="field">
        <label>Date</label>
        <datepicker
          v-model="event.date"
          placeholder="Select a date"
          @focusin.native="$v.event.date.$touch()"
          :input-class="{ error: $v.event.date.$error }"
        />
      </div>

      <p
        v-if="!$v.event.date.required && $v.event.date.$error"
        class="errorMessage"
      >
        date is requred
      </p>

      <base-select
        class="field"
        label="Select a time"
        :options="times"
        v-model="event.time"
        :class="{ error: $v.event.time.$error }"
        @blur="$v.event.time.$touch()"
      />
      <p
        v-if="!$v.event.time.required && $v.event.time.$error"
        class="errorMessage"
      >
        time is requred
      </p>

      <!-- <input type="submit" class="button -fill-gradient" value="Submit" /> -->
      <base-button
        type="submit"
        buttonClass="-fill-gradient"
        :disabled="$v.$anyError"
        >submit</base-button
      >
      <p v-if="$v.$anyError" class="errorMessage">
        Please fill out the required field(s)
      </p>
    </form>
  </div>
</template>

<script>
import Datepicker from "vuejs-datepicker";
import { mapState, mapGetters } from "vuex";
import NProgress from "nprogress";
import { required } from "vuelidate/lib/validators";

export default {
  name: "EventCreate",
  components: {
    Datepicker,
  },
  data() {
    const times = [];
    for (let i = 1; i <= 24; i++) {
      times.push(i + ":00");
    }
    return {
      times,
      event: this.createFreshEventObject(),
    };
  },
  validations: {
    event: {
      category: { required },
      title: { required },
      description: { required },
      location: { required },
      date: { required },
      time: { required },
    },
  },
  computed: {
    // getEvent() {
    //   return this.$store.getters.getEventById;
    // },
    ...mapGetters("events", ["getEventById"]),
    ...mapState({
      user: "user",
      categories: "categories",
    }),
  },
  methods: {
    createFreshEventObject() {
      //  why i cant just write this.user   (user in computed)
      const user = this.$store.state.user.user;
      const id = Math.floor(Math.random() * 10000000);

      return {
        id: id,
        user: user,
        category: "",
        organizer: user.name,
        title: "",
        description: "",
        location: "",
        date: "",
        time: "",
        attendees: [],
      };
    },
    createEvent() {
      this.$v.$touch();
      if (!this.$v.$invalid) {
        NProgress.start();
        this.$store
          .dispatch("events/createEvent", this.event)
          .then(() => {
            this.$router.push({
              name: "event-show",
              params: { id: this.event.id },
            });
            this.event = this.createFreshEventObject();
          })
          .catch(() => {
            NProgress.done();
          });
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.field {
  margin-bottom: 24px;
}
</style>
