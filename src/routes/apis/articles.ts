import express from 'express';
import authorize from '../../middlewares/authorization';
import ArticleService from '../../services/articles/ArticleService';
const router = express.Router();

router.post('/', authorize, async (req, res) => {
  const content = req.body.content;
  if (content === null) {
    res.status(422).send('content is null');
  } else {
    let feedback;
    try {
      feedback = await ArticleService.newArticle(req.userData, content);
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

router.get('/:articleId', async (req, res) => {
  const articleId = parseInt(req.params['articleId']);
  if (isNaN(articleId)) {
    res.status(422).send('articleid must be a number');
    return;
  }
  const article = await ArticleService.loadAnArticle(articleId);

  if (article === false) {
    res.status(404).send('article not found');
  } else {
    res.status(200).json({content: article});
  }

})

export default router;
