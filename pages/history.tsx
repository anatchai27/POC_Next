import React from 'react'
import { useApp } from '../src/context/AppContext'

const fmt = (iso?: string) => iso ? new Date(iso).toLocaleString() : '-'

export default function HistoryPage() {
  const { history } = useApp()

  if (!history || history.length === 0) return <div>No history yet.</div>

  return (
    <div>
      <h1>Todo History</h1>
      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr>
            <th style={{ textAlign: 'left', padding: 8, borderBottom: '1px solid #ddd' }}>Event</th>
            <th style={{ textAlign: 'left', padding: 8, borderBottom: '1px solid #ddd' }}>Title</th>
            <th style={{ textAlign: 'left', padding: 8, borderBottom: '1px solid #ddd' }}>Completed</th>
            <th style={{ textAlign: 'left', padding: 8, borderBottom: '1px solid #ddd' }}>When</th>
          </tr>
        </thead>
        <tbody>
          {history.map((h: any) => (
            <tr key={h.id}>
              <td style={{ padding: 8, borderBottom: '1px solid #f3f4f6' }}>{h.type}</td>
              <td style={{ padding: 8, borderBottom: '1px solid #f3f4f6' }}>{h.title ?? h.todoId}</td>
              <td style={{ padding: 8, borderBottom: '1px solid #f3f4f6' }}>{h.completed ? 'Yes' : 'No'}</td>
              <td style={{ padding: 8, borderBottom: '1px solid #f3f4f6' }}>{fmt(h.timestamp)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
