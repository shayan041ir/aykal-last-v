server_url='http://54.36.68.41:5100/htag'
payload = {
    "user_id": 1,
    "username": "kingofthe9783",
    "userpass": "king12345",
    "limit": 10,
    "src": "tabriz",
    "try": 0,
    "group_name": "test-group"
}
import requests
response = requests.post(server_url, json=payload)

print("Status Code:", response.status_code)
# print("Status Code:", response.json())
print("Response JSON:", response.json())