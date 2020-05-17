import express from "express";
import React from "react";
import { renderToString } from "react-dom/server"
import Index from "../pages/index"
import About from "../pages/about"


const router = express.Router();

router.get('/', async (req, res) => {
    const reactComp = renderToString(<Index />);
    res.status(200).render('pages/index', { reactApp: reactComp });
})
router.get('/about', async (req, res) => {
    const reactComp = renderToString(<About />);
    res.status(200).render('pages/about', { reactApp: reactComp });
});

export default router;