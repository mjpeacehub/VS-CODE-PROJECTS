@Sep19
Feature: Click on the next button on step 1
    Description:
    As a customer, I should be able to click on the next button on step 1 when I give valid information.

    Acceptance Criteria:
    1. The next button should take customers to step two when given valid information.
    a. Test by providing all fields
    b. Test by providing only the required fields



    Background:
        Given User is already on the enrollment page.https://qa.sep.tdtm.cydeo.com/taws

    Scenario: Click on the next button after providing all the information
        When User enters firstname
        And User enters lastname
        And User enters email
        And User enters phone number
        And User enters how did you hear about us dropdown
        And User clicks on the next button on Start Application page
        Then the start application stepper circle should be green
        And the payment plan stepper circle should be blue

    Scenario: Click on the next button after providing only the required information
        When User enters firstname
        And User enters lastname
        And User enters email
        And User enters phone number
        And User clicks on the next button on Start Application page
        Then the start application stepper circle should be green
        And the payment plan stepper circle should be blue