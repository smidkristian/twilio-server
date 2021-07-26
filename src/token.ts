import { jwt } from 'twilio';
import { VideoTokenRequest } from './types';

const AccessToken = jwt.AccessToken;
const VideoGrant = AccessToken.VideoGrant;

export function generateToken(videoTokenRequest: VideoTokenRequest): string {
    const token = new AccessToken(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_API_KEY, process.env.TWILIO_API_SECRET, {
        identity: videoTokenRequest.identity,
    });

    const grant = new VideoGrant({ room: videoTokenRequest.uniqueName });
    token.addGrant(grant);

    return token.toJwt();
}
