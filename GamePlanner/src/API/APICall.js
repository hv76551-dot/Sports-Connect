import Constants from '../common/Constants';
import {DeviceEventEmitter, Platform} from 'react-native';
import {getNetInfo, showToast} from '../common/Helper';
import {getToken} from '../common/Prefs';

// Helper function to convert params to URL query string
function paramsToUrlQueryParams(params) {
  return Object.keys(params)
    .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
    .join('&');
}

// Helper to safely parse JSON without throwing
async function safeJson(response) {
  try {
    return await response.json();
  } catch (e) {
    try {
      const text = await response.text();
      return { raw: text };
    } catch (err) {
      return { error: 'No body' };
    }
  }
}

// Helper function to show error toast
function toastError(title, message) {
  showToast(message || title);
}

async function apiRequest(
  method,
  url,
  body,
  onSuccess,
  onError,
  isAuth = false,
) {
  let query = '';
  let config = {
    method,
    headers: {'Content-Type': 'application/json'},
  };
  let deviceId = '1355454';
  let common_params = {
    Deviceid: deviceId,
    deviceOs: Platform.OS == 'android' ? 'A' : 'I',
  };
  let isConnected = await getNetInfo();
  console.log('Network connected:', isConnected);

  if (isConnected) {
    if (method === 'GET') {
      if (body) {
        const qs = paramsToUrlQueryParams(body);
        query = qs ? `?${qs}` : '';
      }
    } else {
      if (body) {
        let params = {...body, ...common_params};
        config['body'] = JSON.stringify(params);
        console.log('params===>>', params);
      }
    }
    Constants.jwt_token = await getToken();
    if (isAuth) {
      config['headers'] = {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${Constants.jwt_token}`,
      };
    }
    try {
      const baseFinalUrl = `${url || ''}${query || ''}`;
      console.log('baseFinalUrl:==> ', baseFinalUrl);
      // Build attempt list: try local loopbacks first (fast for adb reverse / emulator),
      // then try the configured host. This prevents long delays when the LAN IP is unreachable
      // from the device and lets emulator/USB reverse work reliably.
      // Always start with the configured URL so we have a guaranteed fallback
      const attemptUrls = [baseFinalUrl];
      try {
        // Parse URL and generate generic fallbacks so we don't depend on a single hardcoded LAN IP.
        const parsed = new URL(baseFinalUrl);
        const proto = parsed.protocol; // e.g. 'http:'
        const port = parsed.port ? `:${parsed.port}` : '';
        const pathAndQuery = parsed.pathname + parsed.search;
        const host = parsed.hostname;

        // Try local loopbacks first (avoid duplicates) so USB reverse or emulator loopback
        // respond quickly before trying the LAN host.
        const localFallbacks = ['localhost', '127.0.0.1', '10.0.2.2'];
        for (const fb of localFallbacks) {
          if (fb !== host) {
            // add local fallbacks to front so they are attempted before baseFinalUrl
            attemptUrls.unshift(`${proto}//${fb}${port}${pathAndQuery}`);
          }
        }
      } catch (e) {
        // Best-effort: when parsing fails add common local fallbacks first, then
        // try the configured/base URL at the end. This covers malformed URLs or
        // unexpected hosts.
        try {
          // Preserve the "/api/..." portion of the configured URL when adding
          // local fallbacks. Using substring keeps the leading '/api' segment.
          let suffix = '';
          if (baseFinalUrl && baseFinalUrl.includes('/api')) {
            const idx = baseFinalUrl.indexOf('/api');
            suffix = baseFinalUrl.substring(idx); // includes '/api'
          } else if (baseFinalUrl) {
            // fallback to whatever path is present
            const firstSlash = baseFinalUrl.indexOf('/', baseFinalUrl.indexOf('://') + 3);
            suffix = firstSlash >= 0 ? baseFinalUrl.substring(firstSlash) : '';
          }
          // add common local fallbacks at the front
          attemptUrls.unshift(`http://10.0.2.2:4000${suffix}`);
          attemptUrls.unshift(`http://localhost:4000${suffix}`);
        } catch (err) {
          // ignore any construction errors
        }
        // baseFinalUrl is already in attemptUrls as the last entry
      }

      console.log('called Url attempts:==> ', attemptUrls);
      console.log('Request config:==> ', config);

      let lastError;
      for (const finalUrl of attemptUrls) {
        try {
          // Add timeout to prevent hanging requests
          // Add timeout to prevent hanging requests; shorter per-attempt timeout so
          // when one host is unreachable we fall back faster.
          const controller = new AbortController();
          const timeoutMs = 6000; // 6 second timeout per attempt
          const timeoutId = setTimeout(() => controller.abort(), timeoutMs);

          console.log('trying URL:', finalUrl);
          let response = await fetch(finalUrl, {
            ...config,
            signal: controller.signal,
          });

          clearTimeout(timeoutId);
          console.log('Response status:==> ', response.status);

          let responseJson = await safeJson(response);
          console.log('Response JSON:==> ', responseJson);

          if (response.ok) {
            if (onSuccess) onSuccess(responseJson);
            return responseJson;
          } else {
            if (response.status == 401) {
              DeviceEventEmitter.emit('Unauthorized', responseJson);
            } else if (onError) {
              onError(responseJson);
            }
            return responseJson;
          }
        } catch (err) {
          console.log('Attempt error for', finalUrl, err && err.message ? err.message : err);
          lastError = err;
          // try next fallback
        }
      }

      // if we reach here all attempts failed
      console.log('All URL attempts failed');
      throw lastError || new Error('Network request failed');
    } catch (error) {
      console.log('API Request Error:==> ', error);

      // Provide more specific error messages
      let errorMessage = 'Network request failed';
      if (error && error.name === 'AbortError') {
        errorMessage = 'Request timeout - please check your connection';
      } else if (error && String(error).includes('Network request failed')) {
        errorMessage = 'Cannot connect to server - please check if backend is running';
      } else if (error && String(error).toLowerCase().includes('fetch')) {
        errorMessage = 'Network error - please check your internet connection';
      }

      const enhancedError = {
        message: errorMessage,
        originalError: error && error.message ? error.message : String(error),
      };

      if (onError) onError(enhancedError);
    }
  } else {
    let NoInternet = {no_internet: true, message: 'Interbet messag ehere'};
    toastError('No Internet', 'Please check your internet connection');
    return NoInternet;
  }
}
async function apiRequestWithFormData(
  method,
  url,
  body,
  onSuccess,
  onError,
  isAuth = false,
) {
  let query = '';
  let config = {
    method,
  };
  let isConnected = await getNetInfo();
  if (isConnected) {
    if (body) config['body'] = body;

    if (isAuth) {
      config['headers'] = {
        Authorization: `Bearer ${Constants.jwt_token}`,
      };
    }
    console.log(config);
    try {
      let response = await fetch(url, config);
      console.log(response, url);
      let responseJson = await safeJson(response);

      if (response.status >= 200 && response.status <= 299) {
        if (onSuccess) onSuccess(responseJson);
      } else {
        if (onError) onError(responseJson);
      }
      return responseJson;
    } catch (error) {
      onError && onError(error);
      console.log(error, 'oioioi');
    }
  } else {
    let NoInternet = {no_internet: true, message: 'No Internet!!!'};
    return NoInternet;
  }
}

export async function getAddressByLatLong(body, success, error) {
  return apiRequest(
    'GET',
    `${Constants.ADDRESS_URL}${body?.latitude},${body?.longitude}&key=${Constants.GOOGLE_API_KEY}`,
    null,
    success,
    error,
    false,
  );
}

export async function registerApi(body, success, error) {
  return apiRequest(
    'POST',
    `${Constants.API_BASE_URL}auth/register`,
    body,
    success,
    error,
    false,
  );
}

export async function loginApi(body, success, error) {
  return apiRequest(
    'POST',
    `${Constants.API_BASE_URL}auth/login`,
    body,
    success,
    error,
    false,
  );
}

export async function getDetailsAPi(success, error) {
  return apiRequest(
    'GET',
    `${Constants.API_BASE_URL}auth/getById`,
    null,
    success,
    error,
    true,
  );
}

export async function verifyOtpAPI(body, success, error) {
  return apiRequest(
    'POST',
    `${Constants.API_BASE_URL}verify-otp`,
    body,
    success,
    error,
    false,
  );
}
export async function allVenueApi(success, error) {
  return apiRequest(
    'GET',
    `${Constants.API_BASE_URL}venue/getAll`,
    null,
    success,
    error,
    true,
  );
}
//all sports
export async function allsportsApi(success, error) {
  return apiRequest(
    'GET',
    `${Constants.API_BASE_URL}sports/getAll`,
    null,
    success,
    error,
    true,
  );
}
export async function createHostGameApi(body, success, error) {
  return apiRequest(
    'POST',
    `${Constants.API_BASE_URL}hostgame/create`,
    body,
    success,
    error,
    true,
  );
}

//showhostgame
export async function hostgameallApi(success, error) {
  return apiRequest(
    'GET',
    `${Constants.API_BASE_URL}hostgame/all`,
    null,
    success,
    error,
    true,
  );
}

export async function hostgameallByIdApi(success, error) {
  return apiRequest(
    'GET',
    `${Constants.API_BASE_URL}hostgame/allByUserID`,
    null,
    success,
    error,
    true,
  );
}

//venuebookingdtail
export async function allbookingApi(success, error) {
  return apiRequest(
    'GET',
    `${Constants.API_BASE_URL}booking/getall`,
    null,
    success,
    error,
    true,
  );
}

//all games
export async function allgamesApi(success, error) {
  return apiRequest(
    'GET',
    `${Constants.API_BASE_URL}sports/getAll`,
    null,
    success,
    error,
    true,
  );
}

export async function chnagePasswordAPi(body,success, error) {
  return apiRequest(
    'POST',
    `${Constants.API_BASE_URL}auth/changepassword`,
    body,
    success,
    error,
    true,
  );
}

export async function updateProfileApi(body,success, error) {
  return apiRequest(
    'POST',
    `${Constants.API_BASE_URL}auth/updateProfile`,
    body,
    success,
    error,
    true,
  );
}

export async function requestToJoinApi(body,success, error) {
  return apiRequest(
    'POST',
    `${Constants.API_BASE_URL}booking/create`,
    body,
    success,
    error,
    true,
  );
}

export async function myRequestApi(success, error) {
  return apiRequest(
    'GET',
    `${Constants.API_BASE_URL}booking/getMyBookings`,
    null,
    success,
    error,
    true,
  );
}

export async function getConfirmBookingsApi(success, error) {
  return apiRequest(
    'GET',
    `${Constants.API_BASE_URL}booking/getConfirmBookings`,
    null,
    success,
    error,
    true,
  );
}

export async function removeRequestApi(body,success, error) {
  return apiRequest(
    'POST',
    `${Constants.API_BASE_URL}booking/remove`,
    body,
    success,
    error,
    true,
  );
}

export async function requestBookingListApi(success, error) {
  return apiRequest(
    'GET',
    `${Constants.API_BASE_URL}booking/myRequestList`,
    null,
    success,
    error,
    true,
  );
}

export async function bookingConfirmOrCancel(body,success, error) {
  return apiRequest(
    'POST',
    `${Constants.API_BASE_URL}booking/updateOrRemove`,
    body,
    success,
    error,
    true,
  );
}
