<template>
  <main class="container text-black">
    <div class="pt-4 mb-8 relative">
      <input
        type="text"
        v-model="searchQuery"
        @input="getSearchResults"
        placeholder="Search for a city"
        class="py-2 px-1 w-full bg-transparent border-b focus:border-w-secondary focus:outline-none focus:shadow-[0px_1px_0_0_#b5c6e0]"
      />
      <ul
        class="absolute bg-w-secondary text-black w-full shadow-md py-2 px-1 top-[66px]"
        v-if="owSearchResults"
      >
        <li
          v-for="searchResult in owSearchResults"
          :key="searchResult.id"
          class="py-2 cursor-pointer"
        >
          {{
            searchResult.name +
            ", " +
            searchResult.state +
            ", " +
            searchResult.country
          }}
        </li>
      </ul>
    </div>
  </main>
</template>

<script setup>
import { ref } from "vue";
import axios from "axios";
import API_KEY from "../assets/apikey.js";

const searchQuery = ref("");
const queryTimeout = ref(null);
const owSearchResults = ref(null);

const getSearchResults = () => {
  clearTimeout(queryTimeout.value);
  queryTimeout.value = setTimeout(async () => {
    if (searchQuery.value !== "") {
      const result = await axios.get(
        `http://api.openweathermap.org/geo/1.0/direct?q=${searchQuery.value},&limit=5&appid=${API_KEY}`
      );
      owSearchResults.value = result.data;
      console.log(owSearchResults.value);
      return;
    }
    owSearchResults.value = null;
  }, 300);
};
</script>
