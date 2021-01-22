import { DataTypes } from 'sequelize';
import moment from 'moment';

/**
 * Customer database model.
 * See https://sequelize.org/v5/manual/models-definition.html to learn how to customize it.
 */
export default function (sequelize) {
  const customer = sequelize.define(
    'customer',
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING(255),
        allowNull: false,
        validate: {
          len: [2, 255],
          notEmpty: true,
        }
      },
      birthdate: {
        type: DataTypes.DATEONLY,
        get: function() {
          // @ts-ignore
          return this.getDataValue('birthdate')
            ? moment
                // @ts-ignore
                .utc(this.getDataValue('birthdate'))
                .format('YYYY-MM-DD')
            : null;
        },
      },
      gender: {
        type: DataTypes.ENUM,
        values: [
          "male",
          "female"
        ],
      },
      importHash: {
        type: DataTypes.STRING(255),
        allowNull: true,        
      },
    },
    {
      indexes: [
        {
          unique: true,
          fields: ['importHash', 'tenantId'],
          where: {
            deletedAt: null,
          },
        },

      ],
      timestamps: true,
      paranoid: true,
    },
  );

  customer.associate = (models) => {



    
    models.customer.belongsTo(models.tenant, {
      as: 'tenant',
    });

    models.customer.belongsTo(models.user, {
      as: 'createdBy',
    });

    models.customer.belongsTo(models.user, {
      as: 'updatedBy',
    });
  };

  return customer;
}
