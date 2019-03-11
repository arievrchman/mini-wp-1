Vue.component('form-register', {

  methods: {
    toogleLogin() {
      this.$emit('login', {
        login: true,
        register: false
      })
    }
  },
  template: `
  <div id="register-form">

    <form class="text-center border border-light p-5">
      <p class="h4 mb-4">Sign up</p>
      <div class="form-row mb-4">
        <div class="col">
          <input type="text" id="defaultRegisterFormFirstName" class="form-control" placeholder="First name">
        </div>
        <div class="col">
          <input type="text" id="defaultRegisterFormLastName" class="form-control" placeholder="Last name">
        </div>
      </div>
      <input type="email" id="defaultRegisterFormEmail" class="form-control mb-4" placeholder="E-mail">
      <input type="password" id="defaultRegisterFormPassword" class="form-control" placeholder="Password"
        aria-describedby="defaultRegisterFormPasswordHelpBlock">
        
      <button class="btn btn-info my-4 btn-block" type="submit">Sign Up</button>
      <a href="" @click.prevent="toogleLogin">Back to login</a>
    </form>

  </div>
  `
});