Vue.component('my-article', {
  props: ['articles'],
  template: `
  <div class="col-md-6 p-5">
    <div class="card card-cascade">

      <!-- Card image -->
      <div class="view view-cascade overlay">
        <img class="card-img-top" src="https://mdbootstrap.com/img/Photos/Others/men.jpg" alt="Card image cap">
        <a>
          <div class="mask rgba-white-slight"></div>
        </a>
      </div>

      <!-- Card content -->
      <div class="card-body card-body-cascade text-center">

        <!-- Title -->
        <h4 class="card-title">Hello<strong></strong></h4>
        <!-- Subtitle -->
        <h6 class="font-weight-bold indigo-text py-2">Web developer</h6>
        <!-- Text -->
        <p class="card-text">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatibus, ex,
          recusandae. Facere modi sunt, quod quibusdam.
        </p>
      </div>

    </div>
  </div>
  `
});