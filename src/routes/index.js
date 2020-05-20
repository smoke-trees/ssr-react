import express from 'express'
import React from 'react'
import { renderToString } from 'react-dom/server'
import Index from '../pages/index'

const router = express.Router()

router.get('/', async (req, res) => {
  const reactComp = renderToString(<Index />)
  res.status(200).render('pages/index', { reactApp: reactComp })
})


export default router
