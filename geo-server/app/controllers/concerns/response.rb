# Query calculations for GeoCachesController
module Response
  # Converts degrees to radians
  def radians(degree)
    degree * Math::PI / 180
  end

  # Calculates the distance between two points in the map
  def distance(lat1, lat2, long1, long2)
    Math.acos(Math.sin(radians(lat1)) * Math.sin(radians(lat2)) +
      Math.cos(radians(lat1)) * Math.cos(radians(lat2)) *
      Math.cos(radians(long1 - long2))) * 6371
  end

  # Retrieves a collection of caches around 100km radius of a given point
  def around_helper(location, geo_caches)
    collection = []
    geo_caches.each do |geo_cache|
      collection.push(geo_cache) if distance(location[:lat], geo_cache[:lat], location[:long], geo_cache[:long]) <= 100
    end
    collection
  end

  # Retrieves the closest cache to a given point
  def near_helper(location, geo_caches)
    closest_cache = {}
    closest_distance = ""
    geo_caches.each do |geo_cache|
      cache_distance = distance(location[:lat], geo_cache[:lat], location[:long], geo_cache[:long])
      if closest_distance == "" || closest_distance > cache_distance
        closest_cache = geo_cache
      end
    end
    closest_cache.as_json
  end
  
  # Renders a JSON object to the client. Its default status is set to OK.
  def json_response(object, status = :ok)
    render json: object, status: status
  end
end
