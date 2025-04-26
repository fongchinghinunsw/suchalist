import {compareVersions} from 'compare-versions';
import DeviceInfo from 'react-native-device-info';
import {Platform} from 'react-native';
import * as z from 'zod';

const ENVIRONMENT = 'dev';

const BASE_URL = `https://${ENVIRONMENT}.api.suchalist.koalatek.com/`;

const PLATFORM = Platform.select({
  ios: 'apple',
  android: 'google',
});
const PLATFORM_BASE_URL = `${PLATFORM}/`;

const versionResponseSchema = z.object({
  minimumSupportedVersion: z.object({
    versionCode: z.number(),
    versionName: z.string(),
  }),
});

export const isAppOutdated = async (): Promise<boolean> => {
  try {
    const currentVersion = DeviceInfo.getVersion(); // e.g. "1.0.0"

    const response = await fetch(`${BASE_URL}${PLATFORM_BASE_URL}version`);
    const data = await response.json();

    const parsed = versionResponseSchema.parse(data);
    const latestSupportedVersion = parsed.minimumSupportedVersion.versionName;

    console.log(
      'compare',
      compareVersions(currentVersion, latestSupportedVersion) < 0,
      currentVersion,
      latestSupportedVersion,
    );
    return compareVersions(currentVersion, latestSupportedVersion) < 0;
  } catch (err) {
    console.error('Failed to check app version:', err);
    return false; // fallback: assume app is not outdated
  }
};
