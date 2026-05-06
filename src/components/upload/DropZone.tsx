import { useRef, useState } from 'react'
import { parseLinkedInCSV } from '@/lib/csvParser'
import { transformRows } from '@/lib/transform'
import { useAppDispatch } from '@/store/context'

export function DropZone() {
  const dispatch = useAppDispatch()
  const inputRef = useRef<HTMLInputElement>(null)
  const [dragging, setDragging] = useState(false)
  const [error, setError] = useState<string | null>(null)

  function handleFile(file: File | null | undefined) {
    if (!file) return
    setError(null)
    const reader = new FileReader()
    reader.onload = () => {
      try {
        const rows = parseLinkedInCSV(reader.result as string)
        if (rows.length === 0) throw new Error('No connections found in this file.')
        dispatch({ type: 'SET_DATA', payload: transformRows(rows) })
      } catch (err) {
        setError('Could not parse file: ' + (err as Error).message)
      }
    }
    reader.onerror = () => setError('Failed to read file.')
    reader.readAsText(file)
  }

  return (
    <div className="flex items-center justify-center min-h-[60vh]">
      <div className="w-full max-w-lg bg-surface border border-border rounded-2xl p-9">
        <div
          className={`border-2 border-dashed rounded-xl p-12 text-center cursor-pointer transition-all
            ${dragging ? 'border-accent bg-accent/5' : 'border-border hover:border-accent hover:bg-accent/5'}`}
          onClick={() => inputRef.current?.click()}
          onDragEnter={e => { e.preventDefault(); setDragging(true) }}
          onDragOver={e => { e.preventDefault(); setDragging(true) }}
          onDragLeave={e => { e.preventDefault(); setDragging(false) }}
          onDrop={e => {
            e.preventDefault(); setDragging(false)
            handleFile(e.dataTransfer.files?.[0])
          }}
        >
          <div className="text-4xl mb-3 opacity-60">📁</div>
          <div className="text-base font-semibold mb-1.5">Drop your Connections.csv here</div>
          <div className="text-dim text-sm">or click to browse — file stays in your browser</div>
        </div>
        <input
          ref={inputRef}
          type="file"
          accept=".csv,text/csv"
          className="hidden"
          onChange={e => handleFile(e.target.files?.[0])}
        />
        <p className="text-dim text-xs mt-4 leading-relaxed">
          Get your file from LinkedIn → <em>Settings → Data Privacy → Get a copy of your data</em> → "Connections" only.
          It downloads as <code className="bg-surface2 px-1.5 py-0.5 rounded text-[11px]">Connections.csv</code>.
        </p>
        {error && (
          <div className="mt-3 px-3.5 py-2.5 rounded-lg bg-red-500/10 border border-red-500/30 text-red-300 text-sm">
            {error}
          </div>
        )}
      </div>
    </div>
  )
}
