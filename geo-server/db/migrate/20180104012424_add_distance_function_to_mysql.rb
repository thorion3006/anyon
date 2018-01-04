class AddDistanceFunctionToMysql < ActiveRecord::Migration[5.1]
  def self.up
    ActiveRecord::Base.connection.execute <<-SQL
      CREATE FUNCTION distance(lat1 DOUBLE, long1 DOUBLE, lat2 DOUBLE, long2 DOUBLE) RETURNS DOUBLE
        LANGUAGE SQL
        DETERMINISTIC
        COMMENT 'Calculate distance in km between two points on earth'
      RETURN ACOS(SIN(RADIANS(lat1)) * SIN(RADIANS(lat2)) + COS(RADIANS(lat1)) * COS(RADIANS(lat2))
           * COS(RADIANS(long1 - long2))) * 6371;
    SQL
  end
  
  def self.down
    ActiveRecord::Base.connection.execute <<-SQL
      DROP FUNCTION distance;
    SQL
  end
end
