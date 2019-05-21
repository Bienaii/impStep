var color="blue"
var test={
    color: "red",
    getColor: function(){
        var color='green';
        console.log(this.color);
    }
}
var Get=test.getColor
Get();

test.getColor()