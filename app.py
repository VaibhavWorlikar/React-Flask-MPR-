# chatbot.py
from flask import Flask, request, jsonify
from flask_cors import CORS
import random

app = Flask(__name__)
CORS(app)  # Enable CORS for cross-origin requests

# Rule-based response dictionary for the fire service chatbot
responses = {
    "fire safety tips": [
        "Always keep a fire extinguisher nearby.",
        "Make sure to have smoke alarms installed in every room.",
        "Plan and practice a fire escape route for your home or office."
    ],
    "emergency contact": [
        "In case of fire emergencies, call 101 immediately.",
        "For fire emergencies, contact your nearest fire station."
    ],
    "fire hazards": [
        "Common fire hazards include overloaded electrical outlets and unattended stoves.",
        "Make sure to store flammable liquids safely."
    ],
    "thank you": [
        "You're welcome! Stay safe.",
        "Glad I could help! Remember, safety comes first."
    ]
}

@app.route('/', methods=['POST'])
def chat():
    user_message = request.json.get('message').lower()

    # Simple rule-based keyword matching
    if "fire safety" in user_message:
        response = random.choice(responses["fire safety tips"])
    elif "contact" in user_message or "emergency" in user_message:
        response = random.choice(responses["emergency contact"])
    elif "hazard" in user_message:
        response = random.choice(responses["fire hazards"])
    elif "thank" in user_message:
        response = random.choice(responses["thank you"])
    else:
        response = "Sorry, I don't have information about that. Please reach out to your nearest fire service."

    return jsonify({'response': response})

if __name__ == '__main__':
    app.run(debug=True)
