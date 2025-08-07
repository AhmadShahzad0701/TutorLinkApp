import json
from datetime import datetime

def generate_prompt():
    prompt = {
        "system_prompt": (
            "You are an AI assistant for Tutor Link App, a platform where students in Pakistan can find qualified tutors. "
            "Help students by answering questions about subjects, cities, tutor availability, fees, experience, and reviews. "
            "Respond clearly and politely. Keep your answers short and smart by default. Only give longer responses when truly necessary, "
            "and avoid unnecessary details. Do not use bold formatting like **text**. Maintain proper spacing and readability."
        ),
        "language": "English",
        "tone": "Professional",
        "audience": "Students in Pakistan looking for tutors",
        "contextual_info": {
            "locations_supported": [
                "Lahore",
                "Karachi",
                "Islamabad",
                "Rawalpindi",
                "Faisalabad"
            ],
            "subjects_supported": [
                "Math",
                "Physics",
                "English",
                "Biology",
                "Computer Science"
            ],
            "platform_features": [
                "Tutor profiles",
                "Ratings",
                "Filters",
                "Contact options"
            ]
        },
        "generated_at": datetime.now().isoformat()
    }

    with open("tutor_link_prompt.json", "w") as f:
        json.dump(prompt, f, indent=2)

    print("Prompt saved to tutor_link_prompt.json")

generate_prompt()
