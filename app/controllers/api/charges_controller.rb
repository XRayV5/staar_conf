module Api

  class ChargesController < ApplicationController

    def new
    end

    def create
      # Set your secret key: remember to change this to your live secret key in production
      # See your keys here: https://dashboard.stripe.com/account/apikeys
      Stripe.api_key = "sk_test_BQokikJOvBiI2HlWgH4olfQ2"

      # Get the credit card details submitted by the form
      token = params[:token]
      amount = params[:amount].to_i * 100
      # binding.pry
      # Create a charge: this will charge the user's card
      begin
        charge = Stripe::Charge.create(
          :amount => amount, # Amount in cents
          :currency => "usd",
          :source => token,
          :description => "Example charge"
        )
        rescue Stripe::CardError => e
        # The card has been declined
      end

      #insertion...
      params[:info][:tickets].each do |key, value|
        surname = params[:info][:sname]
        firstname = params[:info][:fname]
        email = params[:info][:email]
          record = Ticket.new()
          record.surname = surname
          record.firstname = firstname
          record.email = email
          record.event_id = key.to_i
          record.number = value.to_i
          if(!record.save)
            render json: {success: false}
          end

          # TicketMailer.welcome_email(record.email).deliver

      end

      render json: {message: params[:info]}

    end
  end
end
