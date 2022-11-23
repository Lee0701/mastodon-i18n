// scripts/update-custom.js
// Run : 
// node scripts/update-custom.js <ORIGINAL_NEW_FILE_PATH> <ORIGINAL_OLD_FILE_PATH> <CUSTOMIZED_OLD_FILE_PATH> <OUT_FILE_PATH>
const file = require('./file')

const [new_orig_path, old_orig_path, old_custom_path, out_custom_path] = process.argv.slice(2)

const new_orig = file.read(new_orig_path)
const old_orig = file.read(old_orig_path)
const old_custom = file.read(old_custom_path)

const update = (current_new_orig, current_old_orig, current_old_custom) => {
    const entries = Object.keys(current_new_orig).map((key) => {
        if(typeof current_new_orig[key] == 'object' && typeof current_old_orig[key] == 'object' && typeof current_old_custom[key] == 'object') {
            if(Array.isArray(current_old_orig[key]) && Array.isArray(current_new_orig[key]) && Array.isArray(current_old_custom[key])) return [key, current_new_orig[key]]
            else return [key, update(current_new_orig[key], current_old_orig[key], current_old_custom[key])]
        } else {
            if(current_new_orig[key] == current_old_orig[key]) return [key, current_old_custom[key]]
            else if(!current_old_orig[key] && current_new_orig[key]) return [key, current_new_orig[key]]
            else if(current_old_orig[key] && !current_new_orig[key]) return null
            else return [key, current_new_orig[key]]
        }
    }).filter((entry) => entry)
    return Object.fromEntries(entries)
}

const out = update(new_orig, old_orig, old_custom)
file.write(out_custom_path, out)
