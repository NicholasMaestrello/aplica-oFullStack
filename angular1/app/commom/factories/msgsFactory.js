(function(){
  angular.module('myApp').factory('msgs',[
    'toastr',
    msgFactory
  ])
  function msgFactory(toastr){
    function addMsg(msgs, title, method){
      if(msgs instanceof Array){
        msgs.forEach(msgs => toastr[method](msgs, title))
      } else {
        toastr[method](msgs, title)
      }
    }

    function addSucess(msgs){
      addMsg(msgs, 'Sucesso', 'success')
    }

    function addError(msgs){
      addMsg(msgs, 'Erro', 'error')
    }

    return {addSucess , addError}
  }
})()
