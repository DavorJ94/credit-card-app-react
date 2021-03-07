# Credit card app

### Based on the initial challenge, this application is improved.

### Protection with inputs is improved and more controlled.

### Improvements compared to the challenge/test:

- Username needs to have two words, for first name and last name.
- Inputs for credit card number need to be filled before submission (with first digit starting at 4 (Visa), 5 (MasterCard) or 6 (Discover) - user is notified what is invalid and what should be corrected upon submission). Thus, each input box needs to have 4 digits.
- Input boxes for credit cards are limited to 4 digits only, and only digits are accepted.
- Date is more controlled, i.e., it should be picked from the date picker. Lower dates than current month are not available, plus additional validation functions are written to make sure if the expiration date is invalid.
- Better and design is created for credit cards based on their company, and there is also design of default credit card, until user types in first digit of card number (design is updated live, depending on the first number in the first input box the user types). Submission cannot be completed unless the user types 4, 5 or 6 as first digit. Separate script is written to check for validity of input boxes before button can be enabled for submitting.
- "Save" button is disabled until all field are filled with data. Graphical representation of credit card is updated on change (that part was required by the challenge).
- Written script to generate unique ids for each new card, which allows for higher flexibility and control over each memorized credit card. Of course, that gives the ability to modify existing cards, without saving them as copies (overwriting the local storage).
- Added option to delete credit card from the base at the url where all cards are displayed. That option gives user full control of the interface.
- Different graphical representations of each card are maintained in the list of all cards, which makes it easier for the user to navigate to desired one. Also, option to add new card has default graphical representation.
- React routing was utilized, but separate script was written for dynamic url manipulation for prepopulation of the boxes based on the chosen card to be modified.
- This project utilizes mainly React Hooks (useState, useEffect, useRef). There was no need for useContext.
- Used useLayoutEffect instead of useEffect for card list update. Mainly not to see page flickering when redirected to card addition.
- Added functionality to auto-focus next input element when previous one is filled with four numbers (considers four inputs regarding card number).
