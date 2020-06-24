import {execSync, spawnSync, spawn} from 'child_process'
import readline, {ReadLine} from 'readline'
import {copyFile, writeFile, existsSync, mkdirSync} from 'fs'
import util from 'util'
import path from 'path'

// 使用不同的配置导致不同的
// 未配置的话 会将报错信息打印到控制台 应该是系统返回的gkb
// 配置的话 pipe -> 本进程 不打印 
// inherit -> 父进程 打印 
// webpack 并非来自进程 process.env中的值，process统一变成了{env:{}} 对象
// 被插件定义的直接全局替换了 而且并未出现在 process.env中
function pkgManager(): string {
    let r
    try {   
        r = execSync('npm -version', {stdio: 'pipe'})
    } catch (err) {
        return ''
    }
    const out = r.toString()
    return out && 'npm'
}

function runCommand(c, args?, option?) {
    try {   
        const r = spawnSync(c, args, option)
        return r
    } catch (err) {
        return ''
    }
}

function runCommandAsync(c, args?, option?) {
    return new Promise((res, rej) => {
        const p = spawn(c, args, option)
        p.on('exit', (code) => {
            res(code)
        })
        p.on('error', e => {
            rej(e)
        })
    })
}

async function writeTemplates(t, des) {
    const copy = util.promisify(copyFile)
    const write = util.promisify(writeFile)
    return Promise.all(t.map(item => {
        try {
            if (item.des && !existsSync(path.join(des, item.des))) {
                mkdirSync(path.join(des, item.des))
            }
            if (item.path) {
                return copy(item.path, path.resolve(des, item.des, item.name))
            }
            return write(path.join(des, item.des, item.name), '')
        } catch(err) {
            console.log(err)
        }
        
    }))
}

function loadModules(m, box) {
    m.forEach(element => { 
        const {name, version} = element
        box[name] = version
    });
}

interface IOperations {
    line: (line: string) => void
    close?: () => void
}
interface IReadline extends ReadLine {
    question: question
}

type question = (name: string) => Promise<string>
function readFromTerminal(operation: IOperations) {  
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    })
    rl.on('line', operation.line)
    
    if (operation.close) {
        rl.on('close', operation.close)
    }
    rl.question = promisify(rl.question.bind(rl))
    return rl as IReadline
}

function promisify(f): question {
    return name => {
        return new Promise((res, rej) => {
            f(name, data => {
               data ? res(data) : rej(data)
            })
        })
    }
}

export {
    pkgManager,
    readFromTerminal,
    runCommand,
    loadModules,
    runCommandAsync,
    writeTemplates
}