#Simple currency formatter

##Angular directive

###Pre-requisites
*node
*bower

###Install
* clone the repo
* run npm install
* run bower install
* type "grunt serve"

The amount component should and should:
- Look like a form field for entering text
- Format the amount with a thousands separator (',') as you type
- Support the following keyboard shortcuts (case insensitive):
-- Entering 'k' will multiply the amount by one thousand
-- Entering 'm' will multiply the amount by one million
-- Entering 'b' will multiply the amount by one billion
- Support up to 10 digits of precision, eg. 1000.0123456789
- Allow any positive amount up to, but not including 100 billion
- Trim trailing zeroes after the decimal point (on submit)
- Support default form-field behaviour (cut, paste, undo, etc) where possible
- Prevent the user from entering an invalid amount where possible
- Be user friendly and behave intuitively when entering or editing an amount
- Work across different browsers, ideally IE9 and the latest version of Chrome, but if you don't have access to these browsers then please describe which browsers you have tested for.
