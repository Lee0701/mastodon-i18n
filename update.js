
const fs = require('fs')

const [baseFile, updatedFile, outFile] = process.argv.slice(2)

const base = JSON.parse(fs.readFileSync(baseFile).toString())
const updated = JSON.parse(fs.readFileSync(updatedFile).toString())

const update = (base, updated) => {
    const entries = Object.keys(updated).map((key) => {
        if(typeof base[key] == 'object' && typeof updated[key] == 'object') {
            return update(base[key], updated[key])
        } else {
            if(base[key] == updated[key]) return [key, base[key]]
            else if(!base[key] && updated[key]) return [key, updated[key]]
            else if(base[key] && !updated[key]) return null
            else return [key, updated[key]]
        }
    }).filter((entry) => entry)
    return Object.fromEntries(entries)
}

const out = JSON.stringify(update(base, updated), null, '\t')
fs.writeFileSync(outFile, out)
