# Main controller for the API - has three actions add, around and near.
class GeoCachesController < ApplicationController
  before_action :set_geo_caches, only: [:around, :near]

  # POST /geocaches
  def add
    @geo_cache = GeoCache.create!(message: geo_cache_params[:message],
                                  lat: geo_cache_params[:lat].to_f,
                                  long: geo_cache_params[:long].to_f
                                )
    json_response(@geo_cache, :created)
  end

  # GET /geocaches/around
  def around
    location = {lat: geo_cache_params[:lat].to_f, long: geo_cache_params[:long].to_f}
    result = around_helper(location, @geo_caches)
    if result.empty?
      json_response({ message: 'No messages exist within your range' }, :not_found)
    else
      json_response(result)
    end
  end

  # GET /geocaches/near
  def near
    location = {lat: geo_cache_params[:lat].to_f, long: geo_cache_params[:long].to_f}
    result = near_helper(location, @geo_caches)
    status = :not_found if result.empty?
    json_response(result, status)
  end

  private

  # Sanitizes param inputs
  def geo_cache_params
    params.permit(:message, :lat, :long)
  end
  
  # Sets the cache collection for the query methods
  def set_geo_caches
    @geo_caches = GeoCache.all
  end
end
