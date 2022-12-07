import express from 'express';
import { addVideo, addView, channel, deleteVideo, getByTag, getVideo, liked, random, search, sub, trend, updateVideo } from '../controllers/video.js';
import { verifyToken } from '../verifyToken.js';


const router = express.Router();

router.post('/', verifyToken, addVideo);
router.delete('/delete/:id', verifyToken, deleteVideo);
router.get('/find/:id', getVideo);
router.put('/view/:id', addView);
router.get('/trend', trend);
router.get('/random', random);
router.get('/sub', verifyToken, sub);
router.get("/tags", getByTag);
router.get('/search', search);
router.put('/:id', verifyToken, updateVideo);
router.get('/channel/:id', channel);
router.get('/liked/:id', verifyToken, liked);





export default router;
