Vue.component('create-article', {
  components: {
    wysiwyg: vueWysiwyg.default.component,
  },
  data() {
    return {
      title: '',
      text: ''
    }
  }, methods: {
    createArticle() {
      axios({
        method: 'post',
        url: baseUrl + '/articles',
        data: {
          title: this.title,
          content: this.text
        },
        headers: { token: localStorage.getItem('token') }
      })
        .then(response => {
          console.log(response.message);
          this.title = '';
          this.text = '';
        })
        .catch(err => {
          console.log(err);
        });
    }
  },
  template: `
  <div style="width: 80%;" class="d-flex justify-content-center">
    <form class="border-light p-5 d-flex flex-column" @submit.prevent="createArticle">
      <p class="h4 mb-4 text-center">Add Article</p>
      <label for="title">Title :</label>
      <input v-model="title" type="text" class="form-control mb-4" placeholder="Title">
      <label for="content">Content :</label>
      <wysiwyg v-model="text" />
      <button class="btn btn-md btn-info align-self-center mt-4" type="submit">Submit</button>
    </form>
  </div>
  `
});