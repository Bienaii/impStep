function fibonacci(n) {
    if (n <= 0) {
        return 0;
    } else if (n <= 2) {
        return 1
    } else return fibonacci(n - 1) + fibonacci(n - 2)
}

function notLessThan(k) {
    for (var i = 1; i < Number.MAX_VALUE; i++) {
        var temp = fibonacci(i);
        if (k <= temp) break;
    }
    return temp;
}

console.log("小于k的最小的fibonacci数为：" + notLessThan(5));
