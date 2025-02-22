import React from 'react'

type FileViewerProps = {
  selectedFile: string
}

const FileViewer = ({ selectedFile }: FileViewerProps) => {
  const fileExtension = selectedFile.split('.').pop()?.toLowerCase()
  switch (fileExtension) {
    case 'pdf':
      return (
        <object
          data={selectedFile}
          type="application/pdf"
          width="100%"
          height="100%"
        >
          <p>PDF cannot be displayed.</p>
        </object>
      )

    case 'jpg':
    case 'jpeg':
    case 'png':
    case 'gif':
    case 'bmp':
      return (
        <img
          src={selectedFile}
          alt="File preview"
          style={{ width: '100%', height: 'auto' }}
        />
      )

    case 'mp4':
    case 'webm':
    case 'ogg':
      return (
        <video
          controls
          style={{ width: '100%', height: '100%' }}
          title="Video Player"
        >
          <source src={selectedFile} type={`video/${fileExtension}`} />
          <track kind="captions" srcLang="en" label="English" default />
          Your browser does not support the video tag.
        </video>
      )

    case 'mp3':
    case 'wav':
      return (
        <audio controls style={{ width: '100%' }} title="Audio Player">
          <source src={selectedFile} type={`audio/${fileExtension}`} />
          <track kind="captions" srcLang="en" label="English" default />
          Your browser does not support the audio element.
        </audio>
      )

    case 'pptx':
    case 'xlsx':
    case 'doc':
    case 'docx':
      return (
        <iframe
          src={`https://view.officeapps.live.com/op/embed.aspx?src=${encodeURIComponent(
            selectedFile
          )}`}
          width="100%"
          height="100%"
          title="Office Document Viewer"
        />
      )

    default:
      return <p>Unsupported file format.</p>
  }
}

export default FileViewer
