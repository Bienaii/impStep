function notLessThan(k) {
    var i = 1,
        j = 1;
    var z;
    if (k <= 1) {
        return 1;
    } else if (k <= 2) {
        return 2;
    } else {
        do {
            z = i + j;
            i = j;
            j = z;

        } while (z < k);
    }
    return z;
}
var temp = notLessThan(6);
console.log("大于k最小的Fibonacci数为" + temp)