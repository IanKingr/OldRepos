class Question < ActiveRecord::Base
  validates :text, :poll_id, presence: true

  belongs_to :poll,
    foreign_key: :poll_id,
    primary_key: :id,
    class_name: :Poll

  has_many :answer_choices,
    foreign_key: :question_id,
    primary_key: :id,
    class_name: :AnswerChoice

  has_many :responses,
    through: :answer_choices,
    source: :responses

  def results
    results = Hash.new{|h,k| h[k] = 0}

    self.answer_choices.includes(:responses).each do| answer |
      results[answer.text] = answer.responses.count
    end

    results
  end
end
