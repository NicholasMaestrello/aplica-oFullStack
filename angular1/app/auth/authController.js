(function(){
  angular.module('myApp').controller('authCtrl',[
    '$location',
    'msgs',
    'auth',
    Auth
  ])
  function Auth ($location, msgs, auth){
    const vm = this
    vm.loginMode = true
    vm.user = {}
    vm.getUser = getUser
    vm.logout = logout
    vm.changeMode = changeMode
    vm.login = login
    vm.signup = signup
    vm.logout = logout

    function changeMode() {
      vm.loginMode = !vm.loginMode
    }

    function login(){
      auth.login(vm.user, err => err ? msgs.addError(err) : $location.path('/'))
    }

    function signup(){
      auth.signup(vm.user, err => err ? msgs.addError(err) : $location.path('/'))
    }

    function getUser(){
      return auth.getUser()
    }

    function logout(){
      auth.logout(() => $location.path('/'))
    }
  }
})()
