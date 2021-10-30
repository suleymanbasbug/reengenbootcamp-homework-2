<template>
  <div class="text-center">
    <v-dialog v-model="loadingDialog" hide-overlay persistent width="300">
      <v-card color="primary" dark>
        <v-card-text>
          Please stand by. The payment screen opens.
          <v-progress-linear
            indeterminate
            color="white"
            class="mb-0"
          ></v-progress-linear>
        </v-card-text>
      </v-card>
    </v-dialog>
    <v-dialog v-model="dialog" max-width="500px">
      <v-card>
        <v-card-title v-if="finishReservation">
          <span v-if="reservation.customer[0].gender === 'Male'">{{
            `${reservation.customer[0].name} bey rezervasyonunuz alınmıştır`
          }}</span>
          <span v-else>{{
            `${reservation.customer[0].name} hanım rezervasyonunuz alınmıştır`
          }}</span>
          <v-spacer></v-spacer>
        </v-card-title>
        <v-card-text>
          Detaylar e-posta adresinize gönderilmiştir. İyi eğlenceler...
        </v-card-text>
        <v-card-actions>
          <v-btn color="primary" text @click="dialog = false">
            Close
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
export default {
  name: "LoadingModal",
  props: ["reservation", "finishReservation"],
  data() {
    return {
      loadingDialog: false,
      dialog: false,
    };
  },

  watch: {
    loadingDialog(val) {
      if (!val) return;
      setTimeout(() => {
        (this.loadingDialog = false), (this.dialog = true);
      }, 1000);
    },
    finishReservation() {
      if (this.finishReservation == true) {
        this.loadingDialog = true;
      }
    },
  },
  methods: {
    showLoading() {
      this.loadingDialog = true;
    },
  },
};
</script>
<style></style>
