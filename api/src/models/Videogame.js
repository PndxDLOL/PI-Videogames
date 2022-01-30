const { DataTypes } = require("sequelize");
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define(
    "videogame",
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      image: {
        type: DataTypes.TEXT,
        defaultValue:
          "https://estaticos.muyinteresante.es/media/cache/1140x_thumb/uploads/images/gallery/5daf1c7e5bafe8f8c03c986b/record-videojuegos_0.jpg",
      },
      released: {
        type: DataTypes.DATE,
      },
      rating: {
        type: DataTypes.FLOAT,
      },
      platforms: {
        type: DataTypes.ARRAY(DataTypes.STRING),
      },
    },
    { timestamps: false }
  );
};
