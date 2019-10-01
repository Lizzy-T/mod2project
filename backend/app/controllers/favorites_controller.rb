class FavoritesController < ApplicationController
  def index
    @favorites = Favorite.all

    render json: @favorites, include: :reihike
  end

  def show
    @favorite = Favorite.find(params[:id])

    render json: @favorite, include: :reihike
  end

  def create
    @favorite = Favorite.create({
      user_id: params[:user_id],
      reihike_id: params[:reihike_id]
    })

    redirect_to "http://localhost:3001"
  end
end
