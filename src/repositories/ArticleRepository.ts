import User from '../models/User';
import Article from '../models/Article';

const ArticleRepository = {
  async createNewArticle(user: User, articleContent: string, title: string) {
    let article: Article | null;
    try {
      article = await Article.create({
        content: articleContent,
        writerId: user.id,
        title: title,
      });
      if (!article) {
        throw new Error('something is wrong in creating new article');
      }
    } catch (e) {
      article = null;
    }
    return article;
  },

  async loadAnArticle(articleId: number) {
    let article: Article | null;
    try {
      article = await Article.findOne({ where: { id: articleId } });
    } catch (e) {
      article = null;
    }
    return article;
  },

  async loadArticlesByUser(writerId: number) {
    let article: Article[] | null;
    try {
      article = await Article.findAll({ where: { writerId: writerId } });
    } catch (e) {
      article = null;
    }
    return article;
  },
};

export default ArticleRepository;
