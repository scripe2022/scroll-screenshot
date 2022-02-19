import express from 'express';
const router = express.Router();

router.post('/getimage', async (req, res) => {
    res.header('X-Powered-By', ' 3.2.1');
    res.header('Content-Type', 'application/json;charset=utf-8');
    const params = req.body;
    console.log(params);
    console.log('ok');
    res.json({ code: 200 });
});

export default router;
