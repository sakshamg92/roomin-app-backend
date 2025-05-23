# 📱 Room In: Assured Stay! – Mobile App (Android Only)

**Tagline:** _The complete house feel._  
A modern, verified room-renting platform designed for youth, built with trust, technology, and convenience at its core.

---

## 🎀 Project Overview

Room In is a room rental marketplace that connects property owners with verified renters (students, professionals). The app ensures **trust** through document and identity verification, **ease** through a smooth UI/UX, and **control** through real-time bookings, payments, and legally binding digital contracts. Every aspect of the platform is designed to reduce friction and increase transparency for both property owners and room seekers.

---

## 🎯 Core Features

### For Property Owners:
- **Registration:**
  - Name, email (OTP verified), phone (OTP verified), password
  - Aadhaar authentication (photo & number)
  - Live selfie capture
  - Upload light bill for address verification
  - Profession and gender fields
  - Accept Terms and Conditions

- **Login:**
  - OTP + password

- **Add Rooms/Properties:**
  - Upload 8–10 room images (mandatory)
  - Geolocation tagging via map
  - Room details (1RK, 1BHK, 2BHK) via radio buttons
  - Rent type selection (per cot or full room)
  - Amenities checkbox (electricity bill included, attached bathroom, WiFi, hot water, parking, etc.)
  - Address (auto-fetched from map + manual entry)
  - Upload supporting light bill
  - Mention rent, room occupancy, and if property is a single block or multi-block

- **Dashboard:**
  - View current renters, bookings, and payment history
  - Access digital contracts signed by renters
  - Receive reminders on upcoming monthly rents

### For Users/Renters:
- **Registration:**
  - Name, email, phone (both OTP verified), password
  - Upload Aadhaar card and take live selfie
  - Gender, permanent address
  - Parent’s name, phone number, and Aadhaar card
  - Accept Terms and Conditions

- **Login:**
  - OTP + password

- **Search & Book:**
  - View verified room listings with photo galleries, location, and amenities
  - Navigate to the location using Google Maps
  - Contact owner from within the app
  - Book the room, pay advance/security amount digitally
  - Sign digital contract generated by app with predefined terms
  - Monthly rent payment reminders and receipts

---

## 💠 Tech Stack

| Layer        | Tech Used                     |
|--------------|-------------------------------|
| **Frontend** | React Native (Android only)   |
| **Backend**  | Node.js + Express             |
| **Database** | MongoDB                       |
| **Storage**  | Firebase Storage              |
| **Auth & OTP** | Custom Node.js services + Nodemailer / Twilio |
| **Maps**     | Google Maps SDK               |
| **File Upload** | react-native-image-picker or expo-image-picker |

---

## 📂 Project Structure

```bash
/roomin-app/
|
├── /src/
│   ├── /components/        # Buttons, inputs, cards, etc.
│   ├── /screens/           # Each major view/screen (Register, Login, AddProperty, etc.)
│   ├── /navigation/        # React Navigation setup (stack/tab navigators)
│   ├── /services/          # API interfaces using Axios
│   ├── /utils/             # Helper functions, validation logic, constants
│   └── /context/           # Auth, user session, theme contexts
│
├── /assets/                # Images, logos, app icons
├── App.js                  # Entry point
├── firebase.js             # Firebase config file
└── package.json
```

---

## 📸 Key Implementation Notes

- **Live Selfie Capture:** Use `expo-camera` or `react-native-camera` for capturing user images.
- **Document Uploads:** Documents (Aadhaar, light bill, etc.) are uploaded and stored securely in Firebase Storage.
- **OTP Mechanism:**
  - Email: Use `nodemailer`
  - Phone: Use services like Twilio
- **AI Verification Module (Planned):**
  - Match Aadhaar selfie with live selfie
  - Match light bill address with entered address
  - Use image recognition and fuzzy logic (under development)
- **Location Features:** Room pin drops and directions integrated using Google Maps SDK.
- **Digital Contracts:** Auto-generated PDF contracts signed by both parties digitally and sent via email.

---

## 🧪 Getting Started (Local Development)

### 1. Clone the Repository
```bash
git clone https://github.com/i-saurabha-23/Room-In---Assured-Stay.git
cd roomin-app
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Firebase Setup
- Create a Firebase project at https://console.firebase.google.com
- Enable Firebase Storage
- Add Android app to Firebase project
- Download `google-services.json`
- Place the JSON file inside `/android/app/`

### 4. Run the App
```bash
npx react-native run-android
```

---

## 💡 Good to Know

- Form validations are handled by **Formik + Yup**
- Image compression before upload improves speed and reliability
- Firebase rules should restrict read/write access by user auth
- All API responses will be tokenized using **JWT** for user session control

---

## 🛡️ Future Enhancements

- AI-based verification module (75%+ accuracy match required to pass)
- Built-in chat between owners and renters (with moderation filters)
- Ability to upload short room walkthrough videos
- Scheduled rent reminders + UPI-based rent payment with auto-receipts
- Admin dashboard for manual verifications and flags

---

## 🧐 Intern Notes

- Build flows modularly (each screen as a component)
- Keep UI consistent with design system (spacing, font, layout)
- Always run tests on physical Android device
- Document any new changes and push regularly to GitHub
- Use present tense and meaningful commit messages

---

## 👨‍💻 Maintainers

- **Project Lead:** Aditya Deshmukh

---

Welcome to the team. Let’s build something great together! 🚀

