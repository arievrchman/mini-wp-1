Vue.component('login', {
  data() {
    return {
      email: '',
      password: '',
    }
  },
  methods: {
    login() {
      axios({
        method: 'post',
        url: baseUrl + '/login',
        data: {
          email: this.email,
          password: this.password
        }
      })
        .then(({ data }) => {
          // console.log(data.message);
          $('#getStarted').modal('toggle');
          localStorage.setItem('token', data.token);
          this.email = '';
          this.password = '';
          this.$emit('submit-login', true);
        })
        .catch(err => {
          console.log(err.response.data.message);
        })
    },
    backIntro() {
      this.$emit('backIntro', {
        modalIntro: true,
        modalLogin: false,
        modalRegister: false
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
      <span aria-hidden="true" style="font-size: 29px; font-weight: 400">&times;</span>
    </button>

    <div class="modal-body">
      <h5 class="text-center">Sign in with email</h5>
      <div class="text-center d-flex justify-content-center">
        <p class="p-3 w-50" style="margin-bottom: 0px !important">
          Enter the email address and password to associated with your account.
        </p>
      </div>

      <div class="d-flex flex-column">
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

        <button @click.prevent="login" class="btn btn-md btn-dark elegant w-20 align-self-center rounded">
          <span style="font-weight: 500; text-transform: none;font-size: 13px;">Submit</span>
        </button>
        <a @click.prevent="backIntro" class="mt-2 blue-text">←back</a>
      </div>
      
    </div>

  </div>
  `
});