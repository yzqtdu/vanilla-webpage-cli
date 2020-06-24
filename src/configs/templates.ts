import path from 'path'

 const package_templates = [
    {
        name: 'webpack.config.js',
        des: '',
        path: path.resolve(__dirname, '../../templates/webpack.config.js') 
    }
]

const common_templates = [
    {
        name: 'index.html',
        des: 'src',
    },
]

const script_tempaltes = [
    {
        name: 'main.js',
        des: 'src',
    },
    {
        name: 'request.js',
        des: 'src',
        path: path.resolve(__dirname, '../../templates/request.js') 
    },
]

const ts_templates = [
    {
        name: 'main.ts',
        des: 'src',
    },
    {
        name: 'request.ts',
        des: 'src',
        path: path.resolve(__dirname, '../../templates/request.js') 
    },
    {
        name: 'tsconfig.json',
        des: '',
        path: path.resolve(__dirname, '../../templates/ts.config') 
    },
]

function getTemplates(needTS) {
    return needTS ? [...package_templates, ...common_templates, ...ts_templates] 
     : [...package_templates, ...common_templates, ...script_tempaltes]
}

export {
    getTemplates
}