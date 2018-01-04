FactoryBot.define do
  factory :geo_cache do
    message { Faker::Lorem.sentence }
    lat { Faker::Address.latitude }
    long { Faker::Address.longitude }
  end
end
