Vue.component('my-article', {
  data() {
    return {
      articles: [],
    }
  },
  props: ['myArticles'],
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
    toReadArticle(article) {
      this.$emit('current-article', article);
    },
    deleteArticle(article) {
      axios({
        method: 'delete',
        url: baseUrl + '/articles/' + article._id,
        headers: { token: localStorage.getItem('token') }
      })
        .then(({ data }) => {
          console.log(data);
          this.$emit('delete-article', {});
        })
        .catch((err) => {
          console.log(err.response);
        });
    },
    editArticle(article) {
      axios({
        method: 'get',
        url: baseUrl + '/articles/' + article._id,
        headers: { token: localStorage.getItem('token') }
      })
        .then(({ data }) => {
          // console.log(data);
          this.$emit('edit-article', data);
        })
        .catch((err) => {
          console.log(err.response);
        });
    }
  },
  computed: {
    computedArticle() {
      return this.articles;
    }
  },
  watch: {
    myArticles(val) {
      this.articles = val;
    }
  },
  template: `
  <div class="container">
    <div class="my-5" style="width: 700px;">
      <h1 class="mb-5 font-weight-bold title-page">My Articles</h1>

      <div
        class="row"
        v-for="(article, index) in articles" :key="index">
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
          
          <p>{{ article.content | truncate(100) }}</p>
          
          <p>by <a><strong>{{ article.author.name }}</strong></a>, {{ formatDate(new Date(article.created_at)) }}</p>

          <div class="d-flex justify-content-around align-items-center">
            <a @click.prevent="toReadArticle(article)" class="btn-floating btn-sm btn-outline-grey btn-md"><i class="fas fa-book-open"></i> Read</a>
            <a @click.prevent="editArticle(article)" class="btn-floating btn-sm btn-outline-grey"><i class="fas fa-edit"></i> Edit</a>
            <a @click.prevent="deleteArticle(article)" class="btn-floating btn-sm btn-outline-grey"><i class="fas fa-trash"></i> Delete</a>
          </div>
          <hr>
        </div>
      </div>

    </div>
  </div>
  `
});