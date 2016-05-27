class CatRentalRequest < ActiveRecord::Base
  validates :cat_id, :start_date, :end_date, :status, presence: true
  validates :status, inclusion: %w(PENDING APPROVED DENIED)
  validate :overlapping_approved_requests?

  def overlapping_requests # will revisit
    #if start_date1 > start_date2 && end_date2 > start_date1
    rstart = self.start_date
    rend = self.end_date

    CatRentalRequest.where(
      "cat_id = #{self.cat_id} AND id != #{self.id} AND
      ((start_date BETWEEN '#{rstart}' AND '#{rend}'
      OR end_date BETWEEN '#{rstart}' AND '#{rend}')
      OR (start_date < '#{rstart}' AND end_date > '#{rend}'))"
    )
  end

  def overlapping_approved_requests?
    if overlapping_requests.where(status: "APPROVED").any?
      errors[:base] = "Overlaps approved request"
    end
  end

  def name
    self.cat.name
  end

  def approve!
    ActiveRecord::Base.transaction do
      deny!
      self.status = "APPROVED"
      self.save!
    end
  end

  def deny!
    overlapping_requests.each do |request|
      if request.status == "APPROVED"
        errors[:base] << "Already approved request"
      end
      request.status = "DENIED"
      request.save!
    end
  end

  belongs_to :cat

end
