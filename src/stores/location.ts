// https://pinia.esm.dev/introduction.html
import { defineStore } from "pinia";

export const useLocationStore = defineStore("location", {
  state: () => {
    return { lat: 0, lng: 0 };
  },
  actions: {},
});
