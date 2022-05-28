import XMLHttpRequest from 'xhr2'

let createFolderUrl = 'https://api.gofile.io/createFolder'
let deleteFolderUrl = 'https://api.gofile.io/createFolder'
let uploadFileUrl = 'https://store1.gofile.io/uploadFile'

let parentFolder = '71e68cb1-28dc-4792-95e8-8691fa70dab5'
let token = 'LcF7oy9NmOQA983RMllElV9RzoUEDctS'
let folderName = 'newFolder0'
let contentsId = 'b82bfbe4-f1fa-49c2-9320-4acc462db50f'

//------------------------------Metodos

async function createFolder(token, parentFolder, folderName) {
  try {
    var xhr = new XMLHttpRequest()
    xhr.open('PUT', createFolderUrl)
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded')

    xhr.onreadystatechange = function () {
      if (xhr.readyState === 4) {
        console.log(xhr.status)
        console.log(xhr.responseText)
      }
    }
    var data = `parentFolderId=${parentFolder}&token=${token}&folderName=${folderName}`

    xhr.send(data)
  } catch (error) {
    console.error(error)
  }
}

async function deleteContent(token, contentsId) {
  try {
    var url = 'https://api.gofile.io/deleteContent'

    var xhr = new XMLHttpRequest()
    xhr.open('DELETE', url)

    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded')

    xhr.onreadystatechange = function () {
      if (xhr.readyState === 4) {
        console.log(xhr.status)
        console.log(xhr.responseText)
      }
    }
    var data = `contentsId=${contentsId}&token=${token}`
    xhr.send(data)
  } catch (error) {
    console.error(error)
  }
}

async function uploadFile() {
  try {
    var url = 'https://api.gofile.io/getServer'
    let serverName = ''
    var xhr = new XMLHttpRequest()

    xhr.open('GET', url)

    xhr.onreadystatechange = function () {
      if (xhr.readyState === 4) {
        console.log(xhr.status)
        console.log(xhr.responseText)

        let convertedToJson = JSON.parse(xhr.responseText)
        serverName = convertedToJson.data.server
        console.log(serverName)

        var xhr1 = new XMLHttpRequest()
        xhr1.open('POST', `https://${serverName}.gofile.io/uploadFile`)

        var data = new FormData()
        data.append('myForm', document.getElementById('myForm').files[0])

        xhr1.setRequestHeader('Content-type', 'multipart/form-data')

        xhr1.onreadystatechange = function () {
          if (xhr1.readyState === 4) {
            console.log(xhr1.status)
            console.log(xhr1.responseText)
          }
        }
        xhr1.send(data)
      }
    }

    xhr.send()
  } catch (error) {
    console.error(error)
  }
}

//-----------------------------------------------

//createFolder(token, parentFolder, folderName)
//deleteContent(token, contentsId)
//uploadFile()
