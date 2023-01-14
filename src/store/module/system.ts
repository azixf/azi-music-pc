import { MusicOriginType } from "@/typings/player";
import { defineStore } from "pinia";

export type CloseMethod = "close" | "hide" | "none";

export const useSystemStore = defineStore("system", {
  state() {
    return {
      theme: "default",
      primaryColor: "#ec4141",
      closeType: "none" as CloseMethod,
      onTop: false,
      searchHistory: [] as string[],
      keyword: "",
      musicOrigin: "kuwo" as MusicOriginType,
    };
  },
  getters: {},
  actions: {
    UPDATE_SEARCHHISTORY(key: string) {
      if (!key) return;
      if (this.searchHistory.includes(key)) return;
      if (this.searchHistory.length >= 20) {
        this.searchHistory.shift();
      }
      this.searchHistory.push(key);
    },
  },
  persist: {
    paths: [
      "theme",
      "primaryColor",
      "closeType",
      "onTop",
      "searchHistory",
      "musicOrigin",
    ],
  },
});
