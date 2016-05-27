class Response < ActiveRecord::Base
  validates :user_id, :answer_choice_id, presence: true
  validate :not_duplicate_response
  validate :no_author_respondent

  belongs_to :user,
    foreign_key: :user_id,
    primary_key: :id,
    class_name: :User

  belongs_to :answer_choice,
    foreign_key: :answer_choice_id,
    primary_key: :id,
    class_name: :AnswerChoice

  has_one :question,
    through: :answer_choice,
    source: :question

    def not_duplicate_response
      if respondent_already_answered?
        errors[:user_id] << "This user has already responded!"
      end
    end

    def respondent_already_answered?
      sibling_responses.exists?(user_id: user_id)
    end

    def sibling_responses
      question.responses.where.not(id: id)
    end

    # def no_author_respondent
    #   if Response.joins(question: {poll: :author}).where(
    #   {author_id: :user_id}).exists?(user_id: user_id)
    #     errors[:user_id] << "Author may not respond."
    #   end
    # end

    def no_author_respondent
      if question_author_id == user_id
        errors[:user_id] << "Author may not respond."
      end
    end

    def question_author_id
      question.poll.author.id
      # Response.joins(question: {poll: :author}).where(
      #   {author_id: :user_id}).exists?(user_id: user_id)
    end
end
