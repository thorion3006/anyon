require 'rails_helper'

RSpec.describe GeoCache, type: :model do
  let(:geo_cache) { create(:geo_cache) }

  it { should validate_presence_of(:message) }
  it { should validate_presence_of(:lat) }
  it { should validate_presence_of(:long) }
  it { is_expected.to validate_length_of(:message).is_at_least(5) }
  it {
    should validate_numericality_of(:lat)
      .is_less_than_or_equal_to(90)
  }
  it {
    should validate_numericality_of(:lat)
      .is_greater_than_or_equal_to(-90)
  }
  it {
    should validate_numericality_of(:long)
      .is_less_than_or_equal_to(180)
  }
  it {
    should validate_numericality_of(:long)
      .is_greater_than_or_equal_to(-180)
  }

  describe 'attributes' do
    it 'has the correct attributes' do
      expect(geo_cache).to have_attributes(
        message: geo_cache.message,
        lat: geo_cache.lat,
        long: geo_cache.long
      )
    end
  end
end
