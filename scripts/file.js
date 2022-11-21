
const fs = require('fs')
const path = require('path')
const yaml = require('yaml')

const read = (fileName) => {
    const extname = path.extname(fileName)
    const content = fs.readFileSync(fileName).toString()
    if(extname === '.json') return JSON.parse(content)
    else if(extname === '.yml' || extname === '.yaml') return yaml.parse(content)
}

const write = (fileName, content) => {
    const extname = path.extname(fileName)
    const dirname = path.dirname(fileName)
    const mkdirp = () => {
        if(!fs.existsSync(dirname)) return (
            fs.mkdirSync(dirname, { recursive:true }),
            true
        );
        const lstat = fs.lstatSync(dirname)
        if(lstat.isDirectory()) return (
            true
        );
        else process.abort(`'${dirname}' is not a directory. :(`)
    }
    switch(extname){
        case '.json':
        case '.yml':
        case '.yaml':
            mkdirp(); break;
        default:
            process.abort(`'${extname}' is not supported extension. :(`)
    }
    if(extname === '.json') fs.writeFileSync(fileName, JSON.stringify(content, null, '\t'))
    else if(extname === '.yml' || extname === '.yaml') fs.writeFileSync(fileName, yaml.stringify(content))
}

module.exports = { read, write }
