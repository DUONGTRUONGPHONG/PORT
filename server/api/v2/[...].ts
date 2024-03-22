import { createRouter, defineEventHandler, useBase } from 'h3'
import * as categoryCtrl from '~/server/models/v2/category'
import * as navigationCtrl from '~/server/models/v2/navigation'
import * as articleCtrl from '~/server/models/v2/article'
import * as commentCtrl from '~/server/models/v2/comment'
import * as profileCtrl from '~/server/models/v2/profile'
import * as userCtrl from '~/server/models/v2/user'
import * as pollCtrl from '~/server/models/v2/poll'
import * as resourceCtrl from '~/server/models/v2/resource'
import * as provinceCtrl from '~/server/models/v2/province'

const router = createRouter()

router.get('/categories', defineEventHandler(categoryCtrl.list))

router.get('/navigation', defineEventHandler(navigationCtrl.get))

router.get('/articles-paging', defineEventHandler(articleCtrl.listPaging))
router.get('/articles', defineEventHandler(articleCtrl.get))
router.get('/articles-category-section', defineEventHandler(articleCtrl.listSectionArticle))

router.get('/comments', defineEventHandler(commentCtrl.list))
router.post('/comments', defineEventHandler(commentCtrl.create))
router.patch('/comments', defineEventHandler(commentCtrl.update))
router.delete('/comments', defineEventHandler(commentCtrl.remove))

router.post('/profile', defineEventHandler(profileCtrl.create))
router.patch('/profile', defineEventHandler(profileCtrl.update))

router.post('/user/change-password', defineEventHandler(userCtrl.changePassword))
router.post('/user/change-email', defineEventHandler(userCtrl.changeEmail))
router.get('/user/current-user', defineEventHandler(userCtrl.getCurrent))
router.get('/user/:id', defineEventHandler(userCtrl.getById))

router.get('/poll/:id', defineEventHandler(pollCtrl.getPoll))
router.get('/poll-option/poll/:id', defineEventHandler(pollCtrl.getPollOptions))
router.post('/poll-vote', defineEventHandler(pollCtrl.vote))

router.post('/upload', defineEventHandler(resourceCtrl.upload))

router.post ('/province/city', defineEventHandler(provinceCtrl.getall))

export default useBase('/api/v2', router.handler)