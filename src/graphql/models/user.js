import { DataTypes, Model } from 'sequelize'
import { sequelize } from '../../config/sequelize'
import { UserRole } from '../enum'

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
            defaultValue: UserRole.ENDUSER
        },
        createdAt: {
            type: DataTypes.DATE,
        },
        updatedAt: {
            type: DataTypes.DATE,
        },
        deletedAt: {
            type: DataTypes.DATE
        },
        isActive: {
            type: DataTypes.BOOLEAN
        },
        imageProfileUrl: {
            type: DataTypes.STRING
        }
    },
    {
        modelName: 'user',
        underscored: true,
        timestamps: true,
        sequelize
    }
) 