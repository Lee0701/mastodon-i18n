
const fs = require('fs')
const file = require('./file')

const [baseFile, updatedFile] = process.argv.slice(2)

const base = file.read(baseFile)
const updated = file.read(updatedFile)

const update = (base, updated) => {
    const entries = Object.keys(updated).map((key) => {
        if(typeof base[key] == 'object' && typeof updated[key] == 'object') {
            if(Array.isArray(base[key]) && Array.isArray(updated[key])) return [key, updated[key]]
            else return [key, update(base[key], updated[key])]
        } else {
            if(base[key] == updated[key]) return [key, base[key]]
            else if(!base[key] && updated[key]) return [key, updated[key]]
            else if(base[key] && !updated[key]) return null
            else return [key, base[key]]
        }
    }).filter((entry) => entry)
    return Object.fromEntries(entries)
}

const out = update(base, updated)
file.write(baseFile, out)
