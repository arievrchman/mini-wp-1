Vue.component('get-started', {
  data() {
    return {
      showIntro: true,
      showLogin: false,
      showRegister: false
    }
  },
  methods: {
    switchToLogin(payload) {
      // console.log(payload);
      this.showIntro = payload.modalIntro;
      this.showLogin = payload.modalLogin;
      this.showRegister = payload.modalRegister;
    },
    switchToIntro(payload) {
      // console.log(payload);
      this.showIntro = payload.modalIntro;
      this.showLogin = payload.modalLogin;
      this.showRegister = payload.modalRegister;
    },
    switchToRegister(payload) {
      // console.log(payload);
      this.showIntro = payload.modalIntro;
      this.showLogin = payload.modalLogin;
      this.showRegister = payload.modalRegister;
    },
    submitLogin(payload) {
      this.$emit('submit-login', payload);
    }
  },
  template: `
  <div class="modal fade" id="getStarted" tabindex="-1" role="dialog" aria-labelledby="myLabel" aria-hidden="true">
    <div class="modal-dialog modal-lg" role="document">

      <intro
        v-show="showIntro"
        @login="switchToLogin"
        @register="switchToRegister">
      </intro>

      <login
        v-show="showLogin"
        @backIntro="switchToIntro"
        @submit-login="submitLogin"
        >
      </login>

      <signup
        v-show="showRegister"
        @login="switchToLogin"
        >
      </signup>

    </div>
  </div>
  `
});