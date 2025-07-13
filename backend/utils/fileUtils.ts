// src/utils/fileUtils.ts
const fs = require('fs/promises')
const path = require('path')

const getJson = async (file: string): Promise<any> => {
  const data = await fs.readFile(path.join(__dirname, `../data/${file}`), 'utf-8')
  return JSON.parse(data)
}

const saveJson = async (file: string, data: any): Promise<void> => {
  await fs.writeFile(
    path.join(__dirname, `../data/${file}`),
    JSON.stringify(data, null, 2)
  )
}

module.exports = { getJson, saveJson }
