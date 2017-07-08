(function(){
  angular.module('myApp').component('field',{
    bindings:{
      id: '@',
      label:'@',
      grid: '@',
      placeholder:'@',
      type: '@',
      model: '=',
      readonly: '<'
    },
    controller: [
      'gridSystem',
      function(gridSystem){
        const self = this
        this.$onInit = function(){
          self.gridClasses = gridSystem.toCssClasses(self.grid)
        }
      }
    ],
    template: `
    <div class="{{$ctrl.gridClasses}}">
      <div class="form-group">
        <label for="{{$ctrl.id}}">{{$ctrl.label}}</label>
        <input id="{{$ctrl.id}}" placeholder="{{$ctrl.placeholder}}" type="{{$ctrl.type}}" class="form-control" ng-model="$ctrl.model" ng-readonly="$ctrl.readonly" />
      </div>
    </div>
    `
  })
})()
