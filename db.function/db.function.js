import {readFile, writeFile } from 'node:fs/promises'

const filePath = new URL('../authorDB.json', import.meta.url) 
export const readDB = async (res) => {
  try {
    const data = await readFile( filePath, 'utf8')
    return JSON.parse(data)
  } catch (error) {
    console.log("error", error)
    return res.status(500).send('Internal server error')  
  }
}
//route to add author
export const writeDB = async (req, res) => {
  try {
    if (req.method === 'POST') {
        const data = req.body
        const file  = await readDB(res)
        file.push(data)
        await writeFile(filePath, JSON.stringify(file))
        return res.status(200).send({message: 'Author added',data: file})
    }
    if (req.method === 'PUT') {
      /* [  
            {"bookID": "8", "bookTitle": "Book 8"}, 
            {"bookID": "9", "bookTitle": "Book 9"} 
          ] */
      const newBooksArray = req.body
      const file  = await readDB(res)
      const authorIndex = file.findIndex(author => author.authorID === req.params.authorID) 
      try {
        if (authorIndex !== -1) {
          for (const book of newBooksArray) {
            console.log(book)
            file[authorIndex].authorBooks.push(book)
          }
          await writeFile(filePath, JSON.stringify(file))
          return res.status(200).send({message: 'Books added',data: file})
        } else {
          return res.status(404).send('Author not found')
        } 
      } catch (error) {
        console.log("error", error)
        return res.status(500).send('Internal server error')
      }
    }
    //route to delete author
    if (req.method === 'DELETE') {    
        const file = JSON.stringify(data)
        await writeFile(filePath, file)
        return res.status(200).send({message: 'Author removed',newData: file})
    }
  } catch(err) {
    console.log("error", err)
    return res.status(500).send('Internal server error')
  }  
}
