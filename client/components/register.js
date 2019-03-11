Vue.component('form-register', {
  data() {
    return {
      first_name: '',
      last_name: '',
      email: '',
      password: ''
    }
  },
  methods: {
    toogleLogin() {
      this.$emit('login', {
        login: true,
        register: false
      });
    },
    signUp() {
      axios({
        method: 'post',
        url: baseUrl + '/register',
        data: {
          first_name: this.first_name,
          last_name: this.last_name,
          email: this.email,
          password: this.password
        }
      })
        .then(({ data }) => {
          console.log(data.message);
          this.first_name = '';
          this.last_name = '';
          this.email = '';
          this.password = '';
        })
        .catch(err => {
          console.log(err);
        });
    }
  },
  template: `
  <div id="register-form">

    <form class="text-center border border-light p-5">
      <p class="h4 mb-4">Sign up</p>
      <div class="form-row mb-4">
        <div class="col">
          <input v-model="first_name" type="text" id="defaultRegisterFormFirstName" class="form-control" placeholder="First name">
        </div>
        <div class="col">
          <input v-model="last_name" type="text" id="defaultRegisterFormLastName" class="form-control" placeholder="Last name">
        </div>
      </div>
      <input v-model="email" type="email" id="defaultRegisterFormEmail" class="form-control mb-4" placeholder="E-mail">
      <input v-model="password" type="password" id="defaultRegisterFormPassword" class="form-control" placeholder="Password"
        aria-describedby="defaultRegisterFormPasswordHelpBlock">
        
      <button @click.prevent="signUp" class="btn btn-info my-4 btn-block" type="submit">Sign Up</button>
      <a href="" @click.prevent="toogleLogin">Back to login</a>
    </form>

  </div>
  `
});