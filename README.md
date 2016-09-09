# WDIConf2016

## A single-page mobile-optimised conference website
WDIConf was built for a WDI8 Melb group project.

## Technologies Used
This application was created with the Ruby on Rails framework, together with HTML, CSS, JS, AJAX, jQuery, Materialize. Mailgun was used to send ticketing information via email upon successful payment via Stripe. We utilised GitHub as a repository management and collaboration system.

## Approach
We wanted to create a simple look and feel with a design optimised for mobile. Potential WDIConf attendees can view the speaker lineup and purchase tickets to the event without logging in or signing up.

## Description
The website is a single page application that connects with a database.The app has a responsive layout using AJAX. The landing page shows a menu which scrolls down to the different parts of the site. The About page is at the top, followed by the conference Location page and then the speakers Schedule page. Each speaker has a card that expands to reveal more information about the talk . After speakers comes the Sponsors page, followed by the Contact page. A back-to-top click button appears at the bottom right of the last page so that mobile users can easily return to the main menu without having to scroll back through everything.

## User Story
A user can purchase tickets through the website. Once a user has made a payment through stripe, stripe will send their information to be confirmed. Whilst the user is directed to the SuccessfulPayment page upon successfully making payment for their ticket(s), Mailgun takes the users email and sends an email to the clients email address.

## Problems Encountered
- CSS issues
- Development decisions: pros and cons of different frameworks
- Design decisions: colour choices, wireframe layout, animation effects etc.
- Numerous git merge conflicts and subsequent troubleshooting
- Initially we wanted to use backbone.js but had issues and went with AJAX instead.
- Using Mailgun to email information collect from the backend

## Live Deployment
WDIConf is hosted [here](http://www.herokuapp.com/link) on Heroku

## Wireframe Mockup
Wireframes are hosted [here](https://postimg.org/gallery/1hyilt5q6/#) on PostImg

September 9th, 2016. By [AndrewPratley](https://github.com/AndrewPratley), [Antz84](https://github.com/antz84), [XRayV5](https://github.com/XRayV5), [SamWS](https://github.com/SamWS), [taddavisweb](https://github.com/taddavisweb)
