class User < ActiveRecord::Base
  validates :user_name, presence: true, uniqueness: true

  has_many :submitted_polls,
    foreign_key: :author_id,
    primary_key: :id,
    class_name: :Poll

  has_many :responses,
    foreign_key: :user_id,
    primary_key: :id,
    class_name: :Response

  has_many :questions,
    through: :submitted_polls,
    source: :questions

  has_many :answers,
    through: :responses,
    source: :answer_choice
end
