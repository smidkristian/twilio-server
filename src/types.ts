import { ParticipantStatus, MeetingState, RoomStatus } from './enums';

export interface VideoTokenRequest {
    identity: string;
    uniqueName: string;
}
export interface Participant {
    id: string;
    name: string;
    token: string;
    status: ParticipantStatus;
}
export interface Room {
    sid: string;
    uniqueName: string;
    status: RoomStatus;
    participants: Participant[];
}

export interface MeetingStorage {
    state: MeetingState;
    start: number;
    rooms: Room[];
    allParticipants: Participant[];
}
