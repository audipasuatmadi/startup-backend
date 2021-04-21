import { Optional } from "sequelize/types";

export interface ArticleAttribute {
  id?: number;
  writerId?: number;
  content: string;
}

export interface ArticleCreaionAttribute extends Optional<ArticleAttribute, 'id' & 'writerId'> {}