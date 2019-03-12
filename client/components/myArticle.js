Vue.component('my-article', {
  props: ['article'],
  template: `
  <div class="col-md-6 p-3">
    <div class="card card-cascade">

      <div class="view view-cascade overlay">
        <img class="card-img-top" src="https://mdbootstrap.com/img/Photos/Others/men.jpg" alt="Card image cap">
        <a>
          <div class="mask rgba-white-slight"></div>
        </a>
      </div>

      <div class="card-body card-body-cascade">
        <h4 class="card-title">{{article.title}}<strong></strong></h4>
        <h6 class="font-weight-bold indigo-text py-2">Web developer</h6>
        <p class="card-text" style="max-width: 220px; display: block; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;" v-html="article.content"></p>
      </div>

    </div>
  </div>
  `
});