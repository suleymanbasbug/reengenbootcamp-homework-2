<template>
  <div>
    <v-stepper v-model="stepperIndex" v-if="loadingData">
      <v-stepper-header>
        <div v-for="i in quota" :key="i">
          <v-stepper-step :complete="stepperIndex > i" :step="i">
            Person {{ i }}
          </v-stepper-step>

          <v-divider></v-divider>
        </div>
      </v-stepper-header>
      <v-stepper-items>
        <div v-for="i in quota" :key="i">
          <v-stepper-content :step="i">
            <form>
              <v-text-field
                :counter="15"
                label="Name"
                v-model="customers[customerIndex].name"
                :error-messages="
                  nameErrors($v.customers.$each.$iter[customerIndex].name)
                "
                @input="$v.customers.$each.$iter[customerIndex].name.$touch()"
                @blur="$v.customers.$each.$iter[customerIndex].name.$touch()"
              ></v-text-field>
              <v-text-field
                v-model="customers[customerIndex].surname"
                label="Surname"
                :error-messages="
                  surnameErrors($v.customers.$each.$iter[customerIndex].surname)
                "
                :counter="15"
                required
                @input="
                  $v.customers.$each.$iter[customerIndex].surname.$touch()
                "
                @blur="$v.customers.$each.$iter[customerIndex].surname.$touch()"
              ></v-text-field>
              <v-text-field
                v-model="customers[customerIndex].email"
                :error-messages="
                  emailErrors($v.customers.$each.$iter[customerIndex].email)
                "
                label="E-mail"
                required
                @input="$v.customers.$each.$iter[customerIndex].email.$touch()"
                @blur="$v.customers.$each.$iter[customerIndex].email.$touch()"
              ></v-text-field>
              <v-text-field
                v-model="customers[customerIndex].age"
                :error-messages="
                  ageErrors($v.customers.$each.$iter[customerIndex].age)
                "
                label="Age"
                required
                numeric
                @input="$v.customers.$each.$iter[customerIndex].age.$touch()"
                @blur="$v.customers.$each.$iter[customerIndex].age.$touch()"
              ></v-text-field>
              <v-text-field
                v-model="customers[customerIndex].hescode"
                :counter="16"
                :error-messages="
                  hesCodeErrors($v.customers.$each.$iter[customerIndex].hescode)
                "
                label="Hes Code"
                required
                @input="
                  $v.customers.$each.$iter[customerIndex].hescode.$touch()
                "
                @blur="$v.customers.$each.$iter[customerIndex].hescode.$touch()"
              ></v-text-field>
              <v-text-field
                v-model="customers[customerIndex].identityNumber"
                :counter="11"
                :error-messages="
                  identityNumberErrors(
                    $v.customers.$each.$iter[customerIndex].identityNumber
                  )
                "
                label="Identity Number"
                required
                @input="
                  $v.customers.$each.$iter[
                    customerIndex
                  ].identityNumber.$touch()
                "
                @blur="
                  $v.customers.$each.$iter[
                    customerIndex
                  ].identityNumber.$touch()
                "
              ></v-text-field>
              <v-text-field
                v-model="customers[customerIndex].phone"
                :counter="10"
                :error-messages="
                  phoneErrors($v.customers.$each.$iter[customerIndex].phone)
                "
                label="Phone"
                @input="$v.customers.$each.$iter[customerIndex].phone.$touch()"
                @blur="$v.customers.$each.$iter[customerIndex].phone.$touch()"
                required
              ></v-text-field>

              <v-select
                v-model="customers[customerIndex].gender"
                :items="gender"
                dense
                solo
              />
            </form>

            <div v-if="stepperIndex === quota">
              <v-btn
                :disabled="isFormValid"
                color="primary"
                type="submit"
                @click="finished"
              >
                Finish
              </v-btn>
            </div>
            <div v-else>
              <v-btn :disabled="isFormValid" color="primary" @click="nextStep">
                Continue
              </v-btn>
            </div>
          </v-stepper-content>
        </div>
      </v-stepper-items>
    </v-stepper>
    <loading-modal
      :reservation="reservation"
      :finishReservation="finishReservation"
    />
  </div>
</template>

<script>
import axios from "axios";
import validator from "@/mixins/validator";
import LoadingModal from "@/components/shared/LoadingModal";
export default {
  name: "Reservation",
  mixins: [validator],
  components: {
    LoadingModal,
  },
  data: () => ({
    stepperIndex: 1,
    quota: 1,
    customerIndex: 0,
    hotelId: null,
    customers: [],
    gender: ["Male", "Female"],
    loadingData: false,
    reservation: {},
    finishReservation: false,
  }),
  async created() {
    this.quota = parseInt(this.$route.query.quota);
    this.hotelId = this.$route.query.id;
    this.loadingData = false;
    await this.loadData();
    this.loadingData = true;
  },
  computed: {
    isFormValid() {
      if (this.$v.customers.$each.$iter[this.customerIndex].$invalid) {
        return true;
      }
      return false;
    },
  },
  methods: {
    loadData() {
      return axios
        .get(
          `http://localhost:3000/reservations?id=${this.$route.query.reservationId}`
        )
        .then((res) => {
          this.reservation = res.data[0];
          this.customers = res.data[0].customer;
        });
    },
    async nextStep() {
      if (this.$v.customers.$each.$iter[this.customerIndex])
        this.reservation.customer[this.customerIndex] = this.customers[
          this.customerIndex
        ];
      await axios
        .put(
          `http://localhost:3000/reservations/${this.$route.query.reservationId}`,
          this.reservation
        )
        .then((res) => console.log(res));
      if (this.quota !== this.stepperIndex) {
        this.stepperIndex++;
        this.customerIndex++;
      }
    },
    finished() {
      this.nextStep();
      this.finishReservation = true;
    },
  },
};
</script>

<style></style>
