Vue.component('create-article', {
  data() {
    return {
      title: '',
      tags: [],
      text: '',
      file: '',
    }
  },
  components: {
    'input-tag': vueInputTag.default,
    'wysiwyg': vueWysiwyg.default.component,
  },
  methods: {
    handleFileUpload() {
      // console.log(this.$refs.file.files[0]);
      this.file = this.$refs.file.files[0];
    },
    addArticle() {
      let formData = new FormData();
      formData.append('title', this.title);
      // formData.append('tags', this.tags);
      // formData.append('file', this.file);
      formData.append('content', this.text);
      console.log(formData)

      axios({
        method: 'post',
        url: baseUrl + '/articles',
        data: formData,
        headers: {
          token: localStorage.getItem('token'),
          'Content-Type': 'multipart/form-data',
        }
      })
        .then(response => {
          console.log(response);
          // this.file = '';
          // this.title = '';
          // this.tags = '';
          // this.text = '';
        })
        .catch(err => {
          console.log(err);
        })
    }
  },
  template: `
  <div>
    <div class="container">
      <div class="m-5" style="width: 700px;">
        <!-- Horizontal material form -->
        <h3 class="p-3 text-center font-weight-bold">New Article</h3>

        <form @submit.prevent="addArticle" class="d-flex flex-column">
          <div class="form-group row">
            <label for="title" class="col-sm-2 col-form-label">Title</label>
            <div class="col-sm-10">
              <div class="md-form mt-0">
                <input v-model="title" type="text" class="form-control" placeholder="Title">
              </div>
            </div>
          </div>

          <div class="form-group row">
            <label for="tags" class="col-sm-2 col-form-label">Tags</label>
            <div class="col-sm-10">
              <div class="md-form mt-0">
                <input-tag v-model="tags" placeholder></input-tag>
              </div>
            </div>
          </div>

          <div class="form-group row">
            <label for="title" class="col-sm-2 col-form-label">Title</label>
            <div class="col-sm-10">
              <div class="md-form mt-0">
                <div class="input-group mb-3">
                  <div class="custom-file">
                    <input type="file" class="custom-file-input" id="input-file" aria-describedby="input-file" v-on:change="handleFileUpload" ref="file">
                    <label class="custom-file-label" for="input-file">Choose file</label>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="form-group row">
            <label for="tags" class="col-sm-2 col-form-label">Content</label>
            <div class="col-sm-10">
              <div class="md-form mt-0">
                <wysiwyg v-model="text" />
              </div>
            </div>
          </div>

          <div class="form-group row align-self-center">
            <div class="col-sm-10">
              <button type="submit" class="btn btn-outline-grey btn-md">
                <span style="color: black; text-transform: capitalize; font-size: 13px;">Submit</span>
              </button>
            </div>
          </div>
        </form>

      </div>
    </div>
  </div>
  `
});