let baseUrl = 'http://localhost:3000';
let token = localStorage.getItem('token');
var app = new Vue({
  el: '#app',
  data: {
    isLogin: false,
    showFormLogin: true,
    showFormRegister: false,
  },
  mounted() {
    if (token) {
      axios({
        method: 'get',
        url: baseUrl + '/auth',
        headers: { token }
      })
        .then(response => {
          // console.log(response);
          if (response) {
            this.isLogin = true;
          }
        })
        .catch(err => {
          console.log(err);
        })
    }
  },
  methods: {
    registerForm(payload) {
      this.showFormLogin = payload.login;
      this.showFormRegister = payload.register;
    },
    loginForm(payload) {
      this.showFormLogin = payload.login;
      this.showFormRegister = payload.register;
    },
    login(payload) {
      this.isLogin = payload;
    },
    logout(payload) {
      localStorage.removeItem('token');
      this.isLogin = payload
    }
  },
});