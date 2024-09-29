from flask import Flask, request, jsonify
from flask_cors import CORS
import random
from fuzzywuzzy import process
from FireStationList import fire_stations

app = Flask(__name__)
CORS(app)  # Enable CORS for cross-origin requests

# Sample fire station data for Mumbai locations

# Rule-based response dictionary for the fire service chatbot
responses = {
    "safety tips": [
        "For fire safety: Always keep a fire extinguisher nearby and install smoke alarms in every room.",
        "For gas leaks: Evacuate the area immediately, avoid using electrical switches, and contact emergency services.",
        "For short circuits: Turn off the main power supply and call an electrician. Do not touch electrical wiring.",
        "For chemical spills: Evacuate the area, avoid contact with the chemicals, and call emergency services for professional cleanup.",
        "For earthquakes: Take cover under sturdy furniture or a doorway and evacuate the building once the shaking stops.",
        "For floods: Move to higher ground, avoid floodwaters, and turn off the main electrical supply if safe to do so.",
        "For elevator malfunctions: Press the emergency button to call for help and stay calm. Do not attempt to open the doors.",
        "For building collapse: Evacuate the building if safe, avoid using elevators, and signal for help if trapped.",
        "For toxic smoke: Cover your mouth and nose with a cloth, stay low to the ground, and evacuate the area immediately."
    ],
    "noc application": [
        "To apply for a NOC for residential apartments, please visit our NOC portal at: www.agni-rakshak.com.",
    ],
    "fire drill": [
        "To book a fire drill, please visit our fire drill booking section at: www.fire-drill-services.com.",
        "You can find more details about fire drills in the fire drill section of our website."
    ],
    "gas leak": [
        "If you have a gas leak, please evacuate the area immediately and call the fire department or your gas provider.",
        "Do not use any electrical switches or devices, as this could ignite the gas. Get to a safe location and contact emergency services."
    ],
    "short circuit": [
        "In case of a short circuit, turn off the power from the main switch and call an electrician immediately.",
        "Do not attempt to touch or fix electrical wiring. Evacuate the area if there is a fire risk and contact the fire department for help."
    ],
    "electrical fire": [
        "If you encounter an electrical fire, do not use water to extinguish it. Use a fire extinguisher rated for electrical fires (Class C).",
        "Turn off the main power if it's safe to do so, and call the fire department immediately."
    ],
    "chemical spill": [
        "If you witness a chemical spill, evacuate the area and call emergency services. Do not attempt to clean it up without proper training.",
        "Ensure that no one comes into contact with the chemicals and alert the fire brigade if there is a fire risk."
    ],
    "water flooding": [
        "If your area is flooding, evacuate to higher ground immediately. Avoid contact with floodwater as it may be contaminated.",
        "Turn off the main electrical supply if possible to prevent electrocution risks. Call emergency services for help."
    ],
    "elevator malfunction": [
        "If you're trapped in an elevator, stay calm. Do not attempt to pry open the doors. Press the emergency button to contact help.",
        "Call the fire department if necessary. Remain calm and wait for assistance."
    ],
    "building collapse": [
        "If you're in a collapsing building, immediately evacuate if it's safe to do so. Avoid using elevators.",
        "If you're trapped, try to make noise to signal for help. Cover your mouth with a cloth to avoid inhaling dust or debris."
    ],
    "earthquake": [
        "In the event of an earthquake, take cover under sturdy furniture or a doorway. Stay away from windows and heavy objects.",
        "Once the shaking stops, evacuate the building carefully and avoid using elevators."
    ],
    "toxic smoke": [
        "If you're in an area with toxic smoke, cover your nose and mouth with a cloth and evacuate the area immediately.",
        "If possible, stay low to the ground where the air is clearer. Contact emergency services for assistance."
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
    "fire brigade number": [
        "The fire brigade can be contacted at 101 for immediate assistance.",
        "In case of fire, dial 101 to reach the fire brigade."
    ],
    "thanks": [
        "You're welcome! Stay safe.",
        "Glad I could help! Remember, safety comes first.",
        "Anytime! If you have more questions, feel free to ask."
    ],
    "greeting": [
        "Hello! How can I assist you today?",
        "Hey there! What information do you need?",
        "Hi! I'm here to help you with fire safety information.",
        "Hey! How can I assist you today?"
    ]
}

# Emergency-related keywords
emergency_keywords = [
    "emergency", "fire incident", "fire hazard", "report fire", 
    "gas leak", "smell gas", "gas leak emergency", 
    "fire at my house", "fire in my building", "fire in my home", 
    "there's a fire", "help there's a fire", "fire outbreak", 
    "fire situation", "fire alarm", "my house is on fire", 
    "fire in my apartment", "fire emergency", "urgent fire", 
    "need help with fire", "fire department number", "fire brigade number",
    "short circuit", "electrical fire", "chemical spill", "fire hazard",
    "water flooding", "elevator malfunction", "building collapse", "earthquake",
    "toxic smoke"
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

    # Check if the user is awaiting location input (emergency flow)
    if user_state.get(user_id, {}).get('awaiting_location'):
        # User is expected to provide a location
        for location in fire_stations:
            if location in cleaned_message:
                # Respond with the nearest fire station info
                response = fire_stations[location]
                user_state[user_id]['awaiting_location'] = False  # Reset the state
                break
        else:
            # If no valid location is detected, ask the user for the location
            response = "Please provide a location (like Andheri, Bandra, Dadar) for assistance."
            return jsonify({'response': response})

    else:
        # Check for emergency keywords
        for keyword in emergency_keywords:
            if keyword in cleaned_message:
                user_state[user_id] = {'awaiting_location': True}
                return jsonify({'response': "Please provide your location for emergency assistance."})

        # Fuzzy matching for keywords
        matched_keyword, _ = process.extractOne(cleaned_message, keywords.keys())
        if matched_keyword:
            response = random.choice(responses[keywords[matched_keyword]])
        else:
            response = "I'm sorry, I didn't understand that. Could you please rephrase?"

    return jsonify({'response': response})

if __name__ == '_main_':
    app.run(port=5000)