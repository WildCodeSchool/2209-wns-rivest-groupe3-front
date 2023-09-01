import parse from 'html-react-parser'
import { IContentBlock } from './interfaces/Interfaces'

const outputData = (block: IContentBlock, index: number) => {
  switch (block.type) {
    case 'title':
      return <h1 key={index}>{block.data.text}</h1>
    case 'header':
      switch (block.data.level) {
        case 1:
          return (
            <h1 key={index} className="text-5xl font-bold font-lobster mt-5">
              {block.data.text}
            </h1>
          )
        case 2:
          return (
            <h2 key={index} className="text-4xl font-bold font-lobster mt-5">
              {block.data.text}
            </h2>
          )
        case 3:
          return (
            <h3 key={index} className="text-3xl font-bold font-lobster mt-5">
              {block.data.text}
            </h3>
          )
        case 4:
          return (
            <h4 key={index} className="text-2xl font-bold font-lobster mt-5">
              {block.data.text}
            </h4>
          )
        case 5:
          return (
            <h5 key={index} className="font-bold font-lobster mt-5">
              {block.data.text}
            </h5>
          )
        case 6:
          return (
            <h6 key={index} className="font-bold font-lobster mt-5">
              {block.data.text}
            </h6>
          )
        default:
          throw new Error('Header level must be specified')
      }
    case 'image':
      return (
        <img key={index} src={block.data.file?.url} alt={block.data.caption} />
      )
    case 'list':
      switch (block.data.style) {
        case 'unordered':
          return (
            <ul key={index} style={{ textAlign: 'left' }}>
              {block.data.items?.map((element, liIndex) => {
                return <li key={`li-${index}${liIndex}`}>{parse(element)}</li>
              })}
            </ul>
          )
        case 'ordered':
          return (
            <ol key={index} style={{ textAlign: 'left' }}>
              {block.data.items?.map((element, liIndex) => {
                return <li key={`li-${index}${liIndex}`}>{parse(element)}</li>
              })}
            </ol>
          )
        default:
          throw new Error('List block style must be specified')
      }
    case 'quote':
      return (
        <figure>
          <blockquote>
            <p>{parse(block.data.text || '')}</p>
          </blockquote>
          <figcaption>{block.data.caption}</figcaption>
        </figure>
      )

    default:
      return (
        <p key={index} className="text-justify">
          {parse(block.data.text || '')}
        </p>
      )
  }
}

export default outputData
