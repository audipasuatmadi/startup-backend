import User from '../../models/User';
import ArticleRepository from '../../repositories/ArticleRepository';
import UserRepository from '../../repositories/UserRepository';

const ArticleService = {
  newArticle: async (user: User, contents: string, title: string) => {
    let createArticleFeedback = true;
    try {
      await ArticleRepository.createNewArticle(user, contents, title);
    } catch (e) {
      console.log(e);
      createArticleFeedback = false;
    }
    return createArticleFeedback;
  },

  loadAnArticle: async (articleId: number) => {
    const article = await ArticleRepository.loadAnArticle(articleId);
    if (article === null) return false;
    const writer = await UserRepository.getUserById(article.writerId);
    if (writer === null) return false;
    const {id, title, content, createdAt, updatedAt} = article;
    const response = {
      id,
      title,
      content,
      createdAt,
      updatedAt,
      writerData: {
        id: writer.id,
        username: writer.username,
        name: writer.name
      }
    }
    return response;
  },

  loadArticlesByUser: async (userId: number) => {
    const response = await ArticleRepository.loadArticlesByUser(userId);
    if (response === null) return false;
    return response;
  },
};

export default ArticleService;
