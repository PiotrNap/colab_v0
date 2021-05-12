Feature: Organizer re-opens App
    Scenario: Organizer opens App
        When User opens App
        Given User has an Organizer Authentication Token
        Then User is presented with Organizer Dashboard

    What does Organizer need:
        - See their own calendar with currently listed availability and currently scheduled meetings
        - Edit Profile / View Auth Token
        - Edit Ideas
        - View "Wallet"
        - Browser other Organizers
        - Send a message

    Scenario: Organizer views Organizer Dashboard
        When Organizer visits Organizer Dashboard 
        
        
        
        --> is it a bunch of buttons, or is it dynamic information?
        
        
        
        Organizer sees a list of upcoming meetings




        Then Organizer component with list of their upcoming Scheduled Meetings
        And Organizer sees component with Interface for changing available Time
        And Organizer sees option to browse Meeting Times for other Organizers
        And Organizer sees option to see current balance

    Scenario: User sees more Role Information
        When User chooses the option to see more Role Information
        Given User is on Landing Screen
        Then User sees a pop-up with more Information about Role

    Scenario: User onboarding and Authentication
        When the User has chosen a Role
        Then the User is guided through the Registration Experience
        # Registration Experience -> Feature
        And the User receives an Authentication token

    Scenario: Viewing Authentication Token
        Given the User has an Authenticated Role
        When the User navigates to Authentication component
        Then the User can view their Authentication token(s)
