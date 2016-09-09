class TicketsController < ApplicationController

  def new
  end

  def create
    @ticket = Ticket.new
    @ticket.number = params[:number]
    @ticket.firstname = params[:firstname]
    @ticket.surname = params[:surname]
    @ticket.email = params[:email]
    @ticket.event_id = params[:event_id]
    if @ticket.save
      # Tell the UserMailer to send a welcome email after save
      TicketMailer.welcome_email(@ticket.email).deliver
      # puts "mail sent"
    end
  end

end

        # TicketMailer.welcome_email(t.email).deliver
