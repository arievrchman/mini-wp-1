let baseUrl = 'http://localhost:3000';

const app = new Vue({
  el: '#app',
  data: {
    isLogin: false,
    currentUserLogin: {},

    modalIntro: true,
    modalLogin: false,
    modalRegister: false,

    mainContent: true,
    switchToNewArticle: false,
    switchToReadArticle: false,
    switchToMyArticle: false,
    switchToEditArticle: false,
    switchToTagArticle: false,

    tags: [],
    newArticles: [],
    currentArticle: {},
    myArticles: [],
    editCurrent: {},
    filteredByTags: [],
    currentTag: '',
  },
  created() {
    gapi.load('auth2', () => {
      gapi.auth2.init({ client_id: '316867528758-3a0b1brrhcj9o5rnbam23o722e15d2j5.apps.googleusercontent.com' })
      .then(() => {
        this.renderButton();
      });
    });
    if (localStorage.getItem('token')) {
      this.checkUser();
    }
  },
  mounted() {
    this.findTags();
    this.findNewArticles();
  },
  methods: {
    renderButton() {
      gapi.signin2.render('googleSignIn', {
        'scope': 'profile email',
        'width': 233,
        'height': 50,
        'longtitle': true,
        'onsuccess': this.onSuccess
      });
    },

    onSuccess(googleUser) {
      let token = googleUser.getAuthResponse().id_token;
      axios({
        method: 'post',
        url: baseUrl + '/oauth',
        headers: { token }
      })
        .then(({ data }) => {
          // console.log(data);
          $('#getStarted').modal('hide');
          localStorage.setItem('token', data.token);
          this.isLogin = true;
          this.checkUser();
        })
        .catch((err) => {
          console.log(err.response);
        });
    },

    onFailure(err) {
      console.log(err.response);
    },

    submitLogin(payload) {
      // console.log(payload);
      this.isLogin = payload;
      this.checkUser();
    },

    checkUser() {
      axios({
        method: 'get',
        url: baseUrl + '/auth',
        headers: { token: localStorage.getItem('token') }
      })
        .then(({ data }) => {
          // console.log(data);
          this.currentUserLogin = data;
          this.isLogin = true;
          this.findMyArticles();
        })
        .catch(err => {
          console.log(err);
        });
    },

    async signOut() {
      var auth2 = gapi.auth2.getAuthInstance();
      await auth2.signOut();
      localStorage.removeItem('token');
      this.isLogin = false;
      this.mainContent = true;
      this.switchToNewArticle = false;
      this.switchToReadArticle = false;
      this.switchToMyArticle = false;
    },

    findNewArticles() {
      axios({
        method: 'get',
        url: baseUrl + '/articles/newest'
      })
        .then(({ data }) => {
          // console.log(data);
          this.newArticles = data;
        })
        .catch((err) => {
          console.log(err);
        });
    },

    findTags() {
      axios({
        method: 'get',
        url: baseUrl + '/tags'
      })
        .then(({ data }) => {
          // console.log(data);
          this.tags = data;
        })
        .catch((err) => {
          console.log(err);
        });
    },

    findMyArticles() {
      axios({
        method: 'get',
        url: baseUrl + '/articles/user',
        headers: { token: localStorage.getItem('token') }
      })
        .then(({ data }) => {
          this.myArticles = data;
        })
        .catch((err) => {
          console.log(err.response);
        });
    },

    findArticleByTags(tag) {
      axios({
        method: 'get',
        url: baseUrl + '/tags/' + tag.tagName
      })
        .then(({ data }) => {
          console.log(data);
          this.filteredByTags = data;
        })
        .catch((err) => {
          console.log(err.response);
        });
    },

    // Show Hide Content
    createNewArticle() {
      this.mainContent = false;
      this.switchToNewArticle = true;
      this.switchToReadArticle = false;
      this.switchToMyArticle = false;
      this.switchToEditArticle = false;
      this.switchToTagArticle = false;
    },

    readArticle(article) {
      this.currentArticle = article;

      this.mainContent = false;
      this.switchToNewArticle = false
      this.switchToReadArticle = true;
      this.switchToMyArticle = false;
      this.switchToEditArticle = false;
      this.switchToTagArticle = false;
    },

    editArticle(payload) {
      this.editCurrent = payload;

      this.mainContent = false;
      this.switchToNewArticle = false;
      this.switchToReadArticle = false;
      this.switchToMyArticle = false;
      this.switchToEditArticle = true;
      this.switchToTagArticle = false;
    },

    switchToHome() {
      this.mainContent = true;
      this.switchToNewArticle = false;
      this.switchToReadArticle = false;
      this.switchToMyArticle = false;
      this.switchToEditArticle = false;
      this.switchToTagArticle = false;
    },

    switchToMyLists() {
      this.mainContent = false;
      this.switchToNewArticle = false;
      this.switchToReadArticle = false;
      this.switchToMyArticle = true;
      this.switchToEditArticle = false;
      this.switchToTagArticle = false;
    },


    switchToTags(tag) {
      this.findArticleByTags(tag);
      this.currentTag = tag.tagName;

      this.mainContent = false;
      this.switchToNewArticle = false;
      this.switchToReadArticle = false;
      this.switchToMyArticle = false;
      this.switchToEditArticle = false;
      this.switchToTagArticle = true;
    }

  },
});

function toggleGetStartedModal() {
  event.preventDefault();
  $('#getStarted').modal('show');
}