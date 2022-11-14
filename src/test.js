function a(){
    var b=3
    function test(){
        console.log(this)
    }
    test.bind(b)
}
a()

const modulex = {
    x: 42,
    getX: function() {
      return this.x;
    }
  };
var getX = function() {return this.x}
console.log(getX())


getX = getX.bind(modulex)
console.log(getX())


 