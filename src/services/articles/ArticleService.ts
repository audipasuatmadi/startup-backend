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
  
  loadAnArticle: async (articleId: number) => {
    const response = await ArticleRepository.loadAnArticle(articleId);
    if (response === null) return false;
    return response;
  },

  loadArticlesByUser: async (userId: number) => {
    const response = await ArticleRepository.loadArticlesByUser(userId);
    if (response === null) return false;
    return response;
  }
  
};

export default ArticleService;
