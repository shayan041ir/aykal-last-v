import requests


def send_sms2(mobile_number):
    # API key
    api_key = 'uXLwxAIBh8QicXDpG6D9xJg652zjCgcqPAFUILMlhAjd7xtP'
 
    template_id = '788095'
    # template_id = '399502'
    url = 'https://api.sms.ir/v1/send/verify'
    headers = {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'X-API-KEY': api_key
    }
    data = {
        'mobile': mobile_number,
        'templateId': template_id,
        'parameters': [
            # {'name': 'CODE', 'value': ''}
            {'name': 'LINK', 'value': 'landing/tamasbama'}
            # {'name': 'CODE', 'value': '1234'}
        ]
    }
    print(data)
    response = requests.post(url, json=data, headers=headers)
    if response.status_code == 200:
    # if 200== 200:
        print('OTP sent successfully!')
        return True
    else:
        print('Failed to send OTP.')
        return False

send_sms2('09145690042')