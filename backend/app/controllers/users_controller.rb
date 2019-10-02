require 'pry'
class UsersController < ApplicationController
  def index
    @users = User.all

    render json: @users
  end

  def show
    @user = User.find(params[:id])

    render json: {
      user: @user,
      favorites: @user.favorites, 
      hikes: @user.reihikes
    }
  end

  def create
    @user = User.create({
      username: params[:username]
    })

    redirect_to "http://localhost:3001"
  end
end
