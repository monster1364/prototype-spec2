import type { MDXComponents } from 'mdx/types'

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    h1: ({ children }) => (
      <h1 className="text-2xl font-bold mb-4 text-gray-900">{children}</h1>
    ),
    h2: ({ children }) => (
      <h2 className="text-xl font-semibold mb-3 mt-6 text-gray-800">{children}</h2>
    ),
    h3: ({ children }) => (
      <h3 className="text-lg font-medium mb-2 mt-4 text-gray-700">{children}</h3>
    ),
    p: ({ children }) => (
      <p className="mb-3 text-gray-600 leading-relaxed">{children}</p>
    ),
    ul: ({ children }) => (
      <ul className="list-disc list-inside mb-3 text-gray-600 space-y-1">{children}</ul>
    ),
    ol: ({ children }) => (
      <ol className="list-decimal list-inside mb-3 text-gray-600 space-y-1">{children}</ol>
    ),
    li: ({ children }) => <li className="text-gray-600">{children}</li>,
    code: ({ children }) => (
      <code className="bg-gray-100 rounded px-1.5 py-0.5 text-sm font-mono text-gray-800">
        {children}
      </code>
    ),
    pre: ({ children }) => (
      <pre className="bg-gray-100 rounded-lg p-4 overflow-x-auto mb-4 text-sm">
        {children}
      </pre>
    ),
    table: ({ children }) => (
      <div className="overflow-x-auto mb-4">
        <table className="min-w-full border border-gray-200 rounded-lg">{children}</table>
      </div>
    ),
    th: ({ children }) => (
      <th className="bg-gray-50 border-b border-gray-200 px-4 py-2 text-left text-sm font-semibold text-gray-700">
        {children}
      </th>
    ),
    td: ({ children }) => (
      <td className="border-b border-gray-100 px-4 py-2 text-sm text-gray-600">{children}</td>
    ),
    ...components,
  }
}
