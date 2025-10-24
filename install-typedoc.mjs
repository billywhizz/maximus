import { spawnSync } from "node:child_process"
import { readFileSync, writeFileSync } from "node:fs"

spawnSync("npm", "install typedoc typedoc-plugin-markdown --save-dev".split(" "), { stdio: "inherit" })

writeFileSync("typedoc.json", `{
  "plugin": ["typedoc-plugin-markdown"],
  "out": "./doc"
}`)

const entry = { docs: "typedoc" }
const json = JSON.parse(readFileSync("package.json").toString())
json.scripts = json.scripts ? Object.assign(json.scripts, entry) : entry
writeFileSync("package.json", JSON.stringify(json, null, "  "))
