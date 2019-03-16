Vue.component('signup', {
  data() {
    return {
      name: '',
      email: '',
      password: '',
    }
  },
  methods: {
    switchToLogin() {
      this.$emit('login', {
        modalLogin: false,
        modalIntro: true,
        modalRegister: false
      });
    },
    signup() {
      axios({
        method: 'post',
        url: baseUrl + '/register',
        data: {
          name: this.name,
          email: this.email,
          password: this.password
        }
      })
        .then(({ data }) => {
          console.log(data.message);
          // console.log(data.user);
          this.name = '';
          this.email = '';
          this.password = '';
        })
        .catch((err) => {
          console.log(err.response.data);
          this.name = '';
          this.email = '';
          this.password = '';
        });
    }
  },
  template: `
  <div class="modal-content">

    <button
      type="button"
      class="close align-self-end"
      data-dismiss="modal"
      aria-label="Close"
      style="padding: 15px;">
      <span aria-hidden="true" style="font-size: 29px; font-weight:400">&times;</span>
    </button>

    <div class="modal-body">

      <h5 class="text-center">Sign up</h5>
      <div class="text-center d-flex justify-content-center">
        <p class="p-3 w-50" style="margin-bottom: 0px !important">
          Create you account on Zappress to get recommendations articles, like other author articles.
        </p>
      </div>

      <div class="d-flex flex-column">
        <div class="md-form w-50 align-self-center">
          <i class="fas fa-user prefix grey-text"></i>
          <label for="name">Your name</label>
          <input v-model="name" type="text" class="form-control">
        </div>

        <div class="md-form w-50 align-self-center">
          <i class="fas fa-envelope prefix grey-text"></i>
          <label for="email">Your email</label>
          <input v-model="email" type="email" class="form-control">
        </div>
        
        <div class="md-form w-50 align-self-center">
          <i class="fas fa-lock prefix grey-text"></i>
          <label for="pass">Your password</label>
          <input v-model="password" type="password" class="form-control">
        </div>

        <button @click.prevent="signup" class="btn btn-md btn-dark elegant w-20 align-self-center rounded">
          <span style="font-weight: 500; text-transform: none;font-size: 13px;">Submit</span>
        </button>

        <p class="mx-5 p-3 align-self-center">Already have an account?
          <a @click.prevent="switchToLogin" class="blue-text">Login</a>
        </p>

      </div>

    </div>

  </div>
  `
});