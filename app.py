from flask import Flask, request, jsonify
from flask_cors import CORS
import random
from fuzzywuzzy import process
from FireStationList import fire_stations
from Responses import responses

app = Flask(__name__)
CORS(app)  # Enable CORS for cross-origin requests

# Sample fire station data for Mumbai locations

# Rule-based response dictionary for the fire service chatbot


# Emergency-related keywords (without asking for location)
fire_related_keywords = [
    "fire at my house", "fire in my building", "fire outbreak", "fire hazard", 
    "electrical fire", "short circuit", "gas leak",
]

# Keywords dictionary for fuzzy matching
keywords = {
    "safety tips": "safety tips",  # Now "safety tips" triggers random incident tips
    "noc": "noc application",  # "noc" triggers NOC application response
    "drill": "fire drill",  # "drill" triggers fire drill response
    "gas leak": "gas leak",
    "short circuit": "short circuit",
    "electrical fire": "electrical fire",
    "chemical spill": "chemical spill",
    "water flooding": "water flooding",
    "elevator malfunction": "elevator malfunction",
    "building collapse": "building collapse",
    "earthquake": "earthquake",
    "toxic smoke": "toxic smoke",
    "fire emergency": "fire emergency",
    "my house is on fire": "fire emergency",
    "fire department number": "fire department number",
    "fire brigade number": "fire brigade number",
    "thanks": "thanks",
    "hi": "greeting",
    "hello": "greeting",
    "hey": "greeting",
    "hey mate": "greeting"
}

# Store user state for emergency flows (key: user_id)
user_state = {}

# Function to clean and preprocess user message
def clean_message(message):
    return message.lower().strip()

@app.route('/', methods=['POST'])
def chat():
    user_message = request.json.get('message')
    cleaned_message = clean_message(user_message)
    user_id = request.json.get('user_id', 'default_user')  # Assume we track users via a user ID

    # Check for fire-related keywords (provide recommendations without asking for location)
    for keyword in fire_related_keywords:
        if keyword in cleaned_message:
            if "electrical fire" in cleaned_message:
                return jsonify({'response': random.choice(responses["electrical fire"])})
            elif "short circuit" in cleaned_message:
                return jsonify({'response': random.choice(responses["short circuit"])})
            elif "gas leak" in cleaned_message:
                return jsonify({'response': random.choice(responses["gas leak"])})
            return jsonify({'response': "Please evacuate the building and contact emergency services immediately."})

    # Fuzzy matching for other responses
    matched_response = process.extractOne(cleaned_message, keywords.keys())
    if matched_response[1] >= 80:  # Match confidence threshold
        category = keywords[matched_response[0]]
        if category in responses:
            response = random.choice(responses[category])
            return jsonify({'response': response})

    # Default response if no matches found
    return jsonify({'response': "I'm sorry, I didn't understand that. Can you please clarify?"})

if __name__ == '__main__':
    app.run(debug=True)
