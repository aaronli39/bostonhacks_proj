# Download the helper library from https://www.twilio.com/docs/python/install
from twilio.rest import Client

# Your Account Sid and Auth Token from twilio.com/console
# DANGER! This is insecure. See http://twil.io/secure
account_sid = 'AC0ab9617f6eda9d9aa19f6d18922b8160'
auth_token = '91cfc45597ae9bc99ba8c42acd97bcd0'
client = Client(account_sid, auth_token)

call = client.calls.create(
                        url='http://demo.twilio.com/docs/voice.xml',
			to='+15305170369',
         		from_='+16179462026',
                    )

print(call.sid)
