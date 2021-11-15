import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'

import data from '../data'

export const DataHighlight = () => (
  <SyntaxHighlighter language="json">{JSON.stringify(data, undefined, 2)}</SyntaxHighlighter>
)
