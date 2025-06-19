import Benchmark from 'benchmark';
import * as fs from "node:fs";

import {iterFib ,recurFib, recurFib2} from "./lib.js"

const result = {
    iterFib: [],
    recurFib: [],
    recurFib2: []
};
for (let i = 2; i < 30; i++) {
    const {promise, resolve} = Promise.withResolvers();
    const suite = new Benchmark.Suite(`fibonacci ${i}`);
    suite
        .add('iterFib', () => {
            iterFib(i)
        })
        .add('recurFib', () => {
            return recurFib(i);
        })
        .add('recurFib2', () => {
            return recurFib2(i);
        }).on('cycle', function (event) {
        console.log(String(event.target), i)
        result[event.target.name].push({
            index: i,
            hz: event.target.hz.toFixed(2),
            rme: event.target.stats.rme.toFixed(2),
            sample: event.target.stats.sample.length
        })
    }).on('complete', function () {
        // 所有测试完成时触发
        console.log('Fastest is ' + this.filter('fastest').map('name')); // 找出最快的
        // 更详细的比较：按速度排序
        this.sort((a, b) => b.hz - a.hz); // 按每秒操作数 (hz) 降序排序
        this.forEach(test => console.log(`${test.name}: ${test.hz.toFixed(2)} ops/sec`));
        resolve(true);
    }).run();

    await promise;
    suite.reset();
}


console.table(result);

fs.writeFile('./fibonacci_data.json', JSON.stringify(result), 'utf8', () => {
    console.log('写入成功');    // 回调函数，当写入完成时执行
});
