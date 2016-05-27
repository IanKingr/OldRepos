# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)


user1 = User.create!(email: "ian@example.com")
user2 = User.create!(email: "tony@example.com")
user3 = User.create!(email: "albert@example.com")
user4 = User.create!(email: "walead@example.com")

shorturl1 = ShortenedUrl.create!(submitter_id: user1.id, short_url: ShortenedUrl.random_code, long_url: "firefox.com")
shorturl2 = ShortenedUrl.create!(submitter_id: user2.id, short_url: ShortenedUrl.random_code, long_url: "reddit.com")
shorturl3 = ShortenedUrl.create!(submitter_id: user3.id, short_url: ShortenedUrl.random_code, long_url: "cnn.com")
shorturl4 = ShortenedUrl.create!(submitter_id: user4.id, short_url: ShortenedUrl.random_code, long_url: "sluggy.com")
