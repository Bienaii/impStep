function insertSort(arr){
    var tmp;
    for(var i=1;i<arr.length;i++){
        console.log("======外部第"+i+"轮======")
        tmp  = arr[i];
        for(var j=i;j>=0;j--){
            console.log("=====内部第"+(i-j+1)+"轮======")
            if(arr[j-1]>tmp){
                arr[j]=arr[j-1];
                console.log("j此时值："+j+"；arr[j]："+arr[j]+"；arr[j-1]："+arr[j-1]+"；temp："+tmp)
            }else{
                arr[j]=tmp;
                console.log("j此时值："+j+"；arr[j]："+arr[j]+"；arr[j-1]："+arr[j-1]+"；temp："+tmp)
                break;
            }
        }  
    }
    return arr
}

var arr=[6,5,3,1,8,7,2,4]
insertSort(arr);
console.log(arr)


console.log(undefined>1)