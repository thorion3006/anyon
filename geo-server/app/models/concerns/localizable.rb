# It was supposed to do the distance calculations within the database to improve performance.
# But couldn't figure out the error.
module Localizable
  extend ActiveSupport::Concern

  included do
    scope :near, -> lat, long, radius {
      d =-> b { destination_point(lat, long, b, radius) }
      where(["lat BETWEEN ? AND ? AND long BETWEEN ? AND ?", d[180][:lat], d[0][:lat], d[270][:long], d[90][:long]])
      .where(["COALESCE(distance(?, ?, lat, long), 0) < ?", lat, long, radius])
    }
  end

  module ClassMethods

    # Return destination point given distance and bearing from start point
    def destination_point(lat, long, initial_bearing, distance)
      d2r =-> x { x * Math::PI / 180 }
      r2d =-> x { x * 180 / Math::PI }
      angular_distance = distance / 6371.0
      lat1, long1, bearing = d2r.(lat), d2r.(long), d2r.(initial_bearing)
      lat2 = Math.asin(Math.sin(lat1) * Math.cos(angular_distance) + Math.cos(lat1) * Math.sin(angular_distance) * Math.cos(bearing))
      long2 = long1 + Math.atan2(Math.sin(bearing) * Math.sin(angular_distance) * Math.cos(lat1), Math.cos(angular_distance) - Math.sin(lat1) * Math.sin(lat2))
      { :lat => r2d.(lat2).round(7), :long => r2d.(long2).round(7) }
    end

  end
end