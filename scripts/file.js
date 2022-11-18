
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
    if(extname === '.json') fs.writeFileSync(fileName, JSON.stringify(content, null, '\t'))
    else if(extname === '.yml' || extname === '.yaml') fs.writeFileSync(fileName, yaml.stringify(content))
}

module.exports = { read, write }
