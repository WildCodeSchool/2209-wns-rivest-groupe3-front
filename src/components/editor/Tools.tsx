import Paragraph from '@editorjs/paragraph'
import Header from '@editorjs/header'
import List from '@editorjs/list'
import Quote from '@editorjs/quote'

export const EDITOR_JS_TOOLS = {
  paragraph: { class: Paragraph, inlineToolbar: true },
  header: Header,
  list: { class: List, inlineToolbar: true },
  quote: { class: Quote, inlineToolbar: true },
}
