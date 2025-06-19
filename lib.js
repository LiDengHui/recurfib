"use strict";

export function recurFib(n, memo = {}) {
    // 基础情况：n 为 0 或 1 时直接返回
    if (n < 2) return n;

    // 检查结果是否已缓存
    if (memo[n] !== undefined) {
        return memo[n];
    }
    // 递归计算并缓存结果
    memo[n] = recurFib(n - 1, memo) + recurFib(n - 2, memo);
    return memo[n];
}


export function recurFib2(n, a = 0, b = 1) {
    if (n === 0) return a;

    return recurFib2(n - 1, b, a + b)
}


export function iterFib(n) {
    if (n < 1) return 0;
    let a = 0;
    let b = 1;

    for (let i = 1; i < n; i++) {
        const next = a + b;
        a = b;
        b = next;
    }
    return b;
}


console.time("iterFib")
console.log(iterFib(1500))
console.timeEnd("iterFib")

console.time("recurFib")
console.log(recurFib(1500))
console.timeEnd("recurFib")
console.time("recurFib2")
console.log(recurFib2(1500))
console.timeEnd("recurFib2")
