import User from '../../models/User';
import ArticleRepository from '../../repositories/ArticleRepository';

const ArticleService = {
  newArticle: async (user: User, contents: string) => {
    let createArticleFeedback = true;
    try {
      await ArticleRepository.createNewArticle(user, contents);
    } catch (e) {
      console.log(e);
      createArticleFeedback = false;
    }
    return createArticleFeedback;
  },
};

export default ArticleService;
