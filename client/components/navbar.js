Vue.component('my-nav', {
  props: ['checkLogin'],
  methods: {
    signOut() {
      this.$emit('logout', false);
    }
  },
  template: `
  <nav class="navbar navbar-expand-lg navbar-dark bg-dark darken-2">

    <a class="navbar-brand font-weight-bold" href="">Zappress</a>
    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav"
      aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarNav">
      <ul class="navbar-nav mr-auto">
        <li class="nav-item">
          <a class="nav-link" href="">Dashboard</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="">Discovery</a>
        </li>
      </ul>
    </div>

    <div class="collapse navbar-collapse">
      <ul class="navbar-nav ml-auto">
        <li v-show="!checkLogin" class="nav-item">
          <a="!checkLogin" v-on:click.prevent="" class="nav-link" href="">Click here to join</a>
        </li>
        <li class="nav-item dropdown">
          <a class="nav-link dropdown-toggle" id="navUser" data-toggle="dropdown" aria-haspopup="true"
            aria-expanded="false">
            <i class="fas fa-user"></i>
          </a>
          <div class="dropdown-menu dropdown-menu-right dropdown-default" aria-labelledby="navUser">
            <a @click.prevent="signOut" class="dropdown-item" href="">Logout</a>
          </div>
        </li>
      </ul>
    </div>

  </nav>
  `
});