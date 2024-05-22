import { Router } from 'express';
import { authRequired } from '../middlewares/validateToken.js';

import { getFavorites, createFavorite, deleteFavorite } from '../controllers/favorites-controller.js';
import { validateSchema } from '../middlewares/validator.middleware.js';
import { favoriteSchema } from '../schemas/favorite.schema.js';

const router = Router();

router.get('/api/favorites', authRequired, getFavorites);
router.post('/api/favorites', authRequired, validateSchema(favoriteSchema), createFavorite);
router.delete('/api/favorites/:id', authRequired, deleteFavorite);

export default router;
