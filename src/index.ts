#!/usr/bin/env node

import chalk from 'chalk'
import {program} from 'commander'
import fs from 'fs'
import path from 'path'

program
    .command('create <name>')
    .description('create a new project in the current working directory')
    .action((name) => {
        const target = path.resolve(process.cwd(), name)
        if (fs.existsSync(target)) {
            console.log(chalk.red(`该目录下已存在${name}项目，请选择其他项目名称`))
            return
        }
        console.log(chalk.yellowBright(`即将为您创建新项目，项目名称：${name}\n`))
        fs.mkdirSync(target)
        require('./lib/creator').create(target)
    }) 

program.parse(process.argv)