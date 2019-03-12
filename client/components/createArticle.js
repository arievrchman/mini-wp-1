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
        headers: { token }
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
    <form class="border-light p-5" @submit.prevent="createArticle">
      <p class="h4 mb-4 text-center">Add Article</p>
      <label for="title">Title :</label>
      <input v-model="title" type="text" class="form-control mb-4" placeholder="Title">
      <label for="content">Content :</label>
      <wysiwyg v-model="text" />
      <div class="d-flex justify-content-center p-4">
        <button class="btn btn-md btn-info justify-content-end" type="submit">Submit</button>
      </div>
    </form>
  </div>
  `
});