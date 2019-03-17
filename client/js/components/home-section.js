Vue.component('home-section', {
  props: ['allArticles'],
  components: {
    mixins: [Vue2Filters.mixin]
  },
  data() {
    return {
      firstArticle: {},
      secondToForth: [],
      fifthArticle: {},
    }
  },
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
    readArticle(article) {
      this.$emit('read-article', article);
    },
    strippedContent(val) {
      let regex = /(<([^>]+)>)|&nbsp;|&quot;/ig;
      return val.replace(regex, "");
    },
  },
  watch: {
    allArticles(val) {
      this.firstArticle = val[0];
      this.secondToForth = val.slice(1, 4);
      this.fifthArticle = val[val.length - 1];
    }
  },
  template: `
  <div class="jumbotron shadow-sm" style="padding: 1px !important" v-if="allArticles[0]">
      <div class="container">
        <div class="row">

          <!-- First -->
          <div class="col-md-4">
            <div class="single-news">
              <div class="view overlay">
                <img class="card-img-top"
                  :src="firstArticle.featured_image"
                  alt="Card image cap">
                <a><div class="mask rgba-white-slight"></div></a>
              </div>
              <div class="card-body">
                <h4 class="card-title"><strong>{{ firstArticle.title }}</strong></h4>
                <hr>
                <p class="card-text" style="max-height: 100px;">{{ strippedContent(firstArticle.content) | truncate(100) }}</p>
                <a @click.prevent="readArticle(firstArticle)" href="" class="black-text d-flex justify-content-end">
                  <h6>Read more <i class="fas fa-angle-double-right"></i></h6>
                </a>
              </div>
            </div>
          </div>

          
          <div class="col-md-4">
          
            <!-- Second to Forth -->
            <div class="row" v-for="(newArt, index) in secondToForth" :key="index">
              <div class="col-lg-5 col-xl-5">
                <div class="view overlay rounded z-depth-1-half mb-lg-0 mb-4">
                  <img class="img-fluid" :src="newArt.featured_image" alt="Sample image">
                  <a>
                    <div class="mask rgba-white-slight"></div>
                  </a>
                </div>
              </div>
              <div class="col-lg-7 col-xl-7">
                <!-- Post title -->
                <a href="" @click.prevent="readArticle(newArt)" style="color: #303030">
                  <h6 class="font-weight-bold mb-3"><strong>{{ newArt.title }}</strong></h6>
                </a>
                <!-- Post data -->
                <p style="margin-bottom: 0px !important">
                  <strong>
                    {{ newArt.author.name }}
                  </strong>
                </p>
                <span style="margin-bottom: 0px !important; font-size: 13px;">
                  {{ formatDate(new Date(newArt.created_at)) }}
                </span>
                <hr>
              </div>
            </div>
          </div>

          <div class="col-md-4">
            <div class="single-news">
              <div class="view overlay">
                <img class="card-img-top"
                  :src="fifthArticle.featured_image"
                  alt="Card image cap">
                <a>
                  <div class="mask rgba-white-slight"></div>
                </a>
              </div>

              <div class="card-body">
                <h4 class="card-title"><strong>{{ fifthArticle.title }}</strong></h4>
                <hr>
                <p class="card-text">{{ strippedContent(fifthArticle.content) | truncate(100) }}</p>
                <a @click.prevent="readArticle(fifthArticle)" href="" class="black-text d-flex justify-content-end">
                  <h6>Read more <i class="fas fa-angle-double-right"></i></h6>
                </a>
              </div>
            </div>
          </div>

        </div>

      </div>
    </div>
  `
});