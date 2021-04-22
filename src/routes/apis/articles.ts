import express from 'express';
import authorize from '../../middlewares/authorization';
import ArticleService from '../../services/articles/ArticleService';
const router = express.Router();

router.post('/', authorize, async (req, res) => {
  const content = req.body.content;
  const title: string = req.body.title;
  if (content === null || title === null || (title.trim() === '')) {
    res.status(422).send('content or title is null');
  } else {
    let feedback;
    try {
      feedback = await ArticleService.newArticle(req.userData, content, title);
    } catch (e) {
      feedback = false;
    }

    if (feedback === false) {
      res.status(500).send('something is wrong in saving article');
    } else {
      res.status(201).send('article successfuly saved');
    }
  }
});

router.get('/:articleId', async (req, res, next) => {
  const articleId = parseInt(req.params['articleId']);
  if (isNaN(articleId)) {
    res.status(422);
    next(new Error('article params must be a number'));
    return;
  }
  const article = await ArticleService.loadAnArticle(articleId);

  if (article === false) {
    res.status(404);
    next(new Error('something is wrong in fetching article'));
  } else {
    res.status(200).json({ content: article });
  }
});

router.get('/u/:userId', async (req, res, next) => {
  const userId = parseInt(req.params['userId']);
  if (isNaN(userId)) {
    res.status(422);
    next(new Error('invalid parameters'));
  }

  const articles = await ArticleService.loadArticlesByUser(userId);
  if (articles === false) {
    res.status(404);
    next(new Error('something is wrong in finding articles'));
  } else {
    res.status(200).json({ contents: articles });
  }
});

export default router;
