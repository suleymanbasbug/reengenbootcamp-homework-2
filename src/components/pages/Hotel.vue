<template>
  <v-card :loading="loading" class="mx-auto my-12" max-width="1100">
    <template slot="progress">
      <v-progress-linear
        color="deep-purple"
        height="10"
        indeterminate
      ></v-progress-linear>
    </template>

    <v-img height="350" :src="selectedHotel.imgUrl"></v-img>

    <v-card-title>{{ selectedHotel.name }}</v-card-title>

    <v-card-text>
      <v-row align="center" class="mx-0">
        <v-rating
          :value="selectedHotel.rating"
          color="amber"
          dense
          half-increments
          readonly
          size="14"
        ></v-rating>

        <div class="black--text ms-4">
          {{ selectedHotel.rating }}
        </div>
      </v-row>

      <div class="my-4 text-subtitle-1 black--text">
        ₺ {{ selectedHotel.price }} • {{ selectedHotel.location }}
      </div>

      <div>
        {{ selectedHotel.description }}
      </div>
    </v-card-text>

    <v-divider class="mx-4"></v-divider>

    <v-card-title>Number Of Persons</v-card-title>

    <v-card-text>
      <v-select
        v-model="numberOfPerson"
        :items="maxQuota"
        menu-props="auto"
        hide-details
        prepend-icon="mdi-account"
        single-line
      ></v-select>
    </v-card-text>

    <v-card-actions>
      <v-btn color="deep-purple lighten-2" text @click="reserve">
        Reserve
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import axios from "axios";
export default {
  name: "Hotel",
  data: () => ({
    selectedHotel: {},
    numberOfPerson: 1,
    loading: false,
  }),
  created() {
    axios
      .get("http://localhost:3000/hotels")
      .then(
        (res) =>
          (this.selectedHotel = res.data.filter(
            (x) => x.id == this.$route.params.id
          )[0])
      );
  },
  computed: {
    maxQuota() {
      let maxQuota = [];
      for (let i = 1; i <= this.selectedHotel.maxQuota; i++) {
        maxQuota.push(i);
      }
      return maxQuota;
    },
  },
  methods: {
    reserve() {
      this.loading = true;
      const reservation = {
        id: new Date().valueOf(),
        hotelId: this.selectedHotel.id,
        customer: [],
      };
      reservation.customer = this.createCustomer(this.numberOfPerson);
      axios
        .post("http://localhost:3000/reservations", reservation)
        .then((res) => (this.reservationId = res.data.id));
      setTimeout(() => {
        (this.loading = false),
          this.$router.push({
            path: "/reservation",
            query: {
              quota: this.numberOfPerson,
              id: this.selectedHotel.id,
              reservationId: this.reservationId,
            },
          });
      }, 1000);
    },
    createCustomer(number) {
      let customer = [];
      for (let i = 0; i < number; i++) {
        customer.push({
          id: i,
          name: "",
          surname: "",
          email: "",
          age: "",
          hescode: "",
          identityNumber: "",
          phone: "",
          gender: "",
        });
      }
      return customer;
    },
  },
};
</script>

<style></style>
