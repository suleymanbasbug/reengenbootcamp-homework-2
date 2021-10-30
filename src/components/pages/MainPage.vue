<template>
  <v-container class="mr-3">
    <v-row class="text-center">
      <v-col cols="auto" v-for="hotel in hotels" :key="hotel.id"
        ><v-card :loading="loading" class="mx-auto my-12" max-width="374">
          <template slot="progress">
            <v-progress-linear
              color="deep-purple"
              height="10"
              indeterminate
            ></v-progress-linear>
          </template>

          <v-img height="250" :src="hotel.imgUrl"></v-img>
          <v-card-title>{{ hotel.name }}</v-card-title>

          <v-card-text>
            <v-row align="center" class="mx-0">
              <v-rating
                :value="hotel.rating"
                color="amber"
                dense
                half-increments
                readonly
                size="14"
              ></v-rating>
            </v-row>

            <div class="my-4 text-subtitle-1">
              ₺ {{ hotel.price }} • {{ hotel.location }}
            </div>

            <div>
              {{ hotel.name }} Small plates, salads & sandwiches - an intimate
              setting with 12 indoor seats plus patio seating.
            </div>
          </v-card-text>

          <v-divider class="mx-4"></v-divider>

          <v-card-actions>
            <v-btn
              color="deep-purple lighten-2"
              text
              @click="reserve(hotel.id)"
            >
              Hotel Detail
            </v-btn>
          </v-card-actions>
        </v-card></v-col
      ></v-row
    >
  </v-container>
</template>

<script>
import axios from "axios";
export default {
  name: "MainPage",
  data: () => ({
    hotels: [],
    loading: false,
  }),
  created() {
    axios
      .get("http://localhost:3000/hotels")
      .then((res) => (this.hotels = res.data));
  },
  methods: {
    reserve(id) {
      this.loading = true;
      setTimeout(
        () => (
          (this.loading = false),
          this.$router.push({ name: "hotel", params: { id: id } })
        ),
        1500
      );
    },
  },
};
</script>

<style></style>
