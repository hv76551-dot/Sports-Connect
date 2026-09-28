# Developer — Testing the app locally

This document explains how to run and test the GamePlanner React Native app against a local backend while developing on an Android emulator or a physical Android device.

Two common dev workflows:

1) Fast: Use USB + adb reverse to let the phone hit your host's `localhost:4000` (recommended when testing from a phone connected to your dev machine).
2) LAN/Wi‑Fi: Use your machine's LAN IP so the phone connects over Wi‑Fi to the host directly.

---

## Quick checklist
- Backend should be running on the host (e.g., http://localhost:4000)
- Android device/emulator should be connected and recognized by `adb devices`
- Metro bundler running (React Native dev server)

---

## A — USB + adb reverse (USB phone) — Recommended when device connected over USB

1. Make sure your backend is running locally on port 4000.

2. Make sure the phone is connected with USB and visible to adb:

```powershell
adb devices
# Should list your device id
```

3. Configure adb reverse so the device's `localhost:4000` maps to the host machine's 4000:

```powershell
# map device tcp:4000 -> host tcp:4000
adb -s <device-id> reverse tcp:4000 tcp:4000
# Also map Metro (optional) so device can reload
adb -s <device-id> reverse tcp:8081 tcp:8081
# Confirm mappings
adb -s <device-id> reverse --list
```

4. Use `localhost` in `GamePlanner/src/common/Constants.js` while developing with USB:

```js
const API_BASE_URL = __DEV__ ? 'http://localhost:4000/api/' : 'https://your-prod.com/api/';
```

5. Reload the app's JS bundle (Dev menu → Reload) or `npx react-native run-android` to rebuild.

6. Try login/debugging. Check device logs:

```powershell
adb -s <device-id> logcat -d | Select-String -Pattern "trying URL:|LOGIN API" -AllMatches
```

7. When finished, remove the reverse mapping if desired:

```powershell
adb -s <device-id> reverse --remove-all
```

---

## B — Wi‑Fi (LAN) testing across devices

1. Ensure your host and phone are on the same LAN/subnet.

2. Get your host's LAN IP (Windows):

```powershell
ipconfig
# Look for "IPv4 Address" for the adapter you are using
```

3. Set `API_BASE_URL` to the LAN IP in `GamePlanner/src/common/Constants.js` — example:

```js
const API_BASE_URL = __DEV__ ? 'http://192.168.0.100:4000/api/' : 'https://your-prod.com/api/';
```

4. Make sure your backend listens on `0.0.0.0` (not only localhost) and that your OS firewall allows port 4000.

5. Rebuild/reload the app on the device. Check logs on host or device for network activity.

---

## Logging & troubleshooting
- Inspect device logs (search for your API client messages):

```powershell
adb -s <device-id> logcat -d | Select-String -Pattern "trying URL:|Attempt error for|LOGIN API" -AllMatches
```

- If you see `Network request failed`:
  - Check connectivity (Wi‑Fi on device, adb reverse mappings, host firewall, backend listening on expected address/port).

- If Metro HMR or bundle reload issues appear, ensure port 8081 is reachable (either via reverse or LAN), or restart Metro:

```powershell
# Restart Metro from the project root
npx react-native start --reset-cache
```

---

## Quick commit steps (run on your machine)
```bash
git add src/common/Constants.js index.js DEVELOPING.md
git commit -m "docs: add DEVELOPING.md; finalize dev networking setup (adb reverse / localhost and LAN notes)"
```

---

If you want, I can:
- create a git patch for you to apply locally, or
- add a simple runtime toggle so the app automatically picks localhost if it detects `adb reverse` is active.

Tell me which of these you'd like next.