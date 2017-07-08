(function(){
  angular.module('myApp').controller('billingCycleController', [
    '$http',
    'msgs',
    'tabs',
    billingController
  ])
    function billingController($http, msgs, tabs){
      const vm = this
      const url = 'http://localhost:9000/api/billingCycles'

      vm.refresh = function() {
        $http.get(url).then(function(res){
          vm.billingCycle = {}
          vm.billingCycles = res.data
          tabs.show(vm, {tabList: true, tabCreate: true})
        })
      }

      vm.create = function(){
        $http.post(url, vm.billingCycle).then(function(res){
          vm.refresh()
          msgs.addSucess('Operação realizada com sucesso')
        }).catch(function(res){
          msgs.addError(res.data.errors)
        })
      }

      vm.showTabUpdate = function(billingCycle){
        vm.billingCycle = billingCycle
        tabs.show(vm, {tabUpdate: true})
      }

      vm.showTabDelete = function(billingCycle){
        vm.billingCycle = billingCycle
        tabs.show(vm, {tabDelete: true})
      }

      vm.delete = function() {
        const deleteUrl = `${url}/${vm.billingCycle._id}`
        $http.delete(deleteUrl, vm.billingCycle).then(function(){
          vm.refresh()
          msgs.addSucess('operação realizada com sucesso')
        }).catch(function(res){
          vm.addError(res.data.errors)
        })
      }

      vm.refresh()
    }
})()
