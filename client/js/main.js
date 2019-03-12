let baseUrl = 'http://localhost:3000';

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
    filter: ''
  },
  created() {
    if (localStorage.getItem('token')) {
      axios({
        method: 'get',
        url: baseUrl + '/auth',
        headers: { token: localStorage.getItem('token') }
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
        headers: { token: localStorage.getItem('token') }
      })
        .then(({ data }) => {
          // console.log(data);
          this.articles = data;
        })
        .catch(err => {
          console.log(err);
        });
    },
    testlah() {
      axios({
        method: 'get',
        url: baseUrl + '/articles/search?title=' + this.filter,
      })
      .then(response => {
        this.articles = response.data;
        // console.log(response);
      })
    }
  },
  // computed: {
  //   aarticles() {
  //     return this.articles.filter(e => {
  //       return e.title == this.filter;
  //     })
  //   }
  // },
});