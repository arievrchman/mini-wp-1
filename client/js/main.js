let baseUrl = 'http://localhost:3000';
let token = localStorage.getItem('token');

const app = new Vue({
  el: '#app',
  data: {
    isLogin: false,
    showFormLogin: true,
    showFormRegister: false,
    homepage: true,
    createArticle: false,
    findMyArticles: false,
    articles: [],
  },
  mounted() {
    if (token) {
      axios({
        method: 'get',
        url: baseUrl + '/auth',
        headers: { token }
      })
        .then(response => {
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
    },
    goToHomePage(payload) {
      this.homepage = payload.homepage;
      this.createArticle = payload.createArticle;
    },
    createNewArticle() {
      this.createArticle = true;
      this.homepage = false;
      this.findMyArticles = false;
    },
    myArticles() {
      this.findMyArticles = true;
      this.createArticle = false;
      this.homepage = false;

      axios({
        method: 'get',
        url: baseUrl + '/articles',
        headers: { token }
      })
        .then(({ data }) => {
          console.log(data);
          this.articles = data;
        })
        .catch(err => {
          console.log(err);
        });
    },
  },
});