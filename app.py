from flask import Flask, request, jsonify
from flask_cors import CORS
import random
from fuzzywuzzy import process
from FireStationList import fire_stations  # Make sure fire_stations is a dictionary with keys as locations

app = Flask(__name__)
CORS(app)  # Enable CORS for cross-origin requests

# Rule-based response dictionary for the fire service chatbot
responses = {
    "fire safety tips": [
        "Always keep a fire extinguisher nearby.",
        "Make sure to have smoke alarms installed in every room.",
        "Plan and practice a fire escape route for your home or office."
    ],
    "noc application": [
        "To apply for a NOC for residential apartments, please visit our NOC portal."
    ],
    "fire drill": [
        "To book a fire drill, please visit our fire drill booking section."
    ],
    "gas leak": [
        "If you have a gas leak, please evacuate the area immediately and call the fire department or your gas provider.",
        "Do not use any electrical switches or devices, as this could ignite the gas. Get to a safe location and contact emergency services."
    ],
    "fire emergency": [
        "Please evacuate your building immediately and call the fire department.",
        "If you see smoke or flames, do not try to put it out yourself. Get to a safe place and dial the emergency number.",
        "Stay low to the ground to avoid smoke inhalation, and find the nearest exit."
    ],
    "fire department number": [
        "You can reach the fire department at 101 for emergencies.",
        "For fire brigade assistance, call 101."
    ],
    "thanks": [
        "You're welcome! Stay safe.",
        "Glad I could help! Remember, safety comes first.",
        "Anytime! If you have more questions, feel free to ask."
    ],
    "greeting": [
        "Hello! How can I assist you today?",
        "Hey there! What information do you need?",
        "Hi! I'm here to help you with fire safety information."
    ]
}

# Emergency-related keywords
emergency_keywords = [
    "emergency", "fire incident", "fire hazard", "report fire", 
    "gas leak", "smell gas", "fire in my home", "fire emergency", 
    "urgent fire", "need help with fire", "fire department number", "fire brigade number"
]

# Keywords dictionary for fuzzy matching
keywords = {
    "fire safety tips": "fire safety tips",
    "noc": "noc application",
    "fire drill": "fire drill",
    "gas leak": "gas leak",
    "fire emergency": "fire emergency",
    "fire department number": "fire department number",
    "thanks": "thanks",
    "hi": "greeting",
    "hello": "greeting",
    "hey": "greeting"
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

    # Check if the user is awaiting location input (emergency flow)
    if user_state.get(user_id, {}).get('awaiting_location'):
        matching_location = process.extractOne(cleaned_message, fire_stations.keys(), score_cutoff=60)
        
        if matching_location:
            # Get the nearest fire station details
            nearest_fire_station = fire_stations[matching_location[0]]
            response = f"The nearest fire station is located at: {nearest_fire_station}. Stay safe!"
            user_state[user_id]['awaiting_location'] = False  # Reset the state
        else:
            response = "I didn't recognize that location. Please provide a valid location in Mumbai, Navi Mumbai, or Pune."
    else:
        # Fuzzy match user message to the closest keyword
        matched_keyword, confidence = process.extractOne(
            cleaned_message, 
            list(keywords.keys()) + emergency_keywords, 
            score_cutoff=60
        )

        if matched_keyword:
            if matched_keyword in emergency_keywords:
                response = "It seems like an emergency! Please provide your location so I can assist with the nearest fire station details."
                user_state[user_id] = {'awaiting_location': True}  # Set state to wait for location
            else:
                response_key = keywords[matched_keyword]
                response = random.choice(responses[response_key])
        else:
            response = "Sorry, I couldn't understand that. Can you please rephrase or provide more details?"

    return jsonify({'response': response})

if __name__ == '__main__':
    app.run(debug=True)
