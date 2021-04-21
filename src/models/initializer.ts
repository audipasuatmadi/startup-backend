import User from './User';
import Token from './Token';
import Article from './Article';

//TODO: foreign key
const initialize = async () => {
  try {
    User.hasOne(Token, {
      sourceKey: 'id',
      foreignKey: {
        field: 'user_id',
      },
    });
    User.hasMany(Article, {
      sourceKey: 'id',
      foreignKey: {
        field: 'writer_id'
      }
    })
    Article.belongsTo(User, { targetKey: 'id', onDelete: 'CASCADE' });
    Token.belongsTo(User, { targetKey: 'id', onDelete: 'CASCADE' });
  } catch (e) {
    console.log(e);
  }

  try {
    // await User.sync({force: true})
    // await Token.sync({force: true})
    // await Article.sync({force: true});
  } catch (e) {
    console.log(e);
  }
};

export default initialize;
