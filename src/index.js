// const list = document.querySelector("#results")

// const insertMovies = (data) => {
//   data.Search.forEach((result) => {
//     const movieTag = `<li class="list-group-item border-0">
//       <img src="${result.Poster}" alt="" width="100">
//     </li>`
//     list.insertAdjacentHTML("beforeend", movieTag)
//   })
// }

// const fetchMovies = (query) => {
//   fetch(`http://www.omdbapi.com/?s=${query}&apikey=adf1f2d7`)
//     .then(response => response.json())
//     .then(insertMovies)
// }

// fetchMovies("harry potter") // on 1st page load

// const form = document.querySelector("#search-form")
// form.addEventListener("submit", (event) => {
//   event.preventDefault()
//   list.innerHTML = ""
//   const input = document.querySelector("#search-input")
//   fetchMovies(input.value)
// })

// import { initSortable } from "./plugins/init_sortable"
import Sortable from "sortablejs"

var app = new Vue({
  el: '#app',
  data: {
    // message: 'Hello Vue!'
    moviesList: [],
    moviesListGotResponse: false,
    errorMessage: "",
    inputText: "",
    oldIndex: 0,
    newIndex: 0
  },
  methods: {
    fetchMovies: function (query) {
      fetch(`http://www.omdbapi.com/?s=${query}&apikey=adf1f2d7`)
        .then(res => res.json())
        .then((res)=> {
          this.moviesList = res.Search
          this.moviesListGotResponse = res.Response
          this.errorMessage = res.Error
        })
    },
    search: function() {
      this.fetchMovies(this.inputText)
    },
    initSortable: function() {
      let page = this;
      Sortable.create(this.$refs.results, {
          ghostClass: "ghost",
          animation: 150,
          onEnd: (event) => {
            page.oldIndex = event.oldIndex;
            page.newIndex = event.newIndex;
            // alert(`${event.oldIndex} moved to ${event.newIndex}`)
          }
      })
    }
  },
  mounted: function () {
    this.initSortable()
    this.fetchMovies("harry potter")
  }
})