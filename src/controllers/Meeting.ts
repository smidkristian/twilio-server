import { RoomStatus } from '../enums';
import { Room, MeetingStorage, VideoTokenRequest } from '../types';
import { twilioClient } from '../twilio';
import { generateToken } from '../token';

export class Meeting {
    storage: MeetingStorage;
    rooms: Room[];
    constructor(storage: MeetingStorage) {
        this.storage = storage;
        this.rooms = storage.rooms;
    }
    async addRoom(name: string) {
        try {
            const newTwilioRoom = await twilioClient.video.rooms.create({
                uniqueName: name,
                type: 'group',
            });
            const newStorageRoom: Room = {
                sid: newTwilioRoom.sid,
                uniqueName: newTwilioRoom.uniqueName,
                status: RoomStatus.InProgress,
                participants: [],
            };
            const pushedRoom = this.rooms.push(newStorageRoom);
            return pushedRoom ? this.rooms[pushedRoom - 1] : console.log('Error, room not added');
        } catch (error) {
            console.log(error);
        }
    }
    getRoom(id: string) {
        const room = this.rooms.find((room) => room.sid === id);
        return room ? room : console.log('Error, room not found');
    }
    getRooms() {
        return this.rooms;
    }

    getToken(videoTokenRequest: VideoTokenRequest) {
        return { token: generateToken(videoTokenRequest) };
    }
}
