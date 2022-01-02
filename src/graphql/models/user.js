import { DataTypes, Model } from 'sequelize'
import { sequelize } from '../../config/sequelize'

export class Users extends Model { }

Users.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        name: {
            type: DataTypes.STRING,
        },
        email: {
            type: DataTypes.STRING,
        },
        password: {
            type: DataTypes.TEXT,
        },
        role: {
            type: DataTypes.STRING,
        },
        createdAt: {
            type: DataTypes.DATE,
        },
        updatedAt: {
            type: DataTypes.DATE,
        },
        deleteAt: {
            type: DataTypes.DATE
        }
    },
    {
        modelName: 'user',
        underscored: true,
        timestamps: true,
        sequelize
    }
) 