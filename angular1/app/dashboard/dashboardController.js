(function(){
  angular.module('myApp').controller('dashboardCtrl', [
    '$http',
    dashboardController
  ])

  function dashboardController($http){
    const vm = this
    vm.getSummary = function(){
      const url = 'http://localhost:9000/api/billingSummary'
      $http.get(url).then(function(res){
        const {credit = 0, debt = 0} = res.data
        vm.credit = credit
        vm.debt = debt
        vm.total = credit - debt
      })
    }
      vm.getSummary()
  }
})()
