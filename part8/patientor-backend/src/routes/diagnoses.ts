import diagnosisService from '../services/diagnosisService';

import express from 'express';

const router = express.Router();

router.get('/', (_req, res) => {
    res.send(diagnosisService.getEntries());
});

router.post('/', (_req, res) => {
  res.send('Saving a diagnosis!');
});

export default router;