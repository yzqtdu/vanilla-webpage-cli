import {execSync, spawnSync, spawn} from 'child_process'
import readline, {ReadLine} from 'readline'
import {copyFile, writeFile, existsSync, mkdirSync} from 'fs'
import util from 'util'
import path from 'path'

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