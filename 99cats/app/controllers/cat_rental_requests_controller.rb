class CatRentalRequestsController < ApplicationController
  def index
    @rentals = CatRentalRequest.all
    render :index
  end

  def show
    @rental = CatRentalRequest.find(params[:id])
    render :show
  end

  def new
    @rental = CatRentalRequest.new
    @cats = Cat.all
    render :new
  end

  def create
    @rental = CatRentalRequest.new(rental_params)
    if @rental.save
      render :show
    else
      render(
        json: @rental.errors.full_messages, status: :unprocessable_entity
      )
    end
  end

  def edit
    @rental = CatRentalRequest.find(params[:id])
    render :edit
  end

  def update
    @rental = CatRentalRequest.find(params[:id])
    if @rental.update(rental_params)
      render :show
    else
      render(
        json: @rental.errors.full_messages, status: :unprocessable_entity
      )
    end
  end

  private
  def rental_params
    params.require(:rental).permit(:cat_id, :start_date, :end_date)
  end
end
