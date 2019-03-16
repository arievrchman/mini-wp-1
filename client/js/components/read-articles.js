Vue.component('read-article', {
  props: ['currentArticle'],
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
  },
  template: `
  <div class="container" v-if="currentArticle.author">

      <section class="my-5">        
        <div class="row">
          <div class="col-md-12">
            <div class="card">
              <div class="view view-cascade overlay">
                <img class="card-img-top" :src="currentArticle.featured_image"
                  alt="Article image">
                <a href="#!">
                  <div class="mask rgba-white-slight"></div>
                </a>
              </div>
              
              <div class="card-body card-body-cascade text-center">
                <h2 class="font-weight-bold"><a>{{ currentArticle.title }}</a></h2>
                <p>Written by <a><strong>{{ currentArticle.author.name }}</strong></a>, {{ formatDate(new Date(currentArticle.created_at)) }}</p>

              </div>
              <!-- Card content -->

            </div>
            <!-- Card -->

            <!-- Excerpt -->
            <div class="mt-5" v-html="currentArticle.content"></div>

          </div>
          <!-- Grid column -->

        </div>
        
        <hr class="mb-5 mt-4">

      </section>
      <!-- Section: Blog v.4 -->
    </div>
  `
});