Vue.component('intro', {
  methods: {
    login() {
      this.$emit('login', {
        modalLogin: true,
        modalIntro: false,
        modalRegister: false
      });
    },
    register() {
      this.$emit('register', {
        modalLogin: false,
        modalIntro: false,
        modalRegister: true
      });
    }
  },
  template: `
  <div class="modal-content"
    style="background-image: url('/src/tmp.jpg'); background-repeat: no-repeat; background-size: cover; background-position: center center; width: 100%">

    <button
      type="button"
      class="close align-self-end"
      data-dismiss="modal"
      aria-label="Close"
      style="padding: 15px;">
      <span aria-hidden="true" style="font-size: 29px; font-weight: 400">&times;</span>
    </button>

    <div class="modal-body text-center d-flex flex-column">
      <h5>Join Zappress.</h5>
      
      <div style="width: 60%" class="text-center align-self-center">
        <p class="mx-5">
          Sign in to get personalized story recommendations, follow authors and topics you love, and interact with them.
        </p>
      </div>

      <div class="align-self-center">
        <button @click.prevent="login" class="btn btn-lg btn-white">
          <i class="fas fa-envelope prefix grey-text mr-3"></i>
          <span class="text-muted" style="text-transform: none; font-weight: 500;">Sign in with Email</span>
        </button>
      </div>

      <p>or</p>

      <div id="googleSignIn" class="align-self-center"></div>

      <p class="mx-5 p-3">Not a member?
        <a @click.prevent="register" class="blue-text">Sign Up
        </a>
      </p>
      
    </div>
  </div>
  `
});