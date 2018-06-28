module.exports = function (sequelize, DataTypes) {
  return sequelize.define('city', {
    breviary: DataTypes.STRING,
    city_id: DataTypes.INTEGER,
    city_name: DataTypes.STRING
  }, {
    tableName: 'city'
  })
}
