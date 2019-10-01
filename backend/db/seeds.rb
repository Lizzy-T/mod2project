require 'rest-client'
require 'json'
require 'pry'


rei = ENV["REI_API_KEY"]
rei_url = "https://www.hikingproject.com/data/get-trails?lat=39.7392&lon=-104.9903&maxDistance=100&maxResults=2&key=#{rei}"
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

damon = User.create({
  username: 'DaemonSpelledWrong'
})

flatiron = Reihike.create({
  name: 'Flatiron',
  length: 0.5,
  location: 'Boulder, CO',
  link: 'dumb',
  image: 'smart'
})

Favorite.create({
  user: damon,
  reihike: flatiron
})

all_trails.each() do |trail|
  Reihike.create({
    name: trail["name"],
    length: trail["length"],
    location: trail["location"],
    link: trail["url"],
    image: trail["imgSmall"]
  })
end
