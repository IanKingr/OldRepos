class ShortenedUrl < ActiveRecord::Base
  validates :short_url, presence: true, uniqueness: true
  validates :long_url, :short_url, :submitter_id, presence: true

  belongs_to :submitter,
      foreign_key: :submitter_id,
      primary_key: :id,
      class_name: :User

  def self.random_code
    code = SecureRandom::urlsafe_base64

    while ShortenedUrl.exists?(code)
      code = SecureRandom::urlsafe_base64
    end

    code
  end

  def self.create_for_user_and_long_url!(user, long_url)
    ShortenedUrl.create!(submitter_id: user, long_url: long_url, short_url: self.random_code)
  end
end
