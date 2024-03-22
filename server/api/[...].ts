import { createRouter, defineEventHandler, useBase } from 'h3'
import * as articleCtrl from '../models/articles'

const router = createRouter()

router.get('/article/detail',defineEventHandler(articleCtrl.read))
router.get('/article/list',defineEventHandler(articleCtrl.list))

export default useBase('/api', router.handler)