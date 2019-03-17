Vue.component('article-filtered', {
  props: ['findByTag', 'tag'],
  methods: {
    formatDate(date) {
      var monthNames = [
        "January", "February", "March",
        "April", "May", "June", "July",
        "August", "September", "October",
        "November", "December"
      ];

      var day = date.getDate();
      var monthIndex = date.getMonth();
      var year = date.getFullYear();

      return day + ' ' + monthNames[monthIndex] + ' ' + year;
    },
    strippedContent(val) {
      let regex = /(<([^>]+)>)|&nbsp;|&quot;/ig;
      return val.replace(regex, "");
    },
    toReadArticle(article) {
      this.$emit('read-article', article);
    }
  },
  template: `
  <div class="container">
    <div class="my-5" style="width: 700px;">
      <h6>Article Tagged In</h6>
      <h1 class="mb-5 font-weight-bold title-page">{{ tag }}</h1>

      <div
        class="row"
        v-for="(article, index) in findByTag" :key="index"
        >
        <div class="col-lg-5">
          <div class="view overlay rounded z-depth-2 mb-lg-0 mb-4">
          <img class="img-fluid" :src="article.featured_image" alt="Article image">
          <a>
            <div class="mask rgba-white-slight"></div>
          </a>
          </div>
        </div>

        <div class="col-lg-7">
          <h3 class="font-weight-bold mb-3"><strong>{{ article.title }}</strong></h3>
          <p>{{ strippedContent(article.content) | truncate(100) }}</p>
          <p>by <a><strong>{{ article.author.name }}</strong></a>, {{ formatDate(new Date(article.created_at)) }}</p>
          <div class="d-flex justify-content-end align-items-center">
            <a @click.prevent="toReadArticle(article)" class="btn-floating btn-sm btn-outline-grey btn-md"><i class="fas fa-book-open"></i> Read</a>
          </div>
          <hr>
        </div>
        
      </div>
    </div>
  </div>
  `
});