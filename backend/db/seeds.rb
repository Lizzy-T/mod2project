require 'rest-client'
require 'json'
require 'pry'


rei = ENV["REI_API_KEY"]
rei_url = "https://www.hikingproject.com/data/get-trails?lat=39.7392&lon=-104.9903&maxDistance=100&maxResults=100&key=#{rei}"
info = RestClient.get(rei_url)
all_trails = JSON.parse(info.body)["trails"]

# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

Favorite.destroy_all
User.destroy_all
Reihike.destroy_all

all_trails.each() do |trail|
  Reihike.create({
    name: trail["name"],
    length: trail["length"],
    location: trail["location"],
    link: trail["url"],
    image: trail["imgSmall"],
    summary: trail["summary"],
    rating: trail["stars"],
    difficulty: trail["difficulty"],
    highest_point: trail["high"],
    lowest_point: trail["low"],
  })
end
