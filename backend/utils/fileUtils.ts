// src/utils/fileUtils.ts
const fs = require('fs/promises')
const path = require('path')

const getJson = async (file: string) => {
  const filePath = path.join(process.cwd(), 'data', file)
  const data = await fs.readFile(filePath, 'utf-8')
  return JSON.parse(data)
}

const saveJson = async (file: string, data: any) => {
  const filePath = path.join(process.cwd(), 'data', file)
  await fs.writeFile(filePath, JSON.stringify(data, null, 2))
}

module.exports = { getJson, saveJson }
