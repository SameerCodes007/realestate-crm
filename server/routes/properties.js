import express from 'express';
import { supabaseAdmin } from '../config.js';
import { authMiddleware } from '../middleware/auth.js';

const router = express.Router();

// Get all properties
router.get('/:type', authMiddleware, async (req, res) => {
  const { type } = req.params;
  const table = `${type}_properties`;

  try {
    const { data, error } = await supabaseAdmin
      .from(table)
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw error;
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Create property
router.post('/:type', authMiddleware, async (req, res) => {
  const { type } = req.params;
  const table = `${type}_properties`;

  try {
    const { data, error } = await supabaseAdmin
      .from(table)
      .insert([req.body])
      .select();

    if (error) throw error;
    res.json(data[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update property
router.put('/:type/:id', authMiddleware, async (req, res) => {
  const { type, id } = req.params;
  const table = `${type}_properties`;

  try {
    const { data, error } = await supabaseAdmin
      .from(table)
      .update(req.body)
      .eq('id', id)
      .select();

    if (error) throw error;
    res.json(data[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Delete property
router.delete('/:type/:id', authMiddleware, async (req, res) => {
  const { type, id } = req.params;
  const table = `${type}_properties`;

  try {
    const { error } = await supabaseAdmin
      .from(table)
      .delete()
      .eq('id', id);

    if (error) throw error;
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;