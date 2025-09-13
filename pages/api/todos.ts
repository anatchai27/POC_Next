import type { NextApiRequest, NextApiResponse } from 'next';
import { listTodos, addTodo, toggleTodo, deleteTodo, updateTodo } from '@/lib/todoStore';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    return res.status(200).json(listTodos());
  }
  if (req.method === 'POST') {
    const { title } = req.body || {};
    if (!title || !title.trim()) return res.status(400).json({ error: 'Title required' });
    const todo = addTodo({ title });
    return res.status(201).json(todo);
  }
  if (req.method === 'PATCH') {
    const { id, title, completed } = req.body || {};
    if (!id) return res.status(400).json({ error: 'id required' });
    const updated = updateTodo({ id, title, completed });
    if (!updated) return res.status(404).json({ error: 'Not found' });
    return res.status(200).json(updated);
  }
  if (req.method === 'DELETE') {
    const { id } = req.body || {};
    if (!id) return res.status(400).json({ error: 'id required' });
    const ok = deleteTodo(id);
    if (!ok) return res.status(404).json({ error: 'Not found' });
    return res.status(204).end();
  }
  res.setHeader('Allow', 'GET,POST,PATCH,DELETE');
  return res.status(405).end();
}
