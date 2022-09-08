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
        <p class="py-2" v-if="searchError">
          Sorry, something went wrong, please try again
        </p>
        <p class="py-2" v-if="!searchError && owSearchResults.length === 0">
          No results match your query, try a different term.
        </p>
        <template v-else>
          <li
            v-for="searchResult in owSearchResults"
            :key="searchResult.id"
            class="py-2 cursor-pointer"
            @click="previewCity(searchResult)"
          >
            {{
              searchResult.name +
              ", " +
              searchResult.state +
              ", " +
              searchResult.country
            }}
          </li>
        </template>
      </ul>
    </div>
  </main>
</template>

<script setup>
import { ref } from "vue";
import axios from "axios";
import { useRouter } from "vue-router";
import API_KEY from "../assets/apikey.js";

const router = useRouter();
const previewCity = (searchResult) => {
  console.log(searchResult);
  router.push({
    name: "cityView",
    params: {
      state: searchResult.state.replaceAll(" ", ""),
      city: searchResult.name,
    },
    query: {
      lat: searchResult.lat,
      lon: searchResult.lon,
      preview: true,
    },
  });
};

const searchQuery = ref("");
const queryTimeout = ref(null);
const owSearchResults = ref(null);
const searchError = ref(null);

const getSearchResults = () => {
  clearTimeout(queryTimeout.value);
  queryTimeout.value = setTimeout(async () => {
    if (searchQuery.value !== "") {
      try {
        const result = await axios.get(
          `http://api.openweathermap.org/geo/1.0/direct?q=${searchQuery.value},&limit=5&appid=${API_KEY[0]}`
        );
        owSearchResults.value = result.data;
        console.log(owSearchResults.value);
      } catch {
        searchError.value = true;
      }
      return;
    }
    owSearchResults.value = null;
  }, 300);
};
</script>
