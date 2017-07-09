(function(){
  angular.module('myApp').controller('billingCycleController', [
    '$http',
    '$location',
    'msgs',
    'tabs',
    billingController
  ])
    function billingController($http, $location, msgs, tabs){
      const vm = this
      const url = 'http://localhost:9000/api/billingCycles'

      vm.refresh = function() {
        const page = parseInt($location.search().page) || 1
        $http.get(`${url}?skip=${(page - 1) * 10}&limit=10`).then(function(res){
          vm.billingCycle = {credits:[{}], debts:[{}]}
          vm.billingCycles = res.data
          vm.calculateValues()
          $http.get(`${url}/count`).then(function(res){
            vm.pages = Math.ceil(res.data.value / 10)
            tabs.show(vm, {tabList: true, tabCreate: true})
          }).catch(function(res){
            console.log(res.data.errors)
          })
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
        vm.calculateValues()
        tabs.show(vm, {tabUpdate: true})
      }

      vm.showTabDelete = function(billingCycle){
        vm.billingCycle = billingCycle
        vm.calculateValues()
        tabs.show(vm, {tabDelete: true})
      }

      vm.update = function(){
        const updateUrl = `${url}/${vm.billingCycle._id}`
        $http.put(updateUrl, vm.billingCycle).then(function(res){
          vm.refresh()
          msgs.addSucess('Operação realizada com sucesso')
        }).catch(function(res){
          msgs.addError(res.data.errors)
        })
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

      vm.addCredit = function(index){
        vm.billingCycle.credits.splice(index + 1, 0, {})
      }

      vm.cloneCredit = function(index, {name, value}){
        vm.billingCycle.credits.splice(index + 1 , 0 , {name, value})
        vm.calculateValues()
      }

      vm.deleteCredit = function(index){
        if(vm.billingCycle.credits.length > 1){
          vm.billingCycle.credits.splice(index, 1)
          vm.calculateValues()
        }
      }

      vm.addDebt = function(index){
        vm.billingCycle.debts.splice(index + 1, 0, {})
      }

      vm.cloneDebt = function(index, {name, value, status}){
        vm.billingCycle.debts.splice(index + 1, 0, {name, value, status})
        vm.calculateValues()
      }

      vm.deleteDebt = function(index){
        if(vm.billingCycle.debts.length > 1){
          vm.billingCycle.debts.splice(index, 1)
          vm.calculateValues()
        }
      }

      vm.calculateValues = function(){
        vm.credit = 0
        vm.debt = 0
        if(vm.billingCycle){
          vm.billingCycle.credits.forEach(function({value}){
            vm.credit += !value || isNaN(value) ? 0 : parseFloat(value)
          })
          vm.billingCycle.debts.forEach(function({value}){
            vm.debt += !value || isNaN(value) ? 0 : parseFloat(value)
          })
        }
        vm.total = vm.credit - vm.debt
      }

      vm.refresh()
    }
})()
