class ReihikesController < ApplicationController
  def index
    @hikes = Reihike.all

    render json: @hikes
  end

  def show
    @hike = Reihike.find(params[:id])

    render json: @hike
  end
end
