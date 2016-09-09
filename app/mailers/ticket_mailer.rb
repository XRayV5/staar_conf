class TicketMailer < ApplicationMailer
  default from: 'postmaster@sandboxcb71485f4b094ecd848cce5f46f10b17.mailgun.org'
 
  def welcome_email(email)
    attachments['ticket.pdf'] = File.read(Rails.root.join('images.pdf').to_s)
    mail(to: email, subject: 'WDI Conf 2016 Tickets')
  end
end
