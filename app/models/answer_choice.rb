class AnswerChoice < ActiveRecord::Base
  validates :text, :question_id, presence: true

  belongs_to :question,
    foreign_key: :question_id,
    primary_key: :id,
    class_name: :Question

  has_many :responses,
    foreign_key: :answer_choice_id,
    primary_key: :id,
    class_name: :Response

  def get_user_id
    self.question.poll.author_id
  end
end
