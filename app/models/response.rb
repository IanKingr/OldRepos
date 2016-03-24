class Response < ActiveRecord::Base
  validates :user_id, :answer_choice_id, presence: true

  belongs_to :user,
    foreign_key: :user_id,
    primary_key: :id,
    class_name: :User

  belongs_to :answer_choice,
    foreign_key: :answer_choice_id,
    primary_key: :id,
    class_name: :AnswerChoice
end
