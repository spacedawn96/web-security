import { DataTypes, Model, BuildOptions } from 'sequelize';
import sequelize from '../../db';

interface UserInstance extends Model {
  [x: string]: any;
  readonly id: number;
  name: string;
  password: string;
}

type UserStatic = typeof Model & {
  new (values?: object, options?: BuildOptions): UserInstance;
  associate: any;
};

const User = <UserStatic>sequelize.define('users', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      isAlphanumeric: {
        msg: 'The username can only contain letters and numbers',
      },
      len: {
        args: [4, 15],
        msg: 'The username needs to be between 4 and 15 characteres long',
      },
    },
  },
  bio: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  email: {
    type: DataTypes.STRING,
    validate: {
      isEmail: true,
    },
    allowNull: false,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      min: 6,
    },
  },
});

export default User;
