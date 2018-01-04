require 'rails_helper'

RSpec.describe 'GeoCache API', type: :request do
  let!(:cache1) { GeoCache.create(message: "in range 1", lat: 52.499050, long: 12.052885) }
  let!(:cache2) { GeoCache.create(message: "in range 2", lat: 53.374965, long: 13.430155) }
  let!(:cache3) { GeoCache.create(message: "in range 3", lat: 52.507476, long: 14.952764) }
  let!(:cache4) { GeoCache.create(message: "in range 4", lat: 51.613926, long: 13.651625) }
  let!(:cache5) { GeoCache.create(message: "in range 5", lat: 52.092711, long: 12.883400) }
  let!(:cache6) { GeoCache.create(message: "out of range", lat: 51.682636, long: 10.454145) }
  let!(:cache7) { GeoCache.create(message: "out of range 2", lat: 52.207371, long: 17.319730) }
  let!(:cache8) { GeoCache.create(message: "nearest", lat: 52.456897, long: 14.046120) }

  let(:query_location) { { lat: 52.4943082, long: 13.5143608 } }

  describe 'POST /geocaches' do
    let(:valid_attributes) {
                            {
                              message: 'valid message',
                              lat: -20.673443,
                              long: 6.234356
                            }
    }

    context 'when request is valid' do
      before { post '/geocaches', params: valid_attributes }

      it 'creates a secret message' do
        expect(json['message']).to eq('valid message')
        expect(json['lat']).to eq(-20.673443)
        expect(json['long']).to eq(6.234356)
      end

      it 'returns status code 201' do
        expect(response).to have_http_status(201)
      end
    end

    context 'when request is invalid' do
      before { post '/geocaches', params: {
                                            message: 'invalid',
                                            lat: -92.8364,
                                            long: 200.34783
                                          }
      }

      it 'returns status code 422' do
        expect(response).to have_http_status(422)
      end

      it 'returns a validation failure message' do
        expect(response.body)
          .to match(/Validation failed: Lat must be greater than or equal to -90, Long must be less than or equal to 180/)
      end
    end
  end
  
  describe 'GET /geocaches/around' do
    before { get '/geocaches/around', params: query_location }

    context 'when the records exists within 100km' do
      it 'returns all messages within 100km to the given point' do
        expect(json).not_to be_empty
        expect(json.size).to eq(6)
        expect(json).not_to include(cache6)
        expect(json).not_to include(cache7)
      end

      it 'returns status code 200' do
        expect(response).to have_http_status(200)
      end
    end

    context 'when no records exist in range' do
      let(:query_location) { {lat: 57.470811, long: 60.943042} }

      it 'returns status code 404' do
        expect(response).to have_http_status(404)
      end

      it 'returns a not found message' do
        expect(response.body).to match(/No messages exist within your range/)
      end
    end
  end

  describe 'GET /geocaches/near' do
    before { get '/geocaches/near', params: query_location }
    
    it 'returns the message nearest to the given point' do
      expect(json).not_to be_empty
      expect(json).to include("message" => "nearest")
    end

    it 'returns status code 200' do
      expect(response).to have_http_status(200)
    end
  end
end
