
# Timer App

A React Native app that helps users manage multiple customizable timers.

## Features:
- Create and manage timers
- Group timers by categories
- Start, pause, and reset individual timers
- Bulk actions for categories
- Timer progress visualization with a progress bar
- Notifications when a timer is halfway done
- Light and dark theme support

---

## Prerequisites:

Ensure you have the following installed:

- [Node.js](https://nodejs.org/en/) (recommended version: 16.x or later)
- [Expo CLI](https://docs.expo.dev/get-started/installation/) (`npm install -g expo-cli`)

---

## Setup:

### 1. Clone the Repository:

Clone the repository:

```bash
git clone https://github.com/Praveen851/timer.git
cd timer
```

### 2. Install Dependencies:

Install the necessary dependencies using Yarn or npm:

```bash
npm install
```

### 3. Run the App:

If you're using Expo, start the development server:

```bash
npm start
```

You can use the QR code to open the app on your mobile device using the Expo Go app, or you can run the app in an Android/iOS emulator.

---

## Libraries Used:

- **React Navigation**: For navigating between screens.
- **React Native Progress**: To display timer progress with a progress bar.
- **Expo Notifications**: To handle timer notifications.
- **AsyncStorage**: To persist data (timers, theme) across app restarts.
- **UUID**: For generating unique IDs for timers.

---

## Features and Screens:

### 1. **Home Screen**:
- View timers grouped by categories.
- Start, pause, or reset timers.
- Bulk actions to start, pause, or reset all timers in a category.
- Timer progress shown with a progress bar.

### 2. **Add Timer Screen**:
- Add a new timer with a customizable name, duration, and category.

### 3. **History Screen**:
- View completed timers.

### 4. **Theme Switch**:
- Toggle between light and dark themes.

---

## list of assumptions made during development:
1. Categories can be infinite and are not predefined.
2. Every timer should be manually started after creation, hence all the timer’s status will be set to pause initially and after reset.
3. For each timer created, a unique id is required.
4. Timer functionality is achieved through setInterval and so it should be cleared using clearInterval if the timer is paused or reset.

---
