function randomArray(len, maxValue) {
    console.log(arguments)
    len = parseInt(Math.random() * len) + 1
    let nums = []
    for (let i = 0; i < len; i++) {
        let ran = parseInt((Math.random() - 1 / 2) * 2 * maxValue)
        nums[i] = ran
    }
    console.log('生成数组:')
    console.log(nums)
    return nums
}


function recondTime(fn, nums, type) {
    nums = Array.from(nums)
    let now = Date.now()
    console.log(fn(nums))
    let newTime = Date.now()
    let finalTime = newTime - now
    console.log(`${fn.name}\t时间:${finalTime}ms`)
}

function bubbleSort(nums) {
    for (let i = nums.length - 1; i > 0; i--) {
        for (let j = 0; j < i; j++) {
            if (nums[j] > nums[j + 1]) {
                let temp = nums[j + 1]
                nums[j + 1] = nums[j]
                nums[j] = temp
            }
        }
    }
    return nums
}

function selectionSort(nums) {
    for (let i = 0; i < nums.length - 1; i++) {
        let minIndex = i
        for (let j = i; j < nums.length; j++) {
            if (nums[i] < nums[minIndex]) {
                minIndex = i
            }
        }
        if (minIndex !== i) {
            let temp = nums[minIndex]
            nums[minIndex] = nums[i]
            nums[i] = temp
        }

    }
    return nums
}

/**
 * 在数字很小， 数字很多情况下很有用，排序很快
 */
function countingSort(nums) {
    let hash = []
    nums.forEach((value, index) => {
        hash[value] = hash[value] ? hash[value]++ : 1
    });
    let newNums = []
    hash.forEach((value, index) => {
        for (let i = 0; i < value; i++) {
            newNums.push(index)
        }
    })
    return newNums
}

/**
 * 可以原地排序以降低空间复杂度
 * */

function quickSort(nums) {
    if (nums.length < 2) {
        return nums
    }
    let middleIndex = Math.floor(nums.length / 2)
    let middleVal = nums[middleIndex]
    let left = []
    let right = []

    nums.forEach((value, index) => {
        if (value < middleVal) {
            left.push(value)
        } else if (value > middleVal) {
            right.push(value)
        } else if (index !== middleIndex) {
            left.push(value)
        }
    })
    return [...quickSort(left), middleVal, ...quickSort(right)]
}

/**
 * 对于数组已经几乎排好序的情况下性能很好 
 */
function insertionSort(nums) {
    for (let i = 1; i < nums.length; i++) {
        if (nums[i]<nums[i-1]){
            let temp=nums[i],last =0,next=i-1
            let middleIndex = Math.floor((last+next)/2)
            if (nums[0] >temp ){
                middleIndex = -1
            }else{
                while (!(nums[middleIndex] <= temp && nums[middleIndex+1]>=temp)){
                    let val = nums[middleIndex]
                    if (val > temp){
                        next = middleIndex-1
                    }else{
                        last = middleIndex+1
                    }
                    middleIndex = Math.floor((last+next)/2)
                }
            }
            nums.splice(i,1)
            nums.splice(middleIndex +1,0,temp)
        }
    }
    return nums
}

function mergeSort(nums) {
    function sort(array, first, last) {
        if (last - first < 1) {
            return
        }

        let middle = Math.floor((first + last) / 2)
        sort(array, first, middle)
        sort(array, middle + 1, last)

        let f = first, m = middle, temp
        while (f <= m && m + 1 <= last) {
            if (array[f] > array[m + 1]) {
                temp = array[m + 1]
                for (let i = m; i >= f; i--) {
                    array[i + 1] = array[i]
                }
                array[f] = temp
                m++
            } else {
                f++
            }
        }
        return array
    }

    return sort(nums, 0, nums.length - 1)
}



let nums = randomArray(100, 1000000)
recondTime(quickSort, nums)
recondTime(mergeSort, nums)
recondTime(insertionSort, nums)
recondTime(selectionSort, nums)
recondTime(bubbleSort, nums)
// recondTime(countingSort, nums)
