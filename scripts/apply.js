
const fs = require('fs')

const [baseFile, diffFile] = process.argv.slice(2)

const base = JSON.parse(fs.readFileSync(baseFile).toString())
const diff = JSON.parse(fs.readFileSync(diffFile).toString())

const apply = (base, diff) => {
    const entries = Object.keys(base).map((key) => {
        if(typeof base[key] == 'object' && typeof diff[key] == 'object') {
            if(Array.isArray(base[key]) && Array.isArray(diff[key])) return [key, diff[key]]
            else return [key, apply(base[key], diff[key])]
        } else {
            return [key, diff[key] || base[key]]
        }
    }).filter((entry) => entry)
    return Object.fromEntries(entries)
}

const out = JSON.stringify(apply(base, diff), null, '\t')
fs.writeFileSync(baseFile, out)
