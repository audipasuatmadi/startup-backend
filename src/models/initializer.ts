import User from './User';
import Token from './Token';

//TODO: foreign key
const initialize = async () => {
  try {
    User.hasOne(Token, {
      sourceKey: 'id',
      foreignKey: {
        field: 'user_id',
      },
    });
    Token.belongsTo(User, { targetKey: 'id', onDelete: 'CASCADE' });
  } catch (e) {
    console.log(e);
  }

  try {
    // await User.sync({force: true})
    // await Token.sync({force: true})
  } catch (e) {
    console.log(e);
  }
};

export default initialize;
