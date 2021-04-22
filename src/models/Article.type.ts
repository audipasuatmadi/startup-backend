import { Optional } from 'sequelize/types';

export interface ArticleAttribute {
  id?: number;
  writerId?: number;
  content: string;
  title: string;
}

export interface ArticleCreaionAttribute
  extends Optional<ArticleAttribute, 'id' & 'writerId'> {}
