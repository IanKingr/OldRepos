class User < ActiveRecord::Base
  validates :email, presence: true, uniqueness: true

  has_many :submitted_urls,
    foreign_key: :submitter_id,
    primary_key: :id,
    class_name: ShortenedUrl
end
