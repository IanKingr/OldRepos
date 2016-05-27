# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)

users = User.create!(
  [{user_name: "Alex"},
  {user_name: "Andres"},
  {user_name: "Annabelle"},
  {user_name: "Arlene"},
  {user_name: "Andrew"},
  {user_name: "Allen"}])

users.each_with_index do |user,i|
  Poll.create!(title: "Dogs #{i}", author_id: user.id)
end

Poll.all.each_with_index do |poll,i|
  Question.create!(text: "#{i}. Which one is your favorite?", poll_id: poll.id)
end

Question.all.each_with_index do |question,i|
  AnswerChoice.create!(text: "Option #{i}", question_id: question.id)
end

AnswerChoice.all.each_with_index do |answer_choice, i|
  Response.create!(user_id: answer_choice.get_user_id, answer_choice_id: answer_choice.id)
end
