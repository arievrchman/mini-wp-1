Vue.component('edit-article', {
  props: ['editTheArticle'],
  data() {
    return {
      title: '',
      tags: [],
      text: '',
      file: '',
      originalImg: ''
    }
  },
  components: {
    'input-tag': vueInputTag.default,
    'wysiwyg': vueWysiwyg.default.component,
  },
  methods: {
    handleFileUpload() {
      this.file = this.$refs.file.files[0];
    },
    editArticle(id) {

      let formData = new FormData();
      formData.append('title', this.title);
      formData.append('tags', this.tags);
      formData.append('file', this.file);
      formData.append('content', this.text);
      formData.append('originalImg', this.originalImg);

      axios({
        method: 'put',
        url: baseUrl + '/articles/' + id,
        data: formData,
        headers: {
          token: localStorage.getItem('token'),
          'Content-Type': 'multipart/form-data',
        }
      })
        .then(({ data }) => {
          this.$emit('updated', {});
          this.title = '';
          this.tags = '';
          this.file = '';
          this.text = '';
          this.originalImg = '';
          Swal.fire({
            position: 'top-end',
            type: 'success',
            title: data.message,
            showConfirmButton: false,
            timer: 1500
          });
        })
        .catch((err) => {
          console.log(err.response);
        });
    },
  },
  watch: {
    editTheArticle(val) {
      this.title = val.title;
      this.tags = val.tags;
      this.text = val.content;
      this.originalImg = val.featured_image;
    }
  },
  template: `
  <div>
    <div class="container">
      <div class="m-5" style="width: 700px;">
      
        <h1 class="mb-5 font-weight-bold title-page">Edit Article</h1>

        <form @submit.prevent="editArticle(editTheArticle.id)" class="d-flex flex-column">
          <div class="form-group row">
            <label for="title" class="col-sm-2 col-form-label">Title</label>
            <div class="col-sm-10">
              <div class="md-form mt-0">
                <input
                  type="text"
                  class="form-control"
                  placeholder="Title"
                  v-model="title">
              </div>
            </div>
          </div>

          <div class="form-group row">
            <label for="tags" class="col-sm-2 col-form-label">Tags</label>
            <div class="col-sm-10">
              <div class="md-form mt-0">
                <input-tag
                  v-model="tags">
                </input-tag>
              </div>
            </div>
          </div>

          <div class="form-group row">
            <label for="title" class="col-sm-2 col-form-label">Title</label>
            <div class="col-sm-10">
              <div class="md-form mt-0">
                <div class="input-group mb-3">
                  <div class="custom-file">
                    <input
                      type="file"
                      class="custom-file-input"
                      aria-describedby="input-file"
                      v-on:change="handleFileUpload"
                      ref="file">
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
              <button type="submit" class="btn btn-outline-grey btn-md rounded">
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