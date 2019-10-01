class FavoritesController < ApplicationController
  def index
    @favorites = Favorite.all

    render json: @favorites
  end

  def show
    @favorite = Favorite.find(params[:id])

    render json: @favorite
  end

  def create
    @favorite = Favorite.create({
      user_id: params[:user_id],
      reihike_id: params[:reihike_id]
    })

    redirect_to "http://localhost:3001"
  end
end
