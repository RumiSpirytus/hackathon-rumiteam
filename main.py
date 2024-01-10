import os
from openai import AzureOpenAI
from flask import Flask, request, jsonify

client = AzureOpenAI(
  azure_endpoint = os.getenv("AZURE_OPENAI_ENDPOINT"), 
  api_key=os.getenv("AZURE_OPENAI_KEY"),   
  api_version="2023-05-15"
)

app = Flask(__name__)

@app.route('/api/chat', methods=['GET'])
def chat():
    response = client.chat.completions.create(
        model=os.getenv("MODEL"), # model = "deployment_name".
        messages=[
        {"role": "system", "content": "You are a helpful assistant."},
        {"role": "user", "content": "Does Azure OpenAI support customer managed keys?"},
        {"role": "assistant", "content": "Yes, customer managed keys are supported by Azure OpenAI."},
        {"role": "user", "content": "Do other Azure AI services support this too?"}
      ]
    )
    return jsonify(response.choices[0].message.content)


@app.route("/api/create", methods=["POST"])
def create():
  data = request.get_json()
  return jsonify(data), 201

if __name__ == '__main__':  
    app.run(port=5000, debug=True)
    
# print(response.choices[0].message.content)