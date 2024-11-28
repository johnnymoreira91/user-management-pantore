import { DataTypes, Model, NonAttribute, Sequelize, literal } from "sequelize";
// import bcrypt from 'bcrypt';
import { Role } from "./roles";

interface UserAttributes {
  id: number
  name: string
  email: string
  password: string
  roleId: number
  createdAt?: Date | null;
  updatedAt?: Date | null;
  deletedAt?: Date | null;
}

interface UserCreationAttributes extends Omit<UserAttributes, 'id'> { }

class User extends Model<UserAttributes, UserCreationAttributes> {
  declare id: number
  declare name: string
  declare email: string
  declare password: string
  declare roleId: number
  declare createdAt?: Date | null;
  declare updatedAt?: Date | null;
  declare deletedAt?: Date | null;

  declare Role?: NonAttribute<Role>;

  init(sequelize: Sequelize): void {
    User.init({
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      roleId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'roles',
          key: 'id'
        },
        onUpdate: 'CASCADE',
      },
      createdAt: {
        type: DataTypes.DATE,
        allowNull: true,
        defaultValue: literal('CURRENT_TIMESTAMP')
      },
      updatedAt: {
        type: DataTypes.DATE,
        allowNull: true,
        defaultValue: literal('CURRENT_TIMESTAMP')
      },
      deletedAt: {
        type: DataTypes.DATE,
        allowNull: true,
        defaultValue: null
      }
    }, {
      sequelize,
      tableName: 'users',
      paranoid: true,
      underscored: true,
      timestamps: true
    })
  }

  associate(): void {
    User.belongsTo(Role, {
      foreignKey: 'roleId',
      as: 'Role'
    })
  }

  // public async encryptPassword(): Promise<void> {
  //   const saltRounds = 10;
  //   this.password = await bcrypt.hash(this.password, saltRounds);
  //   await this.save()
  // }

  // public async isPasswordValid(providedPassword: string): Promise<boolean> {
  //   return bcrypt.compare(providedPassword, this.password);
  // }
}

export {
  User
}