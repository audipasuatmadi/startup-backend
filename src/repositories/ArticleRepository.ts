import User from '../models/User';
import Article from '../models/Article';

const ArticleRepository = {
  async createNewArticle(user: User, articleContent: string) {
    let article: Article | null;
    try {
      article = await Article.create({
        content: articleContent,
        writerId: user.id,
      });
      if (!article) {
        throw new Error('something is wrong in creating new article');
      }
    } catch (e) {
      article = null;
    }
    return article;
  },
};

export default ArticleRepository;
