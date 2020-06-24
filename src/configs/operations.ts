export const defaultPreset = {
    devDeps: [
        {
            name: 'webpack',
            version: 'latest'
        },
        {
            name: 'webpack-cli',
            version: 'latest'
        },
        {
            name: 'webpack-dev-server',
            version: 'latest'
        },
        {
            name: 'html-webpack-plugin',
            version: 'latest'
        },
        {
            name: 'clean-webpack-plugin',
            version: 'latest'
        },
        {
            name: 'eslint',
            version: 'latest'
        },
        {
            name: '@babel/core',
            version: 'latest'
        },
        {
            name: '@babel/preset-env',
            version: 'latest'
        },
        {
            name: '@babel/plugin-transform-runtime',
            version: 'latest'
        },
        {
            name: '@babel/runtime',
            version: 'latest'
        },
        {
            name: 'babel-loader',
            version: 'latest'
        },
        {
            name: "file-loader",
            version: 'latest'
        },
        {
            name: "css-loader",
            version: 'latest'
        },
        {
            name: "html-loader",
            version: 'latest'
        },
        {
            name: "extract-loader",
            version: 'latest'
        },
    ],
    deps: [
        {
            name: 'axios',
            version: 'latest'
        }
    ],
    scripts: [
        {
            name: 'build',
            version: 'webpack --env.production --config webpack.config.js'
        },
        {
            name: 'serve',
            version: 'webpack-dev-server'
        }
    ]
}

export const pkgCommands = {
    npm: {
        init: {
            command: process.platform === 'win32' ? 'npm.cmd' : 'npm',
            args: ['init', '-y']
        },
        install: {
            command: process.platform === 'win32' ? 'npm.cmd' : 'npm',
            args: ['install']
        }
    }
}

export const tsPreset = [
    {
        name: '@babel/plugin-transform-typescript',
        version: 'latest'
    },
    {
        name: 'typescript',
        version: 'latest'
    },
    {
        name: '@babel/preset-typescript',
        version: 'latest'
    },
    {
        name: '@types/node',
        version: 'latest'
    },
]