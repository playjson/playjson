#!/usr/bin/env node
import { Jsonnet } from '@hanazuki/node-jsonnet';
import chalk from 'chalk';
import { Command } from 'commander';
import { promises as fs } from 'fs';
import { parse as parseJSONC } from 'jsonc-parser';
import path from 'path';
const program = new Command();
program
    .name('playjson')
    .description('json / jsonc / jsonnet 파일을 JSON으로 컴파일하는 CLI')
    .version('1.0.0');
program
    .argument('<file>', '입력 파일 경로')
    .description('입력 파일을 정규 JSON으로 출력')
    .option('-o, --out <file>', '출력 파일 경로(기본: stdout)')
    .option('--minify', '출력을 압축(minify) 형태로')
    .option('-S, --ext-str <k=v...>', '외부 변수(문자열로 설정)', collect, [])
    .action(async (file, opts) => {
    try {
        const abs = path.resolve(file);
        const ext = path.extname(abs).toLowerCase();
        let obj;
        if (ext === '.json') {
            const raw = await fs.readFile(abs, 'utf8');
            obj = JSON.parse(raw);
        }
        else if (ext === '.jsonc') {
            const raw = await fs.readFile(abs, 'utf8');
            obj = parseJSONC(raw);
        }
        else if (ext === '.jsonnet' || ext === '.libsonnet') {
            const jsonnet = new Jsonnet();
            // --ext-code key=EXPR
            const extCodes = (opts.extCode ?? []).map(parseKV);
            for (const { key, value } of extCodes) {
                jsonnet.extCode(key, value);
            }
            // --ext-str key=value  (문자열을 안전하게 전달하기 위해 JSON.stringify)
            const extStrs = (opts.extStr ?? []).map(parseKV);
            for (const { key, value } of extStrs) {
                jsonnet.extCode(key, JSON.stringify(value));
            }
            // evaluateFile이 있으면 우선 사용 (import 경로 해석에 유리)
            let jsonText;
            const anyJsonnet = jsonnet;
            if (typeof anyJsonnet.evaluateFile === 'function') {
                jsonText = await anyJsonnet.evaluateFile(abs);
            }
            else {
                // 폴백: 파일 내용을 snippet으로 평가
                const raw = await fs.readFile(abs, 'utf8');
                jsonText = await jsonnet.evaluateSnippet(raw);
            }
            obj = JSON.parse(jsonText);
        }
        else {
            const msg = `지원하지 않는 확장자입니다: ${ext}\n지원: .json, .jsonc, .jsonnet, .libsonnet`;
            console.error(chalk.red(msg));
            process.exitCode = 2;
            return;
        }
        const space = opts.minify ? 0 : 2;
        const output = JSON.stringify(obj, null, space);
        if (opts.out) {
            await fs.writeFile(path.resolve(opts.out), output, 'utf8');
            console.log(chalk.green(`✅ 출력 저장: ${opts.out}`));
        }
        else {
            console.log(output);
        }
    }
    catch (err) {
        console.error(chalk.red('컴파일 실패:'), err?.message ?? err);
        process.exitCode = 1;
    }
});
program.parse();
function collect(value, previous) {
    previous.push(value);
    return previous;
}
function parseKV(s) {
    const i = s.indexOf('=');
    if (i < 0)
        throw new Error(`잘못된 형식: '${s}' (key=value 형태 필요)`);
    const key = s.slice(0, i).trim();
    const value = s.slice(i + 1);
    if (!key)
        throw new Error(`잘못된 키: '${s}'`);
    return { key, value };
}
//# sourceMappingURL=index.js.map