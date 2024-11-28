import { DataTypes, Model, NonAttribute, Sequelize, literal } from "sequelize";
import { User } from "./user";

interface RoleAttributes {
  id: number
  name: string
  createdAt?: Date | null;
  updatedAt?: Date | null;
  deletedAt?: Date | null;
}

interface RoleCreationAttributes extends Omit<RoleAttributes, 'id'> { }

class Role extends Model<RoleAttributes, RoleCreationAttributes> {
  declare id: number
  declare name: string
  declare createdAt?: Date | null;
  declare updatedAt?: Date | null;
  declare deletedAt?: Date | null;

  declare Users?: NonAttribute<User[]>;

  init(sequelize: Sequelize): void {
    Role.init({
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
      tableName: 'roles',
      paranoid: true,
      underscored: true,
      timestamps: true
    })
  }

  associate(): void {
    Role.hasMany(User, {
      foreignKey: 'roleId',
      as: 'Users'
    })
  }
}

export {
  Role
}