from flask import Flask, jsonify, request
from flask_cors import CORS
import json
import os

app = Flask(__name__)
CORS(app)

# Load champion data
with open('data/champions.json', 'r') as f:
    champions_data = json.load(f)

@app.route('/api/champions', methods=['GET'])
def get_champions():
    return jsonify(champions_data)

@app.route('/api/synergies', methods=['POST'])
def calculate_synergies():
    data = request.json
    selected_champions = data.get('champions', [])
    
    synergies = []
    for champ in selected_champions:
        champ_data = champions_data.get(champ)
        if champ_data:
            synergies.extend(champ_data['traits'])
    
    return jsonify({
        'synergies': list(set(synergies)),
        'recommended_items': get_recommended_items(synergies)
    })

@app.route('/api/recommended-items', methods=['POST'])
def get_recommended_items():
    data = request.json
    traits = data.get('traits', [])
    
    items = []
    if 'Arcade' in traits:
        items.extend(['Guinsoo\'s Rageblade', 'Jeweled Gauntlet'])
    if 'Battlecast' in traits:
        items.extend(['Rabadon\'s Deathcap', 'Infinity Edge'])
    
    return jsonify(items)

if __name__ == '__main__':
    app.run(debug=True, port=5000)
