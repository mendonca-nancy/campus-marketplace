import { Router } from 'express';
import { getAllListing, getListingById, createListing, updateListing, deleteListing } from '../controllers/listingController.js';
const router = Router();

router.get('/', getAllListing);
router.get('/:id', getListingById);
router.post('/', createListing);
router.put('/:id', updateListing);
router.delete('/:id', deleteListing);

export default router;