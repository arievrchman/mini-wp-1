Vue.component('form-login', {
  props: ['showLogin'],
  data() {
    return {
      email: '',
      password: '',
    }
  },
  methods: {
    toogleRegister() {
      this.$emit('register', {
        login: false,
        register: true
      });
    },
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
          this.email = '';
          this.password = '';
          localStorage.setItem('token', data.token);
          this.$emit('success-login', true);
        })
        .catch(err => {
          console.log(err);
        })
    }
  },
  template: `
  <div id="login-form">

    <form class="text-center border border-light p-5">
      <p class="h4 mb-4">Sign in</p>
      <input v-model="email" type="email" id="defaultLoginFormEmail" class="form-control mb-4" placeholder="E-mail">
      <input v-model="password" type="password" id="defaultLoginFormPassword" class="form-control mb-4" placeholder="Password">
      <button @click.prevent="login" class="btn btn-info btn-block my-4" type="submit">Sign in</button>
      
      <p>Not a member?
        <a href="" @click.prevent="toogleRegister">Register here</a>
      </p>
      <!-- Social login -->
      <p>or sign in with:</p>
    </form>
    
  </div>
  `,
});