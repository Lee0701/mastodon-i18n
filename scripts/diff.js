
const file = require('./file')

const [baseFile, updatedFile, outFile] = process.argv.slice(2)

const base = file.read(baseFile)
const updated = file.read(updatedFile)

const diff = (base, updated) => {
    const entries = Object.keys(updated).map((key) => {
        if(typeof base[key] == 'object' && typeof updated[key] == 'object') {
            if(Array.isArray(base[key]) && Array.isArray(updated[key])) return [key, updated[key]]
            else return [key, diff(base[key], updated[key])]
        } else {
            if(!base[key] && updated[key]) return [key, updated[key]]
            else if(base[key] && !updated[key]) return [key, null]
            else if(base[key] != updated[key]) return [key, updated[key]]
            else return null
        }
    }).filter((entry) => entry)
    return Object.fromEntries(entries)
}

const out = diff(base, updated)
file.write(outFile, out)
