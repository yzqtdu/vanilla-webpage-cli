import chalk from 'chalk'          
import {pkgManager, readFromTerminal, runCommand, loadModules, runCommandAsync, writeTemplates} from './utils'
import {pkgCommands, defaultPreset, tsPreset} from '../configs/operations'
import {getTemplates} from '../configs/templates'
import path from 'path'
import fs from 'fs'


async function create(context: string) {
    const pkg = pkgManager()
    if (!pkg) {
        console.log(chalk.redBright("请先安装npm包管理器，暂只支持npm安装"))
        return
    }
    const commands = pkgCommands[pkg]
    const rl = readFromTerminal({
        line: line => {}
    })
    const res = await rl.question(chalk.greenBright("是否安装typescript？(Y/N)"))
        .catch(err => {
            console.log(chalk.red("创建失败，即将退出"))
            process.exit(1)
        })
    const needTs = res.toLocaleUpperCase() === 'Y'
    
    const devPresets = needTs ? defaultPreset.devDeps.concat(tsPreset) : defaultPreset.devDeps
    // 执行npm 初始化操作
    const pkgInit = runCommand(commands['init']['command'], commands['init']['args'], {
        cwd: context
    })
    // 获取package.json文件
    const pack = JSON.parse(fs.readFileSync(path.join(context, 'package.json')).toString())
    // 重新配置package.json文件的依赖字段
    pack.devDependencies = pack.devDependencies || {}
    pack.dependencies = pack.dependencies || {}
    pack.scripts = pack.scripts || {}
    loadModules(devPresets, pack.devDependencies)
    loadModules(defaultPreset.deps, pack.dependencies)
    loadModules(defaultPreset.scripts, pack.scripts)
    // 安装依赖
    console.log(chalk.blue("📦正在安装依赖....."))
    fs.writeFileSync(path.join(context, 'package.json'), JSON.stringify(pack))
    const moduleInstall = runCommandAsync(commands['install']['command'], commands['install']['args'], {
        cwd: context,
        stdio: 'inherit'
    }).then(res => 
        {console.log(chalk.yellowBright("依赖安装完成"))},
        err => {console.log(chalk.redBright("依赖安装失败"))}
      )
    console.log(chalk.blue("📦正在安装模板....."))
    const templateInstall = writeTemplates(getTemplates(needTs), context)
        .then(res => 
                {console.log(chalk.yellowBright("模板安装完成"))},
            err => 
                {console.log(chalk.redBright("模板安装失败"))}
        )
    await Promise.all([moduleInstall, templateInstall])
        .then(res => {
            console.log(chalk.yellowBright("🎉项目创建完成"))
        }).catch(err => {
            console.log(chalk.redBright("项目创建失败"))
        })
    process.exit(1)
}

export {
    create
}