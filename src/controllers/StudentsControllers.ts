import type { Request, Response } from 'express';
import { pool } from '../db.js';

export async function getStudents(_req: Request, res: Response): Promise<void> {
  try {
    const result = await pool.query('SELECT * FROM students ORDER BY id;');
    res.json(result.rows);
  } catch {
    res.status(500).json({ message: 'Could not load students' });
  }
}

export async function getStudentById(req: Request, res: Response): Promise<void> {
  const id = Number(req.params.id);
  if (!Number.isSafeInteger(id) || id < 1) {
    res.status(400).json({ message: 'Student ID must be a positive integer' });
    return;
  }
 
  try {
    const result = await pool.query(
      'SELECT * FROM students WHERE id = $1;',
      [id]
    );
    if (result.rows.length === 0) {
      res.status(404).json({ message: 'Student not found' });
      return;
    }
    res.json(result.rows[0]);
  } catch {
    res.status(500).json({ message: 'Could not load student' });
  }
}
