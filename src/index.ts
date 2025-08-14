#!/usr/bin/env node
import { Command } from "commander";
import chalk from "chalk";

const program = new Command();

program
  .name("mycli")
  .description("나만의 TypeScript CLI 예제")
  .version("1.0.0");

program
  .command("greet <name>")
  .description("이름을 받아 인사합니다")
  .option("-u, --upper", "대문자로 인사")
  .action((name: string, opts: { upper?: boolean }) => {
    let msg = `안녕하세요, ${name}님!`;
    if (opts.upper) msg = msg.toUpperCase();
    console.log(chalk.green(msg));
  });

program.parse();
