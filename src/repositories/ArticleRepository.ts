import User from "../models/User";
import Article from "../models/Article";


const ArticleRepository = {
  async createNewArticle(user: User, articleContent: string) {
    let article: Article | null;
    try {
      article = await user.saveArticle({content: articleContent});
      if (!article) {
        throw new Error('something is wrong in creating new article');
      }
    } catch (e) {
      throw e;
    };
    return article;
  }
};

export default ArticleRepository;