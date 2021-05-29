
import Constants from 'expo-constants'

// https://developers.google.com/admob/android/test-ads
// https://developers.google.com/admob/ios/test-ads

const getInterstitialId = () => {
    const productionID = 'ca-app-pub-6049890521797137/4679862214'
    const testID = 'ca-app-pub-3940256099942544/1033173712'

    //return (Constants.isDevice && !__DEV__) ? productionID : testID
    return !__DEV__ ? productionID : testID
}

const getPublisherId = () => {
    const testAndroidID = 'ca-app-pub-3940256099942544/6300978111';
    const productionAndroidID = 'ca-app-pub-6049890521797137/2525483921';

    //return Constants.isDevice && !__DEV__ ? productionAndroidID : testAndroidID;
    return !__DEV__ ? productionAndroidID : testAndroidID
}

export { getInterstitialId, getPublisherId }