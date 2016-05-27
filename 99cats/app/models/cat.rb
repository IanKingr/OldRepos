class Cat < ActiveRecord::Base
  validates :birth_date, :color, :name, :sex, :description, presence: true
  validates :color, inclusion: { in: %w(black brown blue) }
  validates :sex, inclusion: { in: %w(M F) }

  def age
    (Date.today - self.birth_date)/365
  end

  has_many :cat_rental_requests,
    dependent: :destroy
end
