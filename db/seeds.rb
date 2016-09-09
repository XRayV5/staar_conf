# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)


t1 = Event.new()
t1.topic = "Lamborgini vs React"
t1.session_time = "6:00pm"
t1.price = 225
t1.seats = 120
t1.save

t2 = Event.new()
t2.topic = "Throw your windows laptop out the window"
t2.session_time = "4:45pm"
t2.price = 20
t2.seats = 55
t2.save

t3 = Event.new()
t3.topic = "Quickly Learn Materialize"
t3.session_time = "3:00pm"
t3.price = 29
t3.seats = 15
t3.save

t4 = Event.new()
t4.topic = "Quickly Learn Materialize"
t4.session_time = "3:00pm"
t4.price = 25
t4.seats = 50
t4.save

t5 = Event.new()
t5.topic = "Dominate the world one search at a time"
t5.session_time = "2:30pm"
t5.price = 30
t5.seats = 30
t5.save

t6 = Event.new()
t6.topic = "How to be a digital nomad"
t6.session_time = "1:15pm"
t6.price = 35
t6.seats = 15
t6.save

t7 = Event.new()
t7.topic = "Let's all learn ES6 together"
t7.session_time = "11:30am"
t7.price = 29
t7.seats = 15
t7.save

t8 = Event.new()
t8.topic = "World Business Entrepreneur"
t8.session_time = "12:30pm"
t8.price = 45
t8.seats = 20
t8.save

t9 = Event.new()
t9.topic = "NP Hard Problem - softened"
t9.session_time = "10:45am"
t9.price = 99999
t9.seats = 12
t9.save

#Dominate the world one search at a time
# number     | integer                     |
# firstname  | character varying           |
# surname    | character varying           |
# email      | character varying           |
# event_id   | integer                     |
#
# p1 = Ticket.new()
# p1.number = 3
# p1.firstname = 'Ray'
# p1.surname = 'X'
# p1.email = '1@23.com'
# p1.event_id = 7
# p1.save
#
# p2 = Ticket.new()
# p2.number = 10
# p2.firstname = 'Ray'
# p2.surname = 'X'
# p2.email = '1@23.com'
# p2.event_id = 8
# p2.save
#
# p3 = Ticket.new()
# p3.number = 6
# p3.firstname = 'Ray'
# p3.surname = 'X'
# p3.email = '1@23.com'
# p3.event_id = 9
# p3.save

# p4 = Ticket.new()
# p4.number = 3
# p4.firstname = 'Ray'
# p4.surname = 'X'
# p4.email = '1@23.com'
# p4.event_id = 7
# p4.save
# rails g migration add_session_time_to_dishes user_id:integer
