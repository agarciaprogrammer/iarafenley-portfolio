// src/utils/fileUtils.ts
const fs = require('fs/promises')
const path = require('path')

const getJson = async (file) => {
  const data = await fs.readFile(path.join(__dirname, `../data/${file}`), 'utf-8')
  return JSON.parse(data)
}

const saveJson = async (file, data) => {
  await fs.writeFile(
    path.join(__dirname, `../data/${file}`),
    JSON.stringify(data, null, 2)
  )
}

module.exports = { getJson, saveJson }
